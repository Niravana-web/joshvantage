"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    num: "/01",
    title: "Assess",
    desc: "Every journey starts with a short assessment — where you are, what stage you have reached, and what is standing in the way. No commitment, no generic contact form.",
  },
  {
    num: "/02",
    title: "Diagnose",
    desc: "On a focused 20-minute strategy call we look at your situation honestly: what is ready, what is missing, and whether we are the right support for it.",
  },
  {
    num: "/03",
    title: "Plan",
    desc: "You get a clear, scoped plan matched to your stage — the exact scope is confirmed together and reflected in the service agreement before anything begins.",
  },
  {
    num: "/04",
    title: "Build",
    desc: "We deliver the work alongside you — applications, policies, bids, or leadership preparation — with practical support at every step of the journey.",
  },
];

export default function Method() {
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const panels = el.querySelectorAll<HTMLElement>(".method-step");
      const layers = el.querySelectorAll<HTMLElement>(".iso-layer");

      const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top top",
        end: `+=${STEPS.length * 90 + 40}%`,
        pin: true,
        scrub: 0.4,
      },
    });

    panels.forEach((panel, i) => {
      if (i > 0) {
        tl.fromTo(panel, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.5 });
        // one more layer joins the stack at each step
        if (layers[i]) {
          tl.fromTo(
            layers[i],
            { autoAlpha: 0, y: -60 },
            { autoAlpha: 1, y: 0, duration: 0.5 },
            "<",
          );
        }
      }
      if (i < panels.length - 1) {
        tl.to(panel, { autoAlpha: 0, y: -40, duration: 0.5 }, "+=0.45");
      }
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section id="approach" className="bg-white">
      <div ref={wrap} className="relative h-screen overflow-hidden bg-white text-[#181815]">
      <div className="mx-auto grid h-full max-w-6xl grid-cols-1 items-center gap-10 px-6 md:grid-cols-[1fr_1.1fr] md:px-12">
        {/* Isometric stack */}
        <div className="iso-scene mx-auto hidden md:block" aria-hidden>
          {[3, 2, 1, 0].map((depth, i) => (
            <div
              key={depth}
              className={`iso-layer ${i > 0 ? "iso-hidden" : ""}`}
              style={{ marginTop: i === 0 ? 0 : -200 }}
            />
          ))}
        </div>

        {/* Steps */}
        <div className="relative h-64">
          {STEPS.map((step, i) => (
            <div
              key={step.num}
              className={`method-step absolute inset-0 ${i > 0 ? "invisible opacity-0" : ""}`}
            >
              <p className="eyebrow-mono text-3xl text-[#b9b9b2]">{step.num}</p>
              <h3 className="mt-3 text-4xl font-semibold tracking-tight">
                {step.title}
              </h3>
              <p className="mt-5 max-w-lg text-[16px] leading-relaxed text-[#4c4c47]">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}
