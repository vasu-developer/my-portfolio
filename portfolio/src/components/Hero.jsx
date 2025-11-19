import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import useTypingEffect from "../hooks/useTypingEffect";
import styles from "./Hero.module.css";
import useStarfield from "../hooks/useStarField";
const STAR_COUNT = 90;
const INFALL_PARTICLES = 40;

export default function Hero() {
  const phrases = [
  " Full Stack Developer",
  " React Enthusiast",
  " Open Source Contributor",
];

const [phraseIndex, setPhraseIndex] = useState(0);
const typedText = useTypingEffect(phrases[phraseIndex], 130);

useEffect(() => {
  if (typedText === phrases[phraseIndex]) {
    const t = setTimeout(() => {
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
    }, 1500);
    return () => clearTimeout(t);
  }
}, [typedText, phraseIndex]);

  // motion values (no React state)
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);

  // pointer handler uses motion values directly — NO setState
  useEffect(() => {
    const handler = (e) => {
      const w = window.innerWidth || 1;
      const h = window.innerHeight || 1;
      mx.set(e.clientX / w);
      my.set(e.clientY / h);
    };
    window.addEventListener("pointermove", handler, { passive: true });
    return () => window.removeEventListener("pointermove", handler);
  }, [mx, my]);

  // transforms for parallax (passed to motion.divs)
  const sunX = useTransform(mx, [0, 1], [15, -15]);
  const sunY = useTransform(my, [0, 1], [10, -10]);

  const holeX = useTransform(mx, [0, 1], [-12, 12]);
  const holeY = useTransform(my, [0, 1], [-6, 6]);

  const orbitX = useTransform(mx, [0, 1], [8, -8]);
  const orbitY = useTransform(my, [0, 1], [5, -5]);

  // stable star nodes (memoized so they don't regenerate unnecessarily)
  const stars = useStarfield(STAR_COUNT);

  // stable infall particles (memoized)
  const particles = useMemo(() => {
    return Array.from({ length: INFALL_PARTICLES }).map((_, i) => {
      const angle = Math.random() * Math.PI * 2;
      const radius = 160 + Math.random() * 80;
      const size = Math.random() * 2 + 1;
      const duration = 6 + Math.random() * 4;
      return (
        <div
          key={`p-${i}`}
          className={styles.infallParticle}
          style={{
            ["--startX"]: `${Math.cos(angle) * radius}px`,
            ["--startY"]: `${Math.sin(angle) * radius}px`,
            ["--duration"]: `${duration}s`,
            width: `${size}px`,
            height: `${size}px`,
          }}
          aria-hidden
        />
      );
    });
  }, []);

  return (
    <section id="hero" className={styles.hero} ref={useRef(null)}>
      {/* STATIC STARFIELD (position: fixed in CSS) */}
       <div className={styles.starfield}>
      {stars.map((s) => (
        <div
          key={s.id}
          className={styles.star}
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        />
      ))}
    </div>

      {/* SUN (parallax via motion values) */}
      <motion.div
        className={styles.sunLayer}
        style={{ x: sunX, y: sunY }}
        aria-hidden
      >
        <div className={styles.sunGlow} />
        <div className={styles.sunCore} />
      </motion.div>

      {/* BLACK HOLE (opposite parallax) */}
      <motion.div
        className={styles.blackHoleLayer}
        style={{ x: holeX, y: holeY }}
        aria-hidden
      >
        <div className={styles.blackHoleCore} />
        <div className={styles.blackHoleMask} />
        <div className={styles.infallGroup}>{particles}</div>
      </motion.div>

      {/* PLANETS — light parallax */}
      <motion.div
        className={styles.orbitSystem}
        style={{ x: orbitX, y: orbitY }}
        aria-hidden
      >
        <div className={styles.bigPlanet} />
        <div className={styles.smallOrbit} style={{ animationDuration: "14s" }}>
          <div className={styles.smallPlanet} />
        </div>
        <div className={styles.smallOrbit} style={{ animationDuration: "20s" }}>
          <div className={`${styles.smallPlanet} ${styles.orangePlanet}`} />
        </div>
        <div className={styles.smallOrbit} style={{ animationDuration: "26s" }}>
          <div className={`${styles.smallPlanet} ${styles.bluePlanet}`} />
        </div>
      </motion.div>

      {/* Hero content — intentionally NOT parallaxed */}
      <div className={styles.heroContent} role="main">
        <h1 className={styles.title}>
          Hi, I'm <span className={styles.name}>Vasudev Verma</span>
        </h1>

        <p className={styles.subtitle}>
          I'm a <span className={styles.typingText}>{typedText}</span>
        </p>

        <p className={styles.description}>
          I create with the hope that every line of code brings me closer —
          not just to better software, but to the finest version of myself.
        </p>

        <a href="#contact" className={styles.ctaButton}>
          Reach Out
        </a>
      </div>
    </section>
  );
}
