import type { Metadata } from "next";
import FunnelHero from "@/components/FunnelHero";
import MultiStepForm from "@/components/funnel/MultiStepForm";
import FunnelDisclaimer from "@/components/funnel/FunnelDisclaimer";
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

const ACADEMY_TESTIMONIALS: MediaTestimonial[] = [];

const OUTCOMES = [
  {
    title: "Regulatory Readiness",
    desc: "Understand the regulations and explain them confidently during interviews and in practice.",
  },
  {
    title: "Leadership & Governance",
    desc: "Develop the judgement and leadership behaviours expected of a Registered Manager.",
  },
  {
    title: "Operational Management",
    desc: "Learn how services are managed day to day, including staffing, safeguarding, quality assurance and governance.",
  },
  {
    title: "Evidence Development",
    desc: "Build stronger examples and evidence that demonstrate leadership capability rather than relying on memorised answers.",
  },
  {
    title: "Interview Preparation",
    desc: "Practise communicating experience, judgement and regulatory understanding confidently in Registered Manager selection processes.",
  },
];

const PAINS = [
  "“I want to progress towards care leadership but haven’t yet held a Registered Manager role.”",
  "“I have qualifications or care experience but need stronger leadership and management evidence.”",
  "“I want to strengthen my regulatory knowledge and prepare for future Registered Manager / CQC interviews.”",
];

export default function AcademyPage() {
  return (
    <SmoothScroll>
      <main>
        <FunnelHero
          eyebrow="JV ACADEMY"
          title="Ready to Step Up as a Registered Manager?"
          sub="Develop the regulatory knowledge, leadership capability, operational understanding and interview readiness required to compete for Registered Manager opportunities."
          cta="Apply for the Registered Manager Leadership Programme"
          priceLine="PROGRAMME INVESTMENT: £4,999 · ADMISSION BY APPLICATION"
        />

        {/* The problem */}
        <section className="bg-[#f7f7f5] px-6 py-24 text-[#181815] md:px-12">
          <div className="mx-auto max-w-6xl">
            <SectionHead
              eyebrow="THE PROBLEM"
              title="You want to progress into care leadership — but need the knowledge, evidence and confidence to take the next step"
            />
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

        {/* Programme outcomes */}
        <section className="bg-white px-6 py-24 text-[#181815] md:px-12">
          <div className="mx-auto max-w-6xl">
            <SectionHead
              eyebrow="OUTCOMES"
              title="What the programme develops"
            />
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

        {/* Opportunity + suitability guardrails */}
        <section className="funnels-bg px-6 py-24 text-white md:px-12">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow-mono text-[var(--brand-pale)]">/PROFESSIONAL OPPORTUNITY</p>
            <h2 className="mt-5 text-3xl font-semibold md:text-4xl">
              Josh Vantage Talent Network
            </h2>
            <p className="mt-6 text-[15.5px] leading-relaxed text-white/80">
              Participants may have the opportunity to separately express an
              interest in joining the Josh Vantage Talent Network for
              consideration for potentially suitable Registered Manager
              opportunities.
            </p>
            <p className="mt-5 text-[15.5px] leading-relaxed text-white/80">
              Details on how to express interest in the Talent Network are
              provided separately to eligible participants. Joining the Talent
              Network is optional and free of charge.
            </p>
            <p className="mt-5 text-[13px] leading-relaxed text-white/50">
              Participation in the Registered Manager Leadership Programme does
              not guarantee employment, interviews, placement, a Registered
              Manager role, CQC registration, sponsorship, visa support or a
              specific salary. Employment opportunities are subject to
              suitability, availability and the independent recruitment
              decision of the provider.
            </p>
          </div>
        </section>

        {/* Populated once the client supplies genuine RM/leadership testimonials */}
        <MediaTestimonials items={ACADEMY_TESTIMONIALS} />

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
              The Registered Manager Leadership Programme is a professional
              development programme designed to strengthen regulatory
              knowledge, leadership capability, operational understanding and
              interview readiness.
            </p>
            <p className="mx-auto mt-4 max-w-xl text-[13px] text-[#8a8a83]">
              The fee covers training, mentoring, preparation and professional
              development. It does not purchase employment, sponsorship, visa
              support or a Registered Manager role.
            </p>
          </div>
        </section>

        <MultiStepForm funnel="academy"
          eyebrow="APPLICATION"
          title="Apply for the Registered Manager Leadership Programme"
          intro="This is an application, not an automatic enrolment. The purpose is to understand your background, goals, current stage and whether the programme is appropriate for your professional development."
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

        <Footer />
      </main>
    </SmoothScroll>
  );
}
