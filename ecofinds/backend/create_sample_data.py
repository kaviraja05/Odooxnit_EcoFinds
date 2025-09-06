#!/usr/bin/env python
import os
import sys
import django

# Add the project directory to Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ecofinds_backend.settings')
django.setup()

from django.contrib.auth.models import User
from products.models import Category, Product

def create_sample_data():
    print("Creating sample data...")
    
    # Create a sample user if none exists
    if not User.objects.filter(username='sampleuser').exists():
        user = User.objects.create_user(
            username='sampleuser',
            email='sample@example.com',
            password='password123',
            first_name='Sample',
            last_name='User'
        )
        print(f"Created user: {user.username}")
    else:
        user = User.objects.get(username='sampleuser')
        print(f"Using existing user: {user.username}")
    
    # Create categories
    categories_data = [
        {'name': 'Electronics', 'description': 'Phones, laptops, gadgets, and tech accessories'},
        {'name': 'Furniture', 'description': 'Tables, chairs, sofas, and home decor'},
        {'name': 'Clothing', 'description': 'Fashion, apparel, shoes, and accessories'},
        {'name': 'Books', 'description': 'Educational, recreational, and rare books'},
        {'name': 'Sports & Outdoors', 'description': 'Sports equipment, fitness gear, and outdoor activities'},
        {'name': 'Home & Garden', 'description': 'Home improvement, gardening tools, and decor'},
        {'name': 'Automotive', 'description': 'Car parts, tools, and automotive accessories'},
        {'name': 'Art & Collectibles', 'description': 'Artwork, antiques, and collectible items'},
        {'name': 'Musical Instruments', 'description': 'Guitars, keyboards, drums, and audio equipment'},
        {'name': 'Health & Beauty', 'description': 'Skincare, makeup, and wellness products'},
        {'name': 'Toys & Games', 'description': 'Board games, video games, and children\'s toys'},
        {'name': 'Jewelry & Watches', 'description': 'Fine jewelry, watches, and accessories'},
    ]
    
    for cat_data in categories_data:
        category, created = Category.objects.get_or_create(
            name=cat_data['name'],
            defaults={'description': cat_data['description']}
        )
        if created:
            print(f"Created category: {category.name}")
    
    # Get all users for products
    users = User.objects.all()
    if not users:
        print("No users found!")
        return
    
    # Create sample products
    products_data = [
        # Electronics
        {
            'title': 'iPhone 13 Pro - Like New',
            'description': 'Barely used iPhone 13 Pro in pristine condition. Includes original charger, box, and screen protector applied.',
            'price': 650.00,
            'condition': 'excellent',
            'category': 'Electronics',
            'location': 'New York, NY',
            'image_url': 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=400&fit=crop'
        },
        {
            'title': 'MacBook Air M1 2020',
            'description': 'Lightly used MacBook Air with M1 chip. Great for students and professionals. Battery life still excellent.',
            'price': 799.00,
            'condition': 'good',
            'category': 'Electronics',
            'location': 'Seattle, WA',
            'image_url': 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=400&fit=crop'
        },
        {
            'title': 'Nintendo Switch Console',
            'description': 'Nintendo Switch with Joy-Con controllers. Includes dock and charger. Light usage.',
            'price': 250.00,
            'condition': 'excellent',
            'category': 'Electronics',
            'location': 'Miami, FL',
            'image_url': 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=500&h=400&fit=crop'
        },
        {
            'title': 'Sony WH-1000XM4 Headphones',
            'description': 'Premium noise-canceling headphones in excellent condition. All accessories included.',
            'price': 180.00,
            'condition': 'excellent',
            'category': 'Electronics',
            'location': 'Los Angeles, CA',
            'image_url': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=400&fit=crop'
        },
        
        # Furniture
        {
            'title': 'Mid-Century Modern Chair',
            'description': 'Iconic mid-century modern chair with original upholstery. Perfect statement piece for any room.',
            'price': 145.00,
            'condition': 'good',
            'category': 'Furniture',
            'location': 'Austin, TX',
            'image_url': 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=400&fit=crop'
        },
        {
            'title': 'Vintage Leather Sofa',
            'description': 'Beautiful vintage leather sofa with rich patina. Comfortable and stylish for any living space.',
            'price': 450.00,
            'condition': 'good',
            'category': 'Furniture',
            'location': 'Chicago, IL',
            'image_url': 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=400&fit=crop'
        },
        {
            'title': 'Vintage Wooden Coffee Table',
            'description': 'Beautiful vintage coffee table made from solid oak. Perfect for living room. Some minor wear adds character.',
            'price': 150.00,
            'condition': 'good',
            'category': 'Furniture',
            'location': 'Austin, TX',
            'image_url': 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=500&h=400&fit=crop'
        },
        {
            'title': 'Comfortable Office Chair',
            'description': 'Ergonomic office chair in great condition. Perfect for home office setup.',
            'price': 120.00,
            'condition': 'excellent',
            'category': 'Furniture',
            'location': 'Los Angeles, CA',
            'image_url': 'https://images.unsplash.com/photo-1541558869434-2840d308329a?w=500&h=400&fit=crop'
        },
        
        # Clothing
        {
            'title': 'Vintage Leather Jacket',
            'description': 'Classic leather jacket in excellent condition. Timeless style that never goes out of fashion.',
            'price': 89.00,
            'condition': 'excellent',
            'category': 'Clothing',
            'location': 'Boston, MA',
            'image_url': 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=400&fit=crop'
        },
        {
            'title': 'Designer Winter Coat',
            'description': 'Warm winter coat from premium brand. Size Medium. Dry cleaned and ready to wear.',
            'price': 85.00,
            'condition': 'excellent',
            'category': 'Clothing',
            'location': 'New York, NY',
            'image_url': 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=500&h=400&fit=crop'
        },
        {
            'title': 'Vintage Denim Jacket',
            'description': 'Classic denim jacket with perfect fade. Comfortable fit and great condition.',
            'price': 45.00,
            'condition': 'good',
            'category': 'Clothing',
            'location': 'Portland, OR',
            'image_url': 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=500&h=400&fit=crop'
        },
        
        # Books
        {
            'title': 'Complete Harry Potter Book Set',
            'description': 'All 7 Harry Potter books in good condition. Perfect for a new reader or collector.',
            'price': 45.00,
            'condition': 'good',
            'category': 'Books',
            'location': 'Chicago, IL',
            'image_url': 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500&h=400&fit=crop'
        },
        {
            'title': 'Programming Books Collection',
            'description': 'Collection of programming and computer science books. Great for students and professionals.',
            'price': 65.00,
            'condition': 'good',
            'category': 'Books',
            'location': 'San Francisco, CA',
            'image_url': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=400&fit=crop'
        },
        
        # Sports & Outdoors
        {
            'title': 'Mountain Bike - Trek 29er',
            'description': 'Well-maintained mountain bike perfect for trails. Recently tuned up with new tires.',
            'price': 450.00,
            'condition': 'good',
            'category': 'Sports & Outdoors',
            'location': 'Denver, CO',
            'image_url': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=400&fit=crop'
        },
        {
            'title': 'Yoga Mat Set',
            'description': 'High-quality yoga mat with carrying strap and blocks. Perfect for home or studio practice.',
            'price': 35.00,
            'condition': 'excellent',
            'category': 'Sports & Outdoors',
            'location': 'San Diego, CA',
            'image_url': 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=400&fit=crop'
        },
        
        # Home & Garden
        {
            'title': 'Garden Tool Set',
            'description': 'Complete garden tool set including shovel, rake, and pruning shears. Great for gardening enthusiasts.',
            'price': 35.00,
            'condition': 'good',
            'category': 'Home & Garden',
            'location': 'Portland, OR',
            'image_url': 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&h=400&fit=crop'
        },
        {
            'title': 'Ceramic Plant Pots Set',
            'description': 'Beautiful set of ceramic plant pots in various sizes. Perfect for indoor plants.',
            'price': 25.00,
            'condition': 'excellent',
            'category': 'Home & Garden',
            'location': 'Nashville, TN',
            'image_url': 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500&h=400&fit=crop'
        },
        
        # Musical Instruments
        {
            'title': 'Acoustic Guitar - Yamaha',
            'description': 'Beautiful acoustic guitar in excellent condition. Perfect for beginners or experienced players.',
            'price': 180.00,
            'condition': 'excellent',
            'category': 'Musical Instruments',
            'location': 'Nashville, TN',
            'image_url': 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=400&fit=crop'
        },
        {
            'title': 'Digital Piano Keyboard',
            'description': '88-key digital piano with weighted keys. Includes stand and pedal. Great for learning.',
            'price': 320.00,
            'condition': 'good',
            'category': 'Musical Instruments',
            'location': 'Atlanta, GA',
            'image_url': 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=500&h=400&fit=crop'
        },
        
        # Art & Collectibles
        {
            'title': 'Vintage Canvas Painting',
            'description': 'Beautiful vintage landscape painting on canvas. Perfect for art collectors.',
            'price': 125.00,
            'condition': 'good',
            'category': 'Art & Collectibles',
            'location': 'Santa Fe, NM',
            'image_url': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=400&fit=crop'
        },
        {
            'title': 'Vintage Camera Collection',
            'description': 'Collection of vintage film cameras. Great for photography enthusiasts and collectors.',
            'price': 95.00,
            'condition': 'good',
            'category': 'Art & Collectibles',
            'location': 'San Francisco, CA',
            'image_url': 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=500&h=400&fit=crop'
        },
        
        # Jewelry & Watches
        {
            'title': 'Vintage Gold Watch',
            'description': 'Classic vintage gold watch in working condition. Elegant timepiece with timeless design.',
            'price': 150.00,
            'condition': 'good',
            'category': 'Jewelry & Watches',
            'location': 'Miami, FL',
            'image_url': 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&h=400&fit=crop'
        },
        {
            'title': 'Silver Jewelry Set',
            'description': 'Beautiful silver necklace and earrings set. Perfect for special occasions.',
            'price': 45.00,
            'condition': 'excellent',
            'category': 'Jewelry & Watches',
            'location': 'Las Vegas, NV',
            'image_url': 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&h=400&fit=crop'
        },
        
        # Toys & Games
        {
            'title': 'Board Game Collection',
            'description': 'Collection of popular board games in excellent condition. Perfect for family game nights.',
            'price': 55.00,
            'condition': 'excellent',
            'category': 'Toys & Games',
            'location': 'Minneapolis, MN',
            'image_url': 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=500&h=400&fit=crop'
        },
        {
            'title': 'LEGO Architecture Set',
            'description': 'Complete LEGO Architecture set with original box and instructions. Perfect for collectors.',
            'price': 75.00,
            'condition': 'excellent',
            'category': 'Toys & Games',
            'location': 'Phoenix, AZ',
            'image_url': 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=500&h=400&fit=crop'
        },
        
        # Automotive
        {
            'title': 'Car Tool Kit',
            'description': 'Professional car tool kit with all essential tools. Perfect for DIY car maintenance.',
            'price': 85.00,
            'condition': 'good',
            'category': 'Automotive',
            'location': 'Detroit, MI',
            'image_url': 'https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?w=500&h=400&fit=crop'
        },
        
        # Health & Beauty
        {
            'title': 'Essential Oils Set',
            'description': 'Complete set of essential oils for aromatherapy and wellness. All bottles nearly full.',
            'price': 40.00,
            'condition': 'excellent',
            'category': 'Health & Beauty',
            'location': 'Boulder, CO',
            'image_url': 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&h=400&fit=crop'
        }
    ]
    
    for product_data in products_data:
        try:
            category = Category.objects.get(name=product_data['category'])
            seller = users[0]  # Use first user as seller
            
            product, created = Product.objects.get_or_create(
                title=product_data['title'],
                defaults={
                    'description': product_data['description'],
                    'price': product_data['price'],
                    'condition': product_data['condition'],
                    'category': category,
                    'seller': seller,
                    'location': product_data['location'],
                    'image_url': product_data['image_url'],
                    'is_available': True
                }
            )
            
            if created:
                print(f"Created product: {product.title}")
            else:
                print(f"Product already exists: {product.title}")
                
        except Category.DoesNotExist:
            print(f"Category '{product_data['category']}' not found!")
        except Exception as e:
            print(f"Error creating product '{product_data['title']}': {e}")
    
    print("Sample data creation completed!")

if __name__ == '__main__':
    create_sample_data()
