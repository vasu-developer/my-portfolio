// src/components/Contact.jsx

import React, { useState, useEffect, useRef } from "react";
import styles from "./Contact.module.css";

const Contact = () => {
  const ACCESS_KEY = "210faed1-d647-4d18-aba5-eed140455076";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [result, setResult] = useState(null);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  /* ---------------- SCROLL TRIGGER ---------------- */
  useEffect(() => {
    const ob = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          ob.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) ob.observe(sectionRef.current);

    return () => ob.disconnect();
  }, []);

  /* ---------------- NAVBAR CLICK TRIGGER ---------------- */
  useEffect(() => {
    const replay = () => {
      setVisible(false);
      setTimeout(() => setVisible(true), 40); // reset + replay
    };

    window.addEventListener("trigger-contact-animation", replay);
    return () =>
      window.removeEventListener("trigger-contact-animation", replay);
  }, []);

  /* ---------------- HANDLERS ---------------- */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult("Sending...");

    const data = new FormData(e.target);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });

      const json = await res.json();

      if (json.success) {
        setResult("Message sent successfully ✨");
        e.target.reset();
        setFormData({ name: "", email: "", message: "" });
      } else {
        setResult(json.message || "Something went wrong.");
      }
    } catch (error) {
      setResult("Network error. Try again.");
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className={`${styles.contactSection} ${
        visible ? styles.visible : ""
      }`}
    >
      {/* Nebula + Glow layers */}
      <div className={styles.nebulaGlow}></div>
      <div className={styles.subtleFog}></div>

      <h2 className={styles.sectionTitle}>Get In Touch</h2>
      <p className={styles.subtitle}>
        Whether it’s a question, collaboration, or a spark of an idea —
        I’d love to hear from you.
      </p>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input type="hidden" name="access_key" value={ACCESS_KEY} />

        <div className={styles.inputGroup}>
          <label htmlFor="name">Full Name</label>
          <input
            name="name"
            id="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="email">Email Address</label>
          <input
            name="email"
            id="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="message">Message</label>
          <textarea
            name="message"
            id="message"
            rows="5"
            required
            value={formData.message}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className={styles.sendButton}>
          <span>Send Message</span>
          <div className={styles.comet}></div>
        </button>
      </form>

      {result && <p className={styles.formStatus}>{result}</p>}
    </section>
  );
};

export default Contact;
