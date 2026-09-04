import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Code, Home, User, Phone, Users } from "lucide-react";
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
                    <Link_2
                      href="/about"
                      className="transition-colors hover:text-[#ffd700]"
                    >
                      About Us
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
                <div className="absolute left-1/2 top-[10px] z-[1] h-[140px] w-[220px] -translate-x-1/2 rotate-[12deg] rounded-[20px] bg-gradient-to-br from-[#ffd700] to-[#ffea70] md:top-[20px] md:h-[180px] md:w-[300px] lg:left-auto lg:right-[60px] lg:translate-x-0"></div>

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

const otherPolicyData = `
# Other Policies

## Certificate Verification Policy, Code of Conduct & Disclaimer

**International Institute of Internship [i3]**  
A Unit of  
Divya Prerak Kahaniyan Humanity Research Centre Trust  
An ISO 21001:2018 Certified Institution  
Registered under the Indian Trusts Act, 1882 (Government of India)  

**Effective Date:** 03 August 2026

---

### ↗️ Part – I: Certificate Verification Policy

#### 1. Objective
This Certificate Verification Policy has been formulated to ensure the authenticity of all certificates issued by the International Institute of Internship [i3] and to facilitate verification for employers, educational institutions, and other concerned parties.

#### 2. Certificate Validity
Each certificate issued by the Institute may carry a unique Certificate Number/Verification ID or a QR Code (where applicable).

Only verification conducted via the Institute's authorized portal or based on written confirmation shall be considered valid.

#### 3. Verification Process
The following information may be displayed for certificate verification:
* Participant's Name and ID
* Program/Internship Name and ID
* Certificate Number
* Date of Issue
* Certificate Status (Valid/Invalid)

Confidential personal information will not be displayed publicly.

#### 4. Fraudulent Certificates
If a certificate is found to be tampered with, forged, or contains unauthorized modifications or incorrect information, it shall be immediately declared invalid, and legal action may be initiated if deemed necessary.

#### 5. Right to Revoke Certificates
The Institute reserves the right to revoke a certificate under the following circumstances:
* Obtaining admission by providing incorrect information.
* Submission of forged documents.
* Plagiarism or academic irregularities.
* Serious violation of the Institute's Code of Conduct.
* Orders from a court or competent authority.

---

### ↗️ Part – II: Code of Conduct

#### 1. Objective
The objective of the International Institute of Internship [i3] is to provide a high-quality, safe, respectful, and ethical learning environment. Every participant, trainer, instructor, and associate is expected to adhere to the following code of conduct.

#### 2. Responsibilities of Participants
All participants shall—
* Provide accurate and truthful information.
* Complete tasks and projects on time.
* Maintain respectful behavior towards trainers and fellow participants.
* Adhere to all prescribed rules and guidelines.
* Strive to uphold the reputation of the Institute.

#### 3. Prohibited Activities
The following activities are strictly prohibited—
* Submitting forged documents or providing incorrect information.
* Plagiarism.
* Claiming another person's work as one's own.
* Harassment of any individual (online or offline).
* Indecent, offensive, or discriminatory behavior.
* Cyber abuse, hacking, or data theft.
* Unauthorized use of the Institute's logo, name, or certificates.
* Any form of illegal activity.

#### 4. Disciplinary Action
In the event of a violation, the Institute may take the following actions—
* Issuing a warning.
* Terminating the internship.
* Withholding or revoking certificates.
* Barring participation in future programs.
* Initiating legal action, if necessary.

The decision of the Institute shall be final and binding.

---

### ↗️ Part – III: Disclaimer

#### 1. General Disclaimer
All information available on the International Institute of Internship [i3] website is published solely for educational, training, and general informational purposes.

While the Institute strives to maintain the accuracy and currency of the information, it shall not be held liable for any errors, omissions, or changes.

#### 2. Employment-Related Disclaimer
The Institute does not guarantee jobs, placements, stipends, income, or employment to any participant.

The objective of the Internship & Immersion program is to provide skill development, training, research opportunities, and practical experience.

#### 3. Website Availability
The Institute strives to ensure the continuous availability of the website; however, service may be temporarily interrupted due to technical reasons, server maintenance, internet issues, or other unforeseen circumstances.

#### 4. Third-Party Content
The Institute shall not be held liable for the content, security, or policies of any external websites, links, or third-party services available on the website.

#### 5. User Responsibility
Users shall use the website at their own discretion and risk.

The user bears sole responsibility for the accuracy and validity of any information provided by them.

#### 6. Intellectual Property
All content, training materials, logos, designs, documents, text, videos, and other intellectual property available on the website are the property of the International Institute of Internship or its authorized owners.

Republishing, modifying, commercially using, or distributing any content without prior written permission is prohibited.

#### 7. Right to Amend
The Institute reserves the right to amend this document, website content, programs, rules, or policies at any time without prior notice.

#### 8. Governing Law and Jurisdiction
This policy shall be governed by the prevailing laws of India.

In the event of any dispute, jurisdiction shall lie with the courts where the registered office or head office of the Divya Prerak Kahaniyan Humanity Research Centre Trust is located.

#### 9. Contact
If you have any questions, suggestions, or complaints regarding this document, please contact us via the contact channels available on our official website.  
📞 **Phone:** +91 9472351693  
✉️ **Email:** i3.office2025@gmail.com  

---

**International Institute of Internship [i3]**  
A Unit of  
Divya Prerak Kahaniyan Humanity Research Centre Trust  

*"Learning • Innovation • Research • Excellence"*  

© All Rights Reserved.
`;


export default function OtherPolicyPage() {
  return (
    <main className="bg-background min-h-screen">
      <HeroSection_8
        tag="Guidelines & Disclaimers"
        title={
          <span className="animate-[shine-text_5s_linear_infinite] bg-gradient-to-r from-[#ffe866] via-[#f2d507] to-white bg-[length:200%] bg-clip-text text-3xl font-extrabold leading-tight text-transparent sm:text-5xl">
            Other Policies
          </span>
        }
        breadcrumbCurrent="Other Policies"
        subtitle="Certificate Verification Policy, Code of Conduct, and Disclaimer details."
        imageSrc="/images/Breadcrum-iit.webp"
        imageAlt="Students learning"
      />

      <article className="mx-auto max-w-4xl px-6 pb-24 pt-2">
        <div className="prose md:prose-lg text-foreground prose-headings:text-foreground prose-headings:font-bold prose-h1:text-3xl prose-h1:mb-6 prose-h2:text-2.5xl prose-h2:mt-12 prose-h2:mb-6 first:prose-h2:mt-0 prose-h3:text-foreground prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-8 prose-h3:mb-4 prose-p:text-foreground prose-p:leading-relaxed prose-p:text-[1.1rem] prose-p:mb-6 prose-strong:text-foreground prose-strong:font-semibold prose-li:text-foreground prose-li:marker:text-foreground max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {otherPolicyData}
          </ReactMarkdown>
        </div>
      </article>
    </main>
  );
}
