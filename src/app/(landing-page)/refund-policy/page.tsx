import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Home, Phone } from "lucide-react";
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

const refundPolicyData = `
# Refund & Cancellation Policy

**International Institute of Internship [i3]**  
A Unit of  
Divya Prerak Kahaniyan Humanity Research Centre Trust  
An ISO 21001:2018 Certified Institution  
Registered under the Indian Trusts Act, 1882 (Government of India)  

**Effective Date:** 03 August 2026

---

### 1. Introduction
This Refund & Cancellation Policy applies to all online and offline internships, immersions, training sessions, workshops, certificate programs, seminars, and other educational services conducted by the International Institute of Internship [i3].

Please read this policy carefully before registering for any program and making the fee payment. Payment of the fee shall be deemed as acceptance of this policy.

### 2. Registration Fee
It is clarified that the internship itself is entirely free of cost. However, a special personal facilitation fee may be charged for the internship. Registration fees deposited for immersions, training sessions, or other programs are utilized to reserve a seat in the respective program and to cover administrative and technical processes.

### 3. Refund Policy
Under normal circumstances, fees deposited for any program shall be non-refundable and non-transferable.

Fees will not be refunded in the following circumstances:
* Voluntary withdrawal from the program by the participant.
* Failure to participate in the program at the scheduled time.
* Failure to submit documents on time.
* Failure to meet eligibility criteria.
* Failure to complete attendance or project work.
* Withdrawal from the program due to personal, family, health, or other private reasons.
* Inability to participate in the training due to internet, device, or technical issues.

### 4. Refunds in Special Circumstances
The Institute may consider a full or partial refund at its discretion under the following special circumstances:
* If a program is permanently cancelled by the Institute.
* If the fee has been deducted more than once due to a technical error.
* If a clear systemic error in the payment process is proven.

In such cases, the final decision shall rest with the Institute.

### 5. Cancellation Policy
Participants may request to withdraw their application at any time. However, the cancellation of an application does not automatically entitle the applicant to a fee refund. Whether the fee is refunded remains at the Institute's discretion.

### 6. Changes to the Program
The Institute reserves the right to make the following changes if necessary:
* Program date
* Training timings
* Curriculum/Syllabus
* Trainer/Instructor
* Mode of training (Online/Offline/Hybrid)
* Training venue
* Evaluation process

Such changes shall not constitute grounds for a fee refund.

### 7. Postponement or Cancellation of the Program
If the program has to be postponed or cancelled due to unavoidable circumstances (such as natural disasters, pandemics, government directives, technical issues, or other unforeseen situations), the Institute may decide on one of the following options:
* Conducting the program on a new date.
* Allocating a spot to the participant in an upcoming batch.
* Full or partial fee refund (if deemed appropriate by the Institute).

### 8. Payment-Related Disputes
In the event of any payment-related issue, the participant must contact the Institute providing the payment receipt, Transaction ID, and other necessary details.

Refund requests made without adequate proof will not be considered.

### 9. Refund Process
If a refund is approved, the amount will be credited back to the original bank account, card, UPI, or payment method used for the initial payment within a maximum of 7 working days (wherever possible).

The completion of the refund process may take a few working days, depending on banking and payment system protocols.

### 10. Misuse
If a participant provides incorrect information or forged documents, engages in inappropriate activity or fraud, or violates the Institute's rules, their registration may be cancelled immediately; in such cases, no refund will be payable.

### 11. Policy Amendments
The International Institute of Internship [i3] reserves the right to amend this Refund & Cancellation Policy without prior notice.

The amended policy will be considered effective immediately upon publication on the website.

### 12. Contact
For any questions, complaints, or assistance regarding this policy, please contact the Institute via the contact channels available on our official website.  
📞 **Phone:** +91 9472351693  
✉️ **Email:** i3.office2025@gmail.com  

---

**International Institute of Internship [i3]**  
A Unit of  
Divya Prerak Kahaniyan Humanity Research Center Trust  

© All Rights Reserved.
`;


export default function RefundPolicyPage() {
  return (
    <main className="bg-background min-h-screen">
      <HeroSection_8
        tag="Refund & Cancellation"
        title={
          <span className="animate-[shine-text_5s_linear_infinite] bg-gradient-to-r from-[#ffe866] via-[#f2d507] to-white bg-[length:200%] bg-clip-text text-4xl font-extrabold text-transparent sm:text-5xl">
            Refund & Cancellation
          </span>
        }
        breadcrumbCurrent="Refund Policy"
        subtitle="Our policies regarding course, internship, and program fee refunds and cancellations."
        imageSrc="/images/Breadcrum-iit.webp"
        imageAlt="Students learning"
      />

      <article className="mx-auto max-w-4xl px-6 pb-24 pt-2">
        <div className="prose md:prose-lg text-foreground prose-headings:text-foreground prose-headings:font-bold prose-h1:text-3xl prose-h1:mb-6 prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 first:prose-h2:mt-0 prose-h3:text-foreground prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-8 prose-h3:mb-4 prose-p:text-foreground prose-p:leading-relaxed prose-p:text-[1.1rem] prose-p:mb-6 prose-strong:text-foreground prose-strong:font-semibold prose-li:text-foreground prose-li:marker:text-foreground max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {refundPolicyData}
          </ReactMarkdown>
        </div>
      </article>
    </main>
  );
}
