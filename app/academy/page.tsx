import type { Metadata } from "next";
import FunnelHero from "@/components/FunnelHero";
import MultiStepForm from "@/components/funnel/MultiStepForm";
import FunnelDisclaimer from "@/components/funnel/FunnelDisclaimer";
import FunnelFinalCta from "@/components/funnel/FunnelFinalCta";
import StickyAssessmentCta from "@/components/funnel/StickyAssessmentCta";
import MediaTestimonials, { type MediaTestimonial } from "@/components/funnel/MediaTestimonials";
import SectionHead from "@/components/SectionHead";
import Reveal from "@/components/Reveal";
import Footer from "@/components/sections/Footer";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "JV Academy | Josh Vantage Consulting Group",
  description:
    "Develop the regulatory, leadership, operational and interview capability required to compete for Registered Manager opportunities.",
};

/* Stays empty until the client supplies genuine Academy testimonials — the
   section renders nothing rather than a placeholder. */
const ACADEMY_TESTIMONIALS: MediaTestimonial[] = [];

/* Who the programme is for — three starting points, one destination. */
const AUDIENCE = [
  {
    title: "Building towards care leadership",
    desc: "You already work in or are entering health and social care and want to understand what strong management and regulatory leadership actually require.",
  },
  {
    title: "Experienced but not yet RM-ready",
    desc: "You have care experience or qualifications, but need stronger leadership evidence, operational understanding and confidence before progressing.",
  },
  {
    title: "Preparing for Registered Manager opportunities",
    desc: "You are moving closer to RM-level responsibility and want structured preparation for leadership, governance and interview expectations.",
  },
];

/* Three starting points, in deliberate order: student / new to care, then
   care professional, then aspiring manager. Someone arriving from a
   university campaign has to recognise themselves in the first card, so the
   programme does not read as being for experienced care workers only. */
const PAINS = [
  "“I want to build a career in health and social care, but I’m not sure where to start or how to build the right experience.”",
  "“I already work in care, but I’m not sure how to move from delivering care into leadership and management.”",
  "“I want to progress towards Registered Manager level, but I need stronger regulatory knowledge, management evidence and interview readiness.”",
];

/* The five development pillars. */
const OUTCOMES = [
  {
    title: "Regulatory Readiness",
    desc: "Understand the regulations and be able to explain how they shape real management decisions, not just repeat definitions.",
  },
  {
    title: "Leadership & Governance",
    desc: "Develop stronger judgement around accountability, quality, governance and leadership expectations.",
  },
  {
    title: "Operational Management",
    desc: "Build confidence around staffing, safeguarding, quality assurance, risk and day-to-day service oversight.",
  },
  {
    title: "Evidence Development",
    desc: "Turn your experience into credible examples that demonstrate leadership capability.",
  },
  {
    title: "Interview Preparation",
    desc: "Practise communicating judgement, experience and regulatory understanding clearly in Registered Manager selection processes.",
  },
];

/* Deliberately framed as aims rather than promised results — the programme
   develops capability, it does not guarantee an outcome. */
const TRANSFORMATION = [
  "Understand how UK health and social care operates in practice.",
  "Build practical understanding of CQC and regulatory expectations.",
  "Develop leadership and management judgement.",
  "Build credible experience and evidence as they progress.",
  "Understand safeguarding, staffing, governance and quality.",
  "Prepare for management opportunities and, when appropriate, Registered Manager selection and interviews.",
];

export default function AcademyPage() {
  return (
    <SmoothScroll>
      <main>
        <FunnelHero
          eyebrow="JV ACADEMY"
          title="Ready to Step Up as a Registered Manager?"
          sub="Develop the regulatory knowledge, leadership judgement, operational understanding and interview readiness needed to progress towards Registered Manager leadership."
          sub2="Designed for ambitious care professionals who want a structured route towards stronger management and regulatory readiness."
          cta="Apply for the Registered Manager Leadership Programme"
          priceLine="ADMISSION BY APPLICATION"
        />

        {/* Who the programme is for */}
        <section className="bg-white px-6 py-24 text-[#181815] md:px-12">
          <div className="mx-auto max-w-6xl">
            <SectionHead
              eyebrow="WHO IS THIS PATHWAY FOR?"
              title="Your starting point may be different. The destination is stronger care leadership."
            />
            <Reveal stagger={0.12} className="mt-12 grid gap-5 md:grid-cols-3">
              {AUDIENCE.map((a) => (
                <article
                  key={a.title}
                  className="border border-black/5 bg-[#f7f7f5] p-8"
                >
                  <h3 className="text-xl font-semibold tracking-tight">
                    {a.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-[#4c4c47]">
                    {a.desc}
                  </p>
                </article>
              ))}
            </Reveal>
          </div>
        </section>

        {/* The problem, in participants' own framing */}
        <section className="bg-[#f7f7f5] px-6 py-24 text-[#181815] md:px-12">
          <div className="mx-auto max-w-6xl">
            <SectionHead eyebrow="THE PROBLEM" title="Where people get stuck" />
            <Reveal stagger={0.12} className="mt-12 grid gap-5 md:grid-cols-3">
              {PAINS.map((p) => (
                <blockquote
                  key={p}
                  className="border border-black/5 bg-white p-8 text-lg font-medium leading-relaxed"
                >
                  {p}
                </blockquote>
              ))}
            </Reveal>
          </div>
        </section>

        {/* Five development pillars */}
        <section className="bg-white px-6 py-24 text-[#181815] md:px-12">
          <div className="mx-auto max-w-6xl">
            <SectionHead eyebrow="OUTCOMES" title="What the programme develops" />
            <Reveal stagger={0.1} className="mt-12 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {OUTCOMES.map((o, i) => (
                <div key={o.title}>
                  <p className="eyebrow-mono text-2xl text-[#b9b9b2]">
                    /0{i + 1}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight">
                    {o.title}
                  </h3>
                  <p className="mt-2.5 text-[14.5px] leading-relaxed text-[#4c4c47]">
                    {o.desc}
                  </p>
                </div>
              ))}
            </Reveal>
          </div>
        </section>

        {/* What the development is actually aiming at */}
        <section className="bg-[#f7f7f5] px-6 py-24 text-[#181815] md:px-12">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <p className="eyebrow-mono text-[#8a8a83]">/THE GOAL</p>
              <h2
                className="mt-6 text-3xl font-semibold leading-snug md:text-4xl"
                style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
              >
                The goal is to build towards management — not just prepare
                for an interview.
              </h2>
              <p className="mt-6 text-[15.5px] leading-relaxed text-[#4c4c47]">
                Your starting point may be different. The programme is designed
                to help you build the knowledge, judgement, experience and
                professional readiness needed to progress towards care
                leadership.
              </p>
              <p className="mt-5 text-[15.5px] leading-relaxed text-[#4c4c47]">
                Participants work towards being better able to:
              </p>
            </Reveal>
            <Reveal stagger={0.08} className="mt-8 space-y-4">
              {TRANSFORMATION.map((t) => (
                <p key={t} className="flex gap-3 text-[15.5px] leading-relaxed text-[#33332f]">
                  <span aria-hidden className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--brand-navy)]" />
                  {t}
                </p>
              ))}
            </Reveal>
          </div>
        </section>

        {/* Proof — three spaces held ready, before the investment is shown */}
        <MediaTestimonials
          items={ACADEMY_TESTIMONIALS}
          eyebrow="PARTICIPANT EXPERIENCES"
          title="Hear from participants"
        />

        {/* Investment */}
        <section className="bg-white px-6 py-24 text-[#181815] md:px-12">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow-mono text-[#8a8a83]">/INVESTMENT</p>
            <h2 className="mt-5 text-3xl font-semibold md:text-4xl">
              Programme investment
            </h2>
            <p className="mt-6 text-5xl font-semibold text-[var(--brand-navy)]">
              £4,999
            </p>
            <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-[#4c4c47]">
              This is a structured professional-development programme focused on
              regulatory readiness, leadership and governance, operational
              management, evidence development and Registered Manager interview
              preparation.
            </p>
            <p className="mx-auto mt-4 max-w-xl text-[13px] text-[#8a8a83]">
              The investment covers the programme&rsquo;s training, mentoring,
              preparation and development support. It does not purchase
              employment, sponsorship, visa support or a Registered Manager
              role.
            </p>
          </div>
        </section>

        {/*
          Talent Network — deliberately secondary. It is an optional extra, not
          the product, so it sits as a quiet inset rather than the full-bleed
          dark section it previously occupied. Every guarantee disclaimer is
          kept word for word.
        */}
        <section className="bg-white px-6 pb-24 text-[#181815] md:px-12">
          <div className="mx-auto max-w-3xl border border-black/10 bg-[#f7f7f5] p-8 md:p-10">
            <p className="eyebrow-mono text-[#8a8a83]">/OPTIONAL PROFESSIONAL OPPORTUNITY</p>
            <h2 className="mt-3 text-xl font-semibold tracking-tight">
              Josh Vantage Talent Network
            </h2>
            <p className="mt-3 text-[14.5px] leading-relaxed text-[#4c4c47]">
              Eligible participants may separately express interest in joining
              the free Josh Vantage Talent Network for consideration where
              potentially suitable opportunities arise.
            </p>
            <p className="mt-4 text-[12.5px] leading-relaxed text-[#8a8a83]">
              Participation in the Registered Manager Leadership Programme does
              not guarantee employment, interviews, placement, a Registered
              Manager role, CQC registration, sponsorship, visa support or a
              specific salary. Employment opportunities are subject to
              suitability, availability and the independent recruitment
              decision of the provider.
            </p>
          </div>
        </section>

        <MultiStepForm funnel="academy"
          eyebrow="APPLICATION"
          title="Apply for the Registered Manager Leadership Programme"
          intro="This is an application, not automatic enrolment. We use the application to understand your current role, experience, qualifications, leadership background and professional goals before deciding whether the programme is appropriate for your stage."
          bookCta="Book Your 20-Minute Programme Assessment Call"
          submitNote="Submitting an application does not guarantee admission to the programme or any employment, Registered Manager, CQC, sponsorship or other professional outcome."
          steps={[
            {
              title: "Your Background",
              fields: [
                { name: "role", label: "Current role", type: "text" },
                { name: "experience", label: "Years of UK social-care experience", type: "select", options: ["Less than 1 year", "1-2 years", "3-5 years", "6-10 years", "10+ years"] },
                { name: "qualification", label: "Highest relevant qualification", type: "text" },
              ],
            },
            {
              title: "Your Goals",
              fields: [
                { name: "why", label: "Why do you want to become a Registered Manager?", type: "textarea" },
                { name: "challenge", label: "What is your biggest challenge right now?", type: "textarea" },
              ],
            },
            {
              title: "Commitment",
              fields: [
                { name: "invest", label: "Can you invest £4,999 if accepted?", type: "radio", options: ["Yes", "No"] },
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

        <FunnelDisclaimer text="The Registered Manager Leadership Programme is a professional development programme. Participation does not guarantee employment, interviews, placement, a Registered Manager role, CQC registration, sponsorship, visa support or a specific salary. Employment and professional opportunities are subject to individual suitability, availability and the independent decisions of employers, providers and relevant third parties." />

        <FunnelFinalCta
          title="Ready to find out whether the programme fits your next step?"
          body="Complete the application so we can understand your experience, goals and current stage."
          cta="Apply for the Registered Manager Leadership Programme"
        />

        <Footer generalCta={false} />
        <StickyAssessmentCta
          label="Apply for the Programme"
          hideAlso="#next-step"
        />
      </main>
    </SmoothScroll>
  );
}
