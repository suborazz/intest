import { getBaseTemplate } from "@/x/0c6e1403";
import { config } from "@/x/a948e663";

export function getSupportTicketReceivedEmailTemplate(
  ticketNo: string,
  title: string,
  description: string,
  name?: string,
): string {
  const baseUrl = config.clientUrl || "https://www.iiinternship.in";
  const dashboardUrl = `${baseUrl}/student/dashboard`;
  const userName = name && name.trim() ? name.trim() : "Member";

  return getBaseTemplate(
    `Support Request Logged [${ticketNo}] — International Institute of Internship™`,
    `
      <!-- Top Icon / Badge -->
      <div style="text-align: center; margin: 0 0 16px 0;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto;">
          <tr>
            <td align="center" style="width: 44px; height: 44px; border-radius: 50%; background-color: #ecfdf5; border: 1px solid #d1fae5; text-align: center; vertical-align: middle;">
              <span style="font-size: 18px; line-height: 44px; display: inline-block;">🎫</span>
            </td>
          </tr>
        </table>
      </div>

      <!-- Heading -->
      <h1 class="heading-responsive" style="color: #0f172a; font-size: 24px; font-weight: 700; margin: 0 0 16px 0; text-align: center; letter-spacing: -0.02em; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, Helvetica, sans-serif; line-height: 1.3;">
        Support Ticket Raised
      </h1>

      <!-- Personalized Greeting -->
      <p style="font-size: 15px; color: #1e293b; line-height: 1.6; margin: 0 0 12px 0;">
        Hi ${userName},
      </p>

      <!-- Message -->
      <p style="font-size: 14.5px; color: #334155; line-height: 1.65; margin: 0 0 20px 0;">
        We have received your support request at the <strong>International Institute of Internship™ [i3]</strong> Help Desk. A member of our technical or student services team has been assigned.
      </p>

      <!-- Ticket Summary Card -->
      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 18px 20px; margin: 0 0 20px 0; text-align: left;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;">
          <tr>
            <td style="padding: 6px 0; font-size: 13px; color: #64748b; font-weight: 600; width: 140px;">Ticket Reference:</td>
            <td style="padding: 6px 0; font-size: 13.5px; font-weight: 700; color: #059669;">
              ${ticketNo}
            </td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-size: 13px; color: #64748b; font-weight: 600;">Issue Subject:</td>
            <td style="padding: 6px 0; font-size: 13.5px; font-weight: 700; color: #0f172a;">
              ${title}
            </td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-size: 13px; color: #64748b; font-weight: 600;">Status:</td>
            <td style="padding: 6px 0;">
              <span style="display: inline-block; padding: 3px 10px; background-color: #eff6ff; color: #1d4ed8; font-size: 11.5px; font-weight: 700; border-radius: 6px; border: 1px solid #bfdbfe;">
                OPEN & QUEUED
              </span>
            </td>
          </tr>
        </table>
      </div>

      <!-- Description Content Box -->
      <div style="background-color: #ffffff; border-left: 3px solid #059669; border-radius: 4px; padding: 14px 16px; margin: 0 0 24px 0; text-align: left; border-top: 1px solid #f1f5f9; border-right: 1px solid #f1f5f9; border-bottom: 1px solid #f1f5f9;">
        <p style="margin: 0 0 6px 0; font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.04em;">
          Reported Description:
        </p>
        <p style="margin: 0; font-size: 13.5px; color: #1e293b; line-height: 1.6;">
          ${description}
        </p>
      </div>

      <!-- Primary CTA Button -->
      <div style="text-align: center; margin: 24px 0 16px 0;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto; width: auto;">
          <tr>
            <td align="center" style="border-radius: 8px; background-color: #059669; box-shadow: 0 2px 8px rgba(5, 150, 105, 0.25);">
              <a href="${dashboardUrl}" target="_blank" class="btn-responsive" style="display: inline-block; min-width: 200px; padding: 14px 32px; font-size: 14.5px; font-weight: 600; color: #ffffff !important; text-decoration: none; border-radius: 8px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, Helvetica, sans-serif; letter-spacing: 0.01em; text-align: center;">
                View Ticket in Portal
              </a>
            </td>
          </tr>
        </table>
      </div>

      <!-- Direct Link Fallback -->
      <p style="text-align: center; font-size: 12px; color: #64748b; margin: 0 0 24px 0; line-height: 1.5;">
        Direct link: <a href="${dashboardUrl}" target="_blank" style="color: #059669; word-break: break-all; text-decoration: underline;">${dashboardUrl}</a>
      </p>

      <!-- Support Link -->
      <div style="border-top: 1px solid #f1f5f9; padding-top: 18px; font-size: 12.5px; color: #64748b; line-height: 1.5;">
        Need immediate emergency assistance? Email us directly at <a href="mailto:i3.office2025@gmail.com" style="color: #059669; font-weight: 600; text-decoration: none;">i3.office2025@gmail.com</a> quoting Ticket ID: <strong>${ticketNo}</strong>.
      </div>
    `,
  );
}

export function getSupportTicketStatusUpdateEmailTemplate(
  ticketNo: string,
  title: string,
  status: string,
  name?: string,
): string {
  const baseUrl = config.clientUrl || "https://www.iiinternship.in";
  const dashboardUrl = `${baseUrl}/student/dashboard`;
  const userName = name && name.trim() ? name.trim() : "Member";

  const upperStatus = (status || "UPDATED").toUpperCase();
  let badgeBg = "#fffbeb";
  let badgeBorder = "#fde68a";
  let badgeText = "#d97706";
  let icon = "🔔";

  if (["RESOLVED", "CLOSED"].includes(upperStatus)) {
    badgeBg = "#ecfdf5";
    badgeBorder = "#a7f3d0";
    badgeText = "#059669";
    icon = "✅";
  } else if (["IN_PROGRESS", "INVESTIGATING", "PROCESSING"].includes(upperStatus)) {
    badgeBg = "#eff6ff";
    badgeBorder = "#bfdbfe";
    badgeText = "#2563eb";
    icon = "⚙️";
  }

  return getBaseTemplate(
    `Ticket ${upperStatus} [${ticketNo}] — ${title}`,
    `
      <!-- Top Icon / Badge -->
      <div style="text-align: center; margin: 0 0 16px 0;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto;">
          <tr>
            <td align="center" style="width: 44px; height: 44px; border-radius: 50%; background-color: ${badgeBg}; border: 1px solid ${badgeBorder}; text-align: center; vertical-align: middle;">
              <span style="font-size: 18px; line-height: 44px; display: inline-block;">${icon}</span>
            </td>
          </tr>
        </table>
      </div>

      <!-- Heading -->
      <h1 class="heading-responsive" style="color: #0f172a; font-size: 24px; font-weight: 700; margin: 0 0 16px 0; text-align: center; letter-spacing: -0.02em; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, Helvetica, sans-serif; line-height: 1.3;">
        Support Ticket Status Update
      </h1>

      <!-- Personalized Greeting -->
      <p style="font-size: 15px; color: #1e293b; line-height: 1.6; margin: 0 0 12px 0;">
        Hi ${userName},
      </p>

      <!-- Message -->
      <p style="font-size: 14.5px; color: #334155; line-height: 1.65; margin: 0 0 20px 0;">
        There has been an official status update on your support request at <strong>International Institute of Internship™ [i3]</strong>.
      </p>

      <!-- Status Summary Card -->
      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 18px 20px; margin: 0 0 24px 0; text-align: left;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;">
          <tr>
            <td style="padding: 6px 0; font-size: 13px; color: #64748b; font-weight: 600; width: 140px;">Ticket Reference:</td>
            <td style="padding: 6px 0; font-size: 13.5px; font-weight: 700; color: #059669;">
              ${ticketNo}
            </td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-size: 13px; color: #64748b; font-weight: 600;">Issue Title:</td>
            <td style="padding: 6px 0; font-size: 13.5px; font-weight: 700; color: #0f172a;">
              ${title}
            </td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-size: 13px; color: #64748b; font-weight: 600;">Current Status:</td>
            <td style="padding: 6px 0;">
              <span style="display: inline-block; padding: 4px 12px; background-color: ${badgeBg}; color: ${badgeText}; font-size: 12px; font-weight: 700; border-radius: 6px; border: 1px solid ${badgeBorder};">
                ${upperStatus}
              </span>
            </td>
          </tr>
        </table>
      </div>

      <!-- Primary CTA Button -->
      <div style="text-align: center; margin: 24px 0 16px 0;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto; width: auto;">
          <tr>
            <td align="center" style="border-radius: 8px; background-color: #059669; box-shadow: 0 2px 8px rgba(5, 150, 105, 0.25);">
              <a href="${dashboardUrl}" target="_blank" class="btn-responsive" style="display: inline-block; min-width: 200px; padding: 14px 32px; font-size: 14.5px; font-weight: 600; color: #ffffff !important; text-decoration: none; border-radius: 8px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, Helvetica, sans-serif; letter-spacing: 0.01em; text-align: center;">
                Open Support Dashboard
              </a>
            </td>
          </tr>
        </table>
      </div>

      <!-- Direct Link Fallback -->
      <p style="text-align: center; font-size: 12px; color: #64748b; margin: 0 0 24px 0; line-height: 1.5;">
        Direct link: <a href="${dashboardUrl}" target="_blank" style="color: #059669; word-break: break-all; text-decoration: underline;">${dashboardUrl}</a>
      </p>

      <!-- Support Link -->
      <div style="border-top: 1px solid #f1f5f9; padding-top: 18px; font-size: 12.5px; color: #64748b; line-height: 1.5;">
        If you feel this issue is unresolved or requires escalation, contact <a href="mailto:i3.office2025@gmail.com" style="color: #059669; font-weight: 600; text-decoration: none;">i3.office2025@gmail.com</a>.
      </div>
    `,
  );
}

export function getSupportTicketReplyEmailTemplate(
  ticketNo: string,
  title: string,
  replyMessage: string,
  name?: string,
): string {
  const baseUrl = config.clientUrl || "https://www.iiinternship.in";
  const dashboardUrl = `${baseUrl}/student/dashboard`;
  const userName = name && name.trim() ? name.trim() : "Member";

  return getBaseTemplate(
    `Support Response [${ticketNo}] — ${title}`,
    `
      <!-- Top Icon / Badge -->
      <div style="text-align: center; margin: 0 0 16px 0;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto;">
          <tr>
            <td align="center" style="width: 44px; height: 44px; border-radius: 50%; background-color: #ecfdf5; border: 1px solid #d1fae5; text-align: center; vertical-align: middle;">
              <span style="font-size: 18px; line-height: 44px; display: inline-block;">💬</span>
            </td>
          </tr>
        </table>
      </div>

      <!-- Heading -->
      <h1 class="heading-responsive" style="color: #0f172a; font-size: 24px; font-weight: 700; margin: 0 0 16px 0; text-align: center; letter-spacing: -0.02em; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, Helvetica, sans-serif; line-height: 1.3;">
        Official Support Reply
      </h1>

      <!-- Personalized Greeting -->
      <p style="font-size: 15px; color: #1e293b; line-height: 1.6; margin: 0 0 12px 0;">
        Hi ${userName},
      </p>

      <!-- Message -->
      <p style="font-size: 14.5px; color: #334155; line-height: 1.65; margin: 0 0 20px 0;">
        An official support representative from <strong>International Institute of Internship™ [i3]</strong> has responded to your inquiry regarding <strong>"${title}"</strong> (Ticket <code>${ticketNo}</code>):
      </p>

      <!-- Reply Box -->
      <div style="background-color: #f8fafc; border-left: 3px solid #059669; border-radius: 4px; padding: 16px 18px; margin: 0 0 24px 0; text-align: left; border-top: 1px solid #e2e8f0; border-right: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0;">
        <p style="margin: 0 0 8px 0; font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.04em;">
          Help Desk Response:
        </p>
        <div style="font-size: 14px; color: #1e293b; line-height: 1.65; white-space: pre-line;">
          ${replyMessage}
        </div>
      </div>

      <!-- Primary CTA Button -->
      <div style="text-align: center; margin: 24px 0 16px 0;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto; width: auto;">
          <tr>
            <td align="center" style="border-radius: 8px; background-color: #059669; box-shadow: 0 2px 8px rgba(5, 150, 105, 0.25);">
              <a href="${dashboardUrl}" target="_blank" class="btn-responsive" style="display: inline-block; min-width: 200px; padding: 14px 32px; font-size: 14.5px; font-weight: 600; color: #ffffff !important; text-decoration: none; border-radius: 8px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, Helvetica, sans-serif; letter-spacing: 0.01em; text-align: center;">
                Reply in Support Portal
              </a>
            </td>
          </tr>
        </table>
      </div>

      <!-- Direct Link Fallback -->
      <p style="text-align: center; font-size: 12px; color: #64748b; margin: 0 0 24px 0; line-height: 1.5;">
        Direct link: <a href="${dashboardUrl}" target="_blank" style="color: #059669; word-break: break-all; text-decoration: underline;">${dashboardUrl}</a>
      </p>

      <!-- Support Link -->
      <div style="border-top: 1px solid #f1f5f9; padding-top: 18px; font-size: 12.5px; color: #64748b; line-height: 1.5;">
        You may also reply directly to this email or reach <a href="mailto:i3.office2025@gmail.com" style="color: #059669; font-weight: 600; text-decoration: none;">i3.office2025@gmail.com</a> referencing Ticket ID: <strong>${ticketNo}</strong>.
      </div>
    `,
  );
}

