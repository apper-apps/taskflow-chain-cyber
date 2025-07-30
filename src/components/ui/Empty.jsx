import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No items found", 
  description = "Get started by creating your first item.", 
  icon = "Inbox",
  actionLabel = "Get Started",
  onAction,
  className = "" 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex flex-col items-center justify-center py-12 px-4 text-center relative ${className}`}
    >
      {/* Empty state icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="w-20 h-20 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mb-6 empty-state-icon"
      >
        <ApperIcon name={icon} size={36} className="text-white" />
      </motion.div>

      {/* Empty state content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="max-w-md"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>

        {/* Call to action */}
        {onAction && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Button
              onClick={onAction}
              variant="primary"
              size="lg"
              className="inline-flex items-center gap-2"
            >
              <ApperIcon name="Plus" size={16} />
              {actionLabel}
            </Button>
          </motion.div>
        )}
      </motion.div>

      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-8 right-8 w-16 h-16 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full opacity-30" />
        <div className="absolute bottom-8 left-8 w-20 h-20 bg-gradient-to-br from-secondary-100 to-accent-100 rounded-full opacity-30" />
        <div className="absolute top-1/3 left-1/4 w-2 h-2 bg-primary-300 rounded-full opacity-40" />
        <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-secondary-300 rounded-full opacity-40" />
      </div>
    </motion.div>
  );
};

export default Empty;