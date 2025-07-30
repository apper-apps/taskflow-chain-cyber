import { useState } from "react";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const SearchBar = ({ 
  onSearch, 
  placeholder = "Search tasks...", 
  className,
  value = "",
  onChange 
}) => {
  const [searchTerm, setSearchTerm] = useState(value);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (onChange) {
      onChange(term);
    }
    if (onSearch) {
      onSearch(term);
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
    if (onChange) {
      onChange("");
    }
    if (onSearch) {
      onSearch("");
    }
  };

  return (
    <div className={cn("relative", className)}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <ApperIcon name="Search" size={16} className="text-gray-400" />
      </div>
      <Input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleSearch}
        className="pl-10 pr-10"
      />
      {searchTerm && (
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={clearSearch}
            className="p-1 h-auto hover:bg-gray-100 rounded-full"
          >
            <ApperIcon name="X" size={14} className="text-gray-400" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default SearchBar;