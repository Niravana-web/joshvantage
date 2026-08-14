"use client";

import { useState } from "react";

export type Field = {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "select" | "textarea" | "radio";
  options?: string[];
  required?: boolean;
};

export type FormStep = { title: string; fields: Field[] };

/*
 * Multi-step, mobile-first assessment form with progress indicator.
 * Lead delivery + Calendly embed are connected at integration time —
 * the booking panel links out once the live URL is supplied.
 */
export default function MultiStepForm({
  id = "assessment",
  funnel,
  eyebrow,
  title,
  intro,
  steps,
  bookCta,
  calendlyUrl,
  submitNote,
}: {
  id?: string;
  funnel: "launch" | "growth" | "academy";
  eyebrow: string;
  title: string;
  intro: string;
  steps: FormStep[];
  bookCta: string;
  calendlyUrl?: string;
  submitNote?: string;
}) {
  const [stepIdx, setStepIdx] = useState(0);
  const [values, setValues] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const step = steps[stepIdx];
  const pct = Math.round(((stepIdx + 1) / steps.length) * 100);

  const set = (name: string, value: string) => {
    setValues((v) => ({ ...v, [name]: value }));
    setError("");
  };

  const next = async () => {
    const missing = step.fields.find(
      (f) => f.required !== false && !values[f.name]?.trim(),
    );
    if (missing) {
      setError(`Please complete: ${missing.label}`);
      return;
    }
    if (stepIdx < steps.length - 1) {
      setStepIdx(stepIdx + 1);
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ funnel, answers: values }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setDone(true);
    } catch {
      setError(
        "Something went wrong sending your details. Please try again in a moment.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const inputCls =
    "mt-1.5 w-full border border-black/15 bg-white px-4 py-3 text-[15px] text-[#181815] outline-none transition-colors focus:border-[var(--brand-navy)]";

  return (
    <section id={id} className="bg-white px-6 py-24 text-[#181815] md:px-12">
      <div className="mx-auto max-w-2xl">
        <div className="rule" style={{ height: 2, background: "linear-gradient(to right, #181815 0 13%, rgba(0,0,0,0.08) 13%)" }} />
        <p className="eyebrow-mono mt-3">/{eyebrow}</p>
        <h2 className="mt-6 text-3xl font-semibold md:text-4xl">{title}</h2>
        <p className="mt-4 text-[15px] leading-relaxed text-[#4c4c47]">{intro}</p>

        {!done ? (
          <div className="mt-10 border border-black/10 bg-[#fbfbfa] p-7 md:p-9">
            <div className="flex items-center justify-between">
              <p className="eyebrow-mono text-[#8a8a83]">
                STEP {stepIdx + 1} OF {steps.length}
              </p>
              <p className="eyebrow-mono text-[#8a8a83]">{pct}% COMPLETE</p>
            </div>
            <div className="mt-3 h-1 w-full bg-black/10">
              <div
                className="h-full bg-[var(--brand-navy)] transition-all duration-500"
                style={{ width: `${Math.max(pct, 8)}%` }}
              />
            </div>

            <h3 className="mt-8 text-xl font-semibold">{step.title}</h3>
            <div className="mt-5 space-y-5">
              {step.fields.map((f) => (
                <label key={f.name} className="block text-[14px] font-medium">
                  {f.label}
                  {f.type === "select" ? (
                    <select
                      className={inputCls}
                      value={values[f.name] ?? ""}
                      onChange={(e) => set(f.name, e.target.value)}
                    >
                      <option value="">Select an option…</option>
                      {f.options?.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  ) : f.type === "textarea" ? (
                    <textarea
                      className={`${inputCls} min-h-28`}
                      value={values[f.name] ?? ""}
                      onChange={(e) => set(f.name, e.target.value)}
                    />
                  ) : f.type === "radio" ? (
                    <div className="mt-2 flex gap-6">
                      {f.options?.map((o) => (
                        <label key={o} className="flex items-center gap-2 text-[15px] font-normal">
                          <input
                            type="radio"
                            name={f.name}
                            checked={values[f.name] === o}
                            onChange={() => set(f.name, o)}
                          />
                          {o}
                        </label>
                      ))}
                    </div>
                  ) : (
                    <input
                      type={f.type}
                      className={inputCls}
                      value={values[f.name] ?? ""}
                      onChange={(e) => set(f.name, e.target.value)}
                    />
                  )}
                </label>
              ))}
            </div>

            {error && (
              <p className="mt-4 text-[13.5px] font-medium text-red-700">{error}</p>
            )}

            {submitNote && stepIdx === steps.length - 1 && (
              <p className="mt-6 text-[12px] leading-relaxed text-[#8a8a83]">
                {submitNote}
              </p>
            )}

            <div className="mt-8 flex items-center justify-between">
              {stepIdx > 0 ? (
                <button
                  type="button"
                  onClick={() => setStepIdx(stepIdx - 1)}
                  className="text-[14px] font-medium text-[#4c4c47] hover:text-[#181815]"
                >
                  &#8592; Back
                </button>
              ) : (
                <span />
              )}
              <button
                type="button"
                onClick={next}
                disabled={submitting}
                className="flex h-12 items-center rounded-full bg-[var(--brand-navy)] px-8 text-[14px] font-semibold text-white transition-colors hover:bg-[#1b2f8d] disabled:opacity-60"
              >
                {submitting
                  ? "Sending…"
                  : stepIdx < steps.length - 1
                    ? "Continue"
                    : "Submit"}
              </button>
            </div>
            <p className="mt-6 text-[12px] leading-relaxed text-[#8a8a83]">
              Your details are used only to assess your enquiry and arrange your
              call. See our privacy policy for how your data is handled.
            </p>
          </div>
        ) : (
          <div className="mt-10 border border-black/10 bg-[#fbfbfa] p-9 text-center">
            <p className="eyebrow-mono text-[var(--brand-navy)]">/NEXT STEP</p>
            <h3 className="mt-4 text-2xl font-semibold">{bookCta}</h3>
            <p className="mx-auto mt-3 max-w-md text-[14.5px] leading-relaxed text-[#4c4c47]">
              Thank you — based on your answers, the next step is a focused
              20-minute call to look at your situation honestly and confirm the
              right level of support.
            </p>
            <a
              href={calendlyUrl ?? "#"}
              className="mx-auto mt-7 flex h-13 w-fit items-center rounded-full bg-[var(--brand-navy)] px-9 py-3.5 text-[14.5px] font-semibold text-white transition-colors hover:bg-[#1b2f8d]"
            >
              Book your 20-minute call
            </a>
            {!calendlyUrl && (
              <p className="mt-4 text-[12px] text-[#8a8a83]">
                Booking link goes live at launch.
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
