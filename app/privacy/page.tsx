import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Notice | Josh Vantage Consulting Group",
  description:
    "How Josh Vantage Consulting Group Ltd collects, uses and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <LegalPage eyebrow="/PRIVACY" title="Privacy Notice" updated="16 AUGUST 2026">
      <h2>1. Who we are</h2>
      <p>
        Josh Vantage Consulting Group Ltd (&quot;Josh Vantage&quot;,
        &quot;we&quot;, &quot;us&quot;) provides consultancy, training and
        business support services to people and organisations in the UK care
        sector. We are a company registered in England and Wales, company
        number 15931129, and our contact address is 863 High Road, Ilford IG3
        8TG, United Kingdom. We are the data controller for the personal
        information described in this notice. You can contact us about
        anything in this notice through the enquiry form on our{" "}
        <a href="/contact">Contact page</a>.
      </p>

      <h2>2. Information we collect</h2>
      <p>We collect personal information you provide directly when you:</p>
      <ul>
        <li>
          complete the <strong>CQC Readiness Assessment</strong> (JV Launch):
          details about your planned care service, business stage, readiness
          position, name, email and phone number;
        </li>
        <li>
          complete the <strong>Tender Assessment</strong> (JV Growth): business
          name, service type, CQC registration status, details of the tender
          opportunity, name, email and phone number;
        </li>
        <li>
          apply for the <strong>Registered Manager Leadership Programme</strong>{" "}
          (JV Academy): your current role, experience, qualifications, goals,
          ability to invest in the programme, name, email and phone number;
        </li>
        <li>
          submit the <strong>contact form</strong>: name, email, phone number,
          the nature of your enquiry and the content of your message;
        </li>
        <li>
          correspond with us afterwards by phone, email, WhatsApp or in
          meetings.
        </li>
      </ul>
      <p>
        We do not collect special category data through the website and ask
        that you do not include it in free-text fields.
      </p>

      <h2>3. Purposes and lawful bases</h2>
      <table>
        <thead>
          <tr>
            <th>Purpose</th>
            <th>Lawful basis (UK GDPR Art. 6)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              Reviewing assessments, applications and enquiries and responding
              to you
            </td>
            <td>
              Legitimate interests (responding to requests you initiate) and,
              where relevant, steps prior to entering a contract (Art. 6(1)(b))
            </td>
          </tr>
          <tr>
            <td>
              Assessing suitability for our services or the programme and
              arranging strategy/assessment calls
            </td>
            <td>Steps prior to entering a contract</td>
          </tr>
          <tr>
            <td>Delivering services under a signed service agreement</td>
            <td>Performance of a contract</td>
          </tr>
          <tr>
            <td>
              Administering the optional Josh Vantage Talent Network, where you
              separately express interest
            </td>
            <td>
              Consent, and thereafter legitimate interests in administering the
              network
            </td>
          </tr>
          <tr>
            <td>
              Keeping business records, dealing with complaints and legal
              matters
            </td>
            <td>Legitimate interests; legal obligation</td>
          </tr>
          <tr>
            <td>Sending marketing about our services</td>
            <td>
              Only with your consent, or to existing clients about similar
              services under the soft opt-in, always with the option to opt out
            </td>
          </tr>
        </tbody>
      </table>

      <h2>4. How long we keep information</h2>
      <p>
        Assessment, application and enquiry submissions are retained for as
        long as needed to deal with your request and for a reasonable period
        afterwards so we can respond to follow-up contact - no longer than 24
        months where no engagement results. Where you become a client, records
        are kept for the duration of the engagement and then for up to six
        years in line with limitation periods for contractual claims. We
        periodically review stored submissions and delete those no longer
        needed.
      </p>

      <h2>5. Who we share information with</h2>
      <p>
        We do not sell personal information. We share it only with service
        providers who process it on our instructions:
      </p>
      <ul>
        <li>
          <strong>MongoDB Atlas</strong> - our database provider, which stores
          form submissions;
        </li>
        <li>
          <strong>Vercel Inc.</strong> - our website hosting provider, which
          processes data transmitted through the site;
        </li>
        <li>professional advisers (legal, accounting) where necessary;</li>
        <li>
          regulators, courts or law-enforcement bodies where required by law.
        </li>
      </ul>
      <p>
        Where you consent to the Talent Network, relevant details may be shared
        with prospective employers or care providers considering you for a
        role; any recruitment decision is theirs alone.
      </p>

      <h2>6. International transfers</h2>
      <p>
        Our hosting and database providers may process data in data centres
        outside the UK, including in the United States. Where that happens,
        transfers are protected by safeguards recognised under UK data
        protection law, including the UK Extension to the EU-US Data
        Privacy Framework and/or the ICO&apos;s International Data Transfer
        Agreement / Addendum to the EU Standard Contractual Clauses.
      </p>

      <h2>7. Cookies</h2>
      <p>
        This website does not use analytics, advertising or tracking cookies.
        The only cookie we set is a strictly necessary authentication cookie
        used solely by our staff to access a private administration area;
        ordinary visitors do not receive it. Our Contact page includes an
        embedded Google Map that loads only if you choose to activate it, at
        which point Google may set its own cookies - see Google&apos;s privacy
        policy for details.
      </p>

      <h2>8. Your rights</h2>
      <p>
        Under UK data protection law you have rights to: access your personal
        information; have inaccurate information corrected; have information
        erased in certain circumstances; restrict or object to processing
        (including an absolute right to object to direct marketing); data
        portability where applicable; and withdraw consent at any time where
        consent is the basis of processing. To exercise any right, contact us
        via the <a href="/contact">Contact page</a>. We will respond within
        one month.
      </p>

      <h2>9. Complaints</h2>
      <p>
        If you are unhappy with how we handle your personal information,
        please contact us first so we can try to resolve it. You also have the
        right to complain to the Information Commissioner&apos;s Office
        (ICO): ico.org.uk / 0303 123 1113.
      </p>

      <h2>10. Security</h2>
      <p>
        Form submissions are transmitted over encrypted connections (HTTPS)
        and stored in an access-controlled database. Access to submissions is
        restricted to authorised personnel and protected by authentication.
      </p>

      <h2>11. Changes</h2>
      <p>
        We may update this notice from time to time. The date at the top shows
        when it was last revised.
      </p>
    </LegalPage>
  );
}
