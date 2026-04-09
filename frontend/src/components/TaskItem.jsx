import React from 'react';

const TaskItem = ({ task, onToggleStatus, onDelete }) => {
  // Check if this task is marked as completed
  const isCompleted = task.status === 'completed';

  return (
    <div className={`task-item ${isCompleted ? 'completed' : ''}`}>
      <div className="task-content">
        
        {/* Custom Checkbox */}
        <label className="checkbox-container">
          <input 
            type="checkbox" 
            checked={isCompleted} 
            onChange={() => onToggleStatus(task)} 
          />
          <span className="checkmark"></span>
        </label>
        
        <div className="task-text">
          <h3>{task.title}</h3>
          {task.description && <p>{task.description}</p>}
        </div>
        
      </div>
      
      {/* Delete Button */}
      <button className="delete-btn" onClick={() => onDelete(task.id)}>
        ✕
      </button>
    </div>
  );
};

export default TaskItem;
