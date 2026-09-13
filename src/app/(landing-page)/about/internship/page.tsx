import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Home, Key, Building } from "lucide-react";
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

const internshipData = `
## What is an Internship?
### Understanding Internship in Today’s Education System.

An internship is a structured, purposeful, and experience-based learning process in which students or young professionals gain real-world experience by working with an institution, organization, or project.

It goes beyond limiting education to textbooks, connecting it instead to practical application, skills, and professional understanding.

**Today, internships have become an essential step in career building—especially in the context of the new National Education Policy (NEP) 2020.**

## The Importance of Internships
### Why Internship Matters

In modern times, employers look not only at degrees but also at the ability to perform the job. Internships provide young people with the opportunity to—

- Apply classroom knowledge in practice.
- Understand real-world work situations.
- Learn professional discipline and work culture.
- Develop confidence and decision-making skills.

**In short, an internship is the link between learning and career.**

## Key Objectives of Internships

- Connecting theoretical knowledge with practical exposure.
- Enhancing skill development and employability among students.
- Developing a clear understanding of career options.
- Improving leadership, teamwork, and problem-solving abilities.
- Establishing a direct connection with society, industry, and the research sector.

## Internship as per National Education Policy 2020.

The new National Education Policy (NEP) 2020 has recognized internships as a mandatory and effective part of the education system. Its key points are—

- Special emphasis on experiential learning.
- Internships, project work, and field exposure alongside studies.
- Promotion of "Learning by Doing" and "Earn while Learn".
- A multi-disciplinary and skill-based education system.

All internship programs of the International Institute of Internship (i3) are based on these concepts of NEP 2020.

## Types of Internships
### Types of Internships at i3

The International Institute of Internship offers over **300+ Internship Programs** and **600+ Skill Enhancement Training Tracks** in various fields—

- Academic & Research Internship
- Skill Development & Technical Internship
- Social & Community Internship
- Digital, Media & Content Internship
- Management & Entrepreneurship Internship

**Internships may be available on-campus, online, offline, and in hybrid modes.**

## Benefits of Internships

- Real-world work experience that is not available in academic institutions, which helps you determine if the field is right for you!
- Development of skills, confidence, and professional mindset.
- Access to networking and career opportunities.
- Strengthening your resume and profile.
- Meaningful learning with a certificate.

## Internship at International Institute of Internship
### More Than Just Training

Internships at the International Institute of Internship (i3) are not just a formality, but a structured learning process that includes mentorship, guidance, and evaluation.

They have a positive impact on both society and your career.

We believe that—

**An internship is not just preparation for the future, but the first step towards the future.**

## International Institute of Internship (i3)
**Learning by Doing. Growing with Purpose. Building Careers.**

### In simple terms:

**Internship = "Trial Job" or "Practice Job"**

That is, practicing working in a company/organization without the pressure of a full-time job.
`;


export default function InternshipPage() {
  return (
    <main className="bg-background min-h-screen">
      <HeroSection_8
        tag="Experiential Learning"
        title={
          <span className="animate-[shine-text_5s_linear_infinite] bg-gradient-to-r from-[#ffe866] via-[#f2d507] to-white bg-[length:200%] bg-clip-text text-transparent">
            What is an Internship?
          </span>
        }
        breadcrumbCurrent="Internship"
        subtitle="Learn about the importance of internships in today's education system and how it builds your career."
        imageSrc="/images/Breadcrum-iit.webp"
        imageAlt="Internships"
      />

      <article className="mx-auto max-w-4xl px-6 pb-24 pt-2">
        <div className="prose md:prose-lg text-foreground prose-headings:text-foreground prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 first:prose-h2:mt-0 prose-h3:text-foreground prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-8 prose-h3:mb-4 prose-p:text-foreground prose-p:leading-relaxed prose-p:text-[1.1rem] prose-p:mb-6 prose-strong:text-foreground prose-strong:font-semibold prose-li:text-foreground prose-li:marker:text-foreground max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {internshipData}
          </ReactMarkdown>
        </div>
      </article>
    </main>
  );
}
