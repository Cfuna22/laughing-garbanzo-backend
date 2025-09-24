import { Home, Clock, Smartphone, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export const BottomNavigation = () => {
  const location = useLocation();
  
  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Clock, label: "Queue", path: "/queue" },
    { icon: Smartphone, label: "VTU", path: "/vtu" },
    { icon: User, label: "Profile", path: "/profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-border z-50">
      <div className="max-w-md mx-auto px-4">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all ${
                  isActive
                    ? "text-primary bg-primary/5"
                    : "text-foreground-muted hover:text-foreground hover:bg-background-muted"
                }`}
              >
                <Icon className={`w-5 h-5 mb-1 ${isActive ? "text-primary" : ""}`} />
                <span className={`text-xs font-medium ${isActive ? "text-primary" : ""}`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};