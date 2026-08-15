import type { ReactNode } from "react";
import Footer from "@/components/sections/Footer";

/*
 * Shared shell for the legal pages (/privacy, /terms, /disclaimer).
 * Layout only — each page supplies its own full document as children.
 */
export default function LegalPage({
  eyebrow,
  title,
  updated,
  children,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <main>
      <section className="relative overflow-hidden">
        <div className="silk">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/hero-silk.webp" alt="" aria-hidden className="silk-img" />
          <div className="silk-blob b1" />
          <div className="silk-blob b2" />
        </div>
        <header className="relative z-10 flex items-center justify-between px-6 py-5 md:px-10">
          <a href="/">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="Josh Vantage Consulting Group"
              className="h-16 w-auto md:h-[4.5rem]"
            />
          </a>
        </header>
        <div className="relative z-10 mx-auto w-full max-w-3xl px-6 pb-16 pt-8 md:pt-12">
          <p className="eyebrow-mono text-[var(--brand-pale)]">{eyebrow}</p>
          <h1
            className="mt-5 text-4xl font-semibold leading-tight text-white md:text-5xl"
            style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
          >
            {title}
          </h1>
          <p className="eyebrow-mono mt-5 text-[11.5px] text-white/60">
            LAST UPDATED: {updated}
          </p>
        </div>
      </section>

      <section className="bg-white px-6 py-16 text-[#181815] md:px-12 md:py-20">
        <div className="legal-doc mx-auto max-w-3xl">{children}</div>
      </section>

      <Footer />
    </main>
  );
}
