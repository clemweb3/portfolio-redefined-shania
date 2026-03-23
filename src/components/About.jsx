import { useEffect, useRef } from "react";

const CHARS = "!@#$%&*?ABCDEFGHIJabcdefghij0123456789";
// Reduced to binary for maximum impact and less "noise"
const CYCLE_WORDS = ["precision.", "madness."];

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

const CREDENTIALS = ["IBFAP Scholar", "Consistent Dean's Lister"];
const COURSEWORK = [
  "Machine Learning", "Financial Analytics", "Statistical Modeling",
  "Business Analysis", "Business Intelligence", "Artificial Intelligence",
];

export default function About() {
  const cycleRef = useRef(null);
  const indexRef = useRef(0);

  useEffect(() => {
    const el = cycleRef.current;
    if (!el) return;

    // Consistency styling
    el.style.display = "inline-block";
    // Set to 10ch to accommodate the length of "precision." stably
    el.style.minWidth = "10ch"; 

    const interval = setInterval(async () => {
      indexRef.current = (indexRef.current + 1) % CYCLE_WORDS.length;
      const currentWord = CYCLE_WORDS[indexRef.current];
      
      // Trigger Signal Loss: applied only when madness is active
      if (currentWord === "madness.") {
        el.classList.add("signal-loss");
      } else {
        el.classList.remove("signal-loss");
      }

      // Slower scramble (1500ms) to feel more "calculated"
      await scrambleWord(el, currentWord, 1500);
      
    }, 6000); // 6 seconds: plenty of time for the user to read the full line

    return () => {
      clearInterval(interval);
      if (el._t) clearInterval(el._t);
    };
  }, []);

  return (
    <section id="about" className="section section--alt">
      <div className="section-bg" aria-hidden="true" />
      <div className="section-rule-left" aria-hidden="true" />
      <div className="section-rule-right" aria-hidden="true" />

      <div className="section-inner">
        <div className="section-tag">
          <span className="section-tag-line" />
          <span className="section-tag-text">004 / About</span>
        </div>

        <div className="about-layout">
          {/* Left: copy */}
          <div className="about-copy">
            <h2 className="section-heading">
              I engineer with focus,<br />
              iteration, and<br />
              <span className="accent">a bit of </span>
              <span 
                ref={cycleRef} 
                className="accent-cycle"
              >
                precision.
              </span>
            </h2>

            <div className="about-paras">
              <p className="body-text">
                I believe tools say something about the person who builds them.
                This site is a reflection of how I think. Technical but still human,
                structured but always adaptable.
              </p>
              <p className="body-text">
                Every project here was a small obsession. I enjoy breaking a problem
                apart, shaping it, and seeing it become something that gives value
                to someone else.
              </p>
              <p className="body-text">
                This space grows with me. As I learn, I update.
                Think of it as a living notebook.
              </p>
            </div>
          </div>

          {/* Right: sidebar info */}
          <aside className="about-sidebar">
            <div className="about-card">
              <p className="about-card-label">Education</p>
              <p className="about-card-title">BS Data Science</p>
              <p className="about-card-sub">Mapua University, Makati</p>
              <p className="about-card-accent">Graduating 2026</p>
            </div>

            <div className="about-card">
              <p className="about-card-label">Credentials</p>
              {CREDENTIALS.map((c) => (
                <div key={c} className="about-credential">
                  <span className="about-credential-star">*</span>
                  <span className="about-card-sub">{c}</span>
                </div>
              ))}
            </div>

            <div className="about-card">
              <p className="about-card-label">Coursework</p>
              <div className="about-tags">
                {COURSEWORK.map((c) => (
                  <span key={c} className="tag">{c}</span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}