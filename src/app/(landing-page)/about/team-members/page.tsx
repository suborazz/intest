import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Award,
  Briefcase,
  GraduationCap,
  Quote,
  Sparkles,
  Users,
  Building2,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { prisma } from "@/x/e3746f45";

export const dynamic = "force-dynamic";

interface Official {
  id: string;
  slNo: number;
  name: string;
  designation: string;
  workingLocation: string;
  mobile: string;
  email: string;
  isActive?: boolean;
}

async function getOfficials(): Promise<Official[]> {
  try {
    const rows = await prisma.$queryRawUnsafe<any[]>(`
      SELECT 
        id, 
        "slNo", 
        name, 
        designation, 
        "workingLocation", 
        mobile, 
        email, 
        "isActive"
      FROM institution_officials
      WHERE "isActive" = true
      ORDER BY "slNo" ASC, "createdAt" ASC
    `);
    return rows || [];
  } catch (error) {
    console.error("Error fetching officials for team-members page:", error);
    return [];
  }
}

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

export default async function TeamMembersPage() {
  const dbOfficials = await getOfficials();

  // Clean fallback sample records if DB doesn't have officials yet
  const officials: Official[] =
    dbOfficials.length > 0
      ? dbOfficials
      : [
        {
          id: "sample_1",
          slNo: 1,
          name: "Dr. Avishek Kumar",
          designation: "CMD & Founder",
          workingLocation: "Patna / Varanasi",
          mobile: "+91 9911439898",
          email: "info@iiinternship.in",
        },
        {
          id: "sample_2",
          slNo: 2,
          name: "Mr. Tapas Kumar",
          designation: "CEO",
          workingLocation: "Lucknow, Uttar Pradesh",
          mobile: "+91 9911439898",
          email: "tapas@learnifyconsultancy.com",
        },
      ];

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

        {/* ── List of Officials from Our Institution ── */}
        <section className="mb-16">
          <div className="mb-8 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80 text-xs font-bold uppercase tracking-wider mb-3">
              <Building2 className="size-3.5" />
              Administrative Governance
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              List of Officials from Our Institution
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
              संस्थान के अन्य महत्वपूर्ण पदाधिकारीगण, समन्वयक एवं विभिन्न क्षेत्रीय केंद्रों के प्रशासनिक प्रतिनिधि।
            </p>
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block overflow-hidden rounded-3xl border border-emerald-900/10 bg-white shadow-xl shadow-emerald-950/5">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-emerald-100 bg-gradient-to-r from-emerald-50/90 via-emerald-50/50 to-slate-50/90 text-xs font-bold uppercase tracking-wider text-emerald-900">
                  <th className="py-4 px-5 text-center w-20">Sl. No.</th>
                  <th className="py-4 px-6">Name</th>
                  <th className="py-4 px-6">Designation</th>
                  <th className="py-4 px-6">Working Location</th>
                  <th className="py-4 px-6">Contact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {officials.map((official) => (
                  <tr
                    key={official.id}
                    className="transition hover:bg-emerald-50/30 group"
                  >
                    <td className="py-4 px-5 text-center font-bold text-emerald-700">
                      <span className="inline-flex size-8 items-center justify-center rounded-xl bg-emerald-50 text-xs font-extrabold text-emerald-800 border border-emerald-200/70">
                        {official.slNo}
                      </span>
                    </td>

                    <td className="py-4 px-6">
                      <div className="font-bold text-slate-900 text-[15px] group-hover:text-emerald-800 transition">
                        {official.name}
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <div className="inline-flex items-center gap-1.5 font-medium text-slate-700">
                        <Briefcase className="size-3.5 text-emerald-600 shrink-0" />
                        <span>{official.designation}</span>
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <div className="inline-flex items-center gap-1.5 font-medium text-slate-600 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full text-xs">
                        <MapPin className="size-3.5 text-amber-600 shrink-0" />
                        <span className="text-amber-900">{official.workingLocation}</span>
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <div className="flex flex-col gap-1.5 text-xs">
                        {official.mobile && (
                          <a
                            href={`tel:${official.mobile}`}
                            className="inline-flex items-center gap-2 font-semibold text-emerald-700 hover:text-emerald-800 hover:underline transition"
                          >
                            <Phone className="size-3.5 shrink-0 text-emerald-600" />
                            <span>{official.mobile}</span>
                          </a>
                        )}
                        {official.email && (
                          <a
                            href={`mailto:${official.email}`}
                            className="inline-flex items-center gap-2 text-slate-600 hover:text-emerald-700 hover:underline transition"
                          >
                            <Mail className="size-3.5 shrink-0 text-emerald-600" />
                            <span>{official.email}</span>
                          </a>
                        )}
                        {!official.mobile && !official.email && (
                          <span className="text-slate-400 italic">No contact provided</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards View */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {officials.map((official) => (
              <div
                key={official.id}
                className="relative rounded-2xl border border-emerald-900/10 bg-white p-5 shadow-md shadow-emerald-950/5 space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="inline-flex size-6 items-center justify-center rounded-lg bg-emerald-50 text-[11px] font-bold text-emerald-800 border border-emerald-200/80 mb-1.5">
                      #{official.slNo}
                    </span>
                    <h3 className="text-base font-bold text-slate-900">
                      {official.name}
                    </h3>
                    <p className="text-xs font-semibold text-emerald-700 mt-0.5 flex items-center gap-1.5">
                      <Briefcase className="size-3 shrink-0" />
                      {official.designation}
                    </p>
                  </div>

                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 border border-amber-200/80 px-2.5 py-1 text-[11px] font-semibold text-amber-800 shrink-0">
                    <MapPin className="size-3 shrink-0 text-amber-600" />
                    {official.workingLocation}
                  </span>
                </div>

                <div className="border-t border-slate-100 pt-3 flex flex-col gap-2 text-xs">
                  {official.mobile && (
                    <a
                      href={`tel:${official.mobile}`}
                      className="inline-flex items-center gap-2 font-medium text-emerald-700 bg-emerald-50/60 p-2 rounded-xl"
                    >
                      <Phone className="size-3.5 shrink-0" />
                      <span>{official.mobile}</span>
                    </a>
                  )}
                  {official.email && (
                    <a
                      href={`mailto:${official.email}`}
                      className="inline-flex items-center gap-2 font-medium text-slate-700 bg-slate-50 p-2 rounded-xl"
                    >
                      <Mail className="size-3.5 shrink-0 text-emerald-600" />
                      <span className="truncate">{official.email}</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

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
