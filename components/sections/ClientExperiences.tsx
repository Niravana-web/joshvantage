import SectionHead from "@/components/SectionHead";
import Reveal from "@/components/Reveal";
import TestimonialVideo from "@/components/TestimonialVideo";
import TestimonialImage from "@/components/TestimonialImage";

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
  /* Source evidence behind a written testimonial, shown in the media slot. */
  image?: { src: string; alt: string };
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
       name is not used and nothing is added to the image. The written quote
       is the testimonial and reads on its own; the screenshot sits in the
       media slot as corroboration and to balance the two video cards. */
    journey: "JV Growth",
    published: true,
    quote: "Tender application passed \u{1F483}\u{1F483}\u{1F483}\nThank you for the great work!",
    attribution: ["Tender Support Client"],
    image: {
      src: "/tender-passed.jpg",
      alt: "Redacted client email confirming the tender application passed",
    },
  },
  {
    /* Registered Manager testimonial, transcribed from the video's burnt-in
       subtitles and corrected by the client ("leading team as a Registered
       Manager"). Otherwise left as spoken rather than tidied into marketing
       prose. The ellipsis marks a genuine gap between the two supplied frames
       rather than an edit; replace it with the full line if the complete
       transcript is supplied. Name and role are as supplied by the client,
       shown in the same hierarchy as the JV Launch card. */
    journey: "JV Academy",
    published: true,
    quote:
      "So it was a life changing. I went from being unsure about my future of securing the … 35k salary and leading team as a Registered Manager.",
    attribution: ["Mohammed Waza", "Registered Manager, Serenity Homecare Solutions Ltd"],
    video: {
      src: "/testimonials/jv-academy-client.mp4",
      label:
        "Mohammed Waza, Registered Manager at Serenity Homecare Solutions Ltd, on progressing into a Registered Manager role with JV Academy",
    },
  },
];

/*
 * Shared across all three journeys. The first two sentences are the client's
 * approved testimonial disclaimer. The third was added when the Academy
 * testimonial went live, because that story is about reaching a Registered
 * Manager role and the original wording covered CQC registration and tender
 * decisions only. It is the client's own approved sentence, taken verbatim
 * from the disclaimer on /academy, with the subject named so it stands alone.
 */
const DISCLAIMER =
  "Testimonials reflect individual client experiences and do not guarantee the same or similar outcomes. CQC registration and tender decisions are made independently by the relevant regulatory or contracting authorities. Participation in the Registered Manager Leadership Programme does not guarantee employment, interviews, placement, a Registered Manager role, CQC registration, sponsorship, visa support or a specific salary.";

export default function ClientExperiences() {
  const published = EXPERIENCES.filter((e) => e.published);
  if (published.length === 0) return null;

  /* Two approved testimonials sit 2-up; the third slot widens the grid to
     3-up automatically once the Academy video is published. */
  const cols =
    published.length >= 3 ? "md:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-2";

  return (
    <section
      id="client-experiences"
      className="bg-white px-6 pb-16 pt-24 text-[#181815] md:px-12"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHead
          eyebrow="CLIENT EXPERIENCES"
          title="Real experiences. Real progress."
        />

        <Reveal stagger={0.12} className={`mt-12 grid gap-6 ${cols}`}>
          {published.map((e) => {
            /* A card with media sits its text below it; a text-only card
               centres in the space the media would have taken. */
            const hasMedia = Boolean(e.video || e.image);
            return (
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
              {e.image && <TestimonialImage src={e.image.src} alt={e.image.alt} />}

              <div
                className={`flex flex-1 flex-col p-8 md:p-9 ${
                  hasMedia ? "" : "justify-center"
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
                      hasMedia
                        ? "text-[16px] md:text-[16.5px]"
                        : "text-[19px] md:text-[22px]"
                    }`}
                    style={
                      hasMedia
                        ? undefined
                        : { fontFamily: "var(--font-lora), Georgia, serif" }
                    }
                  >
                    <span aria-hidden className="text-[var(--brand-navy)]">
                      &quot;
                    </span>
                    {e.quote}
                    <span aria-hidden className="text-[var(--brand-navy)]">
                      &quot;
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
            );
          })}
        </Reveal>

        <p className="mx-auto mt-12 max-w-3xl border-t border-black/10 pt-7 text-[13px] leading-relaxed text-[#6b6b64]">
          {DISCLAIMER}
        </p>

      </div>
    </section>
  );
}
