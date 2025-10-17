"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);

    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileOpen(false);
    }
  };

  const navLinks = [
    { name: "Home", id: "hero" },
    { name: "About", id: "about" },
    { name: "Rooms", id: "rooms" },
    { name: "Amenities", id: "amenities" },
    { name: "Gallery", id: "gallery" },
    { name: "Contact", id: "contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "shadow-lg" : ""
      }`}
      style={{ backgroundColor: isScrolled ? "#003366" : "transparent" }}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={() => scrollToSection("hero")}
            className="flex items-center space-x-2 group relative z-50"
          >
            <div
              style={{ backgroundColor: "#d4af37" }}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-transform group-hover:scale-110"
            >
              <span style={{ color: "#003366" }}>7L</span>
            </div>
            <div className="flex flex-col">
              <span className="text-white font-playfair text-xl">7-Luck</span>
              <span style={{ color: "#d4af37" }} className="text-xs -mt-1">
                Hotel & Resorts
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 relative z-50">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-white hover:text-[#d4af37] transition-colors duration-300 relative group"
              >
                {link.name}
                <span
                  style={{ backgroundColor: "#d4af37" }}
                  className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full"
                ></span>
              </button>
            ))}
            <button
              onClick={() => scrollToSection("contact")}
              style={{ backgroundColor: "#d4af37", color: "#003366" }}
              className="px-6 py-2.5 rounded hover:bg-opacity-90 transition-all duration-300 hover:shadow-lg"
            >
              Book Now
            </button>
          </div>

          {/* Mobile Navigation */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden text-white hover:text-[#d4af37] transition-colors relative z-50"
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden border-t border-white/20 transition-all duration-300 overflow-hidden ${
          isMobileOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{ backgroundColor: "#003366" }}
      >
        <div className="container mx-auto px-4 py-8 flex flex-col space-y-6">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="text-white hover:text-[#d4af37] transition-colors duration-300 text-left py-2"
            >
              {link.name}
            </button>
          ))}
          <button
            onClick={() => scrollToSection("contact")}
            style={{ backgroundColor: "#d4af37", color: "#003366" }}
            className="px-6 py-2.5 rounded hover:bg-opacity-90 transition-all duration-300 w-full"
          >
            Book Now
          </button>
        </div>
      </div>
    </nav>
  );
}
