import { AnimatePresence } from "framer-motion";
import TaskCard from "@/components/organisms/TaskCard";
import Empty from "@/components/ui/Empty";
import { cn } from "@/utils/cn";

const TaskList = ({ 
  tasks = [], 
  onToggleComplete, 
  onEdit, 
  onDelete,
  emptyTitle = "No tasks found",
  emptyDescription = "Create your first task to get started with your productivity journey.",
  className,
  ...props 
}) => {
  if (tasks.length === 0) {
    return (
      <Empty
        title={emptyTitle}
        description={emptyDescription}
        icon="CheckSquare"
        className={className}
      />
    );
  }

  return (
    <div className={cn("space-y-3", className)} {...props}>
      <AnimatePresence mode="popLayout">
        {tasks.map((task) => (
          <div key={task.Id} className="group">
            <TaskCard
              task={task}
              onToggleComplete={onToggleComplete}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TaskList;