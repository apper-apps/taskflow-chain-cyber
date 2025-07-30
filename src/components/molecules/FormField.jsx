import Label from "@/components/atoms/Label";
import Input from "@/components/atoms/Input";
import Textarea from "@/components/atoms/Textarea";
import Select from "@/components/atoms/Select";
import { cn } from "@/utils/cn";

const FormField = ({ 
  label, 
  type = "text", 
  error, 
  required = false, 
  className,
  children,
  ...props 
}) => {
  const fieldId = props.id || props.name;

  const renderInput = () => {
    if (type === "textarea") {
      return <Textarea {...props} error={error} />;
    }
    
    if (type === "select") {
      return (
        <Select {...props} error={error}>
          {children}
        </Select>
      );
    }
    
    return <Input type={type} {...props} error={error} />;
  };

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <Label htmlFor={fieldId} className="block">
          {label}
          {required && <span className="text-error-500 ml-1">*</span>}
        </Label>
      )}
      {renderInput()}
      {error && (
        <p className="text-sm text-error-500 mt-1">{error}</p>
      )}
    </div>
  );
};

export default FormField;