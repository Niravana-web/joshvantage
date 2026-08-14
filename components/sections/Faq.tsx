import SectionHead from "@/components/SectionHead";
import Reveal from "@/components/Reveal";

const FAQS = [
  {
    q: "Who does Josh Vantage work with?",
    a: "Three groups: people launching a regulated UK care business, established care providers pursuing tender opportunities, and experienced care professionals preparing for Registered Manager roles.",
  },
  {
    q: "Do you guarantee CQC registration or tender wins?",
    a: "No. Josh Vantage Consulting Group provides consultancy, training, and preparation services. We cannot and do not guarantee CQC approval, contract awards, employment, or Registered Manager status — anyone who promises those outcomes should be treated with caution.",
  },
  {
    q: "How does an engagement start?",
    a: "Every journey starts with a short assessment — CQC readiness, tender assessment, or programme application — followed by a focused 20-minute strategy call. Only then do we recommend a package, and the exact scope is confirmed in the service agreement.",
  },
  {
    q: "What does support cost?",
    a: "Launch packages run from £2,499 to £6,999 depending on depth of support. Tender support runs from £1,250 to £3,750. The Registered Manager Leadership Programme is a £4,999 investment, by application. The right level is confirmed after your assessment call.",
  },
  {
    q: "Is the Registered Manager Programme a job placement?",
    a: "No. The programme fee pays for training, mentoring, and professional development — not employment, sponsorship, or a guaranteed role. It is designed for experienced professionals serious about competing for RM positions.",
  },
];

export default function Faq() {
  return (
    <section className="bg-[#f7f7f5] px-6 py-28 text-[#181815] md:px-12">
      <div className="mx-auto max-w-6xl">
        <SectionHead eyebrow="QUESTIONS" title="Frequently asked questions" />
        <Reveal className="mt-12 max-w-3xl">
          {FAQS.map((faq) => (
            <details key={faq.q} className="faq group border-b border-black/10 py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between text-lg font-medium">
                {faq.q}
                <span aria-hidden className="ml-4 text-2xl font-light transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[#4c4c47]">
                {faq.a}
              </p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
