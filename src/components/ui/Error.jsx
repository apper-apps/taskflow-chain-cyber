import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ 
  title = "Something went wrong", 
  message = "We encountered an error while loading your tasks. Please try again.", 
  onRetry,
  className = "" 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex flex-col items-center justify-center py-12 px-4 text-center ${className}`}
    >
      {/* Error icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="w-16 h-16 bg-gradient-to-r from-error-500 to-error-600 rounded-full flex items-center justify-center mb-6 empty-state-icon"
      >
        <ApperIcon name="AlertTriangle" size={28} className="text-white" />
      </motion.div>

      {/* Error content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="max-w-md"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-6 leading-relaxed">{message}</p>

        {/* Actions */}
        {onRetry && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Button
              onClick={onRetry}
              variant="primary"
              size="lg"
              className="inline-flex items-center gap-2"
            >
              <ApperIcon name="RefreshCw" size={16} />
              Try Again
            </Button>
          </motion.div>
        )}
      </motion.div>

      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-error-100 to-error-200 rounded-full opacity-20" />
        <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-error-100 to-error-200 rounded-full opacity-20" />
      </div>
    </motion.div>
  );
};

export default Error;