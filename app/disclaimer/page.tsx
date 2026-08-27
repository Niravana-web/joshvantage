import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Disclaimer | Josh Vantage Consulting Group",
  description:
    "The nature of Josh Vantage Consulting Group Ltd's services and the outcomes we do not guarantee.",
};

export default function DisclaimerPage() {
  return (
    <LegalPage eyebrow="/DISCLAIMER" title="Disclaimer" updated="16 AUGUST 2026">
      <h2>1. Nature of our services</h2>
      <p>
        Josh Vantage Consulting Group Ltd provides consultancy, training,
        preparation and business support services to individuals and
        organisations in the UK care sector. This includes support with CQC
        registration preparation (JV Launch), tender and bid development (JV
        Growth), and professional development through the Registered Manager
        Leadership Programme (JV Academy). We are advisers and trainers: we
        are not a regulator, a commissioning body, an employer, a recruitment
        agency (except where expressly agreed in writing), a law firm or an
        immigration adviser.
      </p>

      <h2>2. No guaranteed outcomes</h2>
      <p>
        Nothing on this website, and nothing in our services, is a promise of
        a particular result. In particular, we do not guarantee:
      </p>
      <ul>
        <li>
          CQC registration, approval, ratings or processing timescales;
        </li>
        <li>
          the outcome of tender submissions, contract awards, revenue, growth
          or any commercial result;
        </li>
        <li>
          employment, interviews, placements, a Registered Manager role or any
          specific salary;
        </li>
        <li>
          sponsorship, sponsor-licence outcomes, visa support or any
          immigration outcome;
        </li>
        <li>
          admission to the Registered Manager Leadership Programme or
          acceptance as a client.
        </li>
      </ul>
      <p>
        Every such decision rests with the applicable independent third party
        - the Care Quality Commission, the relevant commissioning or
        contracting authority, the employer or care provider, the Home Office,
        or another decision-maker - based on their own criteria, processes and
        judgement.
      </p>

      <h2>3. The Registered Manager Leadership Programme</h2>
      <p>
        The programme fee pays for training, mentoring, preparation and
        professional development. It does not purchase employment, a role,
        sponsorship or any regulatory outcome. Participation in the optional,
        free Josh Vantage Talent Network does not change this: any
        opportunities remain subject to suitability, availability and the
        independent recruitment decision of the provider.
      </p>

      <h2>4. Information, not advice</h2>
      <p>
        Content on this website is general information about our services. It
        is not legal, regulatory, financial, tax or immigration advice. You
        should take appropriate independent professional advice before acting
        on any matter of significance. Where a solicitor referral is made (for
        example in relation to sponsor licences), the solicitor&apos;s
        services, advice and fees are entirely separate from ours.
      </p>

      <h2>5. Testimonials and results</h2>
      <p>
        Any testimonials or client experiences shown on this website reflect
        the individual circumstances of those clients. They are not a promise
        that you will achieve the same or similar results. No success rate is
        claimed unless supported by verifiable data.
      </p>

      <h2>6. Your responsibilities</h2>
      <p>
        Registered persons and providers remain responsible for reviewing,
        confirming and submitting their own applications, declarations and
        tender submissions, and for the ongoing operation and compliance of
        their services.
      </p>
    </LegalPage>
  );
}
