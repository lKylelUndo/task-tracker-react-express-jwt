import React from "react";

const TasksCard = ({ task, handleEdit, handleDelete }) => {
  return (
    <li key={task.id} className="mb-2 border p-2 rounded">
      <strong>{task.title}</strong> - {task.status}
      <p>{task.description}</p>
      <button
        className="bg-amber-200 px-4 py-1 me-3"
        onClick={() => handleEdit(task)}
      >
        Edit
      </button>
      <button
        className="bg-red-600 text-white px-4 py-1"
        onClick={() => handleDelete(task.id)}
      >
        Delete
      </button>
    </li>
  );
};

export default TasksCard;
