from django.db import models
from django.contrib.auth.models import User

# Create your models here.
# A note model is created with the attributes for ORM 
class Note(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True) # when added or created a new user, the date and time will be auto added
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notes") # a foreign relation is created so that when user is deleted , the notes of the user is also deleted.

    def __str__(self):
        return self.title