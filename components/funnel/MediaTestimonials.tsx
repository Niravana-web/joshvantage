import SectionHead from "@/components/SectionHead";
import Reveal from "@/components/Reveal";

/*
 * Photo/video testimonials for funnel pages. Items stay empty until the
 * client supplies genuine media; the section renders nothing while empty —
 * no fabricated or placeholder testimonials.
 */
export type MediaTestimonial = {
  type: "photo" | "video";
  src: string;
  poster?: string;
  name?: string;
  caption?: string;
};

export default function MediaTestimonials({
  items,
  eyebrow = "TESTIMONIALS",
  title = "Hear from our clients",
}: {
  items: MediaTestimonial[];
  eyebrow?: string;
  title?: string;
}) {
  if (items.length === 0) return null;

  return (
    <section className="bg-white px-6 py-24 text-[#181815] md:px-12">
      <div className="mx-auto max-w-6xl">
        <SectionHead eyebrow={eyebrow} title={title} />
        <Reveal stagger={0.1} className="mt-12 grid gap-8 md:grid-cols-3">
          {items.slice(0, 3).map((t) => (
            <figure key={t.src}>
              <div className="notch-card overflow-hidden border border-black/5 bg-[#f7f7f5]">
                {t.type === "video" ? (
                  <video
                    controls
                    preload="metadata"
                    poster={t.poster}
                    src={t.src}
                    className="aspect-[4/5] w-full object-cover"
                  />
                ) : (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={t.src} alt={t.name ?? "Client testimonial"} className="aspect-[4/5] w-full object-cover" />
                )}
              </div>
              {(t.name || t.caption) && (
                <figcaption className="mt-4">
                  {t.name && <p className="eyebrow-mono text-[#8a8a83]">{t.name.toUpperCase()}</p>}
                  {t.caption && (
                    <p className="mt-1.5 text-[14px] leading-relaxed text-[#4c4c47]">{t.caption}</p>
                  )}
                </figcaption>
              )}
            </figure>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
