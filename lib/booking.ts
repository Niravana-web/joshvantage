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
 * INTERIM: all three currently point at one shared 30-minute event so booking
 * works today. Two consequences until the per-funnel events exist:
 *   - the site says "20-Minute" in eight places; the booking page says 30
 *   - bookings are not separable by funnel in Calendly's own reporting, so the
 *     UTM campaign below is the only thing distinguishing them
 * Replace each entry with its own event URL to resolve both.
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

export type BookingConfig = {
  url: string;
  prefill: { name?: string; email?: string };
  utm: { utmSource: string; utmMedium: string; utmCampaign: string };
};

/*
 * Everything the embed needs, or null when no URL is configured — the caller's
 * signal to render nothing rather than an empty booking frame.
 *
 * Prefill and UTM are kept as objects rather than query parameters because
 * Calendly's inline widget takes them through its own API; `bookingUrl` below
 * folds them into a URL for the plain-link fallback.
 */
export function bookingConfig(
  funnel: Funnel,
  answers: Record<string, string>,
  override?: string
): BookingConfig | null {
  const base = override ?? CALENDLY_URLS[funnel];
  if (!base) return null;
  try {
    new URL(base);
  } catch {
    return null;
  }

  /* Every funnel assessment collects these same two fields. */
  const name = answers.name?.trim();
  const email = answers.email?.trim();

  return {
    url: base,
    prefill: { ...(name && { name }), ...(email && { email }) },
    utm: {
      utmSource: "website",
      utmMedium: "assessment",
      utmCampaign: UTM_CAMPAIGN[funnel],
    },
  };
}

/*
 * The same booking destination as a plain URL. Used for the fallback link shown
 * beneath the embed, so a visitor whose browser blocks third-party scripts can
 * still reach the booking page.
 */
export function bookingUrl(
  funnel: Funnel,
  answers: Record<string, string>,
  override?: string
): string | null {
  const config = bookingConfig(funnel, answers, override);
  if (!config) return null;

  const url = new URL(config.url);
  if (config.prefill.name) url.searchParams.set("name", config.prefill.name);
  if (config.prefill.email) url.searchParams.set("email", config.prefill.email);
  url.searchParams.set("utm_source", config.utm.utmSource);
  url.searchParams.set("utm_medium", config.utm.utmMedium);
  url.searchParams.set("utm_campaign", config.utm.utmCampaign);
  return url.toString();
}
