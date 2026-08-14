import type { Metadata } from "next";
import { getMongo, DB_NAME } from "@/lib/mongo";

export const metadata: Metadata = {
  title: "Leads | Josh Vantage Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const FUNNEL_LABELS: Record<string, string> = {
  launch: "JV LAUNCH",
  growth: "JV GROWTH",
  academy: "JV ACADEMY",
};

type Lead = {
  _id: { toString(): string };
  funnel: string;
  answers: Record<string, string>;
  createdAt?: Date;
};

/* Contact fields surface on the row; everything else lives in the expand. */
const CONTACT_KEYS = ["name", "email", "phone"];

export default async function AdminLeadsPage() {
  let leads: Lead[] = [];
  let error = "";
  try {
    const client = await getMongo();
    leads = (await client
      .db(DB_NAME)
      .collection("leads")
      .find({})
      .sort({ createdAt: -1 })
      .limit(500)
      .toArray()) as unknown as Lead[];
  } catch {
    error = "Could not reach the database. Check MONGODB_URI.";
  }

  return (
    <main className="min-h-screen bg-[#f7f7f5] px-6 py-16 text-[#181815] md:px-12">
      <div className="mx-auto max-w-5xl">
        <p className="eyebrow-mono text-[#8a8a83]">/ADMIN</p>
        <h1 className="mt-3 text-3xl font-semibold md:text-4xl">
          Form submissions
        </h1>
        <p className="mt-3 text-[14px] text-[#6b6b64]">
          {error ? error : `${leads.length} lead${leads.length === 1 ? "" : "s"}, newest first.`}
        </p>

        <div className="mt-10 space-y-4">
          {leads.map((lead) => {
            const contact = CONTACT_KEYS.filter((k) => lead.answers?.[k]);
            const rest = Object.entries(lead.answers ?? {}).filter(
              ([k]) => !CONTACT_KEYS.includes(k),
            );
            return (
              <details
                key={lead._id.toString()}
                className="group border border-black/10 bg-white"
              >
                <summary className="flex cursor-pointer list-none flex-wrap items-center gap-x-5 gap-y-2 px-6 py-4">
                  <span className="eyebrow-mono bg-[var(--brand-navy)] px-2.5 py-1 text-[10.5px] text-white">
                    {FUNNEL_LABELS[lead.funnel] ?? lead.funnel.toUpperCase()}
                  </span>
                  <span className="text-[15px] font-semibold">
                    {lead.answers?.name ?? "—"}
                  </span>
                  <span className="text-[14px] text-[#4c4c47]">
                    {lead.answers?.email}
                  </span>
                  {lead.answers?.phone && (
                    <span className="text-[14px] text-[#4c4c47]">
                      {lead.answers.phone}
                    </span>
                  )}
                  <span className="ml-auto flex items-center gap-4">
                    <span className="eyebrow-mono text-[11px] text-[#8a8a83]">
                      {lead.createdAt
                        ? new Date(lead.createdAt).toLocaleString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "—"}
                    </span>
                    <span
                      aria-hidden
                      className="text-xl font-light transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </span>
                </summary>
                <dl className="grid gap-x-10 gap-y-3 border-t border-black/5 px-6 py-5 sm:grid-cols-2">
                  {rest.map(([key, value]) => (
                    <div key={key}>
                      <dt className="eyebrow-mono text-[10.5px] text-[#8a8a83]">
                        {key.replace(/([A-Z])/g, " $1").toUpperCase()}
                      </dt>
                      <dd className="mt-1 text-[14px] leading-relaxed text-[#33332f]">
                        {value}
                      </dd>
                    </div>
                  ))}
                  {rest.length === 0 && (
                    <p className="text-[14px] text-[#8a8a83]">
                      No further answers.
                    </p>
                  )}
                </dl>
              </details>
            );
          })}
          {!error && leads.length === 0 && (
            <div className="border border-black/10 bg-white px-6 py-10 text-center text-[14.5px] text-[#6b6b64]">
              No submissions yet. Leads appear here as soon as a funnel form is
              completed.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
