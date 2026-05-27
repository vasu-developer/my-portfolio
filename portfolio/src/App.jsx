// src/App.jsx

import React from 'react';

// Import our global styles
import './assets/styles/main.css';

// Import the components for each section
// Note: These files don't exist yet. We will create them one by one.
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <main>
        <Services />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

export default App;