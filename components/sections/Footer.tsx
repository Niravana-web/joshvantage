/* Official account URLs to be supplied by the client — icons render as
   soon as an href is filled in; "#" entries still show but go nowhere. */
const SOCIALS: { name: string; href: string; path: string }[] = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/josh_careconsultant",
    path: "M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2Zm0 1.8c-3.1 0-3.5 0-4.8.1-1.1.1-1.5.2-1.8.3-.5.2-.8.4-1.1.7-.3.3-.5.6-.7 1.1-.1.3-.3.7-.3 1.8-.1 1.3-.1 1.7-.1 4.8s0 3.5.1 4.8c.1 1.1.2 1.5.3 1.8.2.5.4.8.7 1.1.3.3.6.5 1.1.7.3.1.7.3 1.8.3 1.3.1 1.7.1 4.8.1s3.5 0 4.8-.1c1.1-.1 1.5-.2 1.8-.3.5-.2.8-.4 1.1-.7.3-.3.5-.6.7-1.1.1-.3.3-.7.3-1.8.1-1.3.1-1.7.1-4.8s0-3.5-.1-4.8c-.1-1.1-.2-1.5-.3-1.8-.2-.5-.4-.8-.7-1.1-.3-.3-.6-.5-1.1-.7-.3-.1-.7-.3-1.8-.3-1.3-.1-1.7-.1-4.8-.1Zm0 3.1a4.9 4.9 0 1 1 0 9.8 4.9 4.9 0 0 1 0-9.8Zm0 1.8a3.1 3.1 0 1 0 0 6.2 3.1 3.1 0 0 0 0-6.2Zm5.1-2.9a1.1 1.1 0 1 1 0 2.3 1.1 1.1 0 0 1 0-2.3Z",
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/share/1EFsVySPqc/",
    path: "M13.5 21v-8.2h2.8l.4-3.2h-3.2V7.5c0-.9.3-1.6 1.6-1.6h1.7V3.1c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.3H7.3v3.2h2.8V21h3.4Z",
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@josh.vantage.cons",
    path: "M16.6 3c.3 1.6 1.3 2.9 2.8 3.6.6.3 1.2.4 1.9.5v3.2c-1.2 0-2.4-.3-3.5-.9-.4-.2-.8-.5-1.2-.8v6.6a6.2 6.2 0 1 1-6.2-6.2c.3 0 .7 0 1 .1v3.3a3 3 0 1 0 2.1 2.8V3h3.1Z",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/josh-vantage-consulting-group-000967352",
    path: "M6.5 8.8H3.3V21h3.2V8.8ZM4.9 3.5a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8ZM13 8.8H9.9V21H13v-6.4c0-1.7.8-2.7 2.2-2.7 1.3 0 2 .9 2 2.7V21h3.2v-7.1c0-3.1-1.7-4.6-4-4.6-1.8 0-2.8 1-3.4 2V8.8Z",
  },
];

/*
 * `generalCta` controls the "Looking to build or grow…/Contact us" block.
 * Funnel pages switch it off: each drives one specific assessment, and a
 * generic contact CTA competes with that. The homepage and /contact keep it.
 */
export default function Footer({ generalCta = true }: { generalCta?: boolean }) {
  return (
    <footer id="contact" className="footer-glow relative overflow-hidden bg-[#0b0b0b] px-6 pb-40 pt-24 text-white md:px-12">
      <div className="relative z-10 mx-auto grid max-w-6xl gap-14 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
        <div>
          {generalCta && (
            <p className="max-w-sm text-lg font-light leading-relaxed text-white/80">
              Looking to build or grow a UK care business, or develop your career
              in health and social care? Choose your pathway to get started.
            </p>
          )}
          <div className={`space-y-7 text-[15px] ${generalCta ? "mt-10" : ""}`}>
            {generalCta && (
              <div>
                <p className="eyebrow-mono mb-1.5 text-white/40">GENERAL ENQUIRIES</p>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-white/15 px-5 py-2.5 text-[13.5px] font-semibold transition-colors hover:bg-white/25"
                >
                  Contact us <span aria-hidden>&#8594;</span>
                </a>
              </div>
            )}
            <div>
              <p className="eyebrow-mono mb-2.5 text-white/40">CONNECT</p>
              <div className="flex gap-3">
                {SOCIALS.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Josh Vantage Consulting Group on ${s.name}`}
                    className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white/70 transition-colors hover:bg-white/20 hover:text-white"
                  >
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
                      <path d={s.path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        {[
          {
            head: "JOURNEYS",
            links: [
              { label: "JV Launch", href: "/launch" },
              { label: "JV Growth", href: "/growth" },
              { label: "JV Academy", href: "/academy" },
            ],
          },
          {
            head: "FIRM",
            links: [
              { label: "Approach", href: "#approach" },
              { label: "Services", href: "#services" },
            ],
          },
          {
            head: "LEGAL",
            links: [
              { label: "Privacy", href: "/privacy" },
              { label: "Terms", href: "/terms" },
              { label: "Disclaimer", href: "/disclaimer" },
            ],
          },
        ].map((col) => (
          <nav key={col.head}>
            <p className="eyebrow-mono mb-4 text-white/40">{col.head}</p>
            <ul className="space-y-3 text-xl">
              {col.links.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="transition-colors hover:text-white/70">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="relative z-10 mx-auto mt-20 max-w-6xl border-t border-white/10 pt-6">
        <p className="max-w-4xl text-[12px] leading-relaxed text-white/40">
          Josh Vantage Consulting Group provides consultancy, training and
          business support services. CQC registration, tender or commercial
          outcomes, employment, Registered Manager opportunities, sponsorship
          and other professional outcomes are not guaranteed and may depend on
          individual circumstances and decisions made by independent third
          parties.
        </p>
        <p className="mt-5 max-w-4xl text-[12px] leading-relaxed text-white/40">
          Josh Vantage Consulting Group Ltd | Company No. 15931129 | Registered
          in England and Wales | Registered Office: 863 High Road, Ilford,
          England, IG3 8TG
        </p>
        <p className="mt-5 text-[12px] leading-relaxed text-white/40">
          &copy; 2026 Josh Vantage Consulting Group Ltd. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
