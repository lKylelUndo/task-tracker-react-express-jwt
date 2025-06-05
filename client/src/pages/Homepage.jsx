import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import TaskForm from "../components/TaskForm";
import TasksCard from "../components/TasksCard";

const Homepage = () => {
  const { auth, user, loading, tasks, tasksLoading, getTasksPerUser } =
    useContext(AuthContext);
  const [editingTask, setEditingTask] = useState(null); // 🔹 track the task being edited

  useEffect(() => {
    document.title = "Home";
  }, []);

  if (loading) return <p>Loading user info...</p>;
  if (tasksLoading) return <p>Loading tasks...</p>;

  async function handleEdit(task) {
    console.log(task);
    setEditingTask(task);
  }

  async function handleDelete(id) {
    try {
      await fetch(`/api/delete-task/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      getTasksPerUser();
    } catch (error) {
      console.log(error);
    }
  }

  const handleFormFinish = () => {
    setEditingTask(null); // 🔹 clear edit mode
    getTasksPerUser();
  };

  return (
    <div className="p-4 mt-[50px] md:w-[800px] lg:w-[1000px] w-96 mx-auto">
      <h1 className="text-2xl font-bold">Home</h1>
      {auth ? (
        <>
          <p className="mt-4 text-green-700">
            ✅ Logged in. Welcome {user.firstName}!
          </p>

          <TaskForm
            user={user}
            taskToEdit={editingTask}
            onFinish={handleFormFinish}
          />

          <div className="mt-6">
            <h2 className="font-semibold text-xl mb-2">Your Tasks</h2>
            {tasks.length === 0 ? (
              <p>No tasks yet.</p>
            ) : (
              <ul>
                {tasks.map((task) => (
                  <TasksCard
                    key={task.id}
                    task={task}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                  />
                ))}
              </ul>
            )}
          </div>
        </>
      ) : (
        <p className="mt-4 text-red-500">⛔ Not authenticated.</p>
      )}
    </div>
  );
};

export default Homepage;
