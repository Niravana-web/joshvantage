import SectionHead from "@/components/SectionHead";
import Reveal from "@/components/Reveal";
import TestimonialVideo from "@/components/TestimonialVideo";

/*
 * Homepage client experiences — one testimonial per journey (Launch, Growth,
 * Academy). Formats are deliberately mixed: video where the client supplied
 * video, written feedback where the client supplied text. Only entries marked
 * published render, so the grid stays balanced (2-up now, 3-up once the
 * Academy video lands) with no empty placeholder card.
 *
 * Nothing here may be invented. Names, roles, quotes and media are used
 * exactly as supplied by the client — no photographs, star ratings, initials
 * or paraphrased wording beyond what has been approved.
 */
type Experience = {
  journey: "JV Launch" | "JV Growth" | "JV Academy";
  published: boolean;
  quote: string;
  /* Attribution lines, in display order. Omitted entirely where the client
     supplied anonymous feedback. */
  attribution: string[];
  video?: { src: string; poster?: string; captions?: string; label: string };
};

const EXPERIENCES: Experience[] = [
  {
    journey: "JV Launch",
    published: true,
    quote:
      "We had several trainings, several sessions. He stood there for us 100%. I would recommend Josh Vantage 100%.",
    attribution: ["Yinka Salako", "Nominated Individual, Dove Care & Support Ltd"],
    video: {
      /* Client-supplied ~33s portrait testimonial with burnt-in subtitles.
         Thumbnail is the video's own first frame; set `poster` if a designed
         cover frame is supplied later. */
      src: "/testimonials/jv-launch-yinka-salako.mp4",
      label: "Yinka Salako, Nominated Individual at Dove Care & Support Ltd, on working with Josh Vantage",
    },
  },
  {
    /* Approved redacted client email, deliberately anonymised — the client's
       name is not used, and no photograph, rating or initials are added. The
       source screenshot is not shown on the card: the written feedback is the
       testimonial. Intentionally a different format from the Launch video. */
    journey: "JV Growth",
    published: true,
    quote: "Tender application passed \u{1F483}\u{1F483}\u{1F483}\nThank you for the great work!",
    attribution: ["Tender Support Client"],
  },
  {
    /* Reserved for the Registered Manager / Academy video testimonial. Stays
       unpublished — and therefore unrendered — until the client supplies it.
       To publish: add the real quote, attribution and video, set published. */
    journey: "JV Academy",
    published: false,
    quote: "",
    attribution: [],
  },
];

const DISCLAIMER =
  "Testimonials reflect individual client experiences and do not guarantee the same or similar outcomes. CQC registration and tender decisions are made independently by the relevant regulatory or contracting authorities.";

export default function ClientExperiences() {
  const published = EXPERIENCES.filter((e) => e.published);
  if (published.length === 0) return null;

  /* Two approved testimonials sit 2-up; the third slot widens the grid to
     3-up automatically once the Academy video is published. */
  const cols = published.length >= 3 ? "lg:grid-cols-3" : "md:grid-cols-2";

  return (
    <section
      id="client-experiences"
      className="bg-white px-6 py-24 text-[#181815] md:px-12"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHead
          eyebrow="CLIENT EXPERIENCES"
          title="Real experiences. Real progress."
        />

        <Reveal stagger={0.12} className={`mt-12 grid gap-6 ${cols}`}>
          {published.map((e) => (
            <article
              key={e.journey}
              className="notch-card flex h-full flex-col overflow-hidden border border-black/5 bg-[#f7f7f5]"
            >
              {e.video && (
                <TestimonialVideo
                  src={e.video.src}
                  poster={e.video.poster}
                  captions={e.video.captions}
                  label={e.video.label}
                />
              )}

              <div
                className={`flex flex-1 flex-col p-8 md:p-9 ${
                  e.video ? "" : "justify-center"
                }`}
              >
                <p className="eyebrow-mono text-[var(--brand-navy)]">
                  {e.journey.toUpperCase()}
                </p>

                {/* Only rendered where approved wording exists — a video with
                    no supplied pull-quote stands on its own. */}
                {e.quote && (
                  <blockquote
                    className={`mt-5 whitespace-pre-line leading-relaxed text-[#33332f] ${
                      e.video
                        ? "text-[16px] md:text-[16.5px]"
                        : "text-[19px] md:text-[22px]"
                    }`}
                    style={
                      e.video
                        ? undefined
                        : { fontFamily: "var(--font-lora), Georgia, serif" }
                    }
                  >
                    <span aria-hidden className="text-[var(--brand-navy)]">
                      &ldquo;
                    </span>
                    {e.quote}
                    <span aria-hidden className="text-[var(--brand-navy)]">
                      &rdquo;
                    </span>
                  </blockquote>
                )}

                {e.attribution.length > 0 && (
                  <footer className="mt-7 border-t border-black/10 pt-5">
                    {e.attribution.map((line, i) => (
                      <p
                        key={line}
                        className={
                          i === 0
                            ? "text-[14.5px] font-semibold text-[#181815]"
                            : "mt-1 text-[13.5px] leading-relaxed text-[#6b6b64]"
                        }
                      >
                        {line}
                      </p>
                    ))}
                  </footer>
                )}
              </div>
            </article>
          ))}
        </Reveal>

        <p className="mx-auto mt-12 max-w-3xl border-t border-black/10 pt-7 text-[13px] leading-relaxed text-[#6b6b64]">
          {DISCLAIMER}
        </p>
      </div>
    </section>
  );
}
