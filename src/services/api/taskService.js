import tasksData from "@/services/mockData/tasks.json";
// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// In-memory storage for development
let tasks = [...tasksData];

// Get the next available ID
const getNextId = () => {
  const maxId = tasks.reduce((max, task) => Math.max(max, task.Id), 0);
  return maxId + 1;
};

export const getAll = async () => {
  await delay(300);
  return [...tasks];
};

export const getById = async (id) => {
  await delay(200);
  const task = tasks.find(task => task.Id === parseInt(id));
  if (!task) {
    throw new Error("Task not found");
  }
  return { ...task };
};

export const create = async (taskData) => {
  await delay(400);
  
  const newTask = {
    Id: getNextId(),
    title: taskData.title,
    description: taskData.description || "",
    category: taskData.category || "personal",
    priority: taskData.priority || "medium",
    dueDate: taskData.dueDate || "",
    completed: false,
    archived: false,
    createdAt: new Date().toISOString(),
    completedAt: null
  };

  tasks.unshift(newTask);
  return { ...newTask };
};

export const update = async (id, updateData) => {
  await delay(300);
  
  const taskIndex = tasks.findIndex(task => task.Id === parseInt(id));
  if (taskIndex === -1) {
    throw new Error("Task not found");
  }

  const updatedTask = {
    ...tasks[taskIndex],
    ...updateData
  };

  tasks[taskIndex] = updatedTask;
  return { ...updatedTask };
};

export const delete_ = async (id) => {
  await delay(250);
  
  const taskIndex = tasks.findIndex(task => task.Id === parseInt(id));
  if (taskIndex === -1) {
    throw new Error("Task not found");
  }

  tasks.splice(taskIndex, 1);
  return true;
};
// Export delete function with underscore name since 'delete' is reserved
export { delete_ as deleteTask };