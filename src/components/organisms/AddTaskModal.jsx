import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/atoms/Button";
import FormField from "@/components/molecules/FormField";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const AddTaskModal = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  editTask = null,
  className 
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "personal",
    priority: "medium",
    dueDate: ""
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (editTask) {
      setFormData({
        title: editTask.title || "",
        description: editTask.description || "",
        category: editTask.category || "personal",
        priority: editTask.priority || "medium",
        dueDate: editTask.dueDate || ""
      });
    } else {
      setFormData({
        title: "",
        description: "",
        category: "personal",
        priority: "medium",
        dueDate: ""
      });
    }
    setErrors({});
  }, [editTask, isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error("Error submitting task:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop"
        onClick={handleBackdropClick}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className={cn(
            "bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto",
            className
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              {editTask ? "Edit Task" : "Add New Task"}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ApperIcon name="X" size={20} className="text-gray-500" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <FormField
              label="Task Title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter task title..."
              required
              error={errors.title}
            />

            <FormField
              label="Description"
              name="description"
              type="textarea"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Add a description (optional)..."
              className="min-h-[80px]"
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                label="Category"
                name="category"
                type="select"
                value={formData.category}
                onChange={handleInputChange}
              >
                <option value="personal">Personal</option>
                <option value="work">Work</option>
                <option value="shopping">Shopping</option>
                <option value="health">Health</option>
              </FormField>

              <FormField
                label="Priority"
                name="priority"
                type="select"
                value={formData.priority}
                onChange={handleInputChange}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </FormField>
            </div>

            <FormField
              label="Due Date"
              name="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={handleInputChange}
            />

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="secondary"
                onClick={onClose}
                className="flex-1"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                className="flex-1"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {editTask ? "Updating..." : "Creating..."}
                  </div>
                ) : (
                  editTask ? "Update Task" : "Create Task"
                )}
              </Button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AddTaskModal;