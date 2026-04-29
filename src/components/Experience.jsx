// Experience.jsx — dark background, wave lines, two-column with stats
import { useEffect, useRef, useState } from "react";

const STATS = [
  { value: 100, suffix: "%", prefix: "", label: "CLIENT APPROVAL RATE" },
  { value: 100, suffix: "", prefix: "~", label: "ARTIFACTS DOCUMENTED" },
  { value: 3, suffix: "", prefix: "", label: "AI DEPLOYMENTS LED" },
];

const BULLETS_SOFI = [
  "Led 2-3 enterprise AI deployments end-to-end — 100% client approval rate",
  "Reduced revision loops 30-40% via workflow documentation and automation",
  "Built Google Apps Script cutting manual asset update time by 70%",
  "Commended by co-founder for independently leading client meetings",
];

const BULLETS_NAVITAIRE = [
  "Standardized ~100 technical artifacts across 7 projects",
  "Built the department's first centralized documentation library",
  "Reduced documentation gaps ~30% and improved retrieval time ~40%",
  "Recognized for translating user stories into actionable documentation",
];

function useCountUp(target, triggered) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!triggered) return;
    let start = 0;
    const increment = target / (1400 / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [triggered, target]);
  return count;
}

function StatBlock({ value, prefix, suffix, label, triggered }) {
  const count = useCountUp(value, triggered);
  return (
    <div className="exp-stat-block">
      <div className="exp-stat-number">
        {prefix}{count}{suffix}
      </div>
      <div className="exp-stat-label">{label}</div>
    </div>
  );
}

export default function Experience() {
  const ref = useRef(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTriggered(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} id="experience" className="exp-section">
      {/* Wave line background (dark version) */}
      <div className="exp-wave-bg" aria-hidden="true">
        <svg
          className="exp-wave-svg"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          {Array.from({ length: 18 }, (_, i) => {
            const offset = i * 32;
            return (
              <path
                key={i}
                d={`M ${-100 + offset * 1.5} 900 Q ${500 + offset * 0.8} ${300 + i * 15} ${1300 + offset * 0.5} ${-50 + i * 8}`}
                stroke="#2a2a2a"
                strokeWidth="0.8"
                fill="none"
              />
            );
          })}
        </svg>
      </div>

      <div className="exp-inner">
        {/* Section tag */}
        <p className="section-tag-label section-tag-label--light">002 -- Experience</p>

        <div className="exp-layout">
          {/* Left: job entries */}
          <div className="exp-main">
            <h2 className="exp-heading">
              Where I've <span className="accent-gold">shipped work.</span>
            </h2>

            {/* SOFI */}
            <div className="exp-entry">
              <div className="exp-entry-header">
                <div className="exp-entry-left">
                  <span className="exp-entry-dot" />
                  <div>
                    <h3 className="exp-role">
                      Business Analyst · SOFI AI Tech Solution Inc.
                    </h3>
                    <p className="exp-location">Quezon City, Philippines</p>
                  </div>
                </div>
                <span className="exp-date">May 2025 – Aug 2025</span>
              </div>
              <ul className="exp-bullets">
                {BULLETS_SOFI.map((item, i) => (
                  <li key={i} className="exp-bullet">–{item}</li>
                ))}
              </ul>
            </div>

            {/* Navitaire */}
            <div className="exp-entry">
              <div className="exp-entry-header">
                <div className="exp-entry-left">
                  <span className="exp-entry-dot" />
                  <div>
                    <h3 className="exp-role">
                      Junior Technical Writer · Navitaire, an Amadeus Company
                    </h3>
                    <p className="exp-location">Taguig City, Philippines</p>
                  </div>
                </div>
                <span className="exp-date">Jun 2024 – Mar 2025</span>
              </div>
              <ul className="exp-bullets">
                {BULLETS_NAVITAIRE.map((item, i) => (
                  <li key={i} className="exp-bullet">–{item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: stats */}
          <aside className="exp-stats-col">
            <p className="exp-stats-heading">BY THE NUMBERS</p>
            {STATS.map((s) => (
              <StatBlock key={s.label} {...s} triggered={triggered} />
            ))}
          </aside>
        </div>
      </div>
    </section>
  );
}
