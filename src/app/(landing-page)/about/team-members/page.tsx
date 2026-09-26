import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Award, Briefcase, GraduationCap, Quote, Sparkles, Users } from "lucide-react";

interface HeroSectionProps {
  tag: string;
  title: React.ReactNode;
  breadcrumbCurrent: string;
  subtitle: string;
  imageSrc: string;
  imageAlt?: string;
}

const HeroSection_8: React.FC<HeroSectionProps> = ({
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
        <div className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.08] mix-blend-overlay"></div>

        <div className="relative z-10 mx-auto grid w-[min(1300px,calc(100%-40px))] grid-cols-1 items-center gap-[40px] lg:grid-cols-2">
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
                <Link
                  href="/"
                  className="transition-colors hover:text-[#ffd700]"
                >
                  🏠 Home
                </Link>
                <span>/</span>
                <Link
                  href="/about"
                  className="transition-colors hover:text-[#ffd700]"
                >
                  About Us
                </Link>
                <span>/</span>
                <span className="text-[#ffd700]">{breadcrumbCurrent}</span>
              </div>

              <p className="mt-[18px] text-[clamp(0.95rem,1.2vw,1.1rem)] leading-[1.7] text-white/80">
                {subtitle}
              </p>
            </div>
          </div>

          <div className="relative mt-8 flex justify-center lg:mt-0 lg:justify-end">

            <img
              src={imageSrc}
              alt={imageAlt}
              className="relative z-[2] aspect-video w-full max-w-[100%] rounded-[18px] object-cover shadow-[0_30px_80px_rgba(0,0,0,0.4)] md:aspect-[4/3] md:max-w-[520px]"
            />
          </div>
        </div>

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

const leaders = [
  {
    name: "Dr. Avishek Kumar",
    role: "Founder & CMD",
    image: "/images/mentors/dr-avishek-kumar.jpg",
    bio: "A renowned literary figure, thinker, educator, researcher, and social activist. He believes that education is meaningful when it empowers individuals with self-reliance, sensitivity, and social service. Under his leadership, i3 was developed as a platform that connects academic knowledge with real-world work experiences.",
    badge: "Leadership & Vision",
  },
  {
    name: "Mr. Tapas Kumar",
    role: "CEO, Learnify Consultancy, Lucknow",
    image: "/images/mentors/tapas-kumar.jpg",
    bio: "Played an inspiring role in shaping the vision of i3. His ideas and encouragement paved the way for creating opportunities, developing skills, and fostering a global perspective for students. He emphasized that internships should be a process of character and personality development, discipline, and professional understanding.",
    badge: "Strategic Advisory",
  },
];

export default function TeamMembersPage() {
  return (
    <main className="bg-background min-h-screen">
      <HeroSection_8
        tag="Our People"
        title={
          <span className="animate-[shine-text_5s_linear_infinite] bg-gradient-to-r from-[#ffe866] via-[#f2d507] to-white bg-[length:200%] bg-clip-text text-transparent">
            Team Members
          </span>
        }
        breadcrumbCurrent="Team Members"
        subtitle="Meet the passionate individuals and visionaries who are driving the mission of the International Institute of Internship."
        imageSrc="/images/hero-team.jpg"
        imageAlt="Our Team"
      />

      <article className="mx-auto max-w-5xl px-4 sm:px-6 pb-24 pt-6">
        {/* Intro */}
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80 text-xs font-bold uppercase tracking-wider mb-4">
            <Users className="size-3.5" />
            Leadership &amp; Visionaries
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Guiding the Next Generation of Global Interns
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            The foundation of the International Institute of Internship [i3] is built upon the dedication, expertise, and forward-thinking of its leadership. Our team consists of renowned educators, industry experts, and social activists committed to empowering the youth.
          </p>
        </div>

        {/* Leadership Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {leaders.map((leader, idx) => (
            <div
              key={idx}
              className="group relative flex flex-col rounded-3xl border border-emerald-900/10 bg-white p-6 sm:p-8 shadow-xl shadow-emerald-950/5 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-950/10"
            >
              {/* Photo & Badge */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 mb-6">
                <div className="relative size-32 sm:size-36 shrink-0 overflow-hidden rounded-2xl border-2 border-emerald-600/20 bg-emerald-50 shadow-md">
                  <Image
                    src={leader.image}
                    alt={leader.name}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 128px, 144px"
                  />
                </div>
                <div className="flex flex-col text-center sm:text-left justify-center flex-1">
                  <span className="inline-flex items-center self-center sm:self-start gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/70 px-2.5 py-0.5 rounded-full mb-2">
                    <Sparkles className="size-3" />
                    {leader.badge}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                    {leader.name}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-emerald-700">
                    {leader.role}
                  </p>
                </div>
              </div>

              {/* Bio */}
              <div className="relative mt-auto rounded-2xl bg-slate-50/80 p-4 border border-slate-100">
                <Quote className="absolute right-3 top-3 size-4 text-emerald-600/20" />
                <p className="text-sm leading-relaxed text-slate-700 font-normal">
                  {leader.bio}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Core Philosophy Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#063B27] via-[#0A5C36] to-[#04281A] p-8 sm:p-10 text-white shadow-2xl">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#34d399_1px,transparent_1px)] opacity-10 [background-size:20px_20px]" />
          
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1 text-xs font-bold text-emerald-200 backdrop-blur-md mb-4 border border-white/10">
              <Award className="size-3.5" />
              Our Core Philosophy
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug mb-3">
              Learning Beyond the Classroom
            </h3>
            <p className="text-sm sm:text-base text-emerald-50/90 leading-relaxed mb-6">
              Our team operates with a unified philosophy—that learning should extend beyond the classroom. The mentors, guides, and project coordinators at i3 work tirelessly to ensure that every student receives hands-on experience, professional guidance, and true mentorship.
            </p>
            <div className="inline-block rounded-2xl border border-emerald-400/30 bg-white/10 px-5 py-3 text-sm sm:text-base font-semibold text-white backdrop-blur-md">
              &ldquo;We are not just an institution, but a movement where education becomes experience, and experience creates the future.&rdquo;
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
