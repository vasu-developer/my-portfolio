// src/components/Services.jsx
import React, { useEffect, useRef, useState } from "react";
import { FaCode, FaMobileAlt, FaLaptopCode, FaBookOpen, FaChartLine } from "react-icons/fa";
import styles from "./Services.module.css";

const servicesData = [
  {
    icon: <FaCode />,
    title: "Full-Stack Web Applications",
    description: "Highly performant, robust, and SEO-friendly web systems built with the MERN stack (MongoDB, Express, React, Node) or Next.js, tailored to fit business requirements.",
    features: ["Custom REST & GraphQL APIs", "State Management (Redux/Zustand)", "Secure JWT Authentication"],
    color: "var(--accent-mint)"
  },
  {
    icon: <FaMobileAlt />,
    title: "Android App Development (Team)",
    description: "High-performance Android applications built with React Native. Delivered by our expert mobile development team, featuring fluid UI interactions and offline syncing.",
    features: ["Android Play Store Deployment", "Custom React Native Architecture", "Local Storage & Syncing"],
    color: "var(--accent-blue)"
  },
  {
    icon: <FaLaptopCode />,
    title: "Custom Web Design & Frontend",
    description: "Clean, pixel-perfect web page designs built using vanilla HTML, CSS, and modern JavaScript. Optimized for quick loading speeds, SEO, and visual elegance.",
    features: ["Vanilla HTML/CSS/JS Layouts", "Responsive Design", "Lighthouse & SEO Optimized"],
    color: "var(--accent-mint)"
  },
  {
    icon: <FaBookOpen />,
    title: "Headless Blogs & CMS Platforms",
    description: "Static and dynamic blogging platforms designed using Next.js and Headless CMS (Sanity, Strapi, MDX) for content-first business marketing.",
    features: ["Lightning-fast static page generation", "Custom Rich Text rendering", "SEO meta descriptions generation"],
    color: "var(--accent-blue)"
  },
  {
    icon: <FaChartLine />,
    title: "Custom Admin Panels & Dashboards",
    description: "Advanced analytics interfaces and dashboards built to visualize complex data metrics, manage user roles, and streamline backend operations.",
    features: ["Interactive Charts & Tables", "Role-Based Access Control", "CSV/PDF Export Options"],
    color: "var(--accent-mint)"
  }
];

const Services = () => {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  /* Reveal Section Animation on scroll */
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

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  /* Listen to Navbar Trigger Events */
  useEffect(() => {
    const trigger = () => {
      setVisible(false);
      setTimeout(() => setVisible(true), 50);
    };

    window.addEventListener("trigger-services-animation", trigger);
    return () => window.removeEventListener("trigger-services-animation", trigger);
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className={`${styles.servicesSection} ${visible ? styles.visible : ""}`}
    >
      {/* Dynamic backdrop decorations */}
      <div className={styles.blurBlobMint}></div>
      <div className={styles.blurBlobBlue}></div>

      <div className={styles.container}>
        <div className={styles.headerArea}>
          <span className={styles.tagline}>WHAT I OFFER</span>
          <h2 className={styles.title}>Freelance Services</h2>
          <div className={styles.underline}></div>
          <p className={styles.subtitle}>
            Empowering brands, startups, and agencies with robust full-stack software development, 
            interactive mobile app designs, and high-performance user interfaces.
          </p>
        </div>

        <div className={styles.servicesGrid}>
          {servicesData.map((service, index) => (
            <div
              key={index}
              className={styles.cardWrapper}
            >
              <div
                className={styles.serviceCard}
                style={{ "--card-accent": service.color }}
              >
                <div className={styles.iconWrapper}>{service.icon}</div>
                <h3 className={styles.cardTitle}>{service.title}</h3>
                <p className={styles.cardDescription}>{service.description}</p>
                
                <ul className={styles.featuresList}>
                  {service.features.map((feature, idx) => (
                    <li key={idx} className={styles.featureItem}>
                      <span className={styles.checkIcon}>✓</span> {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
