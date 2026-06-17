# 🛒 Full Stack E-Commerce Web Application

A fully functional e-commerce platform with separate user and admin modules — built with HTML/CSS/JS, Bootstrap, Node.js, PHP, and MySQL.

🔗 **GitHub:** [github.com/techAsmita](https://github.com/techAsmita)

---

## ✨ Features

### 👤 User
- Register, login, and secure authentication
- Browse and search products by category
- Add/remove items from cart, update quantities
- Checkout and place orders
- View order history

### 🔧 Admin
- Add, edit, and delete products and categories
- Inventory management
- View and process orders
- Manage users

---

## 🛠️ Tech Stack

| Layer | Tech |
|---|---|
| Frontend | HTML5, CSS3, JavaScript, Bootstrap |
| Backend | Node.js, PHP |
| Database | MySQL |
| Local Server | XAMPP |

---

## 🗄️ Database Schema

**Tables:** `users` · `products` · `categories` · `orders` · `cart`

**Key relationships:**
- One user → many orders
- One order → many products (via cart)
- Admin manages products and categories

---

## ⚙️ Local Setup

```bash
# 1. Clone the repository
git clone https://github.com/techAsmita/ecommerce-project.git
cd ecommerce-project

# 2. Import the database
# Open phpMyAdmin → import the provided .sql file
# Update DB credentials in the config file

# 3. Start the server
# Option A: Start XAMPP (Apache + MySQL)
# Option B: node server.js

# 4. Open in browser
# http://localhost/ecommerce-project
```

---

## 🗺️ Architecture

```
Browser (HTML/CSS/JS + Bootstrap)
        ↓
Backend (Node.js / PHP)
        ↓
MySQL Database
```

---

## 🔮 Planned Improvements

- Payment gateway integration
- Product reviews and ratings
- Recommendation system
- Cloud deployment + Docker support

---

## 👩‍💻 Author

**Asmita**  
B.E. Computer Engineering — Thapar Institute of Engineering and Technology  
[![LinkedIn](https://img.shields.io/badge/LinkedIn-techasmita-blue)](https://www.linkedin.com/in/techasmita/)
[![GitHub](https://img.shields.io/badge/GitHub-techAsmita-black)](https://github.com/techAsmita)
