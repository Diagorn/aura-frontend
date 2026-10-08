/** Декоративный «аврора»-фон: мягкие светящиеся пятна + лёгкое зерно (из aura-landing) */
export function AuroraBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_0%,var(--bg-soft),var(--bg)_60%)]" />
      <div className="animate-blob absolute -top-48 -left-40 h-[36rem] w-[36rem] rounded-full bg-violet-500/25 blur-3xl dark:bg-violet-600/20" />
      <div className="animate-blob-slow absolute -top-24 right-[-10rem] h-[30rem] w-[30rem] rounded-full bg-fuchsia-400/20 blur-3xl dark:bg-fuchsia-600/15" />
      <div className="animate-blob absolute top-[45%] left-[55%] h-[28rem] w-[28rem] rounded-full bg-cyan-300/20 blur-3xl [animation-delay:-14s] dark:bg-cyan-500/12" />
      <div className="animate-blob-slow absolute bottom-[-12rem] left-[-8rem] h-[30rem] w-[30rem] rounded-full bg-teal-300/15 blur-3xl [animation-delay:-20s] dark:bg-teal-500/10" />
      <div className="noise absolute inset-0" />
    </div>
  )
}
