export function Navbar() {
  return (
    <nav className="hidden md:flex items-center gap-7 lg:gap-10">
      <a
        href="#about"
        className="text-white font-inter text-[13px] lg:text-sm font-medium hover:text-[var(--accent-gold)] transition-colors"
      >
        About
      </a>
      <a
        href="#skills"
        className="text-[var(--text-secondary)] font-inter text-[13px] lg:text-sm font-medium hover:text-[var(--accent-gold)] transition-colors"
      >
        Skills
      </a>
      <a
        href="#portfolio"
        className="text-[var(--text-secondary)] font-inter text-[13px] lg:text-sm font-medium hover:text-[var(--accent-gold)] transition-colors"
      >
        Projects
      </a>
      <a
        href="#experience"
        className="text-[var(--text-secondary)] font-inter text-[13px] lg:text-sm font-medium hover:text-[var(--accent-gold)] transition-colors"
      >
        Experience
      </a>
      <a
        href="#contact"
        className="text-[var(--text-secondary)] font-inter text-[13px] lg:text-sm font-medium hover:text-[var(--accent-gold)] transition-colors"
      >
        Contact
      </a>
    </nav>
  );
}
