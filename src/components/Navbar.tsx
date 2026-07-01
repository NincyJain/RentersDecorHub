import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Shrink/shadow navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close drawer on path change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Bedroom", href: "/bedroom" },
    { name: "Study Room", href: "/study-room" },
    { name: "Living Room", href: "/living-room" },
    { name: "Kitchen", href: "/kitchen" },
    { name: "Bathroom", href: "/bathroom" },
    { name: "Balcony", href: "/balcony" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md border-b border-neutral-100 shadow-sm"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-neutral-900 hover:text-neutral-700 transition-colors">
                renters<span className="text-amber-600 font-light">decor</span>hub
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.href}
                className={({ isActive }) =>
                  `text-sm font-medium tracking-wide transition-all duration-200 relative py-1 hover:text-neutral-900 ${
                    isActive ? "text-neutral-900 font-semibold" : "text-neutral-500"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 h-0.5 w-full bg-neutral-900 rounded-full" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-lg p-2 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-950 focus:outline-none transition-colors"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Panel */}
      {isOpen && (
        <div className="md:hidden border-b border-neutral-100 bg-white shadow-lg animate-in slide-in-from-top-4 duration-200">
          <div className="space-y-1 px-4 pb-4 pt-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.href}
                className={({ isActive }) =>
                  `block rounded-lg px-3 py-2 text-base font-medium transition-colors ${
                    isActive
                      ? "bg-neutral-900 text-white"
                      : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
