"use client";

import { useEffect, useState } from "react";

/*
 * Persistent conversion nudge: a small fixed pill that keeps directing
 * visitors to the readiness assessment while they scroll. Appears after
 * the hero, disappears while the assessment section itself is in view.
 */
export default function StickyAssessmentCta({
  label = "Take the free assessment",
  target = "#assessment",
}: {
  label?: string;
  target?: string;
}) {
  const [pastHero, setPastHero] = useState(false);
  const [atForm, setAtForm] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const form = document.querySelector(target);
    let io: IntersectionObserver | undefined;
    if (form) {
      io = new IntersectionObserver(
        ([entry]) => setAtForm(entry.isIntersecting),
        { rootMargin: "0px 0px -20% 0px" },
      );
      io.observe(form);
    }
    return () => {
      window.removeEventListener("scroll", onScroll);
      io?.disconnect();
    };
  }, [target]);

  const visible = pastHero && !atForm;

  return (
    <a
      href={target}
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-5 right-5 z-40 flex h-12 items-center gap-2 rounded-full bg-[var(--brand-navy)] px-6 text-[13.5px] font-semibold text-white shadow-[0_8px_28px_rgba(19,34,106,0.35)] transition-all duration-300 hover:bg-[#1b2f8d] md:bottom-8 md:right-8 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      {label}
      <span aria-hidden>&#8595;</span>
    </a>
  );
}
