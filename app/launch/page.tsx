import type { Metadata } from "next";
import FunnelHero from "@/components/FunnelHero";
import Objections from "@/components/funnel/Objections";
import StepsList from "@/components/funnel/StepsList";
import LaunchPackages from "@/components/funnel/LaunchPackages";
import MediaTestimonials, { type MediaTestimonial } from "@/components/funnel/MediaTestimonials";
import MultiStepForm from "@/components/funnel/MultiStepForm";
import FunnelDisclaimer from "@/components/funnel/FunnelDisclaimer";
import StickyAssessmentCta from "@/components/funnel/StickyAssessmentCta";
import FunnelFinalCta from "@/components/funnel/FunnelFinalCta";
import SectionHead from "@/components/SectionHead";
import Reveal from "@/components/Reveal";
import Footer from "@/components/sections/Footer";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "JV Launch | Josh Vantage Consulting Group",
  description:
    "Launch your UK care business with the right CQC foundations from day one.",
};

/*
 * JV Launch proof — three positions in fixed display order: left, centre,
 * right on desktop. Jude holds the centre deliberately, between the two
 * media testimonials. The pending asset holds its slot with
 * `published: false`, so the section reads as one balanced row the moment
 * the file lands: drop it in /public/testimonials at the path below and
 * flip the flag. Until then the two published cards sit 2-up. Nothing is
 * invented in the meantime — no placeholder quotes, names or images render.
 */
const LAUNCH_TESTIMONIALS: MediaTestimonial[] = [
  {
    /* LEFT — Company Director video covering the full JV Launch / CQC
       registration journey. The thumbnail is the video's own first frame;
       set `poster` if a designed cover frame is supplied later. The written
       summary beneath is the client's approved wording, used verbatim. */
    id: "funmilayo",
    published: true,
    media: {
      kind: "video",
      src: "/testimonials/jv-launch-funmilayo.mp4",
      label: "Funmilayo, Company Director, on their CQC registration journey with JV Launch",
    },
    quote:
      "Josh Vantage supported us throughout our CQC registration journey, from preparation and documentation through to interview readiness. We successfully completed the process and became CQC registered.",
    name: "Funmilayo",
    role: "Company Director",
  },
  {
    /* CENTRE — deliberately the middle card: identifiable written proof
       between the two media testimonials. Quote, name, role and company are
       used exactly as supplied. The photograph is cropped from the
       client-supplied testimonial graphic; the graphic itself is not used as
       the card, so the wording and typography stay in the site's own system. */
    id: "jude-onorihewe",
    published: true,
    media: {
      kind: "photo",
      src: "/testimonials/jude-onorihewe.jpg",
      alt: "Jude Onorihewe, Registered Manager and Nominated Individual at AbleWay Support Ltd",
    },
    quote:
      "Josh has been incredibly helpful throughout the development of AbleWay Support Ltd. He supported me with the policies and procedures needed for our CQC registration and has continued to guide me around tenders, frameworks and procurement opportunities.\n\nMore than anything, he has been a genuine mentor — approachable, knowledgeable and always willing to help.\n\nI would happily recommend him to other care providers.",
    name: "Jude Onorihewe",
    role: "Registered Manager & Nominated Individual",
    company: "AbleWay Support Ltd",
  },
  {
    /* RIGHT — Starlit Recruitment. Format not yet confirmed: this is written
       as a photo/written card, and switching it to
       `{ kind: "video", src, label }` is the only change needed if a video
       is supplied instead. Either way it balances against the left card. */
    id: "starlit-recruitment",
    published: false,
    media: {
      kind: "photo",
      src: "/testimonials/starlit-recruitment.jpg",
      alt: "Starlit Recruitment client testimonial",
    },
  },
];

const SUPPORT = [
  "CQC Application Preparation",
  "Policies & Governance",
  "Business & Operational Readiness",
  "Nominated Individual Preparation",
  "Registered Manager Preparation",
  "Launch Support",
];

export default function LaunchPage() {
  return (
    <SmoothScroll>
      <main>
        <FunnelHero
          eyebrow="JV LAUNCH"
          title="Launch Your UK Care Business With the Right CQC Foundations From Day One"
          sub="From CQC application preparation and policies to business readiness, Nominated Individual and Registered Manager preparation, JV Launch gives you structured support through the critical stages of getting your care business ready for registration and launch."
          cta="Get My Free CQC Readiness Assessment"
        />

        <Objections
          items={[
            {
              q: "Not sure where to start?",
              a: "You may have formed the company, but registration involves much more than completing an application. Your service model, documentation, leadership and operational foundations need to align.",
            },
            {
              q: "Worried you’re not ready for CQC?",
              a: "Gaps in your application, policies, evidence or understanding of your service can create problems before you’ve even started operating.",
            },
            {
              q: "Still need the right leadership structure?",
              a: "Your Nominated Individual and Registered Manager arrangements are central to the registration journey. Knowing who is suitable and how they should prepare matters.",
            },
          ]}
          transition="You don't need to figure every part out alone."
        />

        <section className="bg-white px-6 py-24 text-[#181815] md:px-12">
          <div className="mx-auto max-w-6xl">
            <SectionHead
              eyebrow="SCOPE"
              title="The foundations your care business needs before launch"
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
            { num: "/01", title: "Assess", desc: "Understand where you are now and what you’ve already completed." },
            { num: "/02", title: "Diagnose", desc: "Identify the gaps in your registration, leadership and business readiness." },
            { num: "/03", title: "Plan", desc: "Establish the priorities and the level of support appropriate for your situation." },
            { num: "/04", title: "Build", desc: "Work through the agreed registration and launch requirements with structured JV support." },
          ]}
        />

        {/* Proof — three positions held; only supplied testimonials render.
            The disclaimer sits directly under the cards, in the client's
            approved wording, rather than only at the foot of the page. */}
        <MediaTestimonials
          items={LAUNCH_TESTIMONIALS}
          eyebrow="CLIENT EXPERIENCES"
          title="Hear from our clients"
          disclaimer="Testimonials reflect individual client experiences and do not guarantee the same or similar outcomes. CQC registration and tender decisions are made independently by the relevant regulatory or contracting authorities."
        />

        <LaunchPackages />

        <MultiStepForm funnel="launch"
          eyebrow="CQC READINESS ASSESSMENT"
          title="Find out how ready you are to move forward with your CQC registration"
          intro="Complete the free CQC Readiness Assessment to help us understand your service, current stage, registration progress and biggest obstacles. Based on your answers, we’ll determine whether a focused 20-minute CQC Strategy Call is the appropriate next step."
          bookCta="Book Your 20-Minute CQC Strategy Call"
          submitNote="The assessment is used to understand your circumstances and determine whether our services may be suitable. Completing the assessment does not guarantee acceptance as a client or any CQC outcome."
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

        <FunnelDisclaimer text="Josh Vantage Consulting Group provides consultancy, preparation and business support. CQC registration and regulatory decisions are made independently by the Care Quality Commission. We do not guarantee registration, approval, processing timescales or any specific regulatory or commercial outcome." />

        <FunnelFinalCta
          title="Ready to find out where your CQC journey stands?"
          body="Start with the free CQC Readiness Assessment. We’ll understand where you are, identify the key gaps and determine whether a strategy call is the right next step."
          cta="Get My Free CQC Readiness Assessment"
        />

        <Footer generalCta={false} />
        <StickyAssessmentCta label="Get My Free CQC Readiness Assessment" hideAlso="#next-step" />
      </main>
    </SmoothScroll>
  );
}
