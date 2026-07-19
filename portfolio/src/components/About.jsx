import React from "react";
import { motion } from "framer-motion";
import { FaBookOpen, FaPencilAlt } from "react-icons/fa";

export default function About() {
  return (
    <section id="about" className="relative py-20 md:py-32 bg-slate-50 border-t border-slate-200/50 overflow-hidden">
      
      {/* Floating 3D Vector Ring in background */}
      <div className="absolute right-10 top-1/4 pointer-events-none select-none opacity-20 hidden lg:block">
        <motion.svg 
          width="120" height="120" viewBox="0 0 120 120"
          animate={{ rotate: 360, y: [0, 15, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        >
          <circle cx="60" cy="60" r="50" fill="none" stroke="#6366f1" strokeWidth="1" strokeDasharray="4, 4" />
          <ellipse cx="60" cy="60" rx="30" ry="50" fill="none" stroke="#2563eb" strokeWidth="1.5" />
        </motion.svg>
      </div>

      {/* Floating watermark doodles (WhatsApp chat style) */}
      <motion.div 
        animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-10 top-12 text-slate-300/40 text-3xl pointer-events-none select-none hidden lg:block"
      >
        <FaBookOpen />
      </motion.div>

      <motion.div 
        animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute right-16 bottom-16 text-slate-350/40 text-3xl pointer-events-none select-none hidden lg:block"
      >
        <FaPencilAlt />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
        
        {/* Left Column: Heading and Asymmetric Label */}
        <div className="lg:col-span-4 flex flex-col justify-start space-y-4">
          <span className="font-sans text-[13px] text-blue-600 uppercase tracking-wider font-semibold">
            ABOUT
          </span>
          <h2 className="text-[32px] sm:text-[40px] md:text-[48px] font-bold tracking-tighter leading-[1.08] text-slate-900 font-display">
            Engineering <br className="hidden sm:block" />
            <span className="text-violet-500/70 font-normal">Philosophy</span>
          </h2>
        </div>

        {/* Right Column: Bio Content */}
        <div className="lg:col-span-8 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6 text-slate-600 font-normal text-[18px] leading-relaxed max-w-[760px]"
          >
            <p>
              I started building web applications during college and gradually moved from academic projects to production software. 
              Today I work on MERN applications where I contribute to frontend architecture, backend APIs, authentication systems, 
              payment integrations, and interactive product customization. I enjoy solving practical engineering problems while keeping 
              code maintainable and user experiences intuitive.
            </p>
          </motion.div>

          {/* Core Values / Focus Area */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-slate-200 max-w-[760px]">
            <div>
              <h3 className="font-sans text-[13px] text-slate-900 uppercase tracking-wider mb-2 font-semibold">
                Frontend Architecture
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed font-normal">
                Structuring complex application state, rendering paths, and loading pipelines to create highly performant and accessible browser layouts.
              </p>
            </div>
            <div>
              <h3 className="font-sans text-[13px] text-slate-900 uppercase tracking-wider mb-2 font-semibold">
                API Design & Integrations
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed font-normal">
                Authoring predictable REST endpoints, indexing query engines, and coordinating secure authentication layers (JWT, cookies) and checkout webhooks.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
