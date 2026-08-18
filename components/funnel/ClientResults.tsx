import SectionHead from "@/components/SectionHead";
import Reveal from "@/components/Reveal";
import EvidenceGallery, { type Evidence } from "@/components/funnel/EvidenceGallery";

/*
 * JV Growth client results — documentary evidence of previous tender and
 * framework outcomes, shown between the process content and the pricing so
 * the visitor sees proof of delivery before being shown the investment.
 *
 * ---------------------------------------------------------------------------
 * REDACTION GATE
 * ---------------------------------------------------------------------------
 * As first supplied, the redaction bars covered only the x-height of the text
 * they sat on, so the client's identity was still readable from the ascenders
 * and cap-heights above them — and one name was not covered at all. The bars
 * have since been extended to the full line box and each painted region
 * verified pixel-uniform, so nothing remains recoverable.
 *
 * Authority branding, framework details, award wording and the STAR
 * evaluation table are all untouched. Pre-redaction originals are kept out of
 * the repository in /redaction-originals (gitignored).
 *
 * Anything under /public is served publicly whether or not it is linked, so
 * this flag goes back to false if an unverified document is ever dropped in.
 */
const EVIDENCE_CLEARED = true;

const RESULTS: Evidence[] = [
  {
    title: "£20M Supported Living Framework",
    subtitle: "Successful tender outcome",
    body: "Bid support for a client successfully appointed to a Manchester supported living framework advertised at £20 million.",
    src: "/growth/evidence-manchester-city-council.png",
    alt: "Manchester City Council notice of decision to award a framework agreement, confirming the client's tender was successful",
  },
  {
    title: "NHS Mental Health & Wellbeing Framework",
    subtitle: "Successful framework tender outcome",
    body: "Bid support for a client whose offer was accepted for a four-year Mental Health and Wellbeing Services framework, subject to the procurement standstill process.",
    src: "/growth/evidence-nhs-cps.png",
    alt: "NHS Commercial Procurement Services letter confirming the client's offer was accepted for a four-year Mental Health and Wellbeing Services framework, subject to the standstill period",
  },
  {
    title: "Greater Manchester Supporting People to Live Well at Home",
    subtitle: "Successful tender outcome",
    body: "Bid support for a client whose offer was successful and who was identified as an approved provider on the Greater Manchester Supporting People to Live Well at Home FPS.",
    src: "/growth/evidence-star-procurement.png",
    alt: "STAR Procurement award decision notice with the evaluation scoring table, recording an overall result of Pass and identifying the client as an approved provider",
  },
];

const DISCLAIMER =
  "Individual client outcomes are shown as examples of previous work. Framework values represent the advertised value of the relevant procurement and do not represent guaranteed revenue to an individual provider. Tender and framework decisions are made independently by the relevant contracting authorities, and outcomes are not guaranteed.";

export default function ClientResults() {
  if (!EVIDENCE_CLEARED) return null;

  return (
    <section
      id="client-results"
      className="bg-[#f7f7f5] px-6 py-24 text-[#181815] md:px-12"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHead
          eyebrow="CLIENT RESULTS"
          title="Proven through real client outcomes."
        />
        <Reveal className="mt-12">
          <EvidenceGallery items={RESULTS} />
        </Reveal>
        <p className="mx-auto mt-12 max-w-3xl border-t border-black/10 pt-7 text-[13px] leading-relaxed text-[#6b6b64]">
          {DISCLAIMER}
        </p>
      </div>
    </section>
  );
}
