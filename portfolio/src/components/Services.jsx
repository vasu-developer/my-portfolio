import React from "react";
import { motion } from "framer-motion";
import { FaLaptopCode, FaMobileAlt, FaDraftingCompass, FaRegEdit, FaArrowRight } from "react-icons/fa";

export default function Services() {
  const servicesList = [
    {
      title: "Custom Web Applications",
      description: "Developing robust, database-backed web portals and SaaS platforms using the full MERN stack (MongoDB, Express, React, Node.js).",
      icon: <FaLaptopCode className="text-blue-600 text-xl" />,
      tag: "MERN Stack / REST APIs"
    },
    {
      title: "Mobile App Development",
      description: "Building cross-platform Android and iOS applications with smooth performance, clean layouts, and hardware integration.",
      icon: <FaMobileAlt className="text-blue-600 text-xl" />,
      tag: "React Native / Android Studio"
    },
    {
      title: "Premium Portfolios & Landing Pages",
      description: "Crafting distinct digital presence designs for builders and products featuring interactive 3D structures and smooth layout animations.",
      icon: <FaDraftingCompass className="text-blue-600 text-xl" />,
      tag: "Three.js / Framer Motion / GSAP"
    },
    {
      title: "Blogs & CMS Platforms",
      description: "Engineering speed-optimized blog sites, writing spaces, and content systems with custom SEO indexing setups.",
      icon: <FaRegEdit className="text-blue-600 text-xl" />,
      tag: "Next.js / Node.js / Headless CMS"
    }
  ];

  const handleScrollToContact = (e) => {
    e.preventDefault();
    const target = document.querySelector("#contact");
    if (target) {
      const offset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <section id="services" className="relative py-20 md:py-32 bg-slate-50 border-t border-slate-200/50 overflow-hidden">
      
      {/* Floating Background Doodles */}
      <motion.div 
        animate={{ y: [0, -8, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-8 top-1/4 text-slate-300/40 text-4xl pointer-events-none select-none hidden lg:block"
      >
        <FaLaptopCode />
      </motion.div>

      <motion.div 
        animate={{ y: [0, 8, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute right-12 bottom-1/4 text-slate-300/40 text-4xl pointer-events-none select-none hidden lg:block"
      >
        <FaMobileAlt />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="mb-12 md:mb-16">
          <span className="font-sans text-[13px] text-blue-600 uppercase tracking-wider block mb-4 font-semibold">
            SERVICES
          </span>
          <h2 className="text-[32px] sm:text-[40px] md:text-[48px] font-bold tracking-tighter leading-[1.08] text-slate-900 font-display">
            Freelance <span className="text-violet-500/70 font-normal">Services</span>
          </h2>
          <p className="max-w-xl text-[18px] text-slate-500 mt-4 leading-relaxed font-normal">
            Technical services I provide, building responsive apps, interactive websites, and content portals.
          </p>
        </div>

        {/* Services Grid with 3D perspective */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 [perspective:800px]">
          {servicesList.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ y: -6, rotateX: 3, rotateY: -3, scale: 1.01 }}
              style={{ transformStyle: "preserve-3d" }}
              className="p-6 bg-white border border-slate-200/60 shadow-sm shadow-slate-100/50 rounded-xl flex flex-col justify-between group hover:border-slate-300 hover:shadow-md transition-all duration-300 cursor-pointer"
            >
              <div>
                <div className="mb-4 p-2.5 bg-slate-50 border border-slate-100 rounded-lg w-fit">
                  {service.icon}
                </div>
                <h3 className="text-lg font-sans font-bold text-slate-900 mb-2 tracking-tight leading-snug">
                  {service.title}
                </h3>
                <p className="text-sm font-normal text-slate-500 leading-relaxed mt-2 mb-6">
                  {service.description}
                </p>
              </div>
              
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="font-mono text-[10px] text-slate-400 font-semibold tracking-wide uppercase">
                  {service.tag}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to action at bottom */}
        <div className="mt-16 text-center">
          <a
            href="#contact"
            onClick={handleScrollToContact}
            className="inline-flex items-center space-x-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-sans font-semibold tracking-wide rounded-xl shadow-md transition-all duration-200"
          >
            <span>Discuss a Project</span>
            <FaArrowRight className="text-xs" />
          </a>
        </div>

      </div>
    </section>
  );
}
