from pydantic import BaseModel
from typing import Optional
from datetime import datetime

# Step 1: Base Schema (Properties shared across reading and creating)
class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None

# Step 2: Schema for Creating a task (What the user sends to us)
class TaskCreate(TaskBase):
    pass # It just inherits title and description

# Step 3: Schema for Updating a task (What the user sends to us)
class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None

# Step 4: Schema for Returning a task (What we send back to the user)
class TaskResponse(TaskBase):
    id: int
    status: str
    created_at: datetime

    class Config:
        # Crucial setting: This tells Pydantic to read data even if it is not a dictionary 
        # (SQLAlchemy returns object models, not dictionaries)
        from_attributes = True
