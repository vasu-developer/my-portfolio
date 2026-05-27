// src/components/FloatingWhatsApp.jsx
import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import styles from "./FloatingWhatsApp.module.css";

const FloatingWhatsApp = () => {
  return (
    <a
      href="https://wa.me/919528539285"
      target="_blank"
      rel="noopener noreferrer"
      className={styles.floatButton}
      aria-label="Chat on WhatsApp"
      title="Chat on WhatsApp"
    >
      <div className={styles.pulseContainer}>
        <div className={styles.pulseRing}></div>
        <FaWhatsapp className={styles.whatsappIcon} />
      </div>
      <span className={styles.tooltipText}>Chat on WhatsApp</span>
    </a>
  );
};

export default FloatingWhatsApp;
