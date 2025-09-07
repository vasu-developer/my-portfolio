// src/components/Footer.jsx

import React from 'react';
import styles from './Footer.module.css';
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.socialLinks}>
        <a href="https://github.com/vasu-developer" target="_blank" rel="noopener noreferrer">
          <FaGithub />
        </a>
        <a href="https://linkedin.com/in/vasu-developer" target="_blank" rel="noopener noreferrer">
          <FaLinkedin />
        </a>
        <a href="https://instagram.com/vasu_developer" target="_blank" rel="noopener noreferrer">
          <FaInstagram />
        </a>
      </div>
      <p className={styles.copyright}>
        &copy; {new Date().getFullYear()} Vasudev Verma. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;