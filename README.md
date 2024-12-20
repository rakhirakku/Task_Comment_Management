# Task Comment Management Project

This project is a full-stack application with **Laravel** as the backend and **React** as the frontend. It allows users to manage tasks, add comments, and perform basic CRUD operations. 

## Prerequisites

Before setting up this project, ensure you have the following installed on your machine:

1. **PHP** (>= 8.0)
2. **Composer** (Dependency manager for PHP)
3. **Node.js** (>= 14) and **npm** (Package manager for JavaScript)
4. **MySQL** (Database)
5. **Git** (Version control system)

---

## Backend Setup (Laravel)

Follow these steps to set up the Laravel backend.

### 1. Navigate to the Backend Directory
cd backend
### 2. Install PHP Dependencies
composer install
### 3. Set Up Environment File
cp .env.example .env
### 4.Generate Application Key
php artisan key:generate
### 5. Run Migrations and Seeders
Create the database in MySQL.  

Run migrations to set up the database tables:  

**php artisan migrate**  

Seed the database with sample data:  

**php artisan db:seed**  

### 6. Serve the Backend
**php artisan serve**  

The backend will run at http://127.0.0.1:8000.

# Frontend Setup (React)

Follow these steps to set up the React frontend.

### 1. Navigate to the Frontend Directory
cd ../frontend

### 2. Install JavaScript Dependencies
**npm install**   
### 3. Set Up Environment File
**cp .env.example .env**  

Open .env and update the API URL:  

REACT_APP_API_BASE_URL=http://127.0.0.1:8000/api

### 4. Run the Frontend
**npm start**  

The frontend will run at http://localhost:3000.
user login details:  

'name' => 'Test User',  

'email' => 'testuser@example.com',  

'password' => 'password123',  

# Running the Project  

**Backend**: Ensure the Laravel backend is running (php artisan serve). The API will be available at http://127.0.0.1:8000/api.  

**Frontend**: Ensure the React frontend is running (npm start). Open http://localhost:3000 in your browser.  

**Login Credentials**: Use the credentials created during database seeding or register a new user via the frontend.

# Full Git Setup for the Project
### 1. Clone the Repository
git clone https://github.com/<your-username>/Task_Comment_Management.git  

cd Task_Comment_Management  

Navigate to Backend and Frontend Follow the setup steps for both the backend and frontend.
