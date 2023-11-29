from rest_framework import permissions

class IsOwner(permissions.BasePermission):
    """
    Custom permission to only allow users to view, update, or delete their own profile.
    """
    def has_object_permission(self, request, view, obj):
        return obj.user == request.user
