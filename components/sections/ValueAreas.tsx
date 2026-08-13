import SectionHead from "@/components/SectionHead";
import PinnedGrid from "@/components/PinnedGrid";

const AREAS = [
  {
    icon: "◎",
    title: "CQC Registration",
    desc: "Preparing new providers for the CQC application journey — foundations, documentation, and readiness before you submit.",
  },
  {
    icon: "⚖",
    title: "Governance & Policies",
    desc: "The policy framework and governance structure a regulated care service is expected to evidence and operate.",
  },
  {
    icon: "⧉",
    title: "Tender Strategy",
    desc: "Honest bid/no-bid advice — is this tender worth pursuing, and can you score competitively against its criteria?",
  },
  {
    icon: "✎",
    title: "Bid Writing & Review",
    desc: "Response writing, proofing, and quality review aligned to the specification and scoring framework.",
  },
  {
    icon: "▦",
    title: "Evidence Development",
    desc: "Turning what your service already does well into structured, reusable evidence that scores.",
  },
  {
    icon: "♛",
    title: "Registered Manager Prep",
    desc: "Regulatory understanding, leadership behaviours, and governance judgement for aspiring Registered Managers.",
  },
  {
    icon: "◈",
    title: "Interview Readiness",
    desc: "Practising how to communicate experience, judgement, and regulatory understanding in RM selection processes.",
  },
  {
    icon: "✚",
    title: "Quality & Safeguarding",
    desc: "Day-to-day operational management — staffing, safeguarding, quality assurance, and governance routines.",
  },
];

export default function ValueAreas() {
  return (
    <PinnedGrid
      id="industries"
      bg="#ffffff"
      gridClass="mt-14 grid gap-x-16 gap-y-10 md:grid-cols-2"
      head={
        <SectionHead
          eyebrow="WHERE WE HELP"
          title="Areas of support"
          intro="Across all three journeys, the work comes back to the same fundamentals: registration, governance, evidence, and leadership."
        />
      }
    >
      {AREAS.map((area) => (
        <div key={area.title}>
          <span aria-hidden className="text-xl">{area.icon}</span>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight">
            {area.title}
          </h3>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-[#4c4c47]">
            {area.desc}
          </p>
        </div>
      ))}
    </PinnedGrid>
  );
}
