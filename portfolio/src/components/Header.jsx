import React, { useState, useEffect } from "react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: "About", href: "#about" },
    { label: "Highlights", href: "#highlights" },
    { label: "Skills", href: "#skills" },
    { label: "Services", href: "#services" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      const offset = 80; // height of floating header
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 border-b border-slate-200/50 backdrop-blur-premium py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#"
          onClick={(e) => handleNavClick(e, "#")}
          className="font-sans text-xl tracking-tight text-slate-900 hover:text-blue-600 transition-colors duration-200 font-extrabold"
        >
          vasu<span className="font-signature text-blue-600 font-normal italic lowercase">_developer</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="text-[13px] font-sans font-medium text-slate-600 hover:text-blue-600 transition-colors duration-200"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, "#contact")}
            className="px-4 py-1.5 border border-slate-200 hover:border-slate-350 text-[13px] font-sans font-medium text-slate-800 rounded-lg transition-colors duration-200"
          >
            Get in Touch
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex flex-col justify-between w-5 h-4 focus:outline-none"
          aria-label="Toggle Menu"
        >
          <span
            className={`h-[1px] w-full bg-slate-900 transition-transform duration-200 ${
              mobileMenuOpen ? "rotate-45 translate-y-[7.5px]" : ""
            }`}
          ></span>
          <span
            className={`h-[1px] w-full bg-slate-900 transition-opacity duration-200 ${
              mobileMenuOpen ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`h-[1px] w-full bg-slate-900 transition-transform duration-200 ${
              mobileMenuOpen ? "-rotate-45 -translate-y-[7.5px]" : ""
            }`}
          ></span>
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-0 top-[60px] bg-white border-b border-slate-200 p-6 flex flex-col space-y-6 md:hidden shadow-lg shadow-slate-100/50">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="text-sm font-sans font-medium text-slate-600 hover:text-blue-600 transition-colors duration-200"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, "#contact")}
            className="w-full text-center py-2.5 border border-slate-200 text-sm font-sans font-medium text-slate-800 rounded-lg hover:border-slate-300"
          >
            Get in Touch
          </a>
        </div>
      )}
    </header>
  );
}
