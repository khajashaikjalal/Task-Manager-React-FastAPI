from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List

import models
import schemas
from database import engine, SessionLocal

# 1. Create the database tables based on our models
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Task Manager API")

# --- NEW: CORS SETUP ---
# This allows our React frontend (port 5173) to talk to FastAPI (port 8000)
# Without this, the browser will block requests for security reasons!
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:5174", "http://127.0.0.1:5174"],
    allow_credentials=True,
    allow_methods=["*"], # Allows GET, POST, PUT, DELETE
    allow_headers=["*"],
)

# 2. Dependency: gives each request its own database connection session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close() 

@app.get("/")
def read_root():
    return {"message": "Welcome to the Task Manager API"}

# --- CRUD OPERATIONS ---

@app.get("/tasks", response_model=List[schemas.TaskResponse])
def get_tasks(db: Session = Depends(get_db)):
    # .order_by(models.Task.id.desc()) ensures newest tasks show at the top
    tasks = db.query(models.Task).order_by(models.Task.id.desc()).all()
    return tasks

@app.post("/tasks", response_model=schemas.TaskResponse)
def create_task(task: schemas.TaskCreate, db: Session = Depends(get_db)):
    new_db_task = models.Task(title=task.title, description=task.description)
    db.add(new_db_task)
    db.commit()         
    db.refresh(new_db_task) 
    return new_db_task

@app.put("/tasks/{task_id}", response_model=schemas.TaskResponse)
def update_task(task_id: int, task_update: schemas.TaskUpdate, db: Session = Depends(get_db)):
    db_task = db.query(models.Task).filter(models.Task.id == task_id).first()
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    if task_update.title is not None:
        db_task.title = task_update.title
    if task_update.description is not None:
        db_task.description = task_update.description
    if task_update.status is not None:
        db_task.status = task_update.status

    db.commit()
    db.refresh(db_task)
    return db_task

@app.delete("/tasks/{task_id}")
def delete_task(task_id: int, db: Session = Depends(get_db)):
    db_task = db.query(models.Task).filter(models.Task.id == task_id).first()
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    db.delete(db_task)
    db.commit()
    return {"message": "Task successfully deleted"}
