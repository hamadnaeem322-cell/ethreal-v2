import { motion } from "framer-motion";

const MOVEMENTS = [
  {
    label: "Movement I",
    title: "Iron",
    desc: "The strength they carried without ever naming it. Quiet, constant, never asking to be seen.",
  },
  {
    label: "Movement II",
    title: "Blossom",
    desc: "The gentleness underneath — the way they softened every room they entered, without a word.",
  },
  {
    label: "Movement III",
    title: "Vow",
    desc: "What remains. A promise kept in memory, told again each time this story is opened.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 1.1, ease: [0.2, 0.8, 0.2, 1] } },
};

export const Story = () => {
  return (
    <section
      id="story"
      data-testid="story-section"
      className="relative bg-[#050505] text-[#f2ebe5] overflow-hidden"
    >
      {/* Decorative type — running marquee */}
      <div className="border-y border-white/5 py-6 overflow-hidden">
        <div className="ib-marquee">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex items-center gap-12 px-6 whitespace-nowrap">
              {Array.from({ length: 8 }).map((__, i) => (
                <span
                  key={i}
                  className="font-display italic text-3xl md:text-5xl text-[#f2ebe5]/40"
                >
                  Iron <span className="text-[#e29578]">&</span> Blossom
                  <span className="mx-6 text-[#e29578]/60">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-[1500px] mx-auto px-6 md:px-12 py-32 md:py-44">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="grid grid-cols-12 gap-y-10 md:gap-12"
        >
          <div className="col-span-12 md:col-span-4">
            <span
              data-testid="story-eyebrow"
              className="eyebrow text-[#e29578]"
            >
              The Story
            </span>
          </div>

          <div className="col-span-12 md:col-span-8">
            <h2
              data-testid="story-headline"
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight"
            >
              Some people are not remembered.
              <br />
              <span className="italic text-[#e29578]">They are vowed.</span>
            </h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-12 mt-24 md:mt-32 gap-y-16 md:gap-12">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="col-span-12 md:col-span-5 md:col-start-2"
          >
            <p
              data-testid="story-paragraph-1"
              className="dropcap font-body text-base md:text-lg leading-[1.85] text-[#f2ebe5]/80"
            >
              Iron & Blossom began in the silence between two worlds — the
              field that forgives and the steel that remembers. This is not a
              story we tell; it is a vow we keep. Each frame is a small
              ceremony, sealed with fire and softened only by petal and
              patience.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="col-span-12 md:col-span-5 md:col-start-8 md:mt-32"
          >
            <p
              data-testid="story-paragraph-2"
              className="font-body text-base md:text-lg leading-[1.85] text-[#f2ebe5]/65"
            >
              The first chapter is a meditation on surrender — armor laid
              down in a meadow at golden hour. From this single image the
              tribute unfolds in three movements: iron, blossom, and vow.
            </p>
            <div className="mt-10 h-px w-24 bg-[#e29578]/60" />
            <p className="mt-6 eyebrow text-[#a39e98]">
              In memory · Told in light
            </p>
          </motion.div>
        </div>

        {/* Movements triptych */}
        <div className="mt-32 md:mt-44 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
          {MOVEMENTS.map((movement, i) => (
            <motion.div
              key={movement.title}
              data-testid={`note-card-${i + 1}`}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: i * 0.12 }}
              className="border-t border-[#c89f70]/25 pt-8 group"
            >
              <div className="flex items-baseline justify-between mb-6">
                <span className="eyebrow text-[#a39e98]">{movement.label}</span>
                <span className="font-display italic text-[#e29578] text-lg">
                  · 0{i + 1}
                </span>
              </div>
              <h3 className="font-display text-3xl md:text-4xl text-[#f2ebe5] mb-5 group-hover:text-[#e29578] transition-colors duration-700">
                {movement.title}
              </h3>
              <p className="font-body text-sm md:text-base text-[#f2ebe5]/65 leading-[1.85]">
                {movement.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
