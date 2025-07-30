import { forwardRef } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Checkbox = forwardRef(({ 
  className, 
  checked = false,
  onChange,
  ...props 
}, ref) => {
  return (
    <label className="relative flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={onChange}
        ref={ref}
        {...props}
      />
      <div className={cn(
        "flex items-center justify-center w-5 h-5 rounded border-2 transition-all duration-200",
        checked 
          ? "bg-gradient-to-r from-primary-500 to-secondary-500 border-primary-500 checkbox-burst" 
          : "border-gray-300 hover:border-primary-400 bg-white",
        className
      )}>
        {checked && (
          <ApperIcon 
            name="Check" 
            size={12} 
            className="text-white animate-scale-in" 
          />
        )}
      </div>
    </label>
  );
});

Checkbox.displayName = "Checkbox";

export default Checkbox;