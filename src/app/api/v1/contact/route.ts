import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/x/e3746f45";
import nodemailer from "nodemailer";
import { config } from "@/x/a948e663";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please provide a valid email address"),
  mobile: z.string().optional().nullable(),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          details: parsed.error.format(),
        },
        { status: 400 }
      );
    }

    const { name, email, mobile, subject, message } = parsed.data;

    // 1. Save contact enquiry to PostgreSQL database via Prisma
    const enquiry = await (prisma as any).contactEnquiry.create({
      data: {
        name,
        email,
        mobile: mobile || null,
        subject,
        message,
        status: "PENDING",
      },
    });

    // 2. Asynchronously send email notification to Admin & Confirmation to User
    if (config.smtpUser && config.smtpPass) {
      try {
        const transporter = nodemailer.createTransport({
          host: config.smtpHost,
          port: config.smtpPort,
          secure: config.smtpPort === 465,
          auth: {
            user: config.smtpUser,
            pass: config.smtpPass,
          },
        });

        const senderName = config.smtpSenderName || "International Institute of Internship";
        const senderEmail = config.smtpSenderEmail || config.smtpUser;
        const supportEmail = config.smtpUser || "i3.office2025@gmail.com";

        // Admin alert email
        transporter
          .sendMail({
            from: `"${senderName}" <${senderEmail}>`,
            to: supportEmail,
            replyTo: email,
            subject: `[New Website Enquiry] ${subject} - from ${name}`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff;">
                <div style="background: #064e3b; padding: 16px 20px; border-radius: 8px 8px 0 0; color: white;">
                  <h2 style="margin: 0; font-size: 18px;">International Institute of Internship (i3)</h2>
                  <p style="margin: 4px 0 0 0; font-size: 13px; opacity: 0.9;">New Contact Form Enquiry</p>
                </div>
                <div style="padding: 20px 0;">
                  <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                    <tr>
                      <td style="padding: 8px 0; color: #64748b; width: 120px;"><strong>Sender Name:</strong></td>
                      <td style="padding: 8px 0; color: #1e293b;">${name}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #64748b;"><strong>Email:</strong></td>
                      <td style="padding: 8px 0; color: #1e293b;"><a href="mailto:${email}" style="color: #059669;">${email}</a></td>
                    </tr>
                    ${
                      mobile
                        ? `<tr><td style="padding: 8px 0; color: #64748b;"><strong>Mobile:</strong></td><td style="padding: 8px 0; color: #1e293b;">${mobile}</td></tr>`
                        : ""
                    }
                    <tr>
                      <td style="padding: 8px 0; color: #64748b;"><strong>Subject:</strong></td>
                      <td style="padding: 8px 0; color: #1e293b;">${subject}</td>
                    </tr>
                  </table>
                  <div style="margin-top: 16px; padding: 14px; background: #f8fafc; border-left: 4px solid #059669; border-radius: 4px;">
                    <p style="margin: 0 0 6px 0; font-size: 12px; font-weight: bold; color: #64748b; text-transform: uppercase;">Message Content:</p>
                    <p style="margin: 0; font-size: 14px; color: #334155; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                  </div>
                </div>
                <div style="font-size: 12px; color: #94a3b8; border-top: 1px solid #f1f5f9; padding-top: 12px; text-align: center;">
                  Enquiry ID: ${enquiry.id} • Saved to Database at ${new Date().toLocaleString("en-IN")}
                </div>
              </div>
            `,
          })
          .catch((err) => {
            console.error("[Email Notification Error]:", err);
          });
      } catch (emailErr) {
        console.error("[SMTP Transporter Init Error]:", emailErr);
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: "Your enquiry has been submitted successfully! We will get back to you shortly.",
        data: {
          id: enquiry.id,
          createdAt: enquiry.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("[Contact API Error]:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal Server Error. Please try again later.",
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "20", 10);
    const status = searchParams.get("status");

    const where: any = {};
    if (status) {
      where.status = status;
    }

    const [total, enquiries] = await Promise.all([
      (prisma as any).contactEnquiry.count({ where }),
      (prisma as any).contactEnquiry.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
    ]);

    return NextResponse.json({
      success: true,
      data: enquiries,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    console.error("[Contact GET API Error]:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch enquiries",
      },
      { status: 500 }
    );
  }
}
