import Reveal from "@/components/Reveal";

/*
 * Emotional positioning statement. Sits on the shared silk canvas between
 * the hero and the journey section — deliberately not a services layout:
 * one dominant serif statement, narrow measure, generous space.
 */
export default function WhyJoshVantage() {
  return (
    <section className="relative z-10 px-6 py-32 text-white md:py-44">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <p className="eyebrow-mono text-[var(--brand-pale)]">/WHY JOSH VANTAGE</p>
          <h2
            className="mx-auto mt-8 max-w-2xl text-4xl font-semibold leading-[1.12] md:text-6xl"
            style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
          >
            Ambition deserves a real pathway.
          </h2>
        </Reveal>
        <Reveal stagger={0.12} className="mx-auto mt-14 max-w-xl space-y-6 text-[16px] font-light leading-relaxed text-white/75 md:text-[17px]">
          <p>
            Starting a care business, winning contracts or progressing towards
            care leadership can become complicated quickly.
          </p>
          <p>
            Regulations. Applications. Evidence. Tender requirements.
            Leadership expectations. Knowing what to do next is often the
            hardest part.
          </p>
          <p>
            Josh Vantage brings these challenges into one specialist
            care-sector ecosystem, with structured support for three critical
            stages:
          </p>
          <p className="text-[17px] font-normal text-white md:text-[19px]">
            Build your business. Grow your opportunities. Develop as a leader.
          </p>
        </Reveal>
        <Reveal className="mt-14">
          <p
            className="text-xl italic text-[var(--brand-pale)] md:text-2xl"
            style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
          >
            Start where you are. Build towards where you want to be.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
