from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

@api_view(['GET'])
def protected_view(request):
    return Response({
        "message": f"Hello {request.user.username}, you are authenticated"
    })
