from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BorrowViewSet

app_name = 'borrows'

router = DefaultRouter()

router.register(r'', BorrowViewSet, basename='borrow')

urlpatterns = router.urls