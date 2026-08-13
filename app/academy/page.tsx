import type { Metadata } from "next";
import FunnelHero from "@/components/FunnelHero";

export const metadata: Metadata = {
  title: "JV Training Academy | Josh Vantage Consulting Group",
  description:
    "Become the Registered Manager care providers want to hire.",
};

export default function AcademyPage() {
  return (
    <FunnelHero
      eyebrow="JV TRAINING ACADEMY"
      title="Become the Registered Manager Care Providers Want to Hire."
      sub="The Registered Manager Leadership Programme for ambitious care professionals who are serious about progressing into senior leadership. Admission is by application."
      cta="Apply for the Registered Manager Leadership Programme"
    />
  );
}
