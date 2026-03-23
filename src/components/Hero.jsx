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
    <section
      id="home"
      className="hero-section"
    >
      {/* Background grid */}
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-grid" />
      </div>

      {/* Main content */}
      <div className="hero-wrap">

        {/* Left vertical rule */}
        <div className="hero-rule-left" aria-hidden="true" />
        <div className="hero-rule-right" aria-hidden="true" />

        {/* Intro tag */}
        <div className="hero-tag">
          <span className="hero-tag-line" />
          <span className="hero-tag-text">001 / Introduction</span>
        </div>

        {/* Copy + sidebar grid */}
        <div className="hero-grid-layout">

          {/* Main copy */}
          <div className="hero-copy">
            <div className="hero-headlines">
              <h1 className="hero-h1">
                Technical enough to build it.
              </h1>
              <h1 className="hero-h1">
                Clear enough to{" "}
                <span
                  ref={leadRef}
                  className="hero-accent hero-scramble"
                />
              </h1>
            </div>

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

            {/* CTA buttons */}
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
          </div>

          {/* Right sidebar — desktop only */}
          <aside className="hero-sidebar">
            {[
              { label: "Discipline", lines: ["BI · Data Science", "Business Analysis"] },
              { label: "Currently", lines: ["BSDS · Mapua University", "Graduating 2026"] },
              { label: "Based In", lines: ["Manila, Philippines"] },
            ].map(({ label, lines }) => (
              <div key={label} className="hero-sidebar-item">
                <p className="hero-sidebar-label">{label}</p>
                {lines.map((v, i) => (
                  <p key={i} className="hero-sidebar-value">{v}</p>
                ))}
              </div>
            ))}
            <div className="hero-sidebar-item">
              <p className="hero-sidebar-label">Status</p>
              <div className="hero-status">
                <span className="hero-status-dot" />
                <p className="hero-sidebar-value">Open to work</p>
              </div>
            </div>
          </aside>
        </div>

        {/* Mobile meta strip */}
        <div className="hero-mobile-meta">
          <div className="hero-mobile-divider" />
          {[
            { label: "Discipline", value: "BI · Data Science" },
            { label: "Location", value: "Manila, Philippines" },
            { label: "Status", value: "Open to work", dot: true },
          ].map(({ label, value, dot }, i, arr) => (
            <div
              key={label}
              className={`hero-meta-row${i < arr.length - 1 ? " hero-meta-row--border" : ""}`}
            >
              <span className="hero-meta-label">{label}</span>
              <span className="hero-meta-value">
                {dot && <span className="hero-status-dot hero-status-dot--sm" />}
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll" aria-hidden="true">
        <span className="hero-scroll-text">Scroll</span>
        <div className="hero-scroll-line" />
      </div>
    </section>
  );
}
