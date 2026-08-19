import { NextResponse, type NextRequest } from "next/server";

/*
 * Permanent short links for print and offline campaigns.
 *
 * A printed QR code can never be changed once it is on a leaflet, a letter or
 * a pull-up banner. Pointing every code at joshvantage.com/go/<slug> means the
 * destination stays editable here forever — repoint a campaign by changing one
 * line, without reprinting anything.
 *
 * Each entry also stamps the campaign onto the destination as UTM parameters,
 * so the source is captured by lib/analytics.ts on landing and travels through
 * to the lead record in MongoDB.
 *
 * PLACEHOLDERS: the slugs below are illustrative. Replace them with the real
 * campaigns before any code is printed — a printed slug that is not in this
 * map falls back to the homepage.
 */
type Destination = {
  /* Path on this site the code resolves to. */
  path: string;
  /* utm_medium — how the person encountered the code. */
  medium: string;
  /* utm_campaign — which specific piece of collateral. */
  campaign: string;
};

const DESTINATIONS: Record<string, Destination> = {
  leaflet: { path: "/academy", medium: "print", campaign: "university-leaflet" },
  letter: { path: "/launch", medium: "print", campaign: "provider-letter" },
  event: { path: "/", medium: "event", campaign: "event-standee" },
  card: { path: "/", medium: "print", campaign: "business-card" },
};

export async function GET(
  _req: NextRequest,
  ctx: { params: Promise<{ slug: string }> }
) {
  const { slug } = await ctx.params;
  const target = DESTINATIONS[slug.toLowerCase()];

  const base = new URL(
    target?.path ?? "/",
    "https://joshvantage.com"
  );
  if (target) {
    base.searchParams.set("utm_source", "qr");
    base.searchParams.set("utm_medium", target.medium);
    base.searchParams.set("utm_campaign", target.campaign);
  }

  /* 308 keeps the redirect permanent while preserving the method, and lets
     browsers and scanners cache it. Unknown slugs fall back to the homepage
     rather than 404-ing someone holding a printed leaflet. */
  return NextResponse.redirect(base, 308);
}
