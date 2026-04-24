from rest_framework import viewsets, status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework_simplejwt.tokens import RefreshToken
from .models import CustomUser
from .serializers import UserSerializer

# Create your views here.
class UserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer

    def get_permissions(self):
        if self.action == "create":
            return [permissions.AllowAny()]
        
        return [permissions.IsAuthenticated()]
    
    @action(detail=False, methods=['get', 'put', 'patch'], permission_classes=[permissions.IsAuthenticated])
    def me(self, request):
        user = request.user

        if request.method == 'GET':
            serializer = self.get_serializer(user)
            return Response(serializer.data)
        elif request.method in ['PUT', 'PATCH']:
            serializer = self.get_serializer(
                user,
                data=request.data,
                partial=(request.method == 'PATCH')
            )
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)


class LogoutViewSet(APIView):
    serializer_class = UserSerializer
    
    def post(self, request):
        try:
            refresh_token = request.data.get('refresh_token')

            if not refresh_token:
                return Response(
                    {"error": "Refresh Token é obrigatório"}, status=400
                )

            token = RefreshToken(refresh_token)
            token.blacklist()
            
            response = Response(
                {"message": "Logout realizado com sucesso."},
                status=status.HTTP_205_RESET_CONTENT
            )

            response.delete_cookie("access_token")
            response.delete_cookie("refresh_token")

            return response
        except Exception:
            return Response(
                {"error": "Token inválido ou não fornecido."},
                status=status.HTTP_400_BAD_REQUEST
            )