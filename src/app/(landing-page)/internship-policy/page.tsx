import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Home } from "lucide-react";
import Image from "next/image";
import * as z from "zod";
import Link_2 from "next/link";
import React_2 from "react";
interface HeroSectionProps {
      tag: string;
      title: React_2.ReactNode;
      breadcrumbCurrent: string;
      subtitle: string;
      imageSrc: string;
      imageAlt?: string;
    }

const HeroSection_8: React_2.FC<HeroSectionProps> = ({
      tag,
      title,
      breadcrumbCurrent,
      subtitle,
      imageSrc,
      imageAlt = "Hero Image",
    }) => {
      return (
        <>
          <style>{`
        @keyframes float-spark {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes shine-text {
          to { background-position: 200%; }
        }
      `}</style>

          <section className="to-primary relative isolate overflow-hidden bg-gradient-to-br from-emerald-950 via-emerald-800 pb-[140px] pt-[60px] max-md:pb-[100px] max-md:pt-[40px]">
            <div className="pointer-events-none absolute inset-0 -z-[4] bg-[radial-gradient(theme(colors.white/0.05)_1px,transparent_1px)] [background-size:24px_24px]"></div>
            {}
            <div className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.08] mix-blend-overlay"></div>

            <div className="relative z-10 mx-auto grid w-[min(1300px,calc(100%-40px))] grid-cols-1 items-center gap-[40px] lg:grid-cols-2">
              {}
              <div className="relative mx-auto max-w-[580px] text-center font-sans lg:mx-0 lg:text-left">
                <div className="mb-[18px] inline-block rounded-full bg-white/10 px-[14px] py-[6px] text-[0.75rem] tracking-[1px] text-[#d4ffe8] backdrop-blur-md max-sm:text-[0.65rem]">
                  ✨ {tag}
                </div>

                <div
                  className="absolute -top-[10px] left-[20px] h-[8px] w-[8px] animate-[float-spark_3s_infinite] rounded-full bg-[#ffd700]"
                  aria-hidden="true"
                ></div>
                <div
                  className="absolute left-[50px] top-[10px] h-[5px] w-[5px] animate-[float-spark_3s_infinite_1s] rounded-full bg-[#ffd700]"
                  aria-hidden="true"
                ></div>

                <div className="relative">
                  <h1 className="text-[clamp(2.2rem,5vw,4.5rem)] font-extrabold leading-[1.1] tracking-[-1.2px] text-white">
                    {title}
                  </h1>

                  <div className="mt-[14px] flex flex-wrap items-center justify-center gap-[8px] text-[0.9rem] font-medium text-white/70 lg:justify-start">
                    <Link_2
                      href="/"
                      className="transition-colors hover:text-[#ffd700]"
                    >
                      🏠 Home
                    </Link_2>
                    <span>/</span>
                    <span className="text-[#ffd700]">{breadcrumbCurrent}</span>
                  </div>

                  <p className="mt-[18px] text-[clamp(0.95rem,1.2vw,1.1rem)] leading-[1.7] text-white/80">
                    {subtitle}
                  </p>
                </div>
              </div>

              {}
              <div className="relative mt-8 flex justify-center lg:mt-0 lg:justify-end">

                <img
                  src={imageSrc}
                  alt={imageAlt}
                  className="relative z-[2] aspect-video w-full max-w-[100%] rounded-[18px] object-cover shadow-[0_30px_80px_rgba(0,0,0,0.4)] md:aspect-[4/3] md:max-w-[520px]"
                />
              </div>
            </div>

            {}
            <div className="pointer-events-none absolute bottom-[-1px] left-0 w-full overflow-hidden leading-none">
              <svg
                viewBox="0 0 1440 180"
                preserveAspectRatio="none"
                className="fill-background block h-[80px] w-full md:h-[150px]"
              >
                <path d="M0,125 C260,145 520,78 790,92 C1020,104 1225,70 1440,62 L1440,180 L0,180 Z" />
              </svg>
            </div>
          </section>
        </>
      );
    };

const internshipPolicyData = `
## Internship Policy

**International Institute of Internship™ [i3]**  
*(In accordance with NEP-2020 and UGC Internship Guidelines)*

---

### 1. Objective
The International Institute of Internship [i3] is a unit of the DPKHRC Trust. The DPKHRC Trust was registered on May 3, 2023, in the Lalganj Tehsil of Uttar Pradesh under the Indian Trusts Act, 1882.

The objective of [i3] is to provide students with practical experience, skill development, and employment-oriented training across industry, research, social sectors, and digital workplaces. This policy has been formulated in alignment with the spirit of NEP-2020 and the UGC Internship/Research Internship Guidelines.

### 2. Nature of Programs
The International Institute of Internship [i3] may conduct the following types of programs:

* Skill Development Internship
* Research Internship
* Industry Internship
* Virtual Internship
* Hybrid Internship
* NGO/CSR Internship
* Entrepreneurship Internship
* Other Need-Based Internships

### 3. Important Declaration
[i3] does not provide employment or jobs, nor does it offer any guarantee thereof.

[i3] provides students with training, mentorship, live projects, assessment, certification, and opportunities/encouragement to connect with the industry.

### 4. Fee Policy
The International Institute of Internship does not charge students a fee for conducting the internship itself.

If a fee is prescribed for any [i3] program or training, it applies solely to the following services:

* Learning Management System (LMS)
* Study Material
* Faculty/Industry Mentoring
* Live Project Support
* Assessment & Evaluation
* Digital Verification
* Administrative Support
* Support fee for special arrangements for students during internships/skill-based training

Any fee or contribution collected for specific facilities during the internship/training does not imply the purchase of an internship certificate. It should be specifically noted that [i3] does not charge a fee for conducting the internship. 

It should be clearly understood that [i3] is a platform that brings together industry experts from various fields—in a setting preferred by students and conducive to their comfort—to enhance their skill development. It focuses on preparing students for the transition from campus to the corporate world. Naturally, inviting industry experts from diverse sectors entails certain costs; to cover this, [i3] may charge a nominal contribution fee from its registered students.

**Note:**
* [i3] may charge registered participants/researchers a fee to cover accommodation and other necessary arrangements for its immersion programs.
* Registered instructors/mentors associated with [i3] will be paid appropriate remuneration for their services.

### 5. Stipend Policy
A stipend is not mandatory for every internship organized or sponsored by [i3]. Some internships may be entirely free of charge, while others might involve a contribution fee for specific facilities.

If a participating industry or organization provides a stipend, it will be paid directly by that organization.

[i3] does not guarantee a stipend to students; this will depend on the specific circumstances.

### 6. University-based Internships
If a student undertakes an internship through [i3] for academic credit at their university:
The terms and conditions of the university/college will be adhered to.

An MoU will be signed with the respective university or educational institution if required.

Reports, evaluations, and certificates will be issued in accordance with the university's requirements.

### 7. Certificates
Certificates will be issued only to students who have:

* Completed the prescribed training,
* Met the attendance and project requirements,
* Successfully passed the evaluation.

### 8. Refund Policy
If a student withdraws their application before the program begins, the institute's published Refund Policy will apply.

Generally, fees will not be refunded after the program has commenced, unless the institute decides otherwise due to exceptional circumstances.

### 9. Student Responsibilities
* Punctuality
* Ethical conduct
* Maintaining proper behavior and decorum
* Avoiding plagiarism or any form of fraud
* Adhering to the rules of the institute and the industry

### 10. Responsibilities of the Institute
[i3] will ensure that:

* Trained instructors/mentors are available,
* There are clear learning outcomes,
* Proper assessment is conducted,
* Internship/training completion certificates are issued on time,
* A grievance redressal mechanism is in place.

### 11. Employment-related Disclaimer
[i3] does not guarantee any student a job, assured placement, a fixed stipend, or selection by any specific company.

### 12. Legal Compliance
[i3] will conduct its programs in accordance with the laws applicable in India, NEP-2020, relevant UGC guidelines, and other applicable regulations. If any new statutory directive is issued in the future, this policy may be amended to align with it.

---
**Last Update: 26 July 2026**
`;


export default function InternshipPolicyPage() {
  return (
    <main className="bg-background min-h-screen">
      <HeroSection_8
        tag="Legal Policy"
        title={
          <span className="animate-[shine-text_5s_linear_infinite] bg-gradient-to-r from-[#ffe866] via-[#f2d507] to-white bg-[length:200%] bg-clip-text text-4xl font-extrabold text-transparent sm:text-5xl">
            Internship Policy
          </span>
        }
        breadcrumbCurrent="Internship Policy"
        subtitle="Please read our Internship Policy carefully to understand rules, fees, stipend policy, certificates, and more."
        imageSrc="/images/hero-legal-policies.jpg"
        imageAlt="Internship Policy"
      />

      <article className="mx-auto max-w-4xl px-6 pb-24 pt-2">
        <div className="prose md:prose-lg text-foreground prose-headings:text-foreground prose-headings:font-bold prose-h1:text-3xl prose-h1:mb-6 prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 first:prose-h2:mt-0 prose-h3:text-foreground prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-8 prose-h3:mb-4 prose-p:text-foreground prose-p:leading-relaxed prose-p:text-[1.1rem] prose-p:mb-6 prose-strong:text-foreground prose-strong:font-semibold prose-li:text-foreground prose-li:marker:text-foreground max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {internshipPolicyData}
          </ReactMarkdown>
        </div>
      </article>
    </main>
  );
}
