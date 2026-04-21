from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import GenreViewSet


app_name = 'genres'

router = DefaultRouter()

router.register(r'', GenreViewSet, basename='genre')

urlpatterns = router.urls