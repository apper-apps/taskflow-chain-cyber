import { format, isToday, isTomorrow, isPast, isThisWeek, startOfWeek, endOfWeek } from "date-fns";

export const formatTaskDate = (dateString) => {
  if (!dateString) return null;
  
  const date = new Date(dateString);
  
  if (isToday(date)) {
    return { text: "Today", variant: "warning", urgent: true };
  } else if (isTomorrow(date)) {
    return { text: "Tomorrow", variant: "primary", urgent: true };
  } else if (isPast(date)) {
    return { text: "Overdue", variant: "error", urgent: true };
  } else if (isThisWeek(date, { weekStartsOn: 1 })) {
    return { text: format(date, "EEEE"), variant: "primary", urgent: false };
  } else {
    return { text: format(date, "MMM d"), variant: "default", urgent: false };
  }
};

export const sortTasksByDate = (tasks) => {
  return tasks.sort((a, b) => {
    // If one has a due date and the other doesn't, prioritize the one with a due date
    if (a.dueDate && !b.dueDate) return -1;
    if (!a.dueDate && b.dueDate) return 1;
    
    // If both have due dates, sort by date
    if (a.dueDate && b.dueDate) {
      return new Date(a.dueDate) - new Date(b.dueDate);
    }
    
    // If neither has a due date, sort by creation date
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
};

export const getTasksForToday = (tasks) => {
  return tasks.filter(task => 
    task.dueDate && isToday(new Date(task.dueDate)) && !task.completed
  );
};

export const getOverdueTasks = (tasks) => {
  return tasks.filter(task => 
    task.dueDate && isPast(new Date(task.dueDate)) && !task.completed
  );
};

export const getUpcomingTasks = (tasks, days = 7) => {
  const today = new Date();
  const futureDate = new Date();
  futureDate.setDate(today.getDate() + days);
  
  return tasks.filter(task => {
    if (!task.dueDate || task.completed) return false;
    const taskDate = new Date(task.dueDate);
    return taskDate > today && taskDate <= futureDate;
  });
};