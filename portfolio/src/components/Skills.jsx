import React from "react";
import { motion } from "framer-motion";
import { 
  SiJavascript, SiTypescript, SiReact, SiNextdotjs, SiTailwindcss, 
  SiNodedotjs, SiExpress, SiNestjs, SiMongodb, SiPostgresql, 
  SiMysql, SiThreedotjs, SiGit 
} from "react-icons/si";
import { FaJava, FaPython, FaAws, FaDatabase, FaTerminal } from "react-icons/fa";

export default function Skills() {
  const categories = [
    {
      title: "Languages",
      skills: [
        { name: "JavaScript", icon: <SiJavascript /> },
        { name: "TypeScript", icon: <SiTypescript /> },
        { name: "Java", icon: <FaJava /> },
        { name: "Python", icon: <FaPython /> },
      ],
    },
    {
      title: "Frontend",
      skills: [
        { name: "React & React Native", icon: <SiReact /> },
        { name: "Next.js", icon: <SiNextdotjs /> },
        { name: "Tailwind CSS", icon: <SiTailwindcss /> },
      ],
    },
    {
      title: "Backend",
      skills: [
        { name: "Node.js", icon: <SiNodedotjs /> },
        { name: "Express", icon: <SiExpress /> },
        { name: "NestJS", icon: <SiNestjs /> },
      ],
    },
    {
      title: "Database",
      skills: [
        { name: "PostgreSQL", icon: <SiPostgresql /> },
        { name: "MySQL", icon: <SiMysql /> },
        { name: "MongoDB", icon: <SiMongodb /> },
      ],
    },
    {
      title: "API Integration",
      skills: [
        { name: "RESTful APIs", icon: null },
        { name: "JWT Authentication", icon: null },
        { name: "Payment Processing", icon: null },
      ],
    },
    {
      title: "3D Development",
      skills: [
        { name: "Three.js", icon: <SiThreedotjs /> },
        { name: "R3F & Drei", icon: null },
        { name: "Custom Shaders", icon: null },
      ],
    },
    {
      title: "Tools & Platforms",
      skills: [
        { name: "Git & GitHub", icon: <SiGit /> },
        { name: "AWS Cloud Services", icon: <FaAws /> },
        { name: "Vercel / Render", icon: null },
      ],
    },
  ];

  return (
    <section id="skills" className="relative py-20 md:py-32 bg-white border-t border-slate-200/50 overflow-hidden">
      
      {/* Floating 3D-like Cube Wireframe */}
      <div className="absolute left-6 bottom-10 pointer-events-none select-none opacity-15 hidden lg:block">
        <motion.svg 
          width="100" height="100" viewBox="0 0 100 100"
          animate={{ rotateX: 360, rotateY: 360, y: [0, -12, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <rect x="20" y="20" width="60" height="60" fill="none" stroke="#8b5cf6" strokeWidth="1" />
          <rect x="35" y="35" width="60" height="60" fill="none" stroke="#3b82f6" strokeWidth="1" className="opacity-60" />
          <line x1="20" y1="20" x2="35" y2="35" stroke="#8b5cf6" strokeWidth="1" />
          <line x1="80" y1="20" x2="95" y2="35" stroke="#8b5cf6" strokeWidth="1" />
          <line x1="20" y1="80" x2="35" y2="95" stroke="#8b5cf6" strokeWidth="1" />
          <line x1="80" y1="80" x2="95" y2="95" stroke="#8b5cf6" strokeWidth="1" />
        </motion.svg>
      </div>

      {/* Floating Watermark Doodles */}
      <motion.div 
        animate={{ y: [0, -9, 0], rotate: [0, -7, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-12 top-12 text-slate-200/60 text-3xl pointer-events-none select-none hidden lg:block"
      >
        <FaDatabase />
      </motion.div>

      <motion.div 
        animate={{ y: [0, 9, 0], rotate: [0, 7, 0] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute left-20 top-20 text-slate-200/60 text-3xl pointer-events-none select-none hidden lg:block"
      >
        <FaTerminal />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="mb-12 md:mb-16">
          <span className="font-sans text-[13px] text-blue-600 uppercase tracking-wider block mb-4 font-semibold">
            ENGINEERING STACK
          </span>
          <h2 className="text-[32px] sm:text-[40px] md:text-[48px] font-bold tracking-tighter leading-[1.08] text-slate-900 font-display">
            Technical <span className="text-violet-500/70 font-normal">Stack</span>
          </h2>
          <p className="max-w-xl text-[18px] text-slate-500 mt-4 leading-relaxed font-normal">
            A categorized overview of the technologies, libraries, and runtime frameworks I use to build scalable web applications.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 md:gap-8">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="space-y-4"
            >
              <h3 className="font-sans text-sm text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2 font-semibold">
                {cat.title}
              </h3>
              <ul className="space-y-2">
                {cat.skills.map((skill) => (
                  <li 
                    key={skill.name} 
                    className="flex items-center space-x-2.5 py-1 text-slate-500 text-sm font-normal hover:text-slate-900 transition-colors duration-200 group font-sans"
                  >
                    {skill.icon && (
                      <span className="text-slate-400 group-hover:text-blue-600 transition-colors duration-200">
                        {skill.icon}
                      </span>
                    )}
                    <span>{skill.name}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
