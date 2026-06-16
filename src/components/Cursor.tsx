import { useEffect, useState } from "react";

export default function Cursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    // Check if device is mobile/tablet
    const checkDevice = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        document.body.classList.add("custom-cursor-enabled");
      } else {
        document.body.classList.remove("custom-cursor-enabled");
      }
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setHidden(false);
    };

    const onMouseDown = () => setClicked(true);
    const onMouseUp = () => setClicked(false);
    const onMouseLeave = () => setHidden(true);
    const onMouseEnter = () => setHidden(false);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      window.removeEventListener("resize", checkDevice);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.body.classList.remove("custom-cursor-enabled");
    };
  }, []);

  // Animating trailing ring with 120ms lag
  useEffect(() => {
    if (isMobile || hidden) return;

    let id: number;
    const animateTrail = () => {
      setTrail((prev) => {
        const dx = position.x - prev.x;
        const dy = position.y - prev.y;
        return {
          x: prev.x + dx * 0.15, // Smooth interpolation factor (~120ms lag)
          y: prev.y + dy * 0.15,
        };
      });
      id = requestAnimationFrame(animateTrail);
    };

    id = requestAnimationFrame(animateTrail);
    return () => cancelAnimationFrame(id);
  }, [position, isMobile, hidden]);

  if (isMobile || hidden) return null;

  return (
    <>
      {/* Outer Ring with Lerp Lag */}
      <div
        style={{
          transform: `translate3d(${trail.x - 12}px, ${trail.y - 12}px, 0) scale(${clicked ? 0.8 : 1})`,
          transition: "transform 0.05s ease-out",
        }}
        className="fixed top-0 left-0 w-6 h-6 border border-[#C8A96E] rounded-full pointer-events-none z-[9999] opacity-70"
      />
      {/* Centered Golden Dot */}
      <div
        style={{
          transform: `translate3d(${position.x - 4}px, ${position.y - 4}px, 0)`,
        }}
        className="fixed top-0 left-0 w-2 h-2 bg-[#C8A96E] rounded-full pointer-events-none z-[10000] shadow-[0_0_10px_#C8A96E]"
      />
    </>
  );
}
