# Orbit Tasker (Task Manager)

A beautiful, functional full-stack web application built from scratch to manage daily tasks. 

## 🚀 App Tech Stack
* **Frontend:** React + Vite
* **Backend:** Python + FastAPI 
* **Database:** SQLite (SQLAlchemy ORM)
* **Styling:** Custom Glassmorphism CSS 

## ✨ Features
* Modern dark-mode Glassmorphism UI with vibrant hover effects.
* Create, Read, Update, and Delete (CRUD) tasks seamlessly without page reloads.
* Strict backend data validation using Pydantic.
* Secure API communication via explicit FastAPI CORS Middleware.

## 🛠️ How to Run Locally

### Prerequisites
1. **Python** (With `pip`)
2. **Node.js** (With `npm`)

### The 1-Click Method (Windows)
Simply double-click the `start_servers.bat` file in the root folder. It will automatically launch two terminal windows and boot up both the Python backend and the React frontend simultaneously!

### The Manual Method
**1. Start the Backend:**
```bash
cd backend
python -m uvicorn main:app --reload
```

**2. Start the Frontend:**
```bash
cd frontend
npm run dev
```
Navigate to the localhost port provided by your terminal (usually `http://localhost:5173` or `5174`) to see the live app!
