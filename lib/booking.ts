/*
 * Calendly booking configuration for the funnel assessments.
 *
 * The end state is one Calendly event type per funnel, so each stays separately
 * identifiable in Calendly's reporting and names the right service in the
 * prospect's confirmation and reminder emails. Behind them sits a single
 * availability schedule and a single account-level daily meeting limit, so a
 * booking on any one funnel consumes the same shared sales capacity and blocks
 * the slot on the other two. That capacity rule lives in the Calendly account,
 * not here.
 *
 * INTERIM: all three currently point at one shared event so booking works
 * today. Its slug still reads "30min" but the event itself is configured as a
 * 20-minute meeting, which is what the booking page shows — so the slug is
 * cosmetic and matches the site's "20-Minute" copy in practice.
 *
 * The remaining consequence is that bookings are not separable by funnel in
 * Calendly's own reporting, so the UTM campaign below is the only thing
 * distinguishing them. Replace each entry with its own event URL to fix that.
 */

export type Funnel = "launch" | "growth" | "academy";

const INTERIM_SHARED_EVENT =
  "https://calendly.com/meetings-joshvantageconsultinggroup/30min";

export const CALENDLY_URLS: Record<Funnel, string> = {
  launch: INTERIM_SHARED_EVENT,
  growth: INTERIM_SHARED_EVENT,
  academy: INTERIM_SHARED_EVENT,
};

/* Campaign name per funnel, so a booking can be attributed to the funnel it
   came from even while all three share one event type. */
const UTM_CAMPAIGN: Record<Funnel, string> = {
  launch: "jv-launch",
  growth: "jv-growth",
  academy: "jv-academy",
};

/*
 * The booking destination, with the visitor's details prefilled, or null when
 * no URL is configured — the caller's signal to render nothing rather than an
 * empty booking frame.
 *
 * Prefill goes in the URL rather than through the widget's `prefill` option:
 * the current Calendly widget.js accepts a `prefill` object and silently drops
 * it, forwarding only `utm`, so the object form leaves the booking page blank.
 * Query parameters are honoured by both the inline widget and the booking page
 * itself, so one URL serves the embed and the fallback link alike.
 */
export function bookingUrl(
  funnel: Funnel,
  answers: Record<string, string>,
  override?: string
): string | null {
  const base = override ?? CALENDLY_URLS[funnel];
  if (!base) return null;

  let url: URL;
  try {
    url = new URL(base);
  } catch {
    return null;
  }

  /* Every funnel assessment collects these same two fields. */
  const name = answers.name?.trim();
  const email = answers.email?.trim();

  const params: [string, string][] = [];
  if (name) params.push(["name", name]);
  if (email) params.push(["email", email]);
  params.push(
    ["utm_source", "website"],
    ["utm_medium", "assessment"],
    ["utm_campaign", UTM_CAMPAIGN[funnel]]
  );

  /*
   * Built with encodeURIComponent rather than URLSearchParams on purpose.
   * URLSearchParams encodes a space as "+", and Calendly's widget re-encodes
   * that "+" as %2B — so "Jane Smith" reaches the booking page as
   * "Jane+Smith". Percent-encoded spaces survive the round trip intact.
   */
  const query = params
    .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
    .join("&");

  return `${url.origin}${url.pathname}${url.search}${url.search ? "&" : "?"}${query}`;
}
