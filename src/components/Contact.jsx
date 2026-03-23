const CONTACTS = [
  { label: "Email", value: "shaniakeith23@gmail.com", href: "mailto:shaniakeith23@gmail.com" },
  { label: "Phone", value: "+63 9064475715", href: "tel:+639064475715" },
  { label: "LinkedIn", value: "shania-keith-dela-vega", href: "https://www.linkedin.com/in/shania-keith-dela-vega-/" },
  { label: "GitHub", value: "clemweb3", href: "https://github.com/clemweb3" },
];

export default function Contact() {
  return (
    <section id="contact" className="section section--dark">
      <div className="section-bg" aria-hidden="true" />
      <div className="section-rule-left" aria-hidden="true" />
      <div className="section-rule-right" aria-hidden="true" />

      <div className="section-inner">
        <div className="section-tag">
          <span className="section-tag-line" />
          <span className="section-tag-text">005 / Contact</span>
        </div>

        <div className="contact-layout">
          {/* Left: CTA */}
          <div className="contact-cta">
            <h2 className="section-heading section-heading--xl">
              Let's work<br />
              <span className="accent">together.</span>
            </h2>
            <p className="body-text contact-desc">
              Open to full-time roles, internships, and project collaborations
              in BI, data science, and business analysis.
            </p>
            <a href="mailto:shaniakeith23@gmail.com" className="btn-primary">
              Get In Touch
            </a>
          </div>

          {/* Right: contact links */}
          <aside className="contact-links">
            {CONTACTS.map(({ label, value, href }) => (
              <div key={label} className="contact-item">
                <p className="about-card-label">{label}</p>
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="contact-link"
                >
                  {value}
                </a>
              </div>
            ))}
          </aside>
        </div>

        {/* Footer */}
        <div className="contact-footer">
          <p className="contact-footer-copy">
            2025 Shania Keith Dela Vega. All Rights Reserved.
          </p>
          <p className="contact-footer-tagline">
            Obsessed with process. Driven by results.
          </p>
        </div>
      </div>
    </section>
  );
}
