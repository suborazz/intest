import { config } from "@/x/a948e663";

export const emailStyleHeader = `
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="x-apple-disable-message-reformatting">
  <meta name="format-detection" content="telephone=no,address=no,email=no,date=no,url=no">
  <style>
    body { margin: 0; padding: 0; width: 100% !important; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
    table { border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    td { word-break: break-word; }
    img { border: 0; line-height: 100%; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; }
    a { text-decoration: none; }
    
    @media only screen and (max-width: 600px) {
      .email-wrapper { padding: 14px 8px !important; }
      .email-card { width: 100% !important; max-width: 100% !important; border-radius: 8px !important; }
      .header-padding { padding: 22px 18px 16px 18px !important; }
      .content-padding { padding: 28px 18px 24px 18px !important; }
      .footer-padding { padding: 20px 18px 24px 18px !important; }
      .btn-responsive { display: block !important; width: 100% !important; box-sizing: border-box !important; }
      .heading-responsive { font-size: 22px !important; margin-bottom: 18px !important; }
      .logo-img { width: 155px !important; max-width: 80% !important; height: auto !important; }
    }
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
    <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, Helvetica, sans-serif; -webkit-font-smoothing: antialiased; color: #1e293b;">
      <table role="presentation" class="email-wrapper" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; padding: 36px 14px; width: 100%;">
        <tr>
          <td align="center" style="padding: 0;">
            <!--[if mso]>
            <table role="presentation" align="center" border="0" cellspacing="0" cellpadding="0" width="620">
            <tr>
            <td>
            <![endif]-->
            <table role="presentation" class="email-card" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 620px; width: 100%; background-color: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04); overflow: hidden; margin: 0 auto;">
              <!-- Header with Official Brand Logo -->
              <tr>
                <td align="center" class="header-padding" style="padding: 28px 32px 20px 32px; border-bottom: 1px solid #f1f5f9; background-color: #ffffff;">
                  <a href="${baseUrl}" target="_blank" style="text-decoration: none; display: inline-block;">
                    <img src="${baseUrl}/logo.png" class="logo-img" alt="International Institute of Internship™ [i3]" width="180" style="display: block; width: 180px; max-width: 100%; height: auto; margin: 0 auto 6px auto; border: 0; outline: none; text-decoration: none;" />
                  </a>
                  <p style="margin: 0; font-size: 11.5px; font-weight: 600; color: #64748b; letter-spacing: 0.04em; text-transform: uppercase;">
                    International Institute of Internship™
                  </p>
                </td>
              </tr>
              <!-- Content Body -->
              <tr>
                <td class="content-padding" style="padding: 36px 36px 30px 36px; line-height: 1.6; font-size: 15px; color: #334155;">
                  ${content}
                </td>
              </tr>
              <!-- Footer -->
              <tr>
                <td class="footer-padding" style="padding: 24px 32px 30px 32px; background-color: #fafbfc; border-top: 1px solid #f1f5f9; text-align: center; font-size: 11.5px; color: #64748b; line-height: 1.6;">
                  <p style="margin: 0 0 3px 0; font-weight: 700; color: #334155;">
                    International Institute of Internship™
                  </p>
                  <p style="margin: 0 0 6px 0; color: #64748b;">
                    A Unit of DPKHRC Trust
                  </p>
                  <p style="margin: 0; color: #94a3b8; font-size: 11px;">
                    &copy; ${new Date().getFullYear()} International Institute of Internship™. All rights reserved.
                  </p>
                </td>
              </tr>
            </table>
            <!--[if mso]>
            </td>
            </tr>
            </table>
            <![endif]-->
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}
