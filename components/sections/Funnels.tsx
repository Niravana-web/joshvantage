"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FUNNELS = [
  {
    step: "/01",
    keyword: "START",
    name: "JV Launch",
    headline: "Launch a Care Business",
    desc: "For people entering the UK care sector and preparing to launch a regulated care business — with the right CQC foundations from day one.",
    points: ["CQC application preparation", "Policies & governance", "Launch readiness"],
    cta: "Free CQC Readiness Assessment",
    href: "/launch",
    layers: 1,
  },
  {
    step: "/02",
    keyword: "GROW",
    name: "JV Growth",
    headline: "Grow an Existing Care Business",
    desc: "For established UK care providers pursuing suitable tender opportunities — with stronger, evidence-led bids.",
    points: ["Bid / no-bid review", "Evidence-led responses", "Quality & compliance review"],
    cta: "Get My Tender Assessment",
    href: "/growth",
    layers: 2,
  },
  {
    step: "/03",
    keyword: "LEAD",
    name: "JV Training Academy",
    headline: "Prepare for Registered Manager Leadership",
    desc: "For experienced care professionals preparing to compete for Registered Manager opportunities. Admission is by application.",
    points: ["Regulatory readiness", "Leadership & governance", "Interview preparation"],
    cta: "Apply Now",
    href: "/academy",
    layers: 3,
    crowned: true,
  },
];

export default function Funnels() {
  const pin = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = pin.current;
    if (!el) return;
    const mm = gsap.matchMedia(el);

    // Desktop: pinned, scroll-scrubbed sequence
    mm.add("(min-width: 768px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "+=260%",
          pin: true,
          scrub: 0.4,
        },
      });
      tl.fromTo(
        ".funnels-head",
        { autoAlpha: 0, y: 40 },
        { autoAlpha: 1, y: 0, duration: 0.8 },
      );
      tl.fromTo(
        ".funnel-card",
        { autoAlpha: 0, y: 80 },
        { autoAlpha: 1, y: 0, duration: 1, stagger: 1, ease: "power2.out" },
        "+=0.2",
      );
      tl.to({}, { duration: 0.8 }); // hold before unpin
    });

    // Mobile: normal flow, each card reveals as it enters the viewport
    mm.add("(max-width: 767px)", () => {
      gsap.utils.toArray<HTMLElement>(".funnel-card").forEach((card) => {
        gsap.from(card, {
          autoAlpha: 0,
          y: 50,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: card, start: "top 85%" },
        });
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section className="relative z-10">
      <div
        ref={pin}
        className="relative flex flex-col justify-center px-6 py-20 md:h-screen md:overflow-hidden md:py-0 md:px-12"
      >
        <div className="funnels-head mx-auto w-full max-w-6xl">
          <p className="eyebrow-mono text-[var(--brand-pale)]">/YOUR JOURNEY</p>
          <h2 className="mt-4 max-w-2xl text-4xl font-semibold text-white md:text-5xl">
            Where are you on your care journey?
          </h2>
        </div>

        <div className="mx-auto mt-12 grid w-full max-w-6xl gap-5 md:grid-cols-3">
          {FUNNELS.map((f) => (
            <a key={f.name} href={f.href} className="funnel-card group">
              <div className="flex items-baseline justify-between">
                <span className="eyebrow-mono text-[var(--brand-pale)]">
                  {f.step} {f.keyword}
                </span>
                <span aria-hidden className="funnel-arrow">&#8599;</span>
              </div>

              <div className="funnel-iso" aria-hidden>
                {f.crowned && <span className="funnel-crown">&#9670;</span>}
                {Array.from({ length: f.layers }).map((_, i) => (
                  <div key={i} className="funnel-iso-layer" />
                ))}
              </div>

              <p className="eyebrow-mono text-white/50">{f.name}</p>
              <h3 className="mt-1.5 text-2xl font-semibold text-white">
                {f.headline}
              </h3>
              <p className="mt-3 text-[14.5px] leading-relaxed text-white/70">
                {f.desc}
              </p>
              <ul className="mt-4 space-y-1.5 text-[13.5px] text-[var(--brand-pale)]">
                {f.points.map((p) => (
                  <li key={p}>&#9642; {p}</li>
                ))}
              </ul>
              <span className="funnel-cta">{f.cta}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
