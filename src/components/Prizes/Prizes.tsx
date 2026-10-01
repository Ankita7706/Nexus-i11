import React from "react";

const prizes = [
  {
    place: "01",
    title: "1ST PRIZE",
    amount: "TBA",
  },
  {
    place: "02",
    title: "2ND PRIZE",
    amount: "TBA",
  },
  {
    place: "03",
    title: "3RD PRIZE",
    amount: "TBA",
  },
  {
    place: "★",
    title: "SPECIAL PRIZE",
    subtitle: "BEST COMMUNITY IMPACT",
    amount: "TBA",
  },
];

export default function Prizes() {
  return (
    <section id="prizes" className="relative py-24 px-6 md:px-12 lg:px-20">
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mb-12">
          <p className="mb-3 font-mono text-xs tracking-[0.3em] text-[#f59e0b]">
            REWARDS
          </p>

          <h2 className="text-4xl font-bold tracking-tight md:text-6xl">
            PRIZES
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/60 md:text-base">
            Recognition and rewards for teams creating meaningful,
            real-world impact.
          </p>
        </div>

        {/* Prize cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {prizes.map((prize) => (
            <article
              key={prize.title}
              className="group relative min-h-[260px] overflow-hidden border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 hover:border-[#f59e0b]/50 hover:bg-white/[0.05]"
            >
              <div className="flex h-full flex-col justify-between">
                <div>
                  <span className="font-mono text-xs tracking-widest text-white/40">
                    {prize.place}
                  </span>

                  <h3 className="mt-8 text-xl font-semibold">
                    {prize.title}
                  </h3>

                  {prize.subtitle && (
                    <p className="mt-2 text-xs font-medium uppercase tracking-wider text-white/50">
                      {prize.subtitle}
                    </p>
                  )}
                </div>

                <div>
                  <p className="font-mono text-2xl font-bold text-[#f59e0b]">
                    {prize.amount}
                  </p>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 h-px w-0 bg-[#f59e0b] transition-all duration-500 group-hover:w-full" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}