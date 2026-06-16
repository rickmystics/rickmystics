import { useEffect, useRef, useState } from "react";
import { ArrowRight, Download, ChevronDown, Award, Globe, Heart, Instagram } from "lucide-react";
import { motion } from "motion/react";
import { PageType } from "../types";

interface HomeViewProps {
  onChangePage: (page: PageType) => void;
}

export default function HomeView({ onChangePage }: HomeViewProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // States for stats count simulation (animated on load/scroll)
  const [stats, setStats] = useState({ hackathons: 0, internships: 0, ambassador: 0, leadership: 0 });

  // Floating Particle Canvas background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Particle class
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = Math.random() * 1.5 + 0.5;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }

      draw(cContext: CanvasRenderingContext2D) {
        cContext.beginPath();
        cContext.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        cContext.fillStyle = "rgba(200, 169, 110, 0.25)"; // warm gold tint
        cContext.fill();
      }
    }

    const particles: Particle[] = Array.from({ length: 60 }, () => new Particle());

    const drawLine = (p1: Particle, p2: Particle) => {
      const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
      if (dist < 120 && ctx) {
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = `rgba(200, 169, 110, ${0.1 * (1 - dist / 120)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.update();
        p.draw(ctx);
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          drawLine(particles[i], particles[j]);
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  // Stats counting interval
  useEffect(() => {
    const duration = 1500;
    const steps = 30;
    const intervalTime = duration / steps;
    let stepCount = 0;

    const timer = setInterval(() => {
      stepCount++;
      setStats({
        hackathons: Math.min(3, Math.round((3 / steps) * stepCount)),
        internships: Math.min(2, Math.round((2 / steps) * stepCount)),
        ambassador: Math.min(1, Math.round((1 / steps) * stepCount)),
        leadership: Math.min(4, Math.round((4 / steps) * stepCount)),
      });

      if (stepCount >= steps) clearInterval(timer);
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  // Recog/Logos data
  const recognitionLogos = [
    { name: "Google Ecosystem", role: "Google Student Ambassador GID:8720" },
    { name: "KIIT University", role: "School of Student Activity Centre" },
    { name: "GeeksforGeeks KIIT", role: "Core Hackathon sprint Contributor" },
    { name: "Bureau of Indian Standards", role: "BIS Nexus 3rd place Winner" },
  ];

  // Instagram items
  const instagramJourneys = [
    { title: "Smart India Hackathon '25 Sprints", date: "SIH Finalist Team 423" },
    { title: "Google Ambassador Launch", date: "GID: 8720 Cohort Reveal" },
    { title: "Kritarth Marketing Operations", date: "MUN & Outreach Campaigns" },
    { title: "Zidio Remote Toolchain Dev", date: "AI/ML Agile Deliveries" },
    { title: "BIS Nexus 3rd Place Finish", date: "Federated Learning Project" },
    { title: "Campus Meetups & HackSprints", date: "KIIT Student Innovators" },
  ];

  // Hero sentence split for staggered word-by-word animation
  const heroWords = "Engineering the Future, One Solution at a Time.".split(" ");

  return (
    <div className="relative w-full">
      {/* Absolute Canvas particles backplate */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex flex-col justify-center items-center px-6 md:px-12 pt-28 pb-12 overflow-hidden z-10 max-w-7xl mx-auto">
        {/* Subtle radial backdrop ambient light */}
        <div className="absolute top-1/4 w-[400px] h-[400px] bg-[radial-gradient(circle_at_center,rgba(200,169,110,0.06)_0%,transparent_70%)] pointer-events-none" />

        <div className="text-center max-w-5xl">
          {/* Tracked pre-heading tag */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 py-1.5 border border-[#C8A96E]/20 bg-[#C8A96E]/5 rounded-full text-xs text-[#C8A96E] font-display tracking-[0.2em] uppercase mb-8 select-none"
          >
            Google Student Ambassador 2026 · GenAI Developer
          </motion.div>

          {/* Staggered Word h1 */}
          <h1 className="font-display font-extrabold text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[1.05] text-[#F2EDE4] mb-8">
            {heroWords.map((word, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block mr-3 md:mr-4 select-none"
              >
                {word === "Future," || word === "Solution" ? (
                  <span className="text-[#C8A96E] gold-glow font-serif italic font-medium">{word}</span>
                ) : (
                  word
                )}
              </motion.span>
            ))}
          </h1>

          {/* Subtext description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-base md:text-xl text-[#888880] font-sans font-light max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            Computer Science student at <span className="text-[#F2EDE4] font-medium">KIIT University</span>, hackathon finalist, and emerging AI architect building data-driven systems that bridge strategy and execution.
          </motion.p>

          {/* CTA Row */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={() => onChangePage("work")}
              className="w-full sm:w-auto px-8 py-4 bg-[#C8A96E] text-[#0A0A0A] font-semibold text-xs tracking-[0.25em] uppercase hover:bg-transparent hover:text-[#C8A96E] border border-[#C8A96E] transition-all duration-300 rounded-sm flex items-center justify-center gap-2 group cursor-pointer"
            >
              View My Work
              <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform duration-300" />
            </button>

            {/* Resume button */}
            <a
              href="mailto:sourikdas007@gmail.com?subject=Inquiry for Resume / Collaboration"
              className="w-full sm:w-auto px-8 py-4 border border-[#F2EDE4]/20 text-[#F2EDE4] font-semibold text-xs tracking-[0.25em] uppercase hover:border-[#C8A96E] hover:text-[#C8A96E] transition-all duration-300 rounded-sm flex items-center justify-center gap-2 group"
            >
              Request Resume
              <Download size={14} className="group-hover:translate-y-0.5 transition-transform duration-300" />
            </a>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 flex flex-col items-center gap-2 text-[#888880]"
        >
          <span className="font-display text-[10px] tracking-[0.4em] uppercase text-xs">scroll</span>
          <ChevronDown size={14} className="animate-bounce" />
        </motion.div>
      </section>

      {/* STATS BAR */}
      <section className="bg-[#111] py-12 border-y border-[#C8A96E]/10 flex flex-col justify-center items-center">
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center">
          <div>
            <div className="font-serif text-4xl md:text-5xl text-[#C8A96E] font-medium">{stats.hackathons}+</div>
            <div className="font-display text-[11px] tracking-widest text-[#888880] uppercase mt-2">Hackathons Competed</div>
          </div>
          <div>
            <div className="font-serif text-4xl md:text-5xl text-[#C8A96E] font-medium">{stats.internships}</div>
            <div className="font-display text-[11px] tracking-widest text-[#888880] uppercase mt-2">Internships Completed</div>
          </div>
          <div>
            <div className="font-serif text-4xl md:text-5xl text-[#C8A96E] font-medium">{stats.ambassador}</div>
            <div className="font-display text-[11px] tracking-widest text-[#888880] uppercase mt-2">Google Ambassadorship</div>
          </div>
          <div>
            <div className="font-serif text-4xl md:text-5xl text-[#C8A96E] font-medium">{stats.leadership}+</div>
            <div className="font-display text-[11px] tracking-widest text-[#888880] uppercase mt-2">Leadership Roles</div>
          </div>
        </div>
      </section>

      {/* ABOUT PREVIEW */}
      <section className="py-24 max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          {/* Left bio & traits */}
          <div className="md:col-span-7 space-y-6">
            <span className="text-[#C8A96E] font-display text-[11px] uppercase tracking-[0.3em] font-medium block">
              — ABOUT SOURIK
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#F2EDE4]">
              I don't just write code — <br />
              <span className="font-serif italic font-medium text-[#C8A96E]">I architect outcomes.</span>
            </h2>
            <p className="text-[#888880] font-sans font-light leading-relaxed text-base md:text-lg">
              Operating at the intersection of developer coordination and technical architectures. From national finalist sprints to marketing outreach pipelines, my focus resides in delivering production results.
            </p>

            <div className="flex flex-wrap gap-2.5 pt-4">
              {["Strategic Thinker", "Rapid Prototyper", "Google Representative", "Federated Learner"].map((tag) => (
                <span key={tag} className="px-3.5 py-1 border border-[#C8A96E]/20 text-[#C8A96E] font-display text-[10px] uppercase tracking-widest rounded-full bg-[#C8A96E]/5">
                  {tag}
                </span>
              ))}
            </div>

            <div className="pt-6">
              <button
                onClick={() => onChangePage("about")}
                className="group inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-[#C8A96E] hover:text-[#F2EDE4] transition-colors duration-300 cursor-pointer"
              >
                Full Story
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>

          {/* Right CSS/SVG Grid abstract wireframe */}
          <div className="md:col-span-5 h-[340px] border border-[#C8A96E]/15 bg-[#111] rounded-2xl relative overflow-hidden flex items-center justify-center p-8 group">
            {/* Ambient gold glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#C8A96E]/5 rounded-full blur-3xl pointer-events-none transition-all duration-500 group-hover:scale-125" />

            {/* Abstract Wireframe SVG */}
            <svg
              className="w-full h-full max-w-[280px] text-[#C8A96E]/30 group-hover:text-[#C8A96E]/60 transition-colors duration-500"
              viewBox="0 0 200 200"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.8"
            >
              <defs>
                <linearGradient id="gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#C8A96E" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#E8E0D0" stopOpacity="0.2" />
                </linearGradient>
              </defs>

              {/* Cube 3D network lines */}
              <g className="animate-pulse">
                {/* Back layers */}
                <polygon points="50,150 100,120 150,150 100,180" fill="none" strokeDasharray="3,3" />
                <line x1="50" y1="150" x2="50" y2="70" strokeDasharray="3,3" />
                <line x1="100" y1="180" x2="100" y2="100" />
                <line x1="150" y1="150" x2="150" y2="70" />

                {/* Front layer panels */}
                <polygon points="50,70 100,40 150,70 100,100" fill="none" stroke="url(#gold-grad)" strokeWidth="1.5" />
                <polygon points="50,70 100,100 100,180 50,150" fill="none" />
                <polygon points="150,70 100,100 100,180 150,150" fill="none" />

                {/* Connectivity dots */}
                <circle cx="100" cy="40" r="3.5" fill="#C8A96E" />
                <circle cx="50" cy="70" r="3" fill="#F2EDE4" />
                <circle cx="100" cy="100" r="4.5" fill="#C8A96E" />
                <circle cx="150" cy="70" r="3" fill="#F2EDE4" />
                <circle cx="100" cy="180" r="3.5" fill="#C8A96E" />
              </g>
              <text x="10" y="20" fill="rgba(242,237,228,0.3)" fontFamily="monospace" fontSize="9">
                SYS: DYNAMIC_GEOMETRY
              </text>
              <text x="100" y="195" fill="rgba(200,169,110,0.5)" textAnchor="middle" fontFamily="monospace" fontSize="8">
                KIIT Ambassadorship 2026
              </text>
            </svg>
          </div>
        </div>
      </section>

      {/* SKILLS MARQUEE strip */}
      <section className="bg-[#111] py-8 overflow-hidden border-y border-[#C8A96E]/10 select-none">
        <div className="relative w-full flex overflow-x-hidden">
          <div className="animate-marquee whitespace-nowrap flex items-center space-x-12">
            {[
              "Python", "Federated Learning", "Prompt Engineering", "C++", "HTML/CSS",
              "GenAI", "Microsoft Copilot", "Data Science", "SEO", "Project Management",
              "Python", "Federated Learning", "Prompt Engineering", "C++", "HTML/CSS",
              "GenAI", "Microsoft Copilot", "Data Science", "SEO", "Project Management"
            ].map((skill, idx) => (
              <span
                key={idx}
                className="font-display text-sm md:text-lg uppercase tracking-[0.25em] text-[#F2EDE4]/60 hover:text-[#C8A96E] transition-colors duration-300 font-bold inline-flex items-center gap-3"
              >
                <span>{skill}</span>
                <span className="text-[#C8A96E] text-xs">•</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED WORK */}
      <section className="py-24 max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center space-y-4 mb-16">
          <span className="text-[#C8A96E] font-display text-[11px] uppercase tracking-[0.3em] font-medium block">
            — SELECTED WORKS
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight">
            Featured Prototyping Achievements
          </h2>
        </div>

        {/* 3 cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Health Risk Predictor",
              desc: "Federated learning framework prioritizing patient records privacy and local ML modeling.",
              badge: "🥉 3rd Place · BIS Nexus 2025",
              tech: ["Federated Learning", "Python", "Local AI Classifiers"]
            },
            {
              title: "NEELE SANTRE Portal",
              desc: "State-scale alumni engagement registry and interactive workflow builder for KIIT SIH track.",
              badge: "Finalist · SIH 2025 (ID: 423)",
              tech: ["Web Infra", "Data Architecture", "Enterprise APIs"]
            },
            {
              title: "GDG Campus Solution",
              desc: "Google Developer Groups challenge response using lightweight context Gemini-based flows.",
              badge: "Certified GDG Contributor",
              tech: ["Social Impact Challenge", "Gemini API", "Node.js"]
            }
          ].map((proj, idx) => (
            <div
              key={idx}
              onClick={() => onChangePage("work")}
              className="bg-[#111] p-8 rounded-2xl border border-[#C8A96E]/15 hover:border-[#C8A96E]/50 transition-all duration-300 flex flex-col justify-between group cursor-pointer hover:translate-y-[-8px] hover:shadow-[0_20px_60px_rgba(200,169,110,0.12)] relative hover:before:absolute hover:before:left-0 hover:before:top-1/4 hover:before:h-1/2 hover:before:w-[3px] hover:before:bg-[#C8A96E] hover:before:rounded-r-md"
            >
              <div className="space-y-4">
                <span className="text-[11px] uppercase tracking-wider text-[#C8A96E] font-display block">
                  {proj.badge}
                </span>
                <h3 className="font-display text-xl font-bold text-[#F2EDE4] group-hover:text-[#C8A96E] transition-colors">
                  {proj.title}
                </h3>
                <p className="text-sm font-sans font-light text-[#888880] leading-relaxed">
                  {proj.desc}
                </p>
              </div>

              <div className="mt-8 space-y-4">
                {/* Tech pills */}
                <div className="flex flex-wrap gap-1.5">
                  {proj.tech.map((t) => (
                    <span key={t} className="px-2.5 py-0.5 border border-[#F2EDE4]/5 text-[#888880] font-sans text-[10px] tracking-tight rounded bg-[#0A0A0A]">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#C8A96E] font-display pt-2 group-hover:gap-2.5 transition-all">
                  <span>View Project</span>
                  <ArrowRight size={12} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* RECOGNITION STRIP */}
      <section className="bg-[#111] py-16 border-y border-[#C8A96E]/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 select-none">
          <p className="text-center font-display text-[10px] tracking-[0.3em] uppercase text-[#888880] mb-8">
            RECOGNIZED & AFFILIATED WITH
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-items-center">
            {recognitionLogos.map((logo, idx) => (
              <div
                key={idx}
                className="text-center p-4 border border-[#C8A96E]/10 bg-[#0A0A0A]/50 rounded-lg w-full max-w-[220px] transition-all duration-300 hover:border-[#C8A96E]/30"
              >
                <div className="text-sm md:text-base text-[#F2EDE4] font-display font-semibold hover:text-[#C8A96E] transition-colors duration-300">
                  {logo.name}
                </div>
                <div className="text-[10px] text-[#888880] uppercase tracking-wider mt-1">
                  {logo.role}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INSTAGRAM PREVIEW */}
      <section className="py-24 max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div className="space-y-4">
            <span className="text-[#C8A96E] font-display text-[11px] uppercase tracking-[0.3em] font-medium block">
              — INSTAGRAM SOURCING
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight">
              Follow The Journey
            </h2>
            <p className="text-[#888880] font-sans font-light max-w-xl text-sm md:text-base">
              Behind the builds, campus leadership sprints, and the grind between highlights. Capturing student developer moments at KIIT.
            </p>
          </div>
          <div>
            <a
              href="https://www.instagram.com/__rick.mystics__?igsh=MWo1b285ZGx6ZW5lZQ=="
              target="_blank"
              referrerPolicy="no-referrer"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-[#C8A96E]/30 text-[#C8A96E] hover:border-[#C8A96E] text-xs font-display tracking-widest uppercase transition-colors rounded-sm inline-flex items-center gap-2 group cursor-pointer"
            >
              <Instagram size={14} />
              @__rick.mystics__
            </a>
          </div>
        </div>

        {/* 2x3 Mosaic Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {instagramJourneys.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#111] p-6 rounded-xl border border-[#C8A96E]/10 flex flex-col justify-between h-[200px] hover:border-[#C8A96E]/40 transition-colors group relative overflow-hidden"
            >
              {/* Outer image placeholder decoration */}
              <div className="absolute top-0 right-0 p-4 font-mono text-[9px] text-[#888880]/30 select-none">
                0{idx + 1}
              </div>

              <div className="flex items-center gap-2 mb-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#C8A96E]" />
                <span className="text-[10px] font-mono text-[#888880] uppercase tracking-wide">
                  KIIT Event Sprints
                </span>
              </div>

              <div>
                <h3 className="font-display text-base font-bold text-[#F2EDE4] group-hover:text-[#C8A96E] transition-colors leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs font-sans text-[#888880] mt-2 group-hover:text-[#F2EDE4] transition-colors">
                  {item.date}
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-[#F2EDE4]/5 pt-4 mt-4 select-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="font-display text-[10px] text-[#C8A96E] tracking-wider uppercase">
                  View Snapshot
                </span>
                <ArrowRight size={10} className="text-[#C8A96E]" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CALL TO ACTION BANNER */}
      <section className="bg-[#111] py-20 border-t border-[#C8A96E]/15 relative overflow-hidden flex flex-col items-center">
        {/* Glow backdrop layer */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(200,169,110,0.06)_0%,transparent_70%)] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 text-center space-y-8 relative z-10">
          <h2 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight text-[#F2EDE4] leading-normal">
            Open to Collaborations, Internships <br className="hidden md:block" />
            <span className="font-serif italic font-medium text-[#C8A96E]">& Meaningful Conversations.</span>
          </h2>

          <div className="pt-2">
            <button
              onClick={() => onChangePage("contact")}
              className="px-10 py-4 bg-[#C8A96E] text-[#0A0A0A] font-bold text-xs tracking-[0.25em] uppercase hover:bg-transparent hover:text-[#C8A96E] border border-[#C8A96E] transition-all duration-300 rounded-sm cursor-pointer shadow-[0_10px_30px_rgba(200,169,110,0.15)] hover:shadow-[0_0_30px_rgba(200,169,110,0.3)]"
            >
              Start a Conversation
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
