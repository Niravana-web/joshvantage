"use client";

import { useEffect, useMemo, useState } from "react";

type Lead = {
  id: string;
  funnel: string;
  answers: Record<string, string>;
  createdAt: string | null;
  archived: boolean;
};

const FUNNELS = [
  { key: "all", label: "ALL" },
  { key: "launch", label: "LAUNCH" },
  { key: "growth", label: "GROWTH" },
  { key: "academy", label: "ACADEMY" },
];

const CONTACT_KEYS = ["name", "email", "phone"];

function fmt(date: string | null) {
  if (!date) return "—";
  return new Date(date).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function LeadsAdmin() {
  const [leads, setLeads] = useState<Lead[] | null>(null);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [funnel, setFunnel] = useState("all");
  const [view, setView] = useState<"active" | "archived">("active");
  const [oldestFirst, setOldestFirst] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);

  useEffect(() => {
    fetch("/admin/api/leads")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => setLeads(d.leads))
      .catch(() => setError("Could not load leads. Check the database connection."));
  }, []);

  const visible = useMemo(() => {
    if (!leads) return [];
    const q = query.trim().toLowerCase();
    const filtered = leads.filter((l) => {
      if (l.archived !== (view === "archived")) return false;
      if (funnel !== "all" && l.funnel !== funnel) return false;
      if (!q) return true;
      return (
        l.funnel.includes(q) ||
        Object.entries(l.answers).some(
          ([k, v]) => k.toLowerCase().includes(q) || v.toLowerCase().includes(q),
        )
      );
    });
    return oldestFirst ? [...filtered].reverse() : filtered;
  }, [leads, query, funnel, view, oldestFirst]);

  const counts = useMemo(() => {
    const active = leads?.filter((l) => !l.archived).length ?? 0;
    const archived = (leads?.length ?? 0) - active;
    return { active, archived };
  }, [leads]);

  async function setArchived(id: string, archived: boolean) {
    setBusy(id);
    const res = await fetch("/admin/api/leads", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, archived }),
    }).catch(() => null);
    if (res?.ok) {
      setLeads((ls) => ls!.map((l) => (l.id === id ? { ...l, archived } : l)));
    }
    setBusy(null);
  }

  async function remove(id: string) {
    setBusy(id);
    const res = await fetch("/admin/api/leads", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    }).catch(() => null);
    if (res?.ok) setLeads((ls) => ls!.filter((l) => l.id !== id));
    setBusy(null);
    setConfirmDelete(null);
  }

  const chip = (active: boolean) =>
    `eyebrow-mono cursor-pointer px-3.5 py-2 text-[11px] transition-colors ${
      active
        ? "bg-[var(--brand-navy)] text-white"
        : "bg-white text-[#6b6b64] hover:text-[#181815] border border-black/10"
    }`;

  return (
    <div>
      {/* Controls */}
      <div className="mt-10 flex flex-wrap items-center gap-3">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search name, email, any answer…"
          className="h-10 w-full max-w-sm border border-black/15 bg-white px-4 text-[14px] outline-none transition-colors focus:border-[var(--brand-navy)]"
        />
        <div className="flex">
          {FUNNELS.map((f) => (
            <button key={f.key} type="button" className={chip(funnel === f.key)} onClick={() => setFunnel(f.key)}>
              {f.label}
            </button>
          ))}
        </div>
        <button
          type="button"
          className={chip(false)}
          onClick={() => setOldestFirst((v) => !v)}
          title="Toggle sort order"
        >
          {oldestFirst ? "OLDEST FIRST ↑" : "NEWEST FIRST ↓"}
        </button>
        <div className="ml-auto flex">
          <button type="button" className={chip(view === "active")} onClick={() => setView("active")}>
            INBOX ({counts.active})
          </button>
          <button type="button" className={chip(view === "archived")} onClick={() => setView("archived")}>
            ARCHIVED ({counts.archived})
          </button>
        </div>
      </div>

      {/* List */}
      <div className="mt-8 space-y-4">
        {error && (
          <div className="border border-black/10 bg-white px-6 py-8 text-center text-[14.5px] text-[#b3261e]">
            {error}
          </div>
        )}
        {!error && leads === null && (
          <div className="border border-black/10 bg-white px-6 py-8 text-center text-[14.5px] text-[#6b6b64]">
            Loading…
          </div>
        )}
        {leads !== null && visible.length === 0 && (
          <div className="border border-black/10 bg-white px-6 py-10 text-center text-[14.5px] text-[#6b6b64]">
            {view === "archived"
              ? "Nothing archived."
              : query || funnel !== "all"
                ? "No leads match the current filters."
                : "No submissions yet. Leads appear here as soon as a funnel form is completed."}
          </div>
        )}

        {visible.map((lead) => {
          const rest = Object.entries(lead.answers).filter(([k]) => !CONTACT_KEYS.includes(k));
          return (
            <details key={lead.id} className="group border border-black/10 bg-white">
              <summary className="flex cursor-pointer list-none flex-wrap items-center gap-x-5 gap-y-2 px-6 py-4">
                <span className="eyebrow-mono bg-[var(--brand-navy)] px-2.5 py-1 text-[10.5px] text-white">
                  {lead.funnel.toUpperCase()}
                </span>
                <span className="text-[15px] font-semibold">{lead.answers.name ?? "—"}</span>
                <span className="text-[14px] text-[#4c4c47]">{lead.answers.email}</span>
                {lead.answers.phone && (
                  <span className="text-[14px] text-[#4c4c47]">{lead.answers.phone}</span>
                )}
                <span className="ml-auto flex items-center gap-4">
                  <span className="eyebrow-mono text-[11px] text-[#8a8a83]">{fmt(lead.createdAt)}</span>
                  <span aria-hidden className="text-xl font-light transition-transform group-open:rotate-45">
                    +
                  </span>
                </span>
              </summary>

              <div className="border-t border-black/5 px-6 py-5">
                <dl className="grid gap-x-10 gap-y-3 sm:grid-cols-2">
                  {rest.map(([key, value]) => (
                    <div key={key}>
                      <dt className="eyebrow-mono text-[10.5px] text-[#8a8a83]">
                        {key.replace(/([A-Z])/g, " $1").toUpperCase()}
                      </dt>
                      <dd className="mt-1 text-[14px] leading-relaxed text-[#33332f]">{value}</dd>
                    </div>
                  ))}
                  {rest.length === 0 && (
                    <p className="text-[14px] text-[#8a8a83]">No further answers.</p>
                  )}
                </dl>

                <div className="mt-6 flex items-center gap-3 border-t border-black/5 pt-4">
                  <button
                    type="button"
                    disabled={busy === lead.id}
                    onClick={() => setArchived(lead.id, !lead.archived)}
                    className="eyebrow-mono border border-black/15 px-3.5 py-2 text-[11px] text-[#33332f] transition-colors hover:border-[var(--brand-navy)] hover:text-[var(--brand-navy)] disabled:opacity-50"
                  >
                    {lead.archived ? "RESTORE TO INBOX" : "ARCHIVE"}
                  </button>
                  {confirmDelete === lead.id ? (
                    <>
                      <button
                        type="button"
                        disabled={busy === lead.id}
                        onClick={() => remove(lead.id)}
                        className="eyebrow-mono bg-[#b3261e] px-3.5 py-2 text-[11px] text-white disabled:opacity-50"
                      >
                        CONFIRM PERMANENT DELETE
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirmDelete(null)}
                        className="eyebrow-mono px-2 py-2 text-[11px] text-[#6b6b64] hover:text-[#181815]"
                      >
                        CANCEL
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setConfirmDelete(lead.id)}
                      className="eyebrow-mono border border-black/15 px-3.5 py-2 text-[11px] text-[#b3261e] transition-colors hover:border-[#b3261e] disabled:opacity-50"
                    >
                      DELETE
                    </button>
                  )}
                </div>
              </div>
            </details>
          );
        })}
      </div>
    </div>
  );
}
