import { config } from "@/x/a948e663";

import { getBaseTemplate } from "@/x/0c6e1403";

export function getPaymentConfirmationEmailTemplate(
  name: string,
  internshipTitle: string,
  amount: number,
  paymentId: string,
): string {
  return getBaseTemplate(
    "Payment Confirmed",
    `
      <h2 class="title">Payment Successful! 🎉</h2>
      <p>Hello ${name || "Student"},</p>
      <p>We are excited to confirm your enrollment! Your payment for the following internship has been successfully processed.</p>
      <table class="details-table">
        <tr><th>Internship</th><td>${internshipTitle}</td></tr>
        <tr><th>Amount Paid</th><td>INR ${amount.toFixed(2)}</td></tr>
        <tr><th>Payment ID</th><td><code>${paymentId}</code></td></tr>
        <tr><th>Status</th><td><span class="badge">COMPLETED</span></td></tr>
      </table>
      <p>You can now access all course modules, projects, and connect with your mentor from your student dashboard.</p>
      <div style="text-align: center;">
        <a href="${config.clientUrl}/student/dashboard" class="button">Go To Dashboard</a>
      </div>
    `,
  );
}

export function getInstructorProfileRegistrationCompletionEmailTemplate(
  name: string,
  instructorId: string,
): string {
  return getBaseTemplate(
    "Instructor Registration Complete",
    `
      <h2 class="title">Instructor Profile Submitted!</h2>
      <p>Hello ${name},</p>
      <p>Your detailed instructor profile and onboarding documentation have been submitted successfully.</p>
      <div class="credentials">
        <div class="credential-item"><span class="label">Instructor ID:</span> <span class="value">${instructorId}</span></div>
      </div>
      <p>Our administrator panel is reviewing your credentials. We will activate your dashboard once verified.</p>
    `,
  );
}

export function getStudentProfileRegistrationCompletionEmailTemplate(
  name: string,
  studentId: string,
): string {
  return getBaseTemplate(
    "Student Registration Complete",
    `
      <h2 class="title">Student Registration Successful!</h2>
      <p>Hello ${name},</p>
      <p>Your detailed student registration profile, academic details, and documents have been received successfully.</p>
      <div class="credentials">
        <div class="credential-item"><span class="label">Student ID:</span> <span class="value">${studentId}</span></div>
      </div>
      <p>Your profile is fully configured. You can now apply for internships, verify certificates, and receive updates.</p>
      <div style="text-align: center;">
        <a href="${config.clientUrl}/student/dashboard" class="button">Visit Student Portal</a>
      </div>
    `,
  );
}

export function getInternshipApplicationSubmittedEmailTemplate(
  name: string,
  internshipTitle: string,
  companyName: string,
): string {
  return getBaseTemplate(
    "Internship Application Submitted",
    `
      <h2 class="title">Internship Application Submitted</h2>
      <p>Hello ${name},</p>
      <p>You have successfully applied for the internship: <strong>${internshipTitle}</strong> at <strong>${companyName}</strong>.</p>
      <p>Your application is currently <strong>UNDER REVIEW</strong>. The assigned instructor or admin will review your application soon.</p>
    `,
  );
}

export function getInternshipApplicationStatusUpdateEmailTemplate(
  name: string,
  internshipTitle: string,
  status: string,
): string {
  return getBaseTemplate(
    "Application Update",
    `
      <h2 class="title">Internship Application Update</h2>
      <p>Hello ${name},</p>
      <p>We would like to inform you that your application for <strong>${internshipTitle}</strong> has been updated to:</p>
      <div style="text-align: center; margin: 20px 0;">
        <span class="badge" style="background-color: ${status === "APPROVED" ? "#10b981" : status === "REJECTED" ? "#ef4444" : "#f59e0b"}; padding: 8px 16px; font-size: 14px;">${status}</span>
      </div>
      <p>Please log in to your dashboard to review enrollment details and get started.</p>
    `,
  );
}

export function getInternshipPostingSubmittedForReviewEmailTemplate(
  name: string,
  internshipTitle: string,
): string {
  return getBaseTemplate(
    "Internship Posted Successfully",
    `
      <h2 class="title">Internship Submitted for Review</h2>
      <p>Hello ${name},</p>
      <p>Your new internship posting <strong>"${internshipTitle}"</strong> has been submitted successfully.</p>
      <p>It is currently pending approval. Once a Super Admin verifies the details, the internship will go live.</p>
    `,
  );
}

export function getInternshipPostingApprovedEmailTemplate(
  name: string,
  internshipTitle: string,
): string {
  return getBaseTemplate(
    "Internship Live!",
    `
      <h2 class="title">Your Internship is Live! 📢</h2>
      <p>Hello ${name},</p>
      <p>Great news! The Super Admin has approved your internship: <strong>"${internshipTitle}"</strong>.</p>
      <p>It is now live on the public listings page, and candidates can begin enrolling.</p>
    `,
  );
}

export function getOnCampusVirtualInternshipInterestEmailTemplate(
  name: string,
  internshipTitle: string,
  type: string,
): string {
  return getBaseTemplate(
    "Expression of Interest",
    `
      <h2 class="title">Expression of Interest Received</h2>
      <p>Hello ${name},</p>
      <p>Thank you for submitting your expression of interest for our <strong>${type} Internship</strong> program: <strong>${internshipTitle}</strong>.</p>
      <p>Our academic advisors will evaluate your application profile and contact you soon.</p>
    `,
  );
}

export function getInternshipPaymentFailedEmailTemplate(
  name: string,
  internshipTitle: string,
  amount: number,
): string {
  return getBaseTemplate(
    "Payment Failed",
    `
      <h2 class="title" style="color: #ef4444;">Payment Transaction Failed ❌</h2>
      <p>Hello ${name},</p>
      <p>We were unable to process your payment for the internship: <strong>${internshipTitle}</strong>.</p>
      <table class="details-table">
        <tr><th>Internship</th><td>${internshipTitle}</td></tr>
        <tr><th>Amount</th><td>INR ${amount.toFixed(2)}</td></tr>
        <tr><th>Status</th><td><span class="badge failed">FAILED</span></td></tr>
      </table>
      <p>Any amount deducted from your account during this transaction will be automatically refunded by your banking partner. Please try again.</p>
      <div style="text-align: center;">
        <a href="${config.clientUrl}/student/dashboard" class="button" style="background-color: #ef4444; box-shadow: 0 4px 6px -1px rgba(239, 68, 68, 0.2);">Try Re-enrollment</a>
      </div>
    `,
  );
}

export function getInternshipEnrollmentCompletedEmailTemplate(
  name: string,
  internshipTitle: string,
  companyName: string,
): string {
  return getBaseTemplate(
    "Internship Completed",
    `
      <h2 class="title">Congratulations on Completion! 🎓</h2>
      <p>Dear ${name},</p>
      <p>We are delighted to inform you that your enrollment in the internship <strong>${internshipTitle}</strong> at <strong>${companyName}</strong> has been marked as <strong>COMPLETED</strong>.</p>
      <p>Your mentor has reviewed your projects. Your official completion certificate will be issued shortly.</p>
      <p>Well done on this milestone!</p>
    `,
  );
}

export function getCertificateIssuedEmailTemplate(
  name: string,
  internshipTitle: string,
  certificateNo: string,
): string {
  return getBaseTemplate(
    "Certificate Issued",
    `
      <h2 class="title">Official Certificate Issued! 📜</h2>
      <p>Dear ${name},</p>
      <p>Your completion certificate for <strong>${internshipTitle}</strong> is now officially generated and issued.</p>
      <div class="credentials" style="background-color: #f0fdf4; border-color: #bbf7d0;">
        <div class="credential-item"><span class="label" style="color: #15803d;">Certificate No:</span> <span class="value" style="color: #166534;">${certificateNo}</span></div>
      </div>
      <p>You can view and download your high-quality PDF certificate from your student portal.</p>
      <div style="text-align: center;">
        <a href="${config.clientUrl}/student/dashboard" class="button" style="background-color: #10b981; box-shadow: 0 4px 6px -1px rgba(16, 185, 129, 0.2);">Download Certificate</a>
      </div>
    `,
  );
}
