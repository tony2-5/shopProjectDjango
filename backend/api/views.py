from django.http import HttpResponse
from rest_framework import generics
from .models import Product, Cart
from .serializers import UserSerializer, CartSerializer, ProductSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
# Create your views here.

# different generics.views correspond to request type
class CreateUserView(generics.CreateAPIView):
  serializer_class = UserSerializer
  permission_classes = [AllowAny]

class DisplayCart(generics.ListAPIView):
  serializer_class = CartSerializer
  permission_classes = [IsAuthenticated]

  def get_queryset(self):
    try:
      return Cart.objects.filter(user=self.request.user)
    except Cart.DoesNotExist:
      return Cart.objects.none()

class GetProducts(generics.ListAPIView):
  serializer_class = ProductSerializer
  permission_classes = [IsAuthenticated]
  queryset = Product.objects.all()

class AddProductToCart(generics.GenericAPIView):
  permission_classes = [IsAuthenticated]

  def post(self, request):
    user = request.user
    productId = request.data.get('product')
    quantity = request.data.get('quantity')

    try:
      product = Product.objects.get(id=productId)
    except Product.DoesNotExist:
      return HttpResponse(f"{productId} Product not found.", status=400)
    
    cartProduct, created = Cart.objects.get_or_create(
      user=user,
      product=product,
      defaults={'quantity': quantity}
    )

    if not created:
      cartProduct.quantity += int(quantity)
      cartProduct.save()

    # update product stock
    product.stock -= int(quantity)
    product.save()

    return HttpResponse("Product added to cart.", status=200)
    
class DeleteProductFromCart(generics.GenericAPIView):
  permission_classes = [IsAuthenticated]

  def post(self, request):
    user = request.user
    productId = request.data.get("product")

    try:
      product = Product.objects.get(id=productId)
    except Product.DoesNotExist:
      return HttpResponse("Product not found.", status=400)

    try:
      cartProduct = Cart.objects.get(user=user, product=product)
    except Cart.DoesNotExist:
      return HttpResponse("Product not in cart.", status=400)
    
    #add stock back to product
    product.stock += cartProduct.quantity
    product.save()
    cartProduct.delete()

    return HttpResponse("Product removed from cart.", status=200)

class Checkout(generics.GenericAPIView):
  permission_classes = [IsAuthenticated]

  # same as deleting from cart except product stock is not added back and taking array of product ids
  def post(self, request):
    user = request.user
    productIds = request.data.get("products")

    for productId in productIds:
      try:
        product = Product.objects.get(id=productId)
      except Product.DoesNotExist:
        return HttpResponse("Missing product.", status=400)
      
      try:
        cartProduct = Cart.objects.get(user=user, product=product)
      except Cart.DoesNotExist:
        return HttpResponse("Product not in cart.", status=400)
    
      cartProduct.delete()

    return HttpResponse("Checked out successfully.", status=200)