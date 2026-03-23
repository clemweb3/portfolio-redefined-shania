import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Work", href: "#featured-projects" },
  { label: "Experience", href: "#experience" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close menu on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const close = () => setMenuOpen(false);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [menuOpen]);

  return (
    <nav className={`nav${scrolled ? " nav--scrolled" : ""}`}>
      <div className="nav-inner">
        {/* Logo */}
        <a href="#home" className="nav-logo">
          NIA <span className="nav-logo-diamond">◆</span>
        </a>

        {/* Desktop links */}
        <div className="nav-links">
          {NAV_LINKS.map((item) => (
            <a key={item.label} href={item.href} className="nav-link">
              {item.label}
            </a>
          ))}
        </div>

        <div className="nav-actions">
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="nav-resume">
            Resume
          </a>

          {/* Hamburger */}
          <button
            className={`nav-hamburger${menuOpen ? " nav-hamburger--open" : ""}`}
            onClick={(e) => { e.stopPropagation(); setMenuOpen((v) => !v); }}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div className={`nav-drawer${menuOpen ? " nav-drawer--open" : ""}`}>
        {NAV_LINKS.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="nav-drawer-link"
            onClick={() => setMenuOpen(false)}
          >
            {item.label}
          </a>
        ))}
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-drawer-resume"
        >
          Resume ↗
        </a>
      </div>
    </nav>
  );
}
