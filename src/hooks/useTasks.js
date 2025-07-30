import { useState, useEffect } from "react";
import * as taskService from "@/services/api/taskService";

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await taskService.getAll();
      setTasks(data);
    } catch (err) {
      setError("Failed to load tasks");
      console.error("Error loading tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (taskData) => {
    const newTask = await taskService.create(taskData);
    setTasks(prev => [newTask, ...prev]);
    return newTask;
  };

  const updateTask = async (id, updateData) => {
    const updatedTask = await taskService.update(id, updateData);
    setTasks(prev => prev.map(task => 
      task.Id === id ? updatedTask : task
    ));
    return updatedTask;
  };

  const deleteTask = async (id) => {
await taskService.delete_(id);
    setTasks(prev => prev.filter(task => task.Id !== id));
  };

  const toggleTaskComplete = async (id) => {
    const task = tasks.find(t => t.Id === id);
    if (!task) return;

    return await updateTask(id, {
      completed: !task.completed,
      completedAt: !task.completed ? new Date().toISOString() : null
    });
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return {
    tasks,
    loading,
    error,
    loadTasks,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskComplete
  };
};