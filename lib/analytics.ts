/*
 * GA4 event helper.
 *
 * Every call is gated on the same consent flag the loader in
 * components/Analytics.tsx uses. The Privacy Notice commits to running no
 * analytics unless the visitor accepts, so a declined or undecided visitor
 * must produce no events at all — not queued ones, not anonymous ones.
 */

const CONSENT_KEY = "jv_cookie_consent";

type Gtag = (command: "event", name: string, params?: Record<string, unknown>) => void;

declare global {
  interface Window {
    gtag?: Gtag;
  }
}

export type TrackEvent =
  | "find_your_path_click"
  | "pathway_click"
  | "form_start"
  | "form_complete"
  | "calendly_reached"
  | "booked_call";

export function track(event: TrackEvent, params?: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  try {
    if (localStorage.getItem(CONSENT_KEY) !== "granted") return;
  } catch {
    /* Storage can throw in private modes — treat as no consent. */
    return;
  }
  window.gtag?.("event", event, params);
}

/*
 * Campaign attribution for print and offline sources (letters, leaflets, event
 * QR codes) as well as digital ones.
 *
 * UTMs are captured the first time a visitor lands and kept for the session, so
 * a lead submitted three pages later still carries the source that brought them
 * in. Session-scoped rather than persistent: it answers "what brought them to
 * this visit", and avoids retaining identifiers longer than needed.
 */
const SOURCE_KEY = "jv_source";
const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

export function captureSource(): void {
  if (typeof window === "undefined") return;
  try {
    if (sessionStorage.getItem(SOURCE_KEY)) return; // first touch wins
    const params = new URLSearchParams(window.location.search);
    const found: Record<string, string> = {};
    for (const key of UTM_KEYS) {
      const value = params.get(key);
      if (value) found[key] = value.slice(0, 120);
    }
    if (!params.get("utm_source") && document.referrer) {
      try {
        const host = new URL(document.referrer).hostname;
        if (host && host !== window.location.hostname) found.referrer = host;
      } catch {
        /* malformed referrer — ignore */
      }
    }
    if (Object.keys(found).length) {
      sessionStorage.setItem(SOURCE_KEY, JSON.stringify(found));
    }
  } catch {
    /* storage unavailable — attribution is best-effort, never blocking */
  }
}

/* Merged into the lead payload so the source is stored with the enquiry. */
export function getSource(): Record<string, string> {
  if (typeof window === "undefined") return {};
  try {
    const raw = sessionStorage.getItem(SOURCE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, string>) : {};
  } catch {
    return {};
  }
}
