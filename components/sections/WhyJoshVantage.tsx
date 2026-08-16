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
            Behind every care business is someone who decided to build
            something of their own. Behind every great leader is someone who
            once had to take their first step.
          </p>
          <p>
            Too often, capable people know where they want to go but not how
            to get there. Regulation can feel complicated. Opportunities can
            feel out of reach. The next step is not always clear.
          </p>
          <p className="text-[17px] font-normal text-white md:text-[19px]">
            Josh Vantage exists to change that.
          </p>
          <p>
            We help people turn ambition into something real: a business they
            can build, opportunities they can pursue, and leadership they can
            grow into.
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
