"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { captureSource } from "@/lib/analytics";

const GA_ID = "G-BWG7SVB1Q5";
const KEY = "jv_cookie_consent"; // "granted" | "denied"

/*
 * Consent-gated GA4. The gtag script (and its _ga cookies) loads only after
 * the visitor accepts; declining stores the choice and loads nothing, per
 * the Privacy Notice's cookie commitments.
 */
export default function Analytics() {
  const [consent, setConsent] = useState<string | null>("pending");

  useEffect(() => {
    setConsent(localStorage.getItem(KEY));
    /* Campaign attribution. Runs regardless of analytics consent: it only
       carries the visitor's own referral parameters through to a form they
       choose to submit, is session-scoped, and sets no cookies. GA4 itself
       stays gated below. */
    captureSource();
  }, []);

  const choose = (value: "granted" | "denied") => {
    localStorage.setItem(KEY, value);
    setConsent(value);
  };

  return (
    <>
      {consent === "granted" && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');`}
          </Script>
        </>
      )}
      {consent === null && (
        <div className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-xl rounded-2xl bg-[rgba(9,17,48,0.96)] p-5 text-white shadow-[0_10px_40px_rgba(6,13,36,0.5)] md:inset-x-auto md:right-6">
          <p className="text-[13px] leading-relaxed text-white/85">
            We&apos;d like to use Google Analytics cookies to understand how
            the site is used. No analytics run unless you accept. See our{" "}
            <a href="/privacy" className="underline">Privacy Notice</a>.
          </p>
          <div className="mt-4 flex gap-3">
            <button
              type="button"
              onClick={() => choose("granted")}
              className="rounded-full bg-white px-5 py-2 text-[12.5px] font-semibold text-[var(--brand-navy)] transition-colors hover:bg-[var(--brand-pale)]"
            >
              Accept
            </button>
            <button
              type="button"
              onClick={() => choose("denied")}
              className="rounded-full border border-white/30 px-5 py-2 text-[12.5px] font-semibold text-white/85 transition-colors hover:bg-white/10"
            >
              Decline
            </button>
          </div>
        </div>
      )}
    </>
  );
}
