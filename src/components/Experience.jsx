import { useEffect, useRef, useState } from "react";

const STATS = [
  { value: 100, suffix: "%", prefix: "", label: "client approval rate" },
  { value: 100, suffix: "", prefix: "~", label: "artifacts documented" },
  { value: 3, suffix: "", prefix: "", label: "AI deployments led" },
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

const STACK = [
  "Python", "SQL", "Power BI", "Tableau", "Databricks",
  "Azure DevOps", "Agile", "Scrum", "Process Mapping",
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

function StatCard({ value, prefix, suffix, label, triggered }) {
  const count = useCountUp(value, triggered);
  return (
    <div className="exp-stat">
      <span className="exp-stat-value">
        {prefix}{count}{suffix}
      </span>
      <span className="exp-stat-label">{label}</span>
    </div>
  );
}

export default function Experience() {
  const ref = useRef(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTriggered(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} id="experience" className="section section--alt">
      <div className="section-bg" aria-hidden="true" />
      <div className="section-rule-left" aria-hidden="true" />
      <div className="section-rule-right" aria-hidden="true" />

      <div className="section-inner">
        {/* Label */}
        <div className="section-tag">
          <span className="section-tag-line" />
          <span className="section-tag-text">003 / Experience</span>
        </div>

        <div className="exp-layout">
          {/* Left: job entries */}
          <div className="exp-main">
            <h2 className="section-heading">
              Where I've<br />
              <span className="accent">shipped work.</span>
            </h2>

            {/* SOFI */}
          <div className="exp-entry">
            <div className="exp-entry-header">
              <div>
                <h3 className="exp-role">Business Analyst · SOFI AI Tech Solution Inc.</h3>
                <div className="exp-location">Quezon City, Philippines</div>
              </div>
              <span className="exp-date">May 2025 – Aug 2025</span>
            </div>
            <ul className="exp-bullets">
              {BULLETS_SOFI.map((item, i) => (
                <li key={i} className="exp-bullet">
                  <span className="exp-bullet-dash">–</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Navitaire */}
          <div className="exp-entry">
            <div className="exp-entry-header">
              <div>
                <h3 className="exp-role">Junior Technical Writer · Navitaire, an Amadeus Company</h3>
                <div className="exp-location">Taguig City, Philippines</div>
              </div>
              <span className="exp-date">Jun 2024 – Mar 2025</span>
            </div>
            <ul className="exp-bullets">
              {BULLETS_NAVITAIRE.map((item, i) => (
                <li key={i} className="exp-bullet">
                  <span className="exp-bullet-dash">–</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

            {/* Stack */}
            <div className="exp-stack">
              <p className="exp-stack-label">Stack</p>
              <div className="exp-tags">
                {STACK.map((skill) => (
                  <span key={skill} className="tag">{skill}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: stats */}
          <aside className="exp-stats">
            <p className="exp-stats-label">By the Numbers</p>
            {STATS.map((s) => (
              <StatCard key={s.label} {...s} triggered={triggered} />
            ))}
          </aside>
        </div>
      </div>
    </section>
  );
}
