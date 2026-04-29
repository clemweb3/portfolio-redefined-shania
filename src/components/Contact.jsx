// Contact.jsx — themed to match the new dark/beige design system
const CONTACTS = [
  { label: "EMAIL", value: "shaniakeith23@gmail.com", href: "mailto:shaniakeith23@gmail.com" },
  { label: "PHONE", value: "+63 9064475715", href: "tel:+639064475715" },
  { label: "LINKEDIN", value: "shania-keith-dela-vega", href: "https://www.linkedin.com/in/shania-keith-dela-vega-/" },
  { label: "GITHUB", value: "clemweb3", href: "https://github.com/clemweb3" },
];

export default function Contact() {
  return (
    <section id="contact" className="contact-section">
      {/* Wave background (light version) */}
      <div className="contact-wave-bg" aria-hidden="true">
        <svg
          className="contact-wave-svg"
          viewBox="0 0 1440 600"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          {Array.from({ length: 16 }, (_, i) => {
            const offset = i * 36;
            return (
              <path
                key={i}
                d={`M ${-150 + offset * 2} 600 Q ${350 + offset} ${150 + i * 12} ${1100 + offset} ${-80 + i * 6}`}
                stroke="#c8c4be"
                strokeWidth="0.6"
                fill="none"
                opacity={0.3 + (i % 3) * 0.06}
              />
            );
          })}
        </svg>
      </div>

      <div className="contact-inner">
        <div className="contact-layout">
          {/* Left: CTA */}
          <div className="contact-cta">
            <p className="section-tag-label">005 -- Contact</p>

            <h2 className="contact-heading">
              Let's work<br />
              <span className="accent-gold">together.</span>
            </h2>

            <p className="contact-desc">
              Open to full-time roles, internships, and project collaborations
              in BI, data science, and business analysis.
            </p>

            <a href="mailto:shaniakeith23@gmail.com" className="btn-dark">
              GET IN TOUCH
            </a>
          </div>

          {/* Right: contact links */}
          <aside className="contact-links">
            {CONTACTS.map(({ label, value, href }) => (
              <div key={label} className="contact-item">
                <p className="contact-item-label">{label}</p>
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="contact-item-link"
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
            © 2025 Shania Keith Dela Vega. All Rights Reserved.
          </p>
          <p className="contact-footer-tagline">
            Obsessed with process. Driven by results.
          </p>
        </div>
      </div>
    </section>
  );
}
