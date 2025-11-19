// src/components/Header.jsx
import React, { useState } from "react";
import styles from "./Header.module.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

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

    setMenuOpen(false);
  };

  const triggerAnimation = (section) => {
    window.dispatchEvent(new Event(`trigger-${section}-animation`));
  };

  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <a href="/" className={styles.logo}>
          Vasu<sub className={styles.sub}>developer</sub>
        </a>

        {/* Hamburger Button */}
        <button
          className={`${styles.menuButton} ${menuOpen ? styles.open : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Navigation List */}
        <ul className={`${styles.navList} ${menuOpen ? styles.showMenu : ""}`}>
          <li>
            <a
              href="#about"
              onClick={(e) => {
                handleNavClick(e, "about");
                triggerAnimation("about");
              }}
            >
              About
            </a>
          </li>

          <li>
            <a
              href="#skills"
              onClick={(e) => {
                handleNavClick(e, "skills");
                triggerAnimation("skills");
              }}
            >
              Skills
            </a>
          </li>

          <li>
            <a
              href="#projects"
              onClick={(e) => {
                handleNavClick(e, "projects");
                triggerAnimation("projects");
              }}
            >
              Projects
            </a>
          </li>

          <li>
            <a
              href="#contact"
              onClick={(e) => {
                handleNavClick(e, "contact");
                triggerAnimation("contact");
              }}
            >
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
