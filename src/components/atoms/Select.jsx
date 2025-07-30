import { forwardRef } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Select = forwardRef(({ 
  className, 
  children,
  error,
  ...props 
}, ref) => {
  return (
    <div className="relative">
      <select
        className={cn(
          "flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 appearance-none pr-10",
          error && "border-error-500 focus:ring-error-500",
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <ApperIcon name="ChevronDown" size={16} className="text-gray-400" />
      </div>
    </div>
  );
});

Select.displayName = "Select";

export default Select;