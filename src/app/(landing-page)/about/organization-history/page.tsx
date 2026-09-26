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

const organizationHistoryData = `
## Organization History

### Our Journey of Vision, Leadership & Experiential Learning.

The **International Institute of Internship [i3]** was established on September 3, 2025, with a vision to empower youth not just through internships/academic certifications, but also through practical experience, skill-based learning, social awareness, and connect them with systematic employment opportunities.

The institute is a flagship unit of the **Divya Prerak Kahaniyan Humanity Research Centre Trust (DPKHRC Trust)**. The DPKHRC Trust has been actively involved in humanities research, the publication of inspirational literature, social upliftment activities, and nation-building. It is within this ideological background that the International Institute of Internship [i3] was born.

## Founder's Vision

The founder & CMD of the institute is **Dr. Avishek Kumar**, a renowned literary figure, thinker, educator, researcher, and social activist. He believes that education is meaningful when it empowers individuals with self-reliance, sensitivity, and social service.

Under the leadership of **Dr. Avishek Kumar**, the International Institute of Internship [i3] was developed as a platform that connects academic knowledge with real-world work experiences, providing young people with the opportunity to learn, explore, and contribute.

## Inspiration & Guiding Thought

**Mr. Tapas Kumar** (CEO, Learnify Consultancy, Lucknow) played an inspiring role in shaping the vision of the International Institute of Internship [i3]. His ideas and encouragement paved the way for creating opportunities, developing skills, and fostering a global perspective for students. He always emphasized that internships should not be merely training, but a process of character and personality development, discipline, and professional understanding. His inspiration will always live on in the work culture of the International Institute of Internship.

## Alignment with National Education Policy 2020.

The new National Education Policy (NEP) 2020 has given internships and experiential learning a significant place in the Indian education system. According to the policy, 80 to 120 hours of practical internships are now mandatory for undergraduate students. Furthermore:

- Education should be made multidisciplinary and skill-oriented.
- Students should be connected to real-world work experience, fieldwork, research, and internships.
- "Earn while learning" and learning by doing should be promoted.

The **International Institute of Internship [i3]** model has been developed in line with these core concepts of NEP 2020. i3 provides students with academic knowledge, along with internships, practical skills, research insights, professional exposure, and employment opportunities, enabling them to meet future challenges.

## Moving Forward with Purpose

Today, the International Institute of Internship continues to collaborate with educational institutions, universities, social organizations, and professional platforms nationally and internationally. Our mission is to:

- Provide quality, purposeful, and value-based internships and immersion programs.
- Develop leadership, innovation, and social responsibility among youth.
- Bridge the gap between education and employment.
- Conduct internship programs at nominal fees, both on-campus at educational institutions, colleges, and universities, and in a hybrid online mode.

**The International Institute of Internship [i3] is not an institution, but a movement—where education becomes experience, and experience creates the future.**
`;


export default function OrganizationHistoryPage() {
  return (
    <main className="bg-background min-h-screen">
      <HeroSection_8
        tag="Our Story"
        title={
          <span className="animate-[shine-text_5s_linear_infinite] bg-gradient-to-r from-[#ffe866] via-[#f2d507] to-white bg-[length:200%] bg-clip-text text-transparent">
            Organization History
          </span>
        }
        breadcrumbCurrent="Organization History"
        subtitle="The International Institute has built a strong reputation through its commitment to excellence, advanced training programs, and student-focused growth over the years."
        imageSrc="/images/hero-org-history.jpg"
        imageAlt="Organization History"
      />

      <article className="mx-auto max-w-4xl px-6 pb-24 pt-2">
        <div className="prose md:prose-lg text-foreground prose-headings:text-foreground prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 first:prose-h2:mt-0 prose-h3:text-foreground prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-8 prose-h3:mb-4 prose-p:text-foreground prose-p:leading-relaxed prose-p:text-[1.1rem] prose-p:mb-6 prose-strong:text-foreground prose-strong:font-semibold prose-li:text-foreground prose-li:marker:text-foreground max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {organizationHistoryData}
          </ReactMarkdown>
        </div>
      </article>
    </main>
  );
}
