from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BookViewSet


app_name = 'books'

router = DefaultRouter()

router.register(r'', BookViewSet, basename='book')

urlpatterns = [
    path('<int:book_id>/copies/', include('bookcopies.urls'))
]

urlpatterns += router.urls