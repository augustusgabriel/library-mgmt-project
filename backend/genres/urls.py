from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import GenreViewSet


app_name = 'Genres'

router = DefaultRouter()

router.register(r'genres', GenreViewSet, basename='genre')

urlpatterns = router.urls