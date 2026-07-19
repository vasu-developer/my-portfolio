import React from "react";
import { motion } from "framer-motion";
import { FaGraduationCap } from "react-icons/fa";

export default function Education() {
  const educationList = [
    {
      degree: "Bachelor of Technology (B.Tech)",
      major: "Computer Science & Engineering (Data Science)",
      period: "2022 – 2026",
      institution: "ABES Institute of Technology",
      grade: "CGPA: 7.86",
      description: "Focused on database systems, core data structures and algorithms, operating systems, and machine learning models."
    },
    {
      degree: "Intermediate Schooling",
      major: "Science & Mathematics Track",
      period: "Completed 2021",
      institution: "SGM Inter College, Fatehabad, Agra",
      grade: "Class XII",
      description: "Developed strong foundational interests in physics, mathematics, calculus, and chemistry."
    }
  ];

  return (
    <section id="education" className="relative py-16 md:py-24 bg-white border-t border-slate-200/50 overflow-hidden">
      
      {/* Floating 3D-like Sphere Grid */}
      <div className="absolute right-16 top-10 pointer-events-none select-none opacity-15 hidden lg:block">
        <motion.svg 
          width="120" height="120" viewBox="0 0 120 120"
          animate={{ rotateY: 360, rotateX: 180, x: [0, 10, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <circle cx="60" cy="60" r="50" fill="none" stroke="#10b981" strokeWidth="1" />
          <ellipse cx="60" cy="60" rx="50" ry="20" fill="none" stroke="#6366f1" strokeWidth="1" />
          <ellipse cx="60" cy="60" rx="20" ry="50" fill="none" stroke="#f59e0b" strokeWidth="1" />
        </motion.svg>
      </div>

      {/* Floating Watermark Doodles */}
      <motion.div 
        animate={{ y: [0, -8, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-12 top-16 text-slate-200/50 text-4xl pointer-events-none select-none hidden lg:block"
      >
        <FaGraduationCap />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="mb-12 md:mb-16">
          <span className="font-sans text-[13px] text-blue-600 uppercase tracking-wider block mb-4 font-semibold">
            EDUCATION
          </span>
          <h2 className="text-[32px] sm:text-[40px] md:text-[48px] font-bold tracking-tighter leading-[1.08] text-slate-900 font-display">
            Academic <span className="text-violet-500/70 font-normal">Background</span>
          </h2>
          <p className="max-w-xl text-sm text-slate-500 mt-4 leading-relaxed font-normal">
            Formal university engineering studies and school profiles.
          </p>
        </div>

        {/* Education Details Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {educationList.map((edu, idx) => (
            <motion.div
              key={edu.degree + edu.period}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="p-8 bg-white border border-slate-200/60 shadow-sm shadow-slate-100/50 rounded-xl flex flex-col justify-between"
            >
              <div className="space-y-4">
                <span className="font-mono text-[12px] text-slate-400 font-semibold uppercase tracking-wider">{edu.period}</span>
                <div>
                  <h3 className="text-[24px] font-bold font-display text-slate-900 tracking-tight leading-snug">
                    {edu.degree}
                  </h3>
                  <p className="text-sm font-sans text-blue-600 mt-1 uppercase tracking-wider font-semibold">
                    {edu.major}
                  </p>
                  {edu.description && (
                    <p className="text-sm text-slate-500 leading-relaxed font-normal mt-3">
                      {edu.description}
                    </p>
                  )}
                </div>
                <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                  <span className="text-sm text-slate-500 font-normal">{edu.institution}</span>
                  <span className="text-sm font-sans text-slate-700 bg-slate-50 border border-slate-200/60 px-3 py-1 rounded font-medium">
                    {edu.grade}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
