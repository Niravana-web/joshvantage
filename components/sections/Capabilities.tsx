import SectionHead from "@/components/SectionHead";
import PinnedGrid from "@/components/PinnedGrid";

const ITEMS = [
  {
    title: "CQC Application Preparation",
    desc: "Structured preparation for your CQC application — so you approach registration with the right foundations from day one.",
  },
  {
    title: "Policies & Governance",
    desc: "The policies, governance, and operational readiness a regulated care business needs before it opens its doors.",
  },
  {
    title: "Tender & Bid Writing",
    desc: "Specialist care-sector tender support — bid/no-bid advice, evidence-led responses, and quality review before submission.",
  },
  {
    title: "Evidence Development",
    desc: "Building the evidence bank that strengthens every bid and every inspection conversation, structured for reuse.",
  },
  {
    title: "NI & RM Preparation",
    desc: "Preparing Nominated Individuals and Registered Managers for the responsibilities and scrutiny the roles carry.",
  },
  {
    title: "Leadership Training",
    desc: "Leadership, governance, and operational management development for care professionals moving into senior roles.",
  },
];

export default function Capabilities() {
  return (
    <PinnedGrid
      id="services"
      bg="#f7f7f5"
      gridClass="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
      head={
        <SectionHead
          eyebrow="OUR SERVICES"
          title="Capabilities"
          intro="Consultancy, training, and preparation for the UK care sector — practical support that helps you understand the outcome, meet the standard, and take the next step."
        />
      }
    >
      {ITEMS.map((item) => (
        <article
          key={item.title}
          className="border border-black/5 bg-white p-8 transition-shadow hover:shadow-lg"
        >
          <h3 className="text-2xl font-semibold tracking-tight">
            {item.title}
          </h3>
          <p className="mt-4 text-[15px] leading-relaxed text-[#4c4c47]">
            {item.desc}
          </p>
        </article>
      ))}
    </PinnedGrid>
  );
}
