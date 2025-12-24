from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

# Frontend page
def home(request):
    return render(request, 'index.html')


# Protected API
@api_view(['GET'])
def protected_view(request):
    return Response({
        "message": f"Hello {request.user.username}, you are authenticated"
    })
