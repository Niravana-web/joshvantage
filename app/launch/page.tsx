import type { Metadata } from "next";
import FunnelHero from "@/components/FunnelHero";
import Objections from "@/components/funnel/Objections";
import StepsList from "@/components/funnel/StepsList";
import LaunchPackages from "@/components/funnel/LaunchPackages";
import MultiStepForm from "@/components/funnel/MultiStepForm";
import SectionHead from "@/components/SectionHead";
import Reveal from "@/components/Reveal";
import Footer from "@/components/sections/Footer";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "JV Launch | Josh Vantage Consulting Group",
  description:
    "Launch your UK care business with the right CQC foundations from day one.",
};

const SUPPORT = [
  "CQC Application Preparation",
  "Policies & Governance",
  "Business & Operational Readiness",
  "Nominated Individual Preparation",
  "Registered Manager Preparation",
  "Associated Launch Support",
];

export default function LaunchPage() {
  return (
    <SmoothScroll>
      <main>
        <FunnelHero
          eyebrow="JV LAUNCH"
          title="Launch Your UK Care Business With the Right CQC Foundations From Day One"
          sub="Structured support with CQC preparation, business readiness, leadership preparation and the operational foundations required to move your care business forward."
          cta="Get My Free CQC Readiness Assessment"
        />

        <Objections
          items={[
            {
              q: "Not sure where to start?",
              a: "We assess your current position and help identify the steps required to move your registration and launch forward.",
            },
            {
              q: "Worried you are not ready for CQC?",
              a: "Identify gaps across your application, documentation, leadership preparation and operational readiness before progressing.",
            },
            {
              q: "Still need the right leadership structure?",
              a: "Support can include Registered Manager and Nominated Individual preparation appropriate to the proposed service.",
            },
          ]}
        />

        <section className="bg-white px-6 py-24 text-[#181815] md:px-12">
          <div className="mx-auto max-w-6xl">
            <SectionHead
              eyebrow="SCOPE"
              title="What JV Launch can support"
            />
            <Reveal stagger={0.08} className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {SUPPORT.map((s) => (
                <div key={s} className="border border-black/5 bg-[#f7f7f5] px-6 py-5 text-[15px] font-medium">
                  <span aria-hidden className="mr-2.5 text-[var(--brand-navy)]">&#9642;</span>
                  {s}
                </div>
              ))}
            </Reveal>
            <p className="mt-8 text-[13px] text-[#8a8a83]">
              Josh Vantage does not guarantee CQC registration. No specific
              success rate is claimed unless supported by verified data.
            </p>
          </div>
        </section>

        <StepsList
          eyebrow="HOW IT WORKS"
          title="How it works"
          steps={[
            { num: "/01", title: "Assess", desc: "Complete your CQC Readiness Assessment." },
            { num: "/02", title: "Diagnose", desc: "Identify your current position and major readiness gaps." },
            { num: "/03", title: "Plan", desc: "Book a 20-minute CQC Strategy Call." },
            { num: "/04", title: "Build", desc: "If suitable, we recommend the appropriate level of JV Launch support." },
          ]}
        />

        <LaunchPackages />

        <MultiStepForm funnel="launch"
          eyebrow="CQC READINESS ASSESSMENT"
          title="CQC Readiness Assessment"
          intro="Complete the free assessment to identify your current position and whether further support may be appropriate."
          bookCta="Book Your 20-Minute CQC Strategy Call"
          steps={[
            {
              title: "Your Service",
              fields: [
                { name: "serviceType", label: "What type of care service are you planning?", type: "select", options: ["Domiciliary care", "Supported living", "Residential care", "Extra care housing", "Other"] },
                { name: "stage", label: "What stage are you currently at?", type: "select", options: ["Researching", "Company registered", "Preparing CQC application", "Application started", "Application submitted"] },
                { name: "cqcStatus", label: "Have you started your CQC application?", type: "select", options: ["Yes", "In progress", "No"] },
              ],
            },
            {
              title: "Your Business",
              fields: [
                { name: "company", label: "Company name", type: "text" },
                { name: "legalStatus", label: "Legal business status", type: "select", options: ["Limited company registered", "Registration in progress", "Not yet registered"] },
                { name: "location", label: "Location / operating model", type: "text" },
              ],
            },
            {
              title: "Readiness",
              fields: [
                { name: "policies", label: "Policies and governance status", type: "select", options: ["In place", "Partially in place", "Not started"] },
                { name: "rmStatus", label: "Registered Manager status", type: "select", options: ["RM identified and ready", "RM identified, needs preparation", "No RM yet"] },
                { name: "obstacle", label: "What is your biggest obstacle right now?", type: "textarea" },
                { name: "timeline", label: "Target timeline", type: "select", options: ["Within 3 months", "3–6 months", "6–12 months", "Over 12 months"] },
                { name: "support", label: "Do you require professional support?", type: "radio", options: ["Yes", "Not sure yet"] },
              ],
            },
            {
              title: "Contact Details",
              fields: [
                { name: "name", label: "Full name", type: "text" },
                { name: "email", label: "Email", type: "email" },
                { name: "phone", label: "Phone / WhatsApp", type: "tel" },
              ],
            },
          ]}
        />

        <Footer />
      </main>
    </SmoothScroll>
  );
}
