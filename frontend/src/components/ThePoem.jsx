import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const POEM = [
  {
    ar: "أنتِ الغائبُ الذي لا يحضر",
    en: "You are the absent one who never arrives,",
    ar2: "وَأنتِ الحاضرُ الذي لا يغيب",
    en2: "And the present one who never leaves."
  },
  {
    ar: "في صمتي، أسمعُ صوتكِ",
    en: "In my silence, I hear your voice,",
    ar2: "وفي عزلتي، أرى طيفكِ",
    en2: "And in my solitude, I see your shadow."
  },
  {
    ar: "حملتُكِ أمنيةً لا تتحقق",
    en: "I carried you as a wish that wouldn't come true,",
    ar2: "وحلماً يرفضُ الموت",
    en2: "And a dream that refuses to die."
  },
  {
    ar: "وكلما أغمضتُ عيني",
    en: "And every time I close my eyes,",
    ar2: "وجدتُكِ ملء الدُّنيا",
    en2: "I find you filling the whole world."
  },
  {
    ar: "وإن لم تجمَعنا الأيام",
    en: "And even if our days never intertwine,",
    ar2: "ستظلّينَ دائمًا في قلبي",
    en2: "You will gently remain, forever in my heart."
  }
];

const MathOptions = {
  total: POEM.length,
};

const PoemStanza = ({ stanza, i, scrollYProgress }) => {
  const step = 1 / MathOptions.total;
  const start = i * step;
  const fullVisible = start + (step * 0.25);
  const startHide = start + (step * 0.75);
  const completelyHidden = start + step;

  const opacity = useTransform(
    scrollYProgress,
    [start, fullVisible, startHide, completelyHidden],
    [0, 1, 1, 0]
  );

  const y = useTransform(
    scrollYProgress,
    [start, fullVisible, startHide, completelyHidden],
    ["3%", "0%", "0%", "-3%"]
  );

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center text-center px-8 md:px-0"
      style={{ opacity, y }}
    >
      <div className="flex flex-col gap-12 md:gap-20 max-w-4xl mx-auto">
        <div>
          <h2 
            className="font-display text-[2rem] md:text-5xl lg:text-[4rem] text-[#e29578] leading-tight tracking-wide opacity-80" 
            style={{ direction: "rtl", textShadow: "0 4px 20px rgba(226,149,120,0.15)" }}
          >
            {stanza.ar}
          </h2>
          <p className="font-body text-base md:text-xl lg:text-2xl text-[#f2ebe5]/60 italic mt-6 tracking-widest font-light">
            {stanza.en}
          </p>
        </div>
        <div>
          <h2 
            className="font-display text-[2rem] md:text-5xl lg:text-[4rem] text-[#e29578] leading-tight tracking-wide opacity-80" 
            style={{ direction: "rtl", textShadow: "0 4px 20px rgba(226,149,120,0.15)" }}
          >
            {stanza.ar2}
          </h2>
          <p className="font-body text-base md:text-xl lg:text-2xl text-[#f2ebe5]/60 italic mt-6 tracking-widest font-light">
            {stanza.en2}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export const ThePoem = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heartbeatRef = useRef(null);

  useEffect(() => {
    const el = heartbeatRef.current;
    if (!el) return;

    // A real heartbeat: thump-thump ... pause ... thump-thump
    const beat = () => {
      // First thump
      el.style.opacity = "1";
      setTimeout(() => { el.style.opacity = "0.15"; }, 150);
      // Second thump
      setTimeout(() => { el.style.opacity = "0.8"; }, 350);
      setTimeout(() => { el.style.opacity = "0.15"; }, 500);
    };

    el.style.transition = "opacity 120ms ease";
    beat();
    const id = setInterval(beat, 1800);
    return () => clearInterval(id);
  }, []);

  return (
    <section ref={containerRef} className="relative w-full" style={{ height: "600vh", zIndex: 10, background: "linear-gradient(180deg, #050505 0%, #1a0808 8%, #160a06 50%, #120805 92%, #050505 100%)" }}>
      {/* A dark ambient overlay to ensure it feels continuous with the video */}
      <div className="absolute inset-0 z-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 40%, rgba(60, 12, 8, 0.3) 0%, transparent 70%)" }} />
      
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden z-10">
        <div className="absolute inset-0 grain opacity-40 pointer-events-none z-20" />
        <div className="absolute inset-0 vignette opacity-60 pointer-events-none z-20" />

        {/* The Deep Red Heartbeat Ambient Light */}
        <div 
          ref={heartbeatRef}
          className="absolute inset-0 pointer-events-none z-0"
          style={{ 
            background: "radial-gradient(circle at 50% 50%, rgba(160, 15, 15, 0.3) 0%, rgba(120, 10, 10, 0.15) 25%, rgba(80, 10, 10, 0.06) 50%, transparent 80%)",
            opacity: 0.3
          }} 
        />

        {/* Stanzas wrapper */}
        <div className="absolute inset-0 z-10">
          {POEM.map((stanza, i) => (
            <PoemStanza 
              key={i} 
              stanza={stanza} 
              i={i} 
              scrollYProgress={scrollYProgress} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};
