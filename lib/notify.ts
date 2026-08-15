/*
 * Email notifications for form submissions, sent via the Resend API.
 * The verified sending domain is niravana.in (per account setup), so every
 * from-address lives there; the Josh Vantage funnel addresses receive the
 * notifications and appear as reply-to on customer acknowledgements.
 */

const DOMAIN = "joshvantageconsultinggroup.co.uk";
const FROM = "Josh Vantage Consulting Group <notifications@niravana.in>";

const FUNNEL_INBOX: Record<string, string> = {
  launch: `launch@${DOMAIN}`,
  growth: `growth@${DOMAIN}`,
  academy: `academy@${DOMAIN}`,
};
const INFO = `info@${DOMAIN}`;

const FUNNEL_LABEL: Record<string, string> = {
  launch: "JV Launch",
  growth: "JV Growth",
  academy: "JV Academy",
};

function displayName(a: Record<string, string>): string {
  return (
    a.name?.trim() ||
    [a.firstName, a.lastName].filter(Boolean).join(" ").trim() ||
    "Unknown"
  );
}

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function answersTable(a: Record<string, string>): string {
  const rows = Object.entries(a)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px 6px 0;color:#8a8a83;vertical-align:top;white-space:nowrap">${esc(k)}</td><td style="padding:6px 0">${esc(v)}</td></tr>`
    )
    .join("");
  return `<table style="font-family:sans-serif;font-size:14px;color:#181815;border-collapse:collapse">${rows}</table>`;
}

async function send(payload: Record<string, unknown>): Promise<void> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return; // notifications disabled when unconfigured
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    console.error("resend send failed", res.status, await res.text());
  }
}

/* Internal notification to the relevant Josh Vantage inbox. */
export async function notifyTeam(
  funnel: string,
  answers: Record<string, string>
): Promise<void> {
  const name = displayName(answers);
  let to: string;
  let subject: string;

  if (funnel === "contact") {
    const nature = answers.nature ?? "Other";
    const funnelKey = { "JV Launch": "launch", "JV Growth": "growth", "JV Academy": "academy" }[nature];
    to = funnelKey ? FUNNEL_INBOX[funnelKey] : INFO;
    subject = funnelKey
      ? `New ${nature} Enquiry – ${name}`
      : `New Enquiry (${nature}) – ${name}`;
  } else {
    to = FUNNEL_INBOX[funnel] ?? INFO;
    const kind =
      funnel === "academy"
        ? "Application"
        : funnel === "growth"
          ? "Tender Assessment"
          : "Assessment";
    subject = `New ${FUNNEL_LABEL[funnel] ?? funnel} ${kind} – ${name}`;
  }

  await send({
    from: FROM,
    to: [to],
    reply_to: answers.email ? [answers.email] : undefined,
    subject,
    html: `<p style="font-family:sans-serif;font-size:14px">${esc(subject)}</p>${answersTable(answers)}`,
  });
}

/* Funnel-branded acknowledgement to the customer. */
export async function notifyCustomer(
  funnel: string,
  answers: Record<string, string>
): Promise<void> {
  if (!answers.email) return;
  const name = displayName(answers);
  const label = FUNNEL_LABEL[funnel];

  const { subject, body, replyTo } =
    funnel === "contact"
      ? {
          subject: "We have received your enquiry — Josh Vantage Consulting Group",
          body: "Thank you for contacting Josh Vantage Consulting Group. A member of the team will review your enquiry and come back to you.",
          replyTo: INFO,
        }
      : funnel === "academy"
        ? {
            subject: "Your Registered Manager Leadership Programme application — JV Academy",
            body: "Thank you for applying for the Registered Manager Leadership Programme. We will review your application and contact you about the next step. Submitting an application does not guarantee admission to the programme or any employment, Registered Manager, CQC, sponsorship or other professional outcome.",
            replyTo: FUNNEL_INBOX.academy,
          }
        : funnel === "growth"
          ? {
              subject: "Your Tender Assessment — JV Growth",
              body: "Thank you for completing the JV Growth Tender Assessment. We will review the opportunity, scope, deadline and available evidence before confirming whether we can support the submission, and will be in touch shortly.",
              replyTo: FUNNEL_INBOX.growth,
            }
          : {
              subject: "Your CQC Readiness Assessment — JV Launch",
              body: "Thank you for completing the JV Launch CQC Readiness Assessment. We will review your current position and come back to you about the next step. Completing the assessment does not guarantee acceptance as a client or any CQC outcome.",
              replyTo: FUNNEL_INBOX.launch,
            };

  await send({
    from: label
      ? `${label} — Josh Vantage Consulting Group <notifications@niravana.in>`
      : FROM,
    to: [answers.email],
    reply_to: [replyTo],
    subject,
    html: `<div style="font-family:sans-serif;font-size:14px;color:#181815;line-height:1.7"><p>Dear ${esc(name)},</p><p>${esc(body)}</p><p>Kind regards,<br/>Josh Vantage Consulting Group<br/>863 High Road, Ilford IG3 8TG</p></div>`,
  });
}
