// src/components/Skills.jsx

import React, { useEffect, useRef, useState } from 'react';
import styles from './Skills.module.css';

// Import icons from react-icons
// You can find more icons at https://react-icons.github.io/react-icons
import { 
  FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaJsSquare, FaGitAlt, FaDocker,
  FaGithub,
  FaJava,
  FaBootstrap,
  FaPython
} from 'react-icons/fa';
import { SiMongodb, SiExpress, SiPostman, SiJsonwebtokens, SiMysql, SiCnn, SiKeras, SiTensorflow } from 'react-icons/si';

// Define your skills in an array of objects
const skills = [
  { name: 'HTML5', icon: <FaHtml5 />, color: '#E34F26' },
  { name: 'CSS3', icon: <FaCss3Alt />, color: '#1572B6' },
  { name: 'JavaScript', icon: <FaJsSquare />, color: '#F7DF1E' },
  { name: 'React', icon: <FaReact />, color: '#61DAFB' },
  { name: 'Node.js', icon: <FaNodeJs />, color: '#339933' },
  { name: 'Express', icon: <SiExpress />, color: '#000000' },
  { name: 'MongoDB', icon: <SiMongodb />, color: '#47A248' },
  { name: 'Git', icon: <FaGitAlt />, color: '#F05032' },
  { name: 'Github', icon: <FaGithub />, color: '#2496ED' },
  { name: 'JWT', icon: <SiJsonwebtokens />, color: '#FF6C37' },
  { name: 'MySQL', icon: <SiMysql />, color: '#3866eeff' },
  { name: 'Java', icon: <FaJava />, color: '#ff5237ff' },
  { name: 'Bootstrap', icon: <FaBootstrap />, color: '#373effff' },
  {name:'Python', icon: <FaPython />, color: '#022061ff' },
  {name: 'TenserFlow', icon: <SiTensorflow />, color: '#FF6F00' }
];

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const skillsRef = useRef(null);

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

    if (skillsRef.current) {
      observer.observe(skillsRef.current);
    }

    return () => {
      if (skillsRef.current) {
        observer.unobserve(skillsRef.current);
      }
    };
  }, []);

  return (
    <section id="skills" ref={skillsRef} className={`${styles.skills} ${isVisible ? 'fade-in visible' : 'fade-in'}`}>
      <h2 className={styles.sectionTitle}>My Tech Stack</h2>
      <div className={styles.skillsGrid}>
        {skills.map((skill) => (
          <div key={skill.name} className={styles.skillCard}>
            <div className={styles.iconWrapper} style={{ color: skill.color }}>
              {skill.icon}
            </div>
            <p>{skill.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;