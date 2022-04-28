from datetime import date
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.deletion import CASCADE

  
class User(AbstractUser):
    pass

#nutrition always in x/100g 
class Foods(models.Model):
    name = models.CharField(max_length=50)

    #kcal/100g
    kcal = models.IntegerField(blank=True)
    # x /100g 
    carbs = models.DecimalField(max_digits=3, decimal_places=1)
    protein = models.DecimalField(max_digits=3, decimal_places=1)
    fat = models.DecimalField(max_digits=3, decimal_places=1)

class Entry(models.Model):
    user = models.ForeignKey(User, null=True, on_delete = models.CASCADE, related_name="entry_user")
    food = models.ForeignKey(Foods, null=True, on_delete = models.CASCADE, related_name="entry_food")
    type = models.CharField(max_length= 20, blank=True)
    qty = models.DecimalField(max_digits=5, decimal_places=2)
    date = models.DateField(blank=True)