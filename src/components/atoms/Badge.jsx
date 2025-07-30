import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Badge = forwardRef(({ 
  className, 
  variant = "default", 
  size = "sm",
  children,
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center rounded-full font-medium transition-all duration-200";
  
  const variants = {
    default: "bg-gray-100 text-gray-800",
    primary: "bg-gradient-to-r from-primary-500 to-secondary-500 text-white",
    secondary: "bg-gradient-to-r from-secondary-500 to-accent-500 text-white",
    success: "bg-gradient-to-r from-success-500 to-success-600 text-white",
    warning: "bg-gradient-to-r from-warning-500 to-warning-600 text-white",
    error: "bg-gradient-to-r from-error-500 to-error-600 text-white",
    work: "category-work text-white",
    personal: "category-personal text-white",
    shopping: "category-shopping text-white",
    health: "category-health text-white"
  };

  const sizes = {
    xs: "px-2 py-0.5 text-xs",
    sm: "px-2.5 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-sm"
  };

  return (
    <span
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </span>
  );
});

Badge.displayName = "Badge";

export default Badge;