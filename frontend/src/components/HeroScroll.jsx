import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

const PHASES = [
  {
    eyebrow: "Chapter I — The Field",
    title: "Where Iron",
    italic: "Lays Down",
    body: "A boundless meadow at the hour of last light. Petals tremble in a breath that has waited centuries.",
  },
  {
    eyebrow: "Chapter II — The Knight",
    title: "Forged",
    italic: "in Blossoms",
    body: "Closer now. The armor does not rust — it remembers. Every dent a vow. Every shadow a prayer.",
  },
  {
    eyebrow: "Chapter III — The Bloom",
    title: "Enter",
    italic: "the World",
    body: "A single petal alights. Steel softens. The memory awakens.",
  },
];

export const HeroScroll = () => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const targetTimeRef = useRef(0);
  const rafRef = useRef(null);
  const seekingRef = useRef(false);
  const lastAppliedRef = useRef(-1);
  const [videoReady, setVideoReady] = useState(false);
  const [durationVal, setDurationVal] = useState(15);

  const progress = useMotionValue(0);

  useEffect(() => {
    const compute = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const heroH = el.offsetHeight;
      const pinRange = heroH - vh;
      const distanceIntoSection = -rect.top;
      const p = Math.max(0, Math.min(1, distanceIntoSection / pinRange));
      progress.set(p);
      targetTimeRef.current = Math.max(0, Math.min(durationVal - 0.05, p * durationVal));
    };
    compute();
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute);
    return () => {
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
    };
  }, [progress, durationVal]);

  useEffect(() => {
    let mounted = true;
    const tick = () => {
      if (!mounted) return;
      const video = videoRef.current;
      if (video && videoReady && !seekingRef.current) {
        const target = targetTimeRef.current;
        if (Math.abs(target - lastAppliedRef.current) > 0.05) {
          try {
            if (typeof video.fastSeek === "function") video.fastSeek(target);
            else video.currentTime = target;
            lastAppliedRef.current = target;
          } catch (_) {}
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      mounted = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [videoReady]);

  const onLoadedMeta = () => {
    const video = videoRef.current;
    if (!video) return;
    setDurationVal(video.duration || 15);
    const ready = () => {
      try { video.currentTime = 0.01; } catch (_) {}
      setVideoReady(true);
    };
    const pp = video.play();
    if (pp && typeof pp.then === "function") {
      pp.then(() => { video.pause(); ready(); }).catch(() => ready());
    } else {
      ready();
    }
  };

  const onSeeking = () => { seekingRef.current = true; };
  const onSeeked = () => { seekingRef.current = false; };

  // === Phase opacity & motion ===
  // Phase 1: 0.00 - 0.30 ; Transition A 0.30 - 0.42 ; Phase 2: 0.42 - 0.58
  // Transition B: 0.58 - 0.72 ; Phase 3: 0.72 - 1.00
  const p1 = useTransform(progress, [0.00, 0.04, 0.28, 0.38], [1, 1, 1, 0]);
  const p2 = useTransform(progress, [0.36, 0.46, 0.56, 0.66], [0, 1, 1, 0]);
  const p3 = useTransform(progress, [0.64, 0.74, 1.0], [0, 1, 1]);

  const p1Y = useTransform(progress, [0.0, 0.38], ["0%", "-6%"]);
  const p2Y = useTransform(progress, [0.36, 0.66], ["6%", "-6%"]);
  const p3Y = useTransform(progress, [0.64, 1.0], ["6%", "0%"]);

  // Subtle scale/blur for outgoing/incoming text — gives "cinematic pull" without being loud
  const p1Scale = useTransform(progress, [0.28, 0.38], [1, 0.985]);
  const p2Scale = useTransform(progress, [0.36, 0.46, 0.56, 0.66], [0.985, 1, 1, 0.985]);
  const p3Scale = useTransform(progress, [0.64, 0.74], [1.015, 1]);
  const p1Filter = useTransform(progress, [0.28, 0.38], ["blur(0px)", "blur(4px)"]);
  // Phase 2 has both fade-in and fade-out blur — combine into single MotionValue
  const p2Filter = useTransform(progress, [0.36, 0.46, 0.56, 0.66], [4, 0, 0, 4]);
  const p2FilterStr = useTransform(p2Filter, (v) => `blur(${v}px)`);
  const p3FilterIn = useTransform(progress, [0.64, 0.74], ["blur(4px)", "blur(0px)"]);

  const scrollHint = useTransform(progress, [0, 0.04], [1, 0]);

  // === Transition A (1 → 2): soft warm light veil sweeps across ===
  const veilOpacity = useTransform(
    progress,
    [0.28, 0.34, 0.40, 0.46],
    [0, 0.28, 0.28, 0]
  );
  const veilX = useTransform(progress, [0.28, 0.46], ["-30%", "30%"]);

  // === Transition B (2 → 3): gentle darken + petal drift + soft iris pull ===
  const darkenOpacity = useTransform(
    progress,
    [0.56, 0.62, 0.68, 0.74],
    [0, 0.35, 0.35, 0]
  );
  const irisOpacity = useTransform(
    progress,
    [0.58, 0.65, 0.74],
    [0, 0.22, 0]
  );
  const irisScale = useTransform(progress, [0.58, 0.74], [0.6, 1.4]);

  // Selective darkening: keep the chest-close-up (footage 4) bright like 1/2/3,
  // only dim the final petal/bloom ending (footage 5, ~progress 0.82+ where the
  // video itself peaks in brightness with the sun bloom).
  const phase3Darken = useTransform(
    progress,
    [0.78, 0.88, 1.0],
    [0, 0.55, 0.82]
  );

  // Footage 4 (chest close-up) is naturally dim in the video — apply a gentle
  // warm "lift" overlay so it reads at the same exposure as footages 1/2/3.
  const footage4Lift = useTransform(
    progress,
    [0.60, 0.70, 0.78, 0.82],
    [0, 0.22, 0.22, 0]
  );

  // Subtle video transform during transitions (scale up slightly, then back)
  const videoScale = useTransform(
    progress,
    [0.30, 0.40, 0.58, 0.68],
    [1, 1.035, 1.04, 1]
  );

  return (
    <section
      id="hero"
      ref={containerRef}
      data-testid="hero-scroll-section"
      className="relative w-full"
      style={{ height: "500vh" }}
    >
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden bg-black grain vignette">
        {/* Permanent poster fallback */}
        <img
          src="https://customer-assets.emergentagent.com/job_d9f509e9-a4f4-4b8e-83a0-867cc7ea2efd/artifacts/v5xrgcyg_zoomout.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        {/* Scroll-scrubbed video — subtly scales during transitions */}
        <motion.video
          ref={videoRef}
          data-testid="hero-video"
          className="absolute inset-0 w-full h-full object-cover z-[1] will-change-transform"
          style={{ scale: videoScale }}
          src="/media/hero.mp4"
          muted
          playsInline
          preload="auto"
          onLoadedMetadata={onLoadedMeta}
          onLoadedData={onLoadedMeta}
          onSeeking={onSeeking}
          onSeeked={onSeeked}
        />

        {/* === Atmospheric tone-down layer (subtle, not heavy) === */}
        <div
          className="absolute inset-0 z-[2] pointer-events-none mix-blend-multiply"
          style={{
            background:
              "radial-gradient(ellipse at 50% 40%, rgba(40,20,10,0.15) 0%, rgba(15,8,5,0.35) 70%, rgba(5,3,2,0.55) 100%)",
          }}
        />

        {/* Standard legibility gradients */}
        <div className="absolute inset-0 z-[3] bg-gradient-to-b from-black/35 via-black/10 to-black/65 pointer-events-none" />
        <div className="absolute inset-0 z-[3] bg-gradient-to-r from-black/55 via-black/0 to-black/15 pointer-events-none" />

        {/* === Transition A: warm peach light veil (subtle horizontal sweep) === */}
        <motion.div
          data-testid="transition-a-veil"
          className="absolute inset-0 z-[5] pointer-events-none"
          style={{ opacity: veilOpacity, x: veilX }}
        >
          <div
            className="w-[60%] h-full"
            style={{
              background:
                "linear-gradient(90deg, rgba(226,149,120,0) 0%, rgba(226,149,120,0.22) 35%, rgba(242,235,229,0.28) 50%, rgba(226,149,120,0.22) 65%, rgba(226,149,120,0) 100%)",
              filter: "blur(40px)",
              mixBlendMode: "screen",
            }}
          />
        </motion.div>

        {/* === Transition B: gentle darken === */}
        <motion.div
          data-testid="transition-b-darken"
          className="absolute inset-0 z-[5] pointer-events-none bg-black"
          style={{ opacity: darkenOpacity }}
        />

        {/* === Footage 4 (chest close-up) lift — counters natural dimness of that video frame === */}
        <motion.div
          data-testid="footage-4-lift"
          className="absolute inset-0 z-[4] pointer-events-none mix-blend-screen"
          style={{
            opacity: footage4Lift,
            background:
              "radial-gradient(ellipse at 40% 50%, rgba(228,180,140,0.45) 0%, rgba(196,140,100,0.20) 45%, rgba(0,0,0,0) 75%)",
          }}
        />

        {/* === Footage 5 (final petal/bloom) dedicated shadow — only kicks in at the very end === */}
        <motion.div
          data-testid="phase-3-shadow"
          className="absolute inset-0 z-[5] pointer-events-none"
          style={{
            opacity: phase3Darken,
            background:
              "radial-gradient(ellipse at 30% 55%, rgba(10,6,4,0.50) 0%, rgba(5,3,2,0.85) 55%, rgba(2,1,1,0.96) 100%)",
          }}
        />

        {/* === Transition B: soft iris/bloom from center === */}
        <motion.div
          data-testid="transition-b-iris"
          className="absolute inset-0 z-[6] pointer-events-none flex items-center justify-center"
          style={{ opacity: irisOpacity }}
        >
          <motion.div
            style={{ scale: irisScale }}
            className="w-[70vmin] h-[70vmin] rounded-full"
          >
            <div
              className="w-full h-full rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(226,149,120,0.30) 0%, rgba(226,149,120,0.08) 40%, transparent 70%)",
                filter: "blur(60px)",
                mixBlendMode: "screen",
              }}
            />
          </motion.div>
        </motion.div>

        {/* Phase texts */}
        <div className="absolute inset-0 z-[10] flex items-center justify-start px-6 md:px-20 lg:px-28 pointer-events-none">
          <div className="relative w-full max-w-3xl h-[60vh] md:h-[55vh]">
            <motion.div
              data-testid="hero-phase-1"
              style={{ opacity: p1, y: p1Y, scale: p1Scale, filter: p1Filter }}
              className="absolute inset-0 flex flex-col justify-center pointer-events-auto will-change-transform"
            >
              <PhaseBlock data={PHASES[0]} index="01" />
            </motion.div>
            <motion.div
              data-testid="hero-phase-2"
              style={{ opacity: p2, y: p2Y, scale: p2Scale, filter: p2FilterStr }}
              className="absolute inset-0 flex flex-col justify-center pointer-events-auto will-change-transform"
            >
              <PhaseBlock data={PHASES[1]} index="02" />
            </motion.div>
            <motion.div
              data-testid="hero-phase-3"
              style={{ opacity: p3, y: p3Y, scale: p3Scale, filter: p3FilterIn }}
              className="absolute inset-0 flex flex-col justify-center pointer-events-auto will-change-transform"
            >
              <PhaseBlock data={PHASES[2]} index="03" showCta />
            </motion.div>
          </div>
        </div>

        {/* Scroll hint */}
        <motion.div
          style={{ opacity: scrollHint }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[15] flex flex-col items-center gap-3 pointer-events-none"
        >
          <span className="eyebrow text-[#f2ebe5]/60">Scroll to Reveal</span>
          <div className="w-px h-12 bg-gradient-to-b from-[#e29578]/0 via-[#e29578]/70 to-[#e29578]/0 animate-pulse" />
        </motion.div>

        {/* Side caption */}
        <div className="hidden lg:flex absolute right-8 top-1/2 -translate-y-1/2 z-[15] [writing-mode:vertical-rl] rotate-180 pointer-events-none">
          <span className="eyebrow text-[#f2ebe5]/30">
            Iron & Blossom · A Tribute
          </span>
        </div>
      </div>
    </section>
  );
};

// (Removed unused combined-filter helper — phase 2 uses a single numeric MotionValue.)

const PhaseBlock = ({ data, index, showCta }) => {
  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="text-[#f2ebe5] w-full">
      <div className="flex items-center gap-4 mb-5">
        <span className="eyebrow text-[#e29578]">{data.eyebrow}</span>
        <span className="font-display italic text-[#a39e98] text-sm">
          — {index} / 03
        </span>
      </div>
      <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[7.5rem] leading-[0.92] tracking-tight">
        {data.title}
        <br />
        <span className="italic text-[#e29578]">{data.italic}</span>
      </h1>
      <p className="mt-6 md:mt-8 font-body text-base md:text-lg text-[#f2ebe5]/75 max-w-xl leading-relaxed font-light">
        {data.body}
      </p>
      {showCta && (
        <div className="mt-8 md:mt-10">
          <button
            data-testid="hero-enter-world-cta"
            onClick={scrollToContact}
            className="ib-cta"
          >
            Enter the World
            <span className="ib-cta-arrow" />
          </button>
        </div>
      )}
    </div>
  );
};
