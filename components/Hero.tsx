"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NAV = [
  { label: "Launch", href: "/launch" },
  { label: "Growth", href: "/growth" },
  { label: "Academy", href: "/academy" },
  { label: "Approach", href: "#approach" },
  { label: "Contact", href: "#contact" },
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      // wordmark lifts fully into view, then rides up with the scroll
      gsap.to(".hero-wordmark", {
        yPercent: -55,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative h-screen">
      <div className="silk">
        <div className="silk-blob b1" />
        <div className="silk-blob b2" />
        <div className="silk-blob b3" />
        <div className="silk-blob b4" />
      </div>

      {/* Nav */}
      <header className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-6 py-5 md:px-10">
        <a
          href="/"
          className="text-xs font-bold tracking-[0.2em] text-white md:w-24"
        >
          JOSH VANTAGE
        </a>
        <nav className="hidden gap-7 md:flex">
          {NAV.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-xs font-semibold uppercase tracking-widest text-white/90 transition-colors hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-1">
          <a
            href="#contact"
            className="rounded-full bg-white/15 px-5 py-2.5 text-xs font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/25"
          >
            Contact us
          </a>
          <a
            href="#contact"
            aria-label="Contact us"
            className="grid h-9 w-9 place-items-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-colors hover:bg-white/25"
          >
            &#8594;
          </a>
        </div>
      </header>

      {/* Statement, top-right like TIWIS */}
      <div className="hero-statement absolute left-6 right-6 top-[22vh] z-10 md:left-auto md:right-14 md:top-[24vh] md:max-w-md">
        <p className="text-3xl font-semibold tracking-wide text-white md:text-4xl">
          BUILD. GROW. LEAD.
        </p>
        <p className="mt-5 text-lg font-light leading-relaxed text-[var(--ice)]">
          Specialist support for people building care businesses, established
          care providers pursuing new contracts, and professionals preparing
          for Registered Manager leadership.
        </p>
      </div>

      {/* Giant cropped wordmark */}
      <h1 className="hero-wordmark z-10">JOSH VANTAGE</h1>
    </section>
  );
}
