import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Award, Briefcase, Code, ArrowUpRight, Zap } from "lucide-react";

interface ItemCard {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  description: string;
  tech: string[];
  type: "hackathons" | "internships" | "leadership";
  cta?: string;
  details?: string;
}

export default function WorkView() {
  const [activeTab, setActiveTab] = useState<"all" | "hackathons" | "internships" | "leadership">("all");

  const items: ItemCard[] = [
    {
      id: "risk-predictor",
      title: "Personalized Health Risk Predictor",
      subtitle: "Team: MAVERICKS",
      tag: "🥉 3rd Place · BIS Nexus Hackathon 2025 · Healthcare",
      description: "Engineered a federated learning-based health risk prediction system that processes patient data locally without centralizing sensitive records — combining privacy-by-design with AI-driven diagnostics.",
      tech: ["Federated Learning", "AI Classifiers", "Python", "Data Modeling"],
      type: "hackathons",
    },
    {
      id: "neele-santre",
      title: "NEELE SANTRE — Alumni Data Management Portal",
      subtitle: "Team ID: 413 | Smart Education",
      tag: "Finalist · Smart India Hackathon 2025",
      description: "Centralized digital infrastructure for enterprise-scale alumni engagement — built to handle data pipelines, alumni interaction workflows, and institutional analytics at scale.",
      tech: ["Web Infrastructure", "Data Architecture", "AI/ML Tools", "Typescript"],
      type: "hackathons",
    },
    {
      id: "pinnacle-labs",
      title: "Data Science Intern",
      subtitle: "Pinnacle Labs Pvt Ltd, Kolkata",
      tag: "May–Jun 2025 · Internship",
      description: "Implemented data discovery pipelines, statistical modeling workflows, and contributed to agile production sprints on enterprise-scale ML projects.",
      tech: ["Python", "Pandas & NumPy", "Statistical Modeling", "Agile Sprints"],
      type: "internships",
    },
    {
      id: "gdg-challenge",
      title: "GDG Campus Solution Challenge",
      subtitle: "Google Developer Groups 2025",
      tag: "Participant · Cert ID: 2025H2S010SC-P45363",
      description: "Designed a technology solution for broad social impact under the Google Developer Groups umbrella, exploring Gemini-compatible architectures for community-scale problems.",
      tech: ["Google Cloud Platform", "Gemini Model APIs", "Solution Architecture"],
      type: "leadership",
    },
    {
      id: "zidio-dev",
      title: "Project Intern",
      subtitle: "Zidio Development (Remote)",
      tag: "Mar–May 2025 · Internship",
      description: "Developed structured remote modules optimizing AI/ML toolchains alongside core web infrastructure. Delivered production-grade deliverables under remote-first conditions.",
      tech: ["AI/ML Toolchains", "Web Infrastructure", "Git", "Remote Collaboration"],
      type: "internships",
    },
    {
      id: "hyperthon-chronos",
      title: "Hyperthon 2025 & CHRONOS v1.0",
      subtitle: "GeeksforGeeks KIIT",
      tag: "Core Contributor · Rapid Prototyping",
      description: "Led rapid prototyping sprints using GenAI models, advanced prompt workflows, and underlying data engines to build functional products within tight hackathon windows.",
      tech: ["GenAI Models", "Prompt Engineering", "CHRONOS Framework", "Fast Prototyping"],
      type: "hackathons",
    },
  ];

  const filteredItems = activeTab === "all" ? items : items.filter((item) => item.type === activeTab);

  const tabs: { id: "all" | "hackathons" | "internships" | "leadership"; label: string }[] = [
    { id: "all", label: "All Works" },
    { id: "hackathons", label: "Hackathons" },
    { id: "internships", label: "Internships" },
    { id: "leadership", label: "Leadership & Extra" },
  ];

  return (
    <div className="py-24 max-w-7xl mx-auto px-6 md:px-12 relative z-10">
      {/* Decorative page background numeral */}
      <div className="absolute right-6 top-10 font-mono text-[180px] font-bold text-[#C8A96E]/5 leading-none select-none pointer-events-none">
        03
      </div>

      {/* Header */}
      <div className="space-y-4 mb-16">
        <span className="text-[#C8A96E] font-display text-[11px] uppercase tracking-[0.3em] font-medium block">
          — SOURIK'S PROJECTS
        </span>
        <h1 className="font-display text-4xl md:text-6xl font-extrabold tracking-tight">
          Selected Work & <br />
          <span className="font-serif italic font-medium text-[#C8A96E]">Hackathon Milestones</span>
        </h1>
        <p className="text-[#888880] font-sans font-light text-base md:text-lg max-w-2xl leading-relaxed">
          Every project solves a problem worth solving. Exploring federated privacy models, state-scale educational portals, and commercial operations pipelines.
        </p>
      </div>

      {/* Dynamic filter tabs */}
      <div className="flex flex-wrap gap-2 border-b border-[#C8A96E]/10 pb-6 mb-12">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 text-xs font-display tracking-widest uppercase transition-all duration-300 rounded-md border ${
                isActive
                  ? "bg-[#C8A96E] text-[#0A0A0A] border-[#C8A96E] font-bold"
                  : "bg-transparent text-[#888880] border-[#C8A96E]/10 hover:text-[#F2EDE4] hover:border-[#C8A96E]/30"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, idx) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              key={item.id}
              className="bg-[#111] p-8 rounded-2xl border border-[#C8A96E]/15 hover:border-[#C8A96E]/40 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Left Accent Bar on Hover */}
              <div className="absolute left-0 top-1/4 h-1/2 w-[3px] bg-[#C8A96E] rounded-r-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="space-y-4">
                {/* Meta indicator */}
                <div className="flex justify-between items-start gap-4">
                  <span className="font-mono text-[10px] text-[#C8A96E] uppercase tracking-[0.2em] px-2.5 py-1 rounded bg-[#C8A96E]/5 border border-[#C8A96E]/10">
                    {item.type}
                  </span>
                  <div className="text-right font-mono text-[9px] text-[#888880]">
                    0{idx + 1}
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="font-display text-2xl font-bold text-[#F2EDE4] group-hover:text-[#C8A96E] transition-colors leading-tight">
                    {item.title}
                  </h3>
                  <p className="font-display text-[11px] text-[#888880] tracking-wider uppercase font-medium">
                    {item.subtitle}
                  </p>
                </div>

                {/* Main achievement tag lines */}
                <div className="flex items-center gap-2 py-1 select-none">
                  <Zap size={12} className="text-[#C8A96E] shrink-0" />
                  <span className="text-xs text-[#C8A96E] font-medium tracking-wide">
                    {item.tag}
                  </span>
                </div>

                <p className="text-sm font-sans font-light text-[#888880] leading-relaxed pt-2">
                  {item.description}
                </p>
              </div>

              {/* Technologies strip & details */}
              <div className="mt-8 border-t border-[#F2EDE4]/5 pt-6 space-y-6">
                <div className="flex flex-wrap gap-1.5">
                  {item.tech.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 bg-[#0A0A0A] border border-[#F2EDE4]/5 rounded text-[11px] font-mono text-[#888880]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between items-center text-xs font-display tracking-widest uppercase text-[#C8A96E] opacity-75 group-hover:opacity-100 transition-opacity">
                  <span className="flex items-center gap-1">
                    Authentic Outcome Secured
                  </span>
                  <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
