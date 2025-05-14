from rest_framework import viewsets
from .models import Feira
from .serializers import FeiraSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly

class FeiraViewSet(viewsets.ModelViewSet):
    queryset = Feira.objects.all()
    serializer_class = FeiraSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(criador=self.request.user)