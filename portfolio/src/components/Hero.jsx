import React, { Suspense } from "react";
import { motion } from "framer-motion";
import resumePdf from "../assets/resume/Resume-20July.pdf";

const ThreeDScene = React.lazy(() => import("./ThreeDScene"));

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const handleScrollToProjects = (e) => {
    e.preventDefault();
    const target = document.querySelector("#projects");
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
    <section className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10">
        
        {/* Left Typography Block */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col justify-center space-y-5 text-left"
        >
          {/* Subtle Accent Tag */}
          <motion.div variants={itemVariants} className="flex items-center space-x-2">
            <span className="h-[1px] w-6 bg-blue-600"></span>
            <span className="font-sans text-[12px] text-blue-600 uppercase tracking-wider font-semibold">
              VASUDEV VERMA &bull; SOFTWARE ENGINEER
            </span>
          </motion.div>

          {/* Main Hero Header */}
          <motion.h1 
            variants={itemVariants}
            className="text-[38px] sm:text-[52px] md:text-[64px] font-extrabold tracking-tighter leading-[1.08] text-slate-900 font-display"
          >
            Building modern web applications with{" "}
            <span className="font-signature text-blue-600 font-normal">thoughtful</span> engineering and{" "}
            <span className="font-signature text-slate-400 font-normal">immersive</span> 3D experiences.
          </motion.h1>

          {/* Hero Paragraph */}
          <motion.p 
            variants={itemVariants}
            className="max-w-lg text-[16px] md:text-[18px] text-slate-600 leading-relaxed font-normal"
          >
            I am a full-stack engineer and mobile developer, recognized online as <strong className="font-semibold text-slate-900">vasu_developer</strong>. I build production MERN applications, React Native Android/iOS apps, and custom 3D web configurations.
          </motion.p>

          {/* Action Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-1">
            <a
              href="#projects"
              onClick={handleScrollToProjects}
              className="px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white text-sm font-sans font-semibold tracking-wide rounded-lg transition-all duration-200 shadow-sm"
            >
              View Projects
            </a>
            <a
              href={resumePdf}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 border border-slate-200 hover:border-slate-300 text-sm font-sans font-semibold tracking-wide rounded-lg text-slate-800 transition-all duration-200"
            >
              Download Resume
            </a>
          </motion.div>

          {/* Core Stats Grid */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-100"
          >
            <div>
              <div className="text-[24px] font-sans text-slate-900 font-bold">1+</div>
              <div className="text-[12px] text-slate-400 font-sans mt-1 uppercase tracking-wider leading-tight font-medium">
                Years Professional<br/>Experience
              </div>
            </div>
            <div>
              <div className="text-[24px] font-sans text-slate-900 font-bold">4+</div>
              <div className="text-[12px] text-slate-400 font-sans mt-1 uppercase tracking-wider leading-tight font-medium">
                Production<br/>Applications
              </div>
            </div>
            <div>
              <div className="text-[24px] font-sans text-slate-900 font-bold">15+</div>
              <div className="text-[12px] text-slate-400 font-sans mt-1 uppercase tracking-wider leading-tight font-medium">
                Production Features<br/>Delivered
              </div>
            </div>
            <div>
              <div className="text-[24px] font-sans text-slate-900 font-bold">10+</div>
              <div className="text-[12px] text-slate-400 font-sans mt-1 uppercase tracking-wider leading-tight font-medium">
                Core<br/>Technologies
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right 3D Visual Block */}
        <div className="lg:col-span-5 w-full h-full flex justify-center items-center">
          <Suspense fallback={
            <div className="w-10 h-10 border-2 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
          }>
            <ThreeDScene />
          </Suspense>
        </div>
      </div>

      {/* Decorative vertical coordinates overlay */}
      <div className="absolute right-8 bottom-8 hidden md:block select-none pointer-events-none">
        <span className="font-mono text-[10px] text-slate-300 tracking-widest vertical-rl">
          LAT 28.6139° N / LONG 77.2090° E
        </span>
      </div>
    </section>
  );
}
