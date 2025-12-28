import React, { useEffect, useRef, useState } from "react";
import styles from "./Footer.module.css";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

import { db } from "../firebase/firebase";
import { doc, getDoc, setDoc, updateDoc, increment } from "firebase/firestore";

const Footer = () => {
  const [visible, setVisible] = useState(false);
  const [visitors, setVisitors] = useState(null);
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
  }, []);

  /* 🔥 VISITOR COUNTER */
  useEffect(() => {
    const countVisitor = async () => {
      try {
        const visitorRef = doc(db, "stats", "visitors");
        const snap = await getDoc(visitorRef);

        if (!snap.exists()) {
          await setDoc(visitorRef, { count: 1 });
          setVisitors(1);
        } else {
          await updateDoc(visitorRef, {
            count: increment(1),
          });
          setVisitors(snap.data().count + 1);
        }
      } catch (err) {
        console.error("Visitor counter error:", err);
      }
    };

    countVisitor();
  }, []);

  return (
    <footer
      id="footer"
      ref={ref}
      className={`${styles.footer} ${visible ? styles.visible : ""}`}
    >
      <div className={styles.overlay} />

      <div className={styles.footerRow}>
        {/* LEFT: Socials */}
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

        {/* RIGHT: Visitor Count */}
      </div>

      <p className={styles.copy}>
        © {new Date().getFullYear()} Vasudev Verma • Exploring Beyond.
        <div className={styles.visitorCount}>
         Visitors&nbsp;
          <span>{visitors !== null ? visitors : "..."}</span>
        </div>
      </p>
    </footer>
  );
};

export default Footer;
