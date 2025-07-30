import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";

const CategoryChip = ({ 
  category, 
  count = 0, 
  isActive = false, 
  onClick,
  showCount = false 
}) => {
  const categoryConfig = {
    work: {
      variant: "work",
      icon: "Briefcase",
      label: "Work"
    },
    personal: {
      variant: "personal",
      icon: "User",
      label: "Personal"
    },
    shopping: {
      variant: "shopping",
      icon: "ShoppingCart",
      label: "Shopping"
    },
    health: {
      variant: "health",
      icon: "Heart",
      label: "Health"
    }
  };

  const config = categoryConfig[category?.toLowerCase()] || categoryConfig.personal;

  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 transform hover:scale-105 ${
        isActive 
          ? "bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg" 
          : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:shadow-md"
      }`}
    >
      <ApperIcon name={config.icon} size={14} />
      <span>{config.label}</span>
      {showCount && (
        <span className={`text-xs px-1.5 py-0.5 rounded-full ${
          isActive ? "bg-white/20" : "bg-gray-100"
        }`}>
          {count}
        </span>
      )}
    </button>
  );
};

export default CategoryChip;