from django.shortcuts import render
from rest_framework.views import APIView
from . models import *
from rest_framework.response import Response
from django.contrib import auth
from django.contrib.auth import authenticate, login, logout
from rest_framework.authtoken.models import Token


#get food database
class foodget(APIView):
    
    def get(self, request):

        data = [ {
            "name": data.name,
            "kcal": data.kcal, 
            "carbs": data.carbs,     
            "protein": data.protein, 
            "fat": data.fat
        } 
        for data in Foods.objects.all().order_by('name')]
        return Response(data)
    
class Entryclass(APIView): # Entries 

    def catget(self, type, date, id): #Category structure used in normal "get"
        #some multipliers for desired numbers in front end
        type = [ {
            "entryid": data.id,
            "carbs": round(data.food.carbs * data.qty /100,1),
            "fat": round(data.food.fat * data.qty /100, 1),
            "kcal": round(data.food.kcal * data.qty /100, 1), 
            "protein": round(data.food.protein * data.qty /100, 1),
            "name": data.food.name, 
            "qty": data.qty, 
            "user": data.user.id,
            "type": data.type,
            "date": data.date} 
        for data in Entry.objects.filter(user=id, type=type, date=date)]
        return type

    def delete(self, request):

        entryid = request.data["entryid"]

        try:
            Entry.objects.get(id = entryid).delete()
            return Response("Entry deleted")
        except:
            return Response("failed to delete")
    
    def get(self, request):
        #from the axios APIView get the date in the "params"
        date= self.request.query_params.get('date')
        user = self.request.query_params.get('user')

        id = User.objects.get(username= user).id

        #get structure and category
        breakfast = self.catget("breakfast", date, id)
        lunch = self.catget("lunch", date, id)
        dinner = self.catget("dinner", date, id)
        snacks = self.catget("snacks", date, id)
        
        return Response({
            "userid": id,
            "user": user ,
            "date": date, 
            "breakfast": breakfast, 
            "lunch": lunch, 
            "dinner": dinner, 
            "snacks": snacks
        })

    def post(self, request): #user made a new post

        food = request.data["food"]
        qty = request.data["qty"]
        date = request.data["date"]
        user = request.data["user"]
        type = request.data["type"]

        e = Entry(
            user = User.objects.get(pk = user), 
            food = Foods.objects.get(name=food), 
            qty = qty, 
            date = date, 
            type = type
        )
        try:
            e.save()
            newid = e.id
            #return the new entry ID so u can edit correct entry
            return Response({"entryid": newid})
        except:
            return Response("fail, entry not saved")

    def put(self, request):#update new quantity
      
        entryid = request.data["entryid"]
        qty = request.data["qty"]

        if  qty != None:
            e = Entry.objects.get(id = entryid)
            e.qty = qty
            e.save()
            return Response("updated")
        else:
            return Response("not a number")

class Loginclass(APIView): #Login
    
    def get(self, request):
        
        if request.user == None:
            return Response("not logged in")
        elif request.user.is_anonymous == True:
            return Response("anonymous User")
        else:
            return Response({"id": request.user.id, "username":request.user.username })
    
    def post(self,request):
        username = request.data["username"]
        password = request.data["password"]
        
        user = authenticate(request, username=username, password=password)
    
        # Check if authentication successful
        if user is not None:
            login(request, user)
            return Response({"id": request.user.id, "username":request.user.username })
        else: 
            return Response("could not authenicate")
