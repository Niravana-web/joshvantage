import { Fragment } from "react";
import SectionHead from "@/components/SectionHead";
import Reveal from "@/components/Reveal";

/*
 * JV Launch package comparison — per the client's final offer spec
 * (JV_Launch_Packages_Deliverables_Addons.pdf) and follow-up feedback:
 * deliverables shared by all three packages sit in a compact checklist so
 * the comparison table only shows what differs by level; only four add-ons
 * are shown publicly and stay visually secondary; disclaimer wording is
 * client-supplied verbatim. The only conversion action is the readiness
 * assessment (no checkout).
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
  },
  {
    name: "Full Care Business Launch Partner",
    price: "£6,999",
    blurb:
      "Higher-touch registration-to-launch partnership with deeper NI/RM preparation, hands-on CQC response support and 3 months priority support.",
    popular: true,
  },
];

/* Deliverables included at every level — pulled out of the table so the
 * comparison only has to carry what actually differs. */
const CORE_INCLUDED = [
  "CQC Readiness & Registration Assessment",
  "Service & Business Model Review",
  "Registration Strategy Session & Personalised Registration Roadmap",
  "CQC Application Preparation",
  "Statement of Purpose Preparation",
  "Bespoke Business Plan",
  "12-Month Financial Viability Forecast",
  "CQC Application Review & Quality Assurance",
  "Application Submission Guidance",
  "DBS & Registration Checks Guidance",
];

type Cell = true | null | string;

const GROUPS: {
  label: string;
  rows: { label: string; note?: string; cells: [Cell, Cell, Cell] }[];
}[] = [
  {
    label: "REGISTRATION",
    rows: [
      {
        label: "Policies & Procedures",
        cells: [
          "Registration application policy suite",
          "Full operational policy suite",
          "Full operational policy suite",
        ],
      },
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
      {
        label: "NI/RM feedback & action plan",
        cells: [null, true, "Feedback after the preparation sessions and mock interviews, with an agreed action plan"],
      },
      {
        label: "Priority 1-to-1 NI/RM support",
        cells: [null, null, "Direct one-to-one support for the Nominated Individual and Registered Manager"],
      },
      {
        label: "Interview-Day Readiness Support",
        note: "Final pre-interview readiness support including key-question preparation, documentation/evidence check, interview setup check and final readiness review.",
        cells: [null, null, "✓ Included"],
      },
    ],
  },
  {
    label: "LAUNCH READINESS",
    rows: [
      {
        label: "Launch Readiness Review & Personalised Action Plan",
        cells: [null, true, "Full launch readiness review with a personalised action plan"],
      },
      { label: "Launch implementation review sessions", cells: [null, null, "2 sessions"] },
      {
        label: "Workforce readiness guidance",
        cells: [null, null, "Workforce readiness guidance, delivered within the launch readiness review"],
      },
      {
        label: "Mandatory training framework guidance",
        cells: [null, null, "Mandatory training framework guidance, delivered within the launch readiness review"],
      },
      {
        label: "Non-Regulated Service Launch Pathway",
        cells: [null, "Add-on available", "Add-on available"],
      },
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

/* Only these four add-ons are displayed publicly (client instruction).
 * Everything else in the full add-on catalogue is quoted privately after
 * the assessment and strategy call. */
const ADDONS: { name: string; price: string; scope: string; note?: string }[] = [
  {
    name: "Non-Regulated Service Launch Pathway",
    price: "£999",
    scope:
      "Available as an add-on with any package. Where appropriate, you may be able to structure a suitable non-regulated service while your CQC application progresses.",
    note: "Where appropriate, we help clients explore and structure a non-regulated service pathway while their CQC registration is progressing. Suitability depends on the proposed service and activities. We do not guarantee client acquisition, revenue, profitability or business success.",
  },
  {
    name: "Care Business Starter Branding Pack",
    price: "£399",
    scope: "Website + logo + 2 digital leaflets.",
  },
  {
    name: "NI Interview Readiness Programme",
    price: "£399",
    scope: "2 preparation sessions + 1 mock CQC interview + feedback.",
  },
  {
    name: "RM Interview Readiness Programme",
    price: "£399",
    scope: "2 preparation sessions + 1 mock CQC interview + feedback.",
  },
];

const INTERVIEW_ADDON_NOTE =
  "Interview preparation and mentoring are designed to improve readiness and confidence. We do not guarantee CQC approval, Registered Manager status, interview outcomes or employment.";

const PRICING_DISCLAIMER =
  "Important: Josh Vantage Consulting Group provides consultancy, preparation and business support. CQC registration decisions are made solely by the Care Quality Commission. We do not guarantee registration, approval or specific regulatory outcomes.";

const SCOPE_NOTES = [
  "Support periods begin from the agreed application submission date.",
  "Revisions and post-submission support apply only within the original agreed registration scope. Material changes to the service model, regulated activity, location structure or application may require a separate quote.",
  "Application Submission Guidance means Josh Vantage prepares/reviews the agreed work and guides the client through submission. The provider and relevant registered persons remain responsible for reviewing, confirming and submitting their application and declarations.",
  "Launch Readiness is advisory: Josh Vantage assesses, advises and creates the roadmap. It does not include configuring care-management software, recruiting the full workforce, running rotas, payroll, purchasing insurance or operating the client's business.",
  "The exact client scope is confirmed after the assessment and strategy call, and must match the signed proposal and service agreement.",
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
          intro="Choose the level of support that matches your starting point. JV Launch offers three levels of support depending on how much of your registration and business foundation is already in place. Start with the free CQC Readiness Assessment and we’ll identify the most appropriate level of support for your situation."
        />

        {/* Shared foundation — keeps the comparison table down to what differs */}
        <Reveal className="mt-12">
          <div className="notch-card border border-black/5 bg-white p-7 md:p-9">
            <p className="eyebrow-mono text-[#8a8a83]">/INCLUDED IN EVERY PACKAGE</p>
            <ul className="mt-5 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
              {CORE_INCLUDED.map((item) => (
                <li key={item} className="flex gap-2.5 text-[14px] leading-snug text-[#33332f]">
                  <span aria-hidden className="font-semibold text-[var(--brand-navy)]">&#10003;</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal className="mt-10">
          <div className="flex items-end justify-between gap-6">
            <p className="eyebrow-mono text-[#8a8a83]">/WHAT DIFFERS BY LEVEL</p>
            <p className="eyebrow-mono text-[#8a8a83] md:hidden">SWIPE &#8594;</p>
          </div>
          <div className="notch-card mt-3 border border-black/5 bg-white">
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
                            MOST RECOMMENDED
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
                            {r.note && (
                              <span className="mt-1 block text-[12px] font-normal leading-relaxed text-[#8a8a83]">
                                {r.note}
                              </span>
                            )}
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

          {/* Client-mandated wording — directly below the package/pricing section */}
          <p className="mx-auto mt-8 max-w-3xl text-center text-[13px] leading-relaxed text-[#6b6b64]">
            {PRICING_DISCLAIMER}
          </p>

          <div className="mt-8 flex justify-center">
            <a
              href="#assessment"
              className="flex h-13 items-center rounded-full bg-[var(--brand-navy)] px-9 py-3.5 text-[14.5px] font-semibold text-white transition-colors hover:bg-[#1b2f8d]"
            >
              Take My CQC Readiness Assessment
            </a>
          </div>
        </Reveal>

        {/* Optional add-ons — deliberately secondary to the core packages */}
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
            Available alongside any package, priced separately. Whether an
            add-on is appropriate is confirmed after your assessment and
            strategy call.
          </p>
          <div className="mt-8 divide-y divide-black/5 border border-black/5 bg-white">
            {ADDONS.map((a) => (
              <div key={a.name} className="px-6 py-5">
                <div className="flex flex-col gap-1.5 sm:flex-row sm:gap-8">
                  <div className="flex-1">
                    <p className="text-[14.5px] font-medium">{a.name}</p>
                    <p className="mt-1.5 text-[13.5px] leading-relaxed text-[#4c4c47]">{a.scope}</p>
                  </div>
                  <p className="shrink-0 text-[14.5px] font-semibold text-[var(--brand-navy)] sm:w-44 sm:text-right">
                    {a.price}
                  </p>
                </div>
                {a.note && (
                  <p className="mt-3 border-l-2 border-black/10 pl-4 text-[12px] leading-relaxed text-[#8a8a83]">
                    {a.note}
                  </p>
                )}
              </div>
            ))}
          </div>
          {/* Client-mandated wording — directly under the NI/RM interview add-ons */}
          <p className="mt-4 text-[12px] leading-relaxed text-[#8a8a83]">
            {INTERVIEW_ADDON_NOTE}
          </p>
        </Reveal>

        {/* Scope boundaries — collapsed by default so the assessment below stays dominant */}
        <Reveal className="mt-14">
          <details className="faq group mx-auto max-w-3xl border-y border-black/10 py-4">
            <summary className="flex cursor-pointer list-none items-center justify-between text-[14px] font-medium text-[#4c4c47]">
              Important Scope Information
              <span aria-hidden className="ml-4 text-xl font-light transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <ul className="mt-4 space-y-2.5">
              {SCOPE_NOTES.map((n) => (
                <li key={n} className="text-[13px] leading-relaxed text-[#6b6b64]">
                  <span aria-hidden className="mr-2.5 text-[var(--brand-navy)]">&#9642;</span>
                  {n}
                </li>
              ))}
            </ul>
          </details>
        </Reveal>
      </div>
    </section>
  );
}
