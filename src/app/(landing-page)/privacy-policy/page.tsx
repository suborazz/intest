import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Home } from "lucide-react";
import Image from "next/image";
import * as z from "zod";
import { format } from "date-fns";
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

const privacyPolicyData = `
# Privacy Policy

**International Institute of Internship [i3]**  
A Unit of  
Divya Prerak Kahaniyan Humanity Research Centre Trust  
An ISO 21001:2018 Certified Institution  
Registered under the Indian Trusts Act, 1882 (Government of India)  

**Effective Date:** 03 August 2026

---

### 1. Introduction
International Institute of Internship [i3] respects your privacy and is committed to protecting your personal information. This Privacy Policy outlines the information we collect, how we use it, how we secure it, and your rights regarding your information when you use our website, online portals, and related services.

By using our website, you consent to this Privacy Policy.

### 2. Information We Collect
We may collect the following types of information:
* Name
* Father’s/Mother’s name (if required)
* Date of birth
* Gender (if required)
* Mobile number
* Email address
* Permanent and correspondence addresses
* Educational qualifications
* College/University details
* Identity-related documents (where required)
* Photograph and signature
* Information related to internship/immersion applications
* Payment-related details (where applicable)
* Technical information such as IP address, browser type, device information, and website usage data.

### 3. Purpose of Collecting Information
Your information may be used for the following purposes:
* Registration and identity verification
* Processing internship/immersion applications
* Training and assessment
* Issuance of certificates
* Information, updates, and communication related to the institute
* Providing technical support
* Improving website security and performance
* Compliance with legal and administrative requirements

### 4. Cookies and Technical Information
Our website may use cookies and similar technologies to enhance the user experience, analyze website performance, and ensure security.

You can control or disable cookies through your browser settings; however, doing so may affect certain features of the website.

### 5. Sharing of Your Information
We do not sell, rent, or share your personal information with any third party for commercial gain.

Information may be shared in the following circumstances:
* Upon obtaining your explicit consent.
* For certificate verification or educational purposes.
* With technical service providers, strictly to the extent necessary.
* When legally required by a court, government department, or competent authority.
* To comply with applicable laws and regulations.

### 6. Data Security
We implement appropriate administrative, technical, and organizational measures to safeguard your personal information.

However, data transmission over the internet cannot be entirely risk-free. Therefore, while we make every effort to ensure security, we cannot guarantee absolute protection.

### 7. Data Retention and Storage
Your information will be retained only for as long as necessary for the internship/immersion, training, certification, legal compliance, or the Institute's legitimate administrative purposes.

Thereafter, the information may be securely deleted or preserved in an archived format.

### 8. Certificate Verification
To ensure the authenticity of certificates issued by the Institute, limited information—such as the certificate number, participant's name, program name, and date of issuance—may be displayed in the verification system.

### 9. Your Rights
You have the following rights:
* The right to access your personal information.
* The right to request amendments to the information where necessary.
* The right to request the correction of incorrect information.
* The right to request data deletion under appropriate circumstances, subject to law and Institute policies.
* The right to withdraw your consent (where applicable).

### 10. Children's Privacy
If the registration of participants under the age of 18 is required for a program, the consent of a parent or legal guardian may be necessary.

### 11. Third-Party Websites
Our website may contain links to other websites. The International Institute of Internship [i3] is not responsible for the privacy policies or content of those websites.

### 12. Amendments to the Privacy Policy
The Institute reserves the right to amend this Privacy Policy from time to time without prior notice.

The amended policy shall be deemed effective immediately upon publication on the website.

### 13. Contact Us
If you have any questions, suggestions, or complaints regarding this Privacy Policy, please contact us via the contact channels available on our official website.

---

**International Institute of Internship [i3]**  
A Unit of  
Divya Prerak Kahaniyan Humanity Research Centre Trust  

© All Rights Reserved.
`;


export default function PrivacyPolicyPage() {
  return (
    <main className="bg-background min-h-screen">
      <HeroSection_8
        tag="Privacy Policy"
        title={
          <span className="animate-[shine-text_5s_linear_infinite] bg-gradient-to-r from-[#ffe866] via-[#f2d507] to-white bg-[length:200%] bg-clip-text text-4xl font-extrabold text-transparent sm:text-5xl">
            Privacy Policy
          </span>
        }
        breadcrumbCurrent="Privacy Policy"
        subtitle="We care about the security and privacy of your data."
        imageSrc="/images/Breadcrum-iit.webp"
        imageAlt="Students learning"
      />

      <article className="mx-auto max-w-4xl px-6 pb-24 pt-2">
        <div className="prose md:prose-lg text-foreground prose-headings:text-foreground prose-headings:font-bold prose-h1:text-3xl prose-h1:mb-6 prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 first:prose-h2:mt-0 prose-h3:text-foreground prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-8 prose-h3:mb-4 prose-p:text-foreground prose-p:leading-relaxed prose-p:text-[1.1rem] prose-p:mb-6 prose-strong:text-foreground prose-strong:font-semibold prose-li:text-foreground prose-li:marker:text-foreground max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {privacyPolicyData}
          </ReactMarkdown>
        </div>
      </article>
    </main>
  );
}
