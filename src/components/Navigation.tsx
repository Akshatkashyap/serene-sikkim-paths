import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Mountain, Map, List, Home } from "lucide-react";

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/monasteries", label: "Monasteries", icon: List },
    { path: "/map", label: "Explore Map", icon: Map },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Mountain className="h-8 w-8 text-red-600" />
            <span className="text-xl font-bold text-foreground">
              Sikkim Monasteries
            </span>
          </Link>
          
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              
              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </div>

          <Button className="bg-gradient-to-r from-blue-600 to-red-600 text-white border border-white/20 hover:border-white/40" size="sm">
            Plan Your Visit
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;