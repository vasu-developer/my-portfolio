import React, { useState } from "react";
import { motion } from "framer-motion";
import SnakeGame from "./games/SnakeGame";
import StackGame from "./games/StackGame";
import ZenGame from "./games/ZenGame";
import ConstellationLinker from "./games/ConstellationLinker";
import { FaGamepad } from "react-icons/fa";

export default function GameZone() {
  const [activeGame, setActiveGame] = useState("snake"); // 'snake', 'stack', 'zen', or 'linker'

  return (
    <section id="games" className="py-20 md:py-32 bg-slate-50 border-t border-slate-200/50 relative overflow-hidden">
      
      {/* Floating retro game style grid background details */}
      <div className="absolute left-1/4 bottom-10 pointer-events-none select-none opacity-[0.03] hidden lg:block">
        <div className="w-96 h-96 border-4 border-slate-950 rounded-full flex items-center justify-center">
          <div className="w-64 h-64 border-4 border-slate-950 rounded-full flex items-center justify-center">
            <div className="w-32 h-32 border-4 border-slate-950 rounded-full"></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Heading and Description */}
        <div className="lg:col-span-4 flex flex-col justify-start space-y-4">
          <span className="font-sans text-[13px] text-blue-600 uppercase tracking-wider font-semibold flex items-center gap-1.5">
            <FaGamepad className="text-[14px] text-indigo-500" /> Playground
          </span>
          <h2 className="text-[32px] sm:text-[40px] md:text-[48px] font-bold tracking-tighter leading-[1.08] text-slate-900 font-display">
            Feeling <br />
            <span className="text-violet-500/70 font-normal">Bored?</span>
          </h2>
          <p className="max-w-xs text-sm text-slate-500 mt-2 leading-relaxed font-normal">
            Take a quick break and play a game! Built entirely in the browser using HTML5 Canvas, React Three Fiber (3D), and custom synthesized sounds.
          </p>

          {/* Game Selection Buttons */}
          <div className="flex flex-col gap-2.5 pt-6 max-w-xs w-full">
            <motion.button
              whileHover={{ x: 4 }}
              onClick={() => setActiveGame("snake")}
              className={`w-full text-left px-4 py-3 rounded-2xl border font-sans text-sm font-semibold transition-all duration-350 flex items-center justify-between shadow-sm cursor-pointer ${
                activeGame === "snake"
                  ? "bg-white border-slate-350/80 text-slate-900 font-bold shadow-slate-200/50"
                  : "bg-slate-100/50 border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100"
              }`}
            >
              <div className="flex flex-col">
                <span className="text-[13px]">2D Retro Snake</span>
                <span className="text-[10px] text-slate-400 font-normal mt-0.5">Classic Nokia 3310 mockup</span>
              </div>
              <span className={`w-2.5 h-2.5 rounded-full ${
                activeGame === "snake" ? "bg-emerald-500 animate-pulse" : "bg-slate-300"
              }`}></span>
            </motion.button>

            <motion.button
              whileHover={{ x: 4 }}
              onClick={() => setActiveGame("stack")}
              className={`w-full text-left px-4 py-3 rounded-2xl border font-sans text-sm font-semibold transition-all duration-350 flex items-center justify-between shadow-sm cursor-pointer ${
                activeGame === "stack"
                  ? "bg-white border-slate-350/80 text-slate-900 font-bold shadow-slate-200/50"
                  : "bg-slate-100/50 border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100"
              }`}
            >
              <div className="flex flex-col">
                <span className="text-[13px]">2D Stack Builder</span>
                <span className="text-[10px] text-slate-400 font-normal mt-0.5">Physics slicing builder</span>
              </div>
              <span className={`w-2.5 h-2.5 rounded-full ${
                activeGame === "stack" ? "bg-cyan-500 animate-pulse" : "bg-slate-300"
              }`}></span>
            </motion.button>

            <motion.button
              whileHover={{ x: 4 }}
              onClick={() => setActiveGame("zen")}
              className={`w-full text-left px-4 py-3 rounded-2xl border font-sans text-sm font-semibold transition-all duration-350 flex items-center justify-between shadow-sm cursor-pointer ${
                activeGame === "zen"
                  ? "bg-white border-slate-350/80 text-slate-900 font-bold shadow-slate-200/50"
                  : "bg-slate-100/50 border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100"
              }`}
            >
              <div className="flex flex-col">
                <span className="text-[13px]">Zen Gravity Sandbox</span>
                <span className="text-[10px] text-slate-400 font-normal mt-0.5">Stress-relief physics & chimes</span>
              </div>
              <span className={`w-2.5 h-2.5 rounded-full ${
                activeGame === "zen" ? "bg-sky-500 animate-pulse" : "bg-slate-300"
              }`}></span>
            </motion.button>

            <motion.button
              whileHover={{ x: 4 }}
              onClick={() => setActiveGame("linker")}
              className={`w-full text-left px-4 py-3 rounded-2xl border font-sans text-sm font-semibold transition-all duration-350 flex items-center justify-between shadow-sm cursor-pointer ${
                activeGame === "linker"
                  ? "bg-white border-slate-350/80 text-slate-900 font-bold shadow-slate-200/50"
                  : "bg-slate-100/50 border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100"
              }`}
            >
              <div className="flex flex-col">
                <span className="text-[13px]">3D Constellation Linker</span>
                <span className="text-[10px] text-slate-400 font-normal mt-0.5">Stress-relief match connector</span>
              </div>
              <span className={`w-2.5 h-2.5 rounded-full ${
                activeGame === "linker" ? "bg-violet-500 animate-pulse" : "bg-slate-300"
              }`}></span>
            </motion.button>
          </div>
        </div>

        {/* Right Column: Game Viewport Render */}
        <div className="lg:col-span-8 flex justify-center items-center w-full">
          <motion.div
            key={activeGame}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="w-full flex justify-center"
          >
            {activeGame === "snake" && <SnakeGame />}
            {activeGame === "stack" && <StackGame />}
            {activeGame === "zen" && <ZenGame />}
            {activeGame === "linker" && <ConstellationLinker />}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
