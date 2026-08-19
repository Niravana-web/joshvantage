import SectionHead from "@/components/SectionHead";
import Reveal from "@/components/Reveal";

export type Pkg = {
  name: string;
  price: string;
  bestFor: string;
  features: string[];
  popular?: boolean;
  /* Short positioning line under the package name. */
  tagline?: string;
  /* Bundle value maths, shown so the saving is explicit rather than implied. */
  value?: { compare: string; comparePrice: string; saving: string; validity: string };
};

/* Commercial package cards — dominant CTA stays the assessment, per handover. */
export default function Packages({
  eyebrow,
  title,
  intro,
  packages,
  cta,
  guardrail,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  packages: Pkg[];
  cta: string;
  guardrail: string;
}) {
  return (
    <section className="bg-[#f7f7f5] px-6 py-24 text-[#181815] md:px-12">
      <div className="mx-auto max-w-6xl">
        <SectionHead eyebrow={eyebrow} title={title} intro={intro} />
        <Reveal stagger={0.12} className="mt-14 grid gap-5 md:grid-cols-3">
          {packages.map((pkg) => (
            <article
              key={pkg.name}
              className={`notch-card relative flex flex-col border bg-white p-8 ${
                pkg.popular
                  ? "border-[var(--brand-navy)] shadow-[0_20px_50px_-25px_rgba(19,34,106,0.4)]"
                  : "border-black/5"
              }`}
            >
              {pkg.popular && (
                <span className="eyebrow-mono mb-4 inline-block w-fit bg-[var(--brand-navy)] px-3 py-1 text-[11px] text-white">
                  MOST RECOMMENDED
                </span>
              )}
              <h3 className="text-2xl font-semibold tracking-tight">{pkg.name}</h3>
              {pkg.tagline && (
                <p className="mt-2 text-[15px] font-medium leading-snug text-[var(--brand-navy)]">
                  {pkg.tagline}
                </p>
              )}
              <p className="mt-3 text-4xl font-semibold text-[var(--brand-navy)]">
                {pkg.price}
              </p>
              {pkg.value && (
                <div className="mt-4 border border-black/10 bg-[#f7f7f5] px-4 py-3.5 text-[13.5px] leading-relaxed">
                  <p className="flex justify-between gap-3 text-[#6b6b64]">
                    <span>{pkg.value.compare}</span>
                    <span className="tabular-nums line-through">{pkg.value.comparePrice}</span>
                  </p>
                  <p className="mt-1.5 flex justify-between gap-3 font-semibold text-[#181815]">
                    <span>Bundle price</span>
                    <span className="tabular-nums">{pkg.price}</span>
                  </p>
                  <p className="mt-1.5 flex justify-between gap-3 font-semibold text-[var(--brand-navy)]">
                    <span>You save</span>
                    <span className="tabular-nums">{pkg.value.saving}</span>
                  </p>
                  <p className="mt-2.5 border-t border-black/10 pt-2 text-[12.5px] text-[#8a8a83]">
                    {pkg.value.validity}
                  </p>
                </div>
              )}
              <p className="eyebrow-mono mt-6 text-[#8a8a83]">BEST FOR</p>
              <p className="mt-1.5 text-[14.5px] leading-relaxed text-[#4c4c47]">
                {pkg.bestFor}
              </p>
              <ul className="mt-6 flex-1 space-y-2 text-[14px] text-[#33332f]">
                {pkg.features.map((f) => (
                  <li key={f} className="flex gap-2.5">
                    <span aria-hidden className="text-[var(--brand-navy)]">&#9642;</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#assessment"
                className="mt-8 flex h-12 items-center justify-center rounded-full bg-[var(--brand-navy)] px-6 text-center text-[13.5px] font-semibold text-white transition-colors hover:bg-[#1b2f8d]"
              >
                {cta}
              </a>
            </article>
          ))}
        </Reveal>
        <p className="mx-auto mt-10 max-w-3xl text-center text-[13px] leading-relaxed text-[#8a8a83]">
          {guardrail}
        </p>
      </div>
    </section>
  );
}
