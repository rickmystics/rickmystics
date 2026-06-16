import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { PageType } from "../types";

interface NavbarProps {
  activePage: PageType;
  onChangePage: (page: PageType) => void;
}

export default function Navbar({ activePage, onChangePage }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks: { id: PageType; label: string }[] = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "work", label: "Work" },
    { id: "skills", label: "Skills" },
    { id: "leadership", label: "Leadership" },
    { id: "contact", label: "Contact" },
  ];

  const handleLinkClick = (pageId: PageType) => {
    onChangePage(pageId);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <nav
        id="app-navbar"
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? "py-4 bg-[#0A0A0A]/85 backdrop-blur-xl border-b border-[#C8A96E]/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo S. Left */}
          <div
            onClick={() => handleLinkClick("home")}
            className="flex items-center cursor-pointer group"
          >
            <span className="font-serif text-3xl text-[#C8A96E] font-bold tracking-tight select-none">
              S
              <span className="text-[#F2EDE4] group-hover:text-[#C8A96E] transition-colors duration-300">
                .
              </span>
            </span>
          </div>

          {/* Nav Links Center/Right (Desktop) */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = activePage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`text-sm tracking-wider uppercase relative py-1 font-display transition-colors duration-300 ${
                    isActive ? "text-[#C8A96E] font-semibold" : "text-[#888880] hover:text-[#F2EDE4]"
                  }`}
                >
                  {link.label}
                  {/* Premium gold underline animation */}
                  {isActive && (
                    <motion.div
                      layoutId="navActiveLine"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C8A96E]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* CTA Let's Connect Right */}
          <div className="hidden md:block">
            <button
              onClick={() => handleLinkClick("contact")}
              className="px-5 py-2.5 border border-[#C8A96E] text-[#C8A96E] hover:text-[#0A0A0A] hover:bg-[#C8A96E] rounded-md font-display text-xs tracking-widest uppercase transition-all duration-500 flex items-center gap-1 hover:shadow-[0_0_20px_rgba(200,169,110,0.3)]"
            >
              Let's Connect
              <ArrowUpRight size={14} />
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-[#F2EDE4] hover:text-[#C8A96E] transition-colors"
            aria-label="Toggle Menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-[#0A0A0A] z-40 flex flex-col justify-center items-center px-6 md:hidden"
          >
            {/* Background design layer */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(200,169,110,0.03)_0%,transparent_80%)] pointer-events-none" />

            <div className="flex flex-col space-y-6 text-center z-10">
              {navLinks.map((link, idx) => {
                const isActive = activePage === link.id;
                return (
                  <motion.button
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    key={link.id}
                    onClick={() => handleLinkClick(link.id)}
                    className={`text-2xl tracking-[0.2em] font-display uppercase transition-colors duration-300 ${
                      isActive ? "text-[#C8A96E] font-bold" : "text-[#888880] hover:text-[#F2EDE4]"
                    }`}
                  >
                    {link.label}
                  </motion.button>
                );
              })}

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.05 }}
                className="pt-6"
              >
                <button
                  onClick={() => handleLinkClick("contact")}
                  className="px-8 py-3 border border-[#C8A96E] text-[#C8A96E] hover:text-[#0A0A0A] hover:bg-[#C8A96E] rounded-md font-display text-sm tracking-widest uppercase transition-all duration-300 flex items-center gap-1"
                >
                  Let's Connect
                  <ArrowUpRight size={16} />
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
