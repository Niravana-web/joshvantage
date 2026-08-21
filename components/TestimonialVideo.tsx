"use client";

import { useState } from "react";

/*
 * Click-to-play testimonial video. Nothing plays until the visitor presses
 * play, so the page never autoplays audio; playback only starts from that
 * user gesture.
 *
 * Client testimonials are phone-shot portrait video, so the panel is a fixed
 * height with the video contained (never cropped) on the brand navy surface —
 * burnt-in subtitles stay fully visible, and a landscape file supplied later
 * still sits correctly in the same frame.
 *
 * The thumbnail is the video's own first frame (preload="metadata"), so it is
 * genuine footage rather than a stand-in image; pass `poster` once a designed
 * cover frame is available and it takes precedence.
 */
export default function TestimonialVideo({
  src,
  poster,
  captions,
  label,
  fill = false,
}: {
  src: string;
  poster?: string;
  /* Optional .vtt track — only needed if subtitles are not burnt into the file. */
  captions?: string;
  /* Accessible description of whose testimonial this is. */
  label: string;
  /* Grow to fill the card instead of holding the fixed panel height. Set on
     a card that carries no quote or attribution, so it matches the height of
     its neighbours without leaving an empty strip under the video. */
  fill?: boolean;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <div
      className={`relative w-full overflow-hidden bg-[linear-gradient(160deg,#0b153f_0%,#13226a_45%,#060d24_100%)] ${
        fill
          ? "min-h-[420px] flex-1 md:min-h-[480px]"
          : "h-[420px] md:h-[480px]"
      }`}
    >
      {playing ? (
        <video
          src={src}
          poster={poster}
          controls
          autoPlay
          playsInline
          preload="metadata"
          aria-label={label}
          className="h-full w-full object-contain"
        >
          {captions && (
            <track kind="captions" src={captions} srcLang="en" label="English" default />
          )}
        </video>
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play video: ${label}`}
          className="group absolute inset-0 grid w-full place-items-center"
        >
          {poster ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={poster}
              alt=""
              className="absolute inset-0 h-full w-full object-contain transition-transform duration-700 group-hover:scale-[1.02]"
            />
          ) : (
            /* First frame only — #t=0.1 makes browsers paint a frame rather
               than an empty element. Muted and non-interactive: it is a still. */
            <video
              src={`${src}#t=0.1`}
              muted
              playsInline
              preload="metadata"
              tabIndex={-1}
              aria-hidden
              className="absolute inset-0 h-full w-full object-contain transition-transform duration-700 group-hover:scale-[1.02]"
            />
          )}
          <span
            aria-hidden
            className="absolute inset-0 bg-[rgba(6,13,36,0.35)] transition-colors group-hover:bg-[rgba(6,13,36,0.2)]"
          />
          <span
            aria-hidden
            className="relative grid h-[70px] w-[70px] place-items-center rounded-full bg-[var(--brand-pale)] text-[var(--brand-navy)] shadow-[0_18px_40px_-14px_rgba(0,0,0,0.7)] transition-transform duration-300 group-hover:scale-110"
          >
            {/* play triangle, nudged right so it reads as centred */}
            <svg width="22" height="24" viewBox="0 0 22 24" fill="currentColor" className="ml-[3px]">
              <path d="M0 0v24l22-12z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
