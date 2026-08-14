import { Fragment } from "react";
import SectionHead from "@/components/SectionHead";
import Reveal from "@/components/Reveal";

/*
 * JV Launch package comparison — single consistent table per the client's
 * final offer spec (JV_Launch_Packages_Deliverables_Addons.pdf).
 * Add-ons are deliberately separate from the core comparison, and the only
 * conversion action is the readiness assessment (no checkout).
 */

const TIERS = [
  {
    name: "Application Accelerator",
    price: "£2,499",
    blurb: "Core CQC registration preparation. Defined scope. No post-submission support.",
  },
  {
    name: "Registration & Compliance Builder",
    price: "£4,999",
    blurb:
      "Registration plus deeper compliance, launch readiness, NI/RM preparation and 1 month email support.",
    popular: true,
  },
  {
    name: "Full Care Business Launch Partner",
    price: "£6,999",
    blurb:
      "Higher-touch registration-to-launch partnership with deeper NI/RM preparation, hands-on CQC response support and 3 months priority support.",
  },
];

type Cell = true | null | string;

const GROUPS: { label: string; rows: { label: string; cells: [Cell, Cell, Cell] }[] }[] = [
  {
    label: "REGISTRATION",
    rows: [
      { label: "CQC Readiness & Registration Assessment", cells: [true, true, true] },
      { label: "Service & Business Model Review", cells: [true, true, true] },
      { label: "Registration Strategy Session & Personalised Registration Roadmap", cells: [true, true, true] },
      { label: "CQC Application Preparation", cells: [true, true, true] },
      { label: "Statement of Purpose Preparation", cells: [true, true, true] },
      { label: "Bespoke Business Plan", cells: [true, true, true] },
      { label: "12-Month Financial Viability Forecast", cells: [true, true, true] },
      {
        label: "Policies & Procedures",
        cells: [
          "Registration application policy suite",
          "Full operational policy suite",
          "Full operational policy suite",
        ],
      },
      { label: "CQC Application Review & Quality Assurance", cells: [true, true, true] },
      { label: "Application Submission Guidance", cells: [true, true, true] },
      { label: "DBS & Registration Checks Guidance", cells: [true, true, true] },
      { label: "Pre-submission document revisions", cells: ["2 rounds", "3 rounds", "5 rounds"] },
    ],
  },
  {
    label: "POST-SUBMISSION SUPPORT",
    rows: [
      { label: "Post-submission CQC support", cells: [null, "1 month", "3 months"] },
      { label: "Support channel", cells: [null, "Email", "Email + priority WhatsApp"] },
      {
        label: "CQC feedback / further-information support",
        cells: [
          null,
          "Review, explain requirements, response guidance and review",
          "Hands-on response drafting, amendments and review",
        ],
      },
    ],
  },
  {
    label: "NI & RM PREPARATION",
    rows: [
      { label: "NI preparation sessions", cells: [null, "1 x 60 min", "3 x 60 min"] },
      { label: "NI mock CQC interviews", cells: [null, "1 x 60 min", "2 x 60 min"] },
      { label: "RM preparation sessions", cells: [null, "1 x 60 min", "3 x 60 min"] },
      { label: "RM mock CQC interviews", cells: [null, "1 x 60 min", "2 x 60 min"] },
      { label: "NI/RM feedback & action plan", cells: [null, true, true] },
      { label: "Priority 1-to-1 NI/RM support", cells: [null, null, true] },
    ],
  },
  {
    label: "LAUNCH READINESS",
    rows: [
      {
        label: "Launch Readiness Review & Personalised Action Plan",
        cells: [null, true, "✓ Comprehensive"],
      },
      { label: "Launch implementation review sessions", cells: [null, null, "2 sessions"] },
      { label: "Workforce readiness guidance", cells: [null, null, "✓ within launch review"] },
      { label: "Mandatory training framework guidance", cells: [null, null, "✓ within launch review"] },
      { label: "Non-Regulated Service Launch Pathway", cells: [null, true, true] },
    ],
  },
  {
    label: "HANDOVER",
    rows: [
      {
        label: "Final handover / completion review",
        cells: [
          "Final application handover",
          "Application handover + next-steps review",
          "Full registration-to-launch handover",
        ],
      },
    ],
  },
];

const ADDONS = [
  {
    name: "Care Business Starter Branding Pack",
    price: "£399",
    scope:
      "Basic professional care-business website, logo design and 2 digital marketing leaflets. Includes 1 revision round. Domain, hosting and paid third-party services are separate.",
  },
  {
    name: "NI Interview Readiness Programme",
    price: "£399",
    scope:
      "2 x 60-minute preparation sessions + 1 x 60-minute mock CQC interview + personalised feedback/action plan. 3 hours total live 1-to-1 support.",
  },
  {
    name: "RM Interview Readiness Programme",
    price: "£399",
    scope:
      "2 x 60-minute preparation sessions + 1 x 60-minute mock CQC interview + personalised feedback/action plan. 3 hours total live 1-to-1 support.",
  },
  {
    name: "Additional NI/RM Preparation",
    price: "£149",
    scope: "One additional 60-minute 1-to-1 preparation session.",
  },
  {
    name: "Additional Mock CQC Interview",
    price: "£199",
    scope: "One additional 60-minute structured mock interview including feedback.",
  },
  {
    name: "Registered Manager Sourcing & Placement",
    price: "£2,500 fixed success fee",
    scope:
      "Provider requirement assessment, candidate matching from the available RM talent network, initial suitability screening, candidate introduction and interview coordination. Triggered on the agreed successful-placement event. Candidate availability, employment outcome and CQC acceptance are not guaranteed.",
  },
  {
    name: "Non-Regulated Service Launch Pathway",
    price: "£999",
    scope:
      "Standalone option for clients whose core package does not include it. Suitability/service-model review, definition of the proposed non-regulated offer, scope/boundary guidance, launch strategy session and personalised launch action plan. No guarantee of clients or revenue.",
  },
  {
    name: "Additional Launch Consultancy",
    price: "£199",
    scope:
      "One additional 60-minute 1-to-1 launch consultancy session. Document production outside the agreed scope is not included.",
  },
  {
    name: "Additional Bespoke Documentation",
    price: "Quoted separately",
    scope: "For substantial new documents or major changes outside the original package scope.",
  },
  {
    name: "Extended CQC Support",
    price: "Quoted separately",
    scope:
      "Additional support after the package's included post-submission support period has expired.",
  },
  {
    name: "Sponsor Licence Solicitor Referral",
    price: "Solicitor quotes separately",
    scope:
      "Introduction to a specialist solicitor partner where required. Legal services, Home Office fees and solicitor charges are separate from JV Launch packages.",
  },
];

const SCOPE_NOTES = [
  "Support periods begin from the agreed application submission date.",
  "Revisions and post-submission support apply only within the original agreed registration scope. Material changes to the service model, regulated activity, location structure or application may require a separate quote.",
  "Application Submission Guidance means Josh Vantage prepares/reviews the agreed work and guides the client through submission. The provider and relevant registered persons remain responsible for reviewing, confirming and submitting their application and declarations.",
  "Launch Readiness is advisory: Josh Vantage assesses, advises and creates the roadmap. It does not include configuring care-management software, recruiting the full workforce, running rotas, payroll, purchasing insurance or operating the client's business.",
  "The Non-Regulated Service Launch Pathway is subject to suitability. It does not guarantee clients, revenue, profitability or business success.",
  "Josh Vantage does not guarantee CQC registration, Registered Manager acceptance, clients, revenue, sponsor licence approval or employment outcomes. The exact client scope is confirmed after the assessment and strategy call, and must match the signed proposal and service agreement.",
];

function cell(v: Cell) {
  if (v === true)
    return <span className="text-[15px] font-semibold text-[var(--brand-navy)]">&#10003;</span>;
  if (v === null) return <span className="text-[#c6c6c0]">&ndash;</span>;
  return <span className="text-[13px] leading-snug text-[#33332f]">{v}</span>;
}

const popCol = "bg-[#eef6fc] border-x border-[color:rgba(19,34,106,0.15)]";

export default function LaunchPackages() {
  return (
    <section className="bg-[#f7f7f5] px-6 py-24 text-[#181815] md:px-12">
      <div className="mx-auto max-w-6xl">
        <SectionHead
          eyebrow="SUPPORT OPTIONS"
          title="JV Launch support options"
          intro="Three levels of paid delivery sit behind JV Launch, built on the same deliverables at increasing depth. The assessment comes first — the right level is confirmed on your strategy call, never sold off the page."
        />

        <Reveal className="mt-12">
          <p className="eyebrow-mono mb-3 text-[#8a8a83] md:hidden">
            SWIPE TO COMPARE &#8594;
          </p>
          <div className="notch-card border border-black/5 bg-white">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[680px] table-fixed border-collapse text-left">
                <thead>
                  <tr className="align-top">
                    <th scope="col" className="sticky left-0 z-[1] w-[150px] min-w-[150px] bg-white p-5 md:w-[34%]" />
                    {TIERS.map((t) => (
                      <th
                        key={t.name}
                        scope="col"
                        className={`p-5 font-normal ${t.popular ? `${popCol} border-t-2 border-t-[var(--brand-navy)]` : ""}`}
                      >
                        {t.popular && (
                          <span className="eyebrow-mono inline-block bg-[var(--brand-navy)] px-2.5 py-1 text-[10.5px] text-white">
                            MOST POPULAR
                          </span>
                        )}
                        <p className={`text-[15px] font-semibold leading-snug ${t.popular ? "mt-3" : "mt-[34px]"}`}>
                          {t.name}
                        </p>
                        <p className="mt-2 text-2xl font-semibold text-[var(--brand-navy)]">
                          {t.price}
                        </p>
                        <p className="mt-2.5 text-[12.5px] font-normal leading-relaxed text-[#4c4c47]">
                          {t.blurb}
                        </p>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {GROUPS.map((g) => (
                    <Fragment key={g.label}>
                      <tr>
                        <td colSpan={4} className="border-t border-black/5 bg-[#f7f7f5] px-5 py-2.5">
                          <span className="eyebrow-mono sticky left-5 inline-block text-[#8a8a83]">/{g.label}</span>
                        </td>
                      </tr>
                      {g.rows.map((r) => (
                        <tr key={r.label} className="border-t border-black/5">
                          <th
                            scope="row"
                            className="sticky left-0 z-[1] bg-white px-5 py-3.5 text-[14px] font-medium leading-snug text-[#33332f]"
                          >
                            {r.label}
                          </th>
                          {r.cells.map((c, i) => (
                            <td
                              key={i}
                              className={`px-5 py-3.5 text-center align-middle ${TIERS[i].popular ? popCol : ""}`}
                            >
                              {cell(c)}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-10 flex justify-center">
            <a
              href="#assessment"
              className="flex h-13 items-center rounded-full bg-[var(--brand-navy)] px-9 py-3.5 text-[14.5px] font-semibold text-white transition-colors hover:bg-[#1b2f8d]"
            >
              Take My CQC Readiness Assessment
            </a>
          </div>
        </Reveal>

        {/* Optional add-ons — deliberately separate from the core comparison */}
        <Reveal className="mt-20">
          <div
            className="rule"
            style={{
              height: 2,
              background: "linear-gradient(to right, #181815 0 13%, rgba(0,0,0,0.08) 13%)",
            }}
          />
          <p className="eyebrow-mono mt-3">/OPTIONAL ADD-ONS</p>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-[#4c4c47]">
            Available alongside any package, priced separately. Add-ons are not
            included in the three core packages.
          </p>
          <div className="mt-8 divide-y divide-black/5 border border-black/5 bg-white">
            {ADDONS.map((a) => (
              <div key={a.name} className="flex flex-col gap-1.5 px-6 py-5 sm:flex-row sm:gap-8">
                <div className="flex-1">
                  <p className="text-[14.5px] font-medium">{a.name}</p>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-[#4c4c47]">{a.scope}</p>
                </div>
                <p className="shrink-0 text-[14.5px] font-semibold text-[var(--brand-navy)] sm:w-44 sm:text-right">
                  {a.price}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Scope boundaries */}
        <Reveal className="mt-16">
          <p className="eyebrow-mono text-[#8a8a83]">/SCOPE BOUNDARIES</p>
          <ul className="mt-5 space-y-2.5 border-l-2 border-[var(--brand-navy)] bg-white px-6 py-5">
            {SCOPE_NOTES.map((n) => (
              <li key={n} className="text-[13px] leading-relaxed text-[#6b6b64]">
                <span aria-hidden className="mr-2.5 text-[var(--brand-navy)]">&#9642;</span>
                {n}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
