import { getBaseTemplate } from "@/x/0c6e1403";

export function getJobApplicationSubmittedEmailTemplate(
  jobTitle: string,
  companyName: string,
): string {
  return getBaseTemplate(
    "Application Received",
    `
      <h2 class="title">Application Received</h2>
      <p>Thank you for expressing interest in the <strong>${jobTitle}</strong> opening at <strong>${companyName}</strong>. We have successfully received your application and resume.</p>
      <p>Our recruitment team will review your qualifications. If your profile matches our requirements, we will reach out to you.</p>
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
): string {
  let customContent = "";
  if (message) {
    customContent += `<p><strong>Message from Recruiter:</strong></p><blockquote style="border-left: 3px solid #6366f1; padding-left: 12px; margin: 12px 0; color: #4b5563; font-style: italic;">${message}</blockquote>`;
  }
  if (link) {
    customContent += `<p><strong>Important Link:</strong> <a href="${link}" target="_blank" style="color: #6366f1; text-decoration: underline;">${link}</a></p>`;
  }
  if (attachmentUrl) {
    customContent += `<p style="margin-top: 14px;"><a href="${attachmentUrl}" target="_blank" style="display: inline-block; background-color: #4f46e5; color: white; padding: 6px 12px; font-size: 12px; font-weight: bold; text-decoration: none; border-radius: 6px;">Download Attached Document</a></p>`;
  }

  return getBaseTemplate(
    "Job Application Update",
    `
      <h2 class="title">Application Status Update</h2>
      <p>Your application status for the position of <strong>${jobTitle}</strong> at <strong>${companyName}</strong> has been updated to:</p>
      <div style="text-align: center; margin: 20px 0;">
        <span class="badge" style="background-color: ${status === "SHORTLISTED" ? "#10b981" : status === "REJECTED" ? "#ef4444" : "#f59e0b"}; padding: 8px 16px; font-size: 14px;">${status}</span>
      </div>
      ${customContent}
      <p>Please log in to your candidate portal or reply to this email if you have any questions.</p>
    `,
  );
}
