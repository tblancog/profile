"use client";

import { X } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#portfolio" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
  ];

  const handleNavClick = (href: string) => {
    onClose();
    // Small delay to allow menu close animation, then scroll
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 transition-opacity"
        onClick={onClose}
      />

      {/* Menu panel - slides in from right */}
      <div className="absolute right-0 top-0 h-full w-64 bg-[var(--bg-primary)] p-6 shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-[var(--bg-tertiary)] transition-colors"
          aria-label="Close menu"
        >
          <X className="w-6 h-6 text-white" />
        </button>

        <nav className="mt-16 flex flex-col gap-6">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="text-white font-inter text-lg font-medium text-left hover:text-[var(--accent-gold)] transition-colors"
            >
              {link.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
