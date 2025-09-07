// src/components/Hero.jsx

import React, { useState, useEffect } from 'react';
import useTypingEffect from '../hooks/useTypingEffect'; // Import the custom hook
import styles from './Hero.module.css';

const Hero = () => {
  // Array of phrases to be typed
  const phrases = [" Full Stack Developer", " React Enthusiast", "n Open Source Contributor"];
  
  // State to keep track of the current phrase index
  const [phraseIndex, setPhraseIndex] = useState(0);
  
  // Use our custom hook to get the text to display
  // We'll also use a slightly faster speed for a better feel
  const typedText = useTypingEffect(phrases[phraseIndex], 150);

  // This effect handles switching to the next phrase after a pause
  useEffect(() => {
    // When the current phrase is fully typed out...
    if (typedText === phrases[phraseIndex]) {
      // ...wait for 2 seconds...
      const timeoutId = setTimeout(() => {
        // ...and then move to the next phrase (looping back to the start).
        setPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
      }, 2000); // 2000ms = 2 second pause

      return () => clearTimeout(timeoutId); // Cleanup timeout on component unmount
    }
  }, [typedText, phraseIndex, phrases]);

  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.heroContent}>
        <h1 className={styles.title}>
          Hi, I'm <span className={styles.name}>Vasudev Verma</span>
        </h1>
        <p className={styles.subtitle}>
          I'm a<span className={`${styles.typingText} ${styles.blinkingCursor}`}>{typedText}</span>
        </p>
        <p className={styles.description}>
          I build robust and scalable web applications from front-end to back-end,
          turning ideas into reality.
        </p>
        <a href="#contact" className={styles.ctaButton}>
          Get In Touch
        </a>
      </div>
      
      {/* A simple decorative element for visual flair */}
      <div className={styles.heroImage}>
        <div className={styles.blob}></div>
      </div>
    </section>
  );
};

export default Hero;