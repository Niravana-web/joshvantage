import Reveal from "@/components/Reveal";

/*
 * Closing CTA for a funnel page. Deliberately single-action: each funnel drives
 * exactly one assessment, so this points back at that form rather than offering
 * a choice of pathways or a generic contact route.
 */
export default function FunnelFinalCta({
  title,
  body,
  cta,
  href = "#assessment",
}: {
  title: string;
  body: string;
  cta: string;
  href?: string;
}) {
  return (
    <section id="next-step" className="funnels-bg px-6 py-28 text-white md:px-12">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <p className="eyebrow-mono text-[var(--brand-pale)]">/NEXT STEP</p>
          <h2
            className="mt-6 text-3xl font-semibold md:text-5xl"
            style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
          >
            {title}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-[15.5px] font-light leading-relaxed text-white/80">
            {body}
          </p>
        </Reveal>
        <Reveal className="mt-11 flex justify-center">
          <a
            href={href}
            className="group flex h-13 items-center rounded-full border border-white/30 px-8 py-3.5 text-[14.5px] font-semibold text-white transition-colors hover:border-[var(--brand-pale)] hover:bg-[var(--brand-pale)] hover:text-[var(--brand-navy)] focus-visible:border-[var(--brand-pale)] focus-visible:bg-[var(--brand-pale)] focus-visible:text-[var(--brand-navy)]"
          >
            {cta}
            <span
              aria-hidden
              className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
            >
              &#8594;
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
