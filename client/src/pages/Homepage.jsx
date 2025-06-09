import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import TaskForm from "../components/TaskForm";
import TasksCard from "../components/TasksCard";

const Homepage = () => {
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState([]);
  const [tasksLoading, setTasksLoading] = useState(true);
  const [tasks, setTasks] = useState([]);

  const [isEdit, setIsEdit] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState([]);

  async function getTasksPerUser() {
    try {
      console.log(user.id);
      const res = await fetch("/api/get-tasks", {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();

      console.log(data);
      setTasks(data.tasks);
      setTasksLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function checkAuth() {
    try {
      const res = await fetch("/api/test", {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      console.log(data.user);
      setAuth(true);
      setUser(data.user);
    } catch {
      setAuth(false);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    document.title = "Home";
  }, []);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (user && user.id) {
      getTasksPerUser();
    }
  }, [user]);

  if (loading) return <p>Loading user info...</p>;
  if (tasksLoading) return <p>Loading tasks...</p>;

  async function handleEdit(task) {
    console.log(task);
    setIsEdit(true);
    setTaskToEdit(task);
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
    setIsEdit(null); 
    setTaskToEdit(null);
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
            isEdit={isEdit}
            taskToEdit={taskToEdit}
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
