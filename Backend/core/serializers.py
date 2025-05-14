from rest_framework import serializers
from .models import Feira

class FeiraSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feira
        fields = '__all__'
