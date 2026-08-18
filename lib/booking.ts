/*
 * Calendly booking links for the funnel assessments.
 *
 * One Calendly event type per funnel, so each stays separately identifiable in
 * Calendly's reporting and names the right service in the prospect's
 * confirmation and reminder emails. Behind them sits a single availability
 * schedule and a single account-level daily meeting limit, so a booking on any
 * one funnel consumes the same shared sales capacity and blocks the slot on the
 * other two. That capacity rule lives in the Calendly account, not here.
 */

export type Funnel = "launch" | "growth" | "academy";

/*
 * Empty until the client supplies the live event URLs. While a URL is empty the
 * booking button is not rendered at all — better than shipping a guessed slug
 * that would 404 for a prospect who has just completed an assessment.
 */
export const CALENDLY_URLS: Record<Funnel, string> = {
  launch: "",
  growth: "",
  academy: "",
};

/* Campaign name per funnel, so Calendly's reporting can attribute a booking to
   the funnel it came from on top of the event type itself. */
const UTM_CAMPAIGN: Record<Funnel, string> = {
  launch: "jv-launch",
  growth: "jv-growth",
  academy: "jv-academy",
};

/*
 * Builds the booking link for a funnel, prefilling what the assessment already
 * captured so the prospect does not retype it. Returns null when no URL is
 * configured, which is the caller's signal to hide the button.
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
  if (name) url.searchParams.set("name", name);
  if (email) url.searchParams.set("email", email);

  url.searchParams.set("utm_source", "website");
  url.searchParams.set("utm_medium", "assessment");
  url.searchParams.set("utm_campaign", UTM_CAMPAIGN[funnel]);

  return url.toString();
}
