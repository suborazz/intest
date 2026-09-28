import { getBaseTemplate } from "@/x/0c6e1403";
import { config } from "@/x/a948e663";

export function getDonationReceiptEmailTemplate(
  name: string,
  amount: number,
): string {
  const baseUrl = config.clientUrl || "https://www.iiinternship.in";
  const portalUrl = baseUrl;
  const donorName = name && name.trim() ? name.trim() : "Valued Supporter";
  const formattedAmount = Number(amount || 0).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return getBaseTemplate(
    `Official Donation Receipt & 80G Certificate — International Institute of Internship™`,
    `
      <!-- Top Icon / Badge -->
      <div style="text-align: center; margin: 0 0 16px 0;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto;">
          <tr>
            <td align="center" style="width: 44px; height: 44px; border-radius: 50%; background-color: #ecfdf5; border: 1px solid #d1fae5; text-align: center; vertical-align: middle;">
              <span style="font-size: 18px; line-height: 44px; display: inline-block;">🙏</span>
            </td>
          </tr>
        </table>
      </div>

      <!-- Heading -->
      <h1 class="heading-responsive" style="color: #0f172a; font-size: 24px; font-weight: 700; margin: 0 0 16px 0; text-align: center; letter-spacing: -0.02em; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, Helvetica, sans-serif; line-height: 1.3;">
        Thank You for Your Generous Contribution
      </h1>

      <!-- Personalized Greeting -->
      <p style="font-size: 15px; color: #1e293b; line-height: 1.6; margin: 0 0 12px 0;">
        Dear ${donorName},
      </p>

      <!-- Message -->
      <p style="font-size: 14.5px; color: #334155; line-height: 1.65; margin: 0 0 20px 0;">
        On behalf of the <strong>International Institute of Internship™ [i3]</strong> (A Unit of DPKHRC Trust), we extend our heartfelt gratitude for your generous philanthropic support. Your contribution directly funds educational scholarships and technical immersion for deserving scholars.
      </p>

      <!-- Contribution Summary Card -->
      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 18px 20px; margin: 0 0 20px 0; text-align: left;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;">
          <tr>
            <td style="padding: 6px 0; font-size: 13px; color: #64748b; font-weight: 600; width: 140px;">Donor Name:</td>
            <td style="padding: 6px 0; font-size: 13.5px; font-weight: 700; color: #0f172a;">
              ${donorName}
            </td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-size: 13px; color: #64748b; font-weight: 600;">Contribution:</td>
            <td style="padding: 6px 0; font-size: 14px; font-weight: 700; color: #059669;">
              ₹${formattedAmount}
            </td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-size: 13px; color: #64748b; font-weight: 600;">Tax Benefit:</td>
            <td style="padding: 6px 0; font-size: 13px; color: #0f172a; font-weight: 600;">
              Section 80G Tax Exemption Eligible
            </td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-size: 13px; color: #64748b; font-weight: 600;">Status:</td>
            <td style="padding: 6px 0;">
              <span style="display: inline-block; padding: 3px 10px; background-color: #ecfdf5; color: #059669; font-size: 11.5px; font-weight: 700; border-radius: 6px; border: 1px solid #a7f3d0;">
                CONFIRMED & ISSUED
              </span>
            </td>
          </tr>
        </table>
      </div>

      <!-- Attachment & 80G Exemption Note -->
      <div style="background-color: #f0fdf4; border-left: 3px solid #059669; border-radius: 4px; padding: 12px 14px; margin: 0 0 24px 0; text-align: left;">
        <p style="margin: 0; font-size: 12.5px; color: #166534; line-height: 1.5;">
          <strong>📄 Official 80G Receipt:</strong> Your formal digital tax receipt and donation certificate is attached to this email as a PDF document for your tax records.
        </p>
      </div>

      <!-- Primary CTA Button -->
      <div style="text-align: center; margin: 24px 0 16px 0;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto; width: auto;">
          <tr>
            <td align="center" style="border-radius: 8px; background-color: #059669; box-shadow: 0 2px 8px rgba(5, 150, 105, 0.25);">
              <a href="${portalUrl}" target="_blank" class="btn-responsive" style="display: inline-block; min-width: 200px; padding: 14px 32px; font-size: 14.5px; font-weight: 600; color: #ffffff !important; text-decoration: none; border-radius: 8px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, Helvetica, sans-serif; letter-spacing: 0.01em; text-align: center;">
                Visit Official Portal
              </a>
            </td>
          </tr>
        </table>
      </div>

      <!-- Direct Link Fallback -->
      <p style="text-align: center; font-size: 12px; color: #64748b; margin: 0 0 24px 0; line-height: 1.5;">
        Direct link: <a href="${portalUrl}" target="_blank" style="color: #059669; word-break: break-all; text-decoration: underline;">${portalUrl}</a>
      </p>

      <!-- Support Link -->
      <div style="border-top: 1px solid #f1f5f9; padding-top: 18px; font-size: 12.5px; color: #64748b; line-height: 1.5;">
        For trust queries or tax certificate questions, please contact our finance desk at <a href="mailto:i3.office2025@gmail.com" style="color: #059669; font-weight: 600; text-decoration: none;">i3.office2025@gmail.com</a>.
      </div>
    `,
  );
}

