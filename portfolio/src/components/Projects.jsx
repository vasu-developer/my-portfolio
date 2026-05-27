// src/components/Projects.jsx
import React, { useEffect, useRef, useState } from "react";
import styles from "./Projects.module.css";
import { FaExternalLinkAlt } from "react-icons/fa";

import project1Image from "../assets/images/project1.png"; // Desi Krishak
import appsicalImage from "../assets/images/appsical_mock.png";
import genesisImage from "../assets/images/genesis_lumina_mock.png";
import auctionImage from "../assets/images/auction_leo_mock.png";

const projectsData = [
  {
    title: "Desi Krishak",
    category: "Full-Stack Web App (MERN)",
    description:
      "A complete e-commerce marketplace connecting local farmers directly with consumers, promoting organic agriculture and featuring user profiles, catalog browsing, secure JWT auth, and active shopping carts.",
    image: project1Image,
    tags: ["React", "Node.js", "MongoDB", "Express", "JWT"],
    liveUrl: "https://desikrishak.shop",
    status: "Active"
  },
  {
    title: "Auction Leo",
    category: "Full-Stack Aggregator (MERN)",
    description:
      "A robust search engine and portal for verified bank auction listings (SARFAESI foreclosures) across India. Users can search by city, view reserve prices, EMD details, and track upcoming property or vehicle auctions.",
    image: auctionImage,
    tags: ["React", "Node.js", "Express", "MongoDB"],
    liveUrl: "https://auction-leo.onrender.com",
    status: "Ongoing"
  },
  {
    title: "AppSical",
    category: "Full-Stack Portal (React/Node)",
    description:
      "A modern corporate marketing platform built for organizational representation and business IT solutions. Features dynamic service pages, clean modern layouts, and integrated contact communication portals.",
    image: appsicalImage,
    tags: ["React", "Node.js", "Express", "CSS Modules"],
    liveUrl: "https://appsical.onrender.com",
    status: "Active"
  },
  {
    title: "Genesis Lumina",
    category: "Static Landing Web App",
    description:
      "A premium, responsive static landing web application crafted with high-fidelity visual aesthetics. Utilizes custom slider integration and smooth GSAP timeline animations for elegant frontend presentation.",
    image: genesisImage,
    tags: ["React", "Frontend Design", "GSAP Animations", "Swiper UI"],
    liveUrl: "https://genesis-lumina.com",
    status: "Active"
  },
];

const Projects = () => {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  /* Scroll Trigger Observer */
  useEffect(() => {
    const ob = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) ob.observe(sectionRef.current);
    return () => ob.disconnect();
  }, []);

  /* Listen to Navbar Trigger Events */
  useEffect(() => {
    const trigger = () => {
      setVisible(false);
      setTimeout(() => setVisible(true), 50);
    };

    window.addEventListener("trigger-projects-animation", trigger);
    return () => window.removeEventListener("trigger-projects-animation", trigger);
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className={`${styles.projectsSection} ${visible ? styles.visible : ""}`}
    >
      <div className={styles.container}>
        <div className={styles.headerArea}>
          <span className={styles.tagline}>MY WORK</span>
          <h2 className={styles.sectionTitle}>Featured Projects</h2>
          <div className={styles.underline}></div>
          <p className={styles.subtitle}>
            A showcase of production-ready full-stack applications, designed layouts, and web portals 
            successfully deployed to clients and online platforms.
          </p>
        </div>

        <div className={styles.grid}>
          {projectsData.map((project, i) => (
            <div
              key={i}
              className={styles.cardWrapper}
            >
              <div className={styles.projectCard}>
                {/* Image Showcase */}
                <div className={styles.imageWrapper}>
                  <img
                    loading="lazy"
                    src={project.image}
                    alt={project.title}
                    className={styles.projectImage}
                  />
                  <div className={styles.overlay}>
                    <div className={styles.overlayButtons}>
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={styles.overlayIconBtn} title="Visit Project">
                        <FaExternalLinkAlt />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Content Area */}
                <div className={styles.content}>
                  <div className={styles.metaRow}>
                    <span className={styles.category}>{project.category}</span>
                    <span className={`${styles.statusBadge} ${project.status === "Ongoing" ? styles.statusOngoing : ""}`}>
                      {project.status}
                    </span>
                  </div>
                  <h3 className={styles.title}>{project.title}</h3>
                  <p className={styles.desc}>{project.description}</p>

                  <div className={styles.tags}>
                    {project.tags.map((tag, idx) => (
                      <span key={idx} className={styles.tag}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className={styles.links}>
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={styles.linkButton}>
                      Visit Website <FaExternalLinkAlt />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
