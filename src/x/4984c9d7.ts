import { getBaseTemplate } from "@/x/0c6e1403";
import { config } from "@/x/a948e663";

export function getJobApplicationSubmittedEmailTemplate(
  jobTitle: string,
  companyName: string,
  name?: string,
): string {
  const baseUrl = config.clientUrl || "https://www.iiinternship.in";
  const dashboardUrl = `${baseUrl}/student/dashboard`;
  const candidateName = name && name.trim() ? name.trim() : "Candidate";
  const employer = companyName && companyName.trim() ? companyName.trim() : "Partner Employer";

  return getBaseTemplate(
    `Application Received: ${jobTitle} — ${employer} — International Institute of Internship™`,
    `
      <!-- Top Icon / Badge -->
      <div style="text-align: center; margin: 0 0 16px 0;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto;">
          <tr>
            <td align="center" style="width: 44px; height: 44px; border-radius: 50%; background-color: #ecfdf5; border: 1px solid #d1fae5; text-align: center; vertical-align: middle;">
              <span style="font-size: 18px; line-height: 44px; display: inline-block;">💼</span>
            </td>
          </tr>
        </table>
      </div>

      <!-- Heading -->
      <h1 class="heading-responsive" style="color: #0f172a; font-size: 24px; font-weight: 700; margin: 0 0 16px 0; text-align: center; letter-spacing: -0.02em; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, Helvetica, sans-serif; line-height: 1.3;">
        Application Submitted Successfully
      </h1>

      <!-- Personalized Greeting -->
      <p style="font-size: 15px; color: #1e293b; line-height: 1.6; margin: 0 0 12px 0;">
        Hi ${candidateName},
      </p>

      <!-- Message -->
      <p style="font-size: 14.5px; color: #334155; line-height: 1.65; margin: 0 0 20px 0;">
        Thank you for submitting your job application through the <strong>International Institute of Internship™ [i3]</strong> Career Placement Portal. Your profile and credentials have been forwarded to the hiring team.
      </p>

      <!-- Application Details Card -->
      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 18px 20px; margin: 0 0 24px 0; text-align: left;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;">
          <tr>
            <td style="padding: 6px 0; font-size: 13px; color: #64748b; font-weight: 600; width: 140px;">Position:</td>
            <td style="padding: 6px 0; font-size: 13.5px; font-weight: 700; color: #0f172a;">
              ${jobTitle}
            </td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-size: 13px; color: #64748b; font-weight: 600;">Employer / Company:</td>
            <td style="padding: 6px 0; font-size: 13.5px; font-weight: 700; color: #059669;">
              ${employer}
            </td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-size: 13px; color: #64748b; font-weight: 600;">Application Status:</td>
            <td style="padding: 6px 0;">
              <span style="display: inline-block; padding: 3px 10px; background-color: #ecfdf5; color: #059669; font-size: 11.5px; font-weight: 700; border-radius: 6px; border: 1px solid #a7f3d0;">
                SUBMITTED & UNDER REVIEW
              </span>
            </td>
          </tr>
        </table>
      </div>

      <!-- Recruitment Next Steps Info -->
      <div style="background: #ffffff; border: 1px solid #f1f5f9; border-radius: 8px; padding: 14px 16px; margin: 0 0 24px 0; text-align: left;">
        <p style="margin: 0 0 8px 0; font-size: 13px; font-weight: 700; color: #0f172a;">
          📌 What to Expect:
        </p>
        <p style="margin: 0 0 6px 0; font-size: 12.5px; color: #475569; line-height: 1.5;">
          • The hiring panel will assess your qualifications and portfolio.<br>
          • Shortlisted candidates will receive direct interview invitations via email and SMS.<br>
          • Track your application timeline in real-time from your student dashboard.
        </p>
      </div>

      <!-- Primary CTA Button -->
      <div style="text-align: center; margin: 24px 0 16px 0;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto; width: auto;">
          <tr>
            <td align="center" style="border-radius: 8px; background-color: #059669; box-shadow: 0 2px 8px rgba(5, 150, 105, 0.25);">
              <a href="${dashboardUrl}" target="_blank" class="btn-responsive" style="display: inline-block; min-width: 200px; padding: 14px 32px; font-size: 14.5px; font-weight: 600; color: #ffffff !important; text-decoration: none; border-radius: 8px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, Helvetica, sans-serif; letter-spacing: 0.01em; text-align: center;">
                Track Application Status
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
        Questions about your application? Contact our career placement office at <a href="mailto:i3.office2025@gmail.com" style="color: #059669; font-weight: 600; text-decoration: none;">i3.office2025@gmail.com</a>.
      </div>
    `,
  );
}

export function getJobApplicationStatusUpdateEmailTemplate(
  jobTitle: string,
  companyName: string,
  status: string,
  message?: string,
  attachmentUrl?: string,
  link?: string,
  name?: string,
): string {
  const baseUrl = config.clientUrl || "https://www.iiinternship.in";
  const dashboardUrl = `${baseUrl}/student/dashboard`;
  const candidateName = name && name.trim() ? name.trim() : "Candidate";
  const employer = companyName && companyName.trim() ? companyName.trim() : "Partner Employer";

  const upperStatus = (status || "UPDATE").toUpperCase();
  let badgeBg = "#fffbeb";
  let badgeBorder = "#fde68a";
  let badgeText = "#d97706";
  let icon = "🔔";

  if (["SHORTLISTED", "HIRED", "ACCEPTED", "SELECTED", "OFFERED"].includes(upperStatus)) {
    badgeBg = "#ecfdf5";
    badgeBorder = "#a7f3d0";
    badgeText = "#059669";
    icon = "🎉";
  } else if (["REJECTED", "DECLINED", "CLOSED"].includes(upperStatus)) {
    badgeBg = "#fef2f2";
    badgeBorder = "#fecaca";
    badgeText = "#dc2626";
    icon = "📌";
  } else if (["INTERVIEW", "INTERVIEW_SCHEDULED", "ROUND 1", "ROUND 2"].some((s) => upperStatus.includes(s))) {
    badgeBg = "#eff6ff";
    badgeBorder = "#bfdbfe";
    badgeText = "#2563eb";
    icon = "📅";
  }

  let customContent = "";
  if (message && message.trim()) {
    customContent += `
      <div style="background-color: #f8fafc; border-left: 3px solid #059669; border-radius: 4px; padding: 14px 16px; margin: 0 0 20px 0; text-align: left;">
        <p style="margin: 0 0 6px 0; font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.04em;">
          Message from Hiring Team:
        </p>
        <p style="margin: 0; font-size: 13.5px; color: #1e293b; line-height: 1.6; font-style: italic;">
          "${message.trim()}"
        </p>
      </div>
    `;
  }

  if (link && link.trim()) {
    customContent += `
      <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px 16px; margin: 0 0 20px 0; text-align: left;">
        <p style="margin: 0 0 6px 0; font-size: 13px; font-weight: 700; color: #0f172a;">
          🔗 Important Candidate Link:
        </p>
        <p style="margin: 0; font-size: 13px; line-height: 1.5;">
          <a href="${link.trim()}" target="_blank" style="color: #059669; font-weight: 600; text-decoration: underline; word-break: break-all;">
            ${link.trim()}
          </a>
        </p>
      </div>
    `;
  }

  if (attachmentUrl && attachmentUrl.trim()) {
    customContent += `
      <div style="text-align: center; margin: 16px 0 24px 0;">
        <a href="${attachmentUrl.trim()}" target="_blank" style="display: inline-block; padding: 10px 22px; font-size: 13px; font-weight: 600; color: #0f172a; background-color: #f1f5f9; border: 1px solid #cbd5e1; border-radius: 6px; text-decoration: none;">
          📎 Download Attached Assessment / Brief
        </a>
      </div>
    `;
  }

  return getBaseTemplate(
    `Application Status: ${upperStatus} — ${jobTitle} at ${employer}`,
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
        Application Status Update
      </h1>

      <!-- Personalized Greeting -->
      <p style="font-size: 15px; color: #1e293b; line-height: 1.6; margin: 0 0 12px 0;">
        Hi ${candidateName},
      </p>

      <!-- Message -->
      <p style="font-size: 14.5px; color: #334155; line-height: 1.65; margin: 0 0 20px 0;">
        There is a new status update on your application for <strong>${jobTitle}</strong> at <strong>${employer}</strong> via the <strong>International Institute of Internship™ [i3]</strong>.
      </p>

      <!-- Status Summary Card -->
      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 18px 20px; margin: 0 0 20px 0; text-align: left;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;">
          <tr>
            <td style="padding: 6px 0; font-size: 13px; color: #64748b; font-weight: 600; width: 140px;">Position:</td>
            <td style="padding: 6px 0; font-size: 13.5px; font-weight: 700; color: #0f172a;">
              ${jobTitle}
            </td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-size: 13px; color: #64748b; font-weight: 600;">Employer:</td>
            <td style="padding: 6px 0; font-size: 13.5px; font-weight: 700; color: #059669;">
              ${employer}
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

      <!-- Recruiter Note / Attachments / Link -->
      ${customContent}

      <!-- Primary CTA Button -->
      <div style="text-align: center; margin: 24px 0 16px 0;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto; width: auto;">
          <tr>
            <td align="center" style="border-radius: 8px; background-color: #059669; box-shadow: 0 2px 8px rgba(5, 150, 105, 0.25);">
              <a href="${dashboardUrl}" target="_blank" class="btn-responsive" style="display: inline-block; min-width: 200px; padding: 14px 32px; font-size: 14.5px; font-weight: 600; color: #ffffff !important; text-decoration: none; border-radius: 8px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, Helvetica, sans-serif; letter-spacing: 0.01em; text-align: center;">
                Open Career Portal
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
        Have questions about recruitment? Contact our placement desk at <a href="mailto:i3.office2025@gmail.com" style="color: #059669; font-weight: 600; text-decoration: none;">i3.office2025@gmail.com</a>.
      </div>
    `,
  );
}

