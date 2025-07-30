import { useState } from "react";
import CategoryChip from "@/components/molecules/CategoryChip";
import SearchBar from "@/components/molecules/SearchBar";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const TaskFilters = ({ 
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedPriority,
  onPriorityChange,
  selectedStatus,
  onStatusChange,
  taskCounts = {},
  className 
}) => {
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { key: "all", label: "All", icon: "Grid3X3" },
    { key: "work", label: "Work", icon: "Briefcase" },
    { key: "personal", label: "Personal", icon: "User" },
    { key: "shopping", label: "Shopping", icon: "ShoppingCart" },
    { key: "health", label: "Health", icon: "Heart" }
  ];

  const priorities = [
    { key: "all", label: "All Priorities" },
    { key: "high", label: "High Priority" },
    { key: "medium", label: "Medium Priority" },
    { key: "low", label: "Low Priority" }
  ];

  const statuses = [
    { key: "all", label: "All Tasks" },
    { key: "pending", label: "Pending" },
    { key: "completed", label: "Completed" }
  ];

  return (
    <div className={cn("space-y-4", className)}>
      {/* Search and toggle */}
      <div className="flex items-center gap-3">
        <SearchBar
          value={searchTerm}
          onChange={onSearchChange}
          placeholder="Search tasks..."
          className="flex-1"
        />
        <Button
          variant="secondary"
          size="md"
          onClick={() => setShowFilters(!showFilters)}
          className="lg:hidden"
        >
          <ApperIcon name="Filter" size={16} />
        </Button>
      </div>

      {/* Category chips - always visible on desktop */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category.key}
            onClick={() => onCategoryChange(category.key)}
            className={`inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 transform hover:scale-105 ${
              selectedCategory === category.key
                ? "bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg"
                : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:shadow-md"
            }`}
          >
            <ApperIcon name={category.icon} size={14} />
            <span>{category.label}</span>
            {category.key !== "all" && taskCounts[category.key] !== undefined && (
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                selectedCategory === category.key ? "bg-white/20" : "bg-gray-100"
              }`}>
                {taskCounts[category.key]}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Additional filters - collapsible on mobile */}
      <div className={cn(
        "grid grid-cols-1 md:grid-cols-2 gap-4 transition-all duration-300",
        showFilters ? "block" : "hidden lg:grid"
      )}>
        {/* Priority filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Priority
          </label>
          <select
            value={selectedPriority}
            onChange={(e) => onPriorityChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            {priorities.map((priority) => (
              <option key={priority.key} value={priority.key}>
                {priority.label}
              </option>
            ))}
          </select>
        </div>

        {/* Status filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <select
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            {statuses.map((status) => (
              <option key={status.key} value={status.key}>
                {status.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default TaskFilters;