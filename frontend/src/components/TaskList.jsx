import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onToggleStatus, onDelete }) => {
  // If there are no tasks, show a friendly message
  if (tasks.length === 0) {
    return <div className="empty-state">No tasks yet. You're all caught up! ✨</div>;
  }

  return (
    <div className="task-list">
      {/* 
        .map() loops through our array of tasks 
        and renders a separate TaskItem component for each one! 
      */}
      {tasks.map(task => (
        <TaskItem 
          key={task.id} 
          task={task} 
          onToggleStatus={onToggleStatus} 
          onDelete={onDelete} 
        />
      ))}
    </div>
  );
};

export default TaskList;
