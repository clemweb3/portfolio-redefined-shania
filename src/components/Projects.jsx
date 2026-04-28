import { useState } from "react";

const PROJECTS = [
  {
    id: "01",
    title: "Big Data Financial Vulnerability Index",
    subtitle: "Regional Financial Vulnerability in the Philippines",
    badge: "Undergraduate Thesis",
    tags: ["Python", "Labor Force Survey", "Statistical Modeling"],
    description:
      "Complete analytical pipeline for the Regional Financial Vulnerability Index (RFVI) from Philippine Statistics Authority Labor Force Survey microdata spanning 2018–2024 — 40 survey months, ~6 million household-level observations.",
    demo: "",
    github: "https://github.com/clemweb3/Undergraduate-Thesis-Repository",
    status: "Lead Researcher & Developer",
  },
  {
    id: "02",
    title: "Cyber Physical System",
    subtitle: "Proactive Forecasting Thermostat Nodes",
    badge: "In Progress",
    tags: ["Python", "IoT", "SARIMA", "Data Pipeline"],
    description:
      "Minimalist CPS that transforms reactive thermostats into proactive forecasting nodes. Uses a hybrid SARIMA-Heuristic model predicting residential thermal trends with sub-resolution accuracy (MAE < 0.1°C), bridging statistical stability and real-time thermal shock response.",
    demo: "",
    github: "https://github.com/clemweb3/limiting-factor-iot-forecast",
    status: "In Progress",
  },
  {
    id: "03",
    title: "Client Onboarding Failure Analysis",
    subtitle: "Exploratory Case Study",
    badge: "Business Analysis",
    tags: ["Synthetic Data", "Modeling", "Business Analysis"],
    description:
      "Early-stage B2B AI startups stall during client onboarding due to undefined ownership, sparse documentation, and late scope governance. This case study quantifies those failure patterns through generative simulation, producing segmentation analysis, inferential audit, and an interactive sensitivity tool.",
    demo: "",
    github: "https://github.com/clemweb3/client-onboarding-failure-analysis",
    status: "Coming Soon",
  },
  {
    id: "04",
    title: "XAI Layer — Explainable AI",
    subtitle: "Natural Language Prediction Interface",
    badge: "BI · AI",
    tags: ["Python", "scikit-learn", "NLP", "XAI"],
    description:
      "Enhanced user trust by implementing an XAI layer that translates high-dimensional AI predictions into natural language insights — making model decisions auditable, human-readable, and actionable.",
    demo: "",
    github: "https://github.com/clemweb3",
    status: "Coming Soon",
  },
];

export default function Projects() {
  const [hovered, setHovered] = useState(null);
  const [expanded, setExpanded] = useState(null);

  return (
    <section id="featured-projects" className="section">
      <div className="section-bg" aria-hidden="true" />
      <div className="section-rule-left" aria-hidden="true" />
      <div className="section-rule-right" aria-hidden="true" />

      <div className="section-inner">
        {/* Label */}
        <div className="section-tag">
          <span className="section-tag-line" />
          <span className="section-tag-text">002 / Selected Work</span>
        </div>

        <div className="proj-header">
          <h2 className="section-heading">
            Cases where data<br />
            <span className="accent">moved people.</span>
          </h2>
          <a
            href="https://github.com/clemweb3"
            target="_blank"
            rel="noopener noreferrer"
            className="proj-github-link"
          >
            View All on GitHub ↗
          </a>
        </div>

        <div className="proj-list">
          {PROJECTS.map((project) => (
            <div
              key={project.id}
              className={`proj-item${hovered === project.id ? " proj-item--hovered" : ""}${expanded === project.id ? " proj-item--expanded" : ""}`}
              onMouseEnter={() => setHovered(project.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => setExpanded(expanded === project.id ? null : project.id)}
            >
              <span className="proj-id">{project.id}</span>

              <div className="proj-body">
                <div className="proj-title-row">
                  <div className="proj-title-group">
                    <h3 className="proj-title">{project.title}</h3>
                    {project.subtitle && (
                      <span className="proj-subtitle">{project.subtitle}</span>
                    )}
                  </div>
                  <div className="proj-badges">
                    <span className="proj-badge">{project.badge}</span>
                    <span className="proj-status">{project.status}</span>
                  </div>
                </div>
                <p className="proj-desc">{project.description}</p>
                <div className="proj-tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="tag tag--accent">{tag}</span>
                  ))}
                </div>
              </div>

              <div className="proj-links">
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="proj-link"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Demo ↗
                  </a>
                )}
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="proj-link"
                  onClick={(e) => e.stopPropagation()}
                >
                  GitHub ↗
                </a>
              </div>
            </div>
          ))}
          <div className="proj-list-end" />
        </div>
      </div>
    </section>
  );
}