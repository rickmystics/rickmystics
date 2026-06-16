import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Award, BookOpen, Star, Zap, User, GraduationCap, X, Calendar, MapPin, Image as ImageIcon } from "lucide-react";

interface PhotoItem {
  id: string;
  title: string;
  category: string;
  desc: string;
  url: string;
  date: string;
  location: string;
  tag: string;
}

export default function AboutView() {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);

  const photoGallery: PhotoItem[] = [
    {
      id: "sunset",
      title: "The Sunset Silhouette",
      category: "Personal Atmosphere",
      desc: "A contemplative twilight shot captured on the hills overlooking the campus horizon. It represents looking forward into the technological frontier. Designated as the full hero background texture of this portfolio.",
      url: "/images/my-sunset.jpeg",
      date: "19:45:14 (Sunset)",
      location: "Campus Outlook Edge",
      tag: "Aesthetic Core & Background"
    },
    {
      id: "motorcycle",
      title: "Bike Rides",
      category: "Lifestyles",
      desc: "Standing alongside a high-performance Yamaha sports motorcycle. Embracing speed, mechanical precision, and sharp focus both on the asphalt and during systems development.",
      url: "/images/my-bike.jpeg",
      date: "January 2025",
      location: "Bhubaneswar Highway",
      tag: "Active Life"
    },
    {
      id: "speech",
      title: "Google Student Ambassador Keynote",
      category: "Leadership",
      desc: "Delivering the initial Gemini developer sprint introductory address behind the wooden podium inside the KIIT auditorium. Engaging campus minds in frontier AI.",
      url: "/images/keynote-speech.jpg",
      date: "May 2026",
      location: "KIIT University Auditorium",
      tag: "Keynote Panels"
    },
    {
      id: "coding",
      title: "Agile Engineering Operations",
      category: "Development",
      desc: "Late-night design and compilation of federated learning classifiers, optimizing secure local model checkpoints with strict data integrity guidelines.",
      url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
      date: "March 2025",
      location: "Zidio Development Labs",
      tag: "Systems Code"
    },
    {
      id: "posters",
      title: "Creative Inspiration Wall",
      category: "Visuals",
      desc: "An aesthetic wall structured with iconic cinematic and automotive posters—featuring Drive, Spider-Man, and Aston Martin. Fuel for ongoing creative programming builds.",
      url: "/images/room-wall.jpeg",
      date: "Continuous Inspiration",
      location: "Personal Creative Room",
      tag: "Aesthetic Philosophy"
    },
    {
      id: "suit",
      title: "Official Summit Presentation",
      category: "Professional Profile",
      desc: "Polished presentation wear for the Google Ambassador Summit, presenting strategic adoption frameworks and mentoring student innovators.",
      url: "/images/summit-presentation.jpeg",
      date: "May 2026",
      location: "Regional Ambassador Hub",
      tag: "Authority & Prestige"
    }
  ];

  const timelineMilestones = [
    { year: "2024", title: "Enrolled B.Tech CSE at KIIT University", desc: "Started Computer Science and Engineering course, developing deep engineering foundations." },
    { year: "Dec 2024", title: "Joined Kraya & Kuber Society as POC", desc: "Oversaw operations and student engagement for the entrepreneurship and finance network." },
    { year: "Mar 2025", title: "Project Intern at Zidio Development", desc: "Created structured remote AI modules and integrated specialized ML toolchains with web infra." },
    { year: "May 2025", title: "Data Science Intern at Pinnacle Labs", desc: "Constructed data discovery pipelines and advanced statistical models in production sprints." },
    { year: "Jan 2026", title: "Marketing Officer at Kritarth", desc: "Recruited delegate pipelines and organized high-impact campus-wide outreach operations." },
    { year: "Mar 2026", title: "COO Intern, Student Developer Summit", desc: "Spearheaded strategic operations, event timelines, and cross-functional task matrices." },
    { year: "May 2026", title: "Google Student Ambassador (GID: 8720)", desc: "Selected for 2026 Cohort to spark adoption of Gemini frameworks and AI tools on campus." },
  ];

  const valuePillars = [
    {
      title: "Build to Ship",
      desc: "I leverage rapid iteration to test concepts immediately. Prototyping fast is the key to escaping analysis paralysis.",
      icon: <Zap size={20} className="text-[#C8A96E]" />,
    },
    {
      title: "Strategy Meets Code",
      desc: "Deep technical competencies are only valuable when aligned with clear product design, commercial viability, and product strategy.",
      icon: <Star size={20} className="text-[#C8A96E]" />,
    },
    {
      title: "People-Driven",
      desc: "Fostering cohesive, highly functional groups. Leadership is about clearing paths and multiplying overall team velocity.",
      icon: <User size={20} className="text-[#C8A96E]" />,
    },
  ];

  return (
    <div className="py-24 max-w-7xl mx-auto px-6 md:px-12 relative z-10">
      {/* Decorative large page numeral */}
      <div className="absolute right-6 top-10 font-mono text-[180px] font-bold text-[#C8A96E]/5 leading-none select-none pointer-events-none">
        02
      </div>

      {/* Page Header */}
      <div className="space-y-4 mb-20">
        <span className="text-[#C8A96E] font-display text-[11px] uppercase tracking-[0.3em] font-medium block">
          — ABOUT SOURIK DAS
        </span>
        <h1 className="font-display text-4xl md:text-6xl font-extrabold tracking-tight">
          Not just a developer. <br />
          <span className="font-serif italic font-medium text-[#C8A96E]">A builder of outcomes.</span>
        </h1>
      </div>

      {/* HERO BIOLOGY SPLIT */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 items-center mb-32">
        {/* Left Circular portrait placeholder with Real Professional Photo */}
        <div className="md:col-span-5 flex justify-center">
          <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full flex items-center justify-center p-2.5 border border-[#C8A96E]/20 bg-[#0A0A0A]">
            {/* Spinning orbital gold ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border border-dashed border-[#C8A96E]/40"
            />
            {/* Elegant double-ring image container */}
            <div className="absolute inset-3 rounded-full overflow-hidden border border-[#C8A96E]/30 relative group shadow-[0_0_35px_rgba(200,169,110,0.15)] bg-[#111]">
              <img
                src="/images/profile-portrait.jpeg"
                alt="Sourik Das Professional Portrait"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity duration-500" />
              {/* Overlaid metadata */}
              <div className="absolute bottom-6 left-0 right-0 text-center pointer-events-none px-4 select-none">
                <p className="font-serif text-lg text-[#F2EDE4] font-medium leading-none gold-glow">SD</p>
                <p className="font-mono text-[9px] text-[#C8A96E] uppercase tracking-widest mt-1.5">GID: 8720 AMBASSADOR</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Long-form Biography */}
        <div className="md:col-span-7 space-y-6">
          <h2 className="font-display text-2xl font-bold text-[#F2EDE4] leading-snug">
            Operating at the intersection of technical depth and product thinking.
          </h2>
          {/* Bio text verbatim from spec */}
          <p className="text-[#888880] font-sans font-light text-base md:text-lg leading-relaxed">
            I'm <strong className="text-[#F2EDE4] font-medium">Sourik Das</strong> — a Computer Science student at KIIT University (Batch 2024–2028) who operates at the intersection of technical depth and product thinking. From building federated learning systems to leading marketing operations across large-scale university events, I've cultivated a rare ability to move between code and coordination without losing momentum in either.
          </p>
          <p className="text-[#888880] font-sans font-light text-base md:text-lg leading-relaxed">
            Currently serving as <strong className="text-[#C8A96E] font-medium">Google Student Ambassador for the 2026 Cohort (GID: 8720)</strong>, I represent Google's ecosystem on campus — accelerating adoption of AI tools and Gemini-powered architectures among student developers.
          </p>
        </div>
      </div>

      {/* THE JOURNEY TIMELINE */}
      <div className="mb-32">
        <h2 className="font-display text-3xl font-bold mb-16 text-[#F2EDE4] border-b border-[#C8A96E]/10 pb-4">
          Journey & Milestones
        </h2>

        {/* Vertical timeline */}
        <div className="relative border-l border-[#C8A96E]/20 pl-8 ml-4 md:ml-12 space-y-12 max-w-4xl">
          {timelineMilestones.map((milestone, idx) => (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              key={idx}
              className="relative"
            >
              {/* Golden pulsing dot marker */}
              <div className="absolute top-1.5 -left-[41px] w-5 h-5 bg-[#000] border-2 border-[#C8A96E] rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(200,169,110,0.5)]">
                <div className="w-1.5 h-1.5 bg-[#C8A96E] rounded-full" />
              </div>

              {/* Year badge */}
              <span className="font-mono text-xs text-[#C8A96E] font-bold tracking-widest uppercase block mb-1">
                {milestone.year}
              </span>

              {/* Title & Details */}
              <h3 className="font-display text-lg font-bold text-[#F2EDE4]">
                {milestone.title}
              </h3>
              <p className="text-[#888880] text-sm font-sans font-light mt-2 max-w-xl leading-relaxed">
                {milestone.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* NEW SECTION: INTERACTIVE CAPTURE JOURNAL / PHOTO GALLERY */}
      <div className="mb-32">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
          <div className="space-y-3">
            <span className="text-[#C8A96E] font-display text-[11px] uppercase tracking-[0.3em] font-medium block">
              — IN THE WILD / MOMENTS
            </span>
            <h2 className="font-display text-3xl font-bold text-[#F2EDE4]">
              Persona & Captured Sprints
            </h2>
            <p className="text-sm font-sans text-[#888880] max-w-2xl leading-relaxed">
              Authentic glimpses of a dynamic student-developer lifestyle—spanning critical university keynotes, hardware road trips, active spaces, and late-night compilation challenges. Click on any snapshot to explore its true story.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#C8A96E] bg-[#C8A96E]/5 border border-[#C8A96E]/15 px-4 py-2 rounded-sm border-dashed">
            <ImageIcon size={14} />
            <span>Interactive Multi-media Track</span>
          </div>
        </div>

        {/* Polaroid/Premium Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {photoGallery.map((photo) => (
            <motion.div
              whileHover={{ y: -6 }}
              onClick={() => setSelectedPhoto(photo)}
              key={photo.id}
              className="bg-[#111] p-4 border border-[#C8A96E]/15 hover:border-[#C8A96E]/50 rounded-lg group cursor-pointer transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
            >
              <div className="aspect-[4/3] w-full rounded-md overflow-hidden relative mb-4 border border-[#F2EDE4]/5">
                <img
                  src={photo.url}
                  alt={photo.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute top-3 right-3 bg-[#0A0A0A]/85 border border-[#C8A96E]/20 px-2.5 py-1 text-[9px] font-mono rounded text-[#C8A96E] tracking-widest uppercase">
                  {photo.category}
                </div>
                {photo.id === "sunset" && (
                  <div className="absolute bottom-3 left-3 bg-[#C8A96E] border border-transparent px-2.5 py-1 text-[9px] font-mono rounded text-[#0A0A0A] font-semibold tracking-wider uppercase shadow-md select-none animate-pulse">
                    Bg Selected (19:45:14)
                  </div>
                )}
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-mono text-[#888880] tracking-wide uppercase">
                  {photo.tag}
                </p>
                <h3 className="font-display text-base font-bold text-[#F2EDE4] group-hover:text-[#C8A96E] transition-colors leading-tight">
                  {photo.title}
                </h3>
                <div className="flex items-center gap-3 text-[11px] font-mono text-[#888880] pt-2 border-t border-[#F2EDE4]/5 mt-3">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C8A96E]" />
                    {photo.date}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* VALUES SEGMENT */}
      <div className="mb-32">
        <h2 className="font-display text-3xl font-bold mb-16 text-[#F2EDE4] border-b border-[#C8A96E]/10 pb-4">
          Core Operating Values
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {valuePillars.map((pillar, idx) => (
            <div
              key={idx}
              className="bg-[#111] p-8 rounded-xl border border-[#C8A96E]/10 hover:border-[#C8A96E]/30 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-[#C8A96E]/10 flex items-center justify-center mb-6">
                {pillar.icon}
              </div>
              <h3 className="font-display text-lg font-bold text-[#F2EDE4] mb-3">
                {pillar.title}
              </h3>
              <p className="text-sm font-sans font-light text-[#888880] leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* EDUCATION & CERTIFICATIONS */}
      <div className="mb-12">
        <h2 className="font-display text-3xl font-bold mb-16 text-[#F2EDE4] border-b border-[#C8A96E]/10 pb-4">
          Education & Academy
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Education column */}
          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="mt-1">
                <GraduationCap size={24} className="text-[#C8A96E]" />
              </div>
              <div>
                <h3 className="font-display text-base font-bold text-[#F2EDE4] tracking-tight">
                  B.Tech in Computer Science & Engineering
                </h3>
                <p className="text-sm font-sans text-[#888880] mt-1">
                  KIIT University (2024–2028)
                </p>
                <p className="text-[#888880] text-xs font-sans font-light mt-2">
                  Specializing in systems development, predictive models, and cloud-native frameworks. Active participant inside the Student Activity Centre.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="mt-1">
                <BookOpen size={24} className="text-[#C8A96E]" />
              </div>
              <div>
                <h3 className="font-display text-base font-bold text-[#F2EDE4] tracking-tight">
                  ISC (Intermediate Science Certificate)
                </h3>
                <p className="text-sm font-sans text-[#888880] mt-1">
                  H.S. Memorial School (Completed 2024)
                </p>
                <p className="text-[#888880] text-xs font-sans font-light mt-2">
                  Completed with high-standing analytical, physics, and mathematical foundations.
                </p>
              </div>
            </div>
          </div>

          {/* Certifications column */}
          <div className="bg-[#111] p-8 rounded-xl border border-[#C8A96E]/10">
            <div className="flex items-center gap-2 mb-6">
              <Award size={20} className="text-[#C8A96E]" />
              <h3 className="font-display text-lg font-bold text-[#F2EDE4]">
                Certifications & Credentials
              </h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {[
                "Microsoft Copilot Prompt Writing",
                "Learning M365 Copilot Architecture",
                "Data Science Enterprise (Pinnacle Labs)",
                "CHRONOS Framework (AISOC)",
                "Google Developer Challenge Participant",
                "Kritarth Marketing Officer Award"
              ].map((cert) => (
                <span
                  key={cert}
                  className="px-3 py-1.5 border border-[#C8A96E]/15 rounded bg-[#0A0A0A] text-xs font-mono text-[#F2EDE4] hover:border-[#C8A96E]/40 hover:text-[#C8A96E] transition-colors leading-relaxed"
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FULL PHOTO LIGHTBOX OVERLAY */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            id="lightbox-overlay"
            className="fixed inset-0 bg-[#0A0A0Acc]/95 z-50 flex items-center justify-center p-4 backdrop-blur-md cursor-zoom-out"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="bg-[#111] max-w-4xl w-full rounded-2xl overflow-hidden border border-[#C8A96E]/20 flex flex-col md:flex-row relative cursor-default shadow-[0_25px_70px_rgba(0,0,0,0.8)]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button on corner */}
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-[#0A0A0A]/80 border border-[#F2EDE4]/10 hover:border-[#C8A96E] text-[#F2EDE4] hover:text-[#C8A96E] flex items-center justify-center transition-colors shadow-lg cursor-pointer"
                aria-label="Close Lightbox"
              >
                <X size={16} />
              </button>

              {/* Picture view */}
              <div className="md:w-3/5 aspect-[4/3] md:aspect-auto bg-[#000] relative">
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Story/Details card */}
              <div className="md:w-2/5 p-8 flex flex-col justify-between space-y-6">
                <div>
                  <span className="px-2.5 py-1 bg-[#C8A96E]/10 border border-[#C8A96E]/20 text-[10px] font-mono tracking-widest text-[#C8A96E] uppercase rounded">
                    {selectedPhoto.category}
                  </span>
                  <h3 className="font-display text-2xl font-bold text-[#F2EDE4] mt-4 leading-tight">
                    {selectedPhoto.title}
                  </h3>
                  <p className="text-sm font-sans font-light text-[#888880] mt-3 leading-relaxed">
                    {selectedPhoto.desc}
                  </p>
                </div>

                <div className="border-t border-[#F2EDE4]/5 pt-6 space-y-3.5">
                  <div className="flex items-center gap-3 text-xs text-[#888880] font-sans">
                    <Calendar size={14} className="text-[#C8A96E]/70" />
                    <span>
                      <strong className="text-[#F2EDE4] font-normal">Date:</strong> {selectedPhoto.date}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-[#888880] font-sans">
                    <MapPin size={14} className="text-[#C8A96E]/70" />
                    <span>
                      <strong className="text-[#F2EDE4] font-normal">Location:</strong> {selectedPhoto.location}
                    </span>
                  </div>
                  <div className="inline-block mt-4 text-[9px] font-mono text-[#C8A96E] bg-[#C8A96E]/5 rounded px-2.5 py-1 border border-[#C8A96E]/10 tracking-wider">
                    {selectedPhoto.tag}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

