import Reveal from "@/components/Reveal";

/* All three options scroll back to the journey section, where the visitor
 * picks their pathway card. */
const PATHS = [
  { label: "Start with JV Launch", href: "#journey", primary: true },
  { label: "Explore JV Growth", href: "#journey" },
  { label: "Explore JV Academy", href: "#journey" },
];

/* Final homepage CTA — clear next step for visitors who reach the bottom. */
export default function FinalCta() {
  return (
    <section id="next-step" className="funnels-bg px-6 py-28 text-white md:px-12">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <p className="eyebrow-mono text-[var(--brand-pale)]">/NEXT STEP</p>
          <h2
            className="mt-6 text-4xl font-semibold md:text-5xl"
            style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
          >
            Ready to take your next step?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-[15.5px] font-light leading-relaxed text-white/80">
            Whether you&apos;re building a care business, pursuing your next
            growth opportunity, or developing towards care leadership, start
            with the pathway that matches where you are now.
          </p>
        </Reveal>
        <Reveal stagger={0.1} className="mt-11 flex flex-col items-center justify-center gap-4 sm:flex-row">
          {PATHS.map((p) => (
            <a
              key={p.label}
              href={p.href}
              className={`flex h-13 items-center rounded-full px-7 py-3.5 text-[14px] font-semibold transition-colors ${
                p.primary
                  ? "bg-[var(--brand-pale)] text-[var(--brand-navy)] hover:bg-white"
                  : "border border-white/30 text-white hover:bg-white/10"
              }`}
            >
              {p.label} <span aria-hidden className="ml-2">&#8594;</span>
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
