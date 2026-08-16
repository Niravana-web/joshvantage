import type { Metadata } from "next";
import FunnelHero from "@/components/FunnelHero";
import Objections from "@/components/funnel/Objections";
import StepsList from "@/components/funnel/StepsList";
import Packages from "@/components/funnel/Packages";
import MediaTestimonials, { type MediaTestimonial } from "@/components/funnel/MediaTestimonials";

const GROWTH_TESTIMONIALS: MediaTestimonial[] = [];
import MultiStepForm from "@/components/funnel/MultiStepForm";
import FunnelDisclaimer from "@/components/funnel/FunnelDisclaimer";
import StickyAssessmentCta from "@/components/funnel/StickyAssessmentCta";
import Footer from "@/components/sections/Footer";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "JV Growth | Josh Vantage Consulting Group",
  description: "Win your next care tender with a stronger, evidence-led bid.",
};

export default function GrowthPage() {
  return (
    <SmoothScroll>
      <main>
        <FunnelHero
          eyebrow="JV GROWTH"
          title="Win Your Next Care Tender With a Stronger, Evidence-Led Bid"
          sub="Specialist tender-writing support for established UK care providers that want expert help assessing opportunities, developing strong responses and submitting competitive bids."
          cta="Get My Tender Assessment"
        />

        <Objections
          items={[
            {
              q: "Not sure whether the tender is worth pursuing?",
              a: "We review the opportunity before significant time is committed.",
            },
            {
              q: "Don't have time to write a strong bid?",
              a: "Josh Vantage can take the lead on developing the submission while gathering the required information and evidence from your organisation.",
            },
            {
              q: "Tendered before without winning?",
              a: "We focus the response around the specification, scoring criteria and available evidence rather than generic answers.",
            },
          ]}
        />

        <StepsList
          eyebrow="THE SYSTEM"
          title="The JV Tender Win System"
          steps={[
            { num: "/01", title: "Assess the Opportunity", desc: "Bid/no-bid review before significant time is committed." },
            { num: "/02", title: "Analyse the Tender", desc: "Review specification, requirements, questions and scoring criteria." },
            { num: "/03", title: "Build the Evidence", desc: "Identify the information and evidence required for the response." },
            { num: "/04", title: "Develop the Bid", desc: "Develop structured, evidence-led tender responses." },
            { num: "/05", title: "Quality Review", desc: "Proofreading, compliance and submission-readiness review." },
          ]}
        />

        {/* Populated once the client supplies genuine tender/bid testimonials */}
        <MediaTestimonials items={GROWTH_TESTIMONIALS} />

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
                "Tender response writing — indicative scope up to 3,500 words",
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
              bestFor: "Established providers planning to actively pursue multiple tender opportunities. Valid for 12 months.",
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
          title="Tender Assessment"
          intro="Complete the assessment to help us understand your tender opportunity and the support you may need."
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

        <Footer />
        <StickyAssessmentCta label="Take the Tender Assessment" />
      </main>
    </SmoothScroll>
  );
}
