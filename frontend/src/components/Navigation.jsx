import { useEffect, useState } from "react";

export const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      data-testid="site-navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled
          ? "bg-[#050505]/70 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
        <button
          data-testid="brand-logo"
          onClick={() => scrollTo("hero")}
          className="font-display text-[#f2ebe5] text-lg md:text-xl tracking-[0.32em] uppercase"
        >
          Iron <span className="text-[#e29578] mx-1">&</span> Blossom
        </button>

        <nav className="hidden md:flex items-center gap-10">
          {[
            { id: "story", label: "Story" },
            { id: "process", label: "Process" },
            { id: "contact", label: "Contact" },
          ].map((item) => (
            <button
              key={item.id}
              data-testid={`nav-${item.id}`}
              onClick={() => scrollTo(item.id)}
              className="eyebrow text-[#a39e98] hover:text-[#f2ebe5] transition-colors duration-500"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button
          data-testid="nav-enter-cta"
          onClick={() => scrollTo("contact")}
          className="hidden md:inline-flex eyebrow text-[#f2ebe5] border-b border-[#e29578]/40 pb-1 hover:border-[#f2ebe5] transition-all duration-500"
        >
          Enter
        </button>
      </div>
    </header>
  );
};
