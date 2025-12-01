# swEtsy - Portfolio Project Description

## Project Overview

**swEtsy** is a full-stack e-commerce marketplace application inspired by Etsy. It enables users to list products, browse and search items, manage shopping carts, and leave reviews. Built as a team project through intensive development sessions, demonstrating full-stack web development capabilities with modern React and Flask architecture.

**Live Demo:** https://swetsy-app.herokuapp.com/

---

## Core Focus: Advanced State Management with Redux & Complex Search/Filtering System

### The Main Achievement

swEtsy showcases sophisticated state management using Redux with Redux-thunk for asynchronous operations, combined with a powerful server-side search and filtering system. The application demonstrates how to manage complex application state (products, cart, reviews, search results) while maintaining performance and user experience. The search functionality implements multi-criteria filtering with real-time query parameter synchronization, demonstrating advanced backend query construction and frontend state synchronization.

Key points about this achievement:

- **Redux State Management** - Centralized state management for products, cart items, reviews, search results, and user sessions with normalized data structures
- **Advanced Search & Filtering** - Server-side search with keyword matching, price range filtering, sorting options, and pagination support
- **Shopping Cart System** - Persistent cart with quantity management, real-time updates, and seamless integration with product browsing
- **Multi-Step Form Handling** - Complex product creation form with step-by-step validation and state persistence across navigation

### Technical Implementation

- **Redux with Redux-thunk** - Used for managing application-wide state with async action creators for API calls, enabling predictable state updates and separation of concerns
- **SQLAlchemy Query Building** - Dynamic query construction on the backend using SQLAlchemy's `ilike` for case-insensitive search, `or_` conditions for multi-field keyword matching, and flexible filtering
- **Normalized State Structure** - Redux store uses normalized data (objects keyed by ID) for efficient lookups and updates, with separate arrays for ordered lists
- **URL Query Parameter Sync** - Search filters are synchronized with URL query parameters, enabling shareable search results and browser back/forward navigation
- **Flask Blueprint Architecture** - Modular route organization with separate blueprints for auth, products, cart, search, and reviews, enabling maintainable code structure

### Challenge & Solution

**Challenge:** Managing cart state across page navigations while ensuring data consistency between Redux store and backend database, especially when users add items from different pages.

**Solution:** Implemented a normalized Redux store structure with cart items keyed by ID, combined with thunk actions that fetch cart state on app initialization and after mutations. Used `useRef` hooks to prevent duplicate API calls during component re-renders, and ensured cart updates immediately reflect in the UI through optimistic updates followed by server confirmation.

---

## Mobile-Responsive Design (Highlight)

### Achievement

swEtsy features **fully responsive design** with adaptive approach, demonstrating that complex e-commerce features like multi-step forms, shopping carts, and advanced search can work seamlessly on mobile devices.

### Implementation Highlights

- **Responsive Breakpoints** - Custom breakpoints: 480px (mobile), 768px (tablet), 1024px (desktop), 1200px (large desktop)
- **Mobile-Optimized Navigation** - Bottom navigation component for easy thumb access on mobile devices
- **Touch-Friendly Interfaces** - Large touch targets, swipe-friendly product cards, and mobile-optimized modals
- **Flexible Grid Layouts** - CSS Grid and Flexbox layouts that adapt from multi-column desktop views to single-column mobile layouts

### Challenge

Mobile responsiveness was implemented to ensure the application works across all device sizes, with particular attention to the multi-step product creation form and cart management interface on smaller screens.

---

## Full-Stack Architecture

### Frontend Stack
- **React** - Component-based UI framework for building interactive user interfaces
- **Redux** - State management library for predictable state updates across the application
- **Redux-thunk** - Middleware for handling asynchronous actions and API calls
- **React Router** - Client-side routing for single-page application navigation
- **React Scripts** - Build tool and development server via Create React App
- **CSS3** - Custom styling with responsive design patterns and CSS Grid/Flexbox

### Backend Stack
- **Python/Flask** - Lightweight web framework for RESTful API endpoints
- **PostgreSQL/SQLite** - Relational database (PostgreSQL for production, SQLite for development)
- **SQLAlchemy** - ORM for database operations, relationships, and query building
- **Flask-Login** - User session management and authentication
- **WTForms** - Server-side form validation and CSRF protection
- **Flask-Migrate/Alembic** - Database migration management

### Architecture Patterns
- **RESTful API Design** - Standard HTTP methods (GET, POST, PUT, DELETE) with JSON responses
- **Blueprint Pattern** - Modular route organization in Flask for maintainable code structure
- **Redux Pattern** - Unidirectional data flow with actions, reducers, and centralized store
- **Component Composition** - Reusable React components with props and state management
- **Integration Approach** - Frontend makes HTTP requests to Flask API endpoints, which query the database and return JSON responses that update Redux state

---

## Key Features (Brief Overview)

- **User Authentication** - Secure login/signup with Flask-Login session management and password hashing
- **Product Management** - CRUD operations for products with multi-step creation form and owner-based editing
- **Shopping Cart** - Add/remove items, quantity management, and purchase functionality with persistent state
- **Advanced Search** - Keyword search across product names/descriptions, price filtering, and sorting options
- **Review System** - Star ratings and text reviews with edit/delete functionality for user's own reviews
- **Product Browsing** - Grid-based product display with pagination and filtering capabilities

---

## Deployment

- **Heroku** - Cloud platform deployment with Docker containerization
- **Docker** - Containerized application for consistent deployment across environments
- **PostgreSQL** - Production database hosted on Heroku Postgres
- **Gunicorn** - Production WSGI server for Flask application

---

## Development Approach

Built as a collaborative team project through intensive development sessions, following agile development practices. The project was developed as a learning exercise to master full-stack web development, with focus on understanding state management patterns, RESTful API design, and database relationships. Features were developed iteratively, with continuous testing and refinement of user experience.

---

## Skills Demonstrated

- **Full-Stack Development** - Integrated React frontend with Flask backend, managing data flow from database to UI
- **State Management** - Implemented complex Redux store with multiple reducers, async thunks, and normalized data structures
- **Database Design** - Designed relational database schema with SQLAlchemy, including user, product, cart, and review models with proper relationships
- **API Development** - Built RESTful API endpoints with proper error handling, validation, and authentication
- **Responsive Design** - Created mobile-first responsive layouts using CSS Grid, Flexbox, and media queries
- **Authentication & Security** - Implemented secure user authentication with password hashing, CSRF protection, and session management

---

## Project Highlights Summary

**Primary Achievement:** Implemented sophisticated Redux state management system combined with advanced server-side search and filtering, demonstrating mastery of complex state synchronization between frontend and backend.

**Secondary Achievement:** Fully responsive design ensuring seamless user experience across all device sizes, with mobile-optimized navigation and touch-friendly interfaces.

**Technical Stack:** React, Redux, Redux-thunk, Flask, Python, SQLAlchemy, PostgreSQL, Docker, Heroku

**Development Style:** Collaborative team project developed through intensive development sessions as a comprehensive learning exercise in full-stack web development

---

