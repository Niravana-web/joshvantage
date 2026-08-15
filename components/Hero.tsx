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
  { label: "Contact", href: "/contact" },
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
    <section ref={ref} className="relative z-10 h-screen">
      {/* Nav */}
      <header className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-6 py-5 md:px-10">
        <a href="/" className="md:w-24">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="Josh Vantage Consulting Group"
            className="h-16 w-auto md:h-[4.5rem]"
          />
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
            href="/contact"
            className="rounded-full bg-white/15 px-5 py-2.5 text-xs font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/25"
          >
            Contact us
          </a>
          <a
            href="/contact"
            aria-label="Contact us"
            className="grid h-9 w-9 place-items-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-colors hover:bg-white/25"
          >
            &#8594;
          </a>
        </div>
      </header>

      {/* Statement, top-right like TIWIS */}
      <div className="hero-statement absolute left-6 right-6 top-[22vh] z-10 md:left-auto md:right-14 md:top-[24vh] md:max-w-lg">
        <p className="whitespace-nowrap text-[17px] font-semibold tracking-wide text-white sm:text-[22px] md:text-[26px]">
          JOSH VANTAGE CONSULTING GROUP
        </p>
        <p className="mt-5 text-xl font-normal leading-relaxed text-white [text-shadow:0_1px_18px_rgba(6,13,36,0.8)]">
          Specialist support for people building care businesses, established
          care providers pursuing new contracts, and professionals preparing
          for Registered Manager leadership.
        </p>
      </div>

      {/* Giant cropped wordmark */}
      <h1 className="hero-wordmark z-10">BUILD. GROW. LEAD.</h1>
    </section>
  );
}
