"use client";

import * as React from "react";
import {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
  forwardRef,
  useImperativeHandle,
} from "react";
import Link from "next/link";
import {
  AnimatePresence,
  Variants,
  motion,
  PanInfo,
  useMotionValue,
  useTransform,
} from "framer-motion";
import {
  Activity,
  Anchor,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Award,
  BookOpen,
  Box,
  Briefcase,
  Building,
  Check,
  CheckCircle,
  CheckCircle2,
  Compass,
  Cpu,
  Download,
  FileCheck,
  FileDown,
  FileText,
  Globe,
  GraduationCap,
  HeartHandshake,
  HeartPulse,
  Landmark,
  Laptop,
  Layers,
  LucideIcon,
  MapPin,
  Microscope,
  Palette,
  PieChart,
  Play,
  Presentation,
  Rocket,
  Search,
  Shield,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  User,
  UserPlus,
  Users,
  Zap,
} from "lucide-react";
import { clsx, ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ---------------------------------------------------------
// NEW DESIGN HERO & UGC / STAKEHOLDER DATA
// ---------------------------------------------------------

const UGC_FRAMEWORK_POINTS = [
  {
    title: "NEP 2020 & UGC 2024 Aligned",
    desc: "Meets mandatory 60–120 hrs / 2–4 credit requirements for undergraduate & postgraduate curricula.",
  },
  {
    title: "Research & Industry Domains",
    desc: "Hands-on projects mapped to real-world corporate problem statements and practical workflows.",
  },
  {
    title: "Mentorship & Guided Cohorts",
    desc: "Direct mentorship by industry leaders and experienced academic instructors.",
  },
  {
    title: "Verifiable Digital Certificates",
    desc: "Instant tamper-proof online verification for resumes, LinkedIn, and academic submissions.",
  },
  {
    title: "Evaluation & Viva Preparation",
    desc: "Weekly progress tracking, structured logs, and final viva presentation assessments.",
  },
];

const WHO_WE_SERVE = [
  {
    title: "Students & Graduates",
    icon: GraduationCap,
    desc: "Gain hands-on industry exposure, work on live projects, build your portfolio, and earn recognized credits.",
    cta: "Explore Internships",
    href: "/internship",
    badge: "Students",
  },
  {
    title: "Instructors & Mentors",
    icon: Users,
    desc: "Guide ambitious youth, lead live cohorts, share domain expertise, and create real educational impact.",
    cta: "Become a Mentor",
    href: "/instructor/registration",
    badge: "Mentors",
  },
  {
    title: "Institutions & Colleges",
    icon: Building,
    desc: "Seamlessly integrate UGC-compliant internship programs, track cohort performance, and boost NAAC scores.",
    cta: "Partner With Us",
    href: "/partners",
    badge: "Colleges",
  },
  {
    title: "Organizations & Companies",
    icon: Briefcase,
    desc: "Hire pre-screened interns, sponsor innovation challenges, and build an agile future talent pipeline.",
    cta: "Hire Interns",
    href: "/partners",
    badge: "Industry",
  },
];

const IMPACT_STATS = [
  { value: "10,000+", label: "Students Empowered", sub: "Across India & Abroad" },
  { value: "500+", label: "Partner Institutions", sub: "Colleges & Industry" },
  { value: "1,000+", label: "Completed Internships", sub: "NEP 2020 Compliant" },
  { value: "50+", label: "Domain Programs", sub: "Tech, Business & Research" },
];

const TRUST_PILLARS = [
  {
    title: "Not-for-Profit Mission",
    desc: "A public charitable trust initiative of DPKHRC dedicated to high-quality accessible education.",
    icon: HeartHandshake,
  },
  {
    title: "Quality & Academic Rigor",
    desc: "Curricula designed in adherence with national higher education regulatory frameworks.",
    icon: ShieldCheck,
  },
  {
    title: "Future-Ready Skills",
    desc: "Focus on AI, Cloud, Analytics, Engineering, Finance, and modern creative domains.",
    icon: Cpu,
  },
  {
    title: "Inclusive & Accessible",
    desc: "Equal learning opportunities for students from Tier 1, 2, and 3 cities nationwide.",
    icon: Globe,
  },
];

// ---------------------------------------------------------
// ORIGINAL PLATFORM SECTIONS DATA
// ---------------------------------------------------------

interface CategoryData {
  id: number;
  icon: LucideIcon;
  title: string;
  courses: string;
  description: string;
}

const CourseCategoryData: CategoryData[] = [
  {
    id: 1,
    icon: Cpu,
    title: "AI, Quantum & Emerging Tech",
    courses: "15+ Programs",
    description: "Artificial Intelligence, GenAI, Quantum Computing, Cyber Security, Cloud DevOps & IoT.",
  },
  {
    id: 2,
    icon: Building,
    title: "Core Engineering & Industry",
    courses: "20+ Programs",
    description: "Civil, Mechanical, Electrical, Semiconductor, Embedded Systems, ITI & Polytechnic training.",
  },
  {
    id: 3,
    icon: Palette,
    title: "Design, Media & Digital Creation",
    courses: "18+ Programs",
    description: "UI/UX Design, Animation, VFX, Multimedia, Digital Marketing, Journalism & Mass Communication.",
  },
  {
    id: 4,
    icon: PieChart,
    title: "Business, FinTech & Operations",
    courses: "22+ Programs",
    description: "Finance & Accounting, FinTech, Blockchain, HR Management, E-Commerce & Supply Chain.",
  },
  {
    id: 5,
    icon: HeartPulse,
    title: "Healthcare, Pharmacy & Bio",
    courses: "12+ Programs",
    description: "Healthcare Management, Public Health, Para-Medical, Biotechnology & Bioinformatics.",
  },
  {
    id: 6,
    icon: Globe,
    title: "Agri, Food & Renewable Energy",
    courses: "14+ Programs",
    description: "Agriculture & Allied, Food Industry, EV & Renewable Energy, Environmental & Water Management.",
  },
];

// Complete 100+ Disciplines mapped from Page 3 of Prospectus
export const PROSPECTUS_ALL_DISCIPLINES = [
  { name: "General Internship (Humanities, Arts, Applied Science, Commerce, Law & Education)", category: "Humanities & General", icon: BookOpen },
  { name: "Civil, Mechanical & Electrical Engineering Internship (Applied Industry Training)", category: "Engineering", icon: Building },
  { name: "Artificial Intelligence & Generative AI Internship", category: "Emerging Tech", icon: Cpu },
  { name: "Cyber Security & Ethical Hacking Internship", category: "Emerging Tech", icon: ShieldCheck },
  { name: "Cloud Computing & DevOps Internship", category: "Emerging Tech", icon: Laptop },
  { name: "Quantum Computing Internship", category: "Emerging Tech", icon: Sparkles },
  { name: "Internet of Things (IoT) Internship", category: "Emerging Tech", icon: Activity },
  { name: "Semiconductor & Embedded Systems Internship", category: "Engineering", icon: Cpu },
  { name: "FinTech & Blockchain Internship", category: "Business & Finance", icon: PieChart },
  { name: "UI/UX Design Internship", category: "Design & Media", icon: Palette },
  { name: "Animation, VFX & Multimedia Internship", category: "Design & Media", icon: Layers },
  { name: "Digital Marketing & Creation Internship", category: "Design & Media", icon: Target },
  { name: "Media, Journalism & Mass Communication Internship", category: "Design & Media", icon: FileText },
  { name: "Media & Entertainment Internship", category: "Design & Media", icon: Play },
  { name: "Finance & Accounting Management Internship", category: "Business & Finance", icon: PieChart },
  { name: "Human Resource Management Internship", category: "Business & Finance", icon: Users },
  { name: "Business & Operations Internship", category: "Business & Finance", icon: Briefcase },
  { name: "Logistics & Supply Chain Management Internship", category: "Business & Finance", icon: Box },
  { name: "E-Commerce & Retail Management Internship", category: "Business & Finance", icon: Briefcase },
  { name: "Inventory Management Internship", category: "Business & Finance", icon: Box },
  { name: "Biotechnology & Bioinformatics Internship", category: "Healthcare & Life Sciences", icon: Microscope },
  { name: "Healthcare Management Internship", category: "Healthcare & Life Sciences", icon: HeartPulse },
  { name: "Public Health & Para-Medical Internship", category: "Healthcare & Life Sciences", icon: HeartHandshake },
  { name: "Pharmacy Internship", category: "Healthcare & Life Sciences", icon: HeartPulse },
  { name: "Agriculture & Allied Internship", category: "Agri & Green Tech", icon: Globe },
  { name: "Food Industry Sector Internship", category: "Agri & Green Tech", icon: Award },
  { name: "EV & Renewable Energy Internship", category: "Agri & Green Tech", icon: Zap },
  { name: "Environmental Science Internship", category: "Agri & Green Tech", icon: Globe },
  { name: "Water Management Internship", category: "Agri & Green Tech", icon: Activity },
  { name: "Tourism & Hospitality Management Internship", category: "Specialized Sectors", icon: Compass },
  { name: "Automobile Sector Internship", category: "Specialized Sectors", icon: Rocket },
  { name: "Telecommunication Sector Internship", category: "Specialized Sectors", icon: Laptop },
  { name: "Construction & Infrastructure Internship", category: "Engineering", icon: Building },
  { name: "ITI & Polytechnique Internship", category: "Engineering", icon: Award },
  { name: "Insurance Sector Internship", category: "Business & Finance", icon: Shield },
  { name: "Leather Sector Internship", category: "Specialized Sectors", icon: Box },
  { name: "Packaging Sector Internship", category: "Specialized Sectors", icon: Box },
  { name: "Beauty & Wellness Internship", category: "Specialized Sectors", icon: Sparkles },
  { name: "Mining Sector Internship", category: "Specialized Sectors", icon: Landmark },
  { name: "Electronics Sector Internship", category: "Engineering", icon: Cpu },
  { name: "Skill & Personality Development Internship", category: "Humanities & General", icon: UserPlus },
  { name: "Other Tailored & Need-Based Internships", category: "Tailored", icon: Sparkles },
];

// Immersion Programs from Page 4 of Prospectus
export const PROSPECTUS_IMMERSIONS = [
  {
    id: 1,
    title: "Spirituality, Language & Culture Immersion",
    locations: "Thailand, Sri Lanka, Bhutan",
    duration: "15 - 180 Days",
    type: "International Immersion",
    desc: "Cross-border cultural understanding, comparative spiritual philosophy, and international cultural exchange.",
  },
  {
    id: 2,
    title: "Spirituality, Language & Culture Immersion (National)",
    locations: "Uttarakhand, Himachal Pradesh, UP, Bihar, Gujarat, Rajasthan, Telangana, Tamil Nadu",
    duration: "15 - 180 Days",
    type: "National Immersion",
    desc: "Deep linguistic roots, indigenous traditions, architectural heritage, and living traditions across India.",
  },
  {
    id: 3,
    title: "Himalayan Civilization & Culture Immersion",
    locations: "Uttarakhand, HP, J&K, Sikkim, Assam, Arunachal Pradesh & Nepal",
    duration: "15 - 180 Days",
    type: "Regional & Cross-Border",
    desc: "Ecology, community sustainability, high-altitude indigenous knowledge, and Himalayan civilizational research.",
  },
  {
    id: 4,
    title: "Rural Development & Social Welfare Immersion",
    locations: "Pan India (Rural & Semi-Urban Clusters)",
    duration: "15 - 180 Days",
    type: "Grassroots Fieldwork",
    desc: "Hands-on participation in community welfare, rural livelihood mapping, and grassroots social development initiatives.",
  },
  {
    id: 5,
    title: "Sadguru Kabir & Humanity Immersion",
    locations: "Maghar, Sant Kabir Nagar, Uttar Pradesh",
    duration: "15 - 180 Days",
    type: "Humanistic Research",
    desc: "Philosophical study of universal brotherhood, saint literature, societal harmony, and ethical leadership.",
  },
];

const HeroCourseData = [
  {
    id: 1,
    category: "AI & EMERGING TECH",
    title: "Artificial Intelligence & Generative AI Internship",
    rating: "4.9/ 3.4k Reviews",
    duration: "4 - 12 Weeks",
    mode: "Online / Hybrid / On-Campus",
    credits: "2 to 4 UGC Credits",
    image: "/images/courses/ai-generative-ai.jpg",
    hoverColor: "#2d8cff",
    hoverText: "Build LLM applications, prompt engineering pipelines, and neural networks with live industry mentors.",
  },
  {
    id: 2,
    category: "CORE ENGINEERING",
    title: "Civil, Mechanical & Electrical Engineering (Applied Industry Training)",
    rating: "4.8/ 2.8k Reviews",
    duration: "4 - 12 Weeks",
    mode: "On-Campus / Industrial Site",
    credits: "2 to 4 UGC Credits",
    image: "/images/courses/core-engineering.jpg",
    hoverColor: "#30a46c",
    hoverText: "Hands-on CAD/CAM, site analysis, power systems, automation, and structural quality compliance.",
  },
  {
    id: 3,
    category: "AI & EMERGING TECH",
    title: "Cyber Security & Ethical Hacking Internship",
    rating: "4.9/ 2.9k Reviews",
    duration: "4 - 12 Weeks",
    mode: "Virtual / Hybrid",
    credits: "2 to 4 UGC Credits",
    image: "/images/courses/cyber-security.jpg",
    hoverColor: "#3b82f6",
    hoverText: "Vulnerability assessment, network defense, penetration testing, and SOC log forensics.",
  },
  {
    id: 4,
    category: "BUSINESS & FINTECH",
    title: "FinTech, Blockchain & Financial Management Internship",
    rating: "4.8/ 2.1k Reviews",
    duration: "4 - 12 Weeks",
    mode: "Virtual / Hybrid",
    credits: "2 to 4 UGC Credits",
    image: "/images/courses/fintech-blockchain.jpg",
    hoverColor: "#2d8cff",
    hoverText: "Explore smart contracts, digital banking APIs, risk analysis, and corporate financial modeling.",
  },
  {
    id: 5,
    category: "DESIGN & MEDIA",
    title: "UI/UX Design, Animation & VFX Multimedia Internship",
    rating: "4.9/ 2.5k Reviews",
    duration: "4 - 12 Weeks",
    mode: "Virtual / On-Campus",
    credits: "2 to 4 UGC Credits",
    image: "/images/courses/uiux-design.jpg",
    hoverColor: "#6d5efc",
    hoverText: "Master Figma design systems, motion graphics, wireframing, and 3D visual storytelling.",
  },
  {
    id: 6,
    category: "HEALTHCARE & BIO",
    title: "Healthcare Management, Pharmacy & Biotechnology Internship",
    rating: "4.8/ 1.8k Reviews",
    duration: "4 - 12 Weeks",
    mode: "On-Campus / Virtual",
    credits: "2 to 4 UGC Credits",
    image: "/images/courses/healthcare-bio.jpg",
    hoverColor: "#2494ff",
    hoverText: "Clinical trial workflow, bio-informatics analysis, pharmacy logistics, and public health systems.",
  },
  {
    id: 7,
    category: "AGRI & SUSTAINABILITY",
    title: "EV & Renewable Energy, Environmental Science Internship",
    rating: "4.8/ 1.9k Reviews",
    duration: "4 - 12 Weeks",
    mode: "Hybrid / On-Campus",
    credits: "2 to 4 UGC Credits",
    image: "/images/courses/ev-renewable-energy.jpg",
    hoverColor: "#3182ce",
    hoverText: "Solar/wind power systems, battery management architectures, EV powertrains, and eco-auditing.",
  },
  {
    id: 8,
    category: "DESIGN & MEDIA",
    title: "Digital Marketing, Media, Journalism & Mass Communication",
    rating: "4.8/ 2.4k Reviews",
    duration: "4 - 12 Weeks",
    mode: "Virtual / Hybrid",
    credits: "2 to 4 UGC Credits",
    image: "/images/courses/digital-media-marketing.jpg",
    hoverColor: "#30a46c",
    hoverText: "Brand storytelling, investigative journalism, digital ad pipelines, and viral content production.",
  },
];

const HeroCourseTabs = [
  "ALL",
  "AI & EMERGING TECH",
  "CORE ENGINEERING",
  "BUSINESS & FINTECH",
  "HEALTHCARE & BIO",
  "DESIGN & MEDIA",
  "AGRI & SUSTAINABILITY",
];

const MentorsData = [
  {
    id: 1,
    name: "Dr. Avishek Kumar",
    role: "Master Trainer & Academic Advisor (DPKHRC Trust)",
    quote:
      "Under DPKHRC Trust, this initiative bridges academic theory and real-world competency with complete dedication to student career outcomes and practical UGC credits.",
    image: "/images/mentors/dr-avishek-kumar.jpg?v=2",
  },
  {
    id: 2,
    name: "Rajesh Kumar Pandey",
    role: "Master Trainer & Technical Assessor",
    quote:
      "Guiding i3 interns through hands-on technical architectures and real engineering projects ensures they become genuinely job-ready from Day 1.",
    image: "/images/mentors/rajesh-kumar-pandey.jpg",
  },
  {
    id: 3,
    name: "Aman Goel",
    role: "Faculty & Academic Administrator (LRC)",
    quote:
      "The structured NEP 2020 credit curriculum and daily sprint reviews give our students unmatched confidence, technical clarity, and verified credentials.",
    image: "/images/mentors/aman-goel.jpg",
  },
];

const DUMMY_TESTIMONIALS = [
  {
    id: 1,
    name: "Ananya Mishra",
    role: "B.Tech CSE Intern, Cohort '24",
    stars: 5,
    text: "The mentorship provided here is unparalleled. I completed my mandatory 8th semester college credit requirements smoothly while building a real full-stack web application.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: 2,
    name: "Rohan Patel",
    role: "Data Analytics Intern",
    stars: 5,
    text: "Amazing structure and guidance. The hands-on project reviews and verifiable digital certificate helped me land my job at a top tech firm within weeks.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: 3,
    name: "Pooja Hegde",
    role: "Business Management Trainee",
    stars: 5,
    text: "A truly transformative experience. The feedback on my weekly case studies was detailed and gave me the confidence to ace corporate interviews.",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
  },
];

const floatingFaces = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=160&q=80",
    className: "w-[62px] h-[62px] left-1 top-[146px]",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=180&q=80",
    className: "w-[102px] h-[102px] -left-[34px] bottom-[98px]",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?auto=format&fit=crop&w=120&q=80",
    className: "w-[78px] h-[78px] left-[168px] bottom-[30px]",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
    className: "w-[58px] h-[58px] left-[356px] bottom-[102px]",
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1546961329-78bef0414d7c?auto=format&fit=crop&w=100&q=80",
    className: "w-[40px] h-[40px] left-[522px] bottom-[56px]",
  },
];

const galleryItems = [
  {
    id: 1,
    title: "Convocation & Degree Honours",
    subtitle: "Graduating scholars & honorary doctorate awards",
    image: "/images/gallery/moment-7.png",
    className: "col-span-2 row-span-2",
  },
  {
    id: 2,
    title: "International Buddha Award Ceremony",
    subtitle: "Global recognition & cross-border cultural honors",
    image: "/images/gallery/moment-1.jpg",
    className: "col-span-1 row-span-1",
  },
  {
    id: 3,
    title: "Airport Welcome of International Delegation",
    subtitle: "Warm reception accorded to visiting global delegates",
    image: "/images/gallery/moment-2.png",
    className: "col-span-1 row-span-1",
  },
  {
    id: 4,
    title: "Grand National Awards Assembly",
    subtitle: "Trophies, citations & leadership honors on dais",
    image: "/images/gallery/moment-14.jpg",
    className: "col-span-2 row-span-1",
  },
  {
    id: 5,
    title: "Inaugural Lamp Lighting (Deep Prajjwalan)",
    subtitle: "Traditional assembly with faculty, leaders & delegates",
    image: "/images/gallery/moment-16.png",
    className: "col-span-2 row-span-1",
  },
  {
    id: 6,
    title: "Training Centre Faculty & Mentors",
    subtitle: "Instructors, academic leaders & scholars cohort",
    image: "/images/gallery/moment-13.jpg",
    className: "col-span-1 row-span-1",
  },
  {
    id: 7,
    title: "Internship Certificate Distribution",
    subtitle: "Field training & practical project completion felicitation",
    image: "/images/gallery/moment-8.jpg",
    className: "col-span-1 row-span-1",
  },
];

const HeroGoalCards = [
  {
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=900&q=80",
    title: "Daily Live Industry Mentorship",
    description:
      "Work directly with senior industry practitioners, sprint standups, and resolve live project roadblocks.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80",
    title: "UGC 60-120 hrs Credit Mapping",
    description:
      "Structured practical modules meeting mandatory 2–4 academic college credits under NEP 2020.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80",
    title: "Verifiable Global Credentials",
    description:
      "24/7 project repository access, digital tamper-proof certificates, logbooks, and mock interview prep.",
  },
];

const HeroGoalPoints = [
  "Hands-on Live Industry Projects & Mentorship",
  "UGC Guidelines (2024) & NEP 2020 2-4 Credits",
  "Verifiable Global Certificates & Mock Interviews",
];

const HeroNewsItems = [
  "300+ Internship Programs Available",
  "600+ Skill Enhancement Training Programs",
  "100+ Immersion Programs Available",
  "10,000+ Students Empowered",
  "500+ Partner Organizations & Mentors",
  "UGC Guidelines (2024) & NEP 2020 Aligned",
  "Unit of DPKHRC Trust (ISO 21001:2018 Certified)",
];

const whyChoosePoints = [
  "Free & accessible for physically challenged students",
  "Seamless online enrollment & instant ID card generation",
  "Verifiable digital completion certificate & credit transcript",
  "Direct placement assistance with partner corporate networks",
];

// ---------------------------------------------------------
// HELPER ANIMATION HOOKS & COMPONENTS
// ---------------------------------------------------------

interface StackRef {
  next: () => void;
  prev: () => void;
}

interface StackProps {
  randomRotation?: boolean;
  sensitivity?: number;
  sendToBackOnClick?: boolean;
  cards?: React.ReactNode[];
  animationConfig?: { stiffness: number; damping: number };
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
  mobileClickOnly?: boolean;
  mobileBreakpoint?: number;
  onTopCardChange?: (topCardId: number) => void;
}

interface CardRotateProps {
  children: React.ReactNode;
  onSendToBack: () => void;
  sensitivity: number;
  disableDrag?: boolean;
}

function CardRotate({
  children,
  onSendToBack,
  sensitivity,
  disableDrag = false,
}: CardRotateProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [60, -60]);
  const rotateY = useTransform(x, [-100, 100], [-60, 60]);

  function handleDragEnd(
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) {
    if (
      Math.abs(info.offset.x) > sensitivity ||
      Math.abs(info.offset.y) > sensitivity
    ) {
      onSendToBack();
    } else {
      x.set(0);
      y.set(0);
    }
  }

  if (disableDrag) {
    return (
      <motion.div
        className="absolute inset-0 cursor-pointer"
        style={{ x: 0, y: 0 }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className="absolute inset-0 cursor-grab"
      style={{ x, y, rotateX, rotateY }}
      drag
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragElastic={0.6}
      whileTap={{ cursor: "grabbing" }}
      onDragEnd={handleDragEnd}
    >
      {children}
    </motion.div>
  );
}

const MentorStack = forwardRef<StackRef, StackProps>(
  (
    {
      randomRotation = false,
      sensitivity = 200,
      cards = [],
      animationConfig = { stiffness: 260, damping: 20 },
      sendToBackOnClick = false,
      autoplay = false,
      autoplayDelay = 3000,
      pauseOnHover = false,
      mobileClickOnly = false,
      mobileBreakpoint = 768,
      onTopCardChange,
    }: StackProps,
    ref,
  ) => {
    const [isMobile, setIsMobile] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [randomRotations, setRandomRotations] = useState<number[]>([]);

    useEffect(() => {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < mobileBreakpoint);
      };
      checkMobile();
      window.addEventListener("resize", checkMobile);
      return () => window.removeEventListener("resize", checkMobile);
    }, [mobileBreakpoint]);

    const shouldDisableDrag = mobileClickOnly && isMobile;
    const shouldEnableClick = sendToBackOnClick || shouldDisableDrag;

    const [stack, setStack] = useState<
      { id: number; content: React.ReactNode }[]
    >(() => {
      if (cards.length) {
        return cards.map((content, index) => ({ id: index + 1, content }));
      }
      return [];
    });

    useEffect(() => {
      if (cards.length) {
        setStack(cards.map((content, index) => ({ id: index + 1, content })));
      }
    }, [cards]);

    useEffect(() => {
      if (!randomRotation) {
        setRandomRotations([]);
        return;
      }
      setRandomRotations(
        Array.from({ length: stack.length }).map(() => Math.random() * 10 - 5),
      );
    }, [randomRotation, stack.length]);

    const sendToBack = useCallback((id: number) => {
      setStack((prev) => {
        const newStack = [...prev];
        const index = newStack.findIndex((card) => card.id === id);
        if (index === -1) return prev;
        const [card] = newStack.splice(index, 1);
        newStack.unshift(card);
        return newStack;
      });
    }, []);

    const sendToFront = useCallback(() => {
      setStack((prev) => {
        const newStack = [...prev];
        const card = newStack.shift();
        if (card) {
          newStack.push(card);
        }
        return newStack;
      });
    }, []);

    const topCardId = stack.length > 0 ? stack[stack.length - 1].id : undefined;

    useEffect(() => {
      if (topCardId !== undefined && onTopCardChange) {
        onTopCardChange(topCardId);
      }
    }, [topCardId, onTopCardChange]);

    useImperativeHandle(ref, () => ({
      next: () => {
        if (stack.length > 1) {
          const topCardId = stack[stack.length - 1].id;
          sendToBack(topCardId);
        }
      },
      prev: () => {
        if (stack.length > 1) {
          sendToFront();
        }
      },
    }));

    useEffect(() => {
      if (autoplay && stack.length > 1 && !isPaused) {
        const interval = setInterval(() => {
          const topCardId = stack[stack.length - 1].id;
          sendToBack(topCardId);
        }, autoplayDelay);

        return () => clearInterval(interval);
      }
    }, [autoplay, autoplayDelay, stack, isPaused, sendToBack]);

    return (
      <div
        className="relative h-full w-full"
        style={{ perspective: 600 }}
        onMouseEnter={() => pauseOnHover && setIsPaused(true)}
        onMouseLeave={() => pauseOnHover && setIsPaused(false)}
      >
        {stack.map((card, index) => {
          const randomRotate = randomRotations[index] ?? 0;
          return (
            <CardRotate
              key={card.id}
              onSendToBack={() => sendToBack(card.id)}
              sensitivity={sensitivity}
              disableDrag={shouldDisableDrag}
            >
              <motion.div
                className="h-full w-full overflow-hidden rounded-2xl"
                onClick={() => shouldEnableClick && sendToBack(card.id)}
                animate={{
                  rotateZ:
                    stack.length - index - 1 === 0
                      ? 0
                      : ((stack.length - index - 1) % 2 === 1 ? 1 : -1) *
                          (4 + (stack.length - index - 1) * 2) +
                        randomRotate,
                  scale: 1 - (stack.length - index - 1) * 0.05,
                  x:
                    stack.length - index - 1 === 0
                      ? 0
                      : ((stack.length - index - 1) % 2 === 1 ? 1 : -1) *
                        ((stack.length - index - 1) * 15),
                  y: (stack.length - index - 1) * -8,
                  transformOrigin: "50% 50%",
                }}
                initial={false}
                transition={{
                  type: "spring",
                  stiffness: animationConfig.stiffness,
                  damping: animationConfig.damping,
                }}
              >
                {card.content}
              </motion.div>
            </CardRotate>
          );
        })}
      </div>
    );
  },
);
MentorStack.displayName = "MentorStack";

const mentorStackCards = MentorsData.map((mentor) => (
  <div
    key={mentor.id}
    className="h-full w-full overflow-hidden rounded-[24px] bg-white shadow-md border border-gray-100"
  >
    <img
      src={mentor.image}
      alt={mentor.name}
      className="pointer-events-none h-full w-full object-cover"
    />
  </div>
));

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
  exit: {
    opacity: 0,
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.4, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -15,
    filter: "blur(8px)",
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

function TrackCardCover({
  src,
  alt,
  category,
}: {
  src: string;
  alt: string;
  category: string;
}) {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="relative h-44 w-full overflow-hidden bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 flex items-center justify-center">
      {!hasError ? (
        <img
          src={src}
          alt={alt}
          onError={() => setHasError(true)}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="flex flex-col items-center justify-center gap-2 p-4 text-center z-0">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-emerald-300 backdrop-blur-md shadow-inner">
            <Sparkles className="h-6 w-6" />
          </div>
          <span className="text-[11px] font-bold text-emerald-100/90 tracking-wide uppercase">
            {category}
          </span>
        </div>
      )}
      <div className="absolute top-3 left-3 z-10 rounded-md bg-[#063A1E]/85 px-2.5 py-1 text-[10px] font-bold text-emerald-300 shadow-xs backdrop-blur-xs border border-emerald-500/20 pointer-events-none">
        {category}
      </div>
    </div>
  );
}

export default function HomePage() {
  const [showVideo, setShowVideo] = useState(false);
  const [activeTab, setActiveTab] = useState("ALL");
  const [prospectusCategoryFilter, setProspectusCategoryFilter] = useState("ALL");
  const [prospectusSearch, setProspectusSearch] = useState("");
  const [activeMentorId, setActiveMentorId] = useState<number>(MentorsData.length);
  const stackRef = useRef<StackRef>(null);

  const activeMentor =
    MentorsData.find((m) => m.id === activeMentorId) ||
    MentorsData[MentorsData.length - 1];

  const filteredCourses = useMemo(() => {
    if (activeTab === "ALL") return HeroCourseData;
    return HeroCourseData.filter((item) => item.category === activeTab);
  }, [activeTab]);

  const filteredProspectusDisciplines = useMemo(() => {
    return PROSPECTUS_ALL_DISCIPLINES.filter((item) => {
      if (prospectusCategoryFilter !== "ALL" && item.category !== prospectusCategoryFilter) {
        return false;
      }
      if (prospectusSearch.trim()) {
        const q = prospectusSearch.toLowerCase().trim();
        return item.name.toLowerCase().includes(q) || item.category.toLowerCase().includes(q);
      }
      return true;
    });
  }, [prospectusCategoryFilter, prospectusSearch]);

  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonialIndex((prev) => (prev + 1) % DUMMY_TESTIMONIALS.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const handlePrevTestimonial = () => {
    setCurrentTestimonialIndex(
      (prev) => (prev - 1 + DUMMY_TESTIMONIALS.length) % DUMMY_TESTIMONIALS.length,
    );
  };

  const handleNextTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev + 1) % DUMMY_TESTIMONIALS.length);
  };

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-white text-slate-900 selection:bg-emerald-100 selection:text-[#063A1E]">
      {/* =========================================================
          1. HERO SECTION (Exact Mockup Match - Compact 50/50 Split Flush Top & Right)
      ========================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F7FAF8] via-white to-white border-b border-gray-100">
        <div className="w-full px-4 sm:px-6 lg:pl-10 lg:pr-0 max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center min-h-auto lg:min-h-[380px] gap-6 lg:gap-0">
            {/* Left Content - Takes Left 50% (6 Cols) */}
            <div className="flex flex-col items-start lg:col-span-6 xl:col-span-6 py-5 sm:py-6 lg:py-6 pr-0 lg:pr-8 z-10">
              {/* Main Headline */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] xl:text-[44px] font-black tracking-tight text-[#0F2A1D] leading-[1.08]">
                Learn Today,<br />Lead Tomorrow
              </h1>

              {/* Subhead */}
              <p className="mt-2.5 text-base sm:text-lg md:text-xl font-extrabold tracking-tight text-slate-900">
                Your Internship. Your Skills. <span className="text-[#16A34A]">Your Future.</span>
              </p>

              {/* Description Paragraph */}
              <p className="mt-2 text-xs sm:text-[13.5px] leading-relaxed text-slate-600 font-normal max-w-lg">
                <strong className="font-bold text-[#800000] text-sm sm:text-[15px]">
                  International Institute of Internship [i3]
                </strong>{" "}
                is a not-for-profit initiative offering over 300+ UGC-aligned internship programs, 600+ skill enhancement training modules, and 100+ global &amp; national immersion cohorts.
              </p>

              {/* 4 Feature Items (Horizontal 4 columns with circle icons + title + subtitle) */}
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 w-full">
                {/* Feature 1 */}
                <div className="flex items-start gap-2">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-[#0A5C36] border border-emerald-200/80 shadow-2xs">
                    <GraduationCap className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-[12px] font-bold text-slate-900 leading-snug">
                      UGC Internship Aligned
                    </h4>
                    <p className="mt-0.5 text-[9.5px] text-slate-500 leading-snug">
                      Structured as per UGC Guidelines
                    </p>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="flex items-start gap-2">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-[#0A5C36] border border-emerald-200/80 shadow-2xs">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-[12px] font-bold text-slate-900 leading-snug">
                      Skill-Based Training
                    </h4>
                    <p className="mt-0.5 text-[9.5px] text-slate-500 leading-snug">
                      Industry-relevant skills
                    </p>
                  </div>
                </div>

                {/* Feature 3 */}
                <div className="flex items-start gap-2">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-[#0A5C36] border border-emerald-200/80 shadow-2xs">
                    <Briefcase className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-[12px] font-bold text-slate-900 leading-snug">
                      Real-World Experience
                    </h4>
                    <p className="mt-0.5 text-[9.5px] text-slate-500 leading-snug">
                      Live mentor projects
                    </p>
                  </div>
                </div>

                {/* Feature 4 */}
                <div className="flex items-start gap-2">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-[#0A5C36] border border-emerald-200/80 shadow-2xs">
                    <Award className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-[12px] font-bold text-slate-900 leading-snug">
                      Certificate &amp; Recognition
                    </h4>
                    <p className="mt-0.5 text-[9.5px] text-slate-500 leading-snug">
                      Enhance career opportunities
                    </p>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="mt-5 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
                <Link
                  href="/student/registration"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0A5C36] px-4.5 py-2.5 text-xs sm:text-[13px] font-bold text-white shadow-md transition-all hover:bg-[#074026] hover:shadow-lg hover:-translate-y-0.5 text-center"
                >
                  <UserPlus className="h-4 w-4" />
                  <span>Free Student Registration</span>
                </Link>

                <Link
                  href="/internship"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-slate-200 bg-white px-4 py-2.5 text-xs sm:text-[13px] font-bold text-slate-800 shadow-2xs transition-all hover:bg-slate-50 hover:border-slate-300 text-center"
                >
                  <Search className="h-4 w-4 text-slate-600" />
                  <span>Find Internships</span>
                </Link>

                <a
                  href="/Internship-Prospectus.pdf"
                  download="i3-Internship-Prospectus.pdf"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-amber-400/70 bg-gradient-to-r from-amber-50 to-yellow-50 px-4 py-2.5 text-xs sm:text-[13px] font-bold text-amber-950 shadow-2xs transition-all hover:from-amber-100 hover:to-yellow-100 hover:border-amber-500 hover:shadow-xs hover:-translate-y-0.5 text-center"
                >
                  <Download className="h-4 w-4 text-amber-700 animate-bounce" />
                  <span>Download Prospectus (PDF)</span>
                </a>
              </div>
            </div>

            {/* Right Hero Image - Takes Right 50% (6 Cols) Flush with Top Navbar and Right Edge */}
            <div className="relative lg:col-span-6 xl:col-span-6 h-full min-h-[260px] sm:min-h-[320px] lg:min-h-[380px] flex items-stretch justify-end">
              <div className="relative w-full h-full max-w-[540px] lg:max-w-none mx-auto flex items-stretch justify-end">
                {/* Subtle Dot Matrix Grid */}
                <div className="pointer-events-none absolute top-3 left-6 lg:left-10 w-24 h-20 hidden sm:grid grid-cols-5 gap-2.5 opacity-30 z-0">
                  {Array.from({ length: 25 }).map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                  ))}
                </div>

                {/* Unified SVG Canvas: Dual Concentric Swoosh Ribbons + Exact Matching Photo Clip */}
                <div className="relative w-full h-full min-h-[260px] sm:min-h-[320px] lg:min-h-[380px] z-10 flex items-stretch">
                  <svg
                    viewBox="0 0 760 540"
                    className="w-full h-full"
                    preserveAspectRatio="xMaxYMid slice"
                  >
                    <defs>
                      {/* Mint-Green Ribbon Gradient */}
                      <linearGradient id="hero-mint-ribbon" x1="100%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#86EFAC" />
                        <stop offset="45%" stopColor="#A7F3D0" />
                        <stop offset="100%" stopColor="#4ADE80" />
                      </linearGradient>

                      {/* Vibrant Emerald Ribbon Gradient */}
                      <linearGradient id="hero-emerald-ribbon" x1="100%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#15803D" />
                        <stop offset="50%" stopColor="#166534" />
                        <stop offset="100%" stopColor="#0B4624" />
                      </linearGradient>

                      {/* Unified ClipPath for Student Photo matching the inner emerald curve */}
                      <clipPath id="hero-photo-curve-clip">
                        <path d="M 225 0 C 145 80, 65 180, 65 280 C 65 380, 125 480, 195 540 L 760 540 L 760 0 Z" />
                      </clipPath>
                    </defs>

                    {/* 1. Outer Soft Mint-Green Ribbon (Solid shape to prevent gaps) */}
                    <path
                      d="M 160 0 C 80 80, 0 180, 0 280 C 0 380, 60 480, 130 540 L 760 540 L 760 0 Z"
                      fill="url(#hero-mint-ribbon)"
                    />

                    {/* 2. Inner Vibrant Emerald-Green Ribbon (Solid shape on top) */}
                    <path
                      d="M 185 0 C 105 80, 25 180, 25 280 C 25 380, 85 480, 155 540 L 760 540 L 760 0 Z"
                      fill="url(#hero-emerald-ribbon)"
                    />

                    {/* 3. Clipped Photo Element embedded seamlessly inside the curve */}
                    <image
                      href="/images/Main-image.webp"
                      x="0"
                      y="0"
                      width="760"
                      height="540"
                      preserveAspectRatio="xMidYMid slice"
                      clipPath="url(#hero-photo-curve-clip)"
                    />
                  </svg>

                  {/* Floating Forest Green Quote Card at Top Right */}
                  <div className="absolute top-3 right-3 sm:top-5 sm:right-5 lg:right-8 rounded-xl bg-[#063B27] px-3 py-2 sm:px-3.5 sm:py-2.5 text-white shadow-2xl border border-emerald-700/60 max-w-[170px] sm:max-w-[210px] z-20 pointer-events-auto">
                    <div className="flex items-center gap-1 text-sm sm:text-base font-serif text-emerald-400 leading-none mb-0.5">
                      <span>❝</span>
                    </div>
                    <p className="text-[9.5px] sm:text-[11px] font-bold text-emerald-50 leading-snug">
                      Building Competent Youth for a Better Tomorrow
                    </p>
                    <div className="mt-1.5 sm:mt-2 h-0.5 w-6 sm:w-8 bg-emerald-400 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          2. UGC INTERNSHIP FRAMEWORK ALIGNED BANNER (Exact Mockup Match - Compact)
      ========================================================= */}
      <section className="py-3 bg-white">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl border border-emerald-200/80 bg-[#F4FAF6] p-4 sm:p-5 lg:p-6 shadow-xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-center">
              {/* Left Logo + Title + Subtitle */}
              <div className="lg:col-span-5 flex items-start gap-3 sm:gap-3.5">
                <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-white border border-emerald-200/90 p-1.5 shadow-2xs">
                  <img
                    src="/images/ugc-logo.png"
                    alt="UGC - University Grants Commission"
                    className="h-full w-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-extrabold tracking-wide uppercase text-[#0A5C36]">
                    UGC INTERNSHIP FRAMEWORK ALIGNED
                  </h3>
                  <p className="mt-1 text-[11px] sm:text-xs text-slate-600 leading-relaxed">
                    i3 conducts internships in alignment with the UGC Guidelines for Internship/Research Internship for Undergraduate Students (2024).
                  </p>
                </div>
              </div>

              {/* Middle 2 Checklist Columns */}
              <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 text-[11px] sm:text-xs font-medium text-slate-700">
                <div className="flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-[#0A5C36] stroke-[3] shrink-0" />
                  <span>60 to 120 hours of internship</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-[#0A5C36] stroke-[3] shrink-0" />
                  <span>Integrated in HEI curriculum</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-[#0A5C36] stroke-[3] shrink-0" />
                  <span>2 to 4 Academic Credits</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-[#0A5C36] stroke-[3] shrink-0" />
                  <span>Enhancing employability</span>
                </div>
                <div className="flex items-center gap-1.5 sm:col-span-2">
                  <Check className="h-3.5 w-3.5 text-[#0A5C36] stroke-[3] shrink-0" />
                  <span>Experiential Learning &amp; Skill Development</span>
                </div>
              </div>

              {/* Right CTA Button */}
              <div className="lg:col-span-3 flex justify-start lg:justify-end">
                <a
                  href="/docs/ugc-internship-guidelines.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  download="UGC-Internship-Research-Guidelines-2024.pdf"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-[#0A5C36] px-4 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-[#074026] hover:shadow-md transition-all text-center group"
                >
                  <FileDown className="h-4 w-4 text-yellow-300 transition-transform group-hover:-translate-y-0.5" />
                  <span>Download UGC Guidelines (PDF)</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          3. WHO WE SERVE & MAKING AN IMPACT ROW (Exact Mockup Match)
      ========================================================= */}
      <section className="py-6 bg-white">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left: WHO WE SERVE (4 Cards in a Row) */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-800 mb-3 block">
                WHO WE SERVE
              </span>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 h-full">
                {/* Students */}
                <div className="flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-3.5 shadow-2xs hover:border-emerald-300 transition-all">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-[#0A5C36] mb-2">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Students</h4>
                    <p className="mt-1 text-[10px] text-slate-500 leading-snug">
                      Discover internships, gain skills &amp; build your career
                    </p>
                  </div>
                </div>

                {/* Instructors */}
                <div className="flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-3.5 shadow-2xs hover:border-emerald-300 transition-all">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-[#0A5C36] mb-2">
                    <Presentation className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Instructors</h4>
                    <p className="mt-1 text-[10px] text-slate-500 leading-snug">
                      Share knowledge, mentor students &amp; earn recognition
                    </p>
                  </div>
                </div>

                {/* Educational Institute */}
                <div className="flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-3.5 shadow-2xs hover:border-emerald-300 transition-all">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-[#0A5C36] mb-2">
                    <Building className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Educational Institute</h4>
                    <p className="mt-1 text-[10px] text-slate-500 leading-snug">
                      Integrate internships into curriculum &amp; enhance learning
                    </p>
                  </div>
                </div>

                {/* University */}
                <div className="flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-3.5 shadow-2xs hover:border-emerald-300 transition-all">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-[#0A5C36] mb-2">
                    <Landmark className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">University</h4>
                    <p className="mt-1 text-[10px] text-slate-500 leading-snug">
                      Connect with talent, build projects &amp; create impact
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: MAKING AN IMPACT (Light Green Box with 4 Stat Columns) */}
            <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl bg-[#EAF5EE] border border-emerald-200/80 p-4 sm:p-5">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-800 mb-3 block">
                MAKING AN IMPACT
              </span>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center items-center">
                {/* Stat 1 */}
                <div className="flex flex-col items-center">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full text-[#0A5C36] mb-1">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <div className="text-base sm:text-lg font-black text-slate-900">
                    10,000+
                  </div>
                  <div className="text-[10px] font-semibold text-slate-600">
                    Students Empowered
                  </div>
                </div>

                {/* Stat 2 */}
                <div className="flex flex-col items-center">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full text-[#0A5C36] mb-1">
                    <Briefcase className="h-5 w-5" />
                  </div>
                  <div className="text-base sm:text-lg font-black text-slate-900">
                    300+
                  </div>
                  <div className="text-[10px] font-semibold text-slate-600">
                    Internship Programs
                  </div>
                </div>

                {/* Stat 3 */}
                <div className="flex flex-col items-center">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full text-[#0A5C36] mb-1">
                    <Award className="h-5 w-5" />
                  </div>
                  <div className="text-base sm:text-lg font-black text-slate-900">
                    600+
                  </div>
                  <div className="text-[10px] font-semibold text-slate-600">
                    Skill Training Programs
                  </div>
                </div>

                {/* Stat 4 */}
                <div className="flex flex-col items-center">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full text-[#0A5C36] mb-1">
                    <Globe className="h-5 w-5" />
                  </div>
                  <div className="text-base sm:text-lg font-black text-slate-900">
                    100+
                  </div>
                  <div className="text-[10px] font-semibold text-slate-600">
                    Immersion Programs
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          4. BOTTOM TRUST PILLARS & COMMUNITY BAR (Exact Mockup Match)
      ========================================================= */}
      <section className="bg-[#063B27] py-6 text-white border-t border-emerald-900/40">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left 4 Pillars */}
            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Pillar 1 */}
                <div className="flex flex-col items-start">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-300 mb-2">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <h4 className="text-xs font-bold text-white leading-tight">
                    Not for Profit Initiative
                  </h4>
                  <p className="text-[10px] text-emerald-200/80 leading-normal mt-1">
                    A unit of{" "}
                    <a
                      href="https://www.dpkavishek.in/hrc-office.php"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-white font-semibold transition-colors"
                    >
                      DPKHRC TRUST
                    </a>{" "}
                    working for higher education promotion
                  </p>
                </div>

                {/* Pillar 2 */}
                <div className="flex flex-col items-start">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-300 mb-2">
                    <Award className="h-5 w-5" />
                  </div>
                  <h4 className="text-xs font-bold text-white leading-tight">
                    Quality &amp; Integrity
                  </h4>
                  <p className="text-[10px] text-emerald-200/80 leading-normal mt-1">
                    Committed to transparency, ethics and excellence
                  </p>
                </div>

                {/* Pillar 3 */}
                <div className="flex flex-col items-start">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-300 mb-2">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <h4 className="text-xs font-bold text-white leading-tight">
                    Future Ready Skills
                  </h4>
                  <p className="text-[10px] text-emerald-200/80 leading-normal mt-1">
                    Industry relevant training for tomorrow&apos;s careers
                  </p>
                </div>

                {/* Pillar 4 */}
                <div className="flex flex-col items-start">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-300 mb-2">
                    <Globe className="h-5 w-5" />
                  </div>
                  <h4 className="text-xs font-bold text-white leading-tight">
                    Inclusivity
                  </h4>
                  <p className="text-[10px] text-emerald-200/80 leading-normal mt-1">
                    Equal opportunities for learners across India
                  </p>
                </div>
              </div>
            </div>

            {/* Right Community Card */}
            <div className="lg:col-span-4 flex justify-end">
              <div className="w-full max-w-md rounded-2xl bg-white p-4 sm:p-5 text-slate-900 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3.5">
                <div>
                  <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 leading-tight">
                    Be a Part of i3 Community
                  </h4>
                  <p className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5">
                    Learn. Intern. Grow. Succeed.
                  </p>
                </div>

                <Link
                  href="/student/registration"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-full bg-[#0A5C36] px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-[#074026] transition-all text-center shrink-0"
                >
                  <span>Join Us Today!</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          4. YELLOW ROTATING STAR MARQUEE BANNER
      ========================================================= */}
      <section className="group relative z-20 w-full overflow-hidden border-y border-amber-500/30 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 shadow-inner py-3 sm:py-4">
        <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(#d97706_1px,transparent_1px)] opacity-[0.15] [background-size:16px_16px]" />

        <div className="animate-marquee relative z-10 flex w-max items-center">
          {[0, 1].map((group) => (
            <div
              key={group}
              className="flex shrink-0 items-center"
              aria-hidden={group === 1 ? "true" : undefined}
            >
              {HeroNewsItems.map((item, index) => (
                <div
                  key={`${group}-${index}`}
                  className="flex shrink-0 items-center gap-3 px-4 sm:px-8"
                >
                  <Star
                    className="h-4 w-4 sm:h-5 sm:w-5 animate-[spin_10s_linear_infinite] fill-amber-950 text-amber-950"
                  />
                  <span className="whitespace-nowrap text-xs sm:text-base md:text-lg font-extrabold uppercase tracking-tight text-amber-950">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================
          5. LEARNING FOCUSED ON YOUR GOALS (Dark Green Section)
      ========================================================= */}
      <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#04261A] via-[#063A1E] to-[#0A4D2B] py-12 sm:py-16 lg:py-18 text-white">
        <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:gap-10 lg:grid-cols-12 items-center">
            {/* Left Photo + Video CTA */}
            <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left">
              <div className="group relative h-[220px] sm:h-[280px] w-full max-w-[380px] overflow-hidden rounded-3xl shadow-2xl border border-emerald-400/20">
                <img
                  src="/images/gallery/moment-1.jpg"
                  alt="Students participating in an official academic internship convocation"
                  className="block h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#04261A]/90 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 flex items-center justify-between text-xs text-emerald-100">
                  <span className="font-bold flex items-center gap-1.5 bg-black/40 px-2.5 py-1 rounded-full backdrop-blur-xs text-[10.5px] sm:text-xs">
                    <CheckCircle className="size-3.5 text-yellow-400" />
                    UGC 2024 Framework
                  </span>
                  <span className="text-yellow-300 font-bold bg-black/40 px-2.5 py-1 rounded-full backdrop-blur-xs text-[10.5px] sm:text-xs">
                    60-120 Hours
                  </span>
                </div>
              </div>

              <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row items-center sm:items-start gap-3.5 sm:gap-4 text-center sm:text-left">
                <button
                  onClick={() => setShowVideo(true)}
                  className="relative flex h-13 w-13 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-full bg-yellow-400 text-slate-950 shadow-lg shadow-yellow-500/30 transition-transform hover:scale-110 active:scale-95"
                  aria-label="Play overview video"
                >
                  <Play className="ml-0.5 sm:ml-1 h-5 w-5 sm:h-6 sm:w-6 fill-current" />
                </button>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-white leading-snug">
                    Learn with 500+ Partner Institutions &amp; Mentors
                  </h4>
                  <p className="text-xs text-emerald-200/90 mt-0.5">
                    Watch our overview video to discover how interns collaborate on live projects.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Goals Grid */}
            <div className="lg:col-span-7">
              <div className="mb-5 sm:mb-6">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow-400/20 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-yellow-300 border border-yellow-400/30">
                  <Sparkles className="size-3" />
                  INTERNSHIP &amp; IMMERSION EXPERIENCE
                </span>
                <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
                  Learning Focused on Your Career Goals
                </h2>
              </div>

              <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2.5 mb-5 sm:mb-6">
                {HeroGoalPoints.map((pt, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs font-semibold text-emerald-100 bg-white/5 p-2.5 rounded-xl border border-white/10">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-yellow-400 mt-0.5" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
                {HeroGoalCards.map((card, idx) => (
                  <div
                    key={idx}
                    className="group overflow-hidden rounded-2xl bg-white/10 p-4 border border-white/15 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/15 hover:border-emerald-400/40 shadow-lg"
                  >
                    <div className="relative h-28 w-full rounded-xl overflow-hidden mb-3.5 bg-emerald-950/40">
                      <img
                        src={card.image}
                        alt={card.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold text-white leading-snug">
                      {card.title}
                    </h4>
                    <p className="mt-1.5 text-[11px] text-emerald-100/80 leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          6. CORE DOMAIN CATEGORIES (Modern, Responsive, Mobile-Optimized)
      ========================================================= */}
      <section className="py-12 sm:py-16 bg-white border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#0A5C36] border border-emerald-200">
              <Award className="size-3.5" />
              300+ PROSPECTUS DISCIPLINES &amp; 600+ SKILL TRACKS
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900">
              Explore Our Core Internship Domains
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
              Select from over 300+ UGC-aligned internship tracks and 600+ skill enhancement training programs structured across emerging technologies, core engineering, design, healthcare, agriculture, and business management.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {CourseCategoryData.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className="group relative flex flex-col justify-between rounded-2xl border border-gray-200/90 bg-white p-4 sm:p-5 shadow-2xs transition-all duration-300 hover:-translate-y-1 hover:border-[#0A5C36] hover:shadow-xl"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-3.5">
                      <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-emerald-50 text-[#0A5C36] border border-emerald-200 group-hover:bg-[#0A5C36] group-hover:text-white transition-all shadow-2xs">
                        <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                      </div>
                      <span className="rounded-full bg-emerald-100/80 px-2.5 py-1 text-[10.5px] sm:text-[11px] font-extrabold text-[#0A5C36]">
                        {item.courses}
                      </span>
                    </div>

                    <h3 className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug group-hover:text-[#0A5C36] transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3.5 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-slate-500">
                      UGC 2024 Aligned
                    </span>
                    <Link
                      href="/internship"
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#0A5C36] group-hover:underline"
                    >
                      <span>Explore Tracks</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          6.5 DEDICATED OFFICIAL PROSPECTUS DOWNLOAD & 100+ DISCIPLINES DIRECTORY
      ========================================================= */}
      <section className="py-12 bg-gradient-to-b from-[#F2F8F4] to-white border-y border-emerald-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Prospectus Download Main Card */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#063B27] via-[#084D34] to-[#04261A] p-5 sm:p-8 lg:p-10 text-white shadow-xl">
            <div className="pointer-events-none absolute -right-20 -bottom-20 h-80 w-80 rounded-full bg-emerald-400/10 blur-3xl" />
            <div className="pointer-events-none absolute left-1/3 top-0 h-60 w-60 rounded-full bg-yellow-400/10 blur-3xl" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
              {/* Left Details */}
              <div className="lg:col-span-7 flex flex-col items-start">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold text-yellow-300 backdrop-blur-md border border-white/10">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>OFFICIAL PROSPECTUS &amp; CURRICULUM</span>
                </div>

                <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight">
                  Download the Official i3 Internship &amp; Immersion Prospectus
                </h2>

                <p className="mt-3 text-xs sm:text-sm text-emerald-100/90 leading-relaxed max-w-2xl">
                  International Institute of Internship (i3) — An ISO 21001:2018 Certified Research Institution registered under the Indian Trusts Act, 1882 and NITI Aayog (A unit of DPKHRC Trust). Explore complete guidelines for 300+ internship disciplines, 600+ skill enhancement programs, UGC NEP-2020 credit frameworks, and 100+ global immersion cohorts.
                </p>

                {/* Key Points */}
                <div className="mt-5 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 w-full text-xs text-emerald-50">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-yellow-400 shrink-0" />
                    <span>300+ Internship &amp; 600+ Skill Programs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-yellow-400 shrink-0" />
                    <span>UGC Guidelines 2024: 60-120 hrs / 2-4 Credits</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-yellow-400 shrink-0" />
                    <span>Duration: 4-12 Weeks (Flexible Modes)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-yellow-400 shrink-0" />
                    <span>100+ Global Immersion Programs</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
                  <a
                    href="/Internship-Prospectus.pdf"
                    download="i3-Internship-Prospectus.pdf"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-yellow-400 px-5 py-3 text-xs sm:text-sm font-extrabold text-slate-950 shadow-lg transition-all hover:bg-yellow-300 hover:shadow-xl hover:-translate-y-0.5 active:scale-95 text-center"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download Official Prospectus (PDF)</span>
                  </a>

                  <a
                    href="/Internship-Prospectus.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-xs sm:text-sm font-bold text-white backdrop-blur-md transition-all hover:bg-white/20 hover:border-white/40 text-center"
                  >
                    <FileText className="h-4 w-4 text-emerald-300" />
                    <span>View Online</span>
                  </a>

                  <Link
                    href="/student/registration"
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-emerald-400/40 bg-emerald-500/20 px-4 py-3 text-xs sm:text-sm font-bold text-emerald-200 transition-all hover:bg-emerald-500/30 hover:text-white text-center"
                  >
                    <span>Apply for Cohort</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>

              {/* Right Mini Preview / Stats */}
              <div className="lg:col-span-5 flex flex-col gap-4">
                <div className="rounded-2xl border border-white/15 bg-white/10 p-4 sm:p-5 backdrop-blur-md shadow-inner">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-yellow-400/20 text-yellow-300">
                        <Award className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                          Prospectus Highlights
                        </h4>
                        <p className="text-[10px] text-emerald-200">ISO 21001:2018 Certified</p>
                      </div>
                    </div>
                    <span className="rounded-full bg-yellow-400/20 px-2.5 py-0.5 text-[10px] font-bold text-yellow-300">
                      PDF Document
                    </span>
                  </div>

                  <div className="mt-4 space-y-2.5 text-xs text-emerald-100">
                    <div className="flex justify-between items-center py-1 border-b border-white/5">
                      <span className="text-emerald-200/80">Offered By:</span>
                      <span className="font-semibold text-white">i3 (DPKHRC Trust)</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-white/5">
                      <span className="text-emerald-200/80">Internship Programs:</span>
                      <span className="font-semibold text-yellow-300">300+ Programs</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-white/5">
                      <span className="text-emerald-200/80">Skill Training Modules:</span>
                      <span className="font-semibold text-yellow-300">600+ Tracks</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-white/5">
                      <span className="text-emerald-200/80">Immersion Programs:</span>
                      <span className="font-semibold text-yellow-300">100+ Cohorts</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-white/5">
                      <span className="text-emerald-200/80">Internship Duration:</span>
                      <span className="font-semibold text-white">4 to 12 Weeks</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-emerald-200/80">Languages:</span>
                      <span className="font-semibold text-white">Hindi, English &amp; Indian Lang.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Searchable Directory of all 34+ Prospectus Disciplines */}
          <div className="mt-10 sm:mt-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-5 sm:mb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#0A5C36]">
                  Complete Program Directory
                </span>
                <h3 className="mt-1 text-xl sm:text-2xl font-extrabold text-slate-900">
                  All 300+ Internship Programs Listed in Prospectus
                </h3>
                <p className="mt-1 text-xs text-slate-600">
                  Search or filter by category to find your target domain track.
                </p>
              </div>

              {/* Search input */}
              <div className="relative w-full md:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={prospectusSearch}
                  onChange={(e) => setProspectusSearch(e.target.value)}
                  placeholder="Search disciplines..."
                  className="w-full rounded-xl border border-gray-200 bg-white pl-9 pr-3 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Category Filter Chips */}
            <div className="mb-5 sm:mb-6 flex items-center gap-1.5 overflow-x-auto pb-2 sm:flex-wrap scrollbar-none">
              {[
                "ALL",
                "Emerging Tech",
                "Engineering",
                "Business & Finance",
                "Design & Media",
                "Healthcare & Life Sciences",
                "Agri & Green Tech",
                "Humanities & General",
                "Specialized Sectors",
              ].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setProspectusCategoryFilter(cat)}
                  className={cn(
                    "rounded-full px-3 py-1 text-[11px] font-semibold transition-all whitespace-nowrap shrink-0",
                    prospectusCategoryFilter === cat
                      ? "bg-[#0A5C36] text-white shadow-xs"
                      : "bg-white text-slate-600 border border-gray-200 hover:bg-emerald-50 hover:text-[#0A5C36]",
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Grid of disciplines */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3 max-h-[380px] overflow-y-auto p-1.5 border border-gray-100 rounded-2xl bg-white shadow-2xs">
              {filteredProspectusDisciplines.map((item, idx) => {
                const ItemIcon = item.icon || CheckCircle2;
                return (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3 rounded-xl border border-gray-100 bg-slate-50/50 hover:bg-emerald-50/50 hover:border-emerald-200 transition-colors"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-[#0A5C36] mt-0.5">
                      <ItemIcon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-slate-900 leading-snug truncate">
                        {item.name}
                      </h4>
                      <div className="mt-1 flex items-center gap-2">
                        <span className="inline-block rounded bg-emerald-100/70 px-1.5 py-0.5 text-[9.5px] font-semibold text-[#0A5C36]">
                          {item.category}
                        </span>
                        <span className="text-[10px] text-slate-500 font-medium">4-12 Weeks</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Immersion Programs Showcase from Page 4 */}
          <div className="mt-10 sm:mt-12 pt-8 sm:pt-10 border-t border-emerald-100">
            <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0A5C36]">
                Page 4 of Prospectus
              </span>
              <h3 className="mt-1 text-xl sm:text-2xl font-extrabold text-slate-900">
                i3 Immersion Programs (15 to 180 Days)
              </h3>
              <p className="mt-1 text-xs text-slate-600">
                Experiential learning, cultural exploration, grassroots community development, and leadership immersions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {PROSPECTUS_IMMERSIONS.map((imm) => (
                <div
                  key={imm.id}
                  className="flex flex-col justify-between rounded-2xl border border-emerald-100 bg-white p-4 sm:p-5 shadow-2xs hover:border-emerald-300 hover:shadow-md transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-[#0A5C36]">
                        {imm.type}
                      </span>
                      <span className="text-[10.5px] font-bold text-amber-600">{imm.duration}</span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 leading-snug">
                      {imm.title}
                    </h4>
                    <div className="mt-2 flex items-start gap-1.5 text-[11px] font-semibold text-emerald-800">
                      <MapPin className="h-3.5 w-3.5 shrink-0 text-[#0A5C36] mt-0.5" />
                      <span>{imm.locations}</span>
                    </div>
                    <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                      {imm.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                    <Link
                      href="/immersion"
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#0A5C36] hover:underline"
                    >
                      <span>Explore Immersion</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          7. TABBED COURSE & INTERNSHIP SHOWCASE
      ========================================================= */}
      <section className="py-12 sm:py-14 bg-slate-50/60 border-y border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#0A5C36]">
                Trending Programs
              </span>
              <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-slate-900">
                Explore Top Internship Tracks
              </h2>
            </div>
            <Link
              href="/internship"
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#0A5C36] px-4 py-2 text-xs font-bold text-white hover:bg-[#063A1E] transition-colors"
            >
              <span>View All Internships</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Tabs */}
          <div className="mb-6 sm:mb-8 flex items-center gap-1.5 overflow-x-auto pb-2 sm:justify-center sm:flex-wrap scrollbar-none px-1">
            {HeroCourseTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "rounded-full px-3.5 sm:px-4 py-1.5 text-xs font-bold transition-all whitespace-nowrap shrink-0",
                  activeTab === tab
                    ? "bg-[#0A5C36] text-white shadow-sm"
                    : "bg-white text-slate-600 hover:bg-emerald-50 hover:text-[#0A5C36] border border-gray-200",
                )}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="group relative flex flex-col overflow-hidden rounded-2xl bg-white border border-gray-200/80 shadow-2xs transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:border-emerald-300"
              >
                <TrackCardCover
                  src={course.image}
                  alt={course.title}
                  category={course.category}
                />

                <div className="flex flex-1 flex-col p-4">
                  <h3 className="text-sm font-bold text-slate-900 line-clamp-2 min-h-[40px] leading-snug group-hover:text-[#0A5C36] transition-colors">
                    {course.title}
                  </h3>

                  <div className="mt-2 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="h-3.5 w-3.5 fill-current" />
                      <span className="font-semibold text-slate-600">{course.rating}</span>
                    </div>
                    <span className="font-bold text-[#0A5C36] bg-emerald-50 px-2 py-0.5 rounded text-[10.5px]">
                      {course.duration}
                    </span>
                  </div>

                  <p className="mt-2 text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {course.hoverText}
                  </p>

                  <div className="mt-3 flex items-center gap-2 text-[10.5px] font-semibold text-slate-600">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#0A5C36]" />
                    <span>{course.credits}</span>
                  </div>

                  <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-700">
                      {course.mode}
                    </span>

                    <Link
                      href="/student/registration"
                      className="inline-flex items-center gap-1 font-bold text-xs text-[#0A5C36] hover:text-[#074026] transition-all group-hover:translate-x-0.5"
                    >
                      <span>Enroll</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          8. 3D MENTORS CAROUSEL STACK
      ========================================================= */}
      <section className="py-12 sm:py-14 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0A5C36]">
              Faculty &amp; Mentors
            </span>
            <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-slate-900">
              Meet Our Highly Skilled Industry Mentors
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600">
              Guiding students through real-time code reviews, case studies, and career counseling.
            </p>
          </div>

          <div className="grid grid-cols-1 items-center gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-16">
            {/* 3D Stack */}
            <div className="relative mx-auto h-[280px] w-full max-w-[270px] sm:h-[340px] sm:max-w-[340px]">
              <MentorStack
                ref={stackRef}
                cards={mentorStackCards}
                onTopCardChange={(id) => setActiveMentorId(id)}
                randomRotation={true}
                sendToBackOnClick={true}
                sensitivity={100}
              />
            </div>

            {/* Mentor Details */}
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMentor.id}
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  className="flex flex-col"
                >
                  <motion.h3
                    variants={itemVariants}
                    className="text-2xl sm:text-3xl font-extrabold text-slate-900"
                  >
                    {activeMentor.name}
                  </motion.h3>
                  <motion.p
                    variants={itemVariants}
                    className="text-sm font-bold text-[#0A5C36] mt-1"
                  >
                    {activeMentor.role}
                  </motion.p>
                  <motion.p
                    variants={itemVariants}
                    className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base leading-relaxed text-slate-600 italic"
                  >
                    &ldquo;{activeMentor.quote}&rdquo;
                  </motion.p>
                </motion.div>
              </AnimatePresence>

              {/* Navigation buttons */}
              <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center sm:justify-start gap-3">
                <button
                  onClick={() => stackRef.current?.prev()}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0A5C36] text-white shadow-md hover:bg-[#063A1E] transition-all active:scale-95 shrink-0"
                  aria-label="Previous mentor"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() => stackRef.current?.next()}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0A5C36] text-white shadow-md hover:bg-[#063A1E] transition-all active:scale-95 shrink-0"
                  aria-label="Next mentor"
                >
                  <ArrowRight className="h-5 w-5" />
                </button>
                <span className="text-xs text-slate-500 font-medium">
                  Swipe or click cards to view next mentor
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          9. WHAT OUR STUDENTS HAVE TO SAY (Floating Avatars Slider)
      ========================================================= */}
      <section className="py-12 sm:py-14 bg-slate-50/70 border-t border-gray-100 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-center">
            {/* Left Title & Avatars */}
            <div className="relative lg:col-span-6 flex flex-col justify-center lg:min-h-[400px]">
              <div className="pointer-events-none absolute inset-0 hidden lg:block opacity-60">
                {floatingFaces.map((item) => (
                  <div
                    key={item.id}
                    className={`absolute overflow-hidden rounded-full shadow-sm ring-2 ring-white ${item.className}`}
                  >
                    <img
                      src={item.image}
                      alt="Student"
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>

              <div className="relative z-10 text-center lg:text-left">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0A5C36]">
                  Real Outcomes
                </span>
                <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight">
                  What Our Students Have to Say
                </h2>
                <p className="mt-3 text-xs sm:text-sm text-slate-600 max-w-md mx-auto lg:mx-0">
                  Our students consistently praise the transformative project experience and UGC credit validation. Here is what they say.
                </p>
              </div>
            </div>

            {/* Right Testimonial Card */}
            <div className="lg:col-span-6">
              <div className="rounded-3xl border border-gray-200/80 bg-white p-5 sm:p-8 shadow-md">
                <div className="flex items-center gap-1 text-amber-500 mb-3 sm:mb-4">
                  {[...Array(DUMMY_TESTIMONIALS[currentTestimonialIndex].stars)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                  <span className="text-xs font-bold text-slate-700 ml-2">5.0 Star Feedback</span>
                </div>

                <p className="text-xs sm:text-sm md:text-base font-medium leading-relaxed text-slate-700 italic">
                  &ldquo;{DUMMY_TESTIMONIALS[currentTestimonialIndex].text}&rdquo;
                </p>

                <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-3">
                    <img
                      src={DUMMY_TESTIMONIALS[currentTestimonialIndex].image}
                      alt={DUMMY_TESTIMONIALS[currentTestimonialIndex].name}
                      className="h-11 w-11 sm:h-12 sm:w-12 rounded-full object-cover ring-2 ring-emerald-100 shrink-0"
                    />
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                        {DUMMY_TESTIMONIALS[currentTestimonialIndex].name}
                      </h4>
                      <p className="text-[11px] sm:text-xs text-slate-500">
                        {DUMMY_TESTIMONIALS[currentTestimonialIndex].role}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      onClick={handlePrevTestimonial}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 text-[#0A5C36] hover:bg-[#0A5C36] hover:text-white transition-colors"
                      aria-label="Previous testimonial"
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </button>
                    <button
                      onClick={handleNextTestimonial}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 text-[#0A5C36] hover:bg-[#0A5C36] hover:text-white transition-colors"
                      aria-label="Next testimonial"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          10. FREE WORKSHOP SECTION
      ========================================================= */}
      <section className="py-12 sm:py-14 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
            {/* Visual with Play video button */}
            <div className="lg:col-span-6 relative">
              <div className="relative mx-auto max-w-[460px] overflow-hidden rounded-3xl shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80"
                  alt="Workshop"
                  className="block w-full object-cover"
                />
                <button
                  onClick={() => setShowVideo(true)}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-red-600 text-white shadow-xl transition-transform hover:scale-110 active:scale-95"
                  aria-label="Play workshop video"
                >
                  <Play className="ml-1 h-6 w-6 sm:h-7 sm:w-7 fill-current" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-[#0A5C36] mb-3">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Free Interactive Masterclass</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                Join Our Weekly Free Tech &amp; Career Workshops
              </h2>
              <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                Experience firsthand how i3 instructors conduct live problem-solving sessions, explain NEP credit integration, and review real-world industry case studies.
              </p>

              <div className="mt-5 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-[#0A5C36]">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                      Live Q&amp;A Sessions
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Clear doubts directly with seasoned industry architects.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-[#0A5C36]">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                      Career Roadmap
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Guidance on resume building and LinkedIn optimization.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 sm:mt-8">
                <Link
                  href="/student/registration"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#0A5C36] px-5 py-3 text-xs sm:text-sm font-bold text-white shadow-md hover:bg-[#063A1E] transition-all text-center"
                >
                  <span>Register for Next Free Workshop</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          11. WHY STUDENTS CHOOSE US
      ========================================================= */}
      <section className="py-12 sm:py-14 bg-slate-50/70 border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-8 sm:gap-10 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0A5C36]">
                Why Choose Us
              </span>
              <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                Why Students &amp; Colleges Choose i3 for Their Future
              </h2>
              <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                As a unit of DPKHRC Trust, our sole objective is ensuring fair, high-caliber, and verifiable internship education that prepares Indian students for global opportunities.
              </p>

              <div className="mt-5 sm:mt-6 space-y-2.5 sm:space-y-3">
                {whyChoosePoints.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 sm:gap-3">
                    <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm font-semibold text-slate-800">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 sm:mt-8">
                <Link
                  href="/about"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-white border border-gray-300 px-5 py-2.5 text-xs sm:text-sm font-bold text-slate-700 hover:bg-gray-50 hover:border-gray-400 transition-all text-center"
                >
                  <span>Learn More About Our Trust</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-2 gap-2.5 sm:gap-4">
              <img
                src="https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=800&q=80"
                alt="Collab"
                className="h-36 sm:h-44 w-full rounded-2xl object-cover shadow-sm"
              />
              <img
                src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80"
                alt="Study"
                className="h-36 sm:h-44 w-full rounded-2xl object-cover shadow-sm mt-3 sm:mt-4"
              />
            </div>
          </div>
        </div>
      </section>



      {/* =========================================================
          13. MOMENTS & CAMPUS GALLERY
      ========================================================= */}
      <section className="py-12 sm:py-14 bg-slate-50/60 border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#0A5C36]">
                Our Moments
              </span>
              <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-slate-900">
                Glimpses from Campus Life &amp; Events
              </h2>
            </div>
            <Link
              href="/media/photo"
              className="text-xs font-bold text-[#0A5C36] hover:underline inline-flex items-center gap-1"
            >
              <span>View Full Photo Gallery</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="grid auto-rows-[130px] sm:auto-rows-[180px] md:auto-rows-[220px] grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4">
            {galleryItems.map((item) => (
              <Link
                key={item.id}
                href="/media/photo"
                className={`relative overflow-hidden rounded-2xl group cursor-pointer ${item.className} block border border-slate-200/60 shadow-2xs hover:shadow-md transition-all`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3 sm:p-4 text-white">
                  <span className="text-[10px] font-bold text-yellow-400 uppercase tracking-wider">i3 Moment</span>
                  <h4 className="text-xs sm:text-sm font-bold leading-snug">{item.title}</h4>
                  <p className="text-[10px] sm:text-xs text-slate-200 line-clamp-1">{item.subtitle}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Media Room CTA Banner */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl bg-emerald-900/5 border border-emerald-800/15 p-4 sm:p-6 text-center sm:text-left">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                Explore our full institutional visual archive &amp; delegation gallery
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Browse official high-resolution photographs with interactive year &amp; category filters in our Photo Gallery.
              </p>
            </div>
            <Link
              href="/media/photo"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0A5C36] px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-sm hover:bg-[#074026] hover:shadow-md transition-all whitespace-nowrap shrink-0"
            >
              <span>Explore Photo Gallery</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {showVideo && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setShowVideo(false)}
        >
          <div
            className="relative w-full max-w-3xl overflow-hidden rounded-2xl bg-black shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30"
              onClick={() => setShowVideo(false)}
            >
              ✕
            </button>
            <div className="relative w-full pt-[56.25%]">
              <iframe
                src="https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=1"
                title="Workshop Video"
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
