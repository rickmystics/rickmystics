import { motion } from "motion/react";
import { Award, ShieldAlert, Sparkles, Trophy, Users, Star } from "lucide-react";

export default function LeadershipView() {
  const leadershipRoles = [
    {
      role: "Google Student Ambassador, 2026 Cohort",
      duration: "May 2026–Present",
      association: "Google Student Ambassador Program (GID: 8720)",
      desc: "Representing Google on campus with a mandate to build technical ecosystems, drive Gemini adoption, and mentor student developers toward impactful AI applications.",
      icon: <Star className="text-[#C8A96E]" size={20} />,
      badge: "CID: 8720",
    },
    {
      role: "COO Intern — Student Developer & Innovation Summit",
      duration: "Mar 2026–Present",
      association: "Regional Developer Coalition",
      desc: "Driving end-to-end strategic operations, event architecture, and cross-functional coordination for one of the region's premier student developer gatherings.",
      icon: <Users className="text-[#C8A96E]" size={20} />,
      badge: "Executive COO",
    },
    {
      role: "Core Marketing Committee — KRITARTH 9.0",
      duration: "Jan 2026–Present",
      association: "KIIT Student Activity Centre",
      desc: "Awarded formal Certificate of Appreciation from the Dean of KIIT Student Activity Centre for high-impact outreach strategies and orchestrating school-level delegate recruitment pipelines.",
      icon: <Award className="text-[#C8A96E]" size={20} />,
      badge: "Dean's Commendation",
    },
    {
      role: "Offline Marketing Officer — KIIT International MUN 2025",
      duration: "Jul 2025 – Nov 2025",
      association: "KIIT Model United Nations",
      desc: "Formulated regional delegate acquisition pipelines, increasing onboarding rates through structured ground-level marketing operations.",
      icon: <Trophy className="text-[#C8A96E]" size={20} />,
      badge: "Regional Lead",
    },
    {
      role: "POC & Operations — Kraya & Kuber Society",
      duration: "Dec 2024–Present",
      association: "KIIT Student Entrepreneurship Network",
      desc: "Overseeing operations and community engagement for an active student entrepreneurship and finance society.",
      icon: <Sparkles className="text-[#C8A96E]" size={20} />,
      badge: "Foundational POC",
    },
  ];

  return (
    <div className="py-24 max-w-7xl mx-auto px-6 md:px-12 relative z-10">
      {/* Decorative large page numeral */}
      <div className="absolute right-6 top-10 font-mono text-[180px] font-bold text-[#C8A96E]/5 leading-none select-none pointer-events-none">
        05
      </div>

      {/* Page Header */}
      <div className="space-y-4 mb-16">
        <span className="text-[#C8A96E] font-display text-[11px] uppercase tracking-[0.3em] font-medium block">
          — COMMUNITY & TRUST
        </span>
        <h1 className="font-display text-4xl md:text-6xl font-extrabold tracking-tight">
          Beyond the Code — Where <br />
          <span className="font-serif italic font-medium text-[#C8A96E]">Strategy Meets Community</span>
        </h1>
        <p className="text-[#888880] font-sans font-light text-base md:text-lg max-w-2xl leading-relaxed">
          I lead by structuring outcomes and matching individual talent with programmatic needs. Moving smoothly from codebases to multi-stakeholder operations.
        </p>
      </div>

      {/* Confident pull quote Block */}
      <div className="border-l-2 border-[#C8A96E] pl-6 py-4 mb-20 max-w-2xl select-none">
        <p className="font-serif text-2xl md:text-3xl text-[#E8E0D0] italic leading-snug">
          “Code runs in the background. People run the mission.”
        </p>
      </div>

      {/* Leadership Cards list */}
      <div className="space-y-8 max-w-4xl">
        {leadershipRoles.map((item, idx) => (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            key={idx}
            className="bg-[#111] p-8 rounded-2xl border border-[#C8A96E]/15 hover:border-[#C8A96E]/40 hover:shadow-[0_15px_40px_rgba(200,169,110,0.06)] transition-all duration-300 flex flex-col md:flex-row gap-6 justify-between items-start"
          >
            {/* Left detail */}
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-lg bg-[#C8A96E]/10 flex items-center justify-center shrink-0 mt-1">
                {item.icon}
              </div>

              <div className="space-y-2">
                <span className="px-2.5 py-0.5 border border-[#C8A96E]/20 text-[10px] font-mono text-[#C8A96E] rounded uppercase tracking-wider bg-[#C8A96E]/5">
                  {item.badge}
                </span>

                <h3 className="font-display text-xl md:text-2xl font-bold text-[#F2EDE4] leading-tight">
                  {item.role}
                </h3>

                <p className="font-display text-[11px] text-[#888880] uppercase tracking-widest font-semibold">
                  {item.association}
                </p>

                <p className="text-sm font-sans font-light text-[#888880] leading-relaxed pt-2 max-w-xl">
                  {item.desc}
                </p>
              </div>
            </div>

            {/* Right period tag */}
            <div className="shrink-0 font-mono text-[11px] text-[#C8A96E] uppercase tracking-widest bg-[#C8A96E]/5 px-3 py-1.5 border border-[#C8A96E]/20 rounded md:mt-2 self-start">
              {item.duration}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
