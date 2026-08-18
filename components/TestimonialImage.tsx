"use client";

import { useCallback, useEffect, useState } from "react";

/*
 * Source evidence behind a written testimonial — the client's own redacted
 * message, shown in the same media slot the video cards use so the three
 * cards balance without forcing the formats to match.
 *
 * The written quote on the card is the testimonial and stays readable on its
 * own; this is corroboration, and opening it is optional. Nothing is drawn on
 * top of the image.
 */
export default function TestimonialImage({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    /* Lenis drives window scroll, so locking the body is what holds the page
       still behind the viewer. */
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`View larger: ${alt}`}
        className="group relative block h-[420px] w-full overflow-hidden bg-[linear-gradient(160deg,#0b153f_0%,#13226a_45%,#060d24_100%)] p-5 md:h-[480px]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-[1.02]"
        />
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          onClick={close}
          className="fixed inset-0 z-[200] overflow-y-auto overscroll-contain bg-[rgba(6,13,36,0.94)] p-4 md:p-8"
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="fixed right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full border border-white/25 bg-[rgba(6,13,36,0.8)] text-xl text-white transition-colors hover:bg-white hover:text-[var(--brand-navy)] md:right-8 md:top-8"
          >
            &#10005;
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            onClick={(ev) => ev.stopPropagation()}
            className="mx-auto w-full max-w-[560px] shadow-2xl"
          />
          <p className="mx-auto mt-4 max-w-[560px] pb-4 text-center text-[12.5px] text-white/60">
            Tap outside the image or press Esc to close
          </p>
        </div>
      )}
    </>
  );
}
