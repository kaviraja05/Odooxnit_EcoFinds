from django.contrib import admin
from .models import Category, Product


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'description', 'created_at']
    search_fields = ['name']


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['title', 'price', 'condition', 'category', 'seller', 'is_available', 'created_at']
    list_filter = ['condition', 'category', 'is_available', 'created_at']
    search_fields = ['title', 'description', 'location']
    list_per_page = 20
