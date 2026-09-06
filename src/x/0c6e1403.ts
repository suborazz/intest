import { config } from "@/x/a948e663";

export const emailStyleHeader = `
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <style>
    body { margin: 0; padding: 0; width: 100% !important; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
    table { border-spacing: 0; border-collapse: collapse; }
    td { word-break: break-word; }
    img { border: 0; line-height: 100%; outline: none; text-decoration: none; }
    a { text-decoration: none; }
  </style>
`;

export function getBaseTemplate(title: string, content: string): string {
  const baseUrl = config.clientUrl || "https://www.iiinternship.in";
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      ${emailStyleHeader}
      <title>${title}</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; color: #1e293b;">
      <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f1f5f9; padding: 30px 10px;">
        <tr>
          <td align="center">
            <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); overflow: hidden;">
              <!-- Header with Official Brand Logo -->
              <tr>
                <td align="center" style="padding: 26px 30px 20px 30px; border-bottom: 2px solid #f1f5f9; background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);">
                  <a href="${baseUrl}" target="_blank" style="text-decoration: none; display: inline-block;">
                    <img src="${baseUrl}/logo.png" alt="International Institute of Internship™" width="220" style="display: block; width: 220px; max-width: 100%; height: auto; margin: 0 auto 4px auto; border: 0;" />
                  </a>
                  <p style="margin: 4px 0 0 0; font-size: 11px; font-weight: 600; color: #64748b; letter-spacing: 0.05em; text-transform: uppercase;">
                    Global Internship & Skill Development Platform
                  </p>
                </td>
              </tr>
              <!-- Content Body -->
              <tr>
                <td style="padding: 32px 30px 24px 30px; line-height: 1.6; font-size: 15px; color: #334155;">
                  ${content}
                </td>
              </tr>
              <!-- Footer -->
              <tr>
                <td style="padding: 24px 30px 30px 30px; background-color: #f8fafc; border-top: 1px solid #e2e8f0; text-align: center; font-size: 12px; color: #64748b; line-height: 1.6;">
                  <p style="margin: 0 0 6px 0; font-weight: 600; color: #475569;">
                    International Institute of Internship™ (IIInternship)
                  </p>
                  <p style="margin: 0; color: #94a3b8;">
                    This is an automated system notification. Please do not reply directly to this email.<br>
                    &copy; ${new Date().getFullYear()} IIInternship. All rights reserved.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}
