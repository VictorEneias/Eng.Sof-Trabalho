from rest_framework import viewsets
from .models import Feira
from .serializers import FeiraSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def current_user(request):
    return Response({
        'username': request.user.username
    })


class FeiraViewSet(viewsets.ModelViewSet):
    queryset = Feira.objects.all()
    serializer_class = FeiraSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(criador=self.request.user)