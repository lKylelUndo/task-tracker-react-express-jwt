import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const TaskForm = ({ user, isEdit, taskToEdit, onFinish }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  // 🔹 Populate fields when editing
  useEffect(() => {
    if (isEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
      setStatus(taskToEdit.status);
    } else {
      setTitle("");
      setDescription("");
      setStatus("");
    }
  }, [taskToEdit]);

  const handleTaskSubmit = async (e) => {
    e.preventDefault();

    const task = {
      userId: user.id,
      title,
      description,
      status,
    };

    const url = isEdit ? `/api/edit-task/${taskToEdit.id}` : "/api/add-task";
    const method = isEdit ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(task),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      console.log("Task successfully submitted:", result);

      // Reset form
      setTitle("");
      setDescription("");
      setStatus("");

      if (onFinish) onFinish();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="rounded-lg mt-5 p-6 bg-violet-50 shadow-md max-w-lg mx-auto">
      <form className="space-y-4" onSubmit={handleTaskSubmit}>
        <h2 className="text-lg font-semibold">
          {isEdit ? "Edit Task" : "Create Task"}
        </h2>
        {/* Title Field */}
        <div>
          <label
            htmlFor="title"
            className="block font-medium text-gray-700 mb-1"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
            placeholder="Enter task title"
          />
        </div>

        {/* Description Field */}
        <div>
          <label
            htmlFor="description"
            className="block font-medium text-gray-700 mb-1"
          >
            Description
          </label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
            placeholder="Describe the task"
          />
        </div>

        {/* Status Field */}
        <div>
          <label
            htmlFor="status"
            className="block font-medium text-gray-700 mb-1"
          >
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
          >
            <option value="" disabled>
              Select Status
            </option>
            <option value="pending">Pending</option>
            <option value="in progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Submit + Cancel */}
        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-teal-600 text-white px-4 py-2 rounded"
          >
            {isEdit ? "Update Task" : "Submit Task"}
          </button>
          {isEdit && (
            <button
              type="button"
              onClick={onFinish}
              className="bg-gray-300 px-4 py-2 rounded"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
