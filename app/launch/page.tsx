import type { Metadata } from "next";
import FunnelHero from "@/components/FunnelHero";

export const metadata: Metadata = {
  title: "JV Launch | Josh Vantage Consulting Group",
  description:
    "Launch your UK care business with the right CQC foundations from day one.",
};

export default function LaunchPage() {
  return (
    <FunnelHero
      eyebrow="JV LAUNCH"
      title="Launch Your UK Care Business With the Right CQC Foundations From Day One."
      sub="CQC application preparation, policies and governance, business and operational readiness, and Nominated Individual and Registered Manager preparation — for people entering the UK care sector."
      cta="Get My Free CQC Readiness Assessment"
    />
  );
}
