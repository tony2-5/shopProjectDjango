from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.models import User
from rest_framework import generics
from .models import Product, Cart, CartProduct
from .serializers import UserSerializer, CartSerializer, ProductSerializer, CartProductSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
# Create your views here.

# different generics.views correspond to request type
class CreateUserView(generics.CreateAPIView):
  queryset = User.objects.all()
  serializer_class = UserSerializer
  permission_classes = [AllowAny]

class CreateCart(generics.CreateAPIView):
  serializer_class = CartSerializer
  permission_classes = [IsAuthenticated]

  def perform_create(self, serializer):
    try:
      cart = Cart.objects.get(user=self.request.user)
      return HttpResponse(self.get_serializer(cart).data)
    except Cart.DoesNotExist: 
      serializer.save(user=self.request.user)

class DisplayCart(generics.ListAPIView):
  serializer_class = CartProductSerializer
  permission_classes = [IsAuthenticated]

  def get_queryset(self):
    try:
      cart = Cart.objects.get(user=self.request.user)
    except Cart.DoesNotExist:
      return CartProduct.objects.none()
  
    return CartProduct.objects.filter(cart=cart)
  
''' 
defining update functionalities in views with post instead of serializer update()
because need seperate update functionality for adding and removing products
'''
class AddProductToCart(generics.GenericAPIView):
  serializer_class = CartProductSerializer
  permission_classes = [IsAuthenticated]

  def post(self, request):
    user = request.user
    product_id = request.data.get('product')
    quantity = request.data.get('quantity')

    try:
      product = Product.objects.get(id=product_id)
    except Product.DoesNotExist:
      return HttpResponse(f"{product_id} Product not found.", status=400)

    try:
      cart = Cart.objects.get(user=user)
    except Cart.DoesNotExist:
      return HttpResponse({"Cart not found."}, status=400)
    
    cartProduct, created = CartProduct.objects.get_or_create(
      cart=cart,
      product=product,
      defaults={'quantity': quantity}
    )

    if not created:
      cartProduct.quantity += quantity
      cartProduct.save()

    return HttpResponse("Product added to cart.", status=200)
    
class DeleteProductFromCart(generics.GenericAPIView):
  serializer_class = CartProductSerializer
  permission_classes = [IsAuthenticated]

  def post(self, request):
    user = request.user
    product_id = request.data.get("product")

    try:
      product = Product.objects.get(id=product_id)
    except Product.DoesNotExist:
      return HttpResponse("Product not found.", status=400)

    try:
      cart = Cart.objects.get(user=user)
    except Cart.DoesNotExist:
      return HttpResponse("Cart not found.", status=400)

    try:
      cart_product = CartProduct.objects.get(cart=cart, product=product)
    except CartProduct.DoesNotExist:
      return HttpResponse("Product not in cart.", status=400)

    cart_product.delete()
    return HttpResponse("Product removed from cart.", status=200)

class GetProducts(generics.ListAPIView):
  serializer_class = ProductSerializer
  permission_classes = [IsAuthenticated]
  queryset = Product.objects.all()