import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/sections/Footer";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "Contact | Josh Vantage Consulting Group",
  description:
    "Get in touch with Josh Vantage Consulting Group about launching, growing or leading a UK care business.",
};

export default function ContactPage() {
  return (
    <SmoothScroll>
      <main>
        <section className="relative overflow-hidden">
          <div className="silk">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/hero-silk.webp" alt="" aria-hidden className="silk-img" />
            <div className="silk-blob b1" />
            <div className="silk-blob b2" />
          </div>
          <header className="relative z-10 flex items-center justify-between px-6 py-5 md:px-10">
            <a href="/">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.png"
                alt="Josh Vantage Consulting Group"
                className="h-16 w-auto md:h-[4.5rem]"
              />
            </a>
          </header>
          <div className="relative z-10 mx-auto w-full max-w-3xl px-6 pb-20 pt-10 md:pt-16">
            <p className="eyebrow-mono text-[var(--brand-pale)]">/CONTACT</p>
            <h1
              className="mt-5 text-4xl font-semibold leading-tight text-white md:text-5xl"
              style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
            >
              Let&apos;s talk about your care journey
            </h1>
            <p className="mt-5 max-w-xl text-lg font-light leading-relaxed text-white/85">
              Tell us a little about your enquiry and a member of the team will
              come back to you.
            </p>
          </div>
        </section>

        <section className="bg-white px-6 py-20 text-[#181815] md:px-12">
          <div className="mx-auto max-w-3xl">
            <ContactForm />
          </div>
        </section>

        <Footer />
      </main>
    </SmoothScroll>
  );
}
