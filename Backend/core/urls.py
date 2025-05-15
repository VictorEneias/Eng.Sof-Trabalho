from django.urls import path, include
from .views import current_user
from rest_framework.routers import DefaultRouter
from .views import FeiraViewSet

router = DefaultRouter()
router.register(r'feiras', FeiraViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('user/', current_user), 
]
