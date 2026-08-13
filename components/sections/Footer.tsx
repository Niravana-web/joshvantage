export default function Footer() {
  return (
    <footer id="contact" className="footer-glow relative overflow-hidden bg-[#0b0b0b] px-6 pb-40 pt-24 text-white md:px-12">
      <div className="relative z-10 mx-auto grid max-w-6xl gap-14 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
        <div>
          <p className="max-w-xs text-lg font-light leading-relaxed text-white/80">
            Building, growing, or leading a care business? Start with the right
            assessment — let&apos;s talk.
          </p>
          <div className="mt-10 space-y-7 text-[15px]">
            <div>
              <p className="eyebrow-mono mb-1.5 text-white/40">EMAIL</p>
              <a href="mailto:hello@joshvantage.com" className="hover:underline">
                hello@joshvantage.com
              </a>
            </div>
            <div>
              <p className="eyebrow-mono mb-1.5 text-white/40">CONNECT</p>
              <a href="#" className="hover:underline">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
        {[
          {
            head: "JOURNEYS",
            links: [
              { label: "JV Launch", href: "/launch" },
              { label: "JV Growth", href: "/growth" },
              { label: "JV Training Academy", href: "/academy" },
            ],
          },
          {
            head: "FIRM",
            links: [
              { label: "Approach", href: "#approach" },
              { label: "Services", href: "#services" },
              { label: "Insights", href: "#results" },
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
      <p className="eyebrow-mono relative z-10 mx-auto mt-20 max-w-6xl border-t border-white/10 pt-6 text-[12px] text-white/40">
        &copy; 2026 JOSH VANTAGE CONSULTING GROUP. ALL RIGHTS RESERVED.
      </p>
    </footer>
  );
}
