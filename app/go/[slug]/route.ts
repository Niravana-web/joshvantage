import { NextResponse, type NextRequest } from "next/server";

/*
 * Permanent short links for print and offline campaigns.
 *
 * A printed QR code can never be changed once it is on a leaflet, a letter or
 * a pull-up banner. Pointing every code at joshvantage.com/go/<slug> means the
 * destination stays editable here forever — repoint a campaign by changing one
 * line, without reprinting anything.
 *
 * Each entry stamps its campaign onto the destination as UTM parameters, which
 * lib/analytics.ts captures on landing and carries through to the lead record
 * in MongoDB. So a registration can be traced back to the exact piece of
 * collateral it came from, in the admin dashboard as well as in GA4.
 *
 * To add a campaign: add a slug below and print joshvantage.com/go/<slug>.
 * To repoint one: change its `path`. The printed code keeps working.
 */
type Destination = {
  /* Path on this site the code resolves to. */
  path: string;
  /* utm_source — the channel class. */
  source: string;
  /* utm_medium — how the person encountered it. */
  medium: string;
  /* utm_campaign — which specific piece of collateral. */
  campaign: string;
};

const DESTINATIONS: Record<string, Destination> = {
  /* Per-funnel codes — the general-purpose ones for any printed material
     pointing at a single service. */
  launch: { path: "/launch", source: "qr", medium: "print", campaign: "qr-launch" },
  growth: { path: "/growth", source: "qr", medium: "print", campaign: "qr-growth" },
  academy: { path: "/academy", source: "qr", medium: "print", campaign: "qr-academy" },

  /* Collateral-specific codes — use these where you want to tell two pieces
     of print apart even though they point at the same page. */
  leaflet: { path: "/academy", source: "qr", medium: "print", campaign: "university-leaflet" },
  letter: { path: "/launch", source: "qr", medium: "print", campaign: "provider-letter" },
  event: { path: "/", source: "qr", medium: "event", campaign: "event-standee" },
  card: { path: "/", source: "qr", medium: "print", campaign: "business-card" },

  /* Not a QR code — a link for email campaigns, kept here so the destination
     stays editable in the same place as everything else. */
  email: { path: "/", source: "email", medium: "email", campaign: "email-campaign" },
};

export async function GET(
  _req: NextRequest,
  ctx: { params: Promise<{ slug: string }> }
) {
  const { slug } = await ctx.params;
  const target = DESTINATIONS[slug.toLowerCase()];

  const base = new URL(target?.path ?? "/", "https://joshvantage.com");
  if (target) {
    base.searchParams.set("utm_source", target.source);
    base.searchParams.set("utm_medium", target.medium);
    base.searchParams.set("utm_campaign", target.campaign);
  }

  /* 308 keeps the redirect permanent while preserving the method, and lets
     browsers and scanners cache it. Unknown slugs fall back to the homepage
     rather than 404-ing someone holding a printed leaflet. */
  return NextResponse.redirect(base, 308);
}
