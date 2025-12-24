from django.urls import path
from .views import home, protected_view

urlpatterns = [
    path('', home, name='home'),            # Frontend page
    path('protected/', protected_view),     # API
]
