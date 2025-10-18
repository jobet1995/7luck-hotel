"use client";

import { Facebook, Instagram, Twitter, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "#hero" },
    { name: "About Us", href: "#about" },
    { name: "Rooms", href: "#rooms" },
    { name: "Amenities", href: "#amenities" },
    { name: "Gallery", href: "#gallery" },
    { name: "Contact", href: "#contact" },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.replace("#", ""));
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer
      style={{ backgroundColor: "#003366" }}
      className="text-white pt-8 pb-4"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div
                style={{ backgroundColor: "#d4af37" }}
                className="w-12 h-12 rounded-full flex items-center justify-center"
              >
                <span style={{ color: "#003366" }}>7L</span>
              </div>
              <div className="flex flex-col">
                <span className="text-white font-playfair text-xl">7-Luck</span>
                <span style={{ color: "#d4af37" }} className="text-xs -mt-1">
                  Hotel & Resorts
                </span>
              </div>
            </div>
            <p className="text-white/70 text-sm mb-4">
              Experience the Fortune of Comfort. A paradise of peace, style, and
              luxury.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#d4af37] hover:text-[#003366] transition-all duration-300"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#d4af37] hover:text-[#003366] transition-all duration-300"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#d4af37] hover:text-[#003366] transition-all duration-300"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 style={{ color: "#d4af37" }} className="mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-white/70 hover:text-[#d4af37] transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 style={{ color: "#d4af37" }} className="mb-4">
              Our Services
            </h3>
            <ul className="space-y-2 text-white/70 text-sm">
              <li>Room Booking</li>
              <li>Event Planning</li>
              <li>Spa & Wellness</li>
              <li>Airport Transfer</li>
              <li>Concierge Service</li>
              <li>Fine Dining</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="max-w-full">
            <h3 style={{ color: "#d4af37" }} className="mb-4">
              Stay Updated
            </h3>
            <p className="text-white/70 text-sm mb-4">
              Subscribe to our newsletter for exclusive offers and updates.
            </p>
            <form className="w-full" onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 max-w-full">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2.5 bg-white/10 border border-white/20 rounded sm:rounded-l sm:rounded-r-none text-white placeholder-white/50 focus:outline-none focus:border-[#d4af37] text-sm"
                />
                <button
                  type="submit"
                  style={{ backgroundColor: "#d4af37", color: "#003366" }}
                  className="px-4 py-2.5 rounded sm:rounded-l-none sm:rounded-r hover:bg-opacity-90 transition-colors flex-shrink-0 mt-2 sm:mt-0"
                >
                  <Mail size={18} />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-4 text-center">
          <p className="text-white/70 text-sm">
            &copy; {currentYear} 7-Luck Hotel & Resorts. All rights reserved.
          </p>
          <p className="text-white/50 text-xs mt-2">
            Designed with luxury and elegance in mind
          </p>
        </div>
      </div>
    </footer>
  );
}
