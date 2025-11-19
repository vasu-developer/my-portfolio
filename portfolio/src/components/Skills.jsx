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
  FaBootstrap,
  FaPython
} from "react-icons/fa";

import {
  SiMongodb,
  SiExpress,
  SiJsonwebtokens,
  SiMysql,
  SiTensorflow,
} from "react-icons/si";

const skills = [
  { name: "HTML5", icon: <FaHtml5 />, color: "#E34F26" },
  { name: "CSS3", icon: <FaCss3Alt />, color: "#1572B6" },
  { name: "JavaScript", icon: <FaJsSquare />, color: "#F7DF1E" },
  { name: "React", icon: <FaReact />, color: "#61DAFB" },
  { name: "Node.js", icon: <FaNodeJs />, color: "#339933" },
  { name: "Express", icon: <SiExpress />, color: "#ffffff" },
  { name: "MongoDB", icon: <SiMongodb />, color: "#47A248" },
  { name: "Git", icon: <FaGitAlt />, color: "#F05032" },
  { name: "Github", icon: <FaGithub />, color: "#ddd" },
  { name: "JWT", icon: <SiJsonwebtokens />, color: "#FF6C37" },
  { name: "MySQL", icon: <SiMysql />, color: "#3866ee" },
  { name: "Java", icon: <FaJava />, color: "#f25a38" },
  { name: "Bootstrap", icon: <FaBootstrap />, color: "#563d7c" },
  { name: "Python", icon: <FaPython />, color: "#2b5fff" },
  { name: "TensorFlow", icon: <SiTensorflow />, color: "#FF6F00" },
];

const Skills = () => {
  const [visible, setVisible] = useState(false);
  const skillsRef = useRef(null);

  /* ------------------ SCROLL TRIGGER ------------------ */
  useEffect(() => {
    const ob = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (skillsRef.current) ob.observe(skillsRef.current);

    return () => ob.disconnect();
  }, []);

  /* ------------------ NAVBAR CLICK TRIGGER ------------------ */
  useEffect(() => {
    const replay = () => {
      setVisible(false);

      // small delay so CSS can reset before replay
      setTimeout(() => setVisible(true), 50);
    };

    window.addEventListener("trigger-skills-animation", replay);

    return () =>
      window.removeEventListener("trigger-skills-animation", replay);
  }, []);

  return (
    <section
      id="skills"
      ref={skillsRef}
      className={`${styles.skillsSection} ${visible ? styles.visible : ""}`}
    >
      <div className={styles.bgNebula}></div>
      <div className={styles.bgStars}></div>

      <h2 className={styles.sectionTitle}>My Tech Stack</h2>

      <div className={styles.skillsGrid}>
        {skills.map((skill, index) => (
          <div
            key={index}
            className={styles.skillOrb}
            style={{ transitionDelay: `${index * 90}ms` }} // stagger
          >
            <div className={styles.orbCore} style={{ color: skill.color }}>
              {skill.icon}
            </div>

            <p className={styles.skillName}>{skill.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
