import "server-only";
import { Resend } from "resend";

/**
 * Email delivery for the "Why Did I Say That?" lead magnet.
 *
 * Required environment variables (see .env.example):
 *   RESEND_API_KEY  - Resend API key (re_xxx)
 *   EMAIL_FROM      - Verified sender, e.g. 'Better Within <books@betterwithin.com>'
 *   PDF_URL         - Public URL of the PDF deliverable
 *   AUDIO_URL       - Public URL of the audio version of the PDF
 */

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const EMAIL_FROM =
  process.env.EMAIL_FROM || "Better Within <books@betterwithin.com>";
export const PDF_URL = process.env.PDF_URL || "";
export const AUDIO_URL = process.env.AUDIO_URL || "";

let client: Resend | null = null;
function getResend(): Resend | null {
  if (!RESEND_API_KEY) return null;
  if (!client) client = new Resend(RESEND_API_KEY);
  return client;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildHtml(): string {
  const pdfHref = escapeHtml(PDF_URL);
  const audioHref = escapeHtml(AUDIO_URL);
  const pdfMissing = !PDF_URL;
  const audioMissing = !AUDIO_URL;

  const linkBlock = (href: string, missing: boolean, label: string, kind: string) => `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:14px;">
      <tr>
        <td style="background:#ffffff;border:1px solid #e7dfd0;border-radius:12px;padding:20px 22px;">
          <p style="margin:0 0 4px;color:#9a8f78;font-size:12px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;">${escapeHtml(kind)}</p>
          <p style="margin:0 0 14px;color:#1a1410;font-size:17px;font-weight:600;font-family:Georgia,'Times New Roman',serif;">${escapeHtml(label)}</p>
          ${
            missing
              ? `<p style="margin:0;color:#9a8f78;font-size:14px;">The link will be added here shortly — your copy is reserved.</p>`
              : `<a href="${href}" style="display:inline-block;background:#c9a24a;color:#1a1410;text-decoration:none;font-weight:600;font-size:15px;padding:12px 22px;border-radius:8px;">Open ${escapeHtml(kind)}</a>`
          }
        </td>
      </tr>
    </table>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Your field guide: Why Did I Say That?</title>
</head>
<body style="margin:0;padding:0;background:#f4efe4;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1a1410;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4efe4;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e7dfd0;">
          <!-- header band -->
          <tr>
            <td style="background:#0e1422;padding:30px 36px;text-align:center;">
              <p style="margin:0 0 6px;color:#c9a24a;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;">A Science-Based Field Guide</p>
              <h1 style="margin:0;color:#ffffff;font-family:Georgia,'Times New Roman',serif;font-size:30px;font-weight:700;line-height:1.15;">Why Did I Say That?</h1>
            </td>
          </tr>
          <!-- body -->
          <tr>
            <td style="padding:32px 36px 8px 36px;">
              <p style="margin:0 0 16px;color:#3a3328;font-size:16px;line-height:1.6;">Your free field guide is here. Read it tonight (under an hour), then start the 14-day plan tomorrow morning.</p>
              <p style="margin:0 0 24px;color:#6b6253;font-size:15px;line-height:1.6;">Below are both versions — the PDF to read, and the audio to listen to on your commute or a walk.</p>

              ${linkBlock(pdfHref, pdfMissing, "The 24-page field guide (PDF)", "PDF")}
              ${linkBlock(audioHref, audioMissing, "The audio edition", "Audio")}

              <h2 style="margin:26px 0 10px;color:#1a1410;font-family:Georgia,'Times New Roman',serif;font-size:19px;">Try this tonight (60 seconds)</h2>
              <p style="margin:0 0 14px;color:#6b6253;font-size:15px;line-height:1.6;">Next time a replay starts, don't fight it. Just label it, silently and precisely:</p>
              <p style="margin:0 0 14px;padding:14px 16px;background:#f7f2e9;border-left:3px solid #c9a24a;color:#3a3328;font-size:15px;line-height:1.55;font-style:italic;">"This is post-event processing. This is the smoke detector, not a fire."</p>
              <p style="margin:0 0 24px;color:#6b6253;font-size:15px;line-height:1.6;">Naming the process creates a small gap between you and the thought — and that gap is where every tool in the book lives.</p>
            </td>
          </tr>
          <!-- footer -->
          <tr>
            <td style="padding:22px 36px 30px 36px;border-top:1px solid #f0e8d6;">
              <p style="margin:0 0 6px;color:#9a8f78;font-size:12px;line-height:1.5;">This book is for education only. It is not therapy, medical advice, or a diagnosis. If distress is severe or persistent, please talk to a qualified professional.</p>
              <p style="margin:0;color:#9a8f78;font-size:12px;">© Better Within. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function buildText(): string {
  const lines: string[] = [
    "Why Did I Say That? — your field guide",
    "",
    "Your free field guide is here. Read it tonight (under an hour), then start the 14-day plan tomorrow morning.",
    "",
  ];
  if (PDF_URL) lines.push("PDF: " + PDF_URL);
  else lines.push("PDF: (link coming soon)");
  if (AUDIO_URL) lines.push("Audio: " + AUDIO_URL);
  else lines.push("Audio: (link coming soon)");
  lines.push(
    "",
    "Try this tonight (60 seconds): next time a replay starts, silently label it:",
    '"This is post-event processing. This is the smoke detector, not a fire."',
    "",
    "This book is for education only. It is not therapy, medical advice, or a diagnosis.",
    "© Better Within. All rights reserved."
  );
  return lines.join("\n");
}

export type SendResult = { sent: boolean; reason?: string };

/**
 * Sends the deliverable email to a new subscriber.
 * Never throws — returns a result so the caller can keep the lead save robust.
 */
export async function sendBookEmail(toEmail: string): Promise<SendResult> {
  const resend = getResend();
  if (!resend) {
    const reason = !RESEND_API_KEY
      ? "RESEND_API_KEY not set"
      : "Resend client unavailable";
    console.warn(`[email] Skipped send to ${toEmail}: ${reason}`);
    return { sent: false, reason };
  }

  try {
    const { error } = await resend.emails.send({
      from: EMAIL_FROM,
      to: toEmail,
      subject: "Why Did I Say That? — your PDF + audio field guide",
      html: buildHtml(),
      text: buildText(),
    });
    if (error) {
      console.error(`[email] Resend error for ${toEmail}:`, error);
      return { sent: false, reason: String(error) };
    }
    return { sent: true };
  } catch (err) {
    console.error(`[email] Send threw for ${toEmail}:`, err);
    return { sent: false, reason: err instanceof Error ? err.message : "unknown" };
  }
}
