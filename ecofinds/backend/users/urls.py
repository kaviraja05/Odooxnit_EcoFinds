from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.UserRegistrationView.as_view(), name='user-register'),
    path('login/', views.login_view, name='user-login'),
    path('profile/', views.profile_view, name='user-profile'),
    path('profile/update/', views.update_profile_view, name='user-profile-update'),
]
