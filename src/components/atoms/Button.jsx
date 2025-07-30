import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Button = forwardRef(({ 
  className, 
  variant = "primary", 
  size = "md", 
  children, 
  disabled,
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-gradient-to-r from-primary-500 to-secondary-500 text-white hover:from-primary-600 hover:to-secondary-600 focus:ring-primary-500 shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98]",
    secondary: "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-primary-500 shadow-sm hover:shadow-md",
    danger: "bg-gradient-to-r from-error-500 to-error-600 text-white hover:from-error-600 hover:to-error-700 focus:ring-error-500 shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98]",
    ghost: "text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:ring-primary-500",
    success: "bg-gradient-to-r from-success-500 to-success-600 text-white hover:from-success-600 hover:to-success-700 focus:ring-success-500 shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98]"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
    xl: "px-8 py-4 text-lg"
  };

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      ref={ref}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;