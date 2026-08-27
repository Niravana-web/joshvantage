"use client";

import { useCallback, useEffect, useState } from "react";

/*
 * Documentary evidence of previous tender/framework outcomes.
 *
 * The documents themselves are the proof, so they are presented as supplied:
 * no overlays, captions, ratings or graphics are drawn onto the images, and
 * nothing is recreated or restyled. The card frame is deliberately plainer
 * than the pricing cards — a document on a neutral mat, with the written
 * context underneath it rather than on top of it.
 *
 * Each document opens full width in a viewer, because the wording inside
 * (award decisions, framework terms, evaluation scoring) is the point and has
 * to stay readable.
 */
export type Evidence = {
  /* Website title — the outcome, in the client's approved wording. */
  title: string;
  subtitle: string;
  body: string;
  src: string;
  /* Describes the document for screen readers and as the viewer's label. */
  alt: string;
};

export default function EvidenceGallery({ items }: { items: Evidence[] }) {
  const [open, setOpen] = useState<Evidence | null>(null);

  const close = useCallback(() => setOpen(null), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    /* Hold the page still behind the viewer — Lenis drives window scroll, so
       locking the body is what actually stops it. */
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close]);

  return (
    <>
      <div className="grid gap-6 md:grid-cols-3">
        {items.map((e) => (
          <figure
            key={e.src}
            className="flex flex-col border border-black/10 bg-white shadow-[0_24px_50px_-40px_rgba(6,13,36,0.55)]"
          >
            <button
              type="button"
              onClick={() => setOpen(e)}
              aria-label={`View full document: ${e.title}`}
              className="group relative block h-[380px] w-full overflow-hidden bg-[#f7f7f5] md:h-[420px]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={e.src}
                alt={e.alt}
                loading="lazy"
                className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
              />
            </button>

            <figcaption className="flex flex-1 flex-col p-7">
              <p className="eyebrow-mono text-[var(--brand-navy)]">
                {e.subtitle.toUpperCase()}
              </p>
              <h3 className="mt-3 text-[19px] font-semibold leading-snug text-[#181815]">
                {e.title}
              </h3>
              <p className="mt-4 text-[14.5px] leading-relaxed text-[#4c4c47]">
                {e.body}
              </p>
              <button
                type="button"
                onClick={() => setOpen(e)}
                className="mt-6 inline-flex items-center self-start border-b border-[var(--brand-navy)]/30 pb-0.5 text-[13.5px] font-semibold text-[var(--brand-navy)] transition-colors hover:border-[var(--brand-navy)]"
              >
                View full document
                <span aria-hidden className="ml-2">
                  &#8599;
                </span>
              </button>
            </figcaption>
          </figure>
        ))}
      </div>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={open.title}
          className="fixed inset-0 z-[200] overflow-y-auto overscroll-contain bg-[rgba(6,13,36,0.94)] p-4 md:p-8"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close document"
            className="fixed right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full border border-white/25 bg-[rgba(6,13,36,0.8)] text-xl text-white transition-colors hover:bg-white hover:text-[var(--brand-navy)] md:right-8 md:top-8"
          >
            &#10005;
          </button>
          {/* Document sits at close to native width so the wording stays
              legible; the overlay scrolls rather than shrinking it to fit. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={open.src}
            alt={open.alt}
            onClick={(ev) => ev.stopPropagation()}
            className="mx-auto w-full max-w-[900px] bg-white shadow-2xl"
          />
          <p className="mx-auto mt-4 max-w-[900px] pb-4 text-center text-[12.5px] text-white/60">
            {open.title} - tap outside the document or press Esc to close
          </p>
        </div>
      )}
    </>
  );
}
