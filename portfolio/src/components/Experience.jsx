import React from "react";
import { motion } from "framer-motion";
import { FaServer, FaCode } from "react-icons/fa";

export default function Experience() {
  const roles = [
    {
      title: "Software Engineer (MERN Stack)",
      company: "Webmobril Inc.",
      period: "April 2026 – Present",
      type: "Full-Time",
      description: "Contribute to frontend architecture, backend REST APIs, authentication security, and interactive 3D visualization for production-grade applications.",
      bullets: [
        "Developed and maintained production-grade MERN applications for multiple client projects.",
        "Built reusable React components and scalable frontend modules.",
        "Designed and integrated REST APIs across admin and customer-facing applications.",
        "Implemented secure authentication and authorization workflows.",
        "Integrated payment gateways including PayPal and Braintree.",
        "Worked on advanced product customization using React, Three.js, and GLB models.",
        "Collaborated with designers, QA engineers, and backend developers to deliver production-ready features."
      ],
      tech: ["React", "Node.js", "Express", "Three.js", "MongoDB", "MySQL", "PayPal", "Braintree"]
    },
    {
      title: "Software Engineer Intern",
      company: "Webmobril Inc.",
      period: "October 2025 – April 2026",
      type: "Internship",
      description: "Supported frontend layout development, refactored static modules, and assisted with database migrations.",
      bullets: [
        "Created responsive page layouts based on UI design requirements.",
        "Refactored complex styling systems into reusable inline component states.",
        "Helped integrate REST APIs and relational database tables during sprint releases."
      ],
      tech: ["JavaScript", "React", "Node.js", "HTML5", "CSS3", "Git"]
    }
  ];

  return (
    <section id="experience" className="relative py-20 md:py-32 bg-slate-50 border-t border-slate-200/50 overflow-hidden">
      
      {/* Floating 3D-like Orbital Rings */}
      <div className="absolute right-12 bottom-1/4 pointer-events-none select-none opacity-20 hidden lg:block">
        <motion.svg 
          width="140" height="140" viewBox="0 0 140 140"
          animate={{ rotate: -360, y: [0, 18, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        >
          <circle cx="70" cy="70" r="60" fill="none" stroke="#f43f5e" strokeWidth="1" strokeDasharray="6, 6" />
          <circle cx="70" cy="70" r="40" fill="none" stroke="#8b5cf6" strokeWidth="1.5" />
          <ellipse cx="70" cy="70" rx="60" ry="20" fill="none" stroke="#2563eb" strokeWidth="1" />
        </motion.svg>
      </div>

      {/* Floating Watermark Doodles */}
      <motion.div 
        animate={{ y: [0, 10, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-10 top-16 text-slate-350/30 text-3xl pointer-events-none select-none hidden lg:block"
      >
        <FaServer />
      </motion.div>

      <motion.div 
        animate={{ y: [0, -10, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute right-20 top-12 text-slate-350/30 text-3xl pointer-events-none select-none hidden lg:block"
      >
        <FaCode />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="mb-12 md:mb-16">
          <span className="font-sans text-[13px] text-blue-600 uppercase tracking-wider block mb-4 font-semibold">
            EXPERIENCE
          </span>
          <h2 className="text-[32px] sm:text-[40px] md:text-[48px] font-bold tracking-tighter leading-[1.08] text-slate-900 font-display">
            Professional <span className="text-violet-500/70 font-normal">Experience</span>
          </h2>
          <p className="max-w-xl text-[18px] text-slate-500 mt-4 leading-relaxed font-normal">
            Career growth at Webmobril Inc., transitioning from internships to shipping full-stack client integrations.
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="relative pl-8 md:pl-12 space-y-12">
          
          {/* Animated Track Line */}
          <motion.div 
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, ease: "easeInOut" }}
            className="absolute left-0 top-2 bottom-2 w-[1px] bg-slate-200 origin-top"
          />

          {roles.map((role, idx) => (
            <motion.div
              key={role.title + role.period}
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 + 0.2 }}
              className="relative"
            >
              {/* Animated Dot */}
              <motion.span 
                initial={{ y: -80, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  type: "spring", 
                  stiffness: 70, 
                  damping: 11, 
                  delay: idx * 0.35 + 0.3 
                }}
                className="absolute -left-[38px] md:-left-[54px] top-1.5 w-3 h-3 rounded-full bg-blue-600 border border-slate-50 ring-4 ring-blue-600/10 z-10"
              />
              
              {/* Role Detail Card */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Meta Information */}
                <div className="lg:col-span-4">
                  <span className="font-mono text-[12px] text-slate-400 font-semibold uppercase tracking-wider">{role.period}</span>
                  <h3 className="text-lg font-sans text-slate-900 font-bold mt-1">
                    {role.title}
                  </h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-sm text-slate-500 font-sans">{role.company}</span>
                    <span className="h-1 w-1 rounded-full bg-slate-400"></span>
                    <span className="text-[11px] font-mono text-blue-600 uppercase tracking-wider bg-blue-50 border border-blue-100 px-2 py-0.5 rounded font-semibold">
                      {role.type}
                    </span>
                  </div>
                </div>

                {/* Bullets & Achievements */}
                <div className="lg:col-span-8 space-y-4">
                  <p className="text-sm text-slate-600 font-normal leading-relaxed max-w-[760px]">
                    {role.description}
                  </p>
                  <ul className="space-y-2">
                    {role.bullets.map((bullet, bIdx) => (
                      <li 
                        key={bIdx}
                        className="text-[15px] text-slate-500 font-normal leading-relaxed flex items-start"
                      >
                        <span className="text-blue-600 mr-2.5 mt-1 select-none font-mono text-xs">↳</span>
                        <span className="flex-1 max-w-[760px]">{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Technology Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {role.tech.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-mono text-slate-600 bg-white border border-slate-200 px-2.5 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
