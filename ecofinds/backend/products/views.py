from rest_framework import generics, permissions, filters
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import Product, Category
from .serializers import ProductSerializer, CategorySerializer


class ProductListCreateView(generics.ListCreateAPIView):
    queryset = Product.objects.filter(is_available=True)
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'condition', 'seller']
    search_fields = ['title', 'description', 'location']
    ordering_fields = ['price', 'created_at']
    ordering = ['-created_at']


class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_permissions(self):
        if self.request.method in ['PUT', 'PATCH', 'DELETE']:
            return [permissions.IsAuthenticated()]
        return [permissions.IsAuthenticatedOrReadOnly()]

    def perform_update(self, serializer):
        if self.request.user != self.get_object().seller:
            raise permissions.PermissionDenied("You can only edit your own products.")
        serializer.save()

    def perform_destroy(self, instance):
        if self.request.user != instance.seller:
            raise permissions.PermissionDenied("You can only delete your own products.")
        instance.delete()


class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.AllowAny]


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def user_products(request):
    """Get products for the authenticated user"""
    products = Product.objects.filter(seller=request.user)
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)
