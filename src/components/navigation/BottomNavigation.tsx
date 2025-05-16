import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Users, Bell } from "lucide-react";

const BottomNavigation: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/groups", icon: Users, label: "Groups" },
    { path: "/notifications", icon: Bell, label: "Notifications" },
    // { path: '/calendar', icon: Calendar, label: 'Calendar' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg px-2 py-3">
      <div className="flex justify-around items-center">
        {navItems.map((item) => {
          const isActive = currentPath === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center px-3 py-1 rounded-lg transition-colors ${
                isActive
                  ? "text-orange-500"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              <item.icon
                size={20}
                className={isActive ? "fill-orange-500" : ""}
              />
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;
