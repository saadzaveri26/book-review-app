## Book Review Platform - MERN Stack
A full-stack web application built with the MERN (MongoDB, Express, React, Node.js) stack where users can sign up, log in, browse, add, and review books. This project demonstrates skills in building a complete RESTful API, managing user authentication with JWT, and creating a dynamic frontend with React.

## 🚀 Live Demo
Frontend (Vercel): https://book-review-app-two-beryl.vercel.app/

Backend (Render): https://book-review-app-xue2.onrender.com

## ✨ Features
User Authentication: Secure signup and login with JWT (JSON Web Tokens).

Protected Routes: Only authenticated users can add/review books or view their profile.

Book Management (CRUD): Users can create, read, update, and delete books they have added.

Review System: Users can add a star rating (1-5) and a text review to any book.

Pagination: The main book list is paginated to handle large amounts of data.

Dynamic Ratings: Average ratings are calculated and displayed in real-time.

Live Search: Instantly search for books by title.

User Profiles: A dedicated page for users to see all the books they have personally published.

## 🛠️ Technologies Used
Frontend: React, React Router, Tailwind CSS, Axios, jwt-decode

Backend: Node.js, Express.js

Database: MongoDB (with Mongoose)

Authentication: JWT, bcrypt.js

Deployment: Vercel (Frontend), Render (Backend)

## 📦 Setup and Installation
To run this project locally, follow these steps:

1. Clone the repository
Bash

git clone https://github.com/your-username/book-review-app.git
cd book-review-app
2. Backend Setup
Bash

# Navigate to the backend folder
cd backend

# Install dependencies
npm install

# Create a .env file and add your variables
touch .env
Your /backend/.env file should contain:

MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_super_secret_jwt_key
Bash

# Start the backend server
npm start
3. Frontend Setup
Bash

# Navigate to the frontend folder
cd frontend

# Install dependencies
npm install

# Start the React development server
npm start
The application will be available at http://localhost:3000.
