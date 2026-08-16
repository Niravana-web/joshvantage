import Reveal from "@/components/Reveal";

/* Founder / leadership section — photo + copy side-by-side on desktop,
 * photo above the copy on mobile. */
export default function Founder() {
  return (
    <section className="bg-[#f7f7f5] px-6 py-24 text-[#181815] md:px-12">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-[0.85fr_1.15fr] md:gap-16">
        <Reveal>
          <div className="notch-card overflow-hidden border border-black/5 bg-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/founder.webp"
              alt="Josh, Founder and Principal Consultant of Josh Vantage Consulting Group"
              className="aspect-[4/5] w-full object-cover object-top"
            />
          </div>
        </Reveal>
        <Reveal stagger={0.1}>
          <p className="eyebrow-mono text-[#8a8a83]">/FOUNDER &amp; PRINCIPAL CONSULTANT</p>
          <h2
            className="mt-5 text-4xl font-semibold md:text-5xl"
            style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
          >
            Meet Josh
          </h2>
          <p className="mt-7 text-[16px] leading-relaxed text-[#4c4c47] md:text-[17px]">
            Josh leads Josh Vantage Consulting Group with a simple principle:
            people with ambition should have access to the right structure,
            preparation and guidance to move forward with confidence.
          </p>
          <p className="mt-5 text-[16px] leading-relaxed text-[#4c4c47] md:text-[17px]">
            Through Josh Vantage, that means helping people build care
            businesses, helping established providers pursue growth
            opportunities, and helping aspiring and experienced professionals
            develop towards care leadership.
          </p>
          <p className="mt-9 text-lg font-black tracking-wide text-[var(--brand-navy)] [font-family:var(--font-archivo)]">
            BUILD. GROW. LEAD.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
