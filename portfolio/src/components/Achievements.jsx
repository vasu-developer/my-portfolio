import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaCode, FaHackerrank, FaTerminal } from "react-icons/fa";

export default function Achievements() {
  const cards = [
    {
      title: "HackerRank",
      badge: "4★ Java & C",
      desc: "Earned 4 stars in programming proficiency across Java and C language tracks.",
      url: "https://www.hackerrank.com/profile/vasudevverma0786",
      icon: <FaHackerrank className="text-green-600 text-lg" />
    },
    {
      title: "LeetCode",
      badge: "Actively solving DSA problems",
      desc: "Regularly solving data structures and algorithms questions to optimize logic execution.",
      url: "https://leetcode.com/u/vasu_developer/",
      icon: <FaCode className="text-orange-500 text-lg" />
    },
    {
      title: "CodeChef",
      badge: "100-Day Coding Streak",
      desc: "Maintained a continuous daily problem-solving streak, validating discipline and logical consistency.",
      url: "https://www.codechef.com/users/vasu_developer",
      icon: <FaTerminal className="text-amber-500 text-lg" />
    },
    {
      title: "GitHub",
      badge: "Production & Personal Projects",
      desc: "Hosting active codebase iterations, custom templates, and architectural drafts.",
      url: "https://github.com/vasu-developer",
      icon: <FaGithub className="text-slate-800 text-lg" />
    }
  ];

  return (
    <section id="achievements" className="relative py-20 md:py-32 bg-white border-t border-slate-200/50">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="mb-12 md:mb-16">
          <span className="font-sans text-[13px] text-blue-600 uppercase tracking-wider block mb-4 font-semibold">
            CREDENTIALS
          </span>
          <h2 className="text-[32px] sm:text-[40px] md:text-[48px] font-bold tracking-tighter leading-[1.08] text-slate-900 font-display">
            Achievements & <span className="text-violet-500/70 font-normal">Credentials</span>
          </h2>
          <p className="max-w-xl text-[18px] text-slate-500 mt-4 leading-relaxed font-normal">
            Competitive coding milestones, platform tracks, and active repository indicators.
          </p>
        </div>

        {/* Credentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 [perspective:800px]">
          {cards.map((card, idx) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              whileHover={{ y: -6, rotateX: 3, rotateY: -3, scale: 1.01 }}
              style={{ transformStyle: "preserve-3d" }}
              className="p-6 bg-white border border-slate-200/60 shadow-sm shadow-slate-100/50 rounded-xl flex flex-col justify-between group hover:border-slate-300 hover:shadow-md transition-all duration-300 cursor-pointer"
            >
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-lg w-fit">
                    {card.icon}
                  </div>
                  <span className="text-[11px] font-mono text-blue-600 uppercase tracking-wide bg-blue-50 border border-blue-100 px-2 py-0.5 rounded font-semibold">
                    {card.badge}
                  </span>
                </div>
                <h3 className="text-[18px] font-sans font-bold text-slate-900 mb-2 tracking-tight leading-snug">
                  {card.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed font-normal mb-6">
                  {card.desc}
                </p>
              </div>

              <a
                href={card.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-sans font-medium text-slate-500 hover:text-slate-900 flex items-center space-x-1.5 transition-colors duration-200"
              >
                <span>View Profile</span>
                <span className="text-[10px]">→</span>
              </a>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
