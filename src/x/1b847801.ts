import { getBaseTemplate } from "@/x/0c6e1403";

export function getJobPlacementLeadConfirmationEmailTemplate(
  companyName: string,
): string {
  return getBaseTemplate(
    "Interest Received",
    `
      <h2 class="title">Expression of Interest Confirmed</h2>
      <p>We have successfully received your expression of interest for job placements at <strong>${companyName}</strong>.</p>
      <p>Our team and coordinates at ${companyName} will evaluate your resume and reach out with suitable placement options.</p>
    `,
  );
}
