import { useEffect, useRef } from "react";

const CHARS = "!@#$%&*?ABCDEFGHIJabcdefghij0123456789";
const FINAL_WORD = "lead.";
const CYCLE_WORDS = ["decisions.", "clarity.", "action.", "impact."];

function scrambleWord(el, final, duration) {
  return new Promise((res) => {
    let f = 0;
    const total = Math.floor(duration / 55);
    if (el._t) clearInterval(el._t);
    el._t = setInterval(() => {
      const p = f / total;
      let out = "";
      for (let i = 0; i < final.length; i++) {
        if (final[i] === "." || final[i] === " ") { out += final[i]; continue; }
        out += p > 0.45 + (i / final.length) * 0.55
          ? final[i]
          : CHARS[Math.floor(Math.random() * CHARS.length)];
      }
      el.textContent = out;
      if (++f >= total) {
        clearInterval(el._t);
        el.textContent = final;
        res();
      }
    }, 55);
  });
}

export default function Hero() {
  const leadRef = useRef(null);
  const cycleRef = useRef(null);
  const indexRef = useRef(0);

  useEffect(() => {
    const el = leadRef.current;
    if (!el) return;
    el.textContent = FINAL_WORD;
    el.style.display = "inline-block";
    el.style.fontVariantNumeric = "tabular-nums";
    el.style.minWidth = `${FINAL_WORD.length}ch`;

    let animating = false;
    const handleEnter = () => {
      if (animating) return;
      animating = true;
      scrambleWord(el, FINAL_WORD, 18 * 55 + 80 * (FINAL_WORD.length - 1)).then(() => {
        animating = false;
      });
    };
    el.addEventListener("mouseenter", handleEnter);
    return () => {
      el.removeEventListener("mouseenter", handleEnter);
      if (el._t) clearInterval(el._t);
    };
  }, []);

  useEffect(() => {
    const el = cycleRef.current;
    if (!el) return;
    el.style.display = "inline-block";
    el.style.minWidth = "8ch";
    const interval = setInterval(async () => {
      indexRef.current = (indexRef.current + 1) % CYCLE_WORDS.length;
      await scrambleWord(el, CYCLE_WORDS[indexRef.current], 1100);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="hero-section">
      {/* ── BACKGROUND GRID ── */}
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-grid" />
        <div className="hero-vignette" />
      </div>

      {/* ── VERTICAL RULES ── */}
      <div className="hero-rule-left" aria-hidden="true" />
      <div className="hero-rule-right" aria-hidden="true" />

      {/* ── SPLIT LAYOUT ── */}
      <div className="hero-split">

        {/* LEFT: TEXT PANEL */}
        <div className="hero-left">
          <div className="hero-wrap-inner">

            {/* Intro tag */}
            <div className="hero-tag">
              <span className="hero-tag-line" />
              <span className="hero-tag-text">001 / Introduction</span>
            </div>

            {/* Main headlines */}
            <div className="hero-headlines">
              <h1 className="hero-h1">
                Technical enough<br />to build it.
              </h1>
              <h1 className="hero-h1 hero-h1--accent">
                Clear enough to{" "}
                <span
                  ref={leadRef}
                  className="hero-accent hero-scramble"
                />
              </h1>
            </div>

            {/* Cycling subhead */}
            <p className="hero-subhead">
              I turn complexity into{" "}
              <span ref={cycleRef} className="hero-cycle">
                decisions.
              </span>
            </p>

            <p className="hero-body">
              I close the gap between raw data and real decisions — through models,
              dashboards, and the people using them.
            </p>

            {/* CTA */}
            <div className="hero-btns">
              <a href="#featured-projects" className="hero-btn hero-btn--primary">
                <span className="hero-btn-fill" aria-hidden="true" />
                <span className="hero-btn-label">View My Work</span>
              </a>
              <a href="#contact" className="hero-btn hero-btn--secondary">
                <span className="hero-btn-fill" aria-hidden="true" />
                <span className="hero-btn-label hero-btn-label--accent">Let's Talk</span>
              </a>
            </div>

            {/* Meta strip (visible mobile + desktop left panel) */}
            <div className="hero-meta-strip">
              <div className="hero-meta-divider" />
              {[
                { label: "Discipline", value: "BI · Data Science" },
                { label: "Currently", value: "BSDS · Mapua University" },
                { label: "Based In", value: "Manila, Philippines" },
                { label: "Status", value: "Open to work", dot: true },
              ].map(({ label, value, dot }, i, arr) => (
                <div
                  key={label}
                  className={`hero-meta-row${i < arr.length - 1 ? " hero-meta-row--border" : ""}`}
                >
                  <span className="hero-meta-label">{label}</span>
                  <span className="hero-meta-value">
                    {dot && <span className="hero-status-dot" />}
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: IMAGE PANEL */}
        <div className="hero-right" aria-hidden="true">
          {/*
            ── HERO IMAGE SETUP ──────────────────────────────────────────
            Replace the placeholder below with your actual image.

            OPTION 1 — Local asset (recommended):
              1. Add your photo to /src/assets/hero-photo.jpg (or .webp)
              2. Import it: import heroBg from "../assets/hero-photo.jpg";
              3. Set: style={{ backgroundImage: `url(${heroBg})` }}

            OPTION 2 — Public folder:
              Place photo at /public/hero-photo.jpg
              Set: style={{ backgroundImage: 'url(/hero-photo.jpg)' }}

            ADVANCED IMAGE SETTINGS (adjust in CSS class .hero-photo):
              background-size: cover        → fill the panel (default)
              background-position: center top → align to top of photo
              opacity: 0.85                 → overall transparency (0–1)
              filter: grayscale(0.2) contrast(1.05) brightness(0.95)
                → subtle tone grading; increase grayscale(1) for full B&W
              mix-blend-mode: normal        → try 'luminosity' for tinted BW
            ────────────────────────────────────────────────────────────
          */}
          <div
            className="hero-photo"
            style={{
              backgroundImage: "none",        /* ← REPLACE with url(heroBg) */
            }}
          >
            {/* Placeholder overlay — remove once you add the real image */}
            <div className="hero-photo-placeholder">
              <div className="hero-photo-placeholder-inner">
                <span className="hero-photo-placeholder-label">
                  HERO<br />PHOTO
                </span>
                <span className="hero-photo-placeholder-hint">
                  Replace hero-photo.jpg in /src/assets/
                </span>
              </div>
            </div>

            {/* Gradient overlay — keeps text readable; tune opacity in CSS */}
            <div className="hero-photo-overlay" />

            {/* Corner accents */}
            <div className="hero-photo-corner hero-photo-corner--tl" />
            <div className="hero-photo-corner hero-photo-corner--br" />
          </div>

          {/* Floating name card */}
          <div className="hero-namecard">
            <span className="hero-namecard-name">Shania Keith Dela Vega</span>
            <span className="hero-namecard-role">Data Scientist · BI Analyst · BA</span>
          </div>
        </div>
      </div>

      {/* ── SCROLL INDICATOR ── */}
      <div className="hero-scroll" aria-hidden="true">
        <span className="hero-scroll-text">Scroll</span>
        <div className="hero-scroll-line" />
      </div>
    </section>
  );
}