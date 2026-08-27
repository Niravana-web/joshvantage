import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Use | Josh Vantage Consulting Group",
  description:
    "Terms governing the use of the Josh Vantage Consulting Group Ltd website.",
};

export default function TermsPage() {
  return (
    <LegalPage eyebrow="/TERMS" title="Website Terms of Use" updated="16 AUGUST 2026">
      <h2>1. About these terms</h2>
      <p>
        These terms govern your use of this website, operated by Josh Vantage
        Consulting Group Ltd, a company registered in England and Wales,
        company number 15931129, of 863 High Road, Ilford IG3 8TG, United
        Kingdom. By using the website you accept these terms. If you do not
        agree with them, please do not use the website.
      </p>

      <h2>2. Use of the website</h2>
      <p>
        You may use the website for lawful purposes only. You must not misuse
        it, attempt to gain unauthorised access to any part of it (including
        the administration area), introduce malicious code, scrape its
        content, or use it in a way that could damage or impair it.
      </p>

      <h2>3. Intellectual property</h2>
      <p>
        The content of this website - including text, branding, the Josh
        Vantage name and logo, page designs and images - is owned by or
        licensed to Josh Vantage Consulting Group Ltd and is protected by
        intellectual property laws. You may view and print pages for your own
        personal or internal business reference. You must not otherwise
        reproduce, republish or commercially exploit website content without
        our prior written consent.
      </p>

      <h2>4. Information on this website</h2>
      <p>
        The content of this website is provided for general information about
        our services. It is not legal, regulatory, financial, immigration or
        professional advice, and it should not be relied on as such. While we
        take care to keep content accurate and up to date, we make no warranty
        that it is complete, current or error-free, and we may change it at
        any time without notice.
      </p>

      <h2>5. Enquiries, assessments and applications</h2>
      <p>
        Submitting an assessment, an enquiry or a programme application
        through this website is not a contract and creates no obligation on
        either side. It does not guarantee that we will accept an instruction,
        that you will be admitted to the Registered Manager Leadership
        Programme, or that any particular service will be provided. Any
        engagement begins only when both parties sign a written service
        agreement, which sets out the agreed scope, fees, payment terms and
        any cancellation and refund provisions applicable to that engagement.
        Where a statutory right to cancel applies to consumers under the
        Consumer Contracts Regulations 2013, that right will be described in
        the relevant service agreement. No payments are taken through this
        website.
      </p>

      <h2>6. No guaranteed outcomes</h2>
      <p>
        Josh Vantage Consulting Group Ltd provides consultancy, training,
        preparation and business support services. We do not guarantee CQC
        registration or approval, regulatory timescales, tender awards,
        contracts, revenue, business growth, employment, interviews,
        placements, Registered Manager roles, sponsorship, visa support,
        salaries or any other regulatory, commercial or professional outcome.
        All such decisions rest with the applicable independent regulator,
        commissioner, employer, provider or other third party.
      </p>

      <h2>7. Third-party links and content</h2>
      <p>
        The website may contain links to third-party websites (including our
        social media profiles and an embedded Google Map). These are provided
        for convenience. We do not control third-party sites and accept no
        responsibility for their content, availability or privacy practices.
      </p>

      <h2>8. Limitation of liability</h2>
      <p>
        Nothing in these terms excludes or limits liability for death or
        personal injury caused by negligence, for fraud or fraudulent
        misrepresentation, or for any liability that cannot be excluded by
        law. Subject to that, we exclude all liability for loss or damage
        arising from use of, or reliance on, this website or its content,
        including loss of profit, business, contracts or anticipated savings,
        whether in contract, tort (including negligence) or otherwise.
        Liability arising under any signed service agreement is governed by
        that agreement, not by these terms.
      </p>

      <h2>9. General</h2>
      <p>
        If any provision of these terms is found invalid, the remaining
        provisions continue in effect. Failure to enforce a provision is not a
        waiver of it. These terms are governed by the law of England and
        Wales, and the courts of England and Wales have exclusive jurisdiction
        over any dispute relating to this website (except that consumers
        resident elsewhere in the UK may bring proceedings in their local
        courts where the law allows).
      </p>
    </LegalPage>
  );
}
