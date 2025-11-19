// src/components/About.jsx

import React, { useEffect, useRef, useState } from "react";
import styles from "./About.module.css";
import profileImage from "../assets/images/profile.jpg";

const About = () => {
  const [visible, setVisible] = useState(false);
  const aboutRef = useRef(null);

  /* ------------------ SCROLL TRIGGER ------------------ */
  useEffect(() => {
    const ob = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (aboutRef.current) ob.observe(aboutRef.current);

    return () => ob.disconnect();
  }, []);

  /* ------------------ NAVBAR CLICK TRIGGER ------------------ */
  useEffect(() => {
    const replay = () => {
      setVisible(false);

      // Allow DOM to reset before replaying animation
      setTimeout(() => setVisible(true), 50);
    };

    window.addEventListener("trigger-about-animation", replay);

    return () => {
      window.removeEventListener("trigger-about-animation", replay);
    };
  }, []);

  return (
    <section
      id="about"
      ref={aboutRef}
      className={`${styles.aboutSection} ${visible ? styles.visible : ""}`}
    >
      {/* Cosmic backdrop */}
      <div className={styles.nebulaGlow}></div>
      <div className={styles.particleFog}></div>

      <h2 className={styles.sectionTitle}>About Me</h2>

      <div className={styles.container}>
        {/* Image + cosmic elements */}
        <div className={styles.imageWrapper}>
          <div className={styles.darkMatterRipple}></div>

          <img
            src={profileImage}
            alt="Profile"
            className={styles.profileImage}
          />

          {/* Floating neutron star shard */}
          <div className={styles.neutronShard}></div>
        </div>

        {/* Text */}
        <div className={styles.textBlock}>
          <p>
            I'm a developer who blends logic with imagination — crafting digital
            experiences that feel both engineered and alive. My fascination with
            how the universe works drives the way I build software: structured,
            curious, and always evolving.
          </p>

          <p>
            I specialize in the MERN stack, but I’m endlessly drawn to the deeper
            layers of how things work — from scalable architectures to the hidden
            beauty of elegant code.
          </p>

          <p>
            Outside the lines of code, I find myself reading ancient epic tales,
            exploring the mysteries of the cosmos, and diving into the poetry of
            physics — where every equation feels like a story written by nature
            itself.
          </p>

          <p>
            These curiosities shape the way I build: with patience, precision,
            and a bit of cosmic wonder.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
