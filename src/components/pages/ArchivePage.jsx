import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";
import TaskList from "@/components/organisms/TaskList";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import ApperIcon from "@/components/ApperIcon";
import * as taskService from "@/services/api/taskService";

const ArchivePage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Load tasks
  const loadTasks = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await taskService.getAll();
      setTasks(data);
    } catch (err) {
      setError("Failed to load archived tasks. Please try again.");
      console.error("Error loading tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  // Filter archived and completed tasks
  const archivedTasks = useMemo(() => {
    let filtered = tasks.filter(task => task.archived || task.completed);

    // Filter by search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchLower) ||
        task.description.toLowerCase().includes(searchLower)
      );
    }

    // Sort by completion date (most recent first)
    filtered.sort((a, b) => {
      const aDate = new Date(a.completedAt || a.createdAt);
      const bDate = new Date(b.completedAt || b.createdAt);
      return bDate - aDate;
    });

    return filtered;
  }, [tasks, searchTerm]);

  // Handle restore task
  const handleRestoreTask = async (taskId) => {
    try {
      const updatedTask = await taskService.update(taskId, {
        archived: false,
        completed: false,
        completedAt: null
      });

      setTasks(prev => prev.map(task => 
        task.Id === taskId ? updatedTask : task
      ));

      toast.success("Task restored successfully!");
    } catch (error) {
      toast.error("Failed to restore task");
    }
  };

  // Handle permanent delete
  const handlePermanentDelete = async (taskId) => {
    if (!window.confirm("Are you sure you want to permanently delete this task? This action cannot be undone.")) {
      return;
    }

    try {
      await taskService.delete(taskId);
      setTasks(prev => prev.filter(task => task.Id !== taskId));
      toast.success("Task permanently deleted");
    } catch (error) {
      toast.error("Failed to delete task");
    }
  };

  // Handle clear all completed
  const handleClearAllCompleted = async () => {
    const completedTasks = tasks.filter(task => task.completed && !task.archived);
    
    if (completedTasks.length === 0) {
      toast.info("No completed tasks to clear");
      return;
    }

    if (!window.confirm(`Are you sure you want to permanently delete all ${completedTasks.length} completed tasks? This action cannot be undone.`)) {
      return;
    }

    try {
      const deletePromises = completedTasks.map(task => taskService.delete(task.Id));
      await Promise.all(deletePromises);
      
      setTasks(prev => prev.filter(task => 
        !(task.completed && !task.archived)
      ));
      
      toast.success(`${completedTasks.length} completed tasks deleted permanently`);
    } catch (error) {
      toast.error("Failed to clear completed tasks");
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <Loading message="Loading archived tasks..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <Error
          title="Failed to load archive"
          message={error}
          onRetry={loadTasks}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-secondary-500 to-accent-500 rounded-lg flex items-center justify-center">
              <ApperIcon name="Archive" size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-secondary-600 to-accent-600 bg-clip-text text-transparent">
                Archive
              </h1>
              <p className="text-sm text-gray-600">
                {archivedTasks.length} completed tasks
              </p>
            </div>
          </div>

          {/* Clear all button */}
          {tasks.filter(task => task.completed && !task.archived).length > 0 && (
            <Button
              onClick={handleClearAllCompleted}
              variant="danger"
              size="md"
              className="inline-flex items-center gap-2"
            >
              <ApperIcon name="Trash2" size={16} />
              <span className="hidden md:inline">Clear All Completed</span>
            </Button>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Search */}
            <SearchBar
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Search archived tasks..."
            />

            {/* Archive List */}
            <div className="space-y-3">
              {archivedTasks.map((task) => (
                <motion.div
                  key={task.Id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-4">
                    {/* Task info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <ApperIcon name="Check" size={16} className="text-success-500 flex-shrink-0" />
                        <h3 className="font-medium text-gray-900 line-through">
                          {task.title}
                        </h3>
                      </div>
                      
                      {task.description && (
                        <p className="text-sm text-gray-500 mb-2 line-through">
                          {task.description}
                        </p>
                      )}
                      
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <span>Completed on</span>
                        <span className="font-medium">
                          {task.completedAt 
                            ? new Date(task.completedAt).toLocaleDateString()
                            : new Date(task.createdAt).toLocaleDateString()
                          }
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={() => handleRestoreTask(task.Id)}
                        variant="secondary"
                        size="sm"
                        className="inline-flex items-center gap-1"
                      >
                        <ApperIcon name="RotateCcw" size={14} />
                        <span className="hidden sm:inline">Restore</span>
                      </Button>
                      <Button
                        onClick={() => handlePermanentDelete(task.Id)}
                        variant="ghost"
                        size="sm"
                        className="text-error-500 hover:text-error-600 hover:bg-error-50"
                      >
                        <ApperIcon name="Trash2" size={14} />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Empty state */}
            {archivedTasks.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-secondary-500 to-accent-500 rounded-full flex items-center justify-center mb-4">
                  <ApperIcon name="Archive" size={24} className="text-white" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {searchTerm ? "No archived tasks found" : "Archive is empty"}
                </h3>
                <p className="text-gray-500 max-w-md">
                  {searchTerm 
                    ? "Try adjusting your search term to find what you're looking for."
                    : "Completed tasks will appear here. Start completing some tasks to build your archive!"
                  }
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ArchivePage;