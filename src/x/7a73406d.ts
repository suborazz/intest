import { getBaseTemplate } from "@/x/0c6e1403";

export function getAdminPublishedNoticeNotificationEmailTemplate(
  title: string,
  category: string,
  description: string,
  pdfUrl: string | null,
): string {
  return getBaseTemplate(
    "Official Notice",
    `
      <h2 class="title">New Notice: ${title}</h2>
      <div class="card">
        <strong>Category:</strong> ${category}<br>
        <strong>Announcement:</strong><br>${description}
      </div>
      ${pdfUrl ? `<p>An official notice document is attached. You can view or download it here: <a href="${pdfUrl}" target="_blank">View Official Notice PDF</a></p>` : ""}
    `,
  );
}

export function getInstructorBroadcastedNoticeNotificationEmailTemplate(
  instructorName: string,
  title: string,
  category: string,
  description: string,
): string {
  return getBaseTemplate(
    "Notice from Mentor",
    `
      <h2 class="title">Class Notice from ${instructorName}: ${title}</h2>
      <div class="card" style="border-left-color: #10b981;">
        <strong>Category:</strong> ${category}<br>
        <strong>Notice:</strong><br>${description}
      </div>
      <p>This message was broadcasted by your instructor. Please take necessary actions or reply directly on your dashboard.</p>
    `,
  );
}
