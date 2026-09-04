import { getBaseTemplate } from "@/x/0c6e1403";

export function getSupportTicketReceivedEmailTemplate(
  ticketNo: string,
  title: string,
  description: string,
): string {
  return getBaseTemplate(
    "Support Ticket Raised",
    `
      <h2 class="title">Support Ticket Raised — ${ticketNo}</h2>
      <p>Hello,</p>
      <p>We have successfully received your support request. A ticket has been raised with reference number: <strong>${ticketNo}</strong>.</p>
      <div class="card">
        <strong>Ticket Details:</strong><br>
        • <strong>Title:</strong> ${title}<br>
        • <strong>Description:</strong> ${description}
      </div>
      <p>Our support team will review your inquiry and respond to you as soon as possible.</p>
    `,
  );
}

export function getSupportTicketStatusUpdateEmailTemplate(
  ticketNo: string,
  title: string,
  status: string,
): string {
  return getBaseTemplate(
    "Ticket Status Update",
    `
      <h2 class="title">Support Ticket Update — ${ticketNo}</h2>
      <p>Hello,</p>
      <p>Your support ticket <strong>${ticketNo}</strong> ("${title}") status has been updated to:</p>
      <div style="text-align: center; margin: 20px 0;">
        <span class="badge" style="background-color: ${status === "RESOLVED" ? "#10b981" : "#f59e0b"}; padding: 8px 16px; font-size: 14px;">${status}</span>
      </div>
      <p>Please log in to your dashboard to review updates or post comments.</p>
    `,
  );
}

export function getSupportTicketReplyEmailTemplate(
  ticketNo: string,
  title: string,
  replyMessage: string,
): string {
  return getBaseTemplate(
    "Support Ticket Reply",
    `
      <h2 class="title">Reply to Support Ticket — ${ticketNo}</h2>
      <p>Hello,</p>
      <p>An administrator has replied to your support ticket <strong>${ticketNo}</strong> ("${title}"):</p>
      <div style="white-space: pre-wrap; font-style: italic; background-color: #f3f4f6; padding: 15px; border-left: 4px solid #3b82f6; margin: 15px 0; border-radius: 4px; color: #374151;">
        ${replyMessage}
      </div>
      <p>If you have any further questions, you can respond to this email or update the ticket in your dashboard.</p>
    `,
  );
}
