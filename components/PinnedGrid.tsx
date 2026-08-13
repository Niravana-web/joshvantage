"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/*
 * Pins the section; the header stays put while grid items rise in one
 * by one as the user scrolls. If the content is taller than the
 * viewport, the inner column drifts up so the last items are reachable.
 */
export default function PinnedGrid({
  id,
  bg,
  head,
  gridClass,
  children,
}: {
  id?: string;
  bg: string;
  head: ReactNode;
  gridClass: string;
  children: ReactNode;
}) {
  const pinRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pin = pinRef.current;
    const inner = innerRef.current;
    const grid = gridRef.current;
    if (!pin || !inner || !grid) return;
    const mm = gsap.matchMedia(pin);

    // Desktop: pinned, items scrub in sequentially
    mm.add("(min-width: 768px)", () => {
      const items = Array.from(grid.children);
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pin,
          start: "top top",
          end: `+=${items.length * 55 + 60}%`,
          pin: true,
          scrub: 0.4,
        },
      });
      tl.fromTo(
        items,
        { autoAlpha: 0, y: 60 },
        { autoAlpha: 1, y: 0, duration: 1, stagger: 1, ease: "power2.out" },
      );
      const overflow = inner.scrollHeight - pin.clientHeight + 60;
      if (overflow > 0) {
        tl.to(inner, { y: -overflow, ease: "none", duration: items.length * 0.7 }, 0.8);
      }
      tl.to({}, { duration: 0.6 }); // hold before unpin
    });

    // Mobile: normal flow, per-item reveal
    mm.add("(max-width: 767px)", () => {
      Array.from(grid.children).forEach((item) => {
        gsap.from(item, {
          autoAlpha: 0,
          y: 40,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: item as HTMLElement, start: "top 88%" },
        });
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section id={id} style={{ background: bg }} className="text-[#181815]">
      <div ref={pinRef} className="relative py-20 md:h-screen md:overflow-hidden md:py-0">
        <div ref={innerRef} className="mx-auto max-w-6xl px-6 md:px-12 md:pt-24">
          {head}
          <div ref={gridRef} className={gridClass}>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
