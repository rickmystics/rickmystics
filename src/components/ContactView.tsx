import React, { useState } from "react";
import { Mail, Linkedin, Github, Trophy, Instagram, Send, ArrowRight } from "lucide-react";

export default function ContactView() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const subjectText = formData.subject || "Collaboration Inquiry from Website";
    const bodyText = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;

    // Standard mailto handling for direct, reliable client submissions
    const mailtoUrl = `mailto:sourikdas007@gmail.com?subject=${encodeURIComponent(
      subjectText
    )}&body=${encodeURIComponent(bodyText)}`;

    window.location.href = mailtoUrl;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const contacts = [
    {
      label: "Email",
      value: "sourikdas007@gmail.com",
      link: "mailto:sourikdas007@gmail.com",
      icon: <Mail size={16} className="text-[#C8A96E]" />,
    },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/sourik-das-6529ba322",
      link: "https://linkedin.com/in/sourik-das-6529ba322",
      icon: <Linkedin size={16} className="text-[#C8A96E]" />,
    },
    {
      label: "GitHub",
      value: "github.com/rickmystics",
      link: "https://github.com/rickmystics",
      icon: <Github size={16} className="text-[#C8A96E]" />,
    },
    {
      label: "LeetCode",
      value: "leetcode.com/u/rickmystics",
      link: "https://leetcode.com/u/rickmystics",
      icon: <Trophy size={16} className="text-[#C8A96E]" />,
    },
    {
      label: "Instagram",
      value: "@__rick.mystics__",
      link: "https://www.instagram.com/__rick.mystics__?igsh=MWo1b285ZGx6ZW5lZQ==",
      icon: <Instagram size={16} className="text-[#C8A96E]" />,
    },
  ];

  return (
    <div className="py-24 max-w-7xl mx-auto px-6 md:px-12 relative z-10">
      {/* Decorative large page background numeral */}
      <div className="absolute right-6 top-10 font-mono text-[180px] font-bold text-[#C8A96E]/5 leading-none select-none pointer-events-none">
        06
      </div>

      {/* Hero section */}
      <div className="space-y-4 mb-20">
        <span className="text-[#C8A96E] font-display text-[11px] uppercase tracking-[0.3em] font-medium block">
          — LET'S WORK TOGETHER
        </span>
        <h1 className="font-display text-4xl md:text-6xl font-extrabold tracking-tight">
          Let's Build Something <br />
          <span className="font-serif italic font-medium text-[#C8A96E]">That Matters.</span>
        </h1>
        <p className="text-[#888880] font-sans font-light text-base md:text-lg max-w-xl leading-relaxed">
          Whether it's a academic collaboration, internship inquiry, or just a strategic exchange—I'm always open to the right conversation.
        </p>
      </div>

      {/* AVAILABILITY STATUS PILL */}
      <div className="inline-flex items-center gap-3.5 px-4 py-2 border border-[#C8A96E]/15 bg-[#111] rounded-full mb-12 select-none">
        {/* Pulsing active green dot */}
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
        </span>
        <span className="font-display text-[10px] tracking-widest uppercase text-[#F2EDE4] font-medium leading-none">
          Currently open to internships, part-time roles & hackathons
        </span>
      </div>

      {/* Main Form + Info grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 items-start">
        {/* Left Column Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-7 bg-[#111] p-8 rounded-2xl border border-[#C8A96E]/15 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="font-display text-[10px] uppercase tracking-[0.2em] text-[#888880] block">
                Your Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full bg-[#0A0A0A] border border-[#C8A96E]/15 focus:border-[#C8A96E]/60 text-sm p-4 rounded text-[#F2EDE4] outline-none transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="font-display text-[10px] uppercase tracking-[0.2em] text-[#888880] block">
                Your Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className="w-full bg-[#0A0A0A] border border-[#C8A96E]/15 focus:border-[#C8A96E]/60 text-sm p-4 rounded text-[#F2EDE4] outline-none transition-colors"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="subject" className="font-display text-[10px] uppercase tracking-[0.2em] text-[#888880] block">
              Subject
              <span className="text-[#888880]/50 lowercase"> (optional)</span>
            </label>
            <input
              id="subject"
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="E.g., Hackathon Recruitment Sprints"
              className="w-full bg-[#0A0A0A] border border-[#C8A96E]/15 focus:border-[#C8A96E]/60 text-sm p-4 rounded text-[#F2EDE4] outline-none transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="font-display text-[10px] uppercase tracking-[0.2em] text-[#888880] block">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              value={formData.message}
              onChange={handleChange}
              placeholder="What are we building?"
              className="w-full bg-[#0A0A0A] border border-[#C8A96E]/15 focus:border-[#C8A96E]/60 text-sm p-4 rounded text-[#F2EDE4] outline-none transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-[#C8A96E] text-[#0A0A0A] font-bold text-xs tracking-[0.25em] uppercase hover:bg-transparent hover:text-[#C8A96E] border border-[#C8A96E] transition-all duration-300 rounded flex items-center justify-center gap-2 group cursor-pointer shadow-[0_5px_15px_rgba(200,169,110,0.1)]"
          >
            {submitted ? "Launching Client..." : "Send Message"}
            <Send size={14} className="group-hover:translate-x-1.5 group-hover:scale-105 transition-transform" />
          </button>
        </form>

        {/* Right Column details */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#111] p-8 rounded-2xl border border-[#C8A96E]/15 space-y-6">
            <h3 className="font-display text-xs tracking-[0.34em] text-[#C8A96E] uppercase font-bold">
              DIRECTORY INDEX
            </h3>

            <div className="divide-y divide-[#C8A96E]/10 space-y-4">
              {contacts.map((contact, idx) => (
                <div key={idx} className="flex justify-between items-center pt-4 first:pt-0">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#C8A96E]/10 flex items-center justify-center">
                      {contact.icon}
                    </div>
                    <span className="font-display text-xs text-[#888880] uppercase tracking-wider">
                      {contact.label}
                    </span>
                  </div>

                  <a
                    href={contact.link}
                    target="_blank"
                    referrerPolicy="no-referrer"
                    rel="noopener noreferrer"
                    className="text-sm font-mono text-[#F2EDE4] hover:text-[#C8A96E] hover:underline transition-colors block text-right max-w-[200px] truncate"
                  >
                    {contact.value}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* THE INSTAGRAM COMPLEMENT BLOCK */}
      <div className="bg-[#111] p-8 md:p-12 border border-[#C8A96E]/15 rounded-2xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Title & handles */}
        <div className="md:col-span-8 space-y-4">
          <span className="px-3 py-1 border border-dashed border-[#C8A96E]/30 text-[10px] font-mono text-[#C8A96E] uppercase rounded tracking-widest inline-block select-none bg-[#C8A96E]/5">
            INSTAGRAM FEED
          </span>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-[#F2EDE4]">
            Connect on Instagram
          </h2>
          <p className="text-sm font-sans font-light text-[#888880] leading-relaxed max-w-lg">
            Catch the unfiltered side — student summits, developers hack sprints, and late night coffee workflows in KIIT.
          </p>
        </div>

        {/* CTA */}
        <div className="md:col-span-4 justify-self-start md:justify-self-end">
          <a
            href="https://www.instagram.com/__rick.mystics__?igsh=MWo1b285ZGx6ZW5lZQ=="
            target="_blank"
            referrerPolicy="no-referrer"
            rel="noopener noreferrer"
            className="px-8 py-4 border border-[#C8A96E] text-[#C8A96E] hover:text-[#0A0A0A] hover:bg-[#C8A96E] font-display text-xs tracking-[0.2em] rounded uppercase font-bold transition-all flex items-center gap-2"
          >
            Follow on Instagram
            <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}
