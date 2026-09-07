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
  Box,
  Briefcase,
  Building,
  Check,
  CheckCircle2,
  Compass,
  Cpu,
  FileCheck,
  FileText,
  Globe,
  GraduationCap,
  HeartHandshake,
  HeartPulse,
  Landmark,
  Laptop,
  Layers,
  LucideIcon,
  Microscope,
  Palette,
  PieChart,
  Play,
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
    icon: PieChart,
    title: "Finance & Accounting",
    courses: "75 Courses",
    description: "Master financial modeling, accounting principles, and investment strategies.",
  },
  {
    id: 2,
    icon: Briefcase,
    title: "Business & Management",
    courses: "96 Courses",
    description: "Learn leadership, project management, and business communication.",
  },
  {
    id: 3,
    icon: Palette,
    title: "Creative Arts & Design",
    courses: "120 Courses",
    description: "Explore graphic design, UI/UX, and digital illustration.",
  },
  {
    id: 4,
    icon: UserPlus,
    title: "Personal Development",
    courses: "751 Courses",
    description: "Improve productivity, mindfulness, and essential soft skills.",
  },
  {
    id: 5,
    icon: HeartPulse,
    title: "Health & Wellness",
    courses: "23 Courses",
    description: "Discover courses on nutrition, fitness, and mental well-being.",
  },
  {
    id: 6,
    icon: Microscope,
    title: "Science & Engineering",
    courses: "16 Courses",
    description: "Deep dive into physics, engineering mechanics, and data science.",
  },
];

const HeroCourseData = [
  {
    id: 1,
    category: "DATA SCIENCE",
    title: "Introduction to Data Science and Analytics",
    rating: "4.8/ 2.6k Ratings",
    price: "₹1,999",
    oldPrice: "₹4,999",
    students: "270 Students",
    lessons: "40 Lessons",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    hoverColor: "#2d8cff",
    hoverText: "Learn core analytics, visualization, and practical data workflows for beginners.",
  },
  {
    id: 2,
    category: "MARKETING",
    title: "Digital Marketing Strategies and Tools",
    rating: "4.8/ 2.6k Ratings",
    price: "₹2,499",
    oldPrice: "₹5,499",
    students: "270 Students",
    lessons: "40 Lessons",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
    hoverColor: "#30a46c",
    hoverText: "Master campaigns, audience targeting, tools, and strategy for digital growth.",
  },
  {
    id: 3,
    category: "MARKETING",
    title: "Social Media Marketing Growth and Branding",
    rating: "4.8/ 2.6k Ratings",
    price: "₹1,499",
    oldPrice: "₹3,999",
    students: "82 Students",
    lessons: "24 Lessons",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
    hoverColor: "#3b82f6",
    hoverText: "Build social campaigns, improve conversions, and grow a powerful brand presence.",
  },
  {
    id: 4,
    category: "PROGRAMMING",
    title: "Full Stack Web Development & Cloud Deployment",
    rating: "4.9/ 3.1k Ratings",
    price: "₹2,999",
    oldPrice: "₹6,999",
    students: "520 Students",
    lessons: "60 Lessons",
    image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80",
    hoverColor: "#2d8cff",
    hoverText: "Learn React, Next.js, Node.js, databases, and real-world web applications from scratch.",
  },
  {
    id: 5,
    category: "GRAPHIC DESIGN",
    title: "Mastering UI/UX & Product Design Fundamentals",
    rating: "4.8/ 1.9k Ratings",
    price: "₹1,899",
    oldPrice: "₹4,299",
    students: "189 Students",
    lessons: "35 Lessons",
    image:
      "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=1200&q=80",
    hoverColor: "#6d5efc",
    hoverText: "Understand design systems, Figma wireframing, typography, and interactive prototyping.",
  },
  {
    id: 6,
    category: "MANAGEMENT",
    title: "Business Analytics & Financial Decision Making",
    rating: "4.8/ 2.2k Ratings",
    price: "Free",
    oldPrice: "₹3,499",
    students: "356 Students",
    lessons: "20 Lessons",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
    hoverColor: "#2494ff",
    hoverText: "Use data analytics techniques to make better business decisions and optimize performance.",
  },
  {
    id: 7,
    category: "PROGRAMMING",
    title: "Cybersecurity & Ethical Hacking Essentials",
    rating: "4.8/ 2.6k Ratings",
    price: "₹2,799",
    oldPrice: "₹5,999",
    students: "142 Students",
    lessons: "28 Lessons",
    image:
      "https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?auto=format&fit=crop&w=1200&q=80",
    hoverColor: "#3182ce",
    hoverText: "Protect systems, understand threats, network defense, and build practical cybersecurity skills.",
  },
  {
    id: 8,
    category: "MANAGEMENT",
    title: "Corporate Communication & Storytelling",
    rating: "4.8/ 2.5k Ratings",
    price: "₹999",
    oldPrice: "₹2,499",
    students: "450 Students",
    lessons: "16 Lessons",
    image:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80",
    hoverColor: "#30a46c",
    hoverText: "Improve pitch presentations, team leadership, business writing, and confident expression.",
  },
];

const HeroCourseTabs = [
  "ALL",
  "PROGRAMMING",
  "GRAPHIC DESIGN",
  "DATA SCIENCE",
  "MARKETING",
  "MANAGEMENT",
];

const MentorsData = [
  {
    id: 1,
    name: "James Wilson",
    role: "Marketing Director & Senior Mentor",
    quote:
      "Working with i3 cohorts has completely elevated practical youth readiness. The structured UGC framework ensures every student builds genuine industry competency.",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Emily Rodriguez",
    role: "Product Design Head",
    quote:
      "I've mentored across many platforms, but i3 stands out. The architecture, hands-on project workflow, and mentor feedback system are world-class.",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Lead Software Architect",
    quote:
      "An absolutely incredible experience working with the students. The attention to detail is unmatched, and our interns solve genuine engineering challenges.",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "Dr. Arvind Sharma",
    role: "Higher Education Advisor",
    quote:
      "Under DPKHRC Trust, this non-profit initiative bridges the gap between academic theory and corporate expectations with utmost integrity.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
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
    title: "Campus Life",
    subtitle: "Students collaborating",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
    className: "col-span-2 row-span-2",
  },
  {
    id: 2,
    title: "Study Sessions",
    subtitle: "Library focus",
    image:
      "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80",
    className: "col-span-1 row-span-1",
  },
  {
    id: 3,
    title: "Graduation",
    subtitle: "Class of 2024",
    image:
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80",
    className: "col-span-1 row-span-2",
  },
  {
    id: 4,
    title: "Tech Labs",
    subtitle: "Modern equipment",
    image:
      "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=800&q=80",
    className: "col-span-1 row-span-1",
  },
  {
    id: 5,
    title: "Creative Arts",
    subtitle: "Design studio",
    image:
      "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=1200&q=80",
    className: "col-span-2 row-span-1",
  },
  {
    id: 6,
    title: "Sports & Activities",
    subtitle: "Annual athletics",
    image:
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1200&q=80",
    className: "col-span-2 row-span-1",
  },
];

const row1 = [
  { icon: Rocket, name: "Acme Corp" },
  { icon: Zap, name: "FlashTech" },
  { icon: Sparkles, name: "NovaLabs" },
  { icon: Cpu, name: "Quantum" },
  { icon: Globe, name: "GlobalNet" },
  { icon: Layers, name: "Stackify" },
];

const row2 = [
  { icon: Box, name: "BlockChain" },
  { icon: Compass, name: "NorthStar" },
  { icon: Anchor, name: "MarinaTech" },
  { icon: Shield, name: "SecureIQ" },
  { icon: Target, name: "Bullseye" },
  { icon: Activity, name: "PulseFlow" },
];

const HeroGoalCards = [
  {
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
    title: "Daily Live Masterclasses",
    description:
      "Interact with educators, ask questions in real time, participate in polls, and clear project doubts.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=80",
    title: "Practice and Revise",
    description:
      "Learning extends beyond theory with hands-on practice modules, mock presentations, and mentor guidance.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80",
    title: "Learn & Build Anytime",
    description:
      "24/7 access to live cohorts, project repositories, recorded modules, and verifiable evaluations.",
  },
];

const HeroGoalPoints = [
  "Learn from top industry mentors & professors",
  "UGC & NEP 2020 credit-transfer compliant",
  "Live cohort problem solving & portfolio development",
];

const HeroNewsItems = [
  "UGC Aligned Certifications",
  "Top Industry Instructors",
  "50+ Domain Streams",
  "10,000+ Active Students",
  "Unit of DPKHRC Trust",
  "Expert Mentorship",
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

export default function HomePage() {
  const [showVideo, setShowVideo] = useState(false);
  const [activeTab, setActiveTab] = useState("ALL");
  const [activeMentorId, setActiveMentorId] = useState<number>(MentorsData.length);
  const stackRef = useRef<StackRef>(null);

  const activeMentor =
    MentorsData.find((m) => m.id === activeMentorId) ||
    MentorsData[MentorsData.length - 1];

  const filteredCourses = useMemo(() => {
    if (activeTab === "ALL") return HeroCourseData;
    return HeroCourseData.filter((item) => item.category === activeTab);
  }, [activeTab]);

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
          1. HERO SECTION (Exact Mockup Match)
      ========================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F7FAF8] via-white to-white py-10 md:py-14 lg:py-16 border-b border-gray-100">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">
            {/* Left Content */}
            <div className="flex flex-col items-start lg:col-span-7 xl:col-span-7">
              {/* Main Headline */}
              <h1 className="text-5xl sm:text-6xl lg:text-[62px] font-black tracking-tight text-[#0F2A1D] leading-[1.04]">
                Learn Today,<br />Lead Tomorrow
              </h1>

              {/* Subhead */}
              <p className="mt-4 text-xl sm:text-2xl md:text-[25px] font-extrabold tracking-tight text-slate-900">
                Your Internship. Your Skills. <span className="text-[#15803D]">Your Future.</span>
              </p>

              {/* Description Paragraph */}
              <p className="mt-4 max-w-xl text-sm sm:text-base leading-relaxed text-slate-600 font-normal">
                International Institute of Internship (i3) is a not-for-profit initiative committed to providing quality internships and skill enhancement training to students, aligned with industry needs and future careers.
              </p>

              {/* 4 Feature Items (Horizontal 4 columns with circle icons + title + subtitle) */}
              <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                {/* Feature 1 */}
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-[#0A5C36] border border-emerald-200/70 shadow-2xs">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-[13px] font-bold text-slate-900 leading-snug">
                      UGC Internship Aligned
                    </h4>
                    <p className="mt-0.5 text-[11px] text-slate-500 leading-snug">
                      Structured as per UGC Internship Guidelines
                    </p>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-[#0A5C36] border border-emerald-200/70 shadow-2xs">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-[13px] font-bold text-slate-900 leading-snug">
                      Skill-Based Training
                    </h4>
                    <p className="mt-0.5 text-[11px] text-slate-500 leading-snug">
                      Industry-relevant skills for real impact
                    </p>
                  </div>
                </div>

                {/* Feature 3 */}
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-[#0A5C36] border border-emerald-200/70 shadow-2xs">
                    <Briefcase className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-[13px] font-bold text-slate-900 leading-snug">
                      Real-World Experience
                    </h4>
                    <p className="mt-0.5 text-[11px] text-slate-500 leading-snug">
                      Work on live projects with expert mentors
                    </p>
                  </div>
                </div>

                {/* Feature 4 */}
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-[#0A5C36] border border-emerald-200/70 shadow-2xs">
                    <Award className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-[13px] font-bold text-slate-900 leading-snug">
                      Certificate &amp; Recognition
                    </h4>
                    <p className="mt-0.5 text-[11px] text-slate-500 leading-snug">
                      Enhance your profile and career opportunities
                    </p>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="mt-8 flex flex-wrap items-center gap-3.5">
                <Link
                  href="/student/registration"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0A5C36] px-6 py-3.5 text-xs sm:text-sm font-bold text-white shadow-md transition-all hover:bg-[#074026] hover:shadow-lg hover:-translate-y-0.5"
                >
                  <UserPlus className="h-4 w-4" />
                  <span>Free Student Registration</span>
                </Link>

                <Link
                  href="/internship"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-slate-200 bg-white px-6 py-3.5 text-xs sm:text-sm font-bold text-slate-800 shadow-2xs transition-all hover:bg-slate-50 hover:border-slate-300"
                >
                  <Search className="h-4 w-4 text-slate-600" />
                  <span>Find Internships</span>
                </Link>
              </div>
            </div>

            {/* Right Hero Image in Swoosh Container with Floating Quote Card */}
            <div className="relative flex items-center justify-center lg:col-span-5 xl:col-span-5">
              <div className="relative w-full max-w-[480px] lg:max-w-none">
                {/* Curved green swoosh border background element */}
                <div className="absolute -inset-2 rounded-r-3xl rounded-l-[110px] bg-gradient-to-br from-emerald-600/30 to-emerald-800/10 blur-sm pointer-events-none" />

                {/* Curved container */}
                <div className="relative overflow-hidden rounded-r-3xl rounded-l-[105px] border-[5px] border-emerald-600/20 shadow-2xl aspect-[4/3] sm:aspect-[14/11] lg:aspect-[4/3] bg-emerald-950">
                  <img
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80"
                    alt="Students collaborating during internship workshop"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-emerald-950/20 via-transparent to-transparent" />
                </div>

                {/* Floating Forest Green Quote Card at Top Right */}
                <div className="absolute top-4 right-4 rounded-xl bg-[#063B27] px-4 py-3.5 text-white shadow-2xl border border-emerald-700/60 max-w-[220px]">
                  <div className="flex items-center gap-1 text-xl font-serif text-emerald-400 leading-none mb-1">
                    <span>❝</span>
                  </div>
                  <p className="text-xs font-bold text-emerald-50 leading-snug">
                    Building Competent Youth for a Better Tomorrow
                  </p>
                  <div className="mt-2.5 h-0.5 w-12 bg-emerald-400 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          2. UGC INTERNSHIP FRAMEWORK ALIGNED BANNER (Exact Mockup Match)
      ========================================================= */}
      <section className="py-6 bg-white">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl border border-emerald-200/80 bg-[#F4FAF6] p-5 sm:p-6 lg:p-7 shadow-xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Left Logo + Title + Subtitle */}
              <div className="lg:col-span-5 flex items-start gap-3.5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0A5C36] text-white shadow-sm">
                  <Landmark className="h-6 w-6" />
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
                  <Check className="h-3.5 w-3.5 text-[#0A5C36] stroke-[3]" />
                  <span>60 to 120 hours of internship</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-[#0A5C36] stroke-[3]" />
                  <span>To be integrated by HEIs in the curriculum</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-[#0A5C36] stroke-[3]" />
                  <span>2 to 4 Academic Credits as per UGC Framework</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-[#0A5C36] stroke-[3]" />
                  <span>Enhancing employability &amp; real-world exposure</span>
                </div>
                <div className="flex items-center gap-1.5 sm:col-span-2">
                  <Check className="h-3.5 w-3.5 text-[#0A5C36] stroke-[3]" />
                  <span>Experiential Learning &amp; Skill Development</span>
                </div>
              </div>

              {/* Right CTA Button */}
              <div className="lg:col-span-3 flex justify-start lg:justify-end">
                <Link
                  href="/about/internship"
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#0A5C36] px-4 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-[#074026] transition-colors whitespace-nowrap"
                >
                  <span>Know More About UGC Guidelines</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
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
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Instructors</h4>
                    <p className="mt-1 text-[10px] text-slate-500 leading-snug">
                      Share knowledge, mentor students &amp; earn recognition
                    </p>
                  </div>
                </div>

                {/* Institutions */}
                <div className="flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-3.5 shadow-2xs hover:border-emerald-300 transition-all">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-[#0A5C36] mb-2">
                    <Building className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Institutions</h4>
                    <p className="mt-1 text-[10px] text-slate-500 leading-snug">
                      Integrate internships into curriculum &amp; enhance learning
                    </p>
                  </div>
                </div>

                {/* Organizations */}
                <div className="flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-3.5 shadow-2xs hover:border-emerald-300 transition-all">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-[#0A5C36] mb-2">
                    <Briefcase className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Organizations</h4>
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
                    <Building className="h-5 w-5" />
                  </div>
                  <div className="text-base sm:text-lg font-black text-slate-900">
                    500+
                  </div>
                  <div className="text-[10px] font-semibold text-slate-600">
                    Partner Organizations
                  </div>
                </div>

                {/* Stat 3 */}
                <div className="flex flex-col items-center">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full text-[#0A5C36] mb-1">
                    <Briefcase className="h-5 w-5" />
                  </div>
                  <div className="text-base sm:text-lg font-black text-slate-900">
                    1000+
                  </div>
                  <div className="text-[10px] font-semibold text-slate-600">
                    Internships Available
                  </div>
                </div>

                {/* Stat 4 */}
                <div className="flex flex-col items-center">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full text-[#0A5C36] mb-1">
                    <Award className="h-5 w-5" />
                  </div>
                  <div className="text-base sm:text-lg font-black text-slate-900">
                    50+
                  </div>
                  <div className="text-[10px] font-semibold text-slate-600">
                    Skill Training Programs
                  </div>
                </div>
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
                  <span className="whitespace-nowrap text-sm sm:text-base md:text-lg font-extrabold uppercase tracking-tight text-amber-950">
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
      <section className="relative w-full overflow-hidden bg-gradient-to-br from-emerald-950 via-[#063A1E] to-emerald-900 py-12 sm:py-16 text-white">
        <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 items-center">
            {/* Left Photo + Play Video Badge */}
            <div className="lg:col-span-5 flex flex-col items-center lg:items-start">
              <div className="group relative h-[220px] w-full max-w-[340px] overflow-hidden rounded-3xl shadow-2xl border border-emerald-500/20">
                <img
                  src="https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=1200&q=80"
                  alt="Students learning together"
                  className="block h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="mt-6 flex items-center gap-4 text-left">
                <button
                  onClick={() => setShowVideo(true)}
                  className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-yellow-400 text-slate-950 shadow-lg shadow-yellow-500/20 transition-transform hover:scale-110 active:scale-95"
                >
                  <Play className="ml-1 h-6 w-6 fill-current" />
                </button>
                <div>
                  <h4 className="text-base font-bold text-white">
                    Learn with 200+ Institutions &amp; Educators
                  </h4>
                  <p className="text-xs text-emerald-200/90 mt-0.5">
                    Watch our overview video to see how cohorts collaborate.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Goals Grid */}
            <div className="lg:col-span-7">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-yellow-400">
                    Cohort Experience
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                    Learning Focused on Your Goals
                  </h2>
                </div>
              </div>

              <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-6">
                {HeroGoalPoints.map((pt, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs font-medium text-emerald-100">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-yellow-400 mt-0.5" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {HeroGoalCards.map((card, idx) => (
                  <div
                    key={idx}
                    className="overflow-hidden rounded-2xl bg-white/10 p-4 border border-white/10 backdrop-blur-xs transition-transform hover:-translate-y-1"
                  >
                    <img
                      src={card.image}
                      alt={card.title}
                      className="h-28 w-full rounded-xl object-cover mb-3"
                    />
                    <h4 className="text-sm font-bold text-white">{card.title}</h4>
                    <p className="mt-1 text-xs text-emerald-200/80 leading-snug">
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
          6. 3D FLIPPING COURSES & CATEGORIES
      ========================================================= */}
      <section className="py-14 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0A5C36]">
              Domain Categories
            </span>
            <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-slate-900">
              Explore Our Top Disciplines
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600">
              From engineering and data science to arts and business strategy, select the domain that aligns with your goals.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {CourseCategoryData.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className="group relative h-[200px] w-full cursor-pointer [perspective:1000px]"
                >
                  <div className="relative h-full w-full duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                    {/* Front */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-emerald-100 bg-gradient-to-br from-[#0A5C36] to-[#063A1E] p-4 text-center text-white shadow-md [backface-visibility:hidden]">
                      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 shadow-sm backdrop-blur-md">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-xs sm:text-sm font-bold leading-tight text-white line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-[11px] font-semibold text-yellow-300">
                        {item.courses}
                      </p>
                    </div>

                    {/* Back */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-emerald-200 bg-white p-4 text-center shadow-md [backface-visibility:hidden] [transform:rotateY(180deg)]">
                      <p className="text-[11px] text-slate-600 leading-snug mb-3">
                        {item.description}
                      </p>
                      <span className="inline-flex items-center justify-center rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-bold text-[#0A5C36]">
                        Explore <ArrowRight className="ml-1 h-3 w-3" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          7. TABBED COURSE & INTERNSHIP SHOWCASE
      ========================================================= */}
      <section className="py-14 bg-slate-50/60 border-y border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
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
          <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
            {HeroCourseTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "rounded-full px-4 py-1.5 text-xs font-bold transition-all",
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
                <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 rounded-md bg-[#063A1E]/80 px-2.5 py-1 text-[10px] font-bold text-emerald-300 backdrop-blur-xs">
                    {course.category}
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-4">
                  <h3 className="text-sm font-bold text-slate-900 line-clamp-2 min-h-[40px] leading-snug">
                    {course.title}
                  </h3>

                  <div className="mt-2 flex items-center gap-1 text-amber-500">
                    <Star className="h-3.5 w-3.5 fill-current" />
                    <span className="text-xs font-semibold text-slate-600">{course.rating}</span>
                  </div>

                  <p className="mt-2 text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {course.hoverText}
                  </p>

                  <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="text-base font-extrabold text-[#0A5C36]">
                        {course.price}
                      </span>
                      <span className="text-xs text-slate-400 line-through">
                        {course.oldPrice}
                      </span>
                    </div>

                    <Link
                      href="/student/registration"
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#0A5C36] group-hover:underline"
                    >
                      <span>Enroll</span>
                      <ArrowRight className="h-3 w-3" />
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
      <section className="py-14 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
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

          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
            {/* 3D Stack */}
            <div className="relative mx-auto h-[300px] w-full max-w-[280px] sm:h-[360px] sm:max-w-[340px]">
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
            <div className="flex flex-col items-start justify-center">
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
                    className="mt-4 text-sm sm:text-base leading-relaxed text-slate-600 italic"
                  >
                    &ldquo;{activeMentor.quote}&rdquo;
                  </motion.p>
                </motion.div>
              </AnimatePresence>

              {/* Navigation buttons */}
              <div className="mt-8 flex items-center gap-3">
                <button
                  onClick={() => stackRef.current?.prev()}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0A5C36] text-white shadow-md hover:bg-[#063A1E] transition-all active:scale-95"
                  aria-label="Previous mentor"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() => stackRef.current?.next()}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0A5C36] text-white shadow-md hover:bg-[#063A1E] transition-all active:scale-95"
                  aria-label="Next mentor"
                >
                  <ArrowRight className="h-5 w-5" />
                </button>
                <span className="text-xs text-slate-500 ml-2 font-medium">
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
      <section className="py-14 bg-slate-50/70 border-t border-gray-100 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
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

              <div className="relative z-10">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0A5C36]">
                  Real Outcomes
                </span>
                <h2 className="mt-2 text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
                  What Our Students Have to Say
                </h2>
                <p className="mt-3 text-sm text-slate-600 max-w-md">
                  Our students consistently praise the transformative project experience and UGC credit validation. Here is what they say.
                </p>
              </div>
            </div>

            {/* Right Testimonial Card */}
            <div className="lg:col-span-6">
              <div className="rounded-3xl border border-gray-200/80 bg-white p-6 sm:p-8 shadow-md">
                <div className="flex items-center gap-1 text-amber-500 mb-4">
                  {[...Array(DUMMY_TESTIMONIALS[currentTestimonialIndex].stars)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                  <span className="text-xs font-bold text-slate-700 ml-2">5.0 Star Feedback</span>
                </div>

                <p className="text-sm sm:text-base font-medium leading-relaxed text-slate-700 italic">
                  &ldquo;{DUMMY_TESTIMONIALS[currentTestimonialIndex].text}&rdquo;
                </p>

                <div className="mt-6 flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-3">
                    <img
                      src={DUMMY_TESTIMONIALS[currentTestimonialIndex].image}
                      alt={DUMMY_TESTIMONIALS[currentTestimonialIndex].name}
                      className="h-12 w-12 rounded-full object-cover ring-2 ring-emerald-100"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">
                        {DUMMY_TESTIMONIALS[currentTestimonialIndex].name}
                      </h4>
                      <p className="text-xs text-slate-500">
                        {DUMMY_TESTIMONIALS[currentTestimonialIndex].role}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
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
      <section className="py-14 bg-white">
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
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-16 w-16 items-center justify-center rounded-full bg-red-600 text-white shadow-xl transition-transform hover:scale-110"
                  aria-label="Play workshop video"
                >
                  <Play className="ml-1 h-7 w-7 fill-current" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-[#0A5C36] mb-3">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Free Interactive Masterclass</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Join Our Weekly Free Tech &amp; Career Workshops
              </h2>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                Experience firsthand how i3 instructors conduct live problem-solving sessions, explain NEP credit integration, and review real-world industry case studies.
              </p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-[#0A5C36]">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                      Live Q&amp;A Sessions
                    </h4>
                    <p className="text-[11px] text-slate-500">
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
                    <p className="text-[11px] text-slate-500">
                      Guidance on resume building and LinkedIn optimization.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Link
                  href="/student/registration"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#0A5C36] px-5 py-3 text-xs font-bold text-white shadow-md hover:bg-[#063A1E] transition-all"
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
      <section className="py-14 bg-slate-50/70 border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0A5C36]">
                Why Choose Us
              </span>
              <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-slate-900">
                Why Students &amp; Colleges Choose i3 for Their Future
              </h2>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                As a unit of DPKHRC Trust, our sole objective is ensuring fair, high-caliber, and verifiable internship education that prepares Indian students for global opportunities.
              </p>

              <div className="mt-6 space-y-3">
                {whyChoosePoints.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm font-semibold text-slate-800">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 rounded-xl bg-white border border-gray-300 px-5 py-2.5 text-xs font-bold text-slate-700 hover:bg-gray-50 hover:border-gray-400 transition-all"
                >
                  <span>Learn More About Our Trust</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-2 gap-3 sm:gap-4">
              <img
                src="https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=800&q=80"
                alt="Collab"
                className="h-44 w-full rounded-2xl object-cover shadow-sm"
              />
              <img
                src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80"
                alt="Study"
                className="h-44 w-full rounded-2xl object-cover shadow-sm mt-4"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          12. DUAL-DIRECTION PARTNERS MARQUEE
      ========================================================= */}
      <section className="py-12 bg-white overflow-hidden border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Trusted Ecosystem
          </span>
          <h3 className="mt-1 text-lg sm:text-xl font-bold text-slate-800">
            Trusted by Leading Educational Institutions &amp; Industry Networks
          </h3>
        </div>

        <div className="relative flex flex-col gap-4">
          <div className="group flex overflow-hidden">
            <div className="animate-marquee flex w-max shrink-0 py-1">
              {[...row1, ...row1, ...row1].map((partner, i) => {
                const Icon = partner.icon;
                return (
                  <div
                    key={i}
                    className="flex items-center gap-2.5 px-6 text-slate-400 opacity-70 hover:opacity-100 hover:text-[#0A5C36] transition-all cursor-default"
                  >
                    <Icon className="h-5 w-5" />
                    <span className="text-sm font-bold">{partner.name}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="group flex overflow-hidden">
            <div
              className="animate-marquee flex w-max shrink-0 py-1"
              style={{ animationDirection: "reverse" }}
            >
              {[...row2, ...row2, ...row2].map((partner, i) => {
                const Icon = partner.icon;
                return (
                  <div
                    key={i}
                    className="flex items-center gap-2.5 px-6 text-slate-400 opacity-70 hover:opacity-100 hover:text-[#0A5C36] transition-all cursor-default"
                  >
                    <Icon className="h-5 w-5" />
                    <span className="text-sm font-bold">{partner.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          13. MOMENTS & CAMPUS GALLERY
      ========================================================= */}
      <section className="py-14 bg-slate-50/60 border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#0A5C36]">
                Our Moments
              </span>
              <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-slate-900">
                Glimpses from Campus Life &amp; Events
              </h2>
            </div>
            <Link
              href="/media"
              className="text-xs font-bold text-[#0A5C36] hover:underline inline-flex items-center gap-1"
            >
              <span>Visit Media Room</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="grid auto-rows-[160px] grid-cols-2 gap-3 sm:gap-4 md:auto-rows-[220px] md:grid-cols-4">
            {galleryItems.map((item) => (
              <div
                key={item.id}
                className={`relative overflow-hidden rounded-2xl group cursor-pointer ${item.className}`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4 text-white">
                  <h4 className="text-sm font-bold">{item.title}</h4>
                  <p className="text-xs text-slate-200">{item.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          14. BOTTOM TRUST & COMMUNITY BANNER (Exact Mockup Match)
      ========================================================= */}
      <section className="py-6 bg-white">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl bg-[#063A1E] p-6 sm:p-8 text-white shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Left 4 Value Pillars in a 4-Column Layout */}
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
                      <Cpu className="h-5 w-5" />
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
                <div className="w-full max-w-sm rounded-xl bg-white p-4 sm:p-5 text-slate-900 shadow-xl flex items-center justify-between gap-4">
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
                    className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[#0A5C36] px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-[#074026] transition-all whitespace-nowrap shrink-0"
                  >
                    <span>Join Us Today!</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
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
