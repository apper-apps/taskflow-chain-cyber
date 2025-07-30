export const getPriorityColor = (priority) => {
  const colors = {
    high: "from-error-500 to-error-600",
    medium: "from-warning-500 to-warning-600", 
    low: "from-success-500 to-success-600"
  };
  return colors[priority?.toLowerCase()] || colors.low;
};

export const getCategoryColor = (category) => {
  const colors = {
    work: "from-info-500 to-info-600",
    personal: "from-secondary-500 to-secondary-600",
    shopping: "from-accent-500 to-accent-600",
    health: "from-success-500 to-success-600"
  };
  return colors[category?.toLowerCase()] || colors.personal;
};

export const filterTasks = (tasks, filters) => {
  let filtered = [...tasks];

  // Filter by completion status
  if (filters.status === "completed") {
    filtered = filtered.filter(task => task.completed);
  } else if (filters.status === "pending") {
    filtered = filtered.filter(task => !task.completed);
  }

  // Filter by category
  if (filters.category && filters.category !== "all") {
    filtered = filtered.filter(task => task.category === filters.category);
  }

  // Filter by priority
  if (filters.priority && filters.priority !== "all") {
    filtered = filtered.filter(task => task.priority === filters.priority);
  }

  // Filter by search term
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(task =>
      task.title.toLowerCase().includes(searchLower) ||
      task.description.toLowerCase().includes(searchLower)
    );
  }

  return filtered;
};

export const sortTasks = (tasks, sortBy = "priority") => {
  const sorted = [...tasks];

  switch (sortBy) {
    case "priority":
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return sorted.sort((a, b) => {
        const aPriority = priorityOrder[a.priority] || 1;
        const bPriority = priorityOrder[b.priority] || 1;
        
        if (aPriority !== bPriority) {
          return bPriority - aPriority;
        }
        
        return new Date(b.createdAt) - new Date(a.createdAt);
      });

    case "dueDate":
      return sorted.sort((a, b) => {
        if (a.dueDate && !b.dueDate) return -1;
        if (!a.dueDate && b.dueDate) return 1;
        if (!a.dueDate && !b.dueDate) return 0;
        return new Date(a.dueDate) - new Date(b.dueDate);
      });

    case "created":
      return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    case "alphabetical":
      return sorted.sort((a, b) => a.title.localeCompare(b.title));

    default:
      return sorted;
  }
};

export const getTaskStats = (tasks) => {
  const total = tasks.length;
  const completed = tasks.filter(task => task.completed).length;
  const pending = total - completed;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  const byPriority = {
    high: tasks.filter(task => task.priority === "high").length,
    medium: tasks.filter(task => task.priority === "medium").length,
    low: tasks.filter(task => task.priority === "low").length
  };

  const byCategory = {
    work: tasks.filter(task => task.category === "work").length,
    personal: tasks.filter(task => task.category === "personal").length,
    shopping: tasks.filter(task => task.category === "shopping").length,
    health: tasks.filter(task => task.category === "health").length
  };

  return {
    total,
    completed,
    pending,
    completionRate,
    byPriority,
    byCategory
  };
};