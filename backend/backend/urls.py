from django.contrib import admin
from django.urls import path
from api.views import CreateUserView, AddProductToCart, DeleteProductFromCart, GetProducts, DisplayCart, Checkout
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/user/register/",CreateUserView.as_view(), name="register"),
    path("api/token/",TokenObtainPairView.as_view(), name='token'),
    path("api/token/refresh/",TokenRefreshView.as_view(), name='refresh_token'),
    path("api/displaycart/",DisplayCart.as_view(),name="display-cart"),
    path("api/addcartproduct/",AddProductToCart.as_view(),name="create-cartproduct"),
    path("api/deletecartproduct/",DeleteProductFromCart.as_view(),name="delete-cartproduct"),
    path("api/displayproducts/",GetProducts.as_view(),name="display-products"),
    path("api/checkout/",Checkout.as_view(),name="checkout"),
] 