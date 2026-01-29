"""
URL configuration for CTCDMS. API under CtcdmsDg/api/ for frontend compatibility.
"""
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('CtcdmsDg/api/', include('config.api_urls')),
]
