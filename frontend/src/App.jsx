import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';

// Our FastAPI backend URL lives here
const API_URL = 'http://127.0.0.1:8000';

function App() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 1. Fetch initial tasks from the database when the app loads!
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${API_URL}/tasks`);
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 2. Add a new task to the database
  const handleAddTask = async (newTask) => {
    try {
      const response = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask)
      });
      const createdTask = await response.json();
      
      // Update UI with the exact task returned from the database (includes real ID)
      setTasks([createdTask, ...tasks]); 
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  // 3. Update task status in the database
  const handleToggleStatus = async (taskToToggle) => {
    const newStatus = taskToToggle.status === 'pending' ? 'completed' : 'pending';
    
    try {
      const response = await fetch(`${API_URL}/tasks/${taskToToggle.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      const updatedTask = await response.json();
      
      // Update UI by swapping the old task with the newly updated one inside the array
      setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // 4. Delete task from the database
  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/tasks/${id}`, { method: 'DELETE' });
      
      // Update UI by filtering out the deleted ID
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="app-container">
      <div className="glass-panel">
        <header className="app-header">
          <h1>Orbit Tasker</h1>
          <p>Organize your universe.</p>
        </header>

        <TaskForm onAddTask={handleAddTask} />
        
        {isLoading ? (
          <div className="empty-state">Loading actual database tasks... 📡</div>
        ) : (
          <TaskList 
            tasks={tasks} 
            onToggleStatus={handleToggleStatus} 
            onDelete={handleDelete} 
          />
        )}
      </div>
    </div>
  )
}

export default App;
