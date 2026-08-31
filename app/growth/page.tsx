import type { Metadata } from "next";
import FunnelHero from "@/components/FunnelHero";
import Objections from "@/components/funnel/Objections";
import StepsList from "@/components/funnel/StepsList";
import Packages from "@/components/funnel/Packages";
import ClientResults from "@/components/funnel/ClientResults";
import FunnelFinalCta from "@/components/funnel/FunnelFinalCta";
import MediaTestimonials, { type MediaTestimonial } from "@/components/funnel/MediaTestimonials";

const GROWTH_TESTIMONIALS: MediaTestimonial[] = [];
import MultiStepForm from "@/components/funnel/MultiStepForm";
import FunnelDisclaimer from "@/components/funnel/FunnelDisclaimer";
import StickyAssessmentCta from "@/components/funnel/StickyAssessmentCta";
import Footer from "@/components/sections/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import JsonLd from "@/components/JsonLd";
import { serviceSchema, breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "JV Growth | Josh Vantage Consulting Group",
  description: "Win your next care tender with a stronger, evidence-led bid.",
};

export default function GrowthPage() {
  return (
    <SmoothScroll>
      <main>
        <JsonLd
          schema={[
            serviceSchema({
              path: "/growth",
              name: "JV Growth",
              serviceType: "Health and social care tender writing",
              description:
                "Tender support for established UK care providers, covering bid/no-bid review, specification and scoring analysis, evidence gathering and the written submission.",
              audience: "Established UK care providers pursuing contracts and frameworks",
            }),
            breadcrumbSchema([{ name: "JV Growth", path: "/growth" }]),
          ]}
        />
        <FunnelHero
          eyebrow="JV GROWTH"
          title="Win Your Next Care Tender With a Stronger, Evidence-Led Bid"
          sub="Specialist tender-writing support for established UK care providers. We help you assess the opportunity, understand the specification, build the evidence and develop a stronger, competitive submission."
          cta="Get My Tender Assessment"
        />

        <Objections
          items={[
            {
              q: "Not sure if the tender is worth pursuing?",
              a: "Not every opportunity is the right opportunity. Before committing significant time and resources, we help assess the requirements, scope and fit.",
            },
            {
              q: "Don't have time to build a strong submission?",
              a: "Tender responses can involve extensive specifications, method statements and evidence requirements. We help turn your operational knowledge into structured, evidence-led responses.",
            },
            {
              q: "Tendered before without winning?",
              a: "A compliant answer isn't automatically a competitive answer. We focus on the specification, scoring criteria, evidence and what the evaluator is actually asking you to demonstrate.",
            },
          ]}
        />

        <StepsList
          eyebrow="THE SYSTEM"
          title="The JV Tender Win System"
          steps={[
            { num: "/01", title: "Assess Opportunity", desc: "Is this opportunity commercially and operationally worth pursuing?" },
            { num: "/02", title: "Analyse the Tender", desc: "Break down the specification, evaluation criteria, submission requirements and scoring structure." },
            { num: "/03", title: "Build the Evidence", desc: "Identify the policies, examples, outcomes, processes and operational evidence needed to support the bid." },
            { num: "/04", title: "Develop the Bid", desc: "Build structured, evidence-led responses around the buyer's requirements." },
            { num: "/05", title: "Quality & Compliance Review", desc: "Review the submission against the requirements before finalisation." },
          ]}
        />

        {/* Populated once the client supplies genuine tender/bid testimonials */}
        <MediaTestimonials items={GROWTH_TESTIMONIALS} />

        {/* Documentary proof of delivery, immediately before the investment */}
        <ClientResults />

        <Packages
          eyebrow="TENDER SUPPORT"
          title="Choose your tender support"
          cta="Get My Tender Assessment"
          guardrail="Tender outcomes cannot be guaranteed. Contract award decisions are made independently by the relevant contracting authority. Final scope and price are confirmed following review of the tender documents, deadline, complexity and submission requirements. The 3-Bid Growth Bundle is valid for 12 months from purchase/start date; the three tenders must be used within that period and remain subject to the agreed scope for each tender."
          packages={[
            {
              name: "Tender Essential",
              price: "£1,250",
              bestFor: "Smaller or simple tender requirements. Indicative scope: up to 1,500 words.",
              features: [
                "Bid/no-bid review",
                "Tender specification review",
                "Scoring criteria analysis",
                "Compliance requirements check",
                "Evidence-gap review",
                "Client information session",
                "Tender response writing",
                "Proofreading / editing",
                "Final quality review",
                "Submission-readiness check",
                "Post-result feedback review",
              ],
            },
            {
              name: "Tender Complete",
              price: "£1,750",
              bestFor: "Providers requiring more comprehensive support on a larger or more complex submission. Indicative scope: up to 3,500 words.",
              features: [
                "Bid/no-bid review",
                "Tender specification review",
                "Scoring criteria analysis",
                "Compliance requirements check",
                "Evidence-gap review",
                "Client information session",
                "Tender response writing - indicative scope up to 3,500 words",
                "Proofreading / editing",
                "Final quality review",
                "Submission-readiness check",
                "Post-result feedback review",
                "Reusable Tender Evidence Bank development",
              ],
              popular: true,
            },
            {
              name: "3-Bid Growth Bundle",
              price: "£3,750",
              tagline: "Build once. Strengthen over time. Bid more strategically.",
              value: {
                compare: "3 × Tender Complete (£1,750)",
                comparePrice: "£5,250",
                saving: "£1,500",
                validity: "Valid for 12 months from purchase/start date.",
              },
              bestFor: "Three tender projects to use within 12 months, supported by a reusable evidence bank and tender pipeline prioritisation.",
              features: [
                "Three eligible tenders within the agreed validity period and scope",
                "Bid/no-bid reviews",
                "Tender specification / scoring analysis",
                "Evidence-gap reviews",
                "Response development",
                "Proofreading and quality review",
                "Reusable Tender Evidence Bank",
                "Tender pipeline review",
                "Priority booking",
              ],
            },
          ]}
        />

        <MultiStepForm funnel="growth"
          eyebrow="TENDER ASSESSMENT"
          title="Is this tender worth pursuing? Start here."
          intro="Tell us about your business and the opportunity you're considering. We'll assess the tender, your current position and the support required before recommending the appropriate next step."
          bookCta="Book Your 20-Minute Tender Strategy Call"
          submitNote="Submitting this assessment does not guarantee that Josh Vantage will accept the tender instruction or that any tender will be successful. We review the opportunity, scope, deadline and available evidence before confirming whether we can support the submission."
          steps={[
            {
              title: "Your Business",
              fields: [
                { name: "business", label: "Business name", type: "text" },
                { name: "serviceType", label: "Service type", type: "select", options: ["Domiciliary care", "Supported living", "Residential care", "Extra care housing", "Other"] },
                { name: "registration", label: "CQC registration status", type: "select", options: ["Registered", "In progress", "Not registered"] },
              ],
            },
            {
              title: "The Tender",
              fields: [
                { name: "tender", label: "Tell us about the current tender", type: "textarea" },
                { name: "deadline", label: "Submission deadline", type: "text" },
                { name: "value", label: "Approximate contract value (if known)", type: "text", required: false },
              ],
            },
            {
              title: "Experience & Support",
              fields: [
                { name: "experience", label: "Previous tender experience", type: "select", options: ["Won tenders before", "Bid before without winning", "First tender"] },
                { name: "help", label: "What help do you need?", type: "textarea" },
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

        <FunnelDisclaimer text="Josh Vantage Consulting Group provides consultancy, tender preparation and business development support. We do not guarantee tender awards, contracts, revenue, business growth or any specific commercial outcome. Procurement and contracting decisions are made independently by the relevant commissioning or contracting organisation." />

        <FunnelFinalCta
          title="Have a tender opportunity you're considering?"
          body="Start with the Tender Assessment. We'll understand the opportunity, deadline and support required before determining the appropriate next step."
          cta="Get My Tender Assessment"
        />

        <Footer generalCta={false} />
        {/* Steps aside for the evidence documents and for the assessment form
            itself, so it never sits over a document or the submit button */}
        <StickyAssessmentCta
          label="Get My Tender Assessment"
          hideAlso="#client-results, #next-step"
        />
      </main>
    </SmoothScroll>
  );
}
