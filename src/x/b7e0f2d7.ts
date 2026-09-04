import fs from "fs";
import nodemailer from "nodemailer";
import { join } from "path";

import { config } from "@/x/a948e663";
import {
  getAdminCreatedUserEmailTemplate,
  getImmersionWelcomeEmailTemplate,
  getPasswordResetEmailTemplate,
  getWelcomeEmailTemplate,
} from "@/x/30518a43";
import { getDonationReceiptEmailTemplate } from "@/x/8946c807";
import {
  getCertificateIssuedEmailTemplate,
  getInstructorProfileRegistrationCompletionEmailTemplate,
  getInternshipApplicationStatusUpdateEmailTemplate,
  getInternshipApplicationSubmittedEmailTemplate,
  getInternshipEnrollmentCompletedEmailTemplate,
  getInternshipPaymentFailedEmailTemplate,
  getInternshipPostingApprovedEmailTemplate,
  getInternshipPostingSubmittedForReviewEmailTemplate,
  getOnCampusVirtualInternshipInterestEmailTemplate,
  getPaymentConfirmationEmailTemplate,
  getStudentProfileRegistrationCompletionEmailTemplate,
} from "@/x/bd125197";
import {
  getJobApplicationStatusUpdateEmailTemplate,
  getJobApplicationSubmittedEmailTemplate,
} from "@/x/4984c9d7";
import {
  getAdminPublishedNoticeNotificationEmailTemplate,
  getInstructorBroadcastedNoticeNotificationEmailTemplate,
} from "@/x/7a73406d";
import { getJobPlacementLeadConfirmationEmailTemplate } from "@/x/1b847801";
import {
  getSupportTicketReceivedEmailTemplate,
  getSupportTicketReplyEmailTemplate,
  getSupportTicketStatusUpdateEmailTemplate,
} from "@/x/e53030a7";

const transporter = nodemailer.createTransport({
  host: config.smtpHost,
  port: config.smtpPort,
  secure: config.smtpPort === 465, 
  auth: {
    user: config.smtpUser,
    pass: config.smtpPass,
  },
});

export async function verifyEmailConnection(): Promise<boolean> {
  try {
    if (!config.smtpUser || config.smtpUser === "mock-user") {
      return false;
    }
    await transporter.verify();
    return true;
  } catch {
    return false;
  }
}

export interface SendEmailPayload {
  to: { email: string; name?: string }[];
  subject: string;
  htmlContent: string;
  attachment?: { content: string; name: string }[] | undefined;
}

export async function sendEmail(payload: SendEmailPayload): Promise<boolean> {
  const { nodeEnv, smtpSenderEmail, smtpSenderName } = config;

    if (
    !config.smtpUser ||
    config.smtpUser === "mock-user" ||
    nodeEnv === "test"
  ) {
    console.log("\n======================================================");
    console.log(
      "[MOCK EMAIL] Simulating email dispatch (SMTP not configured or Test Env):",
    );
    console.log(
      `[MOCK EMAIL] Sender: "${smtpSenderName}" <${smtpSenderEmail}>`,
    );
    console.log(
      `[MOCK EMAIL] Recipient: ${payload.to.map((t) => t.email).join(", ")}`,
    );
    console.log(`[MOCK EMAIL] Subject: ${payload.subject}`);
    if (payload.attachment) {
      console.log(
        `[MOCK EMAIL] Attachments: ${payload.attachment.map((a) => a.name).join(", ")}`,
      );
    }
    console.log("------------------------------------------------------");
    console.log(payload.htmlContent);
    console.log("======================================================\n");
    return true;
  }

  try {
    const mailOptions = {
      from: `"${smtpSenderName}" <${smtpSenderEmail}>`,
      to: payload.to
        .map((t) => (t.name ? `"${t.name}" <${t.email}>` : t.email))
        .join(", "),
      subject: payload.subject,
      html: payload.htmlContent,
      attachments: payload.attachment
        ? payload.attachment.map((att) => ({
            filename: att.name,
            content: Buffer.from(att.content, "base64"),
          }))
        : [],
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error(
      "[Email Service] Failed to send email via SMTP/Nodemailer:",
      error,
    );
    return false;
  }
}

export async function sendWelcomeEmail(
  email: string,
  name: string,
  role: string,
): Promise<boolean> {
  const htmlContent = getWelcomeEmailTemplate(name, role);
  return sendEmail({
    to: [{ email, name }],
    subject: "Welcome to IIInternship! 🎉",
    htmlContent,
  });
}

export async function sendImmersionWelcomeEmail(
  email: string,
  name: string,
): Promise<boolean> {
  const htmlContent = getImmersionWelcomeEmailTemplate(name);
  return sendEmail({
    to: [{ email, name }],
    subject: "Welcome to IIInternship Immersion Program! 🚀",
    htmlContent,
  });
}

export async function sendPasswordResetEmail(
  email: string,
  token: string,
  name?: string,
  clientUrl?: string,
): Promise<boolean> {
  const htmlContent = getPasswordResetEmailTemplate(token, name, clientUrl);
  return sendEmail({
    to: [{ email, ...(name ? { name } : {}) }],
    subject: "Reset Your Password — IIInternship",
    htmlContent,
  });
}

export async function sendAdminCreatedUserEmail(
  email: string,
  name: string,
  tempPass: string,
  role: string,
): Promise<boolean> {
  const htmlContent = getAdminCreatedUserEmailTemplate(
    email,
    name,
    tempPass,
    role,
  );
  return sendEmail({
    to: [{ email, name }],
    subject: "Your Account Has Been Created — IIInternship",
    htmlContent,
  });
}

export async function sendPaymentConfirmationEmail(
  email: string,
  name: string,
  internshipTitle: string,
  amount: number,
  paymentId: string,
): Promise<boolean> {
  const htmlContent = getPaymentConfirmationEmailTemplate(
    name,
    internshipTitle,
    amount,
    paymentId,
  );
  return sendEmail({
    to: [{ email, name }],
    subject: `Payment Confirmed: ${internshipTitle} — IIInternship`,
    htmlContent,
  });
}

export async function sendDonationReceiptEmail(
  email: string,
  name: string,
  amount: number,
  receiptBuffer: Buffer,
): Promise<boolean> {
  let attachmentPayload: { content: string; name: string }[] | undefined;

  try {
    const base64Content = receiptBuffer.toString("base64");
    attachmentPayload = [
      {
        content: base64Content,
        name: `80G_Donation_Receipt_${name.replace(/\s+/g, "_")}.pdf`,
      },
    ];
  } catch (err) {
    console.error("[Email Service] Failed to attach donation receipt:", err);
  }

  const htmlContent = getDonationReceiptEmailTemplate(name, amount);
  return sendEmail({
    to: [{ email, name }],
    subject: `Thank You for Your Donation — IIInternship Trust`,
    htmlContent,
    attachment: attachmentPayload,
  });
}

export async function sendJobApplicationSubmittedEmail(
  email: string,
  name: string,
  jobTitle: string,
  companyName: string,
): Promise<boolean> {
  const htmlContent = getJobApplicationSubmittedEmailTemplate(
    jobTitle,
    companyName,
  );
  return sendEmail({
    to: [{ email, name }],
    subject: `Application Received: ${jobTitle} — ${companyName}`,
    htmlContent,
  });
}

export async function sendJobApplicationStatusUpdateEmail(
  email: string,
  name: string,
  jobTitle: string,
  companyName: string,
  status: string,
  message?: string,
  attachmentUrl?: string,
  link?: string,
): Promise<boolean> {
  const htmlContent = getJobApplicationStatusUpdateEmailTemplate(
    jobTitle,
    companyName,
    status,
    message,
    attachmentUrl,
    link,
  );
  return sendEmail({
    to: [{ email, name }],
    subject: `Update on your application for ${jobTitle} — ${companyName}`,
    htmlContent,
  });
}

export async function sendSupportTicketReceivedEmail(
  email: string,
  name: string,
  ticketNo: string,
  title: string,
  description: string,
): Promise<boolean> {
  const htmlContent = getSupportTicketReceivedEmailTemplate(
    ticketNo,
    title,
    description,
  );
  return sendEmail({
    to: [{ email, name }],
    subject: `[Support Ticket: ${ticketNo}] ${title}`,
    htmlContent,
  });
}

export async function sendSupportTicketStatusUpdateEmail(
  email: string,
  name: string,
  ticketNo: string,
  title: string,
  status: string,
): Promise<boolean> {
  const htmlContent = getSupportTicketStatusUpdateEmailTemplate(
    ticketNo,
    title,
    status,
  );
  return sendEmail({
    to: [{ email, name }],
    subject: `Update: Ticket ${ticketNo} is ${status}`,
    htmlContent,
  });
}

export async function sendSupportTicketReplyEmail(
  email: string,
  name: string,
  ticketNo: string,
  title: string,
  replyMessage: string,
): Promise<boolean> {
  const htmlContent = getSupportTicketReplyEmailTemplate(
    ticketNo,
    title,
    replyMessage,
  );
  return sendEmail({
    to: [{ email, name }],
    subject: `Reply: Support Ticket ${ticketNo} — ${title}`,
    htmlContent,
  });
}

export async function sendJobPlacementLeadConfirmationEmail(
  email: string,
  name: string,
  companyName: string,
): Promise<boolean> {
  const htmlContent = getJobPlacementLeadConfirmationEmailTemplate(companyName);
  return sendEmail({
    to: [{ email, name }],
    subject: `Placement Interest Confirmed — ${companyName}`,
    htmlContent,
  });
}

export async function sendInstructorProfileRegistrationCompletionEmail(
  email: string,
  name: string,
  instructorId: string,
): Promise<boolean> {
  const htmlContent = getInstructorProfileRegistrationCompletionEmailTemplate(
    name,
    instructorId,
  );
  return sendEmail({
    to: [{ email, name }],
    subject: `Instructor Onboarding Submitted: ID ${instructorId}`,
    htmlContent,
  });
}

export async function sendStudentProfileRegistrationCompletionEmail(
  email: string,
  name: string,
  studentId: string,
): Promise<boolean> {
  const htmlContent = getStudentProfileRegistrationCompletionEmailTemplate(
    name,
    studentId,
  );
  return sendEmail({
    to: [{ email, name }],
    subject: `Student Profile Completed: ID ${studentId}`,
    htmlContent,
  });
}

export async function sendInternshipApplicationSubmittedEmail(
  email: string,
  name: string,
  internshipTitle: string,
  companyName: string,
): Promise<boolean> {
  const htmlContent = getInternshipApplicationSubmittedEmailTemplate(
    name,
    internshipTitle,
    companyName,
  );
  return sendEmail({
    to: [{ email, name }],
    subject: `Applied successfully: ${internshipTitle} — ${companyName}`,
    htmlContent,
  });
}

export async function sendInternshipApplicationStatusUpdateEmail(
  email: string,
  name: string,
  internshipTitle: string,
  status: string,
): Promise<boolean> {
  const htmlContent = getInternshipApplicationStatusUpdateEmailTemplate(
    name,
    internshipTitle,
    status,
  );
  return sendEmail({
    to: [{ email, name }],
    subject: `Application Status Update: ${internshipTitle} is ${status}`,
    htmlContent,
  });
}

export async function sendInternshipPostingSubmittedForReviewEmail(
  email: string,
  name: string,
  internshipTitle: string,
): Promise<boolean> {
  const htmlContent = getInternshipPostingSubmittedForReviewEmailTemplate(
    name,
    internshipTitle,
  );
  return sendEmail({
    to: [{ email, name }],
    subject: `Posting Review: "${internshipTitle}" — IIInternship`,
    htmlContent,
  });
}

export async function sendInternshipPostingApprovedEmail(
  email: string,
  name: string,
  internshipTitle: string,
): Promise<boolean> {
  const htmlContent = getInternshipPostingApprovedEmailTemplate(
    name,
    internshipTitle,
  );
  return sendEmail({
    to: [{ email, name }],
    subject: `Approved: "${internshipTitle}" is now live! 📢`,
    htmlContent,
  });
}

export async function sendAdminPublishedNoticeNotificationEmail(
  email: string,
  name: string,
  title: string,
  category: string,
  description: string,
  pdfUrl: string | null,
): Promise<boolean> {
  const htmlContent = getAdminPublishedNoticeNotificationEmailTemplate(
    title,
    category,
    description,
    pdfUrl,
  );
  return sendEmail({
    to: [{ email, name }],
    subject: `Official Notice: ${title} [${category}]`,
    htmlContent,
  });
}

export async function sendInstructorBroadcastedNoticeNotificationEmail(
  email: string,
  name: string,
  instructorName: string,
  title: string,
  category: string,
  description: string,
): Promise<boolean> {
  const htmlContent = getInstructorBroadcastedNoticeNotificationEmailTemplate(
    instructorName,
    title,
    category,
    description,
  );
  return sendEmail({
    to: [{ email, name }],
    subject: `Class Update: ${title} by ${instructorName}`,
    htmlContent,
  });
}

export async function sendOnCampusVirtualInternshipInterestEmail(
  email: string,
  name: string,
  internshipTitle: string,
  type: string,
): Promise<boolean> {
  const htmlContent = getOnCampusVirtualInternshipInterestEmailTemplate(
    name,
    internshipTitle,
    type,
  );
  return sendEmail({
    to: [{ email, name }],
    subject: `Interest Received: ${internshipTitle} (${type})`,
    htmlContent,
  });
}

export async function sendInternshipPaymentFailedEmail(
  email: string,
  name: string,
  internshipTitle: string,
  amount: number,
): Promise<boolean> {
  const htmlContent = getInternshipPaymentFailedEmailTemplate(
    name,
    internshipTitle,
    amount,
  );
  return sendEmail({
    to: [{ email, name }],
    subject: `Enrollment Payment Failed: ${internshipTitle}`,
    htmlContent,
  });
}

export async function sendInternshipEnrollmentCompletedEmail(
  email: string,
  name: string,
  internshipTitle: string,
  companyName: string,
): Promise<boolean> {
  const htmlContent = getInternshipEnrollmentCompletedEmailTemplate(
    name,
    internshipTitle,
    companyName,
  );
  return sendEmail({
    to: [{ email, name }],
    subject: `Congratulations! Internship Completed: ${internshipTitle}`,
    htmlContent,
  });
}

export async function sendCertificateIssuedEmail(
  email: string,
  name: string,
  internshipTitle: string,
  certificateNo: string,
): Promise<boolean> {
  const htmlContent = getCertificateIssuedEmailTemplate(
    name,
    internshipTitle,
    certificateNo,
  );
  return sendEmail({
    to: [{ email, name }],
    subject: `Certificate Issued: ${internshipTitle} (${certificateNo})`,
    htmlContent,
  });
}

export async function sendProfileCompletionReminderEmail(
  email: string,
  name: string,
  role: string,
): Promise<boolean> {
  const loginUrl = `${config.clientUrl}/login`;
  const roleDisplay = role.replace("_", " ");
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="hi">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>प्रोफाइल अपडेट रिमाइंडर | Profile Completion Reminder</title>
      <style>
        body { font-family: 'Outfit', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1e293b; margin: 0; padding: 0; background-color: #f1f5f9; }
        .wrapper { max-width: 600px; margin: 24px auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 36px 32px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
        .header { text-align: center; border-bottom: 2px solid #f1f5f9; padding-bottom: 20px; margin-bottom: 28px; }
        .logo { font-size: 26px; font-weight: 800; color: #0284c7; text-decoration: none; letter-spacing: -0.5px; }
        .logo span { color: #10b981; }
        .badge { display: inline-block; background-color: #fef3c7; color: #b45309; font-weight: 700; font-size: 13px; padding: 4px 12px; border-radius: 9999px; margin-bottom: 12px; border: 1px solid #fde68a; }
        .title { color: #0f172a; font-size: 22px; font-weight: 700; margin-top: 0; margin-bottom: 16px; }
        .alert-box { background-color: #fffbeb; border-left: 5px solid #f59e0b; padding: 14px 18px; border-radius: 6px; margin: 20px 0; }
        .alert-text-hi { font-size: 16px; font-weight: 700; color: #92400e; margin: 0 0 4px 0; }
        .alert-text-en { font-size: 14px; color: #b45309; margin: 0; }
        .content-text { font-size: 15px; color: #334155; line-height: 1.7; margin: 16px 0; }
        .login-box { background: #f0fdf4; border: 2px solid #22c55e; border-radius: 12px; padding: 24px 20px; text-align: center; margin: 28px 0; box-shadow: 0 2px 4px rgba(34, 197, 94, 0.08); }
        .login-box-title { color: #15803d; font-size: 17px; font-weight: 700; margin: 0 0 10px 0; }
        .login-box-desc { font-size: 14px; color: #166534; margin: 0 0 18px 0; }
        .button { display: inline-block; padding: 14px 34px; background-color: #16a34a; color: #ffffff !important; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 16px; box-shadow: 0 4px 12px rgba(22, 163, 74, 0.3); transition: background-color 0.2s; }
        .url-box { background: #ffffff; border: 1px solid #bbf7d0; border-radius: 6px; padding: 10px 14px; margin-top: 16px; word-break: break-all; }
        .url-label { font-size: 12px; color: #64748b; margin-bottom: 4px; display: block; font-weight: 600; }
        .url-link { color: #0284c7; font-weight: 600; font-size: 14px; text-decoration: underline; }
        .note { font-size: 12px; color: #64748b; margin-top: 14px; margin-bottom: 0; }
        .footer { font-size: 12px; color: #64748b; margin-top: 36px; border-top: 1px solid #e2e8f0; padding-top: 20px; text-align: center; line-height: 1.6; }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="header">
          <a href="${config.clientUrl}" class="logo">II<span>Internship</span></a>
        </div>
        
        <div style="text-align: center;">
          <span class="badge">⚠️ रिमाईन्डर / Action Required</span>
        </div>
        
        <h2 class="title" style="text-align: center;">प्रोफाइल पूर्णता रिमाइंडर | Complete Your Profile</h2>
        
        <p style="font-size: 15px; color: #1e293b; margin-top: 20px;">
          प्रिय / Dear <strong>${name || "User"}</strong>,
        </p>

        <!-- हिंदी में मुख्य सूचना -->
        <div class="alert-box">
          <p class="alert-text-hi">
            📌 आपका प्रोफाइल अभी तक नहीं भरा गया है। कृपया शीघ्र अपना प्रोफाइल अपडेट करें।
          </p>
          <p class="alert-text-en">
            Your profile has not been completed yet. Please update your profile as soon as possible.
          </p>
        </div>

        <p class="content-text">
          आपने International Institute of Internship™ (IIInternship) पर <strong>${roleDisplay}</strong> के रूप में सफलतापूर्वक साइनअप किया है, परंतु आपका वन-टाइम (One-Time) प्रोफाइल रजिस्ट्रेशन अभी अधूरा है।
        </p>
        <p class="content-text" style="font-size: 14px; color: #475569;">
          नोट: इंटर्नशिप में आवेदन करने, ट्रेनिंग मॉड्यूल्स, सर्टिफिकेट्स एवं आईडी कार्ड प्राप्त करने के लिए प्रोफाइल पूरा करना अनिवार्य है।
        </p>

        <!-- लॉगिन पैनल का बॉक्स -->
        <div class="login-box">
          <h3 class="login-box-title">🔐 लॉगिन पैनल लिंक (Login Panel)</h3>
          <p class="login-box-desc">
            कृपया नीचे दिए गए बटन पर क्लिक करके अपने खाते में लॉगिन करें और अपनी प्रोफाइल पूरी करें:
          </p>
          <div>
            <a href="${loginUrl}" class="button" target="_blank">
              पोर्टल में लॉगिन करें (Log In to Portal)
            </a>
          </div>
          <div class="url-box">
            <span class="url-label">लॉगिन पैनल का सीधा लिंक (Direct Login Link):</span>
            <a href="${loginUrl}" class="url-link" target="_blank">${loginUrl}</a>
          </div>
          <p class="note">
            (यदि पासवर्ड याद न हो तो लॉगिन पेज पर <strong>"Forgot Password?"</strong> विकल्प का उपयोग करें)
          </p>
        </div>

        <div class="footer">
          <p><strong>International Institute of Internship™</strong><br>Empowering Global Internships & Skill Development</p>
          <p style="margin-top: 8px;">यह एक सिस्टम जनरेटेड ईमेल है, कृपया इसका उत्तर न दें।<br>&copy; ${new Date().getFullYear()} IIInternship. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail({
    to: [{ email, name }],
    subject: "महत्वपूर्ण: आपका प्रोफाइल अभी तक नहीं भरा गया है - कृपया शीघ्र अपडेट करें | Complete Your Profile",
    htmlContent,
  });
}

