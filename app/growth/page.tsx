import type { Metadata } from "next";
import FunnelHero from "@/components/FunnelHero";

export const metadata: Metadata = {
  title: "JV Growth | Josh Vantage Consulting Group",
  description:
    "Win your next care tender with a stronger, evidence-led bid.",
};

export default function GrowthPage() {
  return (
    <FunnelHero
      eyebrow="JV GROWTH"
      title="Win Your Next Care Tender With a Stronger, Evidence-Led Bid."
      sub="Specialist tender and bid-writing support for established UK care providers — bid/no-bid review, specification and scoring analysis, evidence development, and quality review before submission."
      cta="Get My Tender Assessment"
    />
  );
}
