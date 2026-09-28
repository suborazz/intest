import { config } from "@/x/a948e663";

import { getBaseTemplate } from "@/x/0c6e1403";

function formatRoleName(role: string): string {
  switch (role) {
    case "STUDENT":
      return "Student / Trainee";
    case "INSTRUCTOR":
      return "Instructor / Mentor";
    case "IMMERSION_USER":
      return "Immersion Participant";
    case "RECRUIT_USER":
      return "Job Applicant / Recruiter";
    case "SUPER_ADMIN":
      return "Super Admin";
    default:
      return role;
  }
}

export function getWelcomeEmailTemplate(name: string, role: string): string {
  const roleDisplay = formatRoleName(role);
  const baseUrl = config.clientUrl || "https://www.iiinternship.in";
  const loginUrl = `${baseUrl}/login`;
  const userName = name && name.trim() ? name.trim() : "there";

  return getBaseTemplate(
    "Welcome to International Institute of Internship™",
    `
      <!-- Welcome Icon Indicator -->
      <div style="text-align: center; margin: 0 0 16px 0;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto;">
          <tr>
            <td align="center" style="width: 44px; height: 44px; border-radius: 50%; background-color: #ecfdf5; border: 1px solid #d1fae5; text-align: center; vertical-align: middle;">
              <span style="font-size: 18px; line-height: 44px; display: inline-block;">🎓</span>
            </td>
          </tr>
        </table>
      </div>

      <!-- Heading (26px, Clean Charcoal) -->
      <h1 class="heading-responsive" style="color: #0f172a; font-size: 26px; font-weight: 700; margin: 0 0 22px 0; text-align: center; letter-spacing: -0.02em; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, Helvetica, sans-serif; line-height: 1.3;">
        Welcome to i3 Platform
      </h1>

      <!-- Personalized Greeting -->
      <p style="font-size: 15px; color: #1e293b; line-height: 1.6; margin: 0 0 14px 0;">
        Hi ${userName},
      </p>

      <!-- Body Copy -->
      <p style="font-size: 15px; color: #334155; line-height: 1.65; margin: 0 0 22px 0;">
        Thank you for joining the <strong>International Institute of Internship™</strong>. Your account has been registered successfully.
      </p>

      <!-- Account Role Card -->
      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px 18px; margin: 0 0 24px 0; text-align: left;">
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td style="font-size: 13px; color: #64748b; font-weight: 500;">
              Registered Account Role:
            </td>
            <td align="right" style="font-size: 13px; font-weight: 700; color: #059669;">
              ${roleDisplay}
            </td>
          </tr>
        </table>
      </div>

      <!-- Getting Started Checklist -->
      <div style="margin: 0 0 28px 0; text-align: left;">
        <p style="margin: 0 0 10px 0; font-size: 12.5px; font-weight: 700; color: #334155; text-transform: uppercase; letter-spacing: 0.04em;">
          Next Steps to Get Started:
        </p>
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td style="padding: 5px 0; font-size: 13.5px; color: #475569; line-height: 1.5;">
              ✅ <strong>Complete Profile</strong> — Access your official Digital ID Card.
            </td>
          </tr>
          <tr>
            <td style="padding: 5px 0; font-size: 13.5px; color: #475569; line-height: 1.5;">
              💼 <strong>Explore Internships</strong> — Apply for verified domain opportunities.
            </td>
          </tr>
          <tr>
            <td style="padding: 5px 0; font-size: 13.5px; color: #475569; line-height: 1.5;">
              📜 <strong>Earn Credentials</strong> — Complete milestones and earn digital certificates.
            </td>
          </tr>
        </table>
      </div>

      <!-- Primary CTA Button -->
      <div style="text-align: center; margin: 28px 0 24px 0;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto; width: auto;">
          <tr>
            <td align="center" style="border-radius: 8px; background-color: #059669; box-shadow: 0 2px 8px rgba(5, 150, 105, 0.25);">
              <a href="${loginUrl}" target="_blank" class="btn-responsive" style="display: inline-block; min-width: 190px; padding: 14px 36px; font-size: 14.5px; font-weight: 600; color: #ffffff !important; text-decoration: none; border-radius: 8px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, Helvetica, sans-serif; letter-spacing: 0.01em; text-align: center;">
                Access my portal
              </a>
            </td>
          </tr>
        </table>
      </div>

      <!-- Support Link -->
      <div style="border-top: 1px solid #f1f5f9; padding-top: 18px; font-size: 12.5px; color: #64748b; line-height: 1.5;">
        Need assistance getting started? <a href="mailto:i3.office2025@gmail.com" style="color: #059669; font-weight: 600; text-decoration: none;">Contact i3 Support</a>.
      </div>
    `,
  );
}

export function getImmersionWelcomeEmailTemplate(name: string): string {
  const baseUrl = config.clientUrl || "https://www.iiinternship.in";
  const dashboardUrl = `${baseUrl}/immersion/dashboard`;
  const userName = name && name.trim() ? name.trim() : "there";

  return getBaseTemplate(
    "Welcome to the Immersion Program — International Institute of Internship™",
    `
      <!-- Top Icon / Badge -->
      <div style="text-align: center; margin: 0 0 16px 0;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto;">
          <tr>
            <td align="center" style="width: 44px; height: 44px; border-radius: 50%; background-color: #ecfdf5; border: 1px solid #d1fae5; text-align: center; vertical-align: middle;">
              <span style="font-size: 18px; line-height: 44px; display: inline-block;">🚀</span>
            </td>
          </tr>
        </table>
      </div>

      <!-- Heading -->
      <h1 class="heading-responsive" style="color: #0f172a; font-size: 24px; font-weight: 700; margin: 0 0 16px 0; text-align: center; letter-spacing: -0.02em; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, Helvetica, sans-serif; line-height: 1.3;">
        Welcome to the Immersion Program
      </h1>

      <!-- Personalized Greeting -->
      <p style="font-size: 15px; color: #1e293b; line-height: 1.6; margin: 0 0 12px 0;">
        Hi ${userName},
      </p>

      <!-- Welcome Message -->
      <p style="font-size: 14.5px; color: #334155; line-height: 1.65; margin: 0 0 20px 0;">
        Congratulations! Your registration for the <strong>International Institute of Internship™ [i3] Immersion Program</strong> has been successfully processed. We are thrilled to partner with you on this intensive career advancement journey.
      </p>

      <!-- Program Highlights Card -->
      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 18px 20px; margin: 0 0 24px 0; text-align: left;">
        <p style="margin: 0 0 12px 0; font-size: 13.5px; font-weight: 700; color: #0f172a; letter-spacing: -0.01em;">
          🌟 What to Expect in Your Immersion Journey:
        </p>
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;">
          <tr>
            <td style="vertical-align: top; padding: 4px 8px 8px 0; width: 22px; font-size: 14px;">🌐</td>
            <td style="font-size: 13px; color: #475569; line-height: 1.5; padding-bottom: 8px;">
              <strong>Industry-Aligned Projects:</strong> Work on practical case studies and production-grade deliverables.
            </td>
          </tr>
          <tr>
            <td style="vertical-align: top; padding: 4px 8px 8px 0; width: 22px; font-size: 14px;">👥</td>
            <td style="font-size: 13px; color: #475569; line-height: 1.5; padding-bottom: 8px;">
              <strong>Expert Mentorship:</strong> Direct guidance, periodic reviews, and interactive AMA sessions.
            </td>
          </tr>
          <tr>
            <td style="vertical-align: top; padding: 4px 8px 0 0; width: 22px; font-size: 14px;">📜</td>
            <td style="font-size: 13px; color: #475569; line-height: 1.5;">
              <strong>Verified Credentials:</strong> Earn your recognized Digital Certificate and program badge upon completion.
            </td>
          </tr>
        </table>
      </div>

      <!-- Primary CTA Button -->
      <div style="text-align: center; margin: 24px 0 16px 0;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto; width: auto;">
          <tr>
            <td align="center" style="border-radius: 8px; background-color: #059669; box-shadow: 0 2px 8px rgba(5, 150, 105, 0.25);">
              <a href="${dashboardUrl}" target="_blank" class="btn-responsive" style="display: inline-block; min-width: 210px; padding: 14px 34px; font-size: 14.5px; font-weight: 600; color: #ffffff !important; text-decoration: none; border-radius: 8px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, Helvetica, sans-serif; letter-spacing: 0.01em; text-align: center;">
                Launch Immersion Dashboard
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
        Have questions or need technical support? <a href="mailto:i3.office2025@gmail.com" style="color: #059669; font-weight: 600; text-decoration: none;">Contact i3 Support</a>.
      </div>
    `,
  );
}

export function getPasswordResetEmailTemplate(
  token: string,
  name?: string,
  clientUrl?: string,
): string {
  const baseUrl = clientUrl || config.clientUrl || "https://www.iiinternship.in";
  const resetUrl = `${baseUrl}/reset-password?token=${token}`;
  const userName = name && name.trim() ? name.trim() : "there";

  return getBaseTemplate(
    "Reset your password — International Institute of Internship™",
    `
      <!-- Security Icon Indicator -->
      <div style="text-align: center; margin: 0 0 16px 0;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto;">
          <tr>
            <td align="center" style="width: 44px; height: 44px; border-radius: 50%; background-color: #ecfdf5; border: 1px solid #d1fae5; text-align: center; vertical-align: middle;">
              <span style="font-size: 18px; line-height: 44px; display: inline-block;">🔒</span>
            </td>
          </tr>
        </table>
      </div>

      <!-- Heading (26px, Clean Charcoal) -->
      <h1 class="heading-responsive" style="color: #0f172a; font-size: 26px; font-weight: 700; margin: 0 0 22px 0; text-align: center; letter-spacing: -0.02em; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, Helvetica, sans-serif; line-height: 1.3;">
        Reset your password
      </h1>

      <!-- Personalized Greeting -->
      <p style="font-size: 15px; color: #1e293b; line-height: 1.6; margin: 0 0 14px 0;">
        Hi ${userName},
      </p>

      <!-- Body Copy -->
      <p style="font-size: 15px; color: #334155; line-height: 1.65; margin: 0 0 28px 0;">
        We received a request to reset the password for your <strong>International Institute of Internship™</strong> account.
      </p>

      <!-- Primary CTA Button (Prominent Green Button ~48px height, ~200px width, responsive on mobile) -->
      <div style="text-align: center; margin: 28px 0 16px 0;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto; width: auto;">
          <tr>
            <td align="center" style="border-radius: 8px; background-color: #059669; box-shadow: 0 2px 8px rgba(5, 150, 105, 0.25);">
              <a href="${resetUrl}" target="_blank" class="btn-responsive" style="display: inline-block; min-width: 190px; padding: 14px 36px; font-size: 14.5px; font-weight: 600; color: #ffffff !important; text-decoration: none; border-radius: 8px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, Helvetica, sans-serif; letter-spacing: 0.01em; text-align: center;">
                Reset my password
              </a>
            </td>
          </tr>
        </table>
      </div>

      <!-- Expiration Note -->
      <p style="text-align: center; font-size: 12.5px; color: #64748b; margin: 0 0 28px 0; line-height: 1.5;">
        ⏱ This password reset link expires in 1 hour.
      </p>

      <!-- Fallback URL Section -->
      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px 18px; margin: 0 0 24px 0; text-align: left;">
        <p style="margin: 0 0 3px 0; font-size: 12px; font-weight: 600; color: #475569;">
          Having trouble with the button?
        </p>
        <p style="margin: 0 0 8px 0; font-size: 12px; color: #64748b; line-height: 1.4;">
          Copy and paste this link into your browser:
        </p>
        <a href="${resetUrl}" target="_blank" style="font-size: 11.5px; color: #059669; word-break: break-all; word-wrap: break-word; overflow-wrap: break-word; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; text-decoration: underline; line-height: 1.5; display: block;">
          ${resetUrl}
        </a>
      </div>

      <!-- Security Message -->
      <p style="font-size: 13px; color: #64748b; line-height: 1.6; margin: 0 0 22px 0;">
        If you didn&apos;t request this password reset, you can safely ignore this email. Your password will remain unchanged.
      </p>

      <!-- Support Link -->
      <div style="border-top: 1px solid #f1f5f9; padding-top: 18px; font-size: 12.5px; color: #64748b; line-height: 1.5;">
        Need help? <a href="mailto:i3.office2025@gmail.com" style="color: #059669; font-weight: 600; text-decoration: none;">Contact i3 Support</a>.
      </div>
    `,
  );
}

export function getAdminCreatedUserEmailTemplate(
  email: string,
  name: string,
  tempPass: string,
  role: string,
): string {
  const roleDisplay = formatRoleName(role);
  const baseUrl = config.clientUrl || "https://www.iiinternship.in";
  const loginUrl = `${baseUrl}/login`;
  const userName = name && name.trim() ? name.trim() : "there";

  return getBaseTemplate(
    "Your Account Has Been Created — International Institute of Internship™",
    `
      <!-- Top Icon / Badge -->
      <div style="text-align: center; margin: 0 0 16px 0;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto;">
          <tr>
            <td align="center" style="width: 44px; height: 44px; border-radius: 50%; background-color: #ecfdf5; border: 1px solid #d1fae5; text-align: center; vertical-align: middle;">
              <span style="font-size: 18px; line-height: 44px; display: inline-block;">🔑</span>
            </td>
          </tr>
        </table>
      </div>

      <!-- Heading -->
      <h1 class="heading-responsive" style="color: #0f172a; font-size: 24px; font-weight: 700; margin: 0 0 16px 0; text-align: center; letter-spacing: -0.02em; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, Helvetica, sans-serif; line-height: 1.3;">
        Your Account Has Been Created
      </h1>

      <!-- Personalized Greeting -->
      <p style="font-size: 15px; color: #1e293b; line-height: 1.6; margin: 0 0 12px 0;">
        Hi ${userName},
      </p>

      <!-- Message -->
      <p style="font-size: 14.5px; color: #334155; line-height: 1.65; margin: 0 0 20px 0;">
        An administrator has provisioned an official <strong>International Institute of Internship™ [i3]</strong> account for you. Below are your account details and temporary login credentials:
      </p>

      <!-- Credentials Card -->
      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 18px 20px; margin: 0 0 20px 0; text-align: left;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;">
          <tr>
            <td style="padding: 6px 0; font-size: 13px; color: #64748b; font-weight: 600; width: 140px;">Assigned Role:</td>
            <td style="padding: 6px 0;">
              <span style="display: inline-block; padding: 3px 10px; background-color: #ecfdf5; color: #059669; font-size: 12px; font-weight: 700; border-radius: 6px; border: 1px solid #a7f3d0;">
                ${roleDisplay}
              </span>
            </td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-size: 13px; color: #64748b; font-weight: 600;">Login Email:</td>
            <td style="padding: 6px 0; font-size: 13.5px; font-weight: 700; color: #0f172a; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;">
              ${email}
            </td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-size: 13px; color: #64748b; font-weight: 600;">Temp Password:</td>
            <td style="padding: 6px 0; font-size: 13.5px; font-weight: 700; color: #059669; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;">
              ${tempPass}
            </td>
          </tr>
        </table>
      </div>

      <!-- Security Notice Box -->
      <div style="background-color: #fffbeb; border-left: 3px solid #f59e0b; border-radius: 4px; padding: 12px 14px; margin: 0 0 24px 0; text-align: left;">
        <p style="margin: 0; font-size: 12.5px; color: #92400e; line-height: 1.5;">
          <strong>Security Note:</strong> For your protection, please log in and update your temporary password immediately upon your first sign-in.
        </p>
      </div>

      <!-- Primary CTA Button -->
      <div style="text-align: center; margin: 24px 0 16px 0;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto; width: auto;">
          <tr>
            <td align="center" style="border-radius: 8px; background-color: #059669; box-shadow: 0 2px 8px rgba(5, 150, 105, 0.25);">
              <a href="${loginUrl}" target="_blank" class="btn-responsive" style="display: inline-block; min-width: 200px; padding: 14px 34px; font-size: 14.5px; font-weight: 600; color: #ffffff !important; text-decoration: none; border-radius: 8px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, Helvetica, sans-serif; letter-spacing: 0.01em; text-align: center;">
                Log In to Your Account
              </a>
            </td>
          </tr>
        </table>
      </div>

      <!-- Direct Link Fallback -->
      <p style="text-align: center; font-size: 12px; color: #64748b; margin: 0 0 24px 0; line-height: 1.5;">
        Direct link: <a href="${loginUrl}" target="_blank" style="color: #059669; word-break: break-all; text-decoration: underline;">${loginUrl}</a>
      </p>

      <!-- Support Link -->
      <div style="border-top: 1px solid #f1f5f9; padding-top: 18px; font-size: 12.5px; color: #64748b; line-height: 1.5;">
        Need help logging in? <a href="mailto:i3.office2025@gmail.com" style="color: #059669; font-weight: 600; text-decoration: none;">Contact i3 Support</a>.
      </div>
    `,
  );
}

export function getProfileCompletionReminderEmailTemplate(
  name: string,
  role: string,
  clientUrl?: string,
): string {
  const roleDisplay = formatRoleName(role);
  const baseUrl = clientUrl || config.clientUrl || "https://www.iiinternship.in";
  const loginUrl = `${baseUrl}/login`;
  const userName = name && name.trim() ? name.trim() : "there";

  return getBaseTemplate(
    "Action Required: Complete Your Profile — International Institute of Internship™",
    `
      <!-- Top Icon / Badge -->
      <div style="text-align: center; margin: 0 0 16px 0;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto;">
          <tr>
            <td align="center" style="width: 44px; height: 44px; border-radius: 50%; background-color: #fffbeb; border: 1px solid #fef3c7; text-align: center; vertical-align: middle;">
              <span style="font-size: 18px; line-height: 44px; display: inline-block;">📝</span>
            </td>
          </tr>
        </table>
      </div>

      <!-- Heading -->
      <h1 class="heading-responsive" style="color: #0f172a; font-size: 24px; font-weight: 700; margin: 0 0 16px 0; text-align: center; letter-spacing: -0.02em; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, Helvetica, sans-serif; line-height: 1.3;">
        Please Complete Your Profile
      </h1>

      <!-- Personalized Greeting -->
      <p style="font-size: 15px; color: #1e293b; line-height: 1.6; margin: 0 0 12px 0;">
        Hi ${userName},
      </p>

      <!-- Message -->
      <p style="font-size: 14.5px; color: #334155; line-height: 1.65; margin: 0 0 20px 0;">
        You have successfully registered on the <strong>International Institute of Internship™ [i3]</strong> platform as an <strong>${roleDisplay}</strong>. However, our records show that your <strong>One-Time Profile Registration</strong> is still incomplete.
      </p>

      <!-- Benefits Card -->
      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 18px 20px; margin: 0 0 24px 0; text-align: left;">
        <p style="margin: 0 0 12px 0; font-size: 13.5px; font-weight: 700; color: #0f172a; letter-spacing: -0.01em;">
          🌟 Why complete your profile today?
        </p>
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;">
          <tr>
            <td style="vertical-align: top; padding: 4px 8px 8px 0; width: 22px; font-size: 14px;">🪪</td>
            <td style="font-size: 13px; color: #475569; line-height: 1.5; padding-bottom: 8px;">
              <strong>Official Digital ID:</strong> Unlock your customized dashboard and verified digital credentials.
            </td>
          </tr>
          <tr>
            <td style="vertical-align: top; padding: 4px 8px 8px 0; width: 22px; font-size: 14px;">💼</td>
            <td style="font-size: 13px; color: #475569; line-height: 1.5; padding-bottom: 8px;">
              <strong>Direct Program Access:</strong> Apply directly to curated global internship and mentorship programs.
            </td>
          </tr>
          <tr>
            <td style="vertical-align: top; padding: 4px 8px 0 0; width: 22px; font-size: 14px;">📜</td>
            <td style="font-size: 13px; color: #475569; line-height: 1.5;">
              <strong>Verified Certificates:</strong> Enable automated issuance of digital certificates upon completion.
            </td>
          </tr>
        </table>
      </div>

      <!-- Primary CTA Button -->
      <div style="text-align: center; margin: 24px 0 16px 0;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto; width: auto;">
          <tr>
            <td align="center" style="border-radius: 8px; background-color: #059669; box-shadow: 0 2px 8px rgba(5, 150, 105, 0.25);">
              <a href="${loginUrl}" target="_blank" class="btn-responsive" style="display: inline-block; min-width: 210px; padding: 14px 34px; font-size: 14.5px; font-weight: 600; color: #ffffff !important; text-decoration: none; border-radius: 8px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, Helvetica, sans-serif; letter-spacing: 0.01em; text-align: center;">
                Complete Your Profile Now
              </a>
            </td>
          </tr>
        </table>
      </div>

      <!-- Direct Link Fallback -->
      <p style="text-align: center; font-size: 12px; color: #64748b; margin: 0 0 20px 0; line-height: 1.5;">
        Direct link: <a href="${loginUrl}" target="_blank" style="color: #059669; word-break: break-all; text-decoration: underline;">${loginUrl}</a>
      </p>

      <!-- Disregard note -->
      <p style="font-size: 12px; color: #94a3b8; text-align: center; margin: 0 0 20px 0; line-height: 1.5;">
        If you have already completed your registration, you can safely disregard this notice.
      </p>

      <!-- Support Link -->
      <div style="border-top: 1px solid #f1f5f9; padding-top: 18px; font-size: 12.5px; color: #64748b; line-height: 1.5;">
        Need help? <a href="mailto:i3.office2025@gmail.com" style="color: #059669; font-weight: 600; text-decoration: none;">Contact i3 Support</a>.
      </div>
    `,
  );
}
