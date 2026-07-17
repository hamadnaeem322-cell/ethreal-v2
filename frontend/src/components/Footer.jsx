export const Footer = () => {
  return (
    <footer
      data-testid="site-footer"
      className="relative bg-[#050505] text-[#f2ebe5] border-t border-white/5"
    >
      <div className="max-w-[1500px] mx-auto px-6 md:px-12 py-14 flex flex-col md:flex-row items-start md:items-end justify-between gap-10">
        <div>
          <div className="font-display text-3xl md:text-4xl tracking-[0.18em] uppercase">
            Iron <span className="text-[#e29578]">&</span> Blossom
          </div>
          <p className="mt-3 eyebrow text-[#a39e98]">
            A Tribute · MMXXV
          </p>
        </div>
      </div>
      <div className="border-t border-white/5">
        <div className="max-w-[1500px] mx-auto px-6 md:px-12 py-5 text-[10px] tracking-[0.32em] uppercase text-[#a39e98]/70 flex justify-between">
          <span>Iron & Blossom</span>
          <span className="hidden md:inline">All petals reserved</span>
        </div>
      </div>
    </footer>
  );
};
