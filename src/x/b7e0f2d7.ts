import fs from "fs";
import nodemailer from "nodemailer";
import { join } from "path";

import { config } from "@/x/a948e663";
import {
  getAdminCreatedUserEmailTemplate,
  getImmersionWelcomeEmailTemplate,
  getPasswordResetEmailTemplate,
  getProfileCompletionReminderEmailTemplate,
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
  const htmlContent = getProfileCompletionReminderEmailTemplate(
    name,
    role,
    config.clientUrl,
  );

  return sendEmail({
    to: [{ email, name }],
    subject: "Action Required: Complete Your IIInternship™ Profile",
    htmlContent,
  });
}

