"use client";

import { useEffect, useRef, useState } from "react";
import { track } from "@/lib/analytics";

/*
 * Calendly's inline scheduler, so the visitor books without leaving the site.
 *
 * `url` carries the prefill and UTM parameters already. That is deliberate:
 * the current Calendly widget.js accepts `initInlineWidget`'s `prefill` option
 * and silently discards it — only `utm` survives — so passing the details as
 * query parameters is what actually reaches the booking page. It also means
 * the embed and the fallback link below it point at exactly the same place.
 *
 * This loads a third-party script that sets cookies. It only mounts after a
 * visitor has completed and submitted an assessment — never on page view — so
 * nothing third-party runs for someone merely browsing the site. The Privacy
 * Notice still needs Calendly named as a processor.
 */

const WIDGET_SCRIPT = "https://assets.calendly.com/assets/external/widget.js";

type CalendlyApi = {
  initInlineWidget: (opts: { url: string; parentElement: HTMLElement }) => void;
};

declare global {
  interface Window {
    Calendly?: CalendlyApi;
  }
}

export default function CalendlyEmbed({
  url,
  funnel,
}: {
  url: string;
  /* Reported with the booking events so each funnel is measurable. */
  funnel?: string;
}) {
  const host = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  /* The visitor reached the scheduler, and separately, completed a booking.
     Calendly announces the latter by posting a message to the parent window —
     it is the only signal available from inside the iframe. */
  useEffect(() => {
    track("calendly_reached", { funnel });
    const onMessage = (e: MessageEvent) => {
      if (typeof e.origin === "string" && !e.origin.includes("calendly.com")) return;
      const data = e.data as { event?: string } | null;
      if (data?.event === "calendly.event_scheduled") {
        track("booked_call", { funnel });
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [funnel]);

  useEffect(() => {
    let cancelled = false;

    const init = () => {
      if (cancelled || !host.current || !window.Calendly) return;
      /* Guard against a double-init leaving two schedulers stacked. */
      host.current.innerHTML = "";
      window.Calendly.initInlineWidget({ url, parentElement: host.current });
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
  }, [url]);

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
          ? "The booking calendar could not load - it may be blocked by your browser. "
          : "Prefer a new tab? "}
        <a
          href={url}
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
