import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#featured-projects" },
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
          <span className="nav-logo-text">enixia.io</span>
          {/*
            To use your actual favicon/logo image:
            <img src="/src/assets/logo.png" alt="enixia" className="nav-logo-img" />

            Advanced image settings are available via CSS:
            .nav-logo-img {
              width: 28px;
              height: 28px;
              opacity: 0.9;          // transparency
              filter: invert(1) sepia(1) saturate(2) hue-rotate(0deg) brightness(1.1);
                                     // color shifting
              mix-blend-mode: screen;// blend mode for dark backgrounds
            }
          */}
          <span className="nav-logo-diamond">◆</span>
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
      </div>
    </nav>
  );
}