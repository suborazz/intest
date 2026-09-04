import { Check } from "lucide-react";
import React_3 from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Code, Home } from "lucide-react";
import Image from "next/image";
import * as z from "zod";
import Link_2 from "next/link";
import React_2 from "react";
import * as React from "react";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { Accordion as AccordionPrimitive } from "radix-ui";
import { ClassValue, clsx as clsx_2 } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx_2(inputs));
}

function Accordion({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn(
        "flex w-full flex-col overflow-hidden rounded-md border",
        className,
      )}
      {...props}
    />
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="data-open:animate-accordion-down data-closed:animate-accordion-up overflow-hidden px-2 text-xs/relaxed"
      {...props}
    >
      <div
        className={cn(
          "h-(--radix-accordion-content-height) [&_a]:underline-offset-3 [&_a]:hover:text-foreground pb-4 pt-0 [&_a]:underline [&_p:not(:last-child)]:mb-4",
          className,
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Content>
  );
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("not-last:border-b data-open:bg-muted/50", className)}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group/accordion-trigger **:data-[slot=accordion-trigger-icon]:ml-auto **:data-[slot=accordion-trigger-icon]:size-4 **:data-[slot=accordion-trigger-icon]:text-muted-foreground relative flex flex-1 items-start justify-between gap-6 border border-transparent p-2 text-left text-xs/relaxed font-medium outline-none transition-all hover:underline disabled:pointer-events-none disabled:opacity-50",
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon
          data-slot="accordion-trigger-icon"
          className="pointer-events-none shrink-0 group-aria-expanded/accordion-trigger:hidden"
        />
        <ChevronUpIcon
          data-slot="accordion-trigger-icon"
          className="pointer-events-none hidden shrink-0 group-aria-expanded/accordion-trigger:inline"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}
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

interface FaqItem {
      question: string;
        answer: string;
    }

const faqsData: FaqItem[] = [
      {
        question: "What is the International Institute of Internship [i3]?",
        answer:
          "The **International Institute of Internship [i3]** is an educational and skill development unit of the **Divya Prerak Kahaniyan Humanity Research Centre Trust.** Its objective is to provide students, researchers, and youth with opportunities for quality internships, immersion programs, training, research, innovation, and practical experience.",
      },
      {
        question: "Who can apply?",
        answer: `The following candidates are eligible to apply:

- Senior school students (where the program is suitable)
- Undergraduate (UG) students
- Postgraduate (PG) students
- Research Scholars
- Youth who have recently completed their undergraduate or postgraduate studies
- Candidates seeking skill development and practical experience

Eligibility criteria may vary depending on the specific program.`,
      },
      {
        question: "Will the internship be conducted online or offline?",
        answer: `Depending on requirements and the specific program, the Institute may conduct internships via the following modes:

- Online
- Offline
- Hybrid (Online + Offline)

Details regarding the mode of delivery will be provided in the official announcement for each program.`,
      },
      {
        question: "What is the duration of the internship?",
        answer: `The duration of the internship varies by program, such as:

- 7 days
- 10 days
- 15 days
- 30 days
- 45 days
- 60 days
- 90 days
- Programs lasting 3 months, 6 months, or other specific durations`,
      },
      {
        question: "Is there a fee for the internship?",
        answer:
          "While the internship program itself is free of charge, fees may be charged for specific facilities or add-ons during the program. Information regarding fees will be clearly published alongside the details of each internship program.",
      },
      {
        question: "Will a stipend be provided?",
        answer:
          "A stipend is not necessarily provided for all internships. If a stipend is provided for a specific program, details regarding it will be included in the program description.",
      },
      {
        question:
          "Will a certificate be awarded upon completion of the internship?",
        answer:
          "Yes. Participants who successfully complete the prescribed attendance, tasks, projects, and assessments will be issued a digital or printed certificate by the institute.",
      },
      {
        question: "Will the certificate be verifiable?",
        answer:
          "Yes. Where applicable, the certificate issued by the institute can be verified online using the Certificate Number, Verification ID, or QR Code.",
      },
      {
        question: "Will this internship be recognized by universities/colleges?",
        answer:
          "Many educational institutions accept internship certificates; however, the final decision rests with the respective university, college, or regulatory body. Participants are advised to obtain prior permission from their institution if required.",
      },
      {
        question: "How to apply?",
        answer:
          "Applications can only be submitted through the online application process available on the institute's official website. Fill out the application form for the selected program, upload the required documents, and pay the prescribed fee where applicable.",
      },
      {
        question: "What documents might be required for the application?",
        answer: `Depending on the program, the following documents may be requested:

- Passport-sized photograph
- Identity proof
- Academic certificates
- College/University ID card
- Bio-data (Resume/CV)
- Other necessary documents`,
      },
      {
        question: "Can the application be modified after submission?",
        answer:
          "If the application process is open and the facility for modification is technically available, changes can be made within the stipulated timeframe. Otherwise, please contact the institute for assistance.",
      },
      {
        question: "Will the fee be refunded?",
        answer:
          "All rules regarding refunds and cancellations will apply in accordance with the institute's Refund & Cancellation Policy.",
      },
      {
        question: "What happens if I leave the internship midway?",
        answer:
          "In such a situation, the participant may not be eligible for a certificate, evaluation, or other benefits. The final decision will be based on the institute's regulations.",
      },
      {
        question: "Is there a job guarantee after the internship?",
        answer:
          "No. The International Institute of Internship does not guarantee any form of job, placement, or employment. The objective of the internship is to provide knowledge, skills, and practical experience.",
      },
      {
        question:
          "Can colleges, universities, and other institutions partner with the institute?",
        answer:
          "Yes. Schools, colleges, universities, training institutes, industries, social organizations, and other entities may contact the institute for academic collaboration, internship partnerships, joint programs, and skill development initiatives.",
      },
      {
        question: "Can international students also apply?",
        answer:
          "If applications for a program are open to international participants, this information will be clearly stated in the program details.",
      },
      {
        question:
          "Does the institute also conduct research and innovation programs?",
        answer:
          "Yes. The institute may periodically organize programs related to research, innovation, skill development, leadership, entrepreneurship, social development, and other academic areas.",
      },
      {
        question: "How can the authenticity of the certificate be verified?",
        answer:
          "If the online verification facility is available, verification can be conducted using the Certificate Number, Verification ID, or QR Code printed on the certificate.",
      },
      {
        question: "What should I do for assistance or to lodge a complaint?",
        answer:
          "If you require assistance regarding the application, payment, internship, certificate, technical issues, or any other matter, please contact us via the channels available on our official website. Our team will strive to provide assistance as soon as possible.",
      },
      {
        question: "Can the institute modify its policies or programs?",
        answer:
          "Yes. The International Institute of Internship reserves the right to amend its programs, eligibility criteria, fees, policies, rules, and website content from time to time. Please check the official website regularly for the latest information.",
      },
    ];

const faqsHighlights = [
      "Quality internships, immersion programs and training",
      "Online, offline and hybrid delivery modes",
      "Verifiable digital and printed certificates",
      "Open to school, UG, PG students and research scholars",
      "A unit of Divya Prerak Kahaniyan Humanity Research Centre Trust",
    ];

const faqsIntro =
      "Welcome! Here you will find answers to common questions regarding the International Institute of Internship [i3]. If your question is not covered here, please contact us via the channels available on our official website.";


export default function FaqsPage() {
  return (
    <main className="bg-background min-h-screen">
      <HeroSection_8
        tag="Help Centre"
        title={
          <span className="bg-linear-to-r bg-size-[200%] animate-[shine-text_5s_linear_infinite] from-[#ffe866] via-[#f2d507] to-white bg-clip-text text-transparent">
            Frequently Asked Questions
          </span>
        }
        breadcrumbCurrent="FAQs"
        subtitle="Answers to common questions about our internships, eligibility, fees, certificates, and application process."
        imageSrc="/images/Breadcrum-iit.webp"
        imageAlt="Frequently Asked Questions"
      />

      <section className="mx-auto max-w-4xl px-6 pb-24 pt-10">
        <p className="text-muted-foreground mb-8 text-[1.05rem] leading-relaxed">
          {faqsIntro}
        </p>

        <ul className="mb-10 grid list-none gap-3 p-0 sm:grid-cols-2">
          {faqsHighlights.map((point) => (
            <li key={point} className="flex items-start gap-2.5">
              <span className="bg-primary/10 text-primary mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full">
                <Check className="size-3" strokeWidth={3} />
              </span>
              <span className="text-foreground text-[15px] font-medium leading-snug">
                {point}
              </span>
            </li>
          ))}
        </ul>

        <h2 className="text-foreground mb-5 text-2xl font-bold tracking-tight">
          Questions &amp; Answers
        </h2>

        {}
        <Accordion
          type="single"
          collapsible
          className="divide-border/60 rounded-2xl"
        >
          {faqsData.map((faq, index) => (
            <AccordionItem key={faq.question} value={`faq-${index}`}>
              <AccordionTrigger className="px-4 text-left text-[15px] font-semibold sm:text-base">
                <span className="text-primary mr-1 font-bold">
                  {index + 1}.
                </span>
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="px-4">
                <div className="prose prose-sm text-muted-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-strong:font-semibold prose-li:text-muted-foreground prose-li:marker:text-muted-foreground max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {faq.answer}
                  </ReactMarkdown>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="border-border/60 bg-muted/40 mt-12 rounded-2xl border p-6 text-center">
          <h3 className="text-foreground m-0 text-lg font-bold">
            International Institute of Internship [i3]
          </h3>
          <p className="text-muted-foreground m-0 mt-1 text-sm">
            A Unit of Divya Prerak Kahaniyan Humanity Research Centre Trust
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-medium">
            <a
              href="tel:+919472352693"
              className="text-primary hover:underline"
            >
              +91 9472352693
            </a>
            <a
              href="mailto:i3.office2025@gmail.com"
              className="text-primary hover:underline"
            >
              i3.office2025@gmail.com
            </a>
          </div>
          <p className="text-muted-foreground m-0 mt-4 text-xs font-semibold uppercase tracking-wider">
            Learning • Innovation • Research • Excellence
          </p>
        </div>
      </section>
    </main>
  );
}
