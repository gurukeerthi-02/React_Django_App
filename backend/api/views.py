from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, NoteSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Note

# Create your views here.
class CreateNoteList(generics.ListCreateAPIView):
    serializer_class = NoteSerializer # json format
    permission_classes = [IsAuthenticated] # only authorised user can create notes

    def get_queryset(self): 
        user = self.request.user # only authorised user
        return Note.objects.filter(author=user) # return all the content   objects.filter(condtion)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)
class DeleteNoteList(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=self.request.user)



# view created to validate the user data and store it in a db
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]