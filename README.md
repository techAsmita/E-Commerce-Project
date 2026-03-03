# Full Stack E-Commerce Web Application

## Project Overview

A dynamic and fully functional full stack e-commerce web application built using HTML, CSS, JavaScript, Bootstrap, Node.js, PHP, and MySQL. 

The platform enables users to browse products, manage shopping carts, and place orders, while administrators can manage inventory and monitor transactions.

This project simulates a real-world online retail system with complete frontend, backend, and database integration.

---

## Core Features

### User Module
- User Registration and Login
- Secure Authentication
- Browse Products by Category
- Search Products
- Add to Cart and Remove from Cart
- Update Product Quantity
- Checkout and Order Placement
- View Order History

### Admin Module
- Add, Update, and Delete Products
- Manage Categories
- Inventory Management
- View and Process Orders
- Manage Users

---

## Tech Stack

### Frontend
- HTML5
- CSS3
- JavaScript
- Bootstrap

### Backend
- Node.js
- PHP

### Database
- MySQL

---

## System Architecture

Client (Frontend)  
→ Backend Server (Node.js / PHP)  
→ MySQL Database  

The frontend communicates with backend scripts, which handle business logic and interact with the database for persistent storage.

---

## Database Design

Main Tables:
- Users
- Products
- Categories
- Orders
- Cart

Relationships:
- One user can place multiple orders
- One order can contain multiple products
- Admin manages products and categories

---

## Installation and Setup

1. Clone the repository

git clone https://github.com/yourusername/ecommerce-project.git

2. Configure Database
- Import the provided SQL file into MySQL
- Update database credentials in configuration files

3. Run the Application
- Start local server (XAMPP or Node server)
- Open the application in browser

---

## Future Improvements

- Payment Gateway Integration
- Product Reviews and Ratings
- Recommendation System
- Cloud Deployment
- Docker Support

---

## Learning Outcomes

- Full stack web development
- RESTful API integration
- Authentication and authorization
- Relational database design
- Real-world project architecture
