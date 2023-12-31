from django.urls import path
from . import views

urlpatterns = [
    path('records/', views.RecordsView.as_view(), name='records'), #done
    path('appointments/<int:pk>/reschedule/', views.AppointmentRescheduleView.as_view(), name='reschedule-appointment'),
    path('appointments/create/',views.AppointmentCreateView.as_view(),name="Create-appointments"),   #done
    path('appointments/provider/', views.ProviderAppointmentsView.as_view(), name='provider-appointments'),  #done
    path('upcoming/', views.UpcomingAppointmentsView.as_view(), name='upcoming-appointments'), #done
    path('appointments/', views.AppointmentListCreateView.as_view(), name='appointment-list-create'), #discarded
    path('myappointments/', views.UserAppointmentsListView.as_view(), name='user-appointments'),#specific users appointment #done
]
