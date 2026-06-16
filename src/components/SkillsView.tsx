import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Cpu, Database, Cloud, Compass, BrainCircuit } from "lucide-react";

export default function SkillsView() {
  const [learningIndex, setLearningIndex] = useState(0);

  const learningTopics = [
    "Gemini Architectures",
    "LLM Fine-tuning",
    "Cloud ML Pipelines",
    "System Design",
    "Federated Learning Orchestration",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setLearningIndex((prev) => (prev + 1) % learningTopics.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const skillBlocks = [
    {
      title: "Programming & Engineering",
      icon: <Cpu className="text-[#C8A96E]" size={22} />,
      skills: ["C", "C++", "Java", "Logic Programming", "Python", "HTML5", "CSS3", "Modern Web Frameworks"],
      description: "Writing clear, structured, modular code. Focused on performant logic blocks and clean architectural separation of concerns.",
    },
    {
      title: "AI, Data & GenAI",
      icon: <Database className="text-[#C8A96E]" size={22} />,
      skills: [
        "Federated Learning Systems",
        "Data Science Pipelines",
        "Statistical Modeling",
        "Prompt Engineering",
        "Microsoft Copilot",
        "GenAI Model Integration",
        "AI Classifiers",
      ],
      description: "Architecting decentralized predictive pipelines, optimizing model integration, and leveraging context-backed generative frameworks.",
    },
    {
      title: "Cloud & Enterprise",
      icon: <Cloud className="text-[#C8A96E]" size={22} />,
      skills: ["Microsoft 365 Architecture", "AI for Business Workflows", "Enterprise Ecosystems", "Microsoft Copilot Advanced"],
      description: "Managing enterprise digital infrastructures and creating custom automated flows to streamline communication.",
    },
    {
      title: "Strategy & Operations",
      icon: <Compass className="text-[#C8A96E]" size={22} />,
      skills: [
        "Operations Management",
        "Project Lifecycle Scoping",
        "Cross-functional Team Coordination",
        "Event Management",
        "Search Engine Optimization",
        "Marketing Strategy",
      ],
      description: "Formulating ground-level outreach, managing budgets, and coordinating large-scale regional student summits.",
    },
  ];

  return (
    <div className="py-24 max-w-7xl mx-auto px-6 md:px-12 relative z-10">
      {/* Decorative large page numeral */}
      <div className="absolute right-6 top-10 font-mono text-[180px] font-bold text-[#C8A96E]/5 leading-none select-none pointer-events-none">
        04
      </div>

      {/* Header */}
      <div className="space-y-4 mb-20">
        <span className="text-[#C8A96E] font-display text-[11px] uppercase tracking-[0.3em] font-medium block">
          — CORE CAPABILITIES
        </span>
        <h1 className="font-display text-4xl md:text-6xl font-extrabold tracking-tight">
          What I Bring to <br />
          <span className="font-serif italic font-medium text-[#C8A96E]">the Drafting Table</span>
        </h1>
        <p className="text-[#888880] font-sans font-light text-base md:text-lg max-w-2xl leading-relaxed">
          Deep where it counts. Wide where it matters. Combining technical command across data pipelines with organizational execution.
        </p>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
        {skillBlocks.map((block, idx) => (
          <div
            key={idx}
            className="bg-[#111] p-8 rounded-2xl border border-[#C8A96E]/15 hover:border-[#C8A96E]/40 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Card Title block */}
              <div className="flex items-center gap-3.5 mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#C8A96E]/10 flex items-center justify-center">
                  {block.icon}
                </div>
                <h3 className="font-display text-xl font-bold text-[#F2EDE4]">
                  {block.title}
                </h3>
              </div>

              <p className="text-xs font-sans font-light text-[#888880] mb-8 leading-relaxed">
                {block.description}
              </p>
            </div>

            {/* List of Skills tags */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-[#F2EDE4]/5">
              {block.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 border border-[#C8A96E]/10 bg-[#0A0A0A] hover:bg-[#C8A96E]/5 hover:border-[#C8A96E]/30 rounded text-xs font-mono text-[#F2EDE4] transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* CURRENTLY LEARNING rotating ticker */}
      <div className="bg-[#111]/60 border border-[#C8A96E]/15 p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 max-w-4xl mx-auto overflow-hidden">
        <div className="flex items-center gap-3 shrink-0">
          <BrainCircuit className="text-[#C8A96E] animate-pulse" size={24} />
          <span className="font-display text-xs tracking-[0.25em] uppercase text-[#C8A96E] font-semibold">
            CURRENTLY EXPLORING
          </span>
        </div>

        {/* Fading text container */}
        <div className="h-8 flex justify-center items-center overflow-hidden w-full max-w-md">
          <AnimatePresence mode="wait">
            <motion.div
              key={learningIndex}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="text-center md:text-left font-serif text-lg md:text-xl text-[#F2EDE4] italic font-medium tracking-wide gold-glow"
            >
              “{learningTopics[learningIndex]}”
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
