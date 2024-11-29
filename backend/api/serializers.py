from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Product, Cart, CartProduct

class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ['id','username','email','password']
    extra_kwargs = {"password":{"write_only":True}}

  # called from view after form submit to return created object
  def create(self, validated_data):
    user = User.objects.create_user(validated_data['username'],validated_data['email'],validated_data['password'])
    return user

class ProductSerializer(serializers.ModelSerializer):
  class Meta:
    model=Product
    fields = ['id',"created","productName","price","stock","image"]
class CartSerializer(serializers.ModelSerializer):
  # user will be dynamically added to object in view not passed as argument
  user = UserSerializer(read_only=True)
  class Meta:
    model=Cart
    fields = ['user']

  def create(self, validated_data):
    cart = Cart.objects.create(**validated_data)
    return cart

class CartProductSerializer(serializers.ModelSerializer):
  cart = CartSerializer()
  product = ProductSerializer()
  class Meta:
    model = CartProduct
    fields = ['cart', 'product', 'quantity']
  