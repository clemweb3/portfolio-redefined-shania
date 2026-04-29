import { useEffect, useState } from "react";
import faviconLogo from "../assets/assets/logo_FAVICON.png";


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
    const close = (e) => {
      if (!e.target.closest(".nav-drawer") && !e.target.closest(".nav-hamburger")) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [menuOpen]);

  return (
    <nav className={`nav${scrolled ? " nav--scrolled" : ""}`}>
      <div className="nav-inner">
        {/* EN Logo — uses the EN favicon/logo mark */}
        <a href="#home" className="nav-logo" aria-label="Enixia Home">
          <img
            src={faviconLogo}
            alt=""
            aria-hidden="true"
            className="nav-logo-img"
          />
        </a>

        {/* Desktop links */}
        <div className="nav-links">
          {NAV_LINKS.map((item) => (
            <a key={item.label} href={item.href} className="nav-link">
              {item.label}
            </a>
          ))}
        </div>

        {/* Hamburger */}
        <button
          className={`nav-hamburger${menuOpen ? " nav-hamburger--open" : ""}`}
          onClick={(e) => { e.stopPropagation(); setMenuOpen((v) => !v); }}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile drawer */}
      <div className={`nav-drawer${menuOpen ? " nav-drawer--open" : ""}`} aria-hidden={!menuOpen}>
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
