// src/components/Hero.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useTypingEffect from "../hooks/useTypingEffect";
import styles from "./Hero.module.css";
import { FaLaptopCode, FaMobileAlt, FaServer, FaCheckCircle, FaChevronRight } from "react-icons/fa";

export default function Hero() {
  const phrases = [
    " Full Stack Developer",
    " Freelance Engineer",
    " React Native Specialist",
    " MERN Architect",
  ];

  const [phraseIndex, setPhraseIndex] = useState(0);
  const typedText = useTypingEffect(phrases[phraseIndex], 80);
  const [activeTab, setActiveTab] = useState("web");

  useEffect(() => {
    if (typedText === phrases[phraseIndex]) {
      const t = setTimeout(() => {
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      }, 2000);
      return () => clearTimeout(t);
    }
  }, [typedText, phraseIndex]);

  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.gridOverlay}></div>

      <div className={styles.container}>
        {/* LEFT COLUMN: Hero content */}
        <div className={styles.heroContent}>
          <div className={styles.badge}>
            <span className={styles.badgePulse}></span>
            Available for Freelance Projects
          </div>

          <h1 className={styles.title}>
            Building Scalable <br />
            <span className={styles.gradientText}>Digital Experiences</span>
          </h1>

          <p className={styles.subtitle}>
            Hi, I'm Vasudev Verma. I'm a <span className={styles.typingText}>{typedText}</span>
          </p>

          <p className={styles.description}>
            I craft responsive full-stack web applications and cross-platform Android/iOS apps 
            that deliver high performance, seamless user flows, and sleek brand aesthetics.
          </p>

          <div className={styles.ctaGroup}>
            <a href="#contact" className={styles.ctaPrimary}>
              Get in Touch <FaChevronRight className={styles.ctaIcon} />
            </a>
            <a href="#projects" className={styles.ctaSecondary}>
              View Work
            </a>
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Tech Mockup Showcase */}
        <div className={styles.showcaseWrapper}>
          <div className={styles.mockupContainer}>
            {/* Header / Window Controls */}
            <div className={styles.mockupHeader}>
              <div className={styles.windowControls}>
                <span className={styles.closeBtn}></span>
                <span className={styles.minBtn}></span>
                <span className={styles.maxBtn}></span>
              </div>
              <div className={styles.mockupTitle}>vasu_developer_workspace</div>
            </div>

            {/* Tab Selectors */}
            <div className={styles.mockupTabs}>
              <button
                onClick={() => setActiveTab("web")}
                className={`${styles.tabBtn} ${activeTab === "web" ? styles.activeTab : ""}`}
              >
                <FaLaptopCode className={styles.tabIcon} /> Web Apps
              </button>
              <button
                onClick={() => setActiveTab("mobile")}
                className={`${styles.tabBtn} ${activeTab === "mobile" ? styles.activeTab : ""}`}
              >
                <FaMobileAlt className={styles.tabIcon} /> Mobile Apps
              </button>
              <button
                onClick={() => setActiveTab("backend")}
                className={`${styles.tabBtn} ${activeTab === "backend" ? styles.activeTab : ""}`}
              >
                <FaServer className={styles.tabIcon} /> APIs & DB
              </button>
            </div>

            {/* Simulated Content Window */}
            <div className={styles.mockupContent}>
              <AnimatePresence mode="wait">
                {activeTab === "web" && (
                  <motion.div
                    key="web"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className={styles.webPreview}
                  >
                    <div className={styles.webHeader}>
                      <span className={styles.webDot}></span>
                      <span className={styles.webBar}></span>
                    </div>
                    <div className={styles.webBody}>
                      <div className={styles.webHeroSim}>
                        <div className={styles.simTitle}>MERN Stack SaaS</div>
                        <div className={styles.simText}>Stripe Payments & Auth</div>
                        <div className={styles.simBtn}>Launch App</div>
                      </div>
                      <div className={styles.webMetricsSim}>
                        <div className={styles.simMetricCard}>
                          <span className={styles.metricVal}>99.8%</span>
                          <span className={styles.metricLabel}>Lighthouse</span>
                        </div>
                        <div className={styles.simMetricCard}>
                          <span className={styles.metricVal}>&lt; 100ms</span>
                          <span className={styles.metricLabel}>API Response</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "mobile" && (
                  <motion.div
                    key="mobile"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className={styles.mobilePreview}
                  >
                    <div className={styles.phoneFrame}>
                      <div className={styles.phoneNotch}></div>
                      <div className={styles.phoneScreen}>
                        <div className={styles.phoneHeader}>
                          <span>Dashboard</span>
                          <span className={styles.phoneAvatar}></span>
                        </div>
                        <div className={styles.phoneChartSim}>
                          <div className={styles.phoneBar1} style={{ height: "45%" }}></div>
                          <div className={styles.phoneBar2} style={{ height: "75%" }}></div>
                          <div className={styles.phoneBar3} style={{ height: "55%" }}></div>
                          <div className={styles.phoneBar4} style={{ height: "90%" }}></div>
                        </div>
                        <div className={styles.phoneCardSim}>
                          <span className={styles.phoneCardTitle}>React Native App</span>
                          <span className={styles.phoneCardText}>Real-time WebSockets ready</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "backend" && (
                  <motion.div
                    key="backend"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className={styles.terminalPreview}
                  >
                    <div className={styles.terminalLine}><span className={styles.tGreen}>$</span> npm run start:dev</div>
                    <div className={styles.terminalLog}><span className={styles.tGray}>[Nest] 10244 - </span><span className={styles.tCyan}>LOG</span> [NestApplication] Nest application successfully started</div>
                    <div className={styles.terminalLog}><span className={styles.tGray}>[DB] </span><span className={styles.tGreen}>SUCCESS</span> Connected to MongoDB Atlas Cluster</div>
                    <div className={styles.terminalLog}><span className={styles.tGray}>[DB] </span><span className={styles.tGreen}>SUCCESS</span> Synced 14 tables in PostgreSQL</div>
                    <div className={styles.terminalLine}><span className={styles.tGreen}>$</span> curl -X GET /api/v1/analytics</div>
                    <div className={styles.terminalResponse}>
                      {"{"}
                      <div style={{ paddingLeft: "15px" }}>"status": "online",</div>
                      <div style={{ paddingLeft: "15px" }}>"db_latency": "14ms",</div>
                      <div style={{ paddingLeft: "15px" }}>"active_freelance_clients": 6</div>
                      {"}"}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
