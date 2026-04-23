from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from .models import CustomUser
from .serializers import UserSerializer

# Create your views here.
class UserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer


class LogoutViewSet(APIView):
    def post(self, request):
        try:
            refresh_token = request.data.get('Refresh')
            token = RefreshToken(refresh_token)
            token.blacklist()

            return Response(
                {"message": "Logout realizado com sucesso."},
                status=status.HTTP_205_RESET_CONTENT
            )
        except Exception:
            return Response(
                {"error": "Token inválido ou não fornecido."},
                status=status.HTTP_400_BAD_REQUEST
            )