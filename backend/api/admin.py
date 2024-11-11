from django.contrib import admin
from .models import Product, Cart

# Register your models here.
#products will only be created in the admin view
admin.site.register(Product)
admin.site.register(Cart)