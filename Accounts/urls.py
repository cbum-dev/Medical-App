from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView


urlpatterns = [
    path('providers/specialty', views.HealthcareProviderListBySpecialty.as_view(), name='providers-list-by-specialty'),#localhost:8000/provder/?specialty = "joint"
    path('users/', views.UserListCreateView.as_view(), name='user-list-create'),
    path('providers/', views.HealthcareProviderListCreateView.as_view(), name='provider-list-create'),
    path('providers/<int:pk>/', views.HealthcareProviderUpdateDeleteView.as_view(), name='provider-update-delete'),
    
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
]