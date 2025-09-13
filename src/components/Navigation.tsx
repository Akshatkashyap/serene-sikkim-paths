import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Mountain, Map, List, Home, Menu, X } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { LanguageSelector } from "./LanguageSelector";

const Navigation = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const navItems = [
    { path: "/", label: t('navigation.home'), icon: Home },
    { path: "/monasteries", label: t('navigation.monasteries'), icon: List },
    { path: "/map", label: t('navigation.map'), icon: Map },
  ];

  const closeSheet = () => setIsOpen(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-3 lg:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2" onClick={closeSheet}>
            <Mountain className="h-7 w-7 lg:h-8 lg:w-8 text-red-600" />
            <span className="text-lg lg:text-xl font-bold text-foreground">
              <span className="hidden sm:inline">Seek Sikkim</span>
              <span className="sm:hidden">Sikkim</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6">
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


          {/* Desktop CTA Button */}
          <div className="hidden md:block">
            <Link to="/plan-visit">
              <Button
                size="sm"
                className="bg-gradient-to-r from-blue-600 to-red-600 text-white border border-white/20 hover:border-white/40 
                 transition-all duration-200 ease-in-out 
                 hover:shadow-md 
                 active:scale-95"
              >
                Plan Your Visit
              </Button>
            </Link>

          </div>


          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="p-2">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[300px]">
                <div className="flex flex-col space-y-6 mt-6">
                  {/* Mobile Logo */}
                  <Link to="/" className="flex items-center gap-2 pb-4 border-b" onClick={closeSheet}>
                    <Mountain className="h-6 w-6 text-red-600" />
                    <span className="text-lg font-bold text-foreground">
                      Sikkim Monasteries
                    </span>
                  </Link>

                  {/* Mobile Navigation Items */}
                  <div className="flex flex-col space-y-3">
                    {navItems.map((item) => {
                      const isActive = location.pathname === item.path;
                      const Icon = item.icon;

                      return (
                        <Link key={item.path} to={item.path} onClick={closeSheet}>
                          <Button
                            variant={isActive ? "default" : "ghost"}
                            size="sm"
                            className="w-full justify-start gap-3 h-12"
                          >
                            <Icon className="h-5 w-5" />
                            {item.label}
                          </Button>
                        </Link>
                      );
                    })}
                  </div>

                  {/* Mobile Language Selector */}
                  <div className="pt-2 border-t">
                    <div className="flex justify-center">
                      <LanguageSelector />
                    </div>
                  </div>

                  {/* Mobile CTA Button */}
                  <div className="pt-4 border-t">
                    <Link to="/plan-visit" onClick={closeSheet}>
                      <Button
                        className="w-full bg-gradient-to-r from-blue-600 to-red-600 text-white border border-white/20 hover:border-white/40"
                      >
                        Plan Your Visit
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;