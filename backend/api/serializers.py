from django.contrib.auth.models import User # import User
from rest_framework import serializers # import Serializer
from .models import Note

# Note Serializer to send to and from data in JSON
class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ["id","title","content","created_at","author"]
        extra_kwargs = {'author':{'read_only':True}}



#User model Serializer class created for JSON format
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User 
        fields = ["id" , "username", "password"]
        extra_kwargs = {"password":{"write_only":True}}
        # write password but don't return it to user to display  

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user