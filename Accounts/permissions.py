from rest_framework import permissions

class IsOwner(permissions.BasePermission):
    """
    Custom permission to only allow users to view, update, or delete their own profile.
    """
    def has_object_permission(self, request, view, obj):
        # Check if the user making the request is the owner of the profile  
        return obj.user == request.user
