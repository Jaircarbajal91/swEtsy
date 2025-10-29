# swEtsy Codebase Journey

## Project Architecture Overview

**swEtsy** is a full-stack marketplace application inspired by Etsy, built with a Flask backend and React frontend. This document provides a comprehensive walkthrough of the codebase architecture, data flow, and key components.

## High-Level Architecture

```
┌─────────────────┐    HTTP/REST API    ┌─────────────────┐
│   React Frontend │ ◄─────────────────► │  Flask Backend  │
│   (Port 3000)   │                     │  (Port 5000)    │
└─────────────────┘                     └─────────────────┘
         │                                       │
         │                                       │
         ▼                                       ▼
┌─────────────────┐                     ┌─────────────────┐
│   Redux Store   │                     │   PostgreSQL    │
│   (State Mgmt)  │                     │   / SQLite      │
└─────────────────┘                     └─────────────────┘
```

## Backend Architecture (Flask)

### 1. Application Structure (`app/`)

#### Core Application (`app/__init__.py`)
```python
# Key components:
- Flask app initialization
- Blueprint registration for modular routing
- Database initialization with SQLAlchemy
- Flask-Login setup for authentication
- CORS configuration for frontend communication
- CSRF protection
- HTTPS redirect for production
```

**Key Features:**
- **Blueprints**: Modular route organization (`auth_routes`, `product_routes`, etc.)
- **Authentication**: Flask-Login integration with user session management
- **Security**: CSRF tokens, HTTPS redirects, secure cookies
- **Database**: SQLAlchemy ORM with migration support

#### Configuration (`app/config.py`)
```python
class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY')
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO = True
```

**Environment Variables:**
- `SECRET_KEY`: Flask session encryption
- `DATABASE_URL`: Database connection string
- `FLASK_ENV`: Development/production mode
- `FLASK_APP`: Application entry point

### 2. Data Models (`app/models/`)

#### User Model (`app/models/user.py`)
```python
class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(40), nullable=False)
    last_name = db.Column(db.String(40), nullable=False)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    
    # Relationships
    products = db.relationship("Product", back_populates="user")
    carts = db.relationship("Cart", back_populates="user")
    user_reviews = db.relationship('Review', back_populates='user')
```

**Features:**
- Password hashing with Werkzeug
- Flask-Login integration
- Relationships to products, cart, and reviews
- JSON serialization with `to_dict()`

#### Product Model (`app/models/product.py`)
```python
class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    image = db.Column(db.String(300), nullable=False)
    price = db.Column(db.Float, nullable=False)
    create_at = db.Column(db.DateTime, nullable=False)
    update_at = db.Column(db.DateTime, nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    
    # Relationships
    user = db.relationship("User", back_populates="products")
    carts = db.relationship("Cart", back_populates="product")
    reviews = db.relationship('Review', back_populates='product')
```

**Features:**
- Foreign key relationship to User
- Cascade delete for related cart items and reviews
- Timestamp tracking for creation and updates
- JSON serialization

#### Additional Models
- **Cart**: Shopping cart items with quantity
- **Review**: Product reviews with ratings
- **Database**: SQLAlchemy instance for ORM operations

### 3. API Routes (`app/api/`)

#### Authentication Routes (`app/api/auth_routes.py`)
```python
@auth_routes.route('/login', methods=['POST'])
def login():
    # Validate credentials
    # Create user session
    # Return user data

@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    # Validate form data
    # Create new user
    # Hash password
    # Return user data
```

#### Product Routes (`app/api/product_routes.py`)
```python
@product_routes.route('', methods=['GET'])
def get_products():
    # Fetch all products
    # Return JSON response

@product_routes.route('/<int:id>', methods=['GET'])
def get_product(id):
    # Fetch single product
    # Include reviews and owner info
    # Return JSON response
```

#### Cart Routes (`app/api/cart_routes.py`)
```python
@cart_routes.route('', methods=['GET'])
def get_cart_items():
    # Fetch user's cart items
    # Return JSON response

@cart_routes.route('', methods=['POST'])
def add_to_cart():
    # Validate product exists
    # Add/update cart item
    # Return updated cart
```

### 4. Forms (`app/forms/`)

WTForms for server-side validation:
- **LoginForm**: Username/password validation
- **SignupForm**: User registration validation
- **NewProductForm**: Product creation validation
- **ReviewForm**: Review submission validation
- **CartItemForm**: Cart item validation

### 5. Database Seeding (`app/seeds/`)

```python
def seed_users():
    demo = User(username='Demo', email='demo@aa.io', password='password')
    # Add more users...

def seed_products():
    # Create sample products with images and descriptions
```

## Frontend Architecture (React)

### 1. Application Structure (`react-app/src/`)

#### Main App Component (`src/App.js`)
```javascript
function App() {
  const [loaded, setLoaded] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  
  useEffect(() => {
    dispatch(authenticate());
    dispatch(getProductsThunk());
    if (sessionUser) {
      dispatch(getCartItemsThunk());
    }
    setLoaded(true);
  }, [dispatch, cartItems?.length]);
```

**Key Features:**
- **Authentication**: Auto-authenticate on app load
- **Data Loading**: Fetch products and cart items
- **Modal Management**: Login/signup modal state
- **Route Protection**: Protected routes for authenticated users

### 2. Redux Store (`src/store/`)

#### Store Structure
```javascript
// src/store/index.js
const rootReducer = combineReducers({
  session: sessionReducer,
  products: productsReducer,
  cart: cartReducer,
  reviews: reviewsReducer,
  search: searchReducer
});
```

#### Session Store (`src/store/session.js`)
```javascript
const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case REMOVE_USER:
      return { ...state, user: null };
    default:
      return state;
  }
};
```

**Features:**
- User authentication state
- Login/logout actions
- Session persistence

#### Products Store (`src/store/products.js`)
```javascript
const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return { ...state, productsList: action.payload };
    case GET_PRODUCT:
      return { ...state, currentProduct: action.payload };
    default:
      return state;
  }
};
```

**Features:**
- Product list management
- Individual product details
- CRUD operations for products

#### Cart Store (`src/store/cart.js`)
```javascript
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CART_ITEMS:
      return { ...state, cartItemsList: action.payload };
    case ADD_TO_CART:
      return { ...state, cartItemsList: [...state.cartItemsList, action.payload] };
    default:
      return state;
  }
};
```

**Features:**
- Cart item management
- Quantity updates
- Cart total calculations

### 3. Components (`src/components/`)

#### Authentication Components
- **LoginForm**: User login with validation
- **SignUpForm**: User registration
- **ProtectedRoute**: Route protection wrapper
- **LogoutButton**: User logout functionality

#### Product Components
- **Products**: Main product listing page
- **Product**: Individual product card
- **ProductDetail**: Detailed product view
- **CreateProductPage**: Multi-step product creation
- **UpdateProduct**: Product editing modal

#### Cart Components
- **Cart**: Shopping cart page
- **CartItem**: Individual cart item
- **CartTotalCard**: Cart summary and checkout

#### Review Components
- **Reviews**: Product reviews display
- **MyReviews**: User's review management
- **CreateReview**: Review creation form
- **UpdateMyReview**: Review editing

#### Navigation Components
- **NavBar**: Main navigation with search
- **BottomNav**: Mobile navigation
- **SearchBar**: Product search functionality
- **SearchResult**: Search results page

### 4. Context (`src/context/`)

#### Modal Context (`src/context/Modal.js`)
```javascript
export const Modal = ({ onClose, children }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);
```

**Features:**
- Modal overlay management
- Escape key handling
- Click-outside-to-close functionality

## Data Flow Architecture

### 1. User Authentication Flow

```
1. User clicks Login → LoginForm component
2. Form submission → Redux action (loginThunk)
3. API call → Flask auth_routes.login
4. Server validates → Returns user data
5. Redux updates state → User logged in
6. Protected routes become accessible
```

### 2. Product Browsing Flow

```
1. App loads → getProductsThunk action
2. API call → Flask product_routes.get_products
3. Server queries database → Returns product list
4. Redux updates products state
5. Products component renders → Product cards displayed
```

### 3. Shopping Cart Flow

```
1. User clicks "Add to Cart" → addToCartThunk action
2. API call → Flask cart_routes.add_to_cart
3. Server creates/updates cart item
4. Redux updates cart state
5. Cart component re-renders → Updated cart display
```

### 4. Search Flow

```
1. User types in search → SearchBar component
2. Form submission → searchThunk action
3. API call → Flask search_routes.search
4. Server filters products → Returns filtered results
5. Redux updates search state
6. SearchResult component renders → Filtered products
```

## Key Features Implementation

### 1. Multi-Step Product Creation
- **Step 1**: Basic product info (name, description)
- **Step 2**: Pricing and images
- **Step 3**: Additional details
- **Step 4**: Review and submit
- Uses React state to manage form data across steps

### 2. Review System
- **Star Rating**: Custom star component with half-star support
- **Review Management**: Users can edit/delete their reviews
- **Product Reviews**: Display all reviews for a product
- **Average Rating**: Calculated from all reviews

### 3. Search and Filtering
- **Text Search**: Product name and description search
- **Price Filtering**: Min/max price range
- **Sorting**: Price, date, rating sorting options
- **Real-time Results**: Updates as user types

### 4. Responsive Design
- **Mobile-First**: Bottom navigation for mobile
- **Desktop Navigation**: Top navigation bar
- **Flexible Layouts**: CSS Grid and Flexbox
- **Touch-Friendly**: Large buttons and touch targets

## Security Considerations

### Backend Security
- **Password Hashing**: Werkzeug security for password hashing
- **CSRF Protection**: Flask-WTF CSRF tokens
- **Session Management**: Flask-Login secure sessions
- **Input Validation**: WTForms server-side validation
- **SQL Injection Prevention**: SQLAlchemy ORM protection

### Frontend Security
- **XSS Prevention**: React's built-in XSS protection
- **CSRF Tokens**: Included in API requests
- **Route Protection**: Protected routes for authenticated users
- **Input Sanitization**: Form validation and sanitization

## Performance Considerations

### Backend Performance
- **Database Indexing**: Primary keys and foreign keys indexed
- **Query Optimization**: SQLAlchemy query optimization
- **Connection Pooling**: Database connection management
- **Caching**: Potential for Redis caching (not implemented)

### Frontend Performance
- **Component Optimization**: React.memo for expensive components
- **Redux Optimization**: Selective state updates
- **Image Optimization**: Optimized image loading
- **Bundle Splitting**: Code splitting for better loading

## Deployment Architecture

### Docker Configuration
```dockerfile
FROM python:3.9
ENV REACT_APP_BASE_URL=https://swetsy-app.herokuapp.com/
ENV FLASK_APP=app
ENV FLASK_ENV=production
WORKDIR /var/www
COPY . .
COPY /react-app/build/* app/static/
RUN pip install -r requirements.txt
RUN pip install psycopg2
CMD gunicorn app:app
```

### Production Setup
- **Frontend**: Built React app served by Flask
- **Backend**: Gunicorn WSGI server
- **Database**: PostgreSQL on Heroku
- **Static Files**: Served by Flask static file handling
- **HTTPS**: Automatic HTTP to HTTPS redirects

## Areas for Improvement

### Code Quality
1. **Testing**: Add unit tests for backend and frontend
2. **Linting**: ESLint for React, Black for Python
3. **Type Safety**: TypeScript for React, type hints for Python
4. **Documentation**: API documentation with Swagger

### Performance
1. **Caching**: Redis for session and data caching
2. **Database**: Query optimization and indexing
3. **Frontend**: Code splitting and lazy loading
4. **Images**: CDN for image hosting

### Features
1. **Payment**: Stripe integration for payments
2. **Categories**: Product categorization system
3. **Image Upload**: Multiple image uploads
4. **Notifications**: Real-time notifications
5. **Admin Panel**: Admin interface for management

### Security
1. **Rate Limiting**: API rate limiting
2. **Input Validation**: Enhanced validation
3. **Audit Logging**: User action logging
4. **Data Encryption**: Sensitive data encryption

This journey provides a comprehensive understanding of the swEtsy codebase architecture, data flow, and implementation details. It serves as a reference for understanding the system's design decisions and areas for future improvement.
