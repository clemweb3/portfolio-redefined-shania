/**
 * ManifestoSlide.jsx
 * ─────────────────────────────────────────────────────────────────
 * The full-screen editorial interstitial between Projects and About.
 * Typography: Le Jour Serif (self-host) or Cormorant Garamond fallback.
 * Matches PDF page 6: "You don't deserve a certain life. You build into it."
 *
 * FONT SETUP (Le Jour Serif):
 *   1. Obtain LeJourSerif.woff2 and place in /src/assets/fonts/
 *   2. In index.css, add:
 *        @font-face {
 *          font-family: 'Le Jour Serif';
 *          src: url('/src/assets/fonts/LeJourSerif.woff2') format('woff2');
 *          font-weight: normal;
 *          font-style: normal;
 *          font-display: swap;
 *        }
 *   3. Then --font-manifesto in CSS already points to 'Le Jour Serif'.
 */

import { useEffect, useRef, useState } from "react";

export default function ManifestoSlide() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className={`manifesto${visible ? " manifesto--visible" : ""}`} aria-label="Manifesto">

      {/* Subtle film-grain texture overlay */}
      <div className="manifesto-grain" aria-hidden="true" />

      {/* Fine horizontal rule top */}
      <div className="manifesto-rule-top" aria-hidden="true" />

      <div className="manifesto-inner">
        {/* Label */}
        <div className="manifesto-label" aria-hidden="true">
          <span className="manifesto-label-line" />
          <span className="manifesto-label-text">enixia's Imprints.</span>
        </div>

        {/* Main quote */}
        <blockquote className="manifesto-quote">
          <p className="manifesto-line manifesto-line--1">
            You don't deserve
          </p>
          <p className="manifesto-line manifesto-line--2">
            a certain life.
          </p>
          <p className="manifesto-line manifesto-line--3">
            <em>You build into it.</em>
          </p>
        </blockquote>

        {/* Attribution / fine print */}
        <p className="manifesto-attr">
          All movie stills and posters are property of their respective studios<br />
          and are used here for inspirational/educational purposes.
        </p>
      </div>

      {/* Fine horizontal rule bottom */}
      <div className="manifesto-rule-bottom" aria-hidden="true" />
    </section>
  );
}