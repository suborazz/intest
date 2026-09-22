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

const visionMissionData = `
## Our Vision
### Shaping Futures Through Experience & Purpose.

The vision of the International Institute of Internship (i3) is to provide young people with experiential learning and meaningful internships that prepare them not just for a job, but for a fulfilling life, leadership, and service to society.

**We envision a future where—**

- Learning extends beyond the confines of the classroom and connects with the real world.
- Knowledge transforms into experience, and experience gives rise to innovation.
- Young people/students are self-reliant, confident, and possess a global mindset.

The International Institute of Internship aims to develop young people from India and around the world into competitive individuals on national and international platforms, as well as ethical, sensitive, and socially conscious citizens.

## Our Mission
### Bridging Education, Skills & Real-World Impact.

The mission of the International Institute of Internship (i3) is to bridge the gap between education and the real world of work—through purposeful, skill-based, and value-centered internships.

**We pursue our mission with the following commitments—**

- To mainstream Experiential Learning, Internships, and Skill-Based Education in line with the spirit of the New National Education Policy (NEP) 2020.
- To make students and researchers career-ready and future-proof by connecting them with live projects, field exposure, research, and industry-relevant internships.
- To develop meaningful collaborations between education, industry, social organizations, and research institutions.
- To cultivate leadership qualities, innovative thinking, professional discipline, and ethical values in young people.
- To promote Social Impact, Community Engagement, and Responsible Citizenship through projects connected to the real needs of society.
- To empower individuals to be useful to themselves and society through various immersion programs.

## Our Promise
### More Than an Internship

At the International Institute of Internship, we believe that—

- An internship is not just a certificate, but a journey of learning.
- Training not only imparts skills but also shapes attitudes.
- A career should not just be about employment, but about a meaningful purpose.

**We provide young people and students with a platform where learning becomes experience, experience builds confidence, and confidence shapes the future.**
`;


export default function VisionMissionPage() {
  return (
    <main className="bg-background min-h-screen">
      <HeroSection_8
        tag="Our Goals"
        title={
          <span className="bg-linear-to-r bg-size-[200%] animate-[shine-text_5s_linear_infinite] from-[#ffe866] via-[#f2d507] to-white bg-clip-text text-transparent">
            Vision & Mission
          </span>
        }
        breadcrumbCurrent="Vision & Mission"
        subtitle="Shaping Futures Through Experience & Purpose. Bridging the gap between education and the real world of work."
        imageSrc="/images/hero-vision-mission.jpg"
        imageAlt="Vision & Mission"
      />

      <article className="mx-auto max-w-4xl px-6 pb-24 pt-2">
        <div className="prose md:prose-lg text-foreground prose-headings:text-foreground prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 first:prose-h2:mt-0 prose-h3:text-foreground prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-8 prose-h3:mb-4 prose-p:text-foreground prose-p:leading-relaxed prose-p:text-[1.1rem] prose-p:mb-6 prose-strong:text-foreground prose-strong:font-semibold prose-li:text-foreground prose-li:marker:text-foreground max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {visionMissionData}
          </ReactMarkdown>
        </div>
      </article>
    </main>
  );
}
