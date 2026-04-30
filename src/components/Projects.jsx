import { useState, useEffect, useCallback, useRef } from "react";
import BezierBackground from "./BezierBackground";

// ─── PROJECT DATA ────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    id: "01",
    title: "CozySense: Hybrid Edge-AI for Proactive Climate Control",
    role: "Lead Researcher & Developer",
    tags: ["IoT", "Cyber-Physical Systems (CPS)", "Time-Series Forecasting", "SARIMA"],
    description:
      "A minimalist Cyber-Physical System (CPS) that transforms reactive thermostats into proactive forecasting nodes. Using a hybrid SARIMA-Heuristic model, the system predicts residential thermal trends with sub-resolution accuracy (MAE < 0.1°C), bridging the gap between statistical stability and real-time thermal shock response. Enhanced user trust by implementing an XAI layer that translates high-dimensional AI predictions into natural language insights.",
    image: "/src/assets/assets/proj-cps.jpg",
    github: "https://github.com/clemweb3/limiting-factor-iot-forecast",
    demo: "https://clemweb3.github.io/limiting-factor-iot-forecast/",
    demoType: "web",
    status: "PUBLISHED",
  },
  {
    id: "02",
    title: "Client Onboarding Failure Analysis: An Exploratory Case Study",
    role: "Lead Researcher & Developer",
    tags: ["Synthetic Data Modeling", "Business Analysis"],
    description:
      "Early-stage B2B AI startups stall during client onboarding due to undefined ownership, sparse documentation, and late scope governance — not technical failure. This case study quantifies those failure patterns through a generative simulation, producing a segmentation analysis, inferential audit, and interactive sensitivity tool that projects how targeted interventions reduce executive overhead and improve activation speed.",
    image: "/src/assets/assets/proj-onboarding.jpg",
    github: "https://github.com/clemweb3/client-onboarding-failure-analysis",
    demo: "https://clemweb3.github.io/client-onboarding-failure-analysis/",
    demoType: "web",
    status: "PUBLISHED",
  },
  {
    id: "03",
    title: "Regional Financial Vulnerability in the Philippines",
    role: "Lead Researcher & Developer",
    tags: ["Big Data", "Financial Vulnerability Index", "Labor Force Survey"],
    description:
      "This project contains the complete analytical pipeline for constructing the Regional Financial Vulnerability Index (RFVI) from Philippine Statistics Authority (PSA) Labor Force Survey (LFS) microdata spanning 2018–2024 (40 survey months, ~6 million household-level observations).",
    image: "/src/assets/assets/proj-thesis.jpg",
    github: "https://github.com/clemweb3/Undergraduate-Thesis-Repository",
    demo: "https://public.tableau.com/app/profile/juan.paolo.aguilar8664/viz/FinancialVulnerabilityinthePhilippines/Dashboard1",
    demoType: "tableau",
    status: "PUBLISHED",
  },
  {
    id: "04",
    title: "BI Dashboard Suite",
    role: "Lead Developer",
    tags: ["Power BI", "Tableau", "SQL", "Synthetic Data Modeling", "Business Analysis"],
    description:
      "Operational and strategic dashboards built for data-driven decision making. Bridging the gap between raw data and business clarity — featuring E-Commerce Sales & Returns Insights and other domain-specific dashboards.",
    image: "/src/assets/assets/proj-bi.jpg",
    github: "https://github.com/clemweb3/E-commerce-Data-Insights-Dashboard",
    demo: "https://public.tableau.com/app/profile/shania.keith.dela.vega/viz/ECOMMERCE_PROJ/dashboard2",
    demoType: "tableau",
    status: "PUBLISHED",
  },
];

// ─── TABLEAU EMBED URL CONVERTER ─────────────────────────────────────────────
function toTableauEmbedUrl(url) {
  try {
    const match = url.match(/\/viz\/([^/]+)\/([^?]+)/);
    if (match) {
      const vizName = match[1];
      const sheet = match[2];
      return `https://public.tableau.com/views/${vizName}/${sheet}?:embed=y&:showVizHome=no&:toolbar=yes&:animate_transition=yes`;
    }
  } catch (_) {}
  return url;
}

// ─── DEMO MODAL ───────────────────────────────────────────────────────────────
function DemoModal({ project, onClose }) {
  const [loaded, setLoaded] = useState(false);
  const [blocked, setBlocked] = useState(false);

  const handleKey = useCallback(
    (e) => { if (e.key === "Escape") onClose(); },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [handleKey]);

  const embedUrl =
    project.demoType === "tableau"
      ? toTableauEmbedUrl(project.demo)
      : project.demo;

  const handleLoad = () => setLoaded(true);
  const handleError = () => { setLoaded(true); setBlocked(true); };

  return (
    <div
      className="demo-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} demo`}
    >
      <div className="demo-modal" onClick={(e) => e.stopPropagation()}>
        <div className="demo-modal-header">
          <div className="demo-modal-header-left">
            <span className="demo-modal-dot" />
            <div>
              <p className="demo-modal-title">{project.title}</p>
              <p className="demo-modal-meta">
                {project.demoType === "tableau" ? "Tableau Public" : "Live App"} · Interactive Demo
              </p>
            </div>
          </div>
          <div className="demo-modal-actions">
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="demo-open-btn"
              title="Open in new tab"
            >
              Open ↗
            </a>
            <button
              className="demo-close-btn"
              onClick={onClose}
              aria-label="Close demo"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="demo-iframe-wrap">
          {!loaded && (
            <div className="demo-loading">
              <div className="demo-spinner" />
              <p className="demo-loading-text">
                Loading {project.demoType === "tableau" ? "dashboard" : "app"}…
              </p>
            </div>
          )}

          {blocked ? (
            <div className="demo-blocked">
              <p className="demo-blocked-title">Embed restricted by host</p>
              <p className="demo-blocked-desc">
                This demo can't be embedded due to the host's security policy.
              </p>
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="demo-blocked-link"
              >
                Open in new tab ↗
              </a>
            </div>
          ) : (
            <iframe
              key={embedUrl}
              src={embedUrl}
              title={project.title}
              className="demo-iframe"
              style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.3s ease" }}
              onLoad={handleLoad}
              onError={handleError}
              allow="fullscreen"
              loading="lazy"
            />
          )}
        </div>
      </div>
    </div>
  );
}

// ─── PROJECTS SECTION ─────────────────────────────────────────────────────────
export default function Projects() {
  const [activeDemo, setActiveDemo] = useState(null);

  return (
    <section id="featured-projects" className="proj-section">
      {/* ── Bezier animated canvas background ── */}
      <BezierBackground />

      {/* Diagonal line background (existing — kept intact) */}
      <div className="proj-lines-bg" aria-hidden="true">
        <svg
          className="proj-lines-svg"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          {[
            "M 200 0 L 800 900", "M 400 0 L 1200 900", "M 600 0 L 100 900",
            "M 900 0 L 300 900", "M 1100 0 L 500 900", "M 1300 0 L 700 900",
            "M 0 200 L 1440 600", "M 0 400 L 1440 200", "M 0 600 L 1440 400",
            "M 0 100 L 900 900", "M 500 0 L 1440 700",
          ].map((d, i) => (
            <path key={i} d={d} stroke="#c0bdb8" strokeWidth="0.5" fill="none" opacity="0.4" />
          ))}
          {[[200, 300], [600, 150], [900, 400], [1100, 600], [350, 700], [800, 250]].map(([cx, cy], i) => (
            <circle key={`dot-${i}`} cx={cx} cy={cy} r="3" fill="#b0ada8" opacity="0.5" />
          ))}
        </svg>
      </div>

      <div className="proj-inner">
        <p className="section-tag-label">003 -- Selected Work</p>

        <div className="proj-header-row">
          <h2 className="proj-heading">
            Cases where data <span className="accent-gold">moved people.</span>
          </h2>
          <a
            href="https://github.com/clemweb3"
            target="_blank"
            rel="noopener noreferrer"
            className="proj-github-btn"
          >
            VIEW ALL ON GITHUB ↗
          </a>
        </div>

        <div className="proj-grid">
          {PROJECTS.map((project) => (
            <article key={project.id} className="proj-card">
              <div className="proj-card-header">
                <div className="proj-card-dot-title">
                  <span className="proj-card-dot" />
                  <div>
                    <h3 className="proj-card-title">{project.title}</h3>
                    <p className="proj-card-role">{project.role}</p>
                  </div>
                </div>
              </div>

              <div className="proj-card-body">
                <div className="proj-screenshot-wrap">
                  <img
                    src={project.image}
                    alt={`${project.title} screenshot`}
                    className="proj-screenshot"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      e.currentTarget.nextElementSibling.style.display = "flex";
                    }}
                  />
                  <div className="proj-screenshot-placeholder" style={{ display: "none" }}>
                    <span>[ Screenshot coming soon ]</span>
                  </div>

                  {project.demo && (
                    <button
                      className="proj-preview-overlay"
                      onClick={() => setActiveDemo(project)}
                      aria-label={`Open ${project.title} interactive demo`}
                    >
                      <span className="proj-preview-icon">▶</span>
                      <span className="proj-preview-label">View Interactive Demo</span>
                    </button>
                  )}
                </div>

                <div className="proj-card-desc-col">
                  <p className="proj-card-desc">{project.description}</p>
                  <div className="proj-card-tags">
                    {project.tags.map((tag, i) => (
                      <span key={tag} className="proj-tag">
                        {tag}
                        {i < project.tags.length - 1 && <span className="proj-tag-dot">•</span>}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="proj-card-footer">
                <span
                  className={`proj-status-badge proj-status-badge--${
                    project.status === "PUBLISHED" ? "active" : "soon"
                  }`}
                >
                  {project.status}
                </span>
                <div className="proj-card-links">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="proj-link"
                  >
                    GitHub ↗
                  </a>
                  {project.demo && (
                    <button
                      className="proj-link proj-link--btn"
                      onClick={() => setActiveDemo(project)}
                    >
                      Demo ↗
                    </button>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {activeDemo && (
        <DemoModal project={activeDemo} onClose={() => setActiveDemo(null)} />
      )}
    </section>
  );
}
