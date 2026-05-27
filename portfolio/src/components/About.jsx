// src/components/About.jsx
import React, { useEffect, useRef, useState } from "react";
import styles from "./About.module.css";
import profileImage from "../assets/images/profile.jpg";

const About = () => {
  const [visible, setVisible] = useState(false);
  const aboutRef = useRef(null);

  /* Scroll Trigger Reveal */
  useEffect(() => {
    const ob = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (aboutRef.current) ob.observe(aboutRef.current);
    return () => ob.disconnect();
  }, []);

  /* Listen to Navbar Trigger Events */
  useEffect(() => {
    const replay = () => {
      setVisible(false);
      setTimeout(() => setVisible(true), 50);
    };

    window.addEventListener("trigger-about-animation", replay);
    return () => window.removeEventListener("trigger-about-animation", replay);
  }, []);

  const stats = [
    { value: "6+", label: "Projects Delivered" },
    { value: "B.Tech", label: "Computer Science & Eng." },
    { value: "MERN Stack", label: "Core Development" },
    { value: "HTML/CSS/JS", label: "Custom UI Designing" }
  ];

  return (
    <section
      id="about"
      ref={aboutRef}
      className={`${styles.aboutSection} ${visible ? styles.visible : ""}`}
    >
      <div className={styles.container}>
        <div className={styles.headerArea}>
          <span className={styles.tagline}>KNOW ME BETTER</span>
          <h2 className={styles.sectionTitle}>About Me</h2>
          <div className={styles.underline}></div>
        </div>

        <div className={styles.contentGrid}>
          {/* Left Column: Interactive Profile Card */}
          <div className={styles.imageColumn}>
            <div className={styles.cardFrame}>
              <div className={styles.glassBackground}></div>
              <img
                src={profileImage}
                alt="Vasudev Verma Profile"
                className={styles.profileImage}
              />
              <div className={styles.glowOverlay}></div>
            </div>
          </div>

          {/* Right Column: Bio Content and Stats */}
          <div className={styles.textColumn}>
            <h3 className={styles.introHeading}>
              I build robust solutions that bridge code and business goals.
            </h3>
            
            <p className={styles.paragraph}>
              I'm Vasudev Verma, a passionate Full Stack Developer with a B.Tech in Computer Science and Engineering. 
              Having successfully shipped multiple full-stack and React projects, I specialize in crafting clean architectures, 
              scalable API systems, and intuitive frontend experiences.
            </p>

            <p className={styles.paragraph}>
              I specialize in creating responsive web portals using the MERN stack (MongoDB, Express, React, Node.js) and modern static pages 
              with Next.js. I also design clean web layouts using vanilla HTML, CSS, and JS. In addition to my individual full-stack web 
              offerings, our team delivers high-performance Android mobile apps using React Native.
            </p>

            {/* Dynamic Stat Badges */}
            <div className={styles.statsGrid}>
              {stats.map((stat, i) => (
                <div key={i} className={styles.statCard}>
                  <span className={styles.statVal}>{stat.value}</span>
                  <span className={styles.statLabel}>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
