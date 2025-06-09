import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAllTasks() {
      try {
        const res = await fetch("/api/get-all-tasks", {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();
        setTasks(data.tasks);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }

    fetchAllTasks();
  }, []);

  useEffect(() => {
    document.title = "Dashboard";
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-gray-500">Loading tasks...</p>
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Task List</h1>
      {tasks.map((task) => (
        <div
          key={task.id}
          className="border rounded-md p-4 mb-4 shadow-sm bg-white"
        >
          <h2 className="text-lg font-semibold text-gray-800">{task.title}</h2>
          <p className="text-gray-600 text-sm mb-1">
            Description: {task.description}
          </p>
          <p className="text-sm text-gray-500">Status: {task.status}</p>
          <p className="text-sm text-gray-400">User ID: {task.userId}</p>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
