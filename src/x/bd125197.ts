import { config } from "@/x/a948e663";

import { getBaseTemplate } from "@/x/0c6e1403";

export function getPaymentConfirmationEmailTemplate(
  name: string,
  internshipTitle: string,
  amount: number,
  paymentId: string,
): string {
  const baseUrl = config.clientUrl || "https://www.iiinternship.in";
  const studentPortalUrl = `${baseUrl}/student/dashboard`;
  const userName = name && name.trim() ? name.trim() : "there";
  const formattedAmount = Number(amount || 0).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return getBaseTemplate(
    `Payment Confirmed: ${internshipTitle} — International Institute of Internship™`,
    `
      <!-- Top Icon / Badge -->
      <div style="text-align: center; margin: 0 0 16px 0;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto;">
          <tr>
            <td align="center" style="width: 44px; height: 44px; border-radius: 50%; background-color: #ecfdf5; border: 1px solid #d1fae5; text-align: center; vertical-align: middle;">
              <span style="font-size: 18px; line-height: 44px; display: inline-block;">💳</span>
            </td>
          </tr>
        </table>
      </div>

      <!-- Heading -->
      <h1 class="heading-responsive" style="color: #0f172a; font-size: 24px; font-weight: 700; margin: 0 0 16px 0; text-align: center; letter-spacing: -0.02em; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, Helvetica, sans-serif; line-height: 1.3;">
        Payment Confirmed & Enrolled
      </h1>

      <!-- Personalized Greeting -->
      <p style="font-size: 15px; color: #1e293b; line-height: 1.6; margin: 0 0 12px 0;">
        Hi ${userName},
      </p>

      <!-- Message -->
      <p style="font-size: 14.5px; color: #334155; line-height: 1.65; margin: 0 0 20px 0;">
        Thank you! Your payment for <strong>${internshipTitle}</strong> on the <strong>International Institute of Internship™ [i3]</strong> platform was successful. Your seat in this program is officially confirmed.
      </p>

      <!-- Payment Receipt Card -->
      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 18px 20px; margin: 0 0 24px 0; text-align: left;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;">
          <tr>
            <td style="padding: 6px 0; font-size: 13px; color: #64748b; font-weight: 600; width: 140px;">Program:</td>
            <td style="padding: 6px 0; font-size: 13.5px; font-weight: 700; color: #0f172a;">
              ${internshipTitle}
            </td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-size: 13px; color: #64748b; font-weight: 600;">Amount Paid:</td>
            <td style="padding: 6px 0; font-size: 14.5px; font-weight: 700; color: #059669;">
              ₹${formattedAmount}
            </td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-size: 13px; color: #64748b; font-weight: 600;">Transaction ID:</td>
            <td style="padding: 6px 0; font-size: 13px; font-weight: 700; color: #0f172a; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;">
              ${paymentId}
            </td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-size: 13px; color: #64748b; font-weight: 600;">Status:</td>
            <td style="padding: 6px 0;">
              <span style="display: inline-block; padding: 3px 10px; background-color: #ecfdf5; color: #059669; font-size: 11.5px; font-weight: 700; border-radius: 6px; border: 1px solid #a7f3d0;">
                PAID & ENROLLED
              </span>
            </td>
          </tr>
        </table>
      </div>

      <!-- What to do next -->
      <div style="background: #ffffff; border: 1px solid #f1f5f9; border-radius: 8px; padding: 14px 16px; margin: 0 0 24px 0; text-align: left;">
        <p style="margin: 0 0 8px 0; font-size: 13px; font-weight: 700; color: #0f172a;">
          🚀 Getting Started:
        </p>
        <p style="margin: 0 0 6px 0; font-size: 12.5px; color: #475569; line-height: 1.5;">
          • Access your internship curriculum and project resources on your dashboard.<br>
          • Connect with your assigned mentor for live orientation.<br>
          • Complete hands-on assignments to earn your verified certificate.
        </p>
      </div>

      <!-- Primary CTA Button -->
      <div style="text-align: center; margin: 24px 0 16px 0;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto; width: auto;">
          <tr>
            <td align="center" style="border-radius: 8px; background-color: #059669; box-shadow: 0 2px 8px rgba(5, 150, 105, 0.25);">
              <a href="${studentPortalUrl}" target="_blank" class="btn-responsive" style="display: inline-block; min-width: 210px; padding: 14px 34px; font-size: 14.5px; font-weight: 600; color: #ffffff !important; text-decoration: none; border-radius: 8px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, Helvetica, sans-serif; letter-spacing: 0.01em; text-align: center;">
                Go to Student Dashboard
              </a>
            </td>
          </tr>
        </table>
      </div>

      <!-- Direct Link Fallback -->
      <p style="text-align: center; font-size: 12px; color: #64748b; margin: 0 0 24px 0; line-height: 1.5;">
        Direct link: <a href="${studentPortalUrl}" target="_blank" style="color: #059669; word-break: break-all; text-decoration: underline;">${studentPortalUrl}</a>
      </p>

      <!-- Support Link -->
      <div style="border-top: 1px solid #f1f5f9; padding-top: 18px; font-size: 12.5px; color: #64748b; line-height: 1.5;">
        Billing or enrollment questions? <a href="mailto:i3.office2025@gmail.com" style="color: #059669; font-weight: 600; text-decoration: none;">Contact i3 Support</a>.
      </div>
    `,
  );
}

export function getInstructorProfileRegistrationCompletionEmailTemplate(
  name: string,
  instructorId: string,
): string {
  const baseUrl = config.clientUrl || "https://www.iiinternship.in";
  const portalUrl = `${baseUrl}/instructor/dashboard`;
  const userName = name && name.trim() ? name.trim() : "there";

  return getBaseTemplate(
    "Instructor Onboarding Submitted — International Institute of Internship™",
    `
      <!-- Top Icon / Badge -->
      <div style="text-align: center; margin: 0 0 16px 0;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto;">
          <tr>
            <td align="center" style="width: 44px; height: 44px; border-radius: 50%; background-color: #ecfdf5; border: 1px solid #d1fae5; text-align: center; vertical-align: middle;">
              <span style="font-size: 18px; line-height: 44px; display: inline-block;">👨‍🏫</span>
            </td>
          </tr>
        </table>
      </div>

      <!-- Heading -->
      <h1 class="heading-responsive" style="color: #0f172a; font-size: 24px; font-weight: 700; margin: 0 0 16px 0; text-align: center; letter-spacing: -0.02em; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, Helvetica, sans-serif; line-height: 1.3;">
        Instructor Onboarding Submitted
      </h1>

      <!-- Personalized Greeting -->
      <p style="font-size: 15px; color: #1e293b; line-height: 1.6; margin: 0 0 12px 0;">
        Hi ${userName},
      </p>

      <!-- Message -->
      <p style="font-size: 14.5px; color: #334155; line-height: 1.65; margin: 0 0 20px 0;">
        Thank you for submitting your instructor onboarding profile with the <strong>International Institute of Internship™ [i3]</strong>. Your documentation and credentials have been received successfully.
      </p>

      <!-- Instructor Record Card -->
      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 18px 20px; margin: 0 0 24px 0; text-align: left;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;">
          <tr>
            <td style="padding: 6px 0; font-size: 13px; color: #64748b; font-weight: 600; width: 140px;">Instructor ID:</td>
            <td style="padding: 6px 0; font-size: 14px; font-weight: 700; color: #0f172a; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;">
              ${instructorId}
            </td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-size: 13px; color: #64748b; font-weight: 600;">Status:</td>
            <td style="padding: 6px 0;">
              <span style="display: inline-block; padding: 3px 10px; background-color: #fffbeb; color: #b45309; font-size: 11.5px; font-weight: 700; border-radius: 6px; border: 1px solid #fde68a;">
                UNDER REVIEW
              </span>
            </td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-size: 13px; color: #64748b; font-weight: 600;">Role:</td>
            <td style="padding: 6px 0; font-size: 13px; color: #334155; font-weight: 600;">
              Faculty & Industry Mentor
            </td>
          </tr>
        </table>
      </div>

      <!-- Review Timeline Information -->
      <div style="background: #ffffff; border: 1px solid #f1f5f9; border-radius: 8px; padding: 14px 16px; margin: 0 0 24px 0; text-align: left;">
        <p style="margin: 0 0 8px 0; font-size: 13px; font-weight: 700; color: #0f172a;">
          ⏱ What happens next?
        </p>
        <p style="margin: 0 0 6px 0; font-size: 12.5px; color: #475569; line-height: 1.5;">
          • Our academic committee reviews credentials within <strong>24–48 hours</strong>.<br>
          • You will receive an approval email notification once verified.<br>
          • Upon activation, you can create programs, host cohorts, and evaluate internships.
        </p>
      </div>

      <!-- Primary CTA Button -->
      <div style="text-align: center; margin: 24px 0 16px 0;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto; width: auto;">
          <tr>
            <td align="center" style="border-radius: 8px; background-color: #059669; box-shadow: 0 2px 8px rgba(5, 150, 105, 0.25);">
              <a href="${portalUrl}" target="_blank" class="btn-responsive" style="display: inline-block; min-width: 200px; padding: 14px 34px; font-size: 14.5px; font-weight: 600; color: #ffffff !important; text-decoration: none; border-radius: 8px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, Helvetica, sans-serif; letter-spacing: 0.01em; text-align: center;">
                Check Onboarding Status
              </a>
            </td>
          </tr>
        </table>
      </div>

      <!-- Direct Link Fallback -->
      <p style="text-align: center; font-size: 12px; color: #64748b; margin: 0 0 24px 0; line-height: 1.5;">
        Direct link: <a href="${portalUrl}" target="_blank" style="color: #059669; word-break: break-all; text-decoration: underline;">${portalUrl}</a>
      </p>

      <!-- Support Link -->
      <div style="border-top: 1px solid #f1f5f9; padding-top: 18px; font-size: 12.5px; color: #64748b; line-height: 1.5;">
        Faculty questions or urgent onboarding support? <a href="mailto:i3.office2025@gmail.com" style="color: #059669; font-weight: 600; text-decoration: none;">Contact i3 Support</a>.
      </div>
    `,
  );
}

export function getStudentProfileRegistrationCompletionEmailTemplate(
  name: string,
  studentId: string,
): string {
  const baseUrl = config.clientUrl || "https://www.iiinternship.in";
  const studentPortalUrl = `${baseUrl}/student/dashboard`;
  const userName = name && name.trim() ? name.trim() : "there";

  return getBaseTemplate(
    "Student Profile Registered — International Institute of Internship™",
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
        Profile Registration Completed
      </h1>

      <!-- Personalized Greeting -->
      <p style="font-size: 15px; color: #1e293b; line-height: 1.6; margin: 0 0 12px 0;">
        Hi ${userName},
      </p>

      <!-- Message -->
      <p style="font-size: 14.5px; color: #334155; line-height: 1.65; margin: 0 0 20px 0;">
        Congratulations! Your student profile, academic information, and registration details have been verified and activated on the <strong>International Institute of Internship™ [i3]</strong> portal.
      </p>

      <!-- Student Record Card -->
      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 18px 20px; margin: 0 0 24px 0; text-align: left;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;">
          <tr>
            <td style="padding: 6px 0; font-size: 13px; color: #64748b; font-weight: 600; width: 140px;">Student ID:</td>
            <td style="padding: 6px 0; font-size: 14px; font-weight: 700; color: #0f172a; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;">
              ${studentId}
            </td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-size: 13px; color: #64748b; font-weight: 600;">Account Status:</td>
            <td style="padding: 6px 0;">
              <span style="display: inline-block; padding: 3px 10px; background-color: #ecfdf5; color: #059669; font-size: 11.5px; font-weight: 700; border-radius: 6px; border: 1px solid #a7f3d0;">
                ACTIVE / VERIFIED
              </span>
            </td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-size: 13px; color: #64748b; font-weight: 600;">Access:</td>
            <td style="padding: 6px 0; font-size: 13px; color: #334155; font-weight: 600;">
              Full Student Portal Access
            </td>
          </tr>
        </table>
      </div>

      <!-- Quick Actions Checklist -->
      <div style="background: #ffffff; border: 1px solid #f1f5f9; border-radius: 8px; padding: 14px 16px; margin: 0 0 24px 0; text-align: left;">
        <p style="margin: 0 0 8px 0; font-size: 13px; font-weight: 700; color: #0f172a;">
          🚀 What you can do next:
        </p>
        <p style="margin: 0 0 6px 0; font-size: 12.5px; color: #475569; line-height: 1.5;">
          • Browse and apply for verified internships and mentorship programs.<br>
          • Download your official <strong>Digital ID Card</strong>.<br>
          • Track your project milestones and certificate issuances.
        </p>
      </div>

      <!-- Primary CTA Button -->
      <div style="text-align: center; margin: 24px 0 16px 0;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto; width: auto;">
          <tr>
            <td align="center" style="border-radius: 8px; background-color: #059669; box-shadow: 0 2px 8px rgba(5, 150, 105, 0.25);">
              <a href="${studentPortalUrl}" target="_blank" class="btn-responsive" style="display: inline-block; min-width: 200px; padding: 14px 34px; font-size: 14.5px; font-weight: 600; color: #ffffff !important; text-decoration: none; border-radius: 8px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, Helvetica, sans-serif; letter-spacing: 0.01em; text-align: center;">
                Open Student Portal
              </a>
            </td>
          </tr>
        </table>
      </div>

      <!-- Direct Link Fallback -->
      <p style="text-align: center; font-size: 12px; color: #64748b; margin: 0 0 24px 0; line-height: 1.5;">
        Direct link: <a href="${studentPortalUrl}" target="_blank" style="color: #059669; word-break: break-all; text-decoration: underline;">${studentPortalUrl}</a>
      </p>

      <!-- Support Link -->
      <div style="border-top: 1px solid #f1f5f9; padding-top: 18px; font-size: 12.5px; color: #64748b; line-height: 1.5;">
        Have questions about your student profile? <a href="mailto:i3.office2025@gmail.com" style="color: #059669; font-weight: 600; text-decoration: none;">Contact i3 Support</a>.
      </div>
    `,
  );
}

export function getInternshipApplicationSubmittedEmailTemplate(
  name: string,
  internshipTitle: string,
  companyName: string,
): string {
  const baseUrl = config.clientUrl || "https://www.iiinternship.in";
  const studentPortalUrl = `${baseUrl}/student/dashboard`;
  const userName = name && name.trim() ? name.trim() : "there";

  return getBaseTemplate(
    `Application Received: ${internshipTitle} — ${companyName} | International Institute of Internship™`,
    `
      <!-- Top Icon / Badge -->
      <div style="text-align: center; margin: 0 0 16px 0;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto;">
          <tr>
            <td align="center" style="width: 44px; height: 44px; border-radius: 50%; background-color: #ecfdf5; border: 1px solid #d1fae5; text-align: center; vertical-align: middle;">
              <span style="font-size: 18px; line-height: 44px; display: inline-block;">📋</span>
            </td>
          </tr>
        </table>
      </div>

      <!-- Heading -->
      <h1 class="heading-responsive" style="color: #0f172a; font-size: 24px; font-weight: 700; margin: 0 0 16px 0; text-align: center; letter-spacing: -0.02em; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, Helvetica, sans-serif; line-height: 1.3;">
        Application Received
      </h1>

      <!-- Personalized Greeting -->
      <p style="font-size: 15px; color: #1e293b; line-height: 1.6; margin: 0 0 12px 0;">
        Hi ${userName},
      </p>

      <!-- Message -->
      <p style="font-size: 14.5px; color: #334155; line-height: 1.65; margin: 0 0 20px 0;">
        Your application for <strong>${internshipTitle}</strong> with <strong>${companyName}</strong> has been successfully submitted through the <strong>International Institute of Internship™ [i3]</strong> platform.
      </p>

      <!-- Application Details Card -->
      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 18px 20px; margin: 0 0 24px 0; text-align: left;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;">
          <tr>
            <td style="padding: 6px 0; font-size: 13px; color: #64748b; font-weight: 600; width: 140px;">Position:</td>
            <td style="padding: 6px 0; font-size: 13.5px; font-weight: 700; color: #0f172a;">
              ${internshipTitle}
            </td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-size: 13px; color: #64748b; font-weight: 600;">Organization:</td>
            <td style="padding: 6px 0; font-size: 13.5px; font-weight: 700; color: #0f172a;">
              ${companyName}
            </td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-size: 13px; color: #64748b; font-weight: 600;">Current Status:</td>
            <td style="padding: 6px 0;">
              <span style="display: inline-block; padding: 3px 10px; background-color: #fffbeb; color: #b45309; font-size: 11.5px; font-weight: 700; border-radius: 6px; border: 1px solid #fde68a;">
                UNDER REVIEW
              </span>
            </td>
          </tr>
        </table>
      </div>

      <!-- Review Timeline -->
      <div style="background: #ffffff; border: 1px solid #f1f5f9; border-radius: 8px; padding: 14px 16px; margin: 0 0 24px 0; text-align: left;">
        <p style="margin: 0 0 8px 0; font-size: 13px; font-weight: 700; color: #0f172a;">
          ⏱ What happens next?
        </p>
        <p style="margin: 0 0 6px 0; font-size: 12.5px; color: #475569; line-height: 1.5;">
          • The mentor & recruiting committee will evaluate your profile within <strong>2–3 business days</strong>.<br>
          • You will receive a direct email update once your application status changes.<br>
          • You can track live progress and submit additional portfolio links from your portal.
        </p>
      </div>

      <!-- Primary CTA Button -->
      <div style="text-align: center; margin: 24px 0 16px 0;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto; width: auto;">
          <tr>
            <td align="center" style="border-radius: 8px; background-color: #059669; box-shadow: 0 2px 8px rgba(5, 150, 105, 0.25);">
              <a href="${studentPortalUrl}" target="_blank" class="btn-responsive" style="display: inline-block; min-width: 210px; padding: 14px 34px; font-size: 14.5px; font-weight: 600; color: #ffffff !important; text-decoration: none; border-radius: 8px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, Helvetica, sans-serif; letter-spacing: 0.01em; text-align: center;">
                Track Application Status
              </a>
            </td>
          </tr>
        </table>
      </div>

      <!-- Direct Link Fallback -->
      <p style="text-align: center; font-size: 12px; color: #64748b; margin: 0 0 24px 0; line-height: 1.5;">
        Direct link: <a href="${studentPortalUrl}" target="_blank" style="color: #059669; word-break: break-all; text-decoration: underline;">${studentPortalUrl}</a>
      </p>

      <!-- Support Link -->
      <div style="border-top: 1px solid #f1f5f9; padding-top: 18px; font-size: 12.5px; color: #64748b; line-height: 1.5;">
        Questions regarding your application? <a href="mailto:i3.office2025@gmail.com" style="color: #059669; font-weight: 600; text-decoration: none;">Contact i3 Support</a>.
      </div>
    `,
  );
}

export function getInternshipApplicationStatusUpdateEmailTemplate(
  name: string,
  internshipTitle: string,
  status: string,
): string {
  const baseUrl = config.clientUrl || "https://www.iiinternship.in";
  const studentPortalUrl = `${baseUrl}/student/dashboard`;
  const userName = name && name.trim() ? name.trim() : "there";
  const upperStatus = (status || "UPDATED").toUpperCase();

  const isApproved = upperStatus === "APPROVED" || upperStatus === "ACCEPTED" || upperStatus === "SELECTED";
  const isRejected = upperStatus === "REJECTED" || upperStatus === "DECLINED";

  const badgeBg = isApproved ? "#ecfdf5" : isRejected ? "#fef2f2" : "#fffbeb";
  const badgeColor = isApproved ? "#059669" : isRejected ? "#dc2626" : "#b45309";
  const badgeBorder = isApproved ? "#a7f3d0" : isRejected ? "#fecaca" : "#fde68a";
  const topIcon = isApproved ? "🎉" : isRejected ? "ℹ️" : "🔔";

  return getBaseTemplate(
    `Application Status Update: ${internshipTitle} [${upperStatus}] — International Institute of Internship™`,
    `
      <!-- Top Icon / Badge -->
      <div style="text-align: center; margin: 0 0 16px 0;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto;">
          <tr>
            <td align="center" style="width: 44px; height: 44px; border-radius: 50%; background-color: ${badgeBg}; border: 1px solid ${badgeBorder}; text-align: center; vertical-align: middle;">
              <span style="font-size: 18px; line-height: 44px; display: inline-block;">${topIcon}</span>
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
        Hi ${userName},
      </p>

      <!-- Message -->
      <p style="font-size: 14.5px; color: #334155; line-height: 1.65; margin: 0 0 20px 0;">
        We are writing to notify you that the status of your internship application on the <strong>International Institute of Internship™ [i3]</strong> portal has been updated.
      </p>

      <!-- Status Card -->
      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 18px 20px; margin: 0 0 24px 0; text-align: left;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;">
          <tr>
            <td style="padding: 6px 0; font-size: 13px; color: #64748b; font-weight: 600; width: 140px;">Position:</td>
            <td style="padding: 6px 0; font-size: 13.5px; font-weight: 700; color: #0f172a;">
              ${internshipTitle}
            </td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-size: 13px; color: #64748b; font-weight: 600;">Current Status:</td>
            <td style="padding: 6px 0;">
              <span style="display: inline-block; padding: 4px 12px; background-color: ${badgeBg}; color: ${badgeColor}; font-size: 12px; font-weight: 700; border-radius: 6px; border: 1px solid ${badgeBorder};">
                ${upperStatus}
              </span>
            </td>
          </tr>
        </table>
      </div>

      <!-- Action Box -->
      <div style="background: #ffffff; border: 1px solid #f1f5f9; border-radius: 8px; padding: 14px 16px; margin: 0 0 24px 0; text-align: left;">
        <p style="margin: 0 0 6px 0; font-size: 13px; color: #475569; line-height: 1.5;">
          ${isApproved
            ? "Congratulations! Please log in to your dashboard to complete your enrollment steps and access your mentor onboarding materials."
            : isRejected
            ? "Although this particular cohort is filled, we encourage you to explore other available industry programs suited to your skillset."
            : "Please review the updated requirements and schedule directly from your student portal."}
        </p>
      </div>

      <!-- Primary CTA Button -->
      <div style="text-align: center; margin: 24px 0 16px 0;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto; width: auto;">
          <tr>
            <td align="center" style="border-radius: 8px; background-color: #059669; box-shadow: 0 2px 8px rgba(5, 150, 105, 0.25);">
              <a href="${studentPortalUrl}" target="_blank" class="btn-responsive" style="display: inline-block; min-width: 210px; padding: 14px 34px; font-size: 14.5px; font-weight: 600; color: #ffffff !important; text-decoration: none; border-radius: 8px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, Helvetica, sans-serif; letter-spacing: 0.01em; text-align: center;">
                View Application in Portal
              </a>
            </td>
          </tr>
        </table>
      </div>

      <!-- Direct Link Fallback -->
      <p style="text-align: center; font-size: 12px; color: #64748b; margin: 0 0 24px 0; line-height: 1.5;">
        Direct link: <a href="${studentPortalUrl}" target="_blank" style="color: #059669; word-break: break-all; text-decoration: underline;">${studentPortalUrl}</a>
      </p>

      <!-- Support Link -->
      <div style="border-top: 1px solid #f1f5f9; padding-top: 18px; font-size: 12.5px; color: #64748b; line-height: 1.5;">
        Have questions regarding this decision? <a href="mailto:i3.office2025@gmail.com" style="color: #059669; font-weight: 600; text-decoration: none;">Contact i3 Support</a>.
      </div>
    `,
  );
}

export function getInternshipPostingSubmittedForReviewEmailTemplate(
  name: string,
  internshipTitle: string,
): string {
  const baseUrl = config.clientUrl || "https://www.iiinternship.in";
  const dashboardUrl = `${baseUrl}/instructor/dashboard`;
  const userName = name && name.trim() ? name.trim() : "there";

  return getBaseTemplate(
    `Posting Under Review: ${internshipTitle} — International Institute of Internship™`,
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
        Internship Submitted for Review
      </h1>

      <!-- Personalized Greeting -->
      <p style="font-size: 15px; color: #1e293b; line-height: 1.6; margin: 0 0 12px 0;">
        Hi ${userName},
      </p>

      <!-- Message -->
      <p style="font-size: 14.5px; color: #334155; line-height: 1.65; margin: 0 0 20px 0;">
        Your new opportunity posting <strong>"${internshipTitle}"</strong> has been successfully submitted to the <strong>International Institute of Internship™ [i3]</strong> curation board.
      </p>

      <!-- Posting Details Card -->
      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 18px 20px; margin: 0 0 24px 0; text-align: left;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;">
          <tr>
            <td style="padding: 6px 0; font-size: 13px; color: #64748b; font-weight: 600; width: 140px;">Opportunity:</td>
            <td style="padding: 6px 0; font-size: 13.5px; font-weight: 700; color: #0f172a;">
              ${internshipTitle}
            </td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-size: 13px; color: #64748b; font-weight: 600;">Current Status:</td>
            <td style="padding: 6px 0;">
              <span style="display: inline-block; padding: 3px 10px; background-color: #fffbeb; color: #b45309; font-size: 11.5px; font-weight: 700; border-radius: 6px; border: 1px solid #fde68a;">
                PENDING VERIFICATION
              </span>
            </td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-size: 13px; color: #64748b; font-weight: 600;">Type:</td>
            <td style="padding: 6px 0; font-size: 13px; color: #334155; font-weight: 600;">
              Industry Verified Opportunity
            </td>
          </tr>
        </table>
      </div>

      <!-- Review Timeline -->
      <div style="background: #ffffff; border: 1px solid #f1f5f9; border-radius: 8px; padding: 14px 16px; margin: 0 0 24px 0; text-align: left;">
        <p style="margin: 0 0 8px 0; font-size: 13px; font-weight: 700; color: #0f172a;">
          ⏱ What happens next?
        </p>
        <p style="margin: 0 0 6px 0; font-size: 12.5px; color: #475569; line-height: 1.5;">
          • Our compliance & academic review board evaluates curriculum details within <strong>24 hours</strong>.<br>
          • You will receive an immediate email confirmation as soon as your listing goes live.<br>
          • Candidates across partnered institutions will be notified upon public publishing.
        </p>
      </div>

      <!-- Primary CTA Button -->
      <div style="text-align: center; margin: 24px 0 16px 0;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto; width: auto;">
          <tr>
            <td align="center" style="border-radius: 8px; background-color: #059669; box-shadow: 0 2px 8px rgba(5, 150, 105, 0.25);">
              <a href="${dashboardUrl}" target="_blank" class="btn-responsive" style="display: inline-block; min-width: 210px; padding: 14px 34px; font-size: 14.5px; font-weight: 600; color: #ffffff !important; text-decoration: none; border-radius: 8px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, Helvetica, sans-serif; letter-spacing: 0.01em; text-align: center;">
                View Posting in Dashboard
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
        Need to expedite posting approval? <a href="mailto:i3.office2025@gmail.com" style="color: #059669; font-weight: 600; text-decoration: none;">Contact i3 Support</a>.
      </div>
    `,
  );
}

export function getInternshipPostingApprovedEmailTemplate(
  name: string,
  internshipTitle: string,
): string {
  const baseUrl = config.clientUrl || "https://www.iiinternship.in";
  const dashboardUrl = `${baseUrl}/instructor/dashboard`;
  const userName = name && name.trim() ? name.trim() : "there";

  return getBaseTemplate(
    `Approved & Live: ${internshipTitle} — International Institute of Internship™`,
    `
      <!-- Top Icon / Badge -->
      <div style="text-align: center; margin: 0 0 16px 0;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto;">
          <tr>
            <td align="center" style="width: 44px; height: 44px; border-radius: 50%; background-color: #ecfdf5; border: 1px solid #d1fae5; text-align: center; vertical-align: middle;">
              <span style="font-size: 18px; line-height: 44px; display: inline-block;">📢</span>
            </td>
          </tr>
        </table>
      </div>

      <!-- Heading -->
      <h1 class="heading-responsive" style="color: #0f172a; font-size: 24px; font-weight: 700; margin: 0 0 16px 0; text-align: center; letter-spacing: -0.02em; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, Helvetica, sans-serif; line-height: 1.3;">
        Your Internship is Now Live!
      </h1>

      <!-- Personalized Greeting -->
      <p style="font-size: 15px; color: #1e293b; line-height: 1.6; margin: 0 0 12px 0;">
        Hi ${userName},
      </p>

      <!-- Message -->
      <p style="font-size: 14.5px; color: #334155; line-height: 1.65; margin: 0 0 20px 0;">
        Great news! Your opportunity posting <strong>"${internshipTitle}"</strong> has been approved by the <strong>International Institute of Internship™ [i3]</strong> administration and is now live on the public listings.
      </p>

      <!-- Live Listing Details Card -->
      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 18px 20px; margin: 0 0 24px 0; text-align: left;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;">
          <tr>
            <td style="padding: 6px 0; font-size: 13px; color: #64748b; font-weight: 600; width: 140px;">Listing:</td>
            <td style="padding: 6px 0; font-size: 13.5px; font-weight: 700; color: #0f172a;">
              ${internshipTitle}
            </td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-size: 13px; color: #64748b; font-weight: 600;">Status:</td>
            <td style="padding: 6px 0;">
              <span style="display: inline-block; padding: 3px 10px; background-color: #ecfdf5; color: #059669; font-size: 11.5px; font-weight: 700; border-radius: 6px; border: 1px solid #a7f3d0;">
                LIVE & ACCEPTING APPLICANTS
              </span>
            </td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-size: 13px; color: #64748b; font-weight: 600;">Audience:</td>
            <td style="padding: 6px 0; font-size: 13px; color: #334155; font-weight: 600;">
              Public Marketplace & Partner Universities
            </td>
          </tr>
        </table>
      </div>

      <!-- Applicant Tools -->
      <div style="background: #ffffff; border: 1px solid #f1f5f9; border-radius: 8px; padding: 14px 16px; margin: 0 0 24px 0; text-align: left;">
        <p style="margin: 0 0 8px 0; font-size: 13px; font-weight: 700; color: #0f172a;">
          🚀 Manage Your Cohort:
        </p>
        <p style="margin: 0 0 6px 0; font-size: 12.5px; color: #475569; line-height: 1.5;">
          • Candidates can now view your curriculum and submit their applications.<br>
          • Track incoming applicants, review resumes, and evaluate assessments live from your portal.
        </p>
      </div>

      <!-- Primary CTA Button -->
      <div style="text-align: center; margin: 24px 0 16px 0;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto; width: auto;">
          <tr>
            <td align="center" style="border-radius: 8px; background-color: #059669; box-shadow: 0 2px 8px rgba(5, 150, 105, 0.25);">
              <a href="${dashboardUrl}" target="_blank" class="btn-responsive" style="display: inline-block; min-width: 210px; padding: 14px 34px; font-size: 14.5px; font-weight: 600; color: #ffffff !important; text-decoration: none; border-radius: 8px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, Helvetica, sans-serif; letter-spacing: 0.01em; text-align: center;">
                Manage Listing & Applicants
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
        Have questions regarding listing management? <a href="mailto:i3.office2025@gmail.com" style="color: #059669; font-weight: 600; text-decoration: none;">Contact i3 Support</a>.
      </div>
    `,
  );
}

export function getOnCampusVirtualInternshipInterestEmailTemplate(
  name: string,
  internshipTitle: string,
  type: string,
): string {
  const baseUrl = config.clientUrl || "https://www.iiinternship.in";
  const dashboardUrl = `${baseUrl}/student/dashboard`;
  const userName = name && name.trim() ? name.trim() : "there";
  const programType = type && type.trim() ? type.trim() : "Virtual / On-Campus";

  return getBaseTemplate(
    `Interest Registered: ${internshipTitle} — International Institute of Internship™`,
    `
      <!-- Top Icon / Badge -->
      <div style="text-align: center; margin: 0 0 16px 0;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto;">
          <tr>
            <td align="center" style="width: 44px; height: 44px; border-radius: 50%; background-color: #ecfdf5; border: 1px solid #d1fae5; text-align: center; vertical-align: middle;">
              <span style="font-size: 18px; line-height: 44px; display: inline-block;">📋</span>
            </td>
          </tr>
        </table>
      </div>

      <!-- Heading -->
      <h1 class="heading-responsive" style="color: #0f172a; font-size: 24px; font-weight: 700; margin: 0 0 16px 0; text-align: center; letter-spacing: -0.02em; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, Helvetica, sans-serif; line-height: 1.3;">
        Expression of Interest Received
      </h1>

      <!-- Personalized Greeting -->
      <p style="font-size: 15px; color: #1e293b; line-height: 1.6; margin: 0 0 12px 0;">
        Hi ${userName},
      </p>

      <!-- Message -->
      <p style="font-size: 14.5px; color: #334155; line-height: 1.65; margin: 0 0 20px 0;">
        Thank you for submitting your expression of interest for our <strong>${programType} Internship</strong> program at the <strong>International Institute of Internship™ [i3]</strong>.
      </p>

      <!-- Program Interest Summary Card -->
      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 18px 20px; margin: 0 0 24px 0; text-align: left;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;">
          <tr>
            <td style="padding: 6px 0; font-size: 13px; color: #64748b; font-weight: 600; width: 140px;">Program Track:</td>
            <td style="padding: 6px 0; font-size: 13.5px; font-weight: 700; color: #0f172a;">
              ${internshipTitle}
            </td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-size: 13px; color: #64748b; font-weight: 600;">Delivery Mode:</td>
            <td style="padding: 6px 0; font-size: 13.5px; font-weight: 700; color: #059669;">
              ${programType}
            </td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-size: 13px; color: #64748b; font-weight: 600;">Application Status:</td>
            <td style="padding: 6px 0;">
              <span style="display: inline-block; padding: 3px 10px; background-color: #f0fdf4; color: #166534; font-size: 11.5px; font-weight: 700; border-radius: 6px; border: 1px solid #bbf7d0;">
                INTEREST LOGGED
              </span>
            </td>
          </tr>
        </table>
      </div>

      <!-- Next Steps Info Card -->
      <div style="background: #ffffff; border: 1px solid #f1f5f9; border-radius: 8px; padding: 14px 16px; margin: 0 0 24px 0; text-align: left;">
        <p style="margin: 0 0 8px 0; font-size: 13px; font-weight: 700; color: #0f172a;">
          📌 What Happens Next?
        </p>
        <p style="margin: 0 0 6px 0; font-size: 12.5px; color: #475569; line-height: 1.5;">
          • Our academic and industry partnership advisors will review your eligibility.<br>
          • You will receive batch schedules, curriculum outlines, and orientation details.<br>
          • Check your student dashboard anytime for real-time progress updates.
        </p>
      </div>

      <!-- Primary CTA Button -->
      <div style="text-align: center; margin: 24px 0 16px 0;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto; width: auto;">
          <tr>
            <td align="center" style="border-radius: 8px; background-color: #059669; box-shadow: 0 2px 8px rgba(5, 150, 105, 0.25);">
              <a href="${dashboardUrl}" target="_blank" class="btn-responsive" style="display: inline-block; min-width: 200px; padding: 14px 32px; font-size: 14.5px; font-weight: 600; color: #ffffff !important; text-decoration: none; border-radius: 8px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, Helvetica, sans-serif; letter-spacing: 0.01em; text-align: center;">
                View Student Dashboard
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
        Questions about our internship tracks? Contact the academic office at <a href="mailto:i3.office2025@gmail.com" style="color: #059669; font-weight: 600; text-decoration: none;">i3.office2025@gmail.com</a>.
      </div>
    `,
  );
}

export function getInternshipPaymentFailedEmailTemplate(
  name: string,
  internshipTitle: string,
  amount: number,
): string {
  const baseUrl = config.clientUrl || "https://www.iiinternship.in";
  const retryUrl = `${baseUrl}/student/dashboard`;
  const userName = name && name.trim() ? name.trim() : "there";
  const formattedAmount = Number(amount || 0).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return getBaseTemplate(
    `Payment Unsuccessful: ${internshipTitle} — International Institute of Internship™`,
    `
      <!-- Top Icon / Badge -->
      <div style="text-align: center; margin: 0 0 16px 0;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto;">
          <tr>
            <td align="center" style="width: 44px; height: 44px; border-radius: 50%; background-color: #fef2f2; border: 1px solid #fee2e2; text-align: center; vertical-align: middle;">
              <span style="font-size: 18px; line-height: 44px; display: inline-block;">⚠️</span>
            </td>
          </tr>
        </table>
      </div>

      <!-- Heading -->
      <h1 class="heading-responsive" style="color: #0f172a; font-size: 24px; font-weight: 700; margin: 0 0 16px 0; text-align: center; letter-spacing: -0.02em; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, Helvetica, sans-serif; line-height: 1.3;">
        Payment Unsuccessful
      </h1>

      <!-- Personalized Greeting -->
      <p style="font-size: 15px; color: #1e293b; line-height: 1.6; margin: 0 0 12px 0;">
        Hi ${userName},
      </p>

      <!-- Message -->
      <p style="font-size: 14.5px; color: #334155; line-height: 1.65; margin: 0 0 20px 0;">
        We were unable to process your enrollment transaction for <strong>${internshipTitle}</strong> on the <strong>International Institute of Internship™ [i3]</strong> platform.
      </p>

      <!-- Transaction Details Card -->
      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 18px 20px; margin: 0 0 20px 0; text-align: left;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;">
          <tr>
            <td style="padding: 6px 0; font-size: 13px; color: #64748b; font-weight: 600; width: 140px;">Program:</td>
            <td style="padding: 6px 0; font-size: 13.5px; font-weight: 700; color: #0f172a;">
              ${internshipTitle}
            </td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-size: 13px; color: #64748b; font-weight: 600;">Attempted Amount:</td>
            <td style="padding: 6px 0; font-size: 13.5px; font-weight: 700; color: #0f172a;">
              ₹${formattedAmount}
            </td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-size: 13px; color: #64748b; font-weight: 600;">Transaction Status:</td>
            <td style="padding: 6px 0;">
              <span style="display: inline-block; padding: 3px 10px; background-color: #fef2f2; color: #dc2626; font-size: 11.5px; font-weight: 700; border-radius: 6px; border: 1px solid #fecaca;">
                PAYMENT FAILED
              </span>
            </td>
          </tr>
        </table>
      </div>

      <!-- Banking Safeguard Notice -->
      <div style="background-color: #fffbeb; border-left: 3px solid #f59e0b; border-radius: 4px; padding: 12px 14px; margin: 0 0 24px 0; text-align: left;">
        <p style="margin: 0; font-size: 12.5px; color: #92400e; line-height: 1.5;">
          <strong>🛡️ Banking Safeguard:</strong> If any amount was deducted from your bank account or card during this attempt, your bank will automatically process a full reversal within 3–5 business days.
        </p>
      </div>

      <!-- Primary CTA Button -->
      <div style="text-align: center; margin: 24px 0 16px 0;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto; width: auto;">
          <tr>
            <td align="center" style="border-radius: 8px; background-color: #059669; box-shadow: 0 2px 8px rgba(5, 150, 105, 0.25);">
              <a href="${retryUrl}" target="_blank" class="btn-responsive" style="display: inline-block; min-width: 210px; padding: 14px 34px; font-size: 14.5px; font-weight: 600; color: #ffffff !important; text-decoration: none; border-radius: 8px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, Helvetica, sans-serif; letter-spacing: 0.01em; text-align: center;">
                Retry Program Enrollment
              </a>
            </td>
          </tr>
        </table>
      </div>

      <!-- Direct Link Fallback -->
      <p style="text-align: center; font-size: 12px; color: #64748b; margin: 0 0 24px 0; line-height: 1.5;">
        Direct link: <a href="${retryUrl}" target="_blank" style="color: #059669; word-break: break-all; text-decoration: underline;">${retryUrl}</a>
      </p>

      <!-- Support Link -->
      <div style="border-top: 1px solid #f1f5f9; padding-top: 18px; font-size: 12.5px; color: #64748b; line-height: 1.5;">
        Payment questions or need payment assistance? <a href="mailto:i3.office2025@gmail.com" style="color: #059669; font-weight: 600; text-decoration: none;">Contact i3 Support</a>.
      </div>
    `,
  );
}

export function getInternshipEnrollmentCompletedEmailTemplate(
  name: string,
  internshipTitle: string,
  companyName: string,
): string {
  const baseUrl = config.clientUrl || "https://www.iiinternship.in";
  const studentPortalUrl = `${baseUrl}/student/dashboard`;
  const userName = name && name.trim() ? name.trim() : "there";

  return getBaseTemplate(
    `Congratulations! Internship Completed: ${internshipTitle} — International Institute of Internship™`,
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
        Congratulations on Completion!
      </h1>

      <!-- Personalized Greeting -->
      <p style="font-size: 15px; color: #1e293b; line-height: 1.6; margin: 0 0 12px 0;">
        Hi ${userName},
      </p>

      <!-- Message -->
      <p style="font-size: 14.5px; color: #334155; line-height: 1.65; margin: 0 0 20px 0;">
        We are thrilled to celebrate your milestone! Your enrollment in <strong>${internshipTitle}</strong> in partnership with <strong>${companyName}</strong> on the <strong>International Institute of Internship™ [i3]</strong> platform has been marked as <strong>COMPLETED</strong>.
      </p>

      <!-- Program Summary Card -->
      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 18px 20px; margin: 0 0 24px 0; text-align: left;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;">
          <tr>
            <td style="padding: 6px 0; font-size: 13px; color: #64748b; font-weight: 600; width: 140px;">Program:</td>
            <td style="padding: 6px 0; font-size: 13.5px; font-weight: 700; color: #0f172a;">
              ${internshipTitle}
            </td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-size: 13px; color: #64748b; font-weight: 600;">Partner Company:</td>
            <td style="padding: 6px 0; font-size: 13.5px; font-weight: 700; color: #0f172a;">
              ${companyName}
            </td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-size: 13px; color: #64748b; font-weight: 600;">Completion Status:</td>
            <td style="padding: 6px 0;">
              <span style="display: inline-block; padding: 3px 10px; background-color: #ecfdf5; color: #059669; font-size: 11.5px; font-weight: 700; border-radius: 6px; border: 1px solid #a7f3d0;">
                COMPLETED & VERIFIED
              </span>
            </td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-size: 13px; color: #64748b; font-weight: 600;">Evaluation:</td>
            <td style="padding: 6px 0; font-size: 13px; color: #334155; font-weight: 600;">
              All Deliverables Approved by Mentor
            </td>
          </tr>
        </table>
      </div>

      <!-- Next Steps & Credential Info -->
      <div style="background: #ffffff; border: 1px solid #f1f5f9; border-radius: 8px; padding: 14px 16px; margin: 0 0 24px 0; text-align: left;">
        <p style="margin: 0 0 8px 0; font-size: 13px; font-weight: 700; color: #0f172a;">
          📜 What happens next?
        </p>
        <p style="margin: 0 0 6px 0; font-size: 12.5px; color: #475569; line-height: 1.5;">
          • Your official tamper-proof <strong>Certificate of Completion</strong> will be issued to your portal shortly.<br>
          • You can add your verified credential and skill badges directly to LinkedIn and your professional resume.
        </p>
      </div>

      <!-- Primary CTA Button -->
      <div style="text-align: center; margin: 24px 0 16px 0;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto; width: auto;">
          <tr>
            <td align="center" style="border-radius: 8px; background-color: #059669; box-shadow: 0 2px 8px rgba(5, 150, 105, 0.25);">
              <a href="${studentPortalUrl}" target="_blank" class="btn-responsive" style="display: inline-block; min-width: 210px; padding: 14px 34px; font-size: 14.5px; font-weight: 600; color: #ffffff !important; text-decoration: none; border-radius: 8px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, Helvetica, sans-serif; letter-spacing: 0.01em; text-align: center;">
                View Completed Program
              </a>
            </td>
          </tr>
        </table>
      </div>

      <!-- Direct Link Fallback -->
      <p style="text-align: center; font-size: 12px; color: #64748b; margin: 0 0 24px 0; line-height: 1.5;">
        Direct link: <a href="${studentPortalUrl}" target="_blank" style="color: #059669; word-break: break-all; text-decoration: underline;">${studentPortalUrl}</a>
      </p>

      <!-- Support Link -->
      <div style="border-top: 1px solid #f1f5f9; padding-top: 18px; font-size: 12.5px; color: #64748b; line-height: 1.5;">
        Have questions regarding certificate issuance? <a href="mailto:i3.office2025@gmail.com" style="color: #059669; font-weight: 600; text-decoration: none;">Contact i3 Support</a>.
      </div>
    `,
  );
}

export function getCertificateIssuedEmailTemplate(
  name: string,
  internshipTitle: string,
  certificateNo: string,
): string {
  const baseUrl = config.clientUrl || "https://www.iiinternship.in";
  const studentPortalUrl = `${baseUrl}/student/dashboard`;
  const userName = name && name.trim() ? name.trim() : "there";

  return getBaseTemplate(
    `Official Certificate Issued: ${internshipTitle} [${certificateNo}] — International Institute of Internship™`,
    `
      <!-- Top Icon / Badge -->
      <div style="text-align: center; margin: 0 0 16px 0;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto;">
          <tr>
            <td align="center" style="width: 44px; height: 44px; border-radius: 50%; background-color: #ecfdf5; border: 1px solid #d1fae5; text-align: center; vertical-align: middle;">
              <span style="font-size: 18px; line-height: 44px; display: inline-block;">📜</span>
            </td>
          </tr>
        </table>
      </div>

      <!-- Heading -->
      <h1 class="heading-responsive" style="color: #0f172a; font-size: 24px; font-weight: 700; margin: 0 0 16px 0; text-align: center; letter-spacing: -0.02em; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, Helvetica, sans-serif; line-height: 1.3;">
        Official Certificate Issued
      </h1>

      <!-- Personalized Greeting -->
      <p style="font-size: 15px; color: #1e293b; line-height: 1.6; margin: 0 0 12px 0;">
        Hi ${userName},
      </p>

      <!-- Message -->
      <p style="font-size: 14.5px; color: #334155; line-height: 1.65; margin: 0 0 20px 0;">
        Your official verified Certificate of Completion for <strong>${internshipTitle}</strong> has been generated and permanently issued by the <strong>International Institute of Internship™ [i3]</strong>.
      </p>

      <!-- Certificate Credential Card -->
      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 18px 20px; margin: 0 0 24px 0; text-align: left;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;">
          <tr>
            <td style="padding: 6px 0; font-size: 13px; color: #64748b; font-weight: 600; width: 140px;">Program:</td>
            <td style="padding: 6px 0; font-size: 13.5px; font-weight: 700; color: #0f172a;">
              ${internshipTitle}
            </td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-size: 13px; color: #64748b; font-weight: 600;">Certificate ID:</td>
            <td style="padding: 6px 0; font-size: 14px; font-weight: 700; color: #059669; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;">
              ${certificateNo}
            </td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-size: 13px; color: #64748b; font-weight: 600;">Verification:</td>
            <td style="padding: 6px 0;">
              <span style="display: inline-block; padding: 3px 10px; background-color: #ecfdf5; color: #059669; font-size: 11.5px; font-weight: 700; border-radius: 6px; border: 1px solid #a7f3d0;">
                AUTHENTICATED & VERIFIED
              </span>
            </td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-size: 13px; color: #64748b; font-weight: 600;">Issuing Body:</td>
            <td style="padding: 6px 0; font-size: 13px; color: #334155; font-weight: 600;">
              International Institute of Internship™ [i3]
            </td>
          </tr>
        </table>
      </div>

      <!-- Credential Sharing Guide -->
      <div style="background: #ffffff; border: 1px solid #f1f5f9; border-radius: 8px; padding: 14px 16px; margin: 0 0 24px 0; text-align: left;">
        <p style="margin: 0 0 8px 0; font-size: 13px; font-weight: 700; color: #0f172a;">
          🌟 Credential Verification & Sharing:
        </p>
        <p style="margin: 0 0 6px 0; font-size: 12.5px; color: #475569; line-height: 1.5;">
          • Download your high-resolution vector PDF certificate with verified QR code.<br>
          • Add your credential to your LinkedIn profile and professional resume.<br>
          • Employers can verify this certificate anytime using your Certificate ID.
        </p>
      </div>

      <!-- Primary CTA Button -->
      <div style="text-align: center; margin: 24px 0 16px 0;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto; width: auto;">
          <tr>
            <td align="center" style="border-radius: 8px; background-color: #059669; box-shadow: 0 2px 8px rgba(5, 150, 105, 0.25);">
              <a href="${studentPortalUrl}" target="_blank" class="btn-responsive" style="display: inline-block; min-width: 220px; padding: 14px 34px; font-size: 14.5px; font-weight: 600; color: #ffffff !important; text-decoration: none; border-radius: 8px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, Helvetica, sans-serif; letter-spacing: 0.01em; text-align: center;">
                View & Download Certificate
              </a>
            </td>
          </tr>
        </table>
      </div>

      <!-- Direct Link Fallback -->
      <p style="text-align: center; font-size: 12px; color: #64748b; margin: 0 0 24px 0; line-height: 1.5;">
        Direct link: <a href="${studentPortalUrl}" target="_blank" style="color: #059669; word-break: break-all; text-decoration: underline;">${studentPortalUrl}</a>
      </p>

      <!-- Support Link -->
      <div style="border-top: 1px solid #f1f5f9; padding-top: 18px; font-size: 12.5px; color: #64748b; line-height: 1.5;">
        Need certificate verification help? <a href="mailto:i3.office2025@gmail.com" style="color: #059669; font-weight: 600; text-decoration: none;">Contact i3 Support</a>.
      </div>
    `,
  );
}
