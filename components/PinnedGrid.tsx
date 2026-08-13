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
    const ctx = gsap.context(() => {
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
    }, pin);
    return () => ctx.revert();
  }, []);

  return (
    <section id={id} style={{ background: bg }} className="text-[#181815]">
      <div ref={pinRef} className="relative h-screen overflow-hidden">
        <div ref={innerRef} className="mx-auto max-w-6xl px-6 pt-24 md:px-12">
          {head}
          <div ref={gridRef} className={gridClass}>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
