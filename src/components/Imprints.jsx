// Imprints.jsx — "You don't deserve a certain life. You build into it."
// Dark full-bleed section with movie poster grid and Le Jour Serif headline
// Movie poster images go in: src/assets/assets/
// Naming: movie-goodwillhunting.jpg, movie-fantasticmrfox.jpg, movie-lifeisstrange.jpg, movie-interstellar.jpg

import imprintsBackground from "../assets/assets/imprints.jpg";
import movieGoodWillHunting from "../assets/assets/movie-goodwillhunting.jpg";
import movieFantasticMrFox from "../assets/assets/movie-fantasticmrfox.jpg";
import movieLifeIsStrange from "../assets/assets/movie-lifeisstrange.jpg";
import movieInterstellar from "../assets/assets/movie-interstellar.jpg";

const MOVIES = [
  {
    title: "GOOD WILL HUNTING",
    year: "1997",
    quote: "A reminder that being the smartest person in the room means nothing if you're afraid to actually show up.",
    image: movieGoodWillHunting,
  },
  {
    title: "FANTASTIC MR FOX",
    year: "2009",
    quote: "Proof that being 'different' isn't a flaw to manage — it's the whole strategy.",
    image: movieFantasticMrFox,
  },
  {
    title: "LIFE IS STRANGE",
    year: "2015",
    quote: "Every decision you almost skipped over ends up mattering most — this game made me remember that.",
    image: movieLifeIsStrange,
  },
  {
    title: "INTERSTELLAR",
    year: "2014",
    quote: "For when you need a reminder that the problems worth solving are the ones that feel impossible.",
    image: movieInterstellar,
  },
];

export default function Imprints() {
  return (
    <section id="imprints" className="imprints-section">
      <div className="imprints-background" aria-hidden="true">
        <img src={imprintsBackground} alt="" className="imprints-background-img" />
        <div className="imprints-background-overlay" />
      </div>

      {/* Large Le Jour Serif headline */}
      <div className="imprints-headline-wrap">
        <h2 className="imprints-headline">
          YOU DON'T DESERVE A CERTAIN LIFE.
        </h2>
        <h2 className="imprints-headline">
          YOU BUILD INTO IT.
        </h2>
      </div>

      {/* Movie poster grid */}
      <div className="imprints-grid">
        {MOVIES.map((movie) => (
          <div key={movie.title} className="imprints-poster">
            {/* Poster image */}
            <div className="imprints-poster-img-wrap">
              <img
                src={movie.image}
                alt={movie.title}
                className="imprints-poster-img"
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  e.currentTarget.nextElementSibling.style.display = "flex";
                }}
              />
              <div className="imprints-poster-placeholder" style={{ display: "none" }}>
                <span>{movie.title}</span>
              </div>
            </div>

            {/* Poster metadata */}
            <div className="imprints-poster-meta">
              <p className="imprints-poster-title">
                <strong>{movie.title}</strong>
                <span className="imprints-poster-year">{movie.year}</span>
              </p>
              <p className="imprints-poster-quote">{movie.quote}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer label */}
      <div className="imprints-footer">
        <p className="imprints-footer-title">ENIXIA'S IMPRINTS.</p>
        <p className="imprints-footer-note">
          All movie stills and posters are property of their respective studios and are used here for inspirational/educational purposes.
        </p>
      </div>
    </section>
  );
}
