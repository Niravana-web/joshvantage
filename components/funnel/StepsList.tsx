import SectionHead from "@/components/SectionHead";
import Reveal from "@/components/Reveal";

/* Numbered process steps — static funnel-page variant of the method scroll. */
export default function StepsList({
  eyebrow,
  title,
  steps,
}: {
  eyebrow: string;
  title: string;
  steps: { num: string; title: string; desc: string }[];
}) {
  return (
    <section className="bg-white px-6 py-24 text-[#181815] md:px-12">
      <div className="mx-auto max-w-6xl">
        <SectionHead eyebrow={eyebrow} title={title} />
        <Reveal
          stagger={0.1}
          className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4"
        >
          {steps.map((step) => (
            <div key={step.num}>
              <p className="eyebrow-mono text-2xl text-[#b9b9b2]">{step.num}</p>
              <h3 className="mt-2 text-xl font-semibold tracking-tight">
                {step.title}
              </h3>
              <p className="mt-2.5 text-[14.5px] leading-relaxed text-[#4c4c47]">
                {step.desc}
              </p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
