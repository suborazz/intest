import fs from "fs";
import { join } from "path";
import PDFDocument from "pdfkit";
import qrcode from "qrcode-generator";

export interface AcademicRecord {
  qualification?: string | null;
  stream?: string | null;
  subject?: string | null;
  instituteName?: string | null;
  universityName?: string | null;
  sessionYear?: string | null;
}

export interface InternshipOfferLetterData {
  // Reference & Metadata
  letterRefNo?: string | null;
  applicationId?: string | null;
  offerDate?: string | Date | null;
  verificationUrl?: string | null;

  // Student Details
  studentName: string;
  registrationNo?: string | null;
  collegeName?: string | null;
  universityName?: string | null;
  qualificationStream?: string | null;
  sessionYear?: string | null;

  // Backward compatibility alias
  departmentSemester?: string | null;

  // Internship Details
  internshipId?: string | null;
  internshipTitle: string;
  duration?: string | null;
  mode?: string | null;
  startDate?: string | Date | null;
  endDate?: string | Date | null;
  coordinator?: string | null;

  // Stipend: ONLY populated when stipend is applicable/provided; otherwise null/empty
  stipend?: string | null;

  // Signatory Details
  signatoryName?: string;
  signatoryDesignation?: string;
}

/**
 * Calculates academic qualification rank to identify the highest educational qualification.
 * Hierarchy:
 * - Ph.D / Doctorate: 60
 * - M.Phil: 50
 * - Post Graduate / Master's (MA, MSc, MCom, MBA, MCA, MTech, MEd, etc.): 40
 * - Graduate / Bachelor's (BA, BSc, BCom, BTech, BCA, BBA, BEd, etc.): 30
 * - Intermediate / 12th / +2 / Diploma: 20
 * - Matriculation / 10th / Secondary: 10
 */
export function getAcademicRank(rec?: AcademicRecord | null): number {
  if (!rec) return 0;
  const qual = (rec.qualification || "").trim().toLowerCase();
  const stream = (rec.stream || "").trim().toLowerCase();
  const subject = (rec.subject || "").trim().toLowerCase();
  const combined = `${qual} ${stream} ${subject}`;

  // 1. Ph.D / Doctorate
  if (/\b(ph\.?d|doctorate|d\.?phil)\b/i.test(combined)) return 60;

  // 2. M.Phil
  if (/\b(m\.?phil)\b/i.test(combined)) return 50;

  // 3. Post Graduate / Masters
  if (
    qual.includes("post graduate") ||
    qual.includes("post graduation") ||
    /\b(post[\s-]?graduat|m\.?a\b|m\.?sc\b|m\.?com\b|mba|mca|m\.?tech\b|m\.?ed\b|llm|master|pg\b)/i.test(combined)
  ) {
    return 40;
  }

  // 4. Graduate / Bachelors
  if (
    qual.includes("graduate") ||
    qual.includes("graduation") ||
    /\b(under[\s-]?graduat|graduat|b\.?a\b|b\.?sc\b|b\.?com\b|b\.?tech\b|bca|bba|b\.?ed\b|llb|bachelor|ug\b|degree|b\.?e\b)/i.test(combined)
  ) {
    return 30;
  }

  // 5. Intermediate / 12th / +2 / Diploma
  if (
    qual.includes("intermediate") ||
    /\b(intermediate|inter\b|12th|\+2|plus[\s-]?two|senior[\s-]?secondary|higher[\s-]?secondary|diploma|polytechnic)\b/i.test(combined)
  ) {
    return 20;
  }

  // 6. Matriculation / 10th / High School
  if (
    qual.includes("matric") ||
    /\b(matriculation|matric\b|10th|secondary|high[\s-]?school|sslc)\b/i.test(combined)
  ) {
    return 10;
  }

  return 5;
}

/**
 * Automatically picks the highest academic qualification record among all records provided.
 * If BA & MA both exist -> picks MA.
 * If only Matriculation or Intermediate exists -> picks Intermediate (or Matriculation if single).
 */
export function pickHighestAcademicRecord(
  academics?: AcademicRecord[] | null,
): AcademicRecord | null {
  if (!academics || academics.length === 0) return null;
  const sorted = [...academics].sort((a, b) => {
    const rankDiff = getAcademicRank(b) - getAcademicRank(a);
    if (rankDiff !== 0) return rankDiff;
    return (b.sessionYear || "").localeCompare(a.sessionYear || "");
  });
  return sorted[0];
}

/**
 * Formats qualification and stream cleanly for official documents.
 */
export function formatQualificationStream(
  academic?: AcademicRecord | null,
): string {
  if (!academic) return "Academic Programme";
  const qual = (academic.qualification || "").trim();
  const stream = (academic.stream || "").trim();
  const subject = (academic.subject || "").trim();

  const isDegreeStream =
    /^(B\.?A|M\.?A|B\.?Sc|M\.?Sc|B\.?Tech|M\.?Tech|B\.?Com|M\.?Com|BCA|MCA|BBA|MBA|B\.?Ed|M\.?Ed|LL\.?B|LL\.?M|Ph\.?D|Diploma)/i.test(
      stream,
    );

  if (isDegreeStream) {
    if (subject && subject.toLowerCase() !== stream.toLowerCase()) {
      return `${stream} (${subject})`;
    }
    return stream;
  }

  if (/matric/i.test(qual)) {
    return subject
      ? `Matriculation (10th) — ${subject}`
      : "Matriculation (10th)";
  }
  if (/intermediate/i.test(qual)) {
    const spec = stream || subject;
    return spec ? `Intermediate (12th) — ${spec}` : "Intermediate (12th)";
  }

  if (stream && subject && stream.toLowerCase() !== subject.toLowerCase()) {
    return `${qual ? qual + " — " : ""}${stream} (${subject})`;
  }

  const spec = stream || subject;
  if (qual && spec && !qual.toLowerCase().includes(spec.toLowerCase())) {
    return `${qual} — ${spec}`;
  }

  return qual || spec || "Academic Programme";
}

/**
 * Formats a Date object or string into standard formal English date: "15 August 2026"
 */
export function formatFormalDate(dateInput?: string | Date | null): string {
  if (!dateInput) {
    const now = new Date();
    return now.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  try {
    const d = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
    if (isNaN(d.getTime())) {
      return String(dateInput);
    }
    return d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return String(dateInput);
  }
}

/**
 * Calculates Indian Financial Year (FY: 1st April to 31st March).
 * Examples:
 * - 14 Oct 2026 -> "2026-27"
 * - 15 Feb 2026 -> "2025-26"
 * - 01 Apr 2026 -> "2026-27"
 * - 31 Mar 2026 -> "2025-26"
 */
export function getFinancialYear(dateInput?: string | Date | null): string {
  const d = dateInput ? new Date(dateInput) : new Date();
  const safeDate = isNaN(d.getTime()) ? new Date() : d;
  const year = safeDate.getFullYear();
  const month = safeDate.getMonth(); // 0-indexed: 0 = Jan, 2 = Mar, 3 = Apr

  if (month >= 3) {
    // April (3) to December (11): FY is currentYear-(currentYear+1)
    const nextYearShort = String((year + 1) % 100).padStart(2, "0");
    return `${year}-${nextYearShort}`;
  } else {
    // January (0) to March (2): FY belongs to previous financial year
    const prevYear = year - 1;
    const curYearShort = String(year % 100).padStart(2, "0");
    return `${prevYear}-${curYearShort}`;
  }
}

/**
 * Extracts or deterministically generates a clean 5-digit serial from a code/ID.
 * Strictly deterministic — zero Math.random() to ensure permanent document consistency.
 */
function extractDeterministicSerial(codeOrId?: string | null): string {
  if (!codeOrId || codeOrId.trim().length === 0) {
    return "00001";
  }

  const clean = codeOrId.trim();

  // If already contains a 4-6 digit numeric ending (e.g. "APP-2026-00492" or "88492" or "26AEE10001")
  const numericMatch = clean.match(/(\d{4,6})$/);
  if (numericMatch && numericMatch[1]) {
    return numericMatch[1].padStart(5, "0").slice(-5);
  }

  // Any other digits in string
  const anyDigits = clean.replace(/\D/g, "");
  if (anyDigits.length >= 4) {
    return anyDigits.slice(-5).padStart(5, "0");
  }

  // Deterministic polynomial hash for strings without sufficient digits (e.g. cuid/uuid)
  let hash = 0;
  for (let i = 0; i < clean.length; i++) {
    hash = (hash * 31 + clean.charCodeAt(i)) >>> 0;
  }
  const numeric = 10000 + (hash % 90000);
  return String(numeric);
}

/**
 * Formats reference number to standard Indian Trust & Institutional FY format:
 * Format: i3/[FY]/INT/[SERIAL] (e.g. i3/2026-27/INT/00492)
 */
export function formatLetterRefNo(
  code?: string | null,
  date?: string | Date | null,
): string {
  if (code && code.trim().length > 0) {
    const clean = code.trim().toUpperCase();
    // If it's already a full formatted reference number
    if (/^I3\/\d{4}(-\d{2})?\/INT\//i.test(clean) || clean.startsWith("EZY/")) {
      return clean.replace(/^I3\//, "i3/");
    }
  }

  const fy = getFinancialYear(date);
  const serial = extractDeterministicSerial(code);
  return `i3/${fy}/INT/${serial}`;
}

/**
 * Generates an executive-grade, single-page Internship Offer Letter PDF
 * with balanced typography, generous luxury vertical proportion,
 * and pixel-perfect signatory alignment.
 */
export async function generateInternshipOfferLetterPDF(
  data: InternshipOfferLetterData,
): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        size: "A4",
        layout: "portrait",
        margins: { top: 22, bottom: 22, left: 36, right: 36 },
        info: {
          Title: `Internship Offer Letter - ${data.studentName}`,
          Author: "International Institute of Internship™",
          Subject: "Official Internship Offer Letter",
          Keywords: "Internship, Offer Letter, i3, NEP-2020, AICTE, UGC",
        },
      });

      const chunks: Buffer[] = [];
      doc.on("data", (chunk) => chunks.push(chunk));
      doc.on("end", () => resolve(Buffer.concat(chunks)));
      doc.on("error", (err) => reject(err));

      const PAGE_W = 595.28;
      const MARGIN_LEFT = 36;
      const MARGIN_RIGHT = 36;
      const USABLE_W = PAGE_W - MARGIN_LEFT - MARGIN_RIGHT; // 523.28 pt

      // Theme Colors
      const primaryDark = "#064e3b"; // Rich forest emerald
      const accentEmerald = "#059669"; // Vibrant emerald
      const textHeading = "#0f172a"; // Slate 900
      const textBody = "#334155"; // Slate 700
      const textMuted = "#64748b"; // Slate 500
      const dividerStroke = "#cbd5e1"; // Clean separator
      const tableBorder = "#cbd5e1"; // Table border

      // ─────────────────────────────────────────────────────────────
      // 1. Top Emerald Accent Line & Institutional Security Watermark
      // ─────────────────────────────────────────────────────────────
      doc.rect(MARGIN_LEFT, 18, USABLE_W, 4).fill(accentEmerald);

      // Subtle Anti-Forgery Institutional Watermark
      try {
        doc.save();
        doc.opacity(0.026);
        const centerX = PAGE_W / 2;
        const centerY = 445;
        doc.rotate(-28, { origin: [centerX, centerY] });
        doc
          .font("Helvetica-Bold")
          .fontSize(32)
          .fillColor("#064e3b")
          .text(
            "INTERNATIONAL INSTITUTE OF INTERNSHIP",
            centerX - 350,
            centerY - 12,
            { width: 700, align: "center", characterSpacing: 2 },
          );
        doc.restore();
      } catch (_wmErr) {}

      // ─────────────────────────────────────────────────────────────
      // 2. Organization Header
      // ─────────────────────────────────────────────────────────────
      const headerY = 28;
      const logoPath = join(process.cwd(), "public", "logo.png");
      let logoWidth = 0;

      if (fs.existsSync(logoPath)) {
        try {
          doc.image(logoPath, MARGIN_LEFT, headerY, { fit: [58, 50] });
          logoWidth = 66;
        } catch (_imgErr) {
          logoWidth = 0;
        }
      }

      const brandX = MARGIN_LEFT + logoWidth;
      const brandW = 255;

      doc
        .font("Helvetica-Bold")
        .fontSize(13)
        .fillColor(primaryDark)
        .text("International Institute of Internship™", brandX, headerY, {
          width: brandW,
        });

      doc
        .font("Helvetica-Bold")
        .fontSize(8.2)
        .fillColor(textHeading)
        .text("A Unit of DPKHRC Trust", brandX, headerY + 17, {
          width: brandW,
        });

      doc
        .font("Helvetica-Bold")
        .fontSize(7.5)
        .fillColor(accentEmerald)
        .text("An ISO 2600:2018 Certified Institution", brandX, headerY + 29, {
          width: brandW,
        });

      doc
        .font("Helvetica")
        .fontSize(7)
        .fillColor(textMuted)
        .text(
          "Regd. Under Indian Trusts Act 1882, Government of India",
          brandX,
          headerY + 41,
          { width: brandW },
        );

      // Header Right: Registered Office & Official Contacts
      const rightHeaderX = 330;
      const rightHeaderW = PAGE_W - MARGIN_RIGHT - rightHeaderX;

      doc
        .font("Helvetica")
        .fontSize(7.4)
        .fillColor(textHeading)
        .text(
          "Regd. Office: Thekma, Azamgarh, Uttar Pradesh India",
          rightHeaderX,
          headerY,
          { align: "right", width: rightHeaderW },
        )
        .font("Helvetica-Bold")
        .fillColor(accentEmerald)
        .text("Email: i3.office2025@gmail.com", rightHeaderX, headerY + 12, {
          align: "right",
          width: rightHeaderW,
        })
        .text("Website: iiinternship.in", rightHeaderX, headerY + 24, {
          align: "right",
          width: rightHeaderW,
        })
        .font("Helvetica")
        .fillColor(textBody)
        .text("Mob: +91 9472351693", rightHeaderX, headerY + 36, {
          align: "right",
          width: rightHeaderW,
        });

      // Divider Line below header
      const dividerY1 = headerY + 54;
      doc
        .moveTo(MARGIN_LEFT, dividerY1)
        .lineTo(MARGIN_LEFT + USABLE_W, dividerY1)
        .lineWidth(0.75)
        .stroke(dividerStroke);

      // ─────────────────────────────────────────────────────────────
      // 3. Document Title & Subtitle
      // ─────────────────────────────────────────────────────────────
      const titleY = dividerY1 + 8;
      doc
        .font("Helvetica-Bold")
        .fontSize(14.5)
        .fillColor(primaryDark)
        .text("INTERNSHIP OFFER LETTER", MARGIN_LEFT, titleY, {
          align: "center",
          width: USABLE_W,
          characterSpacing: 1.5,
        });

      doc
        .font("Helvetica-Oblique")
        .fontSize(7.6)
        .fillColor(textMuted)
        .text(
          "Official Offer | Digitally Generated from the [i3] Application Portal.",
          MARGIN_LEFT,
          titleY + 18,
          { align: "center", width: USABLE_W },
        );

      const dividerY2 = titleY + 31;
      doc
        .moveTo(MARGIN_LEFT, dividerY2)
        .lineTo(MARGIN_LEFT + USABLE_W, dividerY2)
        .lineWidth(0.5)
        .stroke("#e2e8f0");

      // ─────────────────────────────────────────────────────────────
      // 4. Two-Column Framed Metadata & Addressee Section (Symmetrical Card)
      // ─────────────────────────────────────────────────────────────
      const cardY = dividerY2 + 6;
      const cardH = 46;
      const cardPadX = 10;

      // Draw subtle executive card frame
      doc
        .roundedRect(MARGIN_LEFT, cardY, USABLE_W, cardH, 4)
        .fillAndStroke("#f8fafc", "#e2e8f0");

      const colLeftX = MARGIN_LEFT + cardPadX;
      const colLeftW = 245;

      const colRightX = 300;
      const colRightW = PAGE_W - MARGIN_RIGHT - colRightX - cardPadX;

      const refNo = formatLetterRefNo(
        data.letterRefNo || data.applicationId,
        data.offerDate,
      );
      const appId =
        data.applicationId && data.applicationId.trim().length > 0
          ? data.applicationId.trim()
          : `APP-${getFinancialYear(data.offerDate)}-${refNo.split("/").pop() || "00001"}`;
      const formattedDate = formatFormalDate(data.offerDate);

      // Left Column: 3 perfectly spaced rows
      // Row 1: Offer/Reference No
      doc
        .font("Helvetica-Bold")
        .fontSize(7.8)
        .fillColor(textHeading)
        .text("Offer/Reference No: ", colLeftX, cardY + 7, { lineBreak: false });
      const refW = doc.widthOfString("Offer/Reference No: ");
      doc
        .font("Helvetica")
        .fontSize(7.8)
        .fillColor(textBody)
        .text(refNo, colLeftX + refW, cardY + 7);

      // Row 2: Application ID
      doc
        .font("Helvetica-Bold")
        .fontSize(7.8)
        .fillColor(textHeading)
        .text("Application ID: ", colLeftX, cardY + 20, { lineBreak: false });
      const appW = doc.widthOfString("Application ID: ");
      doc
        .font("Helvetica")
        .fontSize(7.8)
        .fillColor(textBody)
        .text(appId, colLeftX + appW, cardY + 20);

      // Row 3: Date of Issue
      doc
        .font("Helvetica-Bold")
        .fontSize(7.8)
        .fillColor(textHeading)
        .text("Date of Issue: ", colLeftX, cardY + 33, { lineBreak: false });
      const dateW = doc.widthOfString("Date of Issue: ");
      doc
        .font("Helvetica")
        .fontSize(7.8)
        .fillColor(textBody)
        .text(formattedDate, colLeftX + dateW, cardY + 33);

      // Right Column: 3 parallel aligned rows
      const studentNameUpper = (data.studentName || "STUDENT")
        .trim()
        .toUpperCase();
      const regNoText =
        data.registrationNo && data.registrationNo.trim().length > 0
          ? data.registrationNo.trim()
          : "NA";
      const collegeText =
        data.collegeName && data.collegeName.trim().length > 0
          ? data.collegeName.trim()
          : "Recognised College / Institution";

      // Row 1: Student Name
      doc
        .font("Helvetica-Bold")
        .fontSize(7.8)
        .fillColor(textHeading)
        .text("Student Name: ", colRightX, cardY + 7, { lineBreak: false });
      const cnW = doc.widthOfString("Student Name: ");
      doc
        .font("Helvetica-Bold")
        .fontSize(8.2)
        .fillColor(primaryDark)
        .text(studentNameUpper, colRightX + cnW, cardY + 6.6, {
          width: colRightW - cnW,
          ellipsis: true,
        });

      // Row 2: Registration No
      doc
        .font("Helvetica-Bold")
        .fontSize(7.8)
        .fillColor(textHeading)
        .text("Registration No: ", colRightX, cardY + 20, { lineBreak: false });
      const rW = doc.widthOfString("Registration No: ");
      doc
        .font("Helvetica")
        .fontSize(7.8)
        .fillColor(textBody)
        .text(regNoText, colRightX + rW, cardY + 20);

      // Row 3: College/Institution
      doc
        .font("Helvetica-Bold")
        .fontSize(7.8)
        .fillColor(textHeading)
        .text("College / Institute: ", colRightX, cardY + 33, { lineBreak: false });
      const cW = doc.widthOfString("College / Institute: ");
      doc
        .font("Helvetica")
        .fontSize(7.8)
        .fillColor(textBody)
        .text(collegeText, colRightX + cW, cardY + 33, {
          width: colRightW - cW,
          ellipsis: true,
        });

      // ─────────────────────────────────────────────────────────────
      // 5. Salutation & Official Congratulatory Preamble
      // ─────────────────────────────────────────────────────────────
      const salutationY = cardY + cardH + 9;

      const salutationName =
        data.studentName && data.studentName.trim().length > 0
          ? data.studentName
              .trim()
              .toLowerCase()
              .split(/\s+/)
              .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
              .join(" ")
          : "Student";

      doc
        .font("Helvetica-Bold")
        .fontSize(9.2)
        .fillColor(textHeading)
        .text(`Dear ${salutationName},`, MARGIN_LEFT, salutationY);

      const preambleY = salutationY + 14;
      const preambleText =
        "Congratulations! Following the review of your online application submitted through the International Institute of Internship™ [i3] portal, we are pleased to inform you that your application has been Approved. Accordingly, you are offered a place in the internship programme specified below, subject to the programme requirements and the terms set out in this letter.";

      doc
        .font("Helvetica")
        .fontSize(8.0)
        .fillColor(textBody)
        .text(preambleText, MARGIN_LEFT, preambleY, {
          width: USABLE_W,
          align: "justify",
          lineGap: 2.5,
        });

      const preambleH = doc.heightOfString(preambleText, {
        width: USABLE_W,
        lineGap: 2.5,
      });

      // ─────────────────────────────────────────────────────────────
      // 6. Section 01 | INTERNSHIP PARTICULARS (Table)
      // ─────────────────────────────────────────────────────────────
      const sec1Y = preambleY + preambleH + 9;
      const headerBarH = 15;

      // Section Header Banner
      doc
        .roundedRect(MARGIN_LEFT, sec1Y, USABLE_W, headerBarH, 3)
        .fill(primaryDark);

      doc
        .font("Helvetica-Bold")
        .fontSize(8.4)
        .fillColor("#ffffff")
        .text("01 | INTERNSHIP PROGRAMME DETAILS", MARGIN_LEFT + 10, sec1Y + 3.5);

      // Data normalization for Table 01
      const universityText =
        data.universityName && data.universityName.trim().length > 0
          ? data.universityName.trim()
          : "Recognised University";

      const qualStreamText =
        data.qualificationStream && data.qualificationStream.trim().length > 0
          ? data.qualificationStream.trim()
          : data.departmentSemester &&
            data.departmentSemester.trim().length > 0
          ? data.departmentSemester.trim()
          : "Academic Internship Programme";

      const sessionYearText =
        data.sessionYear && data.sessionYear.trim().length > 0
          ? data.sessionYear.trim()
          : "Current Academic Session";

      const internshipIdText =
        data.internshipId && data.internshipId.trim().length > 0
          ? data.internshipId.trim()
          : data.letterRefNo && data.letterRefNo.trim().length > 0
          ? data.letterRefNo.trim()
          : "i3-INT-2026";

      const internshipNameText =
        data.internshipTitle && data.internshipTitle.trim().length > 0
          ? data.internshipTitle.trim()
          : "Professional Internship Programme";

      const startDateText = data.startDate
        ? formatFormalDate(data.startDate)
        : "Immediately upon onboarding / As notified";

      const durationText =
        data.duration && data.duration.trim().length > 0
          ? data.duration.trim()
          : "120 Hours";

      const modeText =
        data.mode && data.mode.trim().length > 0
          ? data.mode.trim().charAt(0).toUpperCase() +
            data.mode.trim().slice(1).toLowerCase()
          : "Online";

      const coordinatorText =
        data.coordinator && data.coordinator.trim().length > 0
          ? data.coordinator.trim()
          : "Academic Programme Coordinator - [i3]";

      // Determine if Stipend Row should be included:
      // USER RULE: "तालिका संख्या 1 में नीचे Stipend का कॉलम तभी बने जब किसी इंटर्नशिप प्रोग्राम में स्टाइपेंड देने का प्रावधान हो। अन्यथा यह कॉलम न बने।"
      const hasStipend = Boolean(
        data.stipend &&
          data.stipend.trim().length > 0 &&
          !data.stipend.toLowerCase().includes("not applicable") &&
          !data.stipend.toLowerCase().includes("unpaid") &&
          data.stipend.trim() !== "0" &&
          data.stipend.trim() !== "₹0" &&
          data.stipend.trim() !== "Rs. 0",
      );

      interface TableRow {
        label: string;
        value: string;
        isBold?: boolean;
        isAccent?: boolean;
      }

      const tableRows: TableRow[] = [
        { label: "Student Name", value: studentNameUpper, isBold: true },
        { label: "College/Institution Name", value: collegeText, isBold: true },
        { label: "University Name", value: universityText, isBold: true },
        { label: "Qualification/Stream", value: qualStreamText, isBold: true },
        { label: "Session/Year", value: sessionYearText, isBold: true },
        { label: "Internship ID", value: internshipIdText, isBold: true },
        { label: "Internship Name", value: internshipNameText, isBold: true },
        { label: "Proposed Start Date", value: startDateText, isBold: false },
        { label: "Duration", value: durationText, isBold: true },
        { label: "Delivery Mode", value: modeText, isBold: true },
        {
          label: "Reporting/Programme Coordinator",
          value: coordinatorText,
          isBold: false,
        },
      ];

      // Add Stipend row ONLY IF stipend is provided
      if (hasStipend && data.stipend) {
        const cleanStipend = data.stipend.replace(/₹/g, "Rs. ").trim();
        tableRows.push({
          label: "Stipend",
          value: cleanStipend,
          isBold: true,
          isAccent: true,
        });
      }

      const tableStartY = sec1Y + headerBarH;
      // Generous row height for executive readability
      const rowH = 14.8;
      const tableTotalH = tableRows.length * rowH;

      // Table Box
      doc
        .rect(MARGIN_LEFT, tableStartY, USABLE_W, tableTotalH)
        .fillAndStroke("#fcfdfd", tableBorder);

      const colLabelX = MARGIN_LEFT + 12;
      const colColonX = colLabelX + 175;
      const colValX = colColonX + 9;
      const colValW = USABLE_W - (colValX - MARGIN_LEFT) - 10;

      tableRows.forEach((row, i) => {
        const rowY = tableStartY + i * rowH;

        // Subtle alternating row background
        if (i % 2 === 1) {
          doc.rect(MARGIN_LEFT, rowY, USABLE_W, rowH).fill("#f8fafc");
        }

        // Inner row separator line
        if (i > 0) {
          doc
            .moveTo(MARGIN_LEFT, rowY)
            .lineTo(MARGIN_LEFT + USABLE_W, rowY)
            .lineWidth(0.35)
            .stroke("#e2e8f0");
        }

        // Field Label (clean, elegant tabular layout without redundant bullets)
        doc
          .font("Helvetica-Bold")
          .fontSize(7.8)
          .fillColor(textHeading)
          .text(`${row.label}`, colLabelX, rowY + 3.2);

        // Colon
        doc
          .font("Helvetica-Bold")
          .fontSize(7.8)
          .fillColor(textHeading)
          .text(":", colColonX, rowY + 3.2);

        // Value
        doc
          .font(row.isBold ? "Helvetica-Bold" : "Helvetica")
          .fontSize(7.8)
          .fillColor(
            row.isAccent ? accentEmerald : row.isBold ? textHeading : textBody,
          )
          .text(row.value, colValX, rowY + 3.2, {
            width: colValW,
            lineBreak: false,
            ellipsis: true,
          });
      });

      // ─────────────────────────────────────────────────────────────
      // 7. Section 02 | CONDITIONS OF OFFER & PARTICIPATION
      // ─────────────────────────────────────────────────────────────
      const sec2Y = tableStartY + tableTotalH + 9;

      doc
        .roundedRect(MARGIN_LEFT, sec2Y, USABLE_W, headerBarH, 3)
        .fill(primaryDark);

      doc
        .font("Helvetica-Bold")
        .fontSize(8.4)
        .fillColor("#ffffff")
        .text(
          "02 | CONDITIONS OF OFFER & PARTICIPATION",
          MARGIN_LEFT + 10,
          sec2Y + 3.5,
        );

      const conditions = [
        {
          num: "1.",
          title: "Confirmation and onboarding: ",
          body: "Follow the schedule and instructions communicated by the programme coordinator. Where required, submit the college consent / forwarding letter before commencement.",
        },
        {
          num: "2.",
          title: "Attendance and deliverables: ",
          body: "Meet the programme’s attendance requirements and complete assigned learning activities, tasks, projects, logbook entries and assessments within the prescribed timelines.",
        },
        {
          num: "3.",
          title: "Professional conduct: ",
          body: "Maintain respectful, ethical and professional conduct; protect confidential information; and comply with the institute’s applicable policies and the instructions of your mentor.",
        },
        {
          num: "4.",
          title: "Accuracy of application: ",
          body: "This offer is based on the information submitted through the portal. Materially incorrect or misleading information may lead to review or withdrawal of the offer.",
        },
      ];

      let curCondY = sec2Y + headerBarH + 6;
      const condItemGap = 4.0;

      conditions.forEach((item) => {
        const fullClause = `${item.num} ${item.title}${item.body}`;
        const itemH = doc.heightOfString(fullClause, {
          width: USABLE_W - 14,
          lineGap: 1.8,
        });

        doc
          .font("Helvetica-Bold")
          .fontSize(7.5)
          .fillColor(textHeading)
          .text(`${item.num} ${item.title}`, MARGIN_LEFT + 7, curCondY, {
            continued: true,
            lineGap: 1.8,
          })
          .font("Helvetica")
          .fillColor(textBody)
          .text(item.body, {
            width: USABLE_W - 14,
            align: "justify",
            lineGap: 1.8,
          });

        curCondY += itemH + condItemGap;
      });

      // ─────────────────────────────────────────────────────────────
      // 8. Section 03 | COMPLETION & ACADEMIC STATUS
      // ─────────────────────────────────────────────────────────────
      const sec3Y = curCondY + 3;

      doc
        .roundedRect(MARGIN_LEFT, sec3Y, USABLE_W, headerBarH, 3)
        .fill(primaryDark);

      doc
        .font("Helvetica-Bold")
        .fontSize(8.4)
        .fillColor("#ffffff")
        .text("03 | COMPLETION & ACADEMIC STATUS", MARGIN_LEFT + 10, sec3Y + 3.5);

      const sec3BodyY = sec3Y + headerBarH + 5;
      const sec3Text =
        "Internship completion and any certificate or completion record are subject to fulfilment of the programme requirements and successful verification of participation. Academic credit, equivalence or acceptance by a college / university is determined by that institution under its applicable rules. This offer does not guarantee employment, placement or stipend unless expressly stated in the programme details above.";

      doc
        .font("Helvetica")
        .fontSize(7.5)
        .fillColor(textBody)
        .text(sec3Text, MARGIN_LEFT + 7, sec3BodyY, {
          width: USABLE_W - 14,
          align: "justify",
          lineGap: 1.8,
        });

      const sec3H = doc.heightOfString(sec3Text, {
        width: USABLE_W - 14,
        lineGap: 1.8,
      });

      // ─────────────────────────────────────────────────────────────
      // 9. Official Verification QR & Signatory Section
      // ─────────────────────────────────────────────────────────────
      const signSectionY = sec3BodyY + sec3H + 12;

      // Left: Verification QR Code (Larger, crisp card)
      const qrBoxX = MARGIN_LEFT + 6;
      const qrBoxY = signSectionY + 2;
      const qrSize = 44;

      try {
        const verifyTarget =
          data.verificationUrl ||
          `https://www.iiinternship.in/verify/offer?ref=${encodeURIComponent(refNo)}`;

        const qr = qrcode(0, "M");
        qr.addData(verifyTarget);
        qr.make();
        const moduleCount = qr.getModuleCount();
        const cellSize = qrSize / moduleCount;

        doc
          .roundedRect(qrBoxX - 4, qrBoxY - 4, qrSize + 8, qrSize + 8, 4)
          .fillAndStroke("#ffffff", "#a7f3d0");

        doc.fillColor("#0f172a");
        for (let row = 0; row < moduleCount; row++) {
          for (let col = 0; col < moduleCount; col++) {
            if (qr.isDark(row, col)) {
              doc
                .rect(
                  qrBoxX + col * cellSize,
                  qrBoxY + row * cellSize,
                  cellSize,
                  cellSize,
                )
                .fill();
            }
          }
        }

        const qrLabelW = 115;
        const qrLabelX = qrBoxX + qrSize / 2 - qrLabelW / 2;

        doc
          .font("Helvetica-Bold")
          .fontSize(6)
          .fillColor(accentEmerald)
          .text("OFFICIAL VERIFICATION", qrLabelX, qrBoxY + qrSize + 5, {
            width: qrLabelW,
            align: "center",
            lineBreak: false,
          });

        doc
          .font("Helvetica")
          .fontSize(5)
          .fillColor(textMuted)
          .text("Scan QR to validate offer", qrLabelX, qrBoxY + qrSize + 13, {
            width: qrLabelW,
            align: "center",
            lineBreak: false,
          });
      } catch (qrErr) {
        console.error("[Offer Letter PDF] QR generation error:", qrErr);
      }

      // Right: Signatory Block (Symmetrically and Beautifully Centered over Text)
      const sigBlockW = 210;
      const sigBlockX = PAGE_W - MARGIN_RIGHT - sigBlockW;
      const sigY = signSectionY;

      // Prefer clean transparent signature
      const avishekCleanSig = join(
        process.cwd(),
        "public",
        "signature",
        "avishek_clean.png",
      );
      const avishekSigPath = join(
        process.cwd(),
        "public",
        "signature",
        "avishek.jpeg",
      );
      const tapasSigPath = join(
        process.cwd(),
        "public",
        "signature",
        "tapas.jpeg",
      );

      const signaturePath = fs.existsSync(avishekCleanSig)
        ? avishekCleanSig
        : fs.existsSync(avishekSigPath)
        ? avishekSigPath
        : fs.existsSync(tapasSigPath)
        ? tapasSigPath
        : null;

      const sigImgW = 116;
      const sigImgH = 38;
      // Center signature directly over the signatory text block
      const sigImgX = sigBlockX + (sigBlockW - sigImgW) / 2;

      if (signaturePath) {
        try {
          doc.image(signaturePath, sigImgX, sigY, {
            fit: [sigImgW, sigImgH],
            align: "center",
          });
        } catch (_sigErr) {}
      }

      const sigTextY = sigY + sigImgH + 2;

      doc
        .font("Helvetica-Bold")
        .fontSize(9.8)
        .fillColor(textHeading)
        .text(
          data.signatoryName || "Dr. Avishek Kumar",
          sigBlockX,
          sigTextY,
          { width: sigBlockW, align: "center" },
        );

      doc
        .font("Helvetica-Bold")
        .fontSize(8)
        .fillColor(textBody)
        .text(
          data.signatoryDesignation || "Chief Managing Director — [i3]",
          sigBlockX,
          sigTextY + 12,
          { width: sigBlockW, align: "center" },
        );

      doc
        .font("Helvetica-Bold")
        .fontSize(7.6)
        .fillColor(primaryDark)
        .text(
          "International Institute of Internship™",
          sigBlockX,
          sigTextY + 23,
          { width: sigBlockW, align: "center" },
        );

      doc
        .font("Helvetica")
        .fontSize(6.8)
        .fillColor(textMuted)
        .text("A Unit of DPKHRC Trust", sigBlockX, sigTextY + 33, {
          width: sigBlockW,
          align: "center",
        });

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}
