"use client";

import { useEffect, useRef, useState } from "react";
import type { BookingConfig } from "@/lib/booking";

/*
 * Calendly's inline scheduler, so the visitor books without leaving the site.
 *
 * The widget is initialised through Calendly's own API rather than the
 * data-attribute form, which lets the name and email the assessment just
 * captured be passed as prefill instead of being pushed into the URL.
 *
 * This loads a third-party script that sets cookies. It only mounts after a
 * visitor has completed and submitted an assessment — never on page view — so
 * nothing third-party runs for someone merely browsing the site. The Privacy
 * Notice still needs Calendly named as a processor.
 */

const WIDGET_SCRIPT = "https://assets.calendly.com/assets/external/widget.js";

type CalendlyApi = {
  initInlineWidget: (opts: {
    url: string;
    parentElement: HTMLElement;
    prefill?: Record<string, string>;
    utm?: Record<string, string>;
  }) => void;
};

declare global {
  interface Window {
    Calendly?: CalendlyApi;
  }
}

export default function CalendlyEmbed({
  config,
  fallbackHref,
}: {
  config: BookingConfig;
  /* Same destination as a plain link, for browsers that block the script. */
  fallbackHref: string;
}) {
  const host = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  /* `config` is rebuilt each render, so its object identity cannot drive the
     effect — that would tear down and re-init the scheduler on every render.
     Serialising to primitives gives the effect deps that only change when the
     values actually do. */
  const { url } = config;
  const prefillJson = JSON.stringify(config.prefill);
  const utmJson = JSON.stringify(config.utm);

  useEffect(() => {
    let cancelled = false;

    const init = () => {
      if (cancelled || !host.current || !window.Calendly) return;
      /* Guard against a double-init leaving two schedulers stacked. */
      host.current.innerHTML = "";
      window.Calendly.initInlineWidget({
        url,
        parentElement: host.current,
        prefill: JSON.parse(prefillJson),
        utm: JSON.parse(utmJson),
      });
    };

    if (window.Calendly) {
      init();
      return () => {
        cancelled = true;
      };
    }

    /* Reuse the tag if another instance already added it. */
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${WIDGET_SCRIPT}"]`
    );
    const script = existing ?? document.createElement("script");
    const onLoad = () => init();
    const onError = () => !cancelled && setFailed(true);

    script.addEventListener("load", onLoad);
    script.addEventListener("error", onError);

    if (!existing) {
      script.src = WIDGET_SCRIPT;
      script.async = true;
      document.body.appendChild(script);
    }

    /* If the script is present but blocked or stalled, surface the link. */
    const timeout = window.setTimeout(() => {
      if (!cancelled && !window.Calendly) setFailed(true);
    }, 6000);

    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
      script.removeEventListener("load", onLoad);
      script.removeEventListener("error", onError);
    };
  }, [url, prefillJson, utmJson]);

  return (
    <div className="mt-8">
      <div
        ref={host}
        /* Calendly's inline widget needs an explicit height; its layout stacks
           on narrow screens, so mobile needs considerably more room. */
        className="h-[1050px] w-full md:h-[720px]"
      />
      <p className="mt-4 text-[12px] text-[#8a8a83]">
        {failed
          ? "The booking calendar could not load — it may be blocked by your browser. "
          : "Prefer a new tab? "}
        <a
          href={fallbackHref}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 transition-colors hover:text-[var(--brand-navy)]"
        >
          Open the booking page
        </a>
      </p>
    </div>
  );
}
