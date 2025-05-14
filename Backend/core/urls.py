from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FeiraViewSet

router = DefaultRouter()
router.register(r'feiras', FeiraViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
