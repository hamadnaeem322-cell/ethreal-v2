import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ASSETS } from "@/lib/assets";

const Frame = ({ src, caption, code, className, parallax = 0, testId }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [parallax, -parallax]);

  return (
    <motion.figure
      ref={ref}
      data-testid={testId}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1.4, ease: [0.2, 0.8, 0.2, 1] }}
      className={`relative overflow-hidden group ${className}`}
    >
      <motion.div style={{ y }} className="w-full h-full">
        <img
          src={src}
          alt={caption}
          className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-[1.04]"
          loading="lazy"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-90 group-hover:opacity-60 transition-opacity duration-700" />
      <figcaption className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-[#f2ebe5]">
        <span className="eyebrow text-[#f2ebe5]/85">{caption}</span>
        <span className="font-display italic text-[#e29578] text-sm">
          {code}
        </span>
      </figcaption>
    </motion.figure>
  );
};

export const VisualProcess = () => {
  return (
    <section
      id="process"
      data-testid="process-section"
      className="relative bg-[#050505] text-[#f2ebe5] py-32 md:py-44 overflow-hidden"
    >
      <div className="max-w-[1500px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-12 gap-y-10 md:gap-12 mb-20 md:mb-28">
          <div className="col-span-12 md:col-span-4">
            <span data-testid="process-eyebrow" className="eyebrow text-[#e29578]">
              Visual Process
            </span>
          </div>
          <div className="col-span-12 md:col-span-8">
            <h2
              data-testid="process-headline"
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight"
            >
              Three frames.
              <br />
              <span className="italic text-[#e29578]">One vow, told in light.</span>
            </h2>
            <p className="mt-8 font-body text-base md:text-lg text-[#f2ebe5]/65 max-w-xl leading-relaxed">
              A single golden hour, distilled into three deliberate
              gestures: surrender, approach, and embrace.
            </p>
          </div>
        </div>

        {/* Tetris-style asymmetric grid */}
        <div className="grid grid-cols-12 gap-4 md:gap-6 auto-rows-[80px] md:auto-rows-[110px]">
          <Frame
            testId="frame-aerial"
            src={ASSETS.aerial}
            caption="Frame 01 · Surrender"
            code="F.01 — Aerial"
            className="col-span-12 md:col-span-7 row-span-5 md:row-span-6"
            parallax={30}
          />
          <Frame
            testId="frame-portrait"
            src={ASSETS.portrait}
            caption="Frame 02 · Vow"
            code="F.02 — Portrait"
            className="col-span-12 md:col-span-5 row-span-5 md:row-span-6"
            parallax={45}
          />
          <Frame
            testId="frame-closeup"
            src={ASSETS.closeUp}
            caption="Frame 03 · Embrace"
            code="F.03 — Close"
            className="col-span-12 md:col-span-8 md:col-start-3 row-span-5 md:row-span-6 mt-2 md:mt-6"
            parallax={25}
          />
        </div>

      </div>
    </section>
  );
};
