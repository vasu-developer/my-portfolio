// src/components/Projects.jsx

import React, { useEffect, useRef, useState } from 'react';
import styles from './Projects.module.css';

// Import project images
import project1Image from '../assets/images/project1.png';
import project2Image from '../assets/images/project2.png';

// Import icons
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const projectsData = [
  {
    title: 'Desi Krishak',
    description:
      'Desi Krishak is a full-stack e-commerce platform that empowers local farmers by directly connecting them with consumers. It eliminates middlemen, ensures fair pricing, and promotes sustainable agriculture. The platform features secure authentication, product management, cart & checkout system, and a smooth user experience.',
    image: project1Image,
    tags: ['React', 'Node.js', 'Express', 'MongoDB','JWT', 'CSS Modules', 'Responsive Design'],
    liveUrl: 'https://desi-krishak-81xa.vercel.app',
    githubUrl: 'https://github.com/vasu-developer/desi-krishak', // Replace with your repo
  },
  {
    title: 'VistaVibes',
    description:
      'VistaVibes is an one-stop platform for discovering and sharing high-definition wallpapers across various categories. Whether youre a photographer, a designer, or just someone who appreciates beautiful visuals, VistaVibes offers a vibrant community to showcase your creativity.',
    image: project2Image,
    tags: ['React', 'Firebase', 'CSS Modules','MongoDB','JWT', 'Responsive Design'],
    liveUrl: 'https://vistavibes.vercel.app',
    githubUrl: 'https://github.com/vasu-developer/vistavibes', // Replace with your repo
  },
];

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const projectsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (projectsRef.current) {
      observer.observe(projectsRef.current);
    }

    return () => {
      if (projectsRef.current) {
        observer.unobserve(projectsRef.current);
      }
    };
  }, []);

  return (
    <section
      id="projects"
      ref={projectsRef}
      className={`${styles.projects} ${isVisible ? 'fade-in visible' : 'fade-in'}`}
    >
      <h2 className={styles.sectionTitle}>My Projects</h2>
      <div className={styles.projectsGrid}>
        {projectsData.map((project, index) => (
          <div key={index} className={styles.projectCard}>
            <img
              src={project.image}
              alt={`${project.title} screenshot`}
              className={styles.projectImage}
            />
            <div className={styles.projectContent}>
              <h3 className={styles.projectTitle}>{project.title}</h3>
              <p className={styles.projectDescription}>{project.description}</p>
              <div className={styles.projectTags}>
                {project.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
              <div className={styles.projectLinks}>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  <FaExternalLinkAlt /> Live Demo
                </a>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  <FaGithub /> View Code
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
