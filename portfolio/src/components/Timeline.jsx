import React from "react";
import { motion } from "framer-motion";
import { FaBrain, FaRegCompass } from "react-icons/fa";

export default function Timeline() {
  const steps = [
    {
      title: "Promoted to Software Engineer (April 2026)",
      detail: "Promoted to full-time Software Engineer at Webmobril Inc. after six months of internship, owning MERN stack features."
    },
    {
      title: "Joined Webmobril Inc. (October 2025)",
      detail: "Began first professional role as a Software Engineer Intern, assisting with API integrations and reusable React layers."
    },
    {
      title: "Started Computer Science (2022)",
      detail: "Entered ABES Institute of Technology to study B.Tech in CSE (Data Science), building MERN web portals."
    },
    {
      title: "Completed Schooling (2021)",
      detail: "Completed intermediate classes at SGM Inter College, Fatehabad, Agra, developing strong interests in physics, mathematics, calculus, and chemistry."
    }
  ];

  return (
    <section id="timeline" className="relative py-20 md:py-32 bg-slate-50 border-t border-slate-200/50 overflow-hidden">
      
      {/* Floating Watermark Doodles */}
      <motion.div 
        animate={{ y: [0, -8, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 7.2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-8 top-1/4 text-slate-300/40 text-3xl pointer-events-none select-none hidden lg:block"
      >
        <FaBrain />
      </motion.div>

      <motion.div 
        animate={{ y: [0, 8, 0], rotate: [0, -8, 0] }}
        transition={{ duration: 6.8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute right-12 bottom-1/4 text-slate-300/40 text-3xl pointer-events-none select-none hidden lg:block"
      >
        <FaRegCompass />
      </motion.div>

      <div className="max-w-3xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="mb-12 md:mb-16 text-center md:text-left">
          <span className="font-sans text-[13px] text-blue-600 uppercase tracking-wider block mb-4 font-semibold">
            HISTORY
          </span>
          <h2 className="text-[32px] sm:text-[40px] md:text-[48px] font-bold tracking-tighter leading-[1.08] text-slate-900 font-display">
            Career <span className="text-violet-500/70 font-normal">Timeline</span>
          </h2>
          <p className="max-w-xl text-sm text-slate-500 mt-4 leading-relaxed font-normal">
            A linear progression detailing schooling, college studies, internships, and full-stack engineer roles.
          </p>
        </div>

        {/* Growth Track Timeline */}
        <div className="relative border-l border-slate-200 pl-8 ml-4 space-y-12">
          {steps.map((evt, idx) => (
            <motion.div
              key={evt.title}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="relative"
            >
              {/* Node Indicator */}
              <span className="absolute -left-[37px] top-1.5 w-2 h-2 rounded-full bg-blue-600 ring-4 ring-blue-600/10"></span>
              
              <h3 className="text-[15px] font-sans text-slate-900 tracking-wide font-semibold">
                {evt.title}
              </h3>
              <p className="text-sm text-slate-600 font-normal leading-relaxed mt-1">
                {evt.detail}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
