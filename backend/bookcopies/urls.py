from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BookCopyViewSet

app_name = 'bookcopies'

router = DefaultRouter()

router.register(r'', BookCopyViewSet, basename='bookcopies')

urlpatterns = router.urls