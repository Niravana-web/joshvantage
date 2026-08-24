import SectionHead from "@/components/SectionHead";
import Reveal from "@/components/Reveal";
import TestimonialVideo from "@/components/TestimonialVideo";

/*
 * Photo/video testimonials for funnel pages, laid out as up to three equal
 * cards — left, centre, right on desktop, stacked full-width on mobile so
 * nothing is compressed into an unreadable column.
 *
 * Positions are held in the page's array in display order and reserved by
 * setting `published: false`: the slot keeps its place in the source and its
 * media path stays written down, but nothing renders until the genuine asset
 * arrives. Only published entries render, and the grid narrows to match how
 * many there are, so a half-filled section never shows an empty column.
 *
 * Every card is the same shape whichever format it carries: a media panel on
 * the brand navy surface, then the quote and attribution below it. The panel
 * has a fixed floor so a short card never collapses, and takes whatever
 * height is left over once the text has been laid out. Cards in a row are
 * equal height, and the difference between a two-line quote and a
 * six-paragraph one goes into the media rather than into an empty strip
 * above the attribution — which is what keeps video | written | video and
 * video | written | written equally weighted.
 *
 * Nothing here may be invented. Names, roles, quotes and media are used
 * exactly as supplied by the client — no fabricated or placeholder
 * testimonials, no star ratings, no paraphrasing of approved wording.
 */
export type MediaTestimonial = {
  /* Stable key, so a reserved slot keeps its identity before it has media. */
  id: string;
  /* False while the asset is still awaited — the slot is held, not shown. */
  published: boolean;
  media?:
    | {
        kind: "video";
        src: string;
        /* Designed cover frame; without one the video's own first frame is
           the thumbnail. Either way the play button sits on top and nothing
           plays until the visitor presses it. */
        poster?: string;
        /* Optional .vtt track — only needed if subtitles are not burnt in. */
        captions?: string;
        /* Accessible description of whose testimonial this is. */
        label: string;
      }
    | { kind: "photo"; src: string; alt: string };
  /* Approved wording, used verbatim. Blank lines separate paragraphs. */
  quote?: string;
  name?: string;
  role?: string;
  company?: string;
};

export default function MediaTestimonials({
  items,
  eyebrow = "TESTIMONIALS",
  title = "Hear from our clients",
  disclaimer,
}: {
  items: MediaTestimonial[];
  eyebrow?: string;
  title?: string;
  /* Testimonial/results disclaimer, rendered immediately under the cards. */
  disclaimer?: string;
}) {
  const published = items.filter((t) => t.published).slice(0, 3);
  if (published.length === 0) return null;

  /* The grid tracks how many testimonials are actually live: three sit 3-up,
     two sit 2-up, and a lone card centres at readable width rather than
     stranding two empty columns beside it. */
  const layout =
    published.length >= 3
      ? "md:grid-cols-3"
      : published.length === 2
        ? "md:grid-cols-2"
        : "mx-auto max-w-md";

  return (
    <section className="bg-white px-6 py-24 text-[#181815] md:px-12">
      <div className="mx-auto max-w-6xl">
        <SectionHead eyebrow={eyebrow} title={title} />

        <Reveal stagger={0.1} className={`mt-12 grid gap-6 ${layout}`}>
          {published.map((t) => {
            const hasText = Boolean(t.quote || t.name || t.role || t.company);
            return (
              <article
                key={t.id}
                className="notch-card flex h-full flex-col overflow-hidden border border-black/5 bg-[#f7f7f5]"
              >
                {t.media?.kind === "video" && (
                  <TestimonialVideo
                    src={t.media.src}
                    poster={t.media.poster}
                    captions={t.media.captions}
                    label={t.media.label}
                    fill
                  />
                )}

                {t.media?.kind === "photo" && (
                  /* Same panel floor as the video cards. The photograph
                     fills it rather than sitting letterboxed, so a portrait
                     next to a phone-shot video still reads as one row. */
                  <div className="w-full min-h-[420px] flex-1 overflow-hidden bg-[linear-gradient(160deg,#0b153f_0%,#13226a_45%,#060d24_100%)] md:min-h-[480px]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={t.media.src}
                      alt={t.media.alt}
                      loading="lazy"
                      className="h-full w-full object-cover object-top"
                    />
                  </div>
                )}

                {hasText && (
                  <div className="flex flex-col p-8 md:p-9">
                    {t.quote && (
                      <blockquote className="whitespace-pre-line text-[15.5px] leading-relaxed text-[#33332f] md:text-[16px]">
                        <span aria-hidden className="text-[var(--brand-navy)]">
                          &ldquo;
                        </span>
                        {t.quote}
                        <span aria-hidden className="text-[var(--brand-navy)]">
                          &rdquo;
                        </span>
                      </blockquote>
                    )}

                    {(t.name || t.role || t.company) && (
                      <footer className="mt-7">
                        <div className="border-t border-black/10 pt-5">
                          {t.name && (
                            <p className="text-[14.5px] font-semibold text-[#181815]">
                              {t.name}
                            </p>
                          )}
                          {t.role && (
                            <p className="mt-1 text-[13.5px] leading-relaxed text-[#6b6b64]">
                              {t.role}
                            </p>
                          )}
                          {t.company && (
                            <p className="mt-0.5 text-[13.5px] font-medium leading-relaxed text-[#4c4c47]">
                              {t.company}
                            </p>
                          )}
                        </div>
                      </footer>
                    )}
                  </div>
                )}
              </article>
            );
          })}
        </Reveal>

        {disclaimer && (
          <p className="mx-auto mt-12 max-w-3xl border-t border-black/10 pt-7 text-[13px] leading-relaxed text-[#6b6b64]">
            {disclaimer}
          </p>
        )}
      </div>
    </section>
  );
}
