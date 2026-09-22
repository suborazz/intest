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
  return getBaseTemplate(
    "Welcome to IIInternship™",
    `
      <h2 style="color: #0f172a; font-size: 22px; font-weight: 700; margin-top: 0; margin-bottom: 16px; text-align: center;">
        Welcome to IIInternship, ${name}! 🎉
      </h2>
      <p style="font-size: 15px; color: #334155; line-height: 1.6; margin-bottom: 16px;">
        Thank you for joining our global platform. Your account has been created successfully with the role of <strong style="color: #0284c7;">${roleDisplay}</strong>.
      </p>
      <p style="font-size: 14px; color: #475569; line-height: 1.6; margin-bottom: 24px;">
        You can now log in and access your personalized dashboard to explore verified internships, courses, and opportunities.
      </p>
      <div style="text-align: center; margin: 28px 0;">
        <a href="${baseUrl}/login" style="display: inline-block; padding: 14px 32px; background-color: #0284c7; color: #ffffff !important; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 15px; box-shadow: 0 4px 10px rgba(2, 132, 199, 0.3);">
          👉 Access Your Portal
        </a>
      </div>
    `,
  );
}

export function getImmersionWelcomeEmailTemplate(name: string): string {
  const baseUrl = config.clientUrl || "https://www.iiinternship.in";
  return getBaseTemplate(
    "Welcome to Immersion Program — IIInternship™",
    `
      <h2 style="color: #0f172a; font-size: 22px; font-weight: 700; margin-top: 0; margin-bottom: 16px; text-align: center;">
        Welcome to the Immersion Program! 🚀
      </h2>
      <p style="font-size: 15px; color: #334155; line-height: 1.6; margin-bottom: 16px;">
        Hello ${name},
      </p>
      <p style="font-size: 14px; color: #475569; line-height: 1.6; margin-bottom: 24px;">
        We are thrilled to welcome you to our exclusive Immersion Program. Your registration has been received and processed successfully.
      </p>
      <div style="text-align: center; margin: 28px 0;">
        <a href="${baseUrl}/login" style="display: inline-block; padding: 14px 32px; background-color: #0284c7; color: #ffffff !important; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 15px; box-shadow: 0 4px 10px rgba(2, 132, 199, 0.3);">
          👉 Launch Immersion Dashboard
        </a>
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
  return getBaseTemplate(
    "Reset Your Password — IIInternship™",
    `
      <h2 style="color: #0f172a; font-size: 22px; font-weight: 700; margin-top: 0; margin-bottom: 16px; text-align: center;">
        Password Reset Request 🔐
      </h2>
      <p style="font-size: 15px; color: #334155; line-height: 1.6; margin-bottom: 16px;">
        Hello ${name || "User"},
      </p>
      <p style="font-size: 14px; color: #475569; line-height: 1.6; margin-bottom: 24px;">
        We received a request to reset the password for your IIInternship account. Click the button below to set a new password. This link will expire in 1 hour.
      </p>
      <div style="text-align: center; margin: 28px 0;">
        <a href="${resetUrl}" target="_blank" style="display: inline-block; padding: 14px 32px; background-color: #0284c7; color: #ffffff !important; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 15px; box-shadow: 0 4px 10px rgba(2, 132, 199, 0.3);">
          Reset Password
        </a>
      </div>
      <p style="font-size: 12px; color: #94a3b8; text-align: center;">
        If you did not request this change, you can safely ignore this email.
      </p>
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
  return getBaseTemplate(
    "Your Account Details — IIInternship™",
    `
      <h2 style="color: #0f172a; font-size: 22px; font-weight: 700; margin-top: 0; margin-bottom: 16px; text-align: center;">
        Your Account has been Created 🎉
      </h2>
      <p style="font-size: 15px; color: #334155; line-height: 1.6; margin-bottom: 16px;">
        Hello ${name || "User"},
      </p>
      <p style="font-size: 14px; color: #475569; line-height: 1.6; margin-bottom: 20px;">
        An administrator has set up an account for you on the IIInternship platform with the role of <strong style="color: #0284c7;">${roleDisplay}</strong>.
      </p>
      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 18px 20px; margin: 20px 0;">
        <div style="margin-bottom: 8px; font-size: 14px;"><strong style="color: #475569; display: inline-block; width: 140px;">Email:</strong> <span style="font-family: monospace; font-weight: bold; color: #0f172a;">${email}</span></div>
        <div style="font-size: 14px;"><strong style="color: #475569; display: inline-block; width: 140px;">Temp Password:</strong> <span style="font-family: monospace; font-weight: bold; color: #0f172a;">${tempPass}</span></div>
      </div>
      <div style="text-align: center; margin: 28px 0;">
        <a href="${loginUrl}" style="display: inline-block; padding: 14px 32px; background-color: #0284c7; color: #ffffff !important; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 15px; box-shadow: 0 4px 10px rgba(2, 132, 199, 0.3);">
          👉 Log In and Set Permanent Password
        </a>
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

  return getBaseTemplate(
    "Complete Your Profile — IIInternship™",
    `
      <div style="text-align: center; margin-bottom: 24px;">
        <span style="display: inline-block; background-color: #fef3c7; color: #b45309; font-size: 12px; font-weight: 700; padding: 6px 14px; border-radius: 9999px; text-transform: uppercase; letter-spacing: 0.05em; border: 1px solid #fde68a;">
          ⚠️ Action Required • Profile Incomplete
        </span>
      </div>

      <h2 class="title" style="text-align: center; font-size: 22px; color: #0f172a; margin-bottom: 8px;">
        Please Complete Your Registration Profile
      </h2>
      <p style="text-align: center; color: #64748b; font-size: 14px; margin-top: 0; margin-bottom: 24px;">
        Finish setting up your account to unlock all platform features and opportunities.
      </p>

      <div style="background-color: #f8fafc; border-left: 4px solid #3b82f6; padding: 18px 20px; border-radius: 0 12px 12px 0; margin-bottom: 24px;">
        <p style="margin: 0; font-size: 15px; color: #1e293b; font-weight: 600;">
          Hello ${name || "Valued User"},
        </p>
        <p style="margin: 10px 0 0 0; font-size: 14px; color: #475569; line-height: 1.6;">
          You have successfully registered an account on the <strong>International Institute of Internship™ (IIInternship)</strong> platform as a <span style="color: #2563eb; font-weight: 600;">${roleDisplay}</span>.
        </p>
        <p style="margin: 8px 0 0 0; font-size: 13px; color: #64748b; line-height: 1.5;">
          However, our records show that your <strong>One-Time Registration Profile</strong> has not been completed yet. Completing your profile is required before you can access all portal features.
        </p>
      </div>

      <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
        <p style="font-size: 14px; color: #334155; font-weight: 700; margin: 0 0 10px 0;">
          🌟 Why complete your profile today?
        </p>
        <ul style="font-size: 13px; color: #475569; padding-left: 20px; margin: 0; line-height: 1.8;">
          <li>Access your customized dashboard and official <strong>Digital ID Card</strong>.</li>
          <li>Apply directly to curated global internship and mentorship programs.</li>
          <li>Receive verified digital certificates and skill credentials.</li>
        </ul>
      </div>

      <!-- Login Panel Callout Box -->
      <div style="background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%); border: 2px solid #10b981; border-radius: 16px; padding: 26px 20px; text-align: center; margin: 28px 0; box-shadow: 0 4px 6px -1px rgba(16, 185, 129, 0.1);">
        <h3 style="margin: 0 0 8px 0; font-size: 17px; color: #065f46; font-weight: 700;">
          Log In to Update Your Profile
        </h3>
        <p style="margin: 0 0 20px 0; font-size: 13px; color: #047857;">
          Click the button below to sign in and complete your registration details:
        </p>

        <a href="${loginUrl}" style="display: inline-block; padding: 14px 34px; background-color: #059669; color: #ffffff !important; text-decoration: none; border-radius: 10px; font-weight: 700; font-size: 15px; box-shadow: 0 4px 14px 0 rgba(5, 150, 105, 0.35); letter-spacing: 0.02em;">
          👉 Login to IIInternship Portal
        </a>

        <div style="margin-top: 20px; padding-top: 14px; border-top: 1px solid #d1fae5;">
          <span style="font-size: 11px; color: #065f46; display: block; margin-bottom: 4px; font-weight: 600;">
            Direct Portal Login URL:
          </span>
          <a href="${loginUrl}" style="color: #059669; font-size: 12px; word-break: break-all; font-family: monospace; text-decoration: underline;">
            ${loginUrl}
          </a>
        </div>
      </div>

      <p style="font-size: 12px; color: #94a3b8; text-align: center; margin-top: 20px; margin-bottom: 0;">
        If you have recently completed your registration, please feel free to disregard this notice.<br>
        Need help? Contact our support team directly from the portal.
      </p>
    `,
  );
}
