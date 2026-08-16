/* Minimal funnel landing hero — doc: minimal/no standard navigation, one dominant CTA. */
export default function FunnelHero({
  eyebrow,
  title,
  sub,
  sub2,
  cta,
  priceLine,
}: {
  eyebrow: string;
  title: string;
  sub: string;
  sub2?: string;
  cta: string;
  priceLine?: string;
}) {
  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden">
      <div className="silk">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/hero-silk.webp" alt="" aria-hidden className="silk-img" />
        <div className="silk-blob b1" />
        <div className="silk-blob b2" />
        <div className="silk-blob b3" />
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
      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-1 flex-col items-start justify-center px-6 pb-24">
        <p className="eyebrow-mono text-[var(--brand-pale)]">/{eyebrow}</p>
        <h1 className="mt-5 text-4xl font-semibold leading-tight text-white md:text-6xl" style={{ fontFamily: "var(--font-lora), Georgia, serif" }}>
          {title}
        </h1>
        <p className="mt-6 max-w-xl text-lg font-light leading-relaxed text-[var(--ice)]">
          {sub}
        </p>
        {sub2 && (
          <p className="mt-4 max-w-xl text-[15px] font-light leading-relaxed text-white/70">
            {sub2}
          </p>
        )}
        <a
          href="#assessment"
          className="mt-10 flex h-14 items-center rounded-full bg-[var(--brand-pale)] px-9 text-center text-[15px] font-semibold text-[var(--brand-navy)] transition-colors hover:bg-white"
        >
          {cta}
        </a>
        {priceLine && (
          <p className="eyebrow-mono mt-5 text-[var(--brand-pale)]">{priceLine}</p>
        )}
        <p className="mt-6 text-[13px] text-white/50">
          Assessment first, no commitment. A focused 20-minute strategy call
          follows if it is a fit.
        </p>
      </div>
    </section>
  );
}
