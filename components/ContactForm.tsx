"use client";

import { useState } from "react";

/*
 * The three funnel options were removed deliberately: JV Launch / Growth /
 * Academy enquiries are meant to start from their own assessment or
 * application (see the pathway links above the form on /contact), so this
 * page now only handles enquiries that fall outside those funnels.
 */
const NATURE_OPTIONS = [
  "Existing Client",
  "Partnership / Professional Enquiry",
  "General Enquiry",
  "Other",
];

const inputCls =
  "mt-1.5 w-full border border-black/15 bg-white px-4 py-3 text-[15px] text-[#181815] outline-none transition-colors focus:border-[var(--brand-navy)]";

export default function ContactForm() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const set = (name: string, value: string) => {
    setValues((v) => ({ ...v, [name]: value }));
    setError("");
  };

  const submit = async () => {
    const required: [string, string][] = [
      ["firstName", "First name"],
      ["lastName", "Last name"],
      ["email", "Email address"],
      ["phone", "Phone number"],
      ["nature", "Nature of enquiry"],
      ["query", "Your query"],
    ];
    const missing = required.find(([k]) => !values[k]?.trim());
    if (missing) {
      setError(`Please complete: ${missing[1]}`);
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ funnel: "contact", answers: values }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setDone(true);
    } catch {
      setError("Something went wrong sending your enquiry. Please try again in a moment.");
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div className="border border-black/10 bg-[#fbfbfa] p-9 text-center">
        <p className="eyebrow-mono text-[var(--brand-navy)]">/RECEIVED</p>
        <h3 className="mt-4 text-2xl font-semibold">Thank you for your enquiry</h3>
        <p className="mx-auto mt-3 max-w-md text-[14.5px] leading-relaxed text-[#4c4c47]">
          Your message has been received. A member of the Josh Vantage team
          will come back to you as soon as possible.
        </p>
      </div>
    );
  }

  return (
    <div className="border border-black/10 bg-[#fbfbfa] p-7 md:p-9">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-[14px] font-medium">
          First name
          <input type="text" className={inputCls} value={values.firstName ?? ""} onChange={(e) => set("firstName", e.target.value)} />
        </label>
        <label className="block text-[14px] font-medium">
          Last name
          <input type="text" className={inputCls} value={values.lastName ?? ""} onChange={(e) => set("lastName", e.target.value)} />
        </label>
        <label className="block text-[14px] font-medium">
          Email address
          <input type="email" className={inputCls} value={values.email ?? ""} onChange={(e) => set("email", e.target.value)} />
        </label>
        <label className="block text-[14px] font-medium">
          Phone number
          <input type="tel" className={inputCls} value={values.phone ?? ""} onChange={(e) => set("phone", e.target.value)} />
        </label>
        <label className="block text-[14px] font-medium sm:col-span-2">
          Nature of enquiry
          <select className={inputCls} value={values.nature ?? ""} onChange={(e) => set("nature", e.target.value)}>
            <option value="">Select an option…</option>
            {NATURE_OPTIONS.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-[14px] font-medium sm:col-span-2">
          Your query
          <textarea className={`${inputCls} min-h-32`} value={values.query ?? ""} onChange={(e) => set("query", e.target.value)} />
        </label>
      </div>

      {error && <p className="mt-4 text-[13.5px] font-medium text-red-700">{error}</p>}

      <button
        type="button"
        onClick={submit}
        disabled={submitting}
        className="mt-8 flex h-12 items-center rounded-full bg-[var(--brand-navy)] px-8 text-[14px] font-semibold text-white transition-colors hover:bg-[#1b2f8d] disabled:opacity-60"
      >
        {submitting ? "Sending…" : "Submit Enquiry"}
      </button>
      <p className="mt-6 text-[12px] leading-relaxed text-[#8a8a83]">
        Your details are used only to respond to your enquiry. See our privacy
        policy for how your data is handled.
      </p>
    </div>
  );
}
