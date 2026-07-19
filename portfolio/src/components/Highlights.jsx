import React from "react";
import { motion } from "framer-motion";
import { 
  FaServer, FaLock, FaCreditCard, FaCube, 
  FaChartBar, FaSlidersH, FaExchangeAlt, FaLink,
  FaCog, FaRegLightbulb
} from "react-icons/fa";

export default function Highlights() {
  const highlightsList = [
    {
      title: "MERN Development",
      description: "Building dynamic, database-backed web architectures using MongoDB, Express, React, and Node.js.",
      icon: <FaServer className="text-blue-600 text-lg" />
    },
    {
      title: "REST API Design",
      description: "Developing structured, documented endpoint routers for client-server communication networks.",
      icon: <FaSlidersH className="text-blue-600 text-lg" />
    },
    {
      title: "Authentication & RBAC",
      description: "Configuring secure JWT keys, cookie-based sessions, and role-based access control (RBAC) levels.",
      icon: <FaLock className="text-blue-600 text-lg" />
    },
    {
      title: "Payment Integration",
      description: "Connecting payment channels and setting up secure webhook transactions for e-commerce.",
      icon: <FaCreditCard className="text-blue-600 text-lg" />
    },
    {
      title: "3D Product Customization",
      description: "Building canvas interfaces using Three.js and R3F to customize apparel and products in 3D.",
      icon: <FaCube className="text-blue-600 text-lg" />
    },
    {
      title: "Admin Dashboards",
      description: "Engineering data tables, filter operations, and visualization screens for internal managers.",
      icon: <FaChartBar className="text-blue-600 text-lg" />
    },
    {
      title: "Performance Optimization",
      description: "Configuring dynamic component loading and asset bundles to maintain responsive scroll performance.",
      icon: <FaExchangeAlt className="text-blue-600 text-lg" />
    },
    {
      title: "Third-Party API Integration",
      description: "Coordinating data feeds, notifications, and verification engines with external software endpoints.",
      icon: <FaLink className="text-blue-600 text-lg" />
    }
  ];

  return (
    <section id="highlights" className="relative py-20 md:py-32 bg-white border-t border-slate-200/50 overflow-hidden">
      
      {/* Floating Watermark Doodles */}
      <motion.div 
        animate={{ y: [0, 8, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-8 top-1/3 text-slate-200/60 text-4xl pointer-events-none select-none hidden lg:block"
      >
        <FaCog />
      </motion.div>

      <motion.div 
        animate={{ y: [0, -8, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute right-12 bottom-1/4 text-slate-200/60 text-4xl pointer-events-none select-none hidden lg:block"
      >
        <FaRegLightbulb />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="mb-12 md:mb-16">
          <span className="font-sans text-[13px] text-blue-600 uppercase tracking-wider block mb-4 font-semibold">
            CAPABILITIES
          </span>
          <h2 className="text-[32px] sm:text-[40px] md:text-[48px] font-bold tracking-tighter leading-[1.08] text-slate-900 font-display">
            Professional <span className="text-violet-500/70 font-normal">Highlights</span>
          </h2>
          <p className="max-w-xl text-[18px] text-slate-500 mt-4 leading-relaxed font-normal">
            An overview of the software engineering operations and technical components I regularly implement.
          </p>
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 [perspective:800px]">
          {highlightsList.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ y: -6, rotateX: 3, rotateY: -3, scale: 1.01 }}
              style={{ transformStyle: "preserve-3d" }}
              className="p-6 bg-white border border-slate-200/60 shadow-sm shadow-slate-100/50 rounded-xl flex flex-col justify-between group hover:border-slate-300 hover:shadow-md transition-all duration-300 cursor-pointer"
            >
              <div>
                <div className="mb-4 p-2.5 bg-slate-50 border border-slate-100 rounded-lg w-fit group-hover:border-blue-600/20 transition-all duration-300">
                  {item.icon}
                </div>
                <h3 className="text-[24px] font-bold font-display text-slate-900 mb-2 tracking-tight leading-snug">
                  {item.title}
                </h3>
                <p className="text-sm font-normal text-slate-500 leading-relaxed mt-2">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
