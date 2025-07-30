import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Header from "@/components/organisms/Header";
import TaskFilters from "@/components/organisms/TaskFilters";
import TaskList from "@/components/organisms/TaskList";
import AddTaskModal from "@/components/organisms/AddTaskModal";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import * as taskService from "@/services/api/taskService";

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  
  // Filter state
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPriority, setSelectedPriority] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("pending");

  // Load tasks
  const loadTasks = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await taskService.getAll();
      setTasks(data);
    } catch (err) {
      setError("Failed to load tasks. Please try again.");
      console.error("Error loading tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  // Filter tasks
  const filteredTasks = useMemo(() => {
    let filtered = tasks.filter(task => !task.archived);

    // Filter by search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchLower) ||
        task.description.toLowerCase().includes(searchLower)
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(task => task.category === selectedCategory);
    }

    // Filter by priority
    if (selectedPriority !== "all") {
      filtered = filtered.filter(task => task.priority === selectedPriority);
    }

    // Filter by status
    if (selectedStatus === "pending") {
      filtered = filtered.filter(task => !task.completed);
    } else if (selectedStatus === "completed") {
      filtered = filtered.filter(task => task.completed);
    }

    // Sort by priority and created date
    filtered.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      const aPriority = priorityOrder[a.priority] || 1;
      const bPriority = priorityOrder[b.priority] || 1;
      
      if (aPriority !== bPriority) {
        return bPriority - aPriority;
      }
      
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return filtered;
  }, [tasks, searchTerm, selectedCategory, selectedPriority, selectedStatus]);

  // Calculate task counts by category
  const taskCounts = useMemo(() => {
    const activeTasks = tasks.filter(task => !task.archived && !task.completed);
    const counts = {
      work: 0,
      personal: 0,
      shopping: 0,
      health: 0
    };

    activeTasks.forEach(task => {
      if (counts.hasOwnProperty(task.category)) {
        counts[task.category]++;
      }
    });

    return counts;
  }, [tasks]);

  // Calculate completion stats
  const completionStats = useMemo(() => {
    const activeTasks = tasks.filter(task => !task.archived);
    const completedTasks = activeTasks.filter(task => task.completed);
    const completionPercentage = activeTasks.length > 0 
      ? Math.round((completedTasks.length / activeTasks.length) * 100) 
      : 0;

    return {
      total: activeTasks.length,
      completed: completedTasks.length,
      percentage: completionPercentage
    };
  }, [tasks]);

  // Handle task operations
  const handleAddTask = async (taskData) => {
    try {
      const newTask = await taskService.create(taskData);
      setTasks(prev => [newTask, ...prev]);
      toast.success("Task created successfully!");
    } catch (error) {
      toast.error("Failed to create task");
      throw error;
    }
  };

  const handleEditTask = async (taskData) => {
    try {
      const updatedTask = await taskService.update(editingTask.Id, taskData);
      setTasks(prev => prev.map(task => 
        task.Id === editingTask.Id ? updatedTask : task
      ));
      toast.success("Task updated successfully!");
    } catch (error) {
      toast.error("Failed to update task");
      throw error;
    }
  };

  const handleToggleComplete = async (taskId) => {
    try {
      const task = tasks.find(t => t.Id === taskId);
      if (!task) return;

      const updatedTask = await taskService.update(taskId, {
        completed: !task.completed,
        completedAt: !task.completed ? new Date().toISOString() : null
      });

      setTasks(prev => prev.map(t => 
        t.Id === taskId ? updatedTask : t
      ));

      toast.success(
        updatedTask.completed ? "Task completed! 🎉" : "Task marked as pending"
      );
    } catch (error) {
      toast.error("Failed to update task");
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return;
    }

    try {
      await taskService.delete(taskId);
      setTasks(prev => prev.filter(task => task.Id !== taskId));
      toast.success("Task deleted successfully");
    } catch (error) {
      toast.error("Failed to delete task");
    }
  };

  const handleEditClick = (task) => {
    setEditingTask(task);
    setIsAddModalOpen(true);
  };

  const handleModalClose = () => {
    setIsAddModalOpen(false);
    setEditingTask(null);
  };

  const handleModalSubmit = async (taskData) => {
    if (editingTask) {
      await handleEditTask(taskData);
    } else {
      await handleAddTask(taskData);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <Loading message="Loading your tasks..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <Error
          title="Failed to load tasks"
          message={error}
          onRetry={loadTasks}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <Header
        onAddTask={() => setIsAddModalOpen(true)}
        completionPercentage={completionStats.percentage}
        totalTasks={completionStats.total}
        completedTasks={completionStats.completed}
      />

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Filters */}
            <TaskFilters
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              selectedPriority={selectedPriority}
              onPriorityChange={setSelectedPriority}
              selectedStatus={selectedStatus}
              onStatusChange={setSelectedStatus}
              taskCounts={taskCounts}
            />

            {/* Task List */}
            <TaskList
              tasks={filteredTasks}
              onToggleComplete={handleToggleComplete}
              onEdit={handleEditClick}
              onDelete={handleDeleteTask}
              emptyTitle={selectedStatus === "completed" ? "No completed tasks" : "No tasks found"}
              emptyDescription={
                selectedStatus === "completed" 
                  ? "Complete some tasks to see them here."
                  : searchTerm || selectedCategory !== "all" || selectedPriority !== "all"
                    ? "Try adjusting your filters to find what you're looking for."
                    : "Create your first task to get started with your productivity journey."
              }
            />
          </motion.div>
        </div>
      </div>

      {/* Add/Edit Task Modal */}
      <AddTaskModal
        isOpen={isAddModalOpen}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
        editTask={editingTask}
      />
    </div>
  );
};

export default TasksPage;