import { getBaseTemplate } from "@/x/0c6e1403";

export function getDonationReceiptEmailTemplate(
  name: string,
  amount: number,
): string {
  return getBaseTemplate(
    "Thank You for Your Donation",
    `
      <h2 class="title">Thank You for Your Support! 🙏</h2>
      <p>Dear ${name},</p>
      <p>We are deeply grateful for your generous donation to IIINTERNSHIP TRUST. Your contribution supports our community initiatives.</p>
      <div class="card">
        <strong>Donation Summary:</strong><br>
        • Amount: INR ${amount.toFixed(2)}<br>
        • Donor Name: ${name}<br>
        • Status: COMPLETED
      </div>
      <p>Please find your official <strong>80G Tax Exemption Receipt</strong> attached to this email.</p>
    `,
  );
}
