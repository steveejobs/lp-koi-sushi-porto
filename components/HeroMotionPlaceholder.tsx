export function HeroMotionPlaceholder() {
  return (
    <div className="relative mx-auto w-full max-w-[560px] overflow-hidden rounded-lg border border-black/10 bg-[#fffaf4] shadow-[0_28px_80px_rgba(16,16,16,0.1)]">
      <div className="absolute right-5 top-5 h-24 w-24 rounded-full bg-[var(--chambar-red)] shadow-[0_18px_45px_rgba(196,30,47,0.2)]" />
      <div className="absolute left-8 top-7 h-px w-56 origin-left animate-[lineSweep_4.5s_ease-in-out_infinite] bg-black" />
      <div className="absolute bottom-8 right-7 h-px w-44 origin-left animate-[lineSweep_5.4s_ease-in-out_infinite] bg-black/80" />

      <div className="relative grid aspect-[5/4] content-between p-8">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.08em] text-[var(--chambar-red)]">
            À mesa
          </p>
          <p className="mt-4 max-w-[15rem] text-5xl font-black leading-[0.95] text-neutral-950">
            Menu Infinity e cozinha chinesa no Porto.
          </p>
        </div>

        <div className="grid gap-3">
          {["Sushi", "Cozinha chinesa", "Take Away"].map((item) => (
            <div
              key={item}
              className="flex items-center justify-between border-b border-black/12 pb-3 text-sm font-black uppercase tracking-wide text-neutral-800"
            >
              <span>{item}</span>
              <span className="h-2 w-8 rounded-full bg-[var(--chambar-red)]" />
            </div>
          ))}
        </div>

        <div className="absolute bottom-8 left-8 h-20 w-20 border-l border-t border-black/18" />
        <div className="absolute right-10 top-28 h-28 w-px bg-black/16" />
      </div>
    </div>
  );
}
