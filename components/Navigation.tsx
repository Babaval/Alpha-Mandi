// components/Navigation.tsx
import React, { useState, useEffect } from "react";
import { ViewState, UserProfile } from "../types";
import {
  ShoppingBag,
  Menu as MenuIcon,
  Home,
  User,
  LogIn,
  Calendar,
} from "lucide-react";

interface NavigationProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
  cartCount: number;
  toggleCart: () => void;
  user: UserProfile | null;
  onLoginClick: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentView,
  setView,
  cartCount,
  toggleCart,
  user,
  onLoginClick,
}) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/80 backdrop-blur-xl border-b border-white/5 py-3 shadow-2xl"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* LOGO */}
          <div
            className="flex-shrink-0 cursor-pointer group"
            onClick={() => setView("HOME")}
          >
            <div className="flex flex-col">
              <span className="text-2xl md:text-3xl font-serif text-white tracking-widest font-bold uppercase group-hover:text-primary transition-colors duration-300">
                Alpha <span className="text-primary italic">Mandi</span>
              </span>
              <div className="h-[1px] w-0 group-hover:w-full bg-gradient-to-r from-primary to-transparent transition-all duration-500" />
            </div>
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center space-x-2 bg-black/20 p-1 rounded-full border border-white/5 backdrop-blur-md">
            <NavButton
              active={currentView === "HOME"}
              onClick={() => setView("HOME")}
              icon={<Home size={16} />}
              label="Home"
            />

            <NavButton
              active={currentView === "MENU"}
              onClick={() => setView("MENU")}
              icon={<MenuIcon size={16} />}
              label="Menu"
            />

            {/* RESERVATIONS */}
            <NavButton
              active={currentView === "RESERVATIONS"}
              onClick={() => setView("RESERVATIONS")}
              icon={<Calendar size={16} />}
              label="Reserve"
            />
          </div>

          {/* RIGHT SIDE ACTIONS */}
          <div className="flex items-center gap-3 md:gap-6">
            {/* USER PROFILE OR LOGIN */}
            {user?.isLoggedIn ? (
              <button
                onClick={() => setView("PROFILE")}
                className={`hidden md:flex items-center gap-3 pr-4 pl-1 py-1 rounded-full border transition-all duration-300 ${
                  currentView === "PROFILE"
                    ? "bg-primary/10 border-primary text-primary shadow-[0_0_15px_rgba(212,175,55,0.2)]"
                    : "bg-white/5 border-white/10 text-gray-300 hover:border-primary/50 hover:text-white"
                }`}
              >
                <div className="w-8 h-8 rounded-full overflow-hidden border border-primary/30">
                  <img
                    src={
                      user.avatar ||
                      "https://randomuser.me/api/portraits/lego/1.jpg"
                    }
                    alt="User"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="font-medium text-sm">
                  {user.name?.split(" ")[0] ?? "User"}
                </span>
              </button>
            ) : (
              <button
                onClick={onLoginClick}
                className="hidden md:flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-white hover:text-primary transition-colors"
              >
                <LogIn size={18} />
                <span>Login</span>
              </button>
            )}

            {/* MOBILE PROFILE ICON */}
            <button
              onClick={() =>
                user?.isLoggedIn ? setView("PROFILE") : onLoginClick()
              }
              className="md:hidden p-2 text-gray-300 hover:text-primary transition-colors"
            >
              <User
                size={24}
                className={currentView === "PROFILE" ? "text-primary" : ""}
              />
            </button>

            {/* CART BUTTON */}
            <button
              onClick={toggleCart}
              aria-label="Open cart"
              className="relative p-3 text-white hover:text-primary transition-colors group"
            >
              <ShoppingBag
                size={22}
                className="group-hover:scale-110 transition-transform"
              />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 inline-flex items-center justify-center w-5 h-5 text-[10px] font-bold text-black bg-gradient-to-r from-primary to-primary-dark rounded-full shadow-lg animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

// REUSABLE NAV BUTTON
const NavButton = ({
  active,
  onClick,
  label,
  icon,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  icon: React.ReactNode;
}) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
      active
        ? "bg-gradient-to-r from-primary to-primary-dark text-black shadow-[0_0_15px_rgba(212,175,55,0.4)]"
        : "text-gray-400 hover:text-white hover:bg-white/10"
    }`}
  >
    {icon}
    {label}
  </button>
);
