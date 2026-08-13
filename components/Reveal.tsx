"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* Fades children up as they enter the viewport. */
export default function Reveal({
  children,
  className,
  stagger = 0,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.from(stagger ? Array.from(el.children) : el, {
        opacity: 0,
        y: 32,
        duration: 0.9,
        ease: "power3.out",
        stagger,
        scrollTrigger: { trigger: el, start: "top 82%" },
      });
    }, el);
    return () => ctx.revert();
  }, [stagger]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
