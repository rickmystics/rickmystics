import { useState } from "react";
import Navbar from "./components/Navbar";
import Cursor from "./components/Cursor";
import Loader from "./components/Loader";
import HomeView from "./components/HomeView";
import AboutView from "./components/AboutView";
import WorkView from "./components/WorkView";
import SkillsView from "./components/SkillsView";
import LeadershipView from "./components/LeadershipView";
import ContactView from "./components/ContactView";
import AICopilot from "./components/AICopilot";
import { PageType } from "./types";
import { Github, Linkedin, Mail, Trophy, Instagram } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [activePage, setActivePage] = useState<PageType>("home");

  const renderActiveView = () => {
    switch (activePage) {
      case "home":
        return <HomeView onChangePage={(page) => setActivePage(page)} />;
      case "about":
        return <AboutView />;
      case "work":
        return <WorkView />;
      case "skills":
        return <SkillsView />;
      case "leadership":
        return <LeadershipView />;
      case "contact":
        return <ContactView />;
      default:
        return <HomeView onChangePage={(page) => setActivePage(page)} />;
    }
  };

  const socialLinks = [
    { icon: <Mail size={16} />, link: "mailto:sourikdas007@gmail.com", label: "Email" },
    { icon: <Linkedin size={16} />, link: "https://www.linkedin.com/in/sourik-das-6529ba322/", label: "LinkedIn" },
    { icon: <Github size={16} />, link: "https://github.com/rickmystics", label: "GitHub" },
    { icon: <Trophy size={16} />, link: "https://leetcode.com/u/rickmystics/", label: "LeetCode" },
    { icon: <Instagram size={16} />, link: "https://www.instagram.com/__rick.mystics__?igsh=MWo1b285ZGx6ZW5lZQ==", label: "Instagram" },
  ];

  return (
    <>
      {/* Monogram opening loader stage */}
      <Loader onComplete={() => setLoading(false)} />

      {!loading && (
        <div id="full-viewport-container" className="min-h-screen bg-[#0A0A0A] text-[#F2EDE4] font-sans flex flex-col justify-between selection:bg-[#C8A96E] selection:text-[#0A0A0A] overflow-x-hidden relative">
          
          {/* Authentic Sunset Silhouette Background (Timestamp 19:45:14) */}
          <div 
            className="fixed inset-0 bg-[url('https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center bg-no-repeat opacity-[0.06] mix-blend-screen pointer-events-none z-0"
            aria-hidden="true"
          />

          {/* Custom Desktop Cursor layer */}
          <Cursor />


          {/* Sticky context-backed Navbar header */}
          <Navbar activePage={activePage} onChangePage={(page) => setActivePage(page)} />

          {/* Core scrollable views section */}
          <main className="flex-1 mt-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePage}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="w-full"
              >
                {renderActiveView()}
              </motion.div>
            </AnimatePresence>
          </main>

          {/* AI Twin assistant drawer */}
          <AICopilot />

          {/* Brand Premium Footer */}
          <footer className="bg-[#0A0A0A] border-t border-[#C8A96E]/10 py-12 px-6 md:px-12 select-none relative z-10">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
              {/* Profile brand name copyleft */}
              <div className="text-center md:text-left space-y-2">
                <p className="text-xs text-[#888880] font-sans font-light">
                  &copy; {new Date().getFullYear()} Sourik Das. All rights reserved.
                </p>
                <p className="text-[10px] text-[#C8A96E] font-display tracking-widest uppercase font-semibold">
                  Computer Science & Engineering · KIIT University · Google Student Ambassador 2026
                </p>
              </div>

              {/* Central craftsmanship tag */}
              <div className="text-center">
                <p className="font-serif italic text-sm text-[#888880]">
                  “Designed with intent. Built with precision.”
                </p>
              </div>

              {/* Social networks links catalog */}
              <div className="flex gap-4 items-center">
                {socialLinks.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.link}
                    target="_blank"
                    referrerPolicy="no-referrer"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full border border-[#C8A96E]/15 hover:border-[#C8A96E]/60 text-[#888880] hover:text-[#C8A96E] transition-all flex items-center justify-center bg-[#111]"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </footer>
        </div>
      )}
    </>
  );
}
