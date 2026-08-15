"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

/*
 * Persistent brand mark: once the visitor scrolls past the hero (where the
 * header logo lives), a small navy chip with the logo fades in top-left so
 * the site stays identifiable on every section. Links home. Hidden on
 * /admin pages.
 */
export default function StickyLogo() {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.85);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname.startsWith("/admin")) return null;

  return (
    <a
      href="/"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      aria-label="Josh Vantage Consulting Group — home"
      className={`fixed left-4 top-4 z-40 grid h-16 w-16 place-items-center rounded-full bg-[rgba(9,17,48,0.85)] shadow-[0_10px_30px_rgba(6,13,36,0.45)] backdrop-blur-sm transition-all duration-300 md:left-6 md:top-5 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-3 opacity-0"
      }`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo.png" alt="" className="h-12 w-auto" />
    </a>
  );
}
