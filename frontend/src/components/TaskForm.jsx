import React, { useState } from 'react';

const TaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the page from refreshing on submit
    if (!title.trim()) return;
    
    // Pass the data up to the parent component (App.jsx)
    onAddTask({ title, description });
    
    // Clear the form fields
    setTitle('');
    setDescription('');
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="What needs to be done?" 
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="task-input"
        autoFocus
      />
      <input 
        type="text" 
        placeholder="Details (Optional)" 
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="task-input description"
      />
      <button type="submit" className="task-submit-btn">Add Task</button>
    </form>
  );
};

export default TaskForm;
