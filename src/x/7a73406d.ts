import { getBaseTemplate } from "@/x/0c6e1403";
import { config } from "@/x/a948e663";

export function getAdminPublishedNoticeNotificationEmailTemplate(
  title: string,
  category: string,
  description: string,
  pdfUrl: string | null,
  name?: string,
): string {
  const baseUrl = config.clientUrl || "https://www.iiinternship.in";
  const dashboardUrl = `${baseUrl}/student/dashboard`;
  const userName = name && name.trim() ? name.trim() : "Member";
  const noticeCategory = category && category.trim() ? category.trim() : "General Administration";

  let pdfButtonHtml = "";
  if (pdfUrl && pdfUrl.trim()) {
    pdfButtonHtml = `
      <div style="text-align: center; margin: 18px 0 20px 0;">
        <a href="${pdfUrl.trim()}" target="_blank" style="display: inline-block; padding: 11px 24px; font-size: 13.5px; font-weight: 600; color: #0f172a; background-color: #f1f5f9; border: 1px solid #cbd5e1; border-radius: 6px; text-decoration: none;">
          📄 Download Official Circular PDF
        </a>
      </div>
    `;
  }

  return getBaseTemplate(
    `Official Circular: ${title} — International Institute of Internship™`,
    `
      <!-- Top Icon / Badge -->
      <div style="text-align: center; margin: 0 0 16px 0;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto;">
          <tr>
            <td align="center" style="width: 44px; height: 44px; border-radius: 50%; background-color: #ecfdf5; border: 1px solid #d1fae5; text-align: center; vertical-align: middle;">
              <span style="font-size: 18px; line-height: 44px; display: inline-block;">🏛️</span>
            </td>
          </tr>
        </table>
      </div>

      <!-- Heading -->
      <h1 class="heading-responsive" style="color: #0f172a; font-size: 24px; font-weight: 700; margin: 0 0 16px 0; text-align: center; letter-spacing: -0.02em; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, Helvetica, sans-serif; line-height: 1.3;">
        Official Administrative Notice
      </h1>

      <!-- Personalized Greeting -->
      <p style="font-size: 15px; color: #1e293b; line-height: 1.6; margin: 0 0 12px 0;">
        Dear ${userName},
      </p>

      <!-- Message -->
      <p style="font-size: 14.5px; color: #334155; line-height: 1.65; margin: 0 0 20px 0;">
        The administration of <strong>International Institute of Internship™ [i3]</strong> has published an official notice for all enrolled students, instructors, and partner institutions.
      </p>

      <!-- Notice Details Card -->
      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 18px 20px; margin: 0 0 20px 0; text-align: left;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;">
          <tr>
            <td style="padding: 6px 0; font-size: 13px; color: #64748b; font-weight: 600; width: 140px;">Notice Subject:</td>
            <td style="padding: 6px 0; font-size: 13.5px; font-weight: 700; color: #0f172a;">
              ${title}
            </td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-size: 13px; color: #64748b; font-weight: 600;">Department:</td>
            <td style="padding: 6px 0;">
              <span style="display: inline-block; padding: 3px 10px; background-color: #eff6ff; color: #1d4ed8; font-size: 11.5px; font-weight: 700; border-radius: 6px; border: 1px solid #bfdbfe;">
                ${noticeCategory}
              </span>
            </td>
          </tr>
        </table>
      </div>

      <!-- Notice Announcement Content Box -->
      <div style="background-color: #ffffff; border-left: 3px solid #059669; border-radius: 4px; padding: 16px 18px; margin: 0 0 20px 0; text-align: left; box-shadow: 0 1px 3px rgba(0,0,0,0.05); border-top: 1px solid #f1f5f9; border-right: 1px solid #f1f5f9; border-bottom: 1px solid #f1f5f9;">
        <p style="margin: 0 0 8px 0; font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.04em;">
          Official Announcement:
        </p>
        <div style="font-size: 13.5px; color: #1e293b; line-height: 1.65; white-space: pre-line;">
          ${description}
        </div>
      </div>

      ${pdfButtonHtml}

      <!-- Primary CTA Button -->
      <div style="text-align: center; margin: 24px 0 16px 0;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto; width: auto;">
          <tr>
            <td align="center" style="border-radius: 8px; background-color: #059669; box-shadow: 0 2px 8px rgba(5, 150, 105, 0.25);">
              <a href="${dashboardUrl}" target="_blank" class="btn-responsive" style="display: inline-block; min-width: 200px; padding: 14px 32px; font-size: 14.5px; font-weight: 600; color: #ffffff !important; text-decoration: none; border-radius: 8px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, Helvetica, sans-serif; letter-spacing: 0.01em; text-align: center;">
                View Notice Board
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
        Questions about this circular? Contact the administrative registrar at <a href="mailto:i3.office2025@gmail.com" style="color: #059669; font-weight: 600; text-decoration: none;">i3.office2025@gmail.com</a>.
      </div>
    `,
  );
}

export function getInstructorBroadcastedNoticeNotificationEmailTemplate(
  instructorName: string,
  title: string,
  category: string,
  description: string,
  name?: string,
): string {
  const baseUrl = config.clientUrl || "https://www.iiinternship.in";
  const dashboardUrl = `${baseUrl}/student/dashboard`;
  const studentName = name && name.trim() ? name.trim() : "Student";
  const mentorName = instructorName && instructorName.trim() ? instructorName.trim() : "Course Faculty";
  const noticeCategory = category && category.trim() ? category.trim() : "Academic Update";

  return getBaseTemplate(
    `Classroom Broadcast: ${title} by ${mentorName} — International Institute of Internship™`,
    `
      <!-- Top Icon / Badge -->
      <div style="text-align: center; margin: 0 0 16px 0;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto;">
          <tr>
            <td align="center" style="width: 44px; height: 44px; border-radius: 50%; background-color: #ecfdf5; border: 1px solid #d1fae5; text-align: center; vertical-align: middle;">
              <span style="font-size: 18px; line-height: 44px; display: inline-block;">🎓</span>
            </td>
          </tr>
        </table>
      </div>

      <!-- Heading -->
      <h1 class="heading-responsive" style="color: #0f172a; font-size: 24px; font-weight: 700; margin: 0 0 16px 0; text-align: center; letter-spacing: -0.02em; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, Helvetica, sans-serif; line-height: 1.3;">
        Notice from Your Instructor
      </h1>

      <!-- Personalized Greeting -->
      <p style="font-size: 15px; color: #1e293b; line-height: 1.6; margin: 0 0 12px 0;">
        Hi ${studentName},
      </p>

      <!-- Message -->
      <p style="font-size: 14.5px; color: #334155; line-height: 1.65; margin: 0 0 20px 0;">
        Your faculty mentor <strong>${mentorName}</strong> has broadcasted an important update regarding your enrolled internship track at the <strong>International Institute of Internship™ [i3]</strong>.
      </p>

      <!-- Broadcast Summary Card -->
      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 18px 20px; margin: 0 0 20px 0; text-align: left;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;">
          <tr>
            <td style="padding: 6px 0; font-size: 13px; color: #64748b; font-weight: 600; width: 140px;">Faculty / Mentor:</td>
            <td style="padding: 6px 0; font-size: 13.5px; font-weight: 700; color: #0f172a;">
              ${mentorName}
            </td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-size: 13px; color: #64748b; font-weight: 600;">Subject / Topic:</td>
            <td style="padding: 6px 0; font-size: 13.5px; font-weight: 700; color: #059669;">
              ${title}
            </td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-size: 13px; color: #64748b; font-weight: 600;">Category:</td>
            <td style="padding: 6px 0;">
              <span style="display: inline-block; padding: 3px 10px; background-color: #ecfdf5; color: #059669; font-size: 11.5px; font-weight: 700; border-radius: 6px; border: 1px solid #a7f3d0;">
                ${noticeCategory}
              </span>
            </td>
          </tr>
        </table>
      </div>

      <!-- Instructor Note Content Box -->
      <div style="background-color: #ffffff; border-left: 3px solid #059669; border-radius: 4px; padding: 16px 18px; margin: 0 0 24px 0; text-align: left; box-shadow: 0 1px 3px rgba(0,0,0,0.05); border-top: 1px solid #f1f5f9; border-right: 1px solid #f1f5f9; border-bottom: 1px solid #f1f5f9;">
        <p style="margin: 0 0 8px 0; font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.04em;">
          Faculty Announcement:
        </p>
        <div style="font-size: 13.5px; color: #1e293b; line-height: 1.65; white-space: pre-line;">
          ${description}
        </div>
      </div>

      <!-- Primary CTA Button -->
      <div style="text-align: center; margin: 24px 0 16px 0;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto; width: auto;">
          <tr>
            <td align="center" style="border-radius: 8px; background-color: #059669; box-shadow: 0 2px 8px rgba(5, 150, 105, 0.25);">
              <a href="${dashboardUrl}" target="_blank" class="btn-responsive" style="display: inline-block; min-width: 200px; padding: 14px 32px; font-size: 14.5px; font-weight: 600; color: #ffffff !important; text-decoration: none; border-radius: 8px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, Helvetica, sans-serif; letter-spacing: 0.01em; text-align: center;">
                Open Student Portal
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
        Have questions about this class update? Contact your cohort coordinator at <a href="mailto:i3.office2025@gmail.com" style="color: #059669; font-weight: 600; text-decoration: none;">i3.office2025@gmail.com</a>.
      </div>
    `,
  );
}

