import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

export default function Contact() {
  const ACCESS_KEY = "210faed1-d647-4d18-aba5-eed140455076";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState({
    loading: false,
    success: null,
    error: null
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: null, error: null });

    const submitData = new FormData(e.target);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: submitData,
      });

      const json = await res.json();

      if (json.success) {
        setStatus({
          loading: false,
          success: "Your message has been sent successfully. I will get back to you shortly. ✨",
          error: null
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus({
          loading: false,
          success: null,
          error: json.message || "Something went wrong. Please try again."
        });
      }
    } catch (err) {
      setStatus({
        loading: false,
        success: null,
        error: "A network error occurred. Please try again later."
      });
    }
  };

  return (
    <section id="contact" className="py-20 md:py-32 bg-gradient-to-br from-white via-slate-50/50 to-blue-50/20 border-t border-slate-200/50">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
        
        {/* Left Column: Availabilities & Copy */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
          <div>
            <span className="font-sans text-[13px] text-blue-600 uppercase tracking-wider block mb-4 font-semibold">
              CONTACT
            </span>
            <h2 className="text-[32px] sm:text-[40px] md:text-[48px] font-bold tracking-tighter leading-[1.08] text-slate-900 font-display">
              Let's Build <br />
              <span className="text-violet-500/70 font-normal">Something Together</span>
            </h2>
            <p className="max-w-md text-sm md:text-[15px] text-slate-600 mt-4 leading-relaxed font-normal">
              Currently working as a Software Engineer and always open to discussing exciting engineering opportunities, collaborations, and innovative product ideas.
            </p>
          </div>

          {/* Quick Info Badges */}
          <div className="space-y-4">
            <h4 className="font-sans text-[13px] text-slate-900 uppercase tracking-wider font-semibold">
              Work Profile
            </h4>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center space-x-1.5 text-sm font-sans font-medium text-slate-600 bg-white border border-slate-200/60 shadow-sm shadow-slate-100/50 px-3 py-1.5 rounded-lg">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse"></span>
                <span>Permanent Engineer</span>
              </span>
              <span className="inline-flex items-center space-x-1.5 text-sm font-sans font-medium text-slate-600 bg-white border border-slate-200/60 shadow-sm shadow-slate-100/50 px-3 py-1.5 rounded-lg">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600"></span>
                <span>Open for Collaboration</span>
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7">
          <form onSubmit={handleSubmit} className="space-y-6">
            <input type="hidden" name="access_key" value={ACCESS_KEY} />

            {/* Name Input */}
            <div className="flex flex-col space-y-2">
              <label htmlFor="name" className="font-sans text-[13px] text-slate-900 uppercase tracking-wider font-semibold">
                Your Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full bg-white border border-slate-200 hover:border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none rounded-xl p-3.5 text-sm text-slate-900 placeholder-slate-400 shadow-sm shadow-slate-100/30 transition-all duration-200"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            {/* Email Input */}
            <div className="flex flex-col space-y-2">
              <label htmlFor="email" className="font-sans text-[13px] text-slate-900 uppercase tracking-wider font-semibold">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full bg-white border border-slate-200 hover:border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none rounded-xl p-3.5 text-sm text-slate-900 placeholder-slate-400 shadow-sm shadow-slate-100/30 transition-all duration-200"
                placeholder="yourname@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* Message Textarea */}
            <div className="flex flex-col space-y-2">
              <label htmlFor="message" className="font-sans text-[13px] text-slate-900 uppercase tracking-wider font-semibold">
                Project Details
              </label>
              <textarea
                id="message"
                name="message"
                rows="5"
                required
                className="w-full bg-white border border-slate-200 hover:border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none rounded-xl p-3.5 text-sm text-slate-900 placeholder-slate-400 shadow-sm shadow-slate-100/30 transition-all duration-200 resize-none"
                placeholder="Describe your project requirements, team specifications, or timeline details..."
                value={formData.message}
                onChange={handleChange}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status.loading}
              className="w-full md:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-sans font-semibold tracking-wide rounded-xl shadow-sm hover:shadow transition-all duration-200 cursor-pointer disabled:opacity-50"
            >
              <span>{status.loading ? "Sending..." : "Send Message"}</span>
              <FaPaperPlane className="text-[10px]" />
            </button>

            {/* Feedback Message */}
            {status.success && (
              <p className="text-sm font-sans text-emerald-600 bg-emerald-50 border border-emerald-100 p-3 rounded-lg font-medium">
                {status.success}
              </p>
            )}
            {status.error && (
              <p className="text-sm font-sans text-rose-600 bg-rose-50 border border-rose-100 p-3 rounded-lg font-medium">
                {status.error}
              </p>
            )}
          </form>
        </div>

      </div>
    </section>
  );
}
