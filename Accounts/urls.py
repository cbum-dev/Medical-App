from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView


urlpatterns = [
    # path('usery/', views.some_protected_view),
    path('login/', views.LoginView.as_view(), name='login'),
    path('logout/', views.LogoutView.as_view(), name='logout'),
    path('check/', views.check_user_role, name='check_user_role'),
    path('providers/speciality/<int:specialty_id>/', views.HealthcareProviderBySpecialtyView.as_view(), name='providers-by-specialty'),    path('users/', views.UserListCreateView.as_view(), name='user-list-create'),
    path('providers/', views.HealthcareProviderListCreateView.as_view(), name='provider-list'),
    path('providers/<int:pk>/', views.HealthcareProviderListCreateView.as_view(), name='provider-detail'),


    path('register/user/', views.UserRegistrationView.as_view(), name='user-register'),
    path('register/user/basic/', views.BasicUserRegistration.as_view(), name='user-register'),
    path('register/provider/', views.ProviderRegistration.as_view(), name='healthcare-provider-register'),
    path('speciality/', views.SpecialityView.as_view(), name='speciality'),


    # path('providers/<int:pk>/', views.HealthcareProviderUpdateDeleteView.as_view(), name='provider-update-delete'),
    path('users/<int:pk>/',views.UserRetrieveUpdateView.as_view(),name = "user"),
    path("custom/", views.CustomUserListCreateView.as_view(), name="custom-user"),# testing..
    # path('user/register/', views.UserRegistrationView.as_view(), name='user_register'),
    # path('register/', views.RegistrationView.as_view(), name='register'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
]
