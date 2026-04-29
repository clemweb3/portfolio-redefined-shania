// About.jsx — "004 -- About the Author" section
// Light bg, wave/line pattern, editorial dictionary-style layout
import { useEffect, useRef } from "react";

const CHARS = "!@#$%&*?ABCDEFGHIJabcdefghij0123456789";
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

export default function About() {
  const cycleRef = useRef(null);
  const indexRef = useRef(0);

  useEffect(() => {
    const el = cycleRef.current;
    if (!el) return;
    el.style.display = "inline-block";
    el.style.minWidth = "10ch";

    const interval = setInterval(async () => {
      indexRef.current = (indexRef.current + 1) % CYCLE_WORDS.length;
      const currentWord = CYCLE_WORDS[indexRef.current];
      if (currentWord === "madness.") {
        el.classList.add("signal-loss");
      } else {
        el.classList.remove("signal-loss");
      }
      await scrambleWord(el, currentWord, 1500);
    }, 6000);

    return () => {
      clearInterval(interval);
      if (el._t) clearInterval(el._t);
    };
  }, []);

  return (
    <section id="about" className="about-section">
      {/* Diagonal geometric line background */}
      <div className="about-lines-bg" aria-hidden="true">
        <svg
          className="about-lines-svg"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          {[
            "M 700 0 L 1440 500", "M 900 0 L 1440 300", "M 1100 0 L 1440 600",
            "M 1200 0 L 800 900", "M 1440 100 L 900 900", "M 1440 300 L 1100 900",
            "M 600 0 L 1440 800", "M 1440 200 L 700 900", "M 800 0 L 1440 700",
          ].map((d, i) => (
            <path key={i} d={d} stroke="#c0bdb8" strokeWidth="0.5" fill="none" opacity="0.4" />
          ))}
          {[[900, 200], [1100, 400], [1200, 650], [1350, 300], [800, 500]].map(([cx, cy], i) => (
            <circle key={`dot-${i}`} cx={cx} cy={cy} r="3.5" fill="#b0ada8" opacity="0.5" />
          ))}
        </svg>
      </div>

      <div className="about-inner">
        {/* Section tag */}
        <p className="section-tag-label">004 -- About the Author</p>

        {/* Main heading with cycling word */}
        <h2 className="about-heading">
          I engineer with focus, iteration, and a bit of{" "}
          <span ref={cycleRef} className="accent-gold accent-cycle">
            precision.
          </span>
        </h2>

        {/* Dictionary-style definition block */}
        <div className="about-definition">
          {/* Term */}
          <div className="about-def-term">
            <span className="about-def-bullet">•</span>
            <div>
              <p className="about-def-word">Enixia \enik-sha\</p>
              <p className="about-def-sub">proper noun · living document · still in progress</p>
            </div>
          </div>

          {/* Origin blockquote */}
          <blockquote className="about-blockquote">
            Origin: from Enix — taken from <em>Square Enix,</em> the studio behind Life is Strange, a game that taught her that decisions have weight and that weight compounds. And from -ia, shortened from Nia — something closer, quieter, more hers. The two halves make something that belongs to no category. That actually felt right.
          </blockquote>

          {/* Numbered paragraphs */}
          <div className="about-paragraphs">
            <div className="about-para-item">
              <span className="about-para-marker">|</span>
              <div>
                <p className="about-para-text">
                  A place built to hold thinking that would otherwise disappear. Not a highlight reel. More like a record of what she was working through — the obsessions, the half-finished questions, the things that mattered enough to write down.
                </p>
                <blockquote className="about-inline-quote">
                  This site is not finished. <em>It is not supposed to be.</em>
                </blockquote>
              </div>
            </div>

            <div className="about-para-item">
              <span className="about-para-marker">2</span>
              <p className="about-para-text">
                A name claimed before any title existed to justify it. Not a startup. Not a brand - <em>yet.</em> Just the answer to the question she kept asking herself: <em>where do I put all of this?</em> The site has gone through many versions. So has she.
              </p>
            </div>

            <div className="about-para-item">
              <span className="about-para-marker">3</span>
              <div>
                <p className="about-para-text">
                  Someone still building — into a role, into a shape of life she has not been handed and does not expect to be. People-centered in how she thinks. Precise in how she works. Intense in ways she is still figuring out.
                </p>
                <blockquote className="about-inline-quote">
                  There is no life that was meant for her. There is only the one she is building into.
                </blockquote>
              </div>
            </div>
          </div>
        </div>

        {/* Credentials sidebar note */}
        <div className="about-footnote">
          <p className="about-footnote-text">
            Note: This is version n. There have been others. There will be more. Think of it less as a portfolio and more as a living notebook — updated when something is worth saying, left alone when it isn't.
          </p>
        </div>
      </div>
    </section>
  );
}
