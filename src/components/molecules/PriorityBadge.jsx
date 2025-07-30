import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";

const PriorityBadge = ({ priority, size = "sm" }) => {
  const priorityConfig = {
    high: {
      variant: "error",
      icon: "AlertTriangle",
      label: "High"
    },
    medium: {
      variant: "warning", 
      icon: "Clock",
      label: "Medium"
    },
    low: {
      variant: "success",
      icon: "CheckCircle2",
      label: "Low"
    }
  };

  const config = priorityConfig[priority?.toLowerCase()] || priorityConfig.low;

  return (
    <Badge variant={config.variant} size={size} className="inline-flex items-center gap-1">
      <ApperIcon name={config.icon} size={12} />
      <span>{config.label}</span>
    </Badge>
  );
};

export default PriorityBadge;