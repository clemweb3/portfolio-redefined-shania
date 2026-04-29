// Projects.jsx — light beige bg, diagonal line pattern, project cards with screenshots
// Project screenshot images go in src/assets/assets/
// Naming convention (set by you): proj-cps.jpg, proj-bi.jpg, proj-ml.jpg, proj-thesis.jpg, proj-onboarding.jpg

const PROJECTS = [
  {
    id: "01",
    title: "CozySense: Hybrid Edge-AI for Proactive Climate Control",
    role: "Lead Researcher & Developer",
    tags: ["IoT", "Cyber-Physical Systems (CPS)", "Time-Series Forecasting", "SARIMA"],
    description:
      "A minimalist Cyber-Physical System (CPS) that transforms reactive thermostats into proactive forecasting nodes. Using a hybrid SARIMA-Heuristic model, the system predicts residential thermal trends with sub-resolution accuracy (MAE < 0.1°C), bridging the gap between statistical stability and real-time thermal shock response. Enhanced user trust by implementing an XAI layer that translates high-dimensional AI predictions into natural language insights.",
    image: "/src/assets/assets/proj-cps.jpg", // placeholder — replace with your file
    github: "https://github.com/clemweb3",
    demo: "",
    status: "In Progress",
  },
  {
    id: "02",
    title: "Client Onboarding Failure Analysis: An Exploratory Case Study",
    role: "Lead Researcher & Developer",
    tags: ["Synthetic Data Modeling", "Business Analysis"],
    description:
      "Early-stage B2B AI startups stall during client onboarding due to undefined ownership, sparse documentation, and late scope governance — not technical failure. This case study quantifies those failure patterns through a generative simulation, producing a segmentation analysis, inferential audit, and interactive sensitivity tool that projects how targeted interventions reduce executive overhead and improve activation speed.",
    image: "/src/assets/assets/proj-onboarding.jpg", // placeholder
    github: "https://github.com/clemweb3",
    demo: "",
    status: "Coming Soon",
  },
  {
    id: "03",
    title: "Regional Financial Vulnerability in the Philippines",
    role: "Lead Researcher & Developer",
    tags: ["Big Data", "Financial Vulnerability Index", "Labor Force Survey"],
    description:
      "This project contains the complete analytical pipeline for constructing the Regional Financial Vulnerability Index (RFVI) from Philippine Statistics Authority (PSA) Labor Force Survey (LFS) microdata spanning 2018–2024 (40 survey months, ~6 million household-level observations).",
    image: "/src/assets/assets/proj-thesis.jpg", // placeholder
    github: "https://github.com/clemweb3",
    demo: "",
    status: "Undergraduate Thesis",
  },
  {
    id: "04",
    title: "BI Dashboard Suite",
    role: "Lead Developer",
    tags: ["Power BI", "Tableau", "SQL", "Synthetic Data Modeling", "Business Analysis"],
    description:
      "Operational and strategic dashboards built for data-driven decision making. Bridging the gap between raw data and business clarity — featuring E-Commerce Sales & Returns Insights and other domain-specific dashboards.",
    image: "/src/assets/assets/proj-bi.jpg", // placeholder
    github: "https://github.com/clemweb3",
    demo: "",
    status: "Coming Soon",
  },
];

export default function Projects() {
  return (
    <section id="featured-projects" className="proj-section">
      {/* Diagonal line background — mimics the geometric intersection pattern */}
      <div className="proj-lines-bg" aria-hidden="true">
        <svg
          className="proj-lines-svg"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Scattered intersection lines like the design */}
          {[
            "M 200 0 L 800 900", "M 400 0 L 1200 900", "M 600 0 L 100 900",
            "M 900 0 L 300 900", "M 1100 0 L 500 900", "M 1300 0 L 700 900",
            "M 0 200 L 1440 600", "M 0 400 L 1440 200", "M 0 600 L 1440 400",
            "M 0 100 L 900 900", "M 500 0 L 1440 700",
          ].map((d, i) => (
            <path key={i} d={d} stroke="#c0bdb8" strokeWidth="0.5" fill="none" opacity="0.4" />
          ))}
          {/* Dot nodes at intersections */}
          {[[200, 300], [600, 150], [900, 400], [1100, 600], [350, 700], [800, 250]].map(([cx, cy], i) => (
            <circle key={`dot-${i}`} cx={cx} cy={cy} r="3" fill="#b0ada8" opacity="0.5" />
          ))}
        </svg>
      </div>

      <div className="proj-inner">
        {/* Section tag */}
        <p className="section-tag-label">003 -- Selected Work</p>

        {/* Header row */}
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

        {/* Project cards — 2-column grid */}
        <div className="proj-grid">
          {PROJECTS.map((project) => (
            <article key={project.id} className="proj-card">
              {/* Card header with title */}
              <div className="proj-card-header">
                <div className="proj-card-dot-title">
                  <span className="proj-card-dot" />
                  <div>
                    <h3 className="proj-card-title">{project.title}</h3>
                    <p className="proj-card-role">{project.role}</p>
                  </div>
                </div>
              </div>

              {/* Screenshot + description two-col */}
              <div className="proj-card-body">
                {/* Screenshot placeholder */}
                <div className="proj-screenshot-wrap">
                  <img
                    src={project.image}
                    alt={`${project.title} screenshot`}
                    className="proj-screenshot"
                    onError={(e) => {
                      // Fallback placeholder if image missing
                      e.currentTarget.style.display = "none";
                      e.currentTarget.nextElementSibling.style.display = "flex";
                    }}
                  />
                  <div className="proj-screenshot-placeholder" style={{ display: "none" }}>
                    <span>[ Screenshot coming soon ]</span>
                  </div>
                  {/* Expand icon */}
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" className="proj-expand-btn" aria-label="View demo">
                      ↗
                    </a>
                  )}
                </div>

                {/* Description */}
                <div className="proj-card-desc-col">
                  <p className="proj-card-desc">{project.description}</p>

                  {/* Tags */}
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

              {/* Footer links */}
              <div className="proj-card-footer">
                <span className={`proj-status-badge proj-status-badge--${project.status === "In Progress" ? "active" : "soon"}`}>
                  {project.status}
                </span>
                <div className="proj-card-links">
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="proj-link">
                    GitHub ↗
                  </a>
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" className="proj-link">
                      Demo ↗
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
