import { motion } from "framer-motion";
import { format, isToday, isTomorrow, isPast } from "date-fns";
import Checkbox from "@/components/atoms/Checkbox";
import Badge from "@/components/atoms/Badge";
import PriorityBadge from "@/components/molecules/PriorityBadge";
import CategoryChip from "@/components/molecules/CategoryChip";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const TaskCard = ({ 
  task, 
  onToggleComplete, 
  onEdit, 
  onDelete,
  className,
  ...props 
}) => {
  const handleCheckboxChange = (e) => {
    onToggleComplete(task.Id);
  };

  const formatDueDate = (dateString) => {
    if (!dateString) return null;
    
    const date = new Date(dateString);
    
    if (isToday(date)) {
      return { text: "Today", variant: "warning" };
    } else if (isTomorrow(date)) {
      return { text: "Tomorrow", variant: "primary" };
    } else if (isPast(date)) {
      return { text: "Overdue", variant: "error" };
    } else {
      return { text: format(date, "MMM d"), variant: "default" };
    }
  };

  const dueDateInfo = formatDueDate(task.dueDate);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        scale: task.completed ? 0.98 : 1
      }}
      exit={{ opacity: 0, scale: 0.9, y: -20 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={cn(
        "bg-white rounded-lg border border-gray-200 p-4 shadow-sm card-hover",
        task.completed && "opacity-60 bg-gray-50",
        className
      )}
      {...props}
    >
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <div className="flex-shrink-0 mt-0.5">
          <Checkbox
            checked={task.completed}
            onChange={handleCheckboxChange}
          />
        </div>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className={cn(
              "font-medium text-gray-900 leading-snug",
              task.completed && "line-through text-gray-500"
            )}>
              {task.title}
            </h3>
            
            {/* Actions */}
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => onEdit(task)}
                className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600"
              >
                <ApperIcon name="Edit2" size={14} />
              </button>
              <button
                onClick={() => onDelete(task.Id)}
                className="p-1 hover:bg-red-50 rounded text-gray-400 hover:text-red-500"
              >
                <ApperIcon name="Trash2" size={14} />
              </button>
            </div>
          </div>

          {/* Description */}
          {task.description && (
            <p className={cn(
              "text-sm text-gray-600 mb-3 leading-relaxed",
              task.completed && "text-gray-400"
            )}>
              {task.description}
            </p>
          )}

          {/* Meta information */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Category */}
            <CategoryChip category={task.category} />
            
            {/* Priority */}
            <PriorityBadge priority={task.priority} />

            {/* Due date */}
            {dueDateInfo && (
              <Badge variant={dueDateInfo.variant} size="xs">
                <ApperIcon name="Calendar" size={10} className="mr-1" />
                {dueDateInfo.text}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskCard;