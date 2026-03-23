import { useState } from "react";

const PROJECTS = [
  {
    id: "01",
    title: "Cyber Physical System",
    tags: ["Python", "IoT", "Data Pipeline"],
    description:
      "End-to-end IoT data pipeline connecting physical sensors to a real-time analytics layer. Final screenshots and case study incoming.",
    demo: "",
    github: "https://github.com/clemweb3",
    status: "In Progress",
  },
  {
    id: "02",
    title: "BI Dashboard Suite",
    tags: ["Power BI", "Tableau", "SQL"],
    description:
      "Operational and strategic dashboards built for data-driven decision making. Bridging the gap between raw data and business clarity.",
    demo: "",
    github: "https://github.com/clemweb3",
    status: "Coming Soon",
  },
  {
    id: "03",
    title: "Predictive Modeling",
    tags: ["Python", "scikit-learn", "Pandas"],
    description:
      "ML models trained to surface patterns and deliver quantitative insights that actually move people to act.",
    demo: "",
    github: "https://github.com/clemweb3",
    status: "Coming Soon",
  },
];

export default function Projects() {
  const [hovered, setHovered] = useState(null);

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
              className={`proj-item${hovered === project.id ? " proj-item--hovered" : ""}`}
              onMouseEnter={() => setHovered(project.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <span className="proj-id">{project.id}</span>

              <div className="proj-body">
                <div className="proj-title-row">
                  <h3 className="proj-title">{project.title}</h3>
                  <span className="proj-status">{project.status}</span>
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
                  >
                    Demo ↗
                  </a>
                )}
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="proj-link"
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
