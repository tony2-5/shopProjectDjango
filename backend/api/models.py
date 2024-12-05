from django.db import models
from django.contrib.auth.models import User

class Product(models.Model):
  created = models.DateTimeField(auto_now_add=True)
  productName = models.CharField(max_length=100)
  price = models.DecimalField(max_digits=9, decimal_places=2)
  stock = models.IntegerField(default=0)
  image = models.ImageField(upload_to="static",blank=True)

class Cart(models.Model):
  user = models.OneToOneField(
    User,
    on_delete=models.CASCADE,
    primary_key=True
  )
  product = models.ForeignKey(Product, on_delete=models.CASCADE)
  quantity = models.IntegerField(default=0)