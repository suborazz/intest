import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Code, Home, User, Users } from "lucide-react";
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

const termsAndConditionData = `
## Terms & Conditions

**International Institute of Internship [i3]**  
A Unit of  
Divya Prerak Kahaniyan Humanity Research Centre Trust  
An ISO 21001:2018 Certified Institution  
Registered under the Indian Trusts Act, 1882 (Government of India)  

**Effective Date:** 03 August 2026

---

### 1. Introduction
Please read these Terms & Conditions carefully before using the official website of the *International Institute of Internship [i3]* (www.iiinternship.in) and any online or offline services operated by it. Using the website, registering, applying, or participating in any program constitutes your acknowledgment that you have read and agreed to these Terms & Conditions.

If you do not agree to these terms, please do not use the website or our services.

### 2. Introduction to the Institute
*International Institute of Internship [i3]* is an academic and skill development unit of the Divya Prerak Kahaniyan Humanity Research Centre Trust. Its objective is to provide students, researchers, and youth with quality internships, skill-based training, research opportunities, innovation, and practical experience.

### 3. Eligibility
Candidates are required to provide accurate and truthful information when applying for the Institute's various internship, immersion, and skill development programs.

The Institute reserves the right to accept or reject any application at its discretion.

### 4. Registration and User Responsibilities
* Each user is solely responsible for maintaining the confidentiality of their login ID and password.
* Misuse of another person's identity is prohibited.
* Registration may be cancelled if incorrect, misleading, or fraudulent information is provided.

### 5. Internship & Immersion Programs
* The nature, duration, tasks, training, evaluation, and certification for each internship and immersion program will be determined according to the specific program.
* All participants must adhere to the guidelines prescribed by the Institute.
* Timely completion and submission of project work, adherence to deadlines, and submission of reports are mandatory.

### 6. Certificate
The Internship & Immersion Certificate will be awarded only to those participants who have successfully fulfilled all requirements regarding assigned tasks, attendance, projects, and evaluations.

The Institute reserves the right to issue or withhold the certificate for any reason.

### 7. No Guarantee of Employment
The International Institute of Internship [i3] does not guarantee any job, placement, stipend, or employment.

The objective of the internship is solely to provide skill development, practical training, and experience.

### 8. Intellectual Property
All content, designs, logos, text, training materials, videos, documents, and other intellectual property available on the website are the property of the Institute or its authorized owners.

Copying, republishing, or commercial use of any material without prior written permission is prohibited.

### 9. Material Submitted by Participants
The Institute may use projects, reports, research, or other materials submitted by participants for academic, training, promotional, and archival purposes, unless a separate written agreement has been made beforehand.

### 10. Confidentiality
Public disclosure of any confidential information, documents, or project details obtained during the Internship & Immersion program without permission is prohibited.

### 11. Code of Conduct
The following activities are strictly prohibited:
* Submitting forged documents.
* Plagiarism.
* Inappropriate language or behavior.
* Cyber misuse.
* Activities that damage the Institute's reputation.
* Violation of another participant's rights.

In the event of a violation, the Institute may terminate the registration without prior notice.

### 12. Fees & Refund
If a fee is prescribed for a program, it shall be payable in accordance with the program notification.

Fees once deposited shall generally be non-refundable, unless the Institute declares otherwise in writing.

### 13. Website Usage
Users shall use the website solely for legitimate and academic purposes.

Attempts to hack the website, steal data, spread viruses, or cause technical damage in any manner shall be punishable by law.

### 14. External Links
Links to third-party websites available on the website may be provided solely for convenience. The Institute shall not be responsible for the content or policies of such websites.

### 15. Limitation of Liability
The Institute strives to provide accurate and up-to-date information but shall not be liable for any technical errors, service interruptions, data loss, or direct or indirect damages.

### 16. Right to Amend
The Institute reserves the right to amend these Terms & Conditions at any time without prior notice.

Amended rules shall be deemed effective immediately upon publication on the website.

### 17. Governing Law
All these terms and conditions shall be subject to the prevailing laws of India. In the event of any dispute, the jurisdiction of the competent court shall be the place where the Trust's registered office is located.

### 18. Contact
If you have any questions regarding these terms and conditions, please contact the Institute through the contact channels available on the official website.

---

*© International Institute of Internship [i3]*  
A Unit of  
Divya Prerak Kahaniyan Humanity Research Centre Trust  
All Rights Reserved.
`;


export default function TermsAndConditionPage() {
  return (
    <main className="bg-background min-h-screen">
      <HeroSection_8
        tag="Legal Policy"
        title={
          <span className="animate-[shine-text_5s_linear_infinite] bg-gradient-to-r from-[#ffe866] via-[#f2d507] to-white bg-[length:200%] bg-clip-text text-4xl font-extrabold text-transparent sm:text-5xl">
            Terms & Conditions
          </span>
        }
        breadcrumbCurrent="Terms & Conditions"
        subtitle="Please read these Terms & Conditions carefully before using our website and services."
        imageSrc="/images/hero-legal-policies.jpg"
        imageAlt="Terms and Conditions"
      />

      <article className="mx-auto max-w-4xl px-6 pb-24 pt-2">
        <div className="prose md:prose-lg text-foreground prose-headings:text-foreground prose-headings:font-bold prose-h1:text-3xl prose-h1:mb-6 prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 first:prose-h2:mt-0 prose-h3:text-foreground prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-8 prose-h3:mb-4 prose-p:text-foreground prose-p:leading-relaxed prose-p:text-[1.1rem] prose-p:mb-6 prose-strong:text-foreground prose-strong:font-semibold prose-li:text-foreground prose-li:marker:text-foreground max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {termsAndConditionData}
          </ReactMarkdown>
        </div>
      </article>
    </main>
  );
}
