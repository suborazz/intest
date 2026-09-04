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

const immersionData = `
## What is Immersion..?

Immersion is an educational, social, and experiential concept whose core meaning is to completely immerse oneself in a subject, environment, activity, or experience. Immersion occurs when an individual actively participates in a process mentally, emotionally, and behaviorally, rather than remaining a mere external observer. It is not just a method of learning, but a profound learning experience where knowledge, understanding, and behavior develop simultaneously.

From an educational perspective, immersion means learning through experience. It goes beyond limiting the learner to theoretical knowledge from books, connecting them directly to real-world situations, social environments, work contexts, and the realities of life. For example, when a student lives in a rural area and experiences its social, economic, and cultural conditions firsthand, it is called rural immersion. This type of experience deepens the student's sensitivity, perspective, and social understanding.

The greatest characteristic of immersion is that learning becomes natural and spontaneous. It doesn't require a formal curriculum or rigid evaluation system. The individual experiences, questions, develops understanding, and reaches conclusions independently. This process fosters self-reflection, empathy, and a sense of social responsibility within the individual. For this reason, immersion is considered not only an artistic concept but also a crucial process for human development.

In the technological field, immersion is used through mediums like virtual reality, augmented reality, and simulations, where individuals are given the experience of being present in a real environment. In cultural and religious contexts, immersion also refers to the complete submersion of an object or symbol in water, such as the immersion of idols. Thus, the word immersion is used in various fields with different meanings, but the core idea of "complete submersion" remains constant.

In social and developmental programs, the objective of immersion is to connect participants with the realities of society. This develops practical understanding, leadership skills, and a spirit of service in individuals. Emerson's approach not only makes an individual knowledgeable but also helps in developing them into a conscious, responsible, and informed citizen.

Therefore, in short, Emerson's method is a process in which an individual learns, explores, and develops themselves by becoming fully immersed in an experience, environment, or subject. It is a powerful and effective method of connecting knowledge to life, which is considered essential for today's experience-based education and social development.

*The International Institute of Internship (i3) provides its students, young people, and researchers from India and abroad with the opportunity to immerse themselves in various fields and situations, giving them a real-world experience and practical insights. Anyone can register for the Emerson program on the i3 portal and participate in the immersion program at any time. The certificates received after successful completion of the immersion program will prove useful in various aspects of life.*

---

## Differences between Immersion and Internship.

### 1. Concept

- **Immersion:** A process of learning by fully immersing oneself in a subject, field, community, or environment. Experience, observation, and self-reflection are key components.
- **Internship:** Training to learn professional skills by working on real projects within an institution or organization.

### 2. Objective

- The objective of **immersion** is to develop a deep understanding, sensitivity, and a broader perspective.
- The objective of an **internship** is to gain practical experience, work efficiency, and career-oriented skills.

### 3. Learning Method

- In **immersion**, learning happens through lived experience.
- In an **internship**, learning happens through working.

### 4. Work and Responsibilities

- In **immersion**, work responsibilities are limited or symbolic.
- In an **internship**, clear tasks, goals, and responsibilities are defined.

### 5. Duration

- **Immersion** is short-term or objective-based.
- **Internships** are generally for a fixed duration (e.g., 1–6 months).

### 6. Evaluation and Certification

- Formal evaluation is not necessarily required in **immersion**.
- Performance-based evaluation and a certificate are usually provided in an **internship**.

### 7. Relation to Employment

- **Immersion** is not directly related to employment.
- **Internships** are directly linked to employment and career building.

### 8. Examples

- **Immersion:** Rural immersion, community immersion, teacher immersion.
- **Internship:** IT company internship, media internship, NGO internship.

### In short...

**Immersion = Learning deeply through experience.**

**Internship = Learning skills through work.**
`;


export default function ImmersionPage() {
  return (
    <main className="bg-background min-h-screen">
      <HeroSection_8
        tag="Experiential Learning"
        title={
          <span className="animate-[shine-text_5s_linear_infinite] bg-gradient-to-r from-[#ffe866] via-[#f2d507] to-white bg-[length:200%] bg-clip-text text-transparent">
            Immersion & Internships
          </span>
        }
        breadcrumbCurrent="Immersion"
        subtitle="Experience real-world training with our purposeful, structured, and skill-based immersion programs."
        imageSrc="/images/Breadcrum-iit.webp"
        imageAlt="Internships & Immersion"
      />

      <article className="mx-auto max-w-4xl px-6 pb-24 pt-2">
        <div className="prose md:prose-lg text-foreground prose-headings:text-foreground prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 first:prose-h2:mt-0 prose-h3:text-foreground prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-8 prose-h3:mb-4 prose-p:text-foreground prose-p:leading-relaxed prose-p:text-[1.1rem] prose-p:mb-6 prose-strong:text-foreground prose-strong:font-semibold prose-li:text-foreground prose-li:marker:text-foreground max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {immersionData}
          </ReactMarkdown>
        </div>
      </article>
    </main>
  );
}
