import React from "react";
import { motion } from "framer-motion";
import { FaExternalLinkAlt, FaLock, FaGlobe, FaDraftingCompass } from "react-icons/fa";

import project1Image from "../assets/images/project1.png"; // Desi Krishak
import genesisImage from "../assets/images/genesis_lumina_mock.png"; // Genesis Lumina
import project2Image from "../assets/images/project2.png"; // Letter Jacket Customizer
import auctionLeoImage from "../assets/images/auction_leo_mock.png"; // Auction Leo
import appsicalImage from "../assets/images/appsical_mock.png"; // Appsical
import medicoreImage from "../assets/images/medicore_mock.png"; // MediCore Pharma
import pulsepostImage from "../assets/images/pulsepost_mock.png"; // PulsePost AI Content

export default function Projects() {
  const projectsList = [
    {
      title: "Letter Jacket Customizer",
      category: "Full-Stack 3D Customizer",
      image: project2Image,
      isConfidential: false,
      liveUrl: "",
      details: {
        problem: "Schools needed an interactive, customizable platform for letter jackets and fleece products.",
        contribution: "Built React-based customization workflows, integrated backend APIs, implemented dynamic template rendering, and developed interactive Three.js product visualization.",
        techStack: ["React", "Node.js", "Express", "Three.js", "MySQL"],
        result: "Delivered a scalable customization experience supporting multiple product types and configurable design templates."
      }
    },
    {
      title: "Genesis Lumina",
      category: "Static Landing Web App",
      image: genesisImage,
      isConfidential: false,
      liveUrl: "https://genesis-lumina.com",
      details: {
        problem: "The brand needed a premium visual landing page with fast load times and interactive design presentation.",
        contribution: "Developed highly interactive layouts, configured custom Swiper sliders, and optimized scroll animation performance.",
        techStack: ["React", "Vite", "GSAP", "Swiper UI"],
        result: "Shipped a responsive landing experience loading in under 1.2s and executing smooth animation sequences."
      }
    },
    {
      title: "DesiKrishak",
      category: "Full-Stack Marketplace (MERN)",
      image: project1Image,
      isConfidential: false,
      liveUrl: "https://desikrishak.shop",
      details: {
        problem: "Farmers lacked a direct digital marketplace to showcase and sell organic inventory to consumers.",
        contribution: "Implemented dynamic catalog listing, integrated JWT-based login sessions, and designed secure shopping cart updates.",
        techStack: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
        result: "Deployed a MERN e-commerce setup that connects local farmers directly to active retail clients."
      }
    },
    {
      title: "Auction Leo",
      category: "Full-Stack Bidding & Property Website",
      image: auctionLeoImage,
      isConfidential: false,
      liveUrl: "",
      details: {
        problem: "Real estate sellers and bidders lacked a direct, synchronized digital auction catalog to trade properties with real-time feedback.",
        contribution: "Designed a full-stack booking framework, built robust property categorization tables, and implemented real-time auction triggers.",
        techStack: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
        result: "Shipped a property dealing and bidding portal with automated countdown states."
      }
    },
    {
      title: "Appsical",
      category: "Freelance UI Engineering",
      image: appsicalImage,
      isConfidential: false,
      liveUrl: "https://appsical.onrender.com/",
      details: {
        problem: "The organization required an official interactive portfolio system showing all components and services in a unified responsive layout.",
        contribution: "Developed and fully styled the complete component architecture and page templates from designer assets.",
        techStack: ["React", "CSS3", "Framer Motion", "Vite"],
        result: "Delivered on schedule with 100% client satisfaction, shipping a fully responsive corporate interface."
      }
    },
    {
      title: "MediCore Pharma",
      category: "Freelance UI Engineering",
      image: medicoreImage,
      isConfidential: false,
      liveUrl: "https://pharmacy-project-rust.vercel.app/",
      details: {
        problem: "The pharmaceutical division required a modern, highly visible, and secure visual showcase layout.",
        contribution: "Designed clean product displays, implemented tab navigation elements, and structured modular styling sections.",
        techStack: ["React", "Tailwind CSS", "Vite"],
        result: "Shipped on time to complete client satisfaction, optimizing load speed and structural accessibility."
      }
    },
    {
      title: "PulsePost AI Marketing",
      category: "Freelance UI Engineering",
      image: pulsepostImage,
      isConfidential: false,
      liveUrl: "https://ai-content-marketing-page.onrender.com/",
      details: {
        problem: "The SaaS platform needed a high-conversion marketing page displaying AI social media automation capabilities.",
        contribution: "Crafted highly interactive components, complex grid flows, and smooth hover state visuals.",
        techStack: ["React", "Tailwind CSS", "Vite"],
        result: "Delivered within the timeline to full client specifications and complete satisfaction."
      }
    },
    {
      title: "AI Content Automation Design",
      category: "Freelance UI Engineering",
      image: pulsepostImage,
      isConfidential: false,
      liveUrl: "https://ai-content-automation-design.onrender.com/",
      details: {
        problem: "The AI automation tool required a complete, multi-page layout design showcase demonstrating content generation stages.",
        contribution: "Coded clean UI inputs, platform select grids, and responsive outcome layouts matching high-fidelity previews.",
        techStack: ["React", "Tailwind CSS", "Vite"],
        result: "Completed on schedule with 100% client satisfaction, delivering modular layout components."
      }
    }
  ];

  return (
    <section id="projects" className="relative py-20 md:py-32 bg-white border-t border-slate-200/50 overflow-hidden">
      
      {/* Floating Watermark Doodles */}
      <motion.div 
        animate={{ y: [0, -10, 0], rotate: [0, -8, 0] }}
        transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-6 top-[40%] text-slate-200/50 text-4xl pointer-events-none select-none hidden lg:block"
      >
        <FaDraftingCompass />
      </motion.div>

      <motion.div 
        animate={{ y: [0, 10, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute right-8 top-[60%] text-slate-200/50 text-4xl pointer-events-none select-none hidden lg:block"
      >
        <FaGlobe />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="mb-16 md:mb-24">
          <span className="font-sans text-[13px] text-blue-600 uppercase tracking-wider block mb-4 font-semibold">
            06 / PROJECTS
          </span>
          <h2 className="text-[32px] sm:text-[40px] md:text-[48px] font-bold tracking-tighter leading-[1.08] text-slate-900 font-display">
            Featured <span className="text-violet-500/70 font-normal">Work</span>
          </h2>
          <p className="max-w-xl text-[18px] text-slate-500 mt-4 leading-relaxed font-normal">
            Engineering stories detailing the problems, contributions, stacks, and results of
            products I have developed.
          </p>
        </div>

        {/* Case Studies Container */}
        <div className="space-y-20 md:space-y-36">
          {projectsList.map((project, idx) => (
            <div
              key={project.title}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
            >

              {/* Left Column: Case Study Text Details */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="lg:col-span-7 flex flex-col justify-between space-y-6"
              >
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="font-mono text-xs uppercase text-slate-400 tracking-wider font-semibold">
                      {project.category}
                    </span>
                    {project.isConfidential && (
                      <span className="flex items-center space-x-1 text-[11px] font-mono text-amber-600 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded font-semibold">
                        <FaLock className="text-[8px]" /> <span>Confidential Production Project</span>
                      </span>
                    )}
                  </div>
                  <h3 className="text-[32px] font-bold font-display text-slate-900 tracking-tight mb-8">
                    {project.title}
                  </h3>

                  {/* simplified engineering story details */}
                  <div className="space-y-6 text-slate-600 font-normal">
                    <div>
                      <h4 className="font-sans text-[13px] text-blue-600 uppercase tracking-wider mb-2 font-semibold">Problem</h4>
                      <p className="text-[15px] leading-relaxed">{project.details.problem}</p>
                    </div>
                    <div>
                      <h4 className="font-sans text-[13px] text-blue-600 uppercase tracking-wider mb-2 font-semibold">My Contribution</h4>
                      <p className="text-[15px] leading-relaxed">{project.details.contribution}</p>
                    </div>
                    <div>
                      <h4 className="font-sans text-[13px] text-blue-600 uppercase tracking-wider mb-2 font-semibold">Result</h4>
                      <p className="text-[15px] leading-relaxed text-slate-800 font-medium">{project.details.result}</p>
                    </div>
                  </div>
                </div>

                {/* Tech Stack and Links */}
                <div className="pt-6 border-t border-slate-100 space-y-4">
                  <div className="flex flex-wrap gap-1.5">
                    {project.details.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-mono text-slate-600 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {!project.isConfidential && project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 text-xs font-mono text-slate-800 hover:text-blue-600 transition-colors duration-200 font-medium"
                    >
                      <span>Visit Live Website</span>
                      <FaExternalLinkAlt className="text-[10px]" />
                    </a>
                  )}
                </div>
              </motion.div>

              {/* Right Column: Case Study Graphic/Mockup */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.15 }}
                className="lg:col-span-5 flex items-center justify-center"
              >
                {project.image ? (
                  /* Premium Browser Mockup Wrapper */
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.3 }}
                    className="w-full bg-white border border-slate-200/80 shadow-lg shadow-slate-100/50 rounded-xl overflow-hidden group cursor-pointer"
                  >
                    {/* Browser Header / Control Dots */}
                    <div className="flex items-center px-4 py-3 bg-slate-50 border-b border-slate-200/40">
                      <div className="flex items-center space-x-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-slate-200"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-slate-200"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-slate-200"></span>
                      </div>
                      <div className="h-4 w-48 bg-white border border-slate-200/60 rounded text-[9px] text-slate-400 flex items-center justify-center font-mono mx-auto select-none overflow-hidden truncate">
                        {project.liveUrl !== "#" ? project.liveUrl.replace("https://", "") : "vasu_developer/workspace"}
                      </div>
                    </div>

                    {/* Screenshot Frame */}
                    <div className="aspect-[16/10] overflow-hidden bg-slate-50">
                      <img
                        loading="lazy"
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-[1.015] transition-transform duration-700 ease-out"
                      />
                    </div>
                  </motion.div>
                ) : (
                  /* Confidential Dashboard Block */
                  <div className="w-full aspect-[16/10] bg-slate-50/50 border border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center p-8 select-none shadow-sm">
                    <FaLock className="text-slate-400 text-3xl mb-4" />
                    <span className="font-mono text-xs text-slate-700 uppercase tracking-widest font-semibold">
                      Confidential Source Code
                    </span>
                    <span className="text-[10px] text-slate-500 font-light mt-2 text-center max-w-xs leading-relaxed">
                      Enterprise system built on private repository guidelines under Webmobril Inc. NDAs.
                    </span>
                  </div>
                )}
              </motion.div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
