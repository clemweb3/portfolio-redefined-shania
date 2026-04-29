import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import Hero from "./components/Hero";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Imprints from "./components/Imprints";
import About from "./components/About";
import Contact from "./components/Contact";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Landing />
        <Hero />
        <Experience />
        <Projects />
        <Imprints />
        <About />
        <Contact />
      </main>
    </>
  );
}
