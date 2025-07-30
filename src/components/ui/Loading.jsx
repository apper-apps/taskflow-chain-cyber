import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Loading = ({ message = "Loading tasks...", className = "" }) => {
  const skeletonItems = Array.from({ length: 3 }, (_, index) => index);

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Loading message */}
      <div className="flex items-center justify-center gap-3 py-8">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center"
        >
          <ApperIcon name="Loader2" size={16} className="text-white" />
        </motion.div>
        <p className="text-gray-600 font-medium">{message}</p>
      </div>

      {/* Skeleton cards */}
      <div className="space-y-3">
        {skeletonItems.map((index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg border border-gray-200 p-4 animate-pulse"
          >
            <div className="flex items-start gap-3">
              {/* Checkbox skeleton */}
              <div className="w-5 h-5 bg-gray-200 rounded border-2 border-gray-300 flex-shrink-0 mt-0.5" />
              
              {/* Content skeleton */}
              <div className="flex-1 space-y-3">
                {/* Title */}
                <div className="h-5 bg-gray-200 rounded w-3/4" />
                
                {/* Description */}
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-full" />
                  <div className="h-4 bg-gray-200 rounded w-2/3" />
                </div>
                
                {/* Badges */}
                <div className="flex gap-2">
                  <div className="h-6 bg-gray-200 rounded-full w-16" />
                  <div className="h-6 bg-gray-200 rounded-full w-14" />
                  <div className="h-6 bg-gray-200 rounded-full w-12" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Loading;