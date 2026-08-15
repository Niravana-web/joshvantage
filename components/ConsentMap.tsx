"use client";

import { useState } from "react";

/*
 * Click-to-load Google Map. Google's iframe (and any cookies it sets) only
 * loads after the visitor explicitly activates it, so no cookie banner is
 * needed — the click is the consent.
 */
export default function ConsentMap() {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <iframe
        title="Josh Vantage Consulting Group — 863 High Road, Ilford"
        src="https://maps.google.com/maps?q=863+High+Rd,+Ilford+IG3+8TG,+UK&z=16&output=embed"
        className="h-full min-h-[380px] w-full border-0 grayscale-[35%] transition-[filter] duration-500 hover:grayscale-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    );
  }

  return (
    <div className="flex h-full min-h-[380px] w-full flex-col items-center justify-center gap-4 px-8 text-center">
      <p className="eyebrow-mono text-[11px] text-[#8a8a83]">/MAP</p>
      <p className="max-w-xs text-[13px] leading-relaxed text-[#6b6b64]">
        The map is provided by Google. Loading it may allow Google to set
        cookies — see our{" "}
        <a href="/privacy" className="underline">
          Privacy Notice
        </a>
        .
      </p>
      <button
        type="button"
        onClick={() => setLoaded(true)}
        className="eyebrow-mono border border-[var(--brand-navy)] px-6 py-3 text-[11.5px] text-[var(--brand-navy)] transition-colors hover:bg-[var(--brand-navy)] hover:text-white"
      >
        LOAD MAP
      </button>
    </div>
  );
}
