// src/components/Contact.jsx
import React, { useState, useEffect, useRef } from "react";
import styles from "./Contact.module.css";
import { FaPaperPlane } from "react-icons/fa";

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

  /* Scroll Trigger Observer */
  useEffect(() => {
    const ob = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          ob.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) ob.observe(sectionRef.current);
    return () => ob.disconnect();
  }, []);

  /* Navbar Trigger Listener */
  useEffect(() => {
    const replay = () => {
      setVisible(false);
      setTimeout(() => setVisible(true), 50);
    };

    window.addEventListener("trigger-contact-animation", replay);
    return () => window.removeEventListener("trigger-contact-animation", replay);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult("Sending message...");

    const data = new FormData(e.target);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });

      const json = await res.json();

      if (json.success) {
        setResult("Message sent successfully! I will get back to you shortly. ✨");
        e.target.reset();
        setFormData({ name: "", email: "", message: "" });
      } else {
        setResult(json.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setResult("Network error occurred. Please try again later.");
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className={`${styles.contactSection} ${visible ? styles.visible : ""}`}
    >
      <div className={styles.container}>
        <div className={styles.headerArea}>
          <span className={styles.tagline}>GET IN TOUCH</span>
          <h2 className={styles.sectionTitle}>Start A Project</h2>
          <div className={styles.underline}></div>
          <p className={styles.subtitle}>
            Have an idea for a web app, mobile app, or need full-stack consulting? 
            Drop a message below and let's discuss details!
          </p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <input type="hidden" name="access_key" value={ACCESS_KEY} />

          <div className={styles.inputGroup}>
            <label htmlFor="name" className={styles.label}>Your Name</label>
            <input
              name="name"
              id="name"
              type="text"
              required
              className={styles.input}
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>Email Address</label>
            <input
              name="email"
              id="email"
              type="email"
              required
              className={styles.input}
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="message" className={styles.label}>Project Details</label>
            <textarea
              name="message"
              id="message"
              rows="5"
              required
              className={styles.textarea}
              placeholder="Describe your website, mobile application, or timeline requirements..."
              value={formData.message}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className={styles.sendButton}>
            Send Message <FaPaperPlane className={styles.btnIcon} />
          </button>
        </form>

        {result && (
          <p className={`${styles.formStatus} ${result.includes("successfully") ? styles.successStatus : ""}`}>
            {result}
          </p>
        )}
      </div>
    </section>
  );
};

export default Contact;
