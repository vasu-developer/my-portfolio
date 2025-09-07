// src/components/About.jsx

import React, { useEffect, useRef, useState } from 'react';
import styles from './About.module.css';
import profileImage from '../assets/images/profile.jpg'; // Make sure you have this image

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const aboutRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // entries is an array of observed elements
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); // Stop observing after it's visible
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
      }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    // Cleanup observer on component unmount
    return () => {
      if (aboutRef.current) {
        observer.unobserve(aboutRef.current);
      }
    };
  }, []); // Empty dependency array ensures this runs only once

  return (
    <section id="about" ref={aboutRef} className={`${styles.about} ${isVisible ? 'fade-in visible' : 'fade-in'}`}>
      <h2 className={styles.sectionTitle}>About Me</h2>
      <div className={styles.aboutContent}>
        <div className={styles.imageContainer}>
          <img src={profileImage} alt="My Profile" className={styles.profileImage} />
        </div>
        <div className={styles.textContainer}>
          <p>
            Hello! I'm a passionate Full Stack Developer with a knack for creating dynamic and user-friendly web applications. My journey into the world of code began with a fascination for how ideas can be transformed into tangible, interactive experiences.
          </p>
          <p>
            I specialize in the MERN stack (MongoDB, Express.js, React, Node.js) but I'm always eager to learn new technologies. I thrive on solving complex problems and am committed to writing clean, efficient, and maintainable code.
          </p>
          <p>
            When I'm not coding, you can find me exploring the latest tech trends, contributing to open-source projects, or enjoying a good cup of coffee.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;