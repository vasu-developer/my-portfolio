import React from "react";
import { FaGithub, FaLinkedin, FaInstagram, FaWhatsapp, FaCode, FaHackerrank, FaTerminal } from "react-icons/fa";

export default function Footer() {
  const socialLinks = [
    { name: "GitHub", url: "https://github.com/vasu-developer", icon: <FaGithub /> },
    { name: "LinkedIn", url: "https://linkedin.com/in/vasu-developer", icon: <FaLinkedin /> },
    { name: "LeetCode", url: "https://leetcode.com/u/vasu_developer/", icon: <FaCode /> },
    { name: "HackerRank", url: "https://www.hackerrank.com/profile/vasudevverma0786", icon: <FaHackerrank /> },
    { name: "CodeChef", url: "https://www.codechef.com/users/vasu_developer", icon: <FaTerminal /> },
    { name: "Instagram", url: "https://instagram.com/vasu_developer", icon: <FaInstagram /> },
    { name: "WhatsApp", url: "https://wa.me/919528539285", icon: <FaWhatsapp /> }
  ];

  return (
    <footer className="bg-white border-t border-slate-200/50 py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Thoughtful Engineering Footnote */}
        <div className="text-center md:text-left space-y-1">
          <span className="font-sans text-xl tracking-tight text-slate-900 font-extrabold">
            vasu<span className="font-signature text-blue-600 font-normal italic lowercase">_developer</span>
          </span>
          <p className="text-xs text-slate-500 font-normal font-mono">
            Built with React, Three.js, and a focus on thoughtful engineering.
          </p>
          <p className="text-[10px] text-slate-450 font-normal">
            &copy; {new Date().getFullYear()} Vasudev Verma (vasu_developer). All rights reserved.
          </p>
        </div>

        {/* Social Icons Links */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-slate-900 text-lg transition-colors duration-200"
              title={social.name}
            >
              {social.icon}
            </a>
          ))}
        </div>

      </div>
    </footer>
  );
}
