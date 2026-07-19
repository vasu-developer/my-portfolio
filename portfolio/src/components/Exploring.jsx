import React from "react";
import { motion } from "framer-motion";

export default function Exploring() {
  const exploringList = [
    "Three.js & React Three Fiber",
    "3D Product Visualization",
    "Advanced React Patterns",
    "Scalable Frontend Architecture",
    "Modern UI Motion",
    "Performance Optimization"
  ];

  return (
    <section id="exploring" className="py-20 md:py-32 bg-slate-50 border-t border-slate-200/50">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Column: Title */}
        <div className="lg:col-span-4 flex flex-col justify-start space-y-4">
          <span className="font-sans text-[13px] text-blue-600 uppercase tracking-wider font-semibold">
            EXPLORATION
          </span>
          <h2 className="text-[32px] sm:text-[40px] md:text-[48px] font-bold tracking-tighter leading-[1.08] text-slate-900 font-display">
            Currently <br />
            <span className="text-violet-500/70 font-normal">Exploring</span>
          </h2>
          <p className="max-w-xs text-sm text-slate-500 mt-2 leading-relaxed font-normal">
            Active exploration tracks detailing advanced rendering paradigms and frontend software design patterns I study.
          </p>
        </div>

        {/* Right Column: Grid List */}
        <div className="lg:col-span-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {exploringList.map((item, idx) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="p-4 bg-white border border-slate-200/60 rounded-xl flex items-center space-x-3 group hover:border-slate-300 hover:shadow-sm shadow-slate-100/50 transition-all duration-300"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600 group-hover:scale-125 transition-transform duration-300"></span>
                <span className="text-[13px] font-sans font-semibold text-slate-700 tracking-wide group-hover:text-slate-900 transition-colors duration-300">
                  {item}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
