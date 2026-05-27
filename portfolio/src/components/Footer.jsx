// src/components/Footer.jsx
import React, { useEffect, useRef, useState } from "react";
import styles from "./Footer.module.css";
import { FaGithub, FaLinkedin, FaInstagram, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  /* Reveal animation */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (!targetElement) return;

    const header = document.querySelector("header");
    const headerHeight = header ? header.offsetHeight : 0;
    const targetPosition = targetElement.offsetTop - headerHeight;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });

    window.dispatchEvent(new Event(`trigger-${targetId}-animation`));
  };

  return (
    <footer
      id="footer"
      ref={ref}
      className={`${styles.footer} ${visible ? styles.visible : ""}`}
    >
      <div className={styles.container}>
        <div className={styles.footerTop}>
          {/* LEFT: Branding Column */}
          <div className={styles.brandCol}>
            <span className={styles.trustTag}>✓ YOUR TRUSTED DEVELOPMENT PARTNER</span>
            <a href="/" className={styles.logo}>
              Vasu<span className={styles.sub}>developer</span>
            </a>
            <p className={styles.brandDesc}>
              Delivering high-performance, secure, and conversion-optimized web and mobile systems built to scale your business.
            </p>
            <div className={styles.socialBlock}>
              <a
                href="https://github.com/vasu-developer"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.icon}
                title="GitHub"
              >
                <FaGithub />
              </a>

              <a
                href="https://linkedin.com/in/vasu-developer"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.icon}
                title="LinkedIn"
              >
                <FaLinkedin />
              </a>

              <a
                href="https://instagram.com/vasu_developer"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.icon}
                title="Instagram"
              >
                <FaInstagram />
              </a>

              <a
                href="https://wa.me/919528539285"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.icon}
                title="Chat on WhatsApp"
              >
                <FaWhatsapp />
              </a>
            </div>
          </div>

          {/* RIGHT: Two columns (Links & Services) */}
          <div className={styles.linksWrapper}>
            <div className={styles.col}>
              <h4 className={styles.colTitle}>Quick Links</h4>
              <ul className={styles.colLinks}>
                <li>
                  <a href="#about" onClick={(e) => handleNavClick(e, "about")}>
                    About
                  </a>
                </li>
                <li>
                  <a href="#services" onClick={(e) => handleNavClick(e, "services")}>
                    Services
                  </a>
                </li>
                <li>
                  <a href="#skills" onClick={(e) => handleNavClick(e, "skills")}>
                    Skills
                  </a>
                </li>
                <li>
                  <a href="#projects" onClick={(e) => handleNavClick(e, "projects")}>
                    Projects
                  </a>
                </li>
                <li>
                  <a href="#contact" onClick={(e) => handleNavClick(e, "contact")}>
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div className={styles.col}>
              <h4 className={styles.colTitle}>Services</h4>
              <ul className={styles.colLinks}>
                <li>
                  <a href="#services" onClick={(e) => handleNavClick(e, "services")}>
                    Web Development
                  </a>
                </li>
                <li>
                  <a href="#services" onClick={(e) => handleNavClick(e, "services")}>
                    Android Apps
                  </a>
                </li>
                <li>
                  <a href="#services" onClick={(e) => handleNavClick(e, "services")}>
                    Custom UI Design
                  </a>
                </li>
                <li>
                  <a href="#services" onClick={(e) => handleNavClick(e, "services")}>
                    Blogs & CMS
                  </a>
                </li>
                <li>
                  <a href="#services" onClick={(e) => handleNavClick(e, "services")}>
                    Admin Panels
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <p className={styles.copy}>
          © {new Date().getFullYear()} Vasudev Verma • Crafting High-Performance Web & Mobile Solutions
        </p>
      </div>
    </footer>
  );
};

export default Footer;
