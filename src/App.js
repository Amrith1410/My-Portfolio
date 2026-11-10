import React from "react";
import Preloader from "./components/Preloader";
import TraceBackground from "./components/TraceBackground";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Work from "./components/Work";
import Projects from "./components/Projects";
import Toolbox from "./components/Toolbox";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import PetWalker from "./components/PetWalker";
import { useRevealOnScroll } from "./hooks";
import "./App.css";

function App() {
  useRevealOnScroll();

  return (
    <>
      <Preloader />
      <TraceBackground />
      <div className="vignette" aria-hidden="true" />
      <a className="skip" href="#about">Skip to content</a>
      <Nav />
      <main>
        <Hero />
        <About />
        <Work />
        <Projects />
        <Toolbox />
        <Contact />
      </main>
      <Footer />
      <PetWalker />
    </>
  );
}

export default App;
