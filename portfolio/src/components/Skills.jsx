// src/components/Skills.jsx
import React, { useEffect, useRef, useState } from "react";
import styles from "./Skills.module.css";

import {
  FaReact,
  FaNodeJs,
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
  FaGitAlt,
  FaGithub,
  FaJava,
  FaPython,
} from "react-icons/fa";

import {
  SiMongodb,
  SiExpress,
  SiJsonwebtokens,
  SiMysql,
  SiNestjs,
  SiNextdotjs,
  SiPostgresql,
  SiTailwindcss,
  SiTypescript
} from "react-icons/si";

const skillCategories = [
  {
    title: "Frontend & Mobile App Development",
    skills: [
      { name: "React", icon: <FaReact />, color: "#61DAFB" },
      { name: "React Native", icon: <FaReact />, color: "#10b981" },
      { name: "Next.js", icon: <SiNextdotjs />, color: "#ffffff" },
      { name: "JavaScript", icon: <FaJsSquare />, color: "#F7DF1E" },
      { name: "TypeScript", icon: <SiTypescript />, color: "#3178C6" },
      { name: "HTML5/CSS3", icon: <FaHtml5 />, color: "#E34F26" },
      { name: "Tailwind CSS", icon: <SiTailwindcss />, color: "#06B6D4" },
    ]
  },
  {
    title: "Backend, APIs & Databases",
    skills: [
      { name: "Node.js", icon: <FaNodeJs />, color: "#339933" },
      { name: "Express", icon: <SiExpress />, color: "#ffffff" },
      { name: "NestJS", icon: <SiNestjs />, color: "#E0234E" },
      { name: "MongoDB", icon: <SiMongodb />, color: "#47A248" },
      { name: "PostgreSQL", icon: <SiPostgresql />, color: "#4169E1" },
      { name: "MySQL", icon: <SiMysql />, color: "#00758F" },
      { name: "JWT Auth", icon: <SiJsonwebtokens />, color: "#FF6C37" },
    ]
  },
  {
    title: "Programming Languages & Version Control",
    skills: [
      { name: "Java", icon: <FaJava />, color: "#F89820" },
      { name: "Python", icon: <FaPython />, color: "#3776AB" },
      { name: "Git", icon: <FaGitAlt />, color: "#F05032" },
      { name: "GitHub", icon: <FaGithub />, color: "#ddd" },
    ]
  }
];

const Skills = () => {
  const [visible, setVisible] = useState(false);
  const skillsRef = useRef(null);

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

    if (skillsRef.current) ob.observe(skillsRef.current);
    return () => ob.disconnect();
  }, []);

  /* Listen to Navbar Trigger Events */
  useEffect(() => {
    const replay = () => {
      setVisible(false);
      setTimeout(() => setVisible(true), 50);
    };

    window.addEventListener("trigger-skills-animation", replay);
    return () => window.removeEventListener("trigger-skills-animation", replay);
  }, []);

  return (
    <section
      id="skills"
      ref={skillsRef}
      className={`${styles.skillsSection} ${visible ? styles.visible : ""}`}
    >
      <div className={styles.container}>
        <div className={styles.headerArea}>
          <span className={styles.tagline}>PROFESSIONAL EXPERTISE</span>
          <h2 className={styles.sectionTitle}>My Tech Stack</h2>
          <div className={styles.underline}></div>
          <p className={styles.subtitle}>
            A curated list of modern technologies, libraries, and frameworks I leverage to 
            deliver robust full-stack solutions.
          </p>
        </div>

        <div className={styles.categoriesContainer}>
          {skillCategories.map((category, catIdx) => (
            <div key={catIdx} className={styles.categoryBlock}>
              <h3 className={styles.categoryTitle}>{category.title}</h3>
              <div className={styles.skillsGrid}>
                {category.skills.map((skill, index) => (
                  <div
                    key={index}
                    className={styles.skillOrb}
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    <div className={styles.orbCore} style={{ color: skill.color }}>
                      {skill.icon}
                    </div>
                    <p className={styles.skillName}>{skill.name}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
