import React from "react";

const partners = [
  "PARTNER 01",
  "PARTNER 02",
  "PARTNER 03",
  "PARTNER 04",
  "PARTNER 05",
  "PARTNER 06",
  "PARTNER 07",
  "PARTNER 08",
];

export default function Partners() {
  return (
    <section
      id="partners"
      className="relative border-t border-white/10 px-6 py-24 md:px-12 lg:px-20"
    >
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-12">
          <p className="mb-3 font-mono text-xs tracking-[0.3em] text-[#f59e0b]">
            COLLABORATION
          </p>

          <h2 className="text-4xl font-bold tracking-tight md:text-6xl">
            PARTNERS
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/60 md:text-base">
            Organizations supporting the Hack for Good community and helping
            ideas move from prototypes to meaningful impact.
          </p>
        </div>

        {/* Partner logo grid */}
        <div className="grid grid-cols-2 border-l border-t border-white/10 sm:grid-cols-3 lg:grid-cols-4">
          {partners.map((partner) => (
            <div
              key={partner}
              className="flex min-h-32 items-center justify-center border-b border-r border-white/10 p-6"
            >
              <div className="text-center font-mono text-sm tracking-widest text-white/30 grayscale transition-all duration-300 hover:text-white hover:grayscale-0">
                {partner}
              </div>
            </div>
          ))}
        </div>

        {/* NGO CTA */}
        <div className="mt-20 flex flex-col items-start justify-between gap-8 border-t border-white/10 pt-10 md:flex-row md:items-center">
          <div className="max-w-2xl">
            <p className="mb-3 font-mono text-xs tracking-[0.3em] text-[#f59e0b]">
              FOR NGOs
            </p>

            <h3 className="text-2xl font-semibold md:text-3xl">
              Have a problem worth solving?
            </h3>

            <p className="mt-3 text-sm leading-7 text-white/60">
              Share a real-world challenge with our community and help teams
              build technology that creates meaningful social impact.
            </p>
          </div>

          <button
            type="button"
            className="shrink-0 border border-[#f59e0b] px-6 py-3 font-mono text-xs font-bold uppercase tracking-widest text-[#f59e0b] transition-colors duration-300 hover:bg-[#f59e0b] hover:text-black"
          >
            Register your NGO
          </button>
        </div>
      </div>
    </section>
  );
}