"use client";

import { useEffect, useState } from "react";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#portfolio", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const sectionIds = links.map((l) => l.href.slice(1));

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry that is most visible in the viewport
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="hidden md:flex items-center gap-7 lg:gap-10">
      {links.map(({ href, label }) => {
        const sectionId = href.slice(1);
        const isActive = activeSection === sectionId;
        return (
          <a
            key={href}
            href={href}
            className={`font-inter text-[13px] lg:text-sm font-medium transition-colors hover:text-[var(--accent-gold)] ${
              isActive ? "text-white" : "text-[var(--text-secondary)]"
            }`}
          >
            {label}
          </a>
        );
      })}
    </nav>
  );
}
