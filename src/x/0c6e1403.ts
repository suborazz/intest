import { config } from "@/x/a948e663";

export const emailStyleHeader = `
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: 'Outfit', 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #1e293b; margin: 0; padding: 0; background-color: #f8fafc; }
    .wrapper { max-width: 600px; margin: 20px auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 40px; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05); }
    .header { text-align: center; border-bottom: 2px solid #f1f5f9; padding-bottom: 20px; margin-bottom: 30px; }
    .logo { font-size: 24px; font-weight: 800; color: #3b82f6; text-decoration: none; letter-spacing: -0.5px; }
    .logo span { color: #10b981; }
    .title { color: #0f172a; font-size: 22px; font-weight: 700; margin-top: 0; margin-bottom: 15px; }
    .button { display: inline-block; padding: 12px 28px; background-color: #3b82f6; color: #ffffff !important; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 25px 0; text-align: center; box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.2); }
    .footer { font-size: 12px; color: #64748b; margin-top: 40px; border-top: 1px solid #e2e8f0; padding-top: 20px; line-height: 1.8; text-align: center; }
    .highlight { color: #3b82f6; font-weight: 600; }
    .credentials { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin: 20px 0; }
    .credential-item { margin: 8px 0; font-size: 14px; }
    .label { font-weight: bold; color: #475569; display: inline-block; width: 140px; }
    .value { font-family: monospace; font-size: 15px; color: #0f172a; font-weight: bold; }
    .details-table { width: 100%; border-collapse: collapse; margin: 20px 0; border-radius: 8px; overflow: hidden; }
    .details-table th, .details-table td { text-align: left; padding: 12px 16px; border-bottom: 1px solid #e2e8f0; }
    .details-table th { background-color: #f8fafc; color: #475569; font-weight: 600; font-size: 13px; text-transform: uppercase; tracking-wider: 0.05em; }
    .badge { display: inline-block; padding: 4px 10px; background-color: #10b981; color: #ffffff; border-radius: 9999px; font-size: 11px; font-weight: bold; text-transform: uppercase; }
    .badge.failed { background-color: #ef4444; }
    .badge.pending { background-color: #f59e0b; }
    .card { background: #f8fafc; border-left: 4px solid #3b82f6; padding: 16px; margin: 20px 0; border-radius: 0 8px 8px 0; }
  </style>
`;

export function getBaseTemplate(title: string, content: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      ${emailStyleHeader}
      <title>${title}</title>
    </head>
    <body>
      <div class="wrapper">
        <div class="header">
          <a href="${config.clientUrl}" class="logo">II<span>Internship</span></a>
        </div>
        ${content}
        <div class="footer">
          <p>This email was sent automatically. Please do not reply.<br>&copy; ${new Date().getFullYear()} IIInternship Team. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}
