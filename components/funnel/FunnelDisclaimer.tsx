/*
 * Funnel-specific service disclaimer, rendered after the final CTA/application
 * area and before the site footer. Readable but visually secondary to the
 * sales content (small muted text on the light background).
 */
export default function FunnelDisclaimer({ text }: { text: string }) {
  return (
    <section className="bg-white px-6 pb-16 text-[#181815] md:px-12">
      <div className="mx-auto max-w-3xl border-t border-black/10 pt-8">
        <p className="eyebrow-mono text-[11px] text-[#8a8a83]">/IMPORTANT INFORMATION</p>
        <p className="mt-3 text-[13px] leading-relaxed text-[#6b6b64]">{text}</p>
      </div>
    </section>
  );
}
