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
    case "SUPER_ADMIN":
      return "Super Admin";
    default:
      return role;
  }
}

export function getWelcomeEmailTemplate(name: string, role: string): string {
  const roleDisplay = formatRoleName(role);
  return getBaseTemplate(
    "Welcome to IIInternship",
    `
      <h2 class="title">Welcome to IIInternship, ${name}! 🎉</h2>
      <p>Thank you for registering on our platform. Your account has been created successfully with the role of <span class="highlight">${roleDisplay}</span>.</p>
      <p>You can now log in and access your portal to explore internships, courses, and opportunities tailored just for you.</p>
      <div style="text-align: center;">
        <a href="${config.clientUrl}/login" class="button">Access Your Portal</a>
      </div>
    `,
  );
}

export function getImmersionWelcomeEmailTemplate(name: string): string {
  return getBaseTemplate(
    "Welcome to Immersion Program",
    `
      <h2 class="title">Welcome to the Immersion Program! 🚀</h2>
      <p>Hello ${name},</p>
      <p>We are thrilled to welcome you to our exclusive Immersion Program. Your registration has been received and processed successfully.</p>
      <p>Get ready to gain hands-on experience, collaborate on exciting industry projects, and accelerate your career.</p>
      <div style="text-align: center;">
        <a href="${config.clientUrl}/login" class="button">Launch Immersion Dashboard</a>
      </div>
    `,
  );
}

export function getPasswordResetEmailTemplate(
  token: string,
  name?: string,
  clientUrl?: string,
): string {
  const baseUrl = clientUrl || config.clientUrl;
  const resetUrl = `${baseUrl}/reset-password?token=${token}`;
  return getBaseTemplate(
    "Reset Your Password",
    `
      <h2 class="title">Password Reset Request</h2>
      <p>Hello ${name || "User"},</p>
      <p>We received a request to reset the password for your IIInternship account.</p>
      <p>Please click the button below to choose a new password. This link is valid for 1 hour.</p>
      <div style="text-align: center;">
        <a href="${resetUrl}" class="button" target="_blank">Reset Password</a>
      </div>
      <p>If you did not request this change, you can safely ignore this email.</p>
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
  const loginUrl = `${config.clientUrl}/login`;
  return getBaseTemplate(
    "Account Created",
    `
      <h2 class="title">Your Account has been Created</h2>
      <p>Hello ${name || "User"},</p>
      <p>An administrator has created an account for you on the IIInternship platform as a <strong>${roleDisplay}</strong>.</p>
      <p>Please use the temporary credentials below to log in and set up your permanent password:</p>
      <div class="credentials">
        <div class="credential-item"><span class="label">Email:</span> <span class="value">${email}</span></div>
        <div class="credential-item"><span class="label">Temp Password:</span> <span class="value">${tempPass}</span></div>
      </div>
      <div style="text-align: center;">
        <a href="${loginUrl}" class="button">Log In and Change Password</a>
      </div>
    `,
  );
}
