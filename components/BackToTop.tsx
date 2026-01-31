"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;

    const toggleVisibility = () => {
      // Throttle scroll events for better performance
      if (timeoutId) return;

      timeoutId = setTimeout(() => {
        // Show button when page is scrolled down 400px
        if (window.scrollY > 400) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
        timeoutId = null;
      }, 100);
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 z-40 flex items-center justify-center w-12 h-12 rounded-lg bg-[var(--accent-gold)] text-[var(--bg-primary)] shadow-lg hover:brightness-110 transition-all duration-300 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
      aria-label="Back to top"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}
