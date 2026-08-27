"use client";

import Reveal from "@/components/Reveal";
import { track } from "@/lib/analytics";

/*
 * Final homepage CTA. Deliberately one action: the three pathway routes are
 * already offered directly above in Choose Your Path, so repeating them here
 * would split attention at the point of decision. This sends undecided
 * visitors back to the pathway picker instead.
 */
export default function FinalCta() {
  return (
    <section id="next-step" className="funnels-bg px-6 py-28 text-white md:px-12">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <p className="eyebrow-mono text-[var(--brand-pale)]">/NEXT STEP</p>
          <h2
            className="mt-6 text-4xl font-semibold md:text-5xl"
            style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
          >
            Ready to take your next step?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-[15.5px] font-light leading-relaxed text-white/80">
            Not sure which Josh Vantage pathway is right for you? Start by
            choosing where you are now.
          </p>
        </Reveal>
        <Reveal className="mt-11 flex justify-center">
          <a
            href="#journey"
            onClick={() => track("find_your_path_click", { location: "final_cta" })}
            className="group flex h-13 items-center rounded-full border border-white/30 px-8 py-3.5 text-[14.5px] font-semibold text-white transition-colors hover:border-[var(--brand-pale)] hover:bg-[var(--brand-pale)] hover:text-[var(--brand-navy)] focus-visible:border-[var(--brand-pale)] focus-visible:bg-[var(--brand-pale)] focus-visible:text-[var(--brand-navy)]"
          >
            Choose Your Path
            <span
              aria-hidden
              className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
            >
              &#8594;
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
