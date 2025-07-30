import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import ProgressRing from "@/components/molecules/ProgressRing";
import ApperIcon from "@/components/ApperIcon";

const Header = ({ onAddTask, completionPercentage = 0, totalTasks = 0, completedTasks = 0 }) => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border-b border-gray-200 px-6 py-4"
    >
      <div className="flex items-center justify-between">
        {/* Brand and title */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
              <ApperIcon name="CheckSquare" size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                TaskFlow
              </h1>
              <p className="text-sm text-gray-600">Organize your day efficiently</p>
            </div>
          </div>
        </div>

        {/* Progress and actions */}
        <div className="flex items-center gap-6">
          {/* Progress indicator */}
          {totalTasks > 0 && (
            <div className="hidden md:flex items-center gap-3">
              <ProgressRing 
                progress={completionPercentage} 
                size={60}
                strokeWidth={4}
              />
              <div className="text-sm">
                <p className="font-medium text-gray-900">
                  {completedTasks} of {totalTasks} completed
                </p>
                <p className="text-gray-500">Keep going!</p>
              </div>
            </div>
          )}

          {/* Add task button */}
          <Button
            onClick={onAddTask}
            variant="primary"
            size="md"
            className="inline-flex items-center gap-2"
          >
            <ApperIcon name="Plus" size={16} />
            <span className="hidden md:inline">Add Task</span>
          </Button>
        </div>
      </div>

      {/* Mobile progress */}
      {totalTasks > 0 && (
        <div className="md:hidden mt-4 flex items-center justify-center gap-3 p-4 bg-gray-50 rounded-lg">
          <ProgressRing 
            progress={completionPercentage} 
            size={50}
            strokeWidth={4}
          />
          <div className="text-sm">
            <p className="font-medium text-gray-900">
              {completedTasks} of {totalTasks} tasks completed
            </p>
            <p className="text-gray-500">You're making great progress!</p>
          </div>
        </div>
      )}
    </motion.header>
  );
};

export default Header;