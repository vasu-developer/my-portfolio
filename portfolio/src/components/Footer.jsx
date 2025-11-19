// src/components/Footer.jsx

import React, { useEffect, useRef, useState } from "react";
import styles from "./Footer.module.css";

import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const ob = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          ob.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (ref.current) ob.observe(ref.current);
  }, []);

  return (
    <footer
      id="footer"
      ref={ref}
      className={`${styles.footer} ${visible ? styles.visible : ""}`}
    >
      <div className={styles.overlay} />

      {/* Social links on the right, aligned near UFO */}
      <div className={styles.socialBlock}>
        <a
          href="https://github.com/vasu-developer"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.icon}
        >
          <FaGithub />
        </a>

        <a
          href="https://linkedin.com/in/vasu-developer"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.icon}
        >
          <FaLinkedin />
        </a>

        <a
          href="https://instagram.com/vasu_developer"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.icon}
        >
          <FaInstagram />
        </a>
      </div>

      <p className={styles.copy}>
        © {new Date().getFullYear()} Vasudev Verma • Exploring Beyond.
      </p>
    </footer>
  );
};

export default Footer;
