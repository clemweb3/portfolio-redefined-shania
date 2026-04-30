// Landing.jsx — Full-bleed splash screen (Page 1 of design)
// The hero image should be placed at: src/assets/hero-eclipse.jpg
// (the eclipse/solar corona image from the design PDF)

import hero from '../assets/assets/hero-eclipse.jpg'

export default function Landing() {
  return (
    <section id="home" className="landing">
      <div className="landing-img-wrap">
        <img src={hero} alt="Hero Eclipse" className="landing-img" fetchPriority="high" decoding="async" />
        <div className="landing-overlay" aria-hidden="true" />
      </div>

      {/* ENIXIA wordmark */}
      <div className="landing-wordmark" aria-label="ENIXIA">
        <span className="landing-title">ENIXIA</span>
        <p className="landing-tagline">Build. Adapt. Articulate.</p>
      </div>
    </section>
  );
}
