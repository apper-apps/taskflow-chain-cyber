import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    {
      name: "Active Tasks",
      path: "/",
      icon: "CheckSquare",
      description: "Manage your current tasks"
    },
    {
      name: "Archive",
      path: "/archive",
      icon: "Archive",
      description: "View completed tasks"
    }
  ];

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  // Desktop Sidebar Component
  const DesktopSidebar = () => (
    <div className="hidden lg:flex lg:flex-col lg:w-64 lg:border-r lg:border-gray-200 lg:bg-white lg:h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-6 border-b border-gray-200">
        <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
          <ApperIcon name="CheckSquare" size={16} className="text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
            TaskFlow
          </h1>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6">
        <div className="space-y-2">
          {navigationItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition-all duration-200 group ${
                isActivePath(item.path)
                  ? "bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <ApperIcon 
                name={item.icon} 
                size={18}
                className={isActivePath(item.path) ? "text-white" : "text-gray-500 group-hover:text-gray-700"} 
              />
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{item.name}</p>
                <p className={`text-xs truncate ${
                  isActivePath(item.path) ? "text-white/80" : "text-gray-500"
                }`}>
                  {item.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );

  // Mobile Sidebar Component
  const MobileSidebar = () => (
    <>
      {/* Mobile menu backdrop */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="lg:hidden fixed inset-0 z-40 modal-backdrop"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: isMobileMenuOpen ? 0 : "-100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="lg:hidden fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 flex flex-col"
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-6 py-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
              <ApperIcon name="CheckSquare" size={16} className="text-white" />
            </div>
            <h1 className="text-lg font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              TaskFlow
            </h1>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <ApperIcon name="X" size={20} />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6">
          <div className="space-y-2">
            {navigationItems.map((item) => (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition-all duration-200 group ${
                  isActivePath(item.path)
                    ? "bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <ApperIcon 
                  name={item.icon} 
                  size={18}
                  className={isActivePath(item.path) ? "text-white" : "text-gray-500 group-hover:text-gray-700"} 
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{item.name}</p>
                  <p className={`text-xs truncate ${
                    isActivePath(item.path) ? "text-white/80" : "text-gray-500"
                  }`}>
                    {item.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </nav>
      </motion.div>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Desktop Sidebar */}
      <DesktopSidebar />
      
      {/* Mobile Sidebar */}
      <MobileSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <ApperIcon name="Menu" size={20} />
              </Button>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gradient-to-r from-primary-500 to-secondary-500 rounded flex items-center justify-center">
                  <ApperIcon name="CheckSquare" size={12} className="text-white" />
                </div>
                <h1 className="text-lg font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                  TaskFlow
                </h1>
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;