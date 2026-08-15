"use client";

import { useRef } from "react";
import SectionHead from "@/components/SectionHead";

/*
 * Written client reviews carousel — 3 visible per page on desktop, swipe
 * or arrows for the rest. REVIEWS stays empty until the client supplies
 * genuine, verified reviews (names, text and star ratings); the section
 * renders nothing while empty — no fabricated or placeholder reviews.
 */
type Review = {
  funnel: "launch" | "growth" | "academy";
  stars: 1 | 2 | 3 | 4 | 5;
  text: string;
  name: string;
};

const REVIEWS: Review[] = [];

export default function Reviews() {
  const track = useRef<HTMLDivElement>(null);
  if (REVIEWS.length === 0) return null;

  const page = (dir: number) =>
    track.current?.scrollBy({ left: dir * track.current.clientWidth, behavior: "smooth" });

  const arrow =
    "grid h-11 w-11 place-items-center rounded-full border border-black/15 text-lg transition-colors hover:border-[var(--brand-navy)] hover:text-[var(--brand-navy)]";

  return (
    <section className="bg-white px-6 py-24 text-[#181815] md:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-end justify-between gap-6">
          <SectionHead eyebrow="CLIENT REVIEWS" title="What clients say" />
          <div className="hidden shrink-0 gap-2 md:flex">
            <button type="button" aria-label="Previous reviews" className={arrow} onClick={() => page(-1)}>
              &#8592;
            </button>
            <button type="button" aria-label="Next reviews" className={arrow} onClick={() => page(1)}>
              &#8594;
            </button>
          </div>
        </div>

        <div
          ref={track}
          className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {REVIEWS.map((r) => (
            <article
              key={r.name + r.text.slice(0, 16)}
              className="notch-card w-[85%] shrink-0 snap-start border border-black/5 bg-[#f7f7f5] p-7 md:w-[calc((100%-2.5rem)/3)]"
            >
              <p aria-label={`${r.stars} out of 5 stars`} className="text-[15px] tracking-[0.25em] text-[var(--brand-navy)]">
                {"★".repeat(r.stars)}
                <span aria-hidden className="text-black/15">{"★".repeat(5 - r.stars)}</span>
              </p>
              <p className="mt-4 text-[14.5px] leading-relaxed text-[#33332f]">{r.text}</p>
              <p className="eyebrow-mono mt-5 text-[#8a8a83]">{r.name.toUpperCase()}</p>
            </article>
          ))}
        </div>
        <p className="eyebrow-mono mt-4 text-[11px] text-[#8a8a83] md:hidden">SWIPE FOR MORE &#8594;</p>
      </div>
    </section>
  );
}
