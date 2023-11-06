from django.urls import path
from . import views

urlpatterns = [
#     path('user/', views.AppointmentList.as_view(), name='user-appointments-list'),
#     path('email/',views.user_appointments,name="email"),
#     path('appointment/user/<int:user>/',views.UserAppointmentsView.as_view(),name="user"),
    path('appointments/provider/', views.ProviderAppointmentsView.as_view(), name='provider-appointments'),
    path('upcoming/', views.UpcomingAppointmentsView.as_view(), name='upcoming-appointments'),
    path('appointments/', views.AppointmentListCreateView.as_view(), name='appointment-list-create'),
    path('aappointments/', views.UserAppointmentsListView.as_view(), name='user-appointments'),
]
