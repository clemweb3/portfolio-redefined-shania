// Hero.jsx — Introduction section (Page 2 of design)
// Light beige background, flowing wave SVG, left copy + right sidebar
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
    el.style.minWidth = "10ch";
    const interval = setInterval(async () => {
      indexRef.current = (indexRef.current + 1) % CYCLE_WORDS.length;
      await scrambleWord(el, CYCLE_WORDS[indexRef.current], 1100);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="intro" className="hero-section">
      {/* Animated wave lines background */}
      <div className="hero-wave-bg" aria-hidden="true">
        <svg
          className="hero-wave-svg"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Radiating curved lines mimicking the design's wave pattern */}
          {Array.from({ length: 22 }, (_, i) => {
            const offset = i * 28;
            return (
              <path
                key={i}
                d={`M ${-200 + offset * 2} 900 Q ${400 + offset} ${200 + i * 10} ${1200 + offset} ${-100 + i * 5}`}
                stroke="#c8c4be"
                strokeWidth="0.8"
                fill="none"
                opacity={0.35 + (i % 4) * 0.08}
              />
            );
          })}
          {/* Secondary wave set from right */}
          {Array.from({ length: 14 }, (_, i) => {
            const offset = i * 30;
            return (
              <path
                key={`r-${i}`}
                d={`M ${1600 - offset} 0 Q ${900 - offset * 0.5} ${450 + i * 12} ${200 - offset * 0.3} ${900 + offset * 0.2}`}
                stroke="#b8b4ae"
                strokeWidth="0.6"
                fill="none"
                opacity={0.30 + (i % 3) * 0.07}
              />
            );
          })}
        </svg>
      </div>

      <div className="hero-inner">
        {/* Left column */}
        <div className="hero-left">
          {/* Section tag */}
          <p className="section-tag-label">001 -- Introduction</p>

          {/* Headlines */}
          <h1 className="hero-h1">
            Technical enough to build.<br />
            Clear enough to{" "}
            <span ref={leadRef} className="hero-italic-accent hero-scramble">
              {FINAL_WORD}
            </span>
          </h1>

          {/* Subhead */}
          <p className="hero-subhead">
            I turn complexity into{" "}
            <span ref={cycleRef} className="hero-cycle">
              decisions.
            </span>
          </p>

          {/* CTA buttons */}
          <div className="hero-btns">
            <a href="#featured-projects" className="btn-dark">
              VIEW MY WORK
            </a>
            <a href="#contact" className="btn-light">
              LET'S TALK
            </a>
          </div>
        </div>

        {/* Right sidebar */}
        <aside className="hero-sidebar">
          {[
            {
              label: "DISCIPLINE",
              lines: ["Business Intelligence, Software Engineering, Data Science, Internet of Things (IoT)"],
            },
            {
              label: "CURRENTLY",
              lines: ["BSDS - Mapua University"],
            },
            {
              label: "BASED IN",
              lines: ["Manila, Philippines"],
            },
            {
              label: "STATUS",
              lines: ["Open to Work"],
              dot: true,
              dotColor: "green",
            },
          ].map(({ label, lines, dot, dotColor }) => (
            <div key={label} className="hero-sidebar-item">
              <p className="hero-sidebar-label">{label}</p>
              {lines.map((v, i) => (
                <p key={i} className="hero-sidebar-value">
                  {dot && i === 0 && (
                    <span
                      className="hero-status-dot"
                      style={{ background: dotColor === "green" ? "#5a7a52" : "var(--gold)" }}
                    />
                  )}
                  {v}
                </p>
              ))}
            </div>
          ))}
        </aside>
      </div>
    </section>
  );
}
