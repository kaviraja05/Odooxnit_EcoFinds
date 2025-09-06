# Ecofinds - Sustainable Secondhand Marketplace

A full-stack web application for buying and selling secondhand items, promoting sustainability and circular economy.

## 🌱 Features

- **User Authentication**: JWT-based login/signup system
- **Product Listings**: Browse, search, and filter products
- **Post Products**: Authenticated users can list items for sale
- **Categories**: Organized product categories
- **Search & Filter**: Find products by title, location, category, and condition
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS

## 🛠️ Technology Stack

### Backend
- **Django 4.2.7**: Web framework
- **Django REST Framework**: API development
- **JWT Authentication**: Secure user authentication
- **SQLite**: Database (development)
- **Django CORS**: Cross-origin resource sharing

### Frontend
- **React 18**: User interface
- **React Router**: Client-side routing
- **Axios**: HTTP client for API calls
- **Tailwind CSS**: Styling and responsive design

## 📁 Project Structure

```
ecofinds/
├── backend/
│   ├── ecofinds_backend/     # Django project settings
│   │   ├── settings.py       # Django configuration
│   │   ├── urls.py          # Main URL routing
│   │   └── wsgi.py          # WSGI application
│   ├── products/            # Products app
│   │   ├── models.py        # Product and Category models
│   │   ├── views.py         # API views
│   │   ├── serializers.py   # Data serialization
│   │   └── urls.py          # Product URLs
│   ├── users/               # Users app
│   │   ├── models.py        # User profile model
│   │   ├── views.py         # User API views
│   │   ├── serializers.py   # User serialization
│   │   └── urls.py          # User URLs
│   ├── requirements.txt     # Python dependencies
│   └── manage.py           # Django management
└── frontend/
    ├── src/
    │   ├── components/      # React components
    │   │   ├── ProductList.js
    │   │   ├── ProductForm.js
    │   │   └── Navbar.js
    │   ├── pages/          # Page components
    │   │   ├── Home.js
    │   │   ├── Login.js
    │   │   └── Signup.js
    │   ├── App.js          # Main app component
    │   ├── api.js          # API integration
    │   └── index.js        # App entry point
    ├── package.json        # Node.js dependencies
    └── tailwind.config.js  # Tailwind configuration
```

## 🚀 Getting Started

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd ecofinds/backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   ```

3. Activate the virtual environment:
   ```bash
   # Windows
   venv\Scripts\activate
   
   # macOS/Linux
   source venv/bin/activate
   ```

4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

5. Run migrations:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

6. Create a superuser (optional):
   ```bash
   python manage.py createsuperuser
   ```

7. Start the development server:
   ```bash
   python manage.py runserver
   ```

The backend will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd ecofinds/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The frontend will be available at `http://localhost:3000`

## 📚 API Endpoints

### Authentication
- `POST /api/users/register/` - User registration
- `POST /api/users/login/` - User login
- `POST /api/token/refresh/` - Refresh JWT token
- `GET /api/users/profile/` - Get user profile
- `PUT /api/users/profile/update/` - Update user profile

### Products
- `GET /api/products/` - List products (with search and filter)
- `POST /api/products/` - Create product (authenticated)
- `GET /api/products/{id}/` - Get product details
- `PUT /api/products/{id}/` - Update product (owner only)
- `DELETE /api/products/{id}/` - Delete product (owner only)
- `GET /api/products/categories/` - List categories
- `GET /api/products/my-products/` - Get user's products

## 🎨 UI Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Search & Filter**: Find products by multiple criteria
- **User Authentication**: Secure login/signup forms
- **Product Management**: Easy-to-use product posting form
- **Modern UI**: Clean design with Tailwind CSS

## 🔧 Development

### Adding Categories
To add product categories, use the Django admin interface or create fixtures:

```python
# In Django shell (python manage.py shell)
from products.models import Category
Category.objects.create(name="Electronics", description="Electronic devices")
Category.objects.create(name="Clothing", description="Clothing and accessories")
Category.objects.create(name="Books", description="Books and magazines")
Category.objects.create(name="Home & Garden", description="Home and garden items")
```

### Environment Variables
For production, set these environment variables:
- `SECRET_KEY`: Django secret key
- `DEBUG`: Set to False for production
- `ALLOWED_HOSTS`: Comma-separated list of allowed hosts

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🌍 Sustainability Mission

Ecofinds promotes sustainable consumption by:
- Extending product lifecycles through secondhand sales
- Reducing waste and environmental impact
- Building community connections
- Making sustainable choices accessible and affordable
