import fs from "fs";
import { join } from "path";
import PDFDocument from "pdfkit";

export interface JobDescriptionPdfData {
  jobId: string;
  companyName: string;
  postOpportunity: string;
  jobNature: string;
  fieldOfEmployment: string;
  minQualification: string;
  skillsRequired?: string | null;
  totalStaffStrength?: string | null;
  website?: string | null;
  advtNo?: string | null;
  advtDate?: string | null;
  closingDate?: string | null;
  salary?: string | null;
  jdDescription?: string | null;
}

/**
 * Strips HTML tags from rich-text JD descriptions for clean PDF rendering.
 */
function stripHtml(html?: string | null): string {
  if (!html) return "";
  return html
    .replace(/<br\s*[\/]?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<\/li>/gi, "\n")
    .replace(/<li>/gi, " • ")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .trim();
}

/**
 * Generates an executive-grade, verified branded Job Description PDF.
 */
export async function generateJobDescriptionPDF(
  job: JobDescriptionPdfData,
): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        size: "A4",
        margins: { top: 36, bottom: 36, left: 40, right: 40 },
        info: {
          Title: `Job Description - ${job.postOpportunity} (${job.jobId})`,
          Author: "International Institute of Internship",
          Subject: "Official Recruitment Notice & Job Description",
        },
      });

      const chunks: Buffer[] = [];
      doc.on("data", (chunk) => chunks.push(chunk));
      doc.on("end", () => resolve(Buffer.concat(chunks)));
      doc.on("error", (err) => reject(err));

      const pageWidth = 595.28;
      const margin = 40;
      const contentWidth = pageWidth - margin * 2;

      // Outer Decorative Border
      doc
        .lineWidth(1.5)
        .strokeColor("#047857") // Emerald green
        .rect(margin - 8, margin - 8, contentWidth + 16, 762)
        .stroke();

      doc
        .lineWidth(0.5)
        .strokeColor("#10B981")
        .rect(margin - 5, margin - 5, contentWidth + 10, 756)
        .stroke();

      // Top Header Banner
      doc.rect(margin, margin, contentWidth, 70).fill("#064E3B");

      // Brand Title
      doc
        .fillColor("#FFFFFF")
        .fontSize(16)
        .font("Helvetica-Bold")
        .text("INTERNATIONAL INSTITUTE OF INTERNSHIP [i3]", margin, margin + 14, {
          width: contentWidth,
          align: "center",
        });

      doc
        .fillColor("#A7F3D0")
        .fontSize(10)
        .font("Helvetica")
        .text(
          "Official Recruitment Notice & Job Description Document",
          margin,
          margin + 36,
          { width: contentWidth, align: "center" },
        );

      doc
        .fillColor("#F3F4F6")
        .fontSize(8)
        .text("Verified Career Portal | https://iiinternship.in", margin, margin + 52, {
          width: contentWidth,
          align: "center",
        });

      let currentY = margin + 84;

      // Meta Bar (Job ID & Notice Details)
      doc.rect(margin, currentY, contentWidth, 28).fill("#F0FDF4");
      doc
        .lineWidth(1)
        .strokeColor("#BBF7D0")
        .rect(margin, currentY, contentWidth, 28)
        .stroke();

      doc
        .fillColor("#065F46")
        .fontSize(10)
        .font("Helvetica-Bold")
        .text(`JOB ID: ${job.jobId}`, margin + 10, currentY + 8);

      const advtText = job.advtNo ? `Advt. No: ${job.advtNo}` : "Advt: Open Notice";
      doc
        .fillColor("#047857")
        .font("Helvetica")
        .fontSize(9)
        .text(advtText, margin + 220, currentY + 9);

      const closingText = job.closingDate
        ? `Closing Date: ${job.closingDate}`
        : "Closing Date: Open";
      doc
        .fillColor("#DC2626")
        .font("Helvetica-Bold")
        .fontSize(9)
        .text(closingText, margin + contentWidth - 170, currentY + 9, {
          width: 160,
          align: "right",
        });

      currentY += 40;

      // Main Post Title Box
      doc.rect(margin, currentY, contentWidth, 54).fill("#F8FAFC");
      doc
        .lineWidth(1)
        .strokeColor("#E2E8F0")
        .rect(margin, currentY, contentWidth, 54)
        .stroke();

      doc
        .fillColor("#0F172A")
        .font("Helvetica-Bold")
        .fontSize(13)
        .text(job.postOpportunity, margin + 12, currentY + 10, {
          width: contentWidth - 24,
        });

      const subLine = `${job.companyName} • ${job.jobNature} • ${job.fieldOfEmployment}`;
      doc
        .fillColor("#475569")
        .font("Helvetica")
        .fontSize(9)
        .text(subLine, margin + 12, currentY + 32, {
          width: contentWidth - 24,
        });

      currentY += 66;

      // 2-Column Key Information Grid
      const colWidth = (contentWidth - 12) / 2;
      const rowHeight = 24;

      const infoRows = [
        [
          { label: "Company / Organization", value: job.companyName },
          { label: "Minimum Qualification", value: job.minQualification },
        ],
        [
          { label: "Employment Nature", value: job.jobNature },
          { label: "Field of Employment", value: job.fieldOfEmployment },
        ],
        [
          {
            label: "Salary / Remuneration",
            value: job.salary ? job.salary : "As per Industry / Institutional Norms",
            isHighlight: Boolean(job.salary),
          },
          {
            label: "Total Open Vacancies",
            value: job.totalStaffStrength ? job.totalStaffStrength : "Multiple Openings",
          },
        ],
        [
          { label: "Official Advertisement Date", value: job.advtDate || "N/A" },
          { label: "Application Deadline", value: job.closingDate || "Rolling / N/A" },
        ],
      ];

      for (const row of infoRows) {
        // Col 1
        const item1 = row[0]!;
        doc.rect(margin, currentY, colWidth, rowHeight).fill("#F9FAFB");
        doc
          .lineWidth(0.5)
          .strokeColor("#E5E7EB")
          .rect(margin, currentY, colWidth, rowHeight)
          .stroke();

        doc
          .fillColor("#6B7280")
          .font("Helvetica-Bold")
          .fontSize(8)
          .text(item1.label, margin + 8, currentY + 4);

        doc
          .fillColor((item1 as any).isHighlight ? "#B45309" : "#111827")
          .font((item1 as any).isHighlight ? "Helvetica-Bold" : "Helvetica")
          .fontSize(8.5)
          .text(item1.value, margin + 8, currentY + 13, {
            width: colWidth - 16,
            ellipsis: true,
          });

        // Col 2
        const item2 = row[1]!;
        const col2X = margin + colWidth + 12;
        doc.rect(col2X, currentY, colWidth, rowHeight).fill("#F9FAFB");
        doc
          .lineWidth(0.5)
          .strokeColor("#E5E7EB")
          .rect(col2X, currentY, colWidth, rowHeight)
          .stroke();

        doc
          .fillColor("#6B7280")
          .font("Helvetica-Bold")
          .fontSize(8)
          .text(item2.label, col2X + 8, currentY + 4);

        doc
          .fillColor("#111827")
          .font("Helvetica")
          .fontSize(8.5)
          .text(item2.value, col2X + 8, currentY + 13, {
            width: colWidth - 16,
            ellipsis: true,
          });

        currentY += rowHeight + 4;
      }

      currentY += 8;

      // Required Skills Section
      if (job.skillsRequired) {
        doc
          .fillColor("#047857")
          .font("Helvetica-Bold")
          .fontSize(10)
          .text("Required Competencies & Skills", margin, currentY);

        currentY += 14;

        doc.rect(margin, currentY, contentWidth, 26).fill("#ECFDF5");
        doc
          .lineWidth(0.5)
          .strokeColor("#A7F3D0")
          .rect(margin, currentY, contentWidth, 26)
          .stroke();

        doc
          .fillColor("#065F46")
          .font("Helvetica")
          .fontSize(8.5)
          .text(job.skillsRequired, margin + 10, currentY + 8, {
            width: contentWidth - 20,
          });

        currentY += 34;
      }

      // Detailed Description Section
      doc
        .fillColor("#047857")
        .font("Helvetica-Bold")
        .fontSize(10)
        .text("Role Overview & Job Responsibilities", margin, currentY);

      currentY += 14;

      const rawDescription = stripHtml(job.jdDescription);
      const descriptionText =
        rawDescription && rawDescription.length > 20
          ? rawDescription
          : `The candidate will be responsible for executing key deliverables associated with the ${job.postOpportunity} position at ${job.companyName}. Candidates possessing background in ${job.fieldOfEmployment} and fulfilling the minimum eligibility of ${job.minQualification} are encouraged to submit their candidature online. Performance will be evaluated based on execution capability, teamwork, and alignment with organizational targets.`;

      doc.rect(margin, currentY, contentWidth, 140).fill("#FFFFFF");
      doc
        .lineWidth(0.5)
        .strokeColor("#CBD5E1")
        .rect(margin, currentY, contentWidth, 140)
        .stroke();

      doc
        .fillColor("#334155")
        .font("Helvetica")
        .fontSize(8.5)
        .text(descriptionText, margin + 10, currentY + 10, {
          width: contentWidth - 20,
          height: 120,
          ellipsis: true,
          lineGap: 2.5,
        });

      currentY += 150;

      // How to Apply Callout
      doc.rect(margin, currentY, contentWidth, 42).fill("#EFF6FF");
      doc
        .lineWidth(1)
        .strokeColor("#93C5FD")
        .rect(margin, currentY, contentWidth, 42)
        .stroke();

      doc
        .fillColor("#1E40AF")
        .font("Helvetica-Bold")
        .fontSize(9)
        .text("HOW TO APPLY:", margin + 10, currentY + 8);

      doc
        .fillColor("#1E3A8A")
        .font("Helvetica")
        .fontSize(8)
        .text(
          `Visit https://iiinternship.in/recruitment?job=${job.jobId} and click 'Register & Apply'. Complete your applicant profile, upload updated resume, and submit your application prior to the closing deadline (${job.closingDate || "as announced"}).`,
          margin + 10,
          currentY + 20,
          { width: contentWidth - 20 },
        );

      // Official Footer
      const footerY = 746;
      doc
        .lineWidth(0.5)
        .strokeColor("#CBD5E1")
        .moveTo(margin, footerY)
        .lineTo(margin + contentWidth, footerY)
        .stroke();

      doc
        .fillColor("#64748B")
        .font("Helvetica")
        .fontSize(7.5)
        .text(
          "This document is an electronically generated official recruitment notice issued by the International Institute of Internship™ [i3]. No physical signature required.",
          margin,
          footerY + 5,
          { width: contentWidth, align: "center" },
        );

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
}
