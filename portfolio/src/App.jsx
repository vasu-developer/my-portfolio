import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Highlights from "./components/Highlights";
import Exploring from "./components/Exploring";
import Skills from "./components/Skills";
import Services from "./components/Services";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Timeline from "./components/Timeline";
import Achievements from "./components/Achievements";
import Education from "./components/Education";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 antialiased flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <About />
        <Highlights />
        <Exploring />
        <Skills />
        <Services />
        <Experience />
        <Projects />
        <Timeline />
        <Achievements />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;