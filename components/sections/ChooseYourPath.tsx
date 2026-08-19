"use client";

import Reveal from "@/components/Reveal";
import { track } from "@/lib/analytics";

/*
 * Routes the visitor into the funnel that matches them, placed after the
 * testimonials so it follows the proof rather than competing with it. Each
 * route goes straight into its funnel page rather than back to the homepage
 * pathway picker.
 */
const ROUTES = [
  { question: "Building a care business?", label: "Explore JV Launch", href: "/launch", funnel: "JV Launch" },
  { question: "Growing an existing care business?", label: "Explore JV Growth", href: "/growth", funnel: "JV Growth" },
  { question: "Developing towards care leadership?", label: "Explore JV Academy", href: "/academy", funnel: "JV Academy" },
];

export default function ChooseYourPath() {
  return (
    <section id="choose-your-path" className="bg-white px-6 pb-24 text-[#181815] md:px-12">
      <div className="mx-auto max-w-6xl border-t border-black/10 pt-12">
        <Reveal>
          <p className="eyebrow-mono text-[#8a8a83]">/CHOOSE YOUR PATH</p>
          <h2
            className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight md:text-4xl"
            style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
          >
            Which path is right for you?
          </h2>
        </Reveal>
        <Reveal
          stagger={0.1}
          className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8"
        >
          {ROUTES.map((r) => (
            <div key={r.href} className="flex flex-col items-start">
              <p className="text-[15px] leading-relaxed text-[#4c4c47]">
                {r.question}
              </p>
              <a
                href={r.href}
                onClick={() => track("pathway_click", { funnel: r.funnel, location: "choose_your_path" })}
                className="group mt-5 inline-flex h-12 items-center rounded-full bg-[var(--brand-navy)] px-6 text-[14px] font-semibold text-white transition-colors hover:bg-[#1b2f8d]"
              >
                {r.label}
                <span
                  aria-hidden
                  className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
                >
                  &#8594;
                </span>
              </a>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
