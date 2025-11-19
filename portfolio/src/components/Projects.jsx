// src/components/Projects.jsx

import React, { useEffect, useRef, useState } from "react";
import styles from "./Projects.module.css";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

import project1Image from "../assets/images/project1.png";
import project2Image from "../assets/images/project2.png";
import project3 from "../assets/images/project3.png";

const projectsData = [
  {
    title: "Desi Krishak",
    description:
      "Desi Krishak is a full-stack e-commerce platform connecting local farmers directly with consumers.",
    image: project1Image,
    tags: ["React", "Node.js", "MongoDB", "JWT"],
    liveUrl: "https://desi-krishak-81xa.vercel.app",
    githubUrl: "https://github.com/vasu-developer/desi-krishak",
  },
  {
    title: "VistaVibes",
    description:
      "A platform for discovering and sharing HD wallpapers. A creative hub for artists.",
    image: project2Image,
    tags: ["React", "Firebase", "JWT"],
    liveUrl: "https://vistavibes.vercel.app",
    githubUrl: "https://github.com/vasu-developer/vistavibes",
  },
  {
    title: "Face Mask Detection",
    description:
      "A real-time mask detection system using deep learning (CNN + TensorFlow).",
    image:
      "https://miro.medium.com/v2/resize:fit:1400/1*oX3bYkYk7f9b8j4rX6m1cw.png",
    tags: ["Python", "TensorFlow", "OpenCV"],
    liveUrl: "https://ai-ml-projects.onrender.com/",
    githubUrl:
      "https://github.com/vasu-developer/AI-ML-PROJECTS/tree/main/face-mask-detection",
  },
  {
    title: "Email Spam Classifier",
    description: "An NLP-powered spam email classifier.",
    image: project3,
    tags: ["Python", "NLP", "Scikit-learn"],
    liveUrl: "https://spam-email-classifier-ai.onrender.com/",
    githubUrl:
      "https://github.com/vasu-developer/AI-ML-PROJECTS/tree/main/Spam%20Email%20Classifier",
  },
];

const Projects = () => {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  /* -------------- SCROLL OBSERVER -------------- */
  useEffect(() => {
    const ob = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) ob.observe(sectionRef.current);

    return () => ob.disconnect();
  }, []);

  /* -------------- NAVBAR TRIGGER LISTENER -------------- */
  useEffect(() => {
    const trigger = () => {
      // replay animation cleanly
      setVisible(false);

      // allow DOM to reset
      setTimeout(() => setVisible(true), 50);
    };

    window.addEventListener("trigger-projects-animation", trigger);

    return () =>
      window.removeEventListener("trigger-projects-animation", trigger);
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className={`${styles.projectsSection} ${visible ? styles.visible : ""}`}
    >
      <div className={styles.shootingStars}></div>

      <h2 className={styles.sectionTitle}>My Projects</h2>

      <div className={styles.grid}>
        {projectsData.map((project, i) => (
          <a
            href={project.liveUrl}
            key={i}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.cardLink}
          >
            <div
              className={`${styles.vortexCard}
                ${visible ? styles.vortexVisible : ""}
                ${i % 2 === 0 ? styles.fadeFromLeft : styles.fadeFromRight}
              `}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div className={styles.vortexGlow}></div>

              <div className={styles.vortexCore}>
                <img
                  loading="lazy"
                  src={project.image}
                  alt={project.title}
                  className={styles.projectImage}
                />
              </div>

              <div className={styles.content}>
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
                  <a href={project.liveUrl} className={styles.link}>
                    <FaExternalLinkAlt /> Live
                  </a>
                  <a href={project.githubUrl} className={styles.link}>
                    <FaGithub /> Code
                  </a>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Projects;
