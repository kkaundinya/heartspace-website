import { Resend } from "resend";

let _resend: Resend | null = null;
function getResend() {
  if (!_resend) {
    const key = process.env.RESEND_API_KEY;
    if (!key) throw new Error("RESEND_API_KEY environment variable is not set");
    _resend = new Resend(key);
  }
  return _resend;
}

interface WorkshopData {
  name: string;
  date_1: string;
  date_2: string;
  session_time: string;
  zoom_link: string | null;
}

interface SendConfirmationParams {
  to: string;
  name: string;
  workshop: WorkshopData;
}

export async function sendConfirmationEmail({
  to,
  name,
  workshop,
}: SendConfirmationParams) {
  const date1 = new Date(workshop.date_1).toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
  const date2 = new Date(workshop.date_2).toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

  const firstName = name.split(" ")[0];

  await getResend().emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to,
    subject: `You're registered — ${workshop.name}`,
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body style="margin:0;padding:0;background:#F4F1FF;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <div style="max-width:600px;margin:40px auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(124,92,191,0.1);">

    <!-- Header -->
    <div style="background:linear-gradient(135deg,#7C5CBF,#5E3FA3);padding:40px 32px;text-align:center;">
      <div style="font-size:32px;margin-bottom:8px;">❤️</div>
      <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:800;letter-spacing:-0.02em;">
        You're registered!
      </h1>
      <p style="margin:8px 0 0;color:rgba(255,255,255,0.85);font-size:15px;">
        ${workshop.name}
      </p>
    </div>

    <!-- Body -->
    <div style="padding:32px;">
      <p style="color:#1A1A2E;font-size:16px;line-height:1.6;margin:0 0 24px;">
        Hi ${firstName},
      </p>
      <p style="color:#1A1A2E;font-size:16px;line-height:1.6;margin:0 0 24px;">
        Your spot is confirmed. Here are your session details:
      </p>

      <!-- Session Details Card -->
      <div style="background:#F4F1FF;border-radius:12px;padding:24px;margin:0 0 24px;">
        <h3 style="margin:0 0 16px;color:#5E3FA3;font-size:16px;font-weight:700;">
          Session Details
        </h3>
        <table style="width:100%;border-collapse:collapse;">
          <tr>
            <td style="padding:6px 0;color:#6B6B8A;font-size:14px;width:28px;">📅</td>
            <td style="padding:6px 0;color:#1A1A2E;font-size:14px;">
              <strong>Session 1:</strong> ${date1}
            </td>
          </tr>
          <tr>
            <td style="padding:6px 0;color:#6B6B8A;font-size:14px;">📅</td>
            <td style="padding:6px 0;color:#1A1A2E;font-size:14px;">
              <strong>Session 2:</strong> ${date2}
            </td>
          </tr>
          <tr>
            <td style="padding:6px 0;color:#6B6B8A;font-size:14px;">⏱️</td>
            <td style="padding:6px 0;color:#1A1A2E;font-size:14px;">
              <strong>Time:</strong> ${workshop.session_time} both days
            </td>
          </tr>
          <tr>
            <td style="padding:6px 0;color:#6B6B8A;font-size:14px;">💻</td>
            <td style="padding:6px 0;color:#1A1A2E;font-size:14px;">
              <strong>Platform:</strong> Zoom (live, small group)
            </td>
          </tr>
        </table>
      </div>

      ${workshop.zoom_link
        ? `
      <!-- Zoom Link Card -->
      <div style="background:#E8F8F2;border-radius:12px;padding:24px;margin:0 0 24px;">
        <h3 style="margin:0 0 12px;color:#1a5c3a;font-size:16px;font-weight:700;">Your Zoom Link</h3>
        <a href="${workshop.zoom_link}" style="color:#7C5CBF;word-break:break-all;">${workshop.zoom_link}</a>
        <p style="margin:8px 0 0;color:#6B6B8A;font-size:13px;">Use the same link for both sessions.</p>
      </div>
      `
        : `
      <!-- Zoom Coming Soon -->
      <div style="background:#FFF0E8;border-radius:12px;padding:24px;margin:0 0 24px;border-left:4px solid #FF7F5C;">
        <p style="margin:0;color:#1A1A2E;font-size:14px;line-height:1.6;">
          📧 Your Zoom link will be emailed to you <strong>24 hours before Session 1</strong>. Keep an eye on your inbox!
        </p>
      </div>
      `
      }

      <!-- What to Expect -->
      <h3 style="color:#1A1A2E;font-size:16px;font-weight:700;margin:0 0 16px;">What to expect</h3>
      <ul style="color:#1A1A2E;font-size:14px;line-height:1.8;margin:0 0 24px;padding-left:20px;">
        <li>You'll receive the <strong>RELATE Workbook</strong> 48 hours before Session 1</li>
        <li>Both sessions are <strong>60 minutes each</strong>, live on Zoom</li>
        <li>Small group — real conversation, not a webinar</li>
        <li>The <strong>RELATE Manual</strong> and <strong>full recording</strong> will be sent after Session 2</li>
      </ul>

      <p style="color:#6B6B8A;font-size:14px;line-height:1.6;margin:0;">
        Have any questions? Just reply to this email. We read every message.
      </p>
    </div>

    <!-- Footer -->
    <div style="background:#F4F1FF;padding:24px 32px;text-align:center;border-top:1px solid rgba(124,92,191,0.1);">
      <p style="margin:0;color:#6B6B8A;font-size:12px;">
        Heart Space · Buntikki Technologies Private Limited<br>
        You're receiving this because you registered for a Heart Space workshop.
      </p>
    </div>

  </div>
</body>
</html>
    `,
  });
}
