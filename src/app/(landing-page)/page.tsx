"use client";

import { Activity as Activity_2, Anchor, ArrowLeft, ArrowRight as ArrowRight_2, ArrowUpRight, Box, Briefcase as Briefcase_2, CheckCircle2, Compass, Cpu, FileText, Globe as Globe_2, GraduationCap as GraduationCap_2, HeartPulse, Layers, LucideIcon, Microscope, Palette, PieChart, Play, Rocket, Shield, Sparkles as Sparkles_2, Star, Target as Target_2, User, UserPlus, Users as Users_2, Zap, ArrowRight, Play as Play_2, Sparkles, Star as Star_2, Video } from "lucide-react";
import * as React from "react";
import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import { clsx, ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { AnimatePresence, Variants, motion, PanInfo, useMotionValue, useTransform } from "motion/react";
import * as z from "zod";
import { format } from "date-fns";
import Link_2 from "next/link";
import { cva, VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import { clsx as clsx_2 } from "clsx";

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-md border border-transparent bg-clip-padding text-xs/relaxed font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/80",
        outline:
          "border-border hover:bg-input/50 hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:bg-input/30",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-9 gap-1.5 px-4 text-xs/relaxed has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3 [&_svg:not([class*='size-'])]:size-4",
        xs: "h-6 gap-1 rounded-sm px-2 text-[0.625rem] has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1 px-3 text-xs/relaxed has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-10 gap-1.5 px-5 text-sm/relaxed has-data-[icon=inline-end]:pr-4 has-data-[icon=inline-start]:pl-4 [&_svg:not([class*='size-'])]:size-4.5",
        icon: "size-9 [&_svg:not([class*='size-'])]:size-4",
        "icon-xs": "size-6 rounded-sm [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8 [&_svg:not([class*='size-'])]:size-3.5",
        "icon-lg": "size-10 [&_svg:not([class*='size-'])]:size-4.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx_2(inputs));
}

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}
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
        description:
          "Master financial modeling, accounting principles, and investment strategies.",
      },
      {
        id: 2,
        icon: Briefcase_2,
        title: "Business & Management",
        courses: "96 Courses",
        description:
          "Learn leadership, project management, and business communication.",
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
        description:
          "Improve productivity, mindfulness, and essential soft skills.",
      },
      {
        id: 5,
        icon: HeartPulse,
        title: "Health & Wellness",
        courses: "23 Courses",
        description:
          "Discover courses on nutrition, fitness, and mental well-being.",
      },
      {
        id: 6,
        icon: Microscope,
        title: "Science & Engineering",
        courses: "16 Courses",
        description:
          "Deep dive into physics, engineering mechanics, and data science.",
      },
    ];

function cn_2(...inputs: ClassValue[]) {
      return twMerge(clsx(inputs));
    }

const HeroCourseData = [
      {
        id: 1,
        category: "DATA SCIENCE",
        title: "Introduction to Data Science and Analytics",
        rating: "4.8/ 2.6k Ratings",
        price: "$24",
        oldPrice: "$30",
        students: "270 Student",
        lessons: "40 Lessons",
        image:
          "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
        hoverColor: "#2d8cff",
        hoverText:
          "Learn core analytics, visualization, and practical data workflows for beginners.",
      },
      {
        id: 2,
        category: "MARKETING",
        title: "Digital Marketing Strategies and Tools",
        rating: "4.8/ 2.6k Ratings",
        price: "$49",
        oldPrice: "$59",
        students: "270 Student",
        lessons: "40 Lessons",
        image:
          "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
        hoverColor: "#30a46c",
        hoverText:
          "Master campaigns, audience targeting, tools, and strategy for digital growth.",
      },
      {
        id: 3,
        category: "MARKETING",
        title: "Social Media Marketing Growth and Branding",
        rating: "4.8/ 2.6k Ratings",
        price: "$720",
        oldPrice: "$999",
        students: "82 Student",
        lessons: "24 Lessons",
        image:
          "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
        hoverColor: "#3b82f6",
        hoverText:
          "Build social campaigns, improve conversions, and grow a powerful brand presence.",
      },
      {
        id: 4,
        category: "PROGRAMMING",
        title: "Web Development From Beginner to Expert",
        rating: "4.8/ 2.6k Ratings",
        price: "$20",
        oldPrice: "$28",
        students: "50 Student",
        lessons: "20 Lessons",
        image:
          "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80",
        hoverColor: "#2d8cff",
        hoverText:
          "Learn HTML, CSS, JavaScript, and real-world web development from scratch.",
      },
      {
        id: 5,
        category: "GRAPHIC DESIGN",
        title: "Mastering Graphic Design Fundamentals",
        rating: "4.8/ 2.6k Ratings",
        price: "$119",
        oldPrice: "$149",
        students: "89 Student",
        lessons: "85 Lessons",
        image:
          "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=1200&q=80",
        hoverColor: "#6d5efc",
        hoverText:
          "Understand layouts, typography, branding, and modern visual communication.",
      },
      {
        id: 6,
        category: "MANAGEMENT",
        title: "Business Analytics for Decision Making",
        rating: "4.8/ 2.6k Ratings",
        price: "Free",
        oldPrice: "$99",
        students: "56 Student",
        lessons: "20 Lessons",
        image:
          "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
        hoverColor: "#2494ff",
        hoverText:
          "Use data analytics techniques to make better business decisions and improve performance.",
      },
      {
        id: 7,
        category: "PROGRAMMING",
        title: "Cybersecurity Essentials Protecting Digital Systems",
        rating: "4.8/ 2.6k Ratings",
        price: "$59",
        oldPrice: "$79",
        students: "42 Student",
        lessons: "28 Lessons",
        image:
          "https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?auto=format&fit=crop&w=1200&q=80",
        hoverColor: "#3182ce",
        hoverText:
          "Protect systems, understand threats, and build practical cybersecurity awareness.",
      },
      {
        id: 8,
        category: "MANAGEMENT",
        title: "Creative Writing Crafting Compelling Stories",
        rating: "4.8/ 2.6k Ratings",
        price: "$07",
        oldPrice: "$19",
        students: "2.5k Student",
        lessons: "11 Lessons",
        image:
          "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80",
        hoverColor: "#30a46c",
        hoverText:
          "Improve storytelling, structure, creativity, and written expression with confidence.",
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

function cn_3(...inputs: ClassValue[]) {
      return twMerge(clsx(inputs));
    }

const MentorsData = [
      {
        id: 1,
        name: "James Wilson",
        role: "Marketing Director",
        quote:
          "Working with this team has completely transformed our approach to digital strategy. Their insights are invaluable, and the results speak for themselves. Truly a game-changing experience!",
        image:
          "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: 2,
        name: "Emily Rodriguez",
        role: "Product Design Head",
        quote:
          "I've seen many platforms, but this one stands out. The architecture and the design are flawless. They really understand how to create a seamless user experience.",
        image:
          "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: 3,
        name: "Michael Chen",
        role: "Lead Software Engineer",
        quote:
          "An absolutely incredible experience working with the team. The attention to detail is unmatched, and their technical expertise helped us scale our product seamlessly.",
        image:
          "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: 4,
        name: "Tamar Mendelson",
        role: "Restaurant Critic",
        quote:
          "I was impressed by the food! And I could really tell that they use high-quality ingredients. The staff was friendly and attentive. I'll definitely be back for more!",
        image:
          "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
      },
    ];

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

const containerVariants: Variants = {
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
        },
      },
      exit: {
        opacity: 0,
        transition: {
          staggerChildren: 0.05,
          staggerDirection: -1,
        },
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

const HeroSectionInstructors = [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&auto=format&fit=crop&q=80",
    ];

const DUMMY_TESTIMONIALS = [
      {
        id: 1,
        name: "Alex Johnson",
        role: "Frontend Developer",
        stars: 5,
        text: "The mentorship provided here is unparalleled. I was able to scale my skills in React and Next.js within weeks. Highly recommended!",
        image:
          "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80",
      },
      {
        id: 2,
        name: "Sarah Parker",
        role: "UI/UX Designer",
        stars: 5,
        text: "Amazing structure and guidance. The hands-on projects helped me build a solid portfolio that landed me a job at a top tech firm.",
        image:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
      },
      {
        id: 3,
        name: "David Lee",
        role: "Software Engineer",
        stars: 5,
        text: "A truly transformative experience. The feedback on my code reviews was detailed and incredibly helpful for my growth.",
        image:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      },
    ];

const AUTO_SLIDE_DELAY = 4000;

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
      { icon: Sparkles_2, name: "NovaLabs" },
      { icon: Cpu, name: "Quantum" },
      { icon: Globe_2, name: "GlobalNet" },
      { icon: Layers, name: "Stackify" },
    ];

const row2 = [
      { icon: Box, name: "BlockChain" },
      { icon: Compass, name: "NorthStar" },
      { icon: Anchor, name: "MarinaTech" },
      { icon: Shield, name: "SecureIQ" },
      { icon: Target_2, name: "Bullseye" },
      { icon: Activity_2, name: "PulseFlow" },
    ];

const HeroGoalCards = [
            {
              image:
                "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
              title: "Daily Live Classes",
              description:
                "Interact with educators, ask questions, participate in live polls, and clear your doubts.",
            },
            {
              image:
                "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=80",
              title: "Practice and Revise",
              description:
                "Learning extends beyond classes with our practice section, mock tests, and guidance.",
            },
            {
              image:
                "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80",
              title: "Learn Anytime",
              description:
                "One subscription gives you access to all live and recorded classes whenever you need.",
            },
          ];

const HeroGoalPoints = [
            "Learn from top educators in your city",
            "In-person classes & doubt solving",
            "Bonus access to online learning",
          ];

const cards = MentorsData.map((mentor) => (
            <div
              key={mentor.id}
              className="h-full w-full overflow-hidden rounded-[24px] bg-white shadow-md"
            >
              <img
                src={mentor.image}
                alt={mentor.name}
                className="pointer-events-none h-full w-full object-cover"
              />
            </div>
          ));

const HeroNewsItems = [
            "Online Certifications",
            "Top Instructors",
            "2500+ Online Courses",
            "56+ Wonderful Awards",
            "5000+ Members",
            "Expert Mentors",
          ];

const points = [
            "Free for physically handcraft",
            "Easy to enroll courses",
            "Course certificate for particular course",
          ];


export default function HomePage() {
    function useTouchHover<T extends HTMLElement>() {
      const [isHovered, setIsHovered] = useState(false);
      const ref = useRef<T>(null);

      const isTouch = useRef(false);

      useEffect(() => {
        const handleOutsideInteraction = (event: MouseEvent | TouchEvent) => {
          if (ref.current && !ref.current.contains(event.target as Node)) {
            setIsHovered(false);
          }
        };

        if (isHovered) {
          document.addEventListener("mousedown", handleOutsideInteraction);
          document.addEventListener("touchstart", handleOutsideInteraction);
        }

        return () => {
          document.removeEventListener("mousedown", handleOutsideInteraction);
          document.removeEventListener("touchstart", handleOutsideInteraction);
        };
      }, [isHovered]);

      const hoverProps = {
        onMouseEnter: () => {
          if (!isTouch.current) setIsHovered(true);
        },
        onMouseLeave: () => {
          if (!isTouch.current) setIsHovered(false);
        },
        onTouchStart: () => {
          isTouch.current = true;
          setIsHovered((prev) => !prev);
        },
      };

      return { isHovered, ref, hoverProps };
    }

    const CategoryCard = ({ item }: { item: CategoryData }) => {
      const { isHovered, hoverProps, ref } = useTouchHover<HTMLElement>();
      const Icon = item.icon;

      return (
        <article
          ref={ref}
          {...hoverProps}
          className="group relative h-[180px] w-full cursor-pointer [perspective:1000px] sm:h-[210px] xl:h-[240px]"
        >
          <div
            className={cn_2(
              "relative h-full w-full duration-700 [transform-style:preserve-3d]",
              isHovered ? "[transform:rotateY(180deg)]" : "",
            )}
          >
            {}
            <div className="from-primary absolute inset-0 flex flex-col items-center justify-center overflow-hidden rounded-[20px] border border-emerald-400/30 bg-gradient-to-br to-emerald-500 p-3 text-center shadow-[0_12px_40px_rgba(16,185,129,0.35)] backdrop-blur-md [backface-visibility:hidden] sm:p-5 xl:p-7">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 shadow-[0_4px_15px_rgba(255,255,255,0.15)] backdrop-blur-md sm:mb-5 sm:h-16 sm:w-16 xl:mb-6 xl:h-20 xl:w-20">
                <Icon className="h-6 w-6 stroke-[1.5] text-white sm:h-8 sm:w-8 xl:h-10 xl:w-10" />
              </div>
              <h3 className="mb-1.5 px-1 text-[14px] font-bold leading-[1.3] text-white sm:mb-2 sm:text-[17px] xl:text-[20px]">
                {item.title}
              </h3>
              <p className="m-0 text-[12px] font-medium text-yellow-300 sm:text-[14px] xl:text-[15px]">
                {item.courses}
              </p>
              <span className="absolute -bottom-5 -right-5 h-[70px] w-[70px] rotate-45 rounded-xl bg-white/20"></span>
            </div>

            {}
            <div className="bg-card/80 border-border/80 absolute inset-0 flex flex-col items-center justify-center overflow-hidden rounded-[20px] border p-4 text-center shadow-[0_8px_30px_rgba(0,0,0,0.05)] backdrop-blur-md [backface-visibility:hidden] [transform:rotateY(180deg)] sm:p-5 xl:p-7">
              <p className="text-muted-foreground mb-4 px-1 text-[11.5px] font-medium leading-normal sm:mb-5 sm:text-[12.5px] xl:mb-6 xl:text-[13.5px]">
                {item.description}
              </p>
              <span className="inline-flex items-center justify-center rounded-full bg-emerald-500/10 px-3.5 py-1.5 text-[12px] font-semibold text-emerald-600 transition-colors duration-300 hover:bg-emerald-500 hover:text-white sm:px-4 sm:text-[13px]">
                Explore <ArrowRight_2 className="ml-1.5 h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </span>
            </div>
          </div>
        </article>
      );
    };

    function useTouchHover_2<T extends HTMLElement>() {
      const [isHovered, setIsHovered] = useState(false);
      const ref = useRef<T>(null);

      const isTouch = useRef(false);

      useEffect(() => {
        const handleOutsideInteraction = (event: MouseEvent | TouchEvent) => {
          if (ref.current && !ref.current.contains(event.target as Node)) {
            setIsHovered(false);
          }
        };

        if (isHovered) {
          document.addEventListener("mousedown", handleOutsideInteraction);
          document.addEventListener("touchstart", handleOutsideInteraction);
        }

        return () => {
          document.removeEventListener("mousedown", handleOutsideInteraction);
          document.removeEventListener("touchstart", handleOutsideInteraction);
        };
      }, [isHovered]);

      const hoverProps = {
        onMouseEnter: () => {
          if (!isTouch.current) setIsHovered(true);
        },
        onMouseLeave: () => {
          if (!isTouch.current) setIsHovered(false);
        },
        onTouchStart: () => {
          isTouch.current = true;
          setIsHovered((prev) => !prev);
        },
      };

      return { isHovered, ref, hoverProps };
    }

    const TabButton = ({
      tab,
      activeTab,
      onClick,
    }: {
      tab: string;
      activeTab: string;
      onClick: () => void;
    }) => {
      const { isHovered, hoverProps, ref } = useTouchHover_2<HTMLButtonElement>();
      const isActive = activeTab === tab;

      return (
        <button
          ref={ref}
          {...hoverProps}
          onClick={onClick}
          className={cn_3(
            "relative cursor-pointer rounded-full border-none px-5 py-2 text-[13px] font-medium transition-all duration-300 md:px-7 md:py-2.5 md:text-[15px]",
            isActive
              ? "from-primary text-primary-foreground bg-gradient-to-r to-emerald-500"
              : cn_3(
                  "text-muted-foreground bg-transparent",
                  isHovered && "text-foreground bg-muted/50",
                ),
          )}
        >
          {tab}
        </button>
      );
    };

    const CourseCard = ({ course }: { course: (typeof HeroCourseData)[0] }) => {
      const { isHovered, ref, hoverProps } = useTouchHover_2<HTMLElement>();

      return (
        <article
          ref={ref}
          {...hoverProps}
          className={cn_3(
            "group relative z-10 flex flex-col overflow-hidden rounded-[32px] p-3 transition-all duration-300 md:p-4",
            "bg-card shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)]",
            isHovered ? "-translate-y-2" : "",
          )}
        >
          {}
          <div className="pointer-events-none absolute right-0 top-0 z-0 -mr-8 -mt-8 h-32 w-32 rounded-full bg-emerald-500 opacity-30 mix-blend-multiply blur-[24px] transition-transform duration-700 ease-out group-hover:scale-150 dark:opacity-20 dark:mix-blend-screen" />
          <div className="pointer-events-none absolute bottom-0 left-1/2 z-0 -mb-10 h-28 w-[120%] -translate-x-1/2 rounded-[100%] bg-emerald-500 opacity-20 mix-blend-multiply blur-[24px] transition-transform duration-700 ease-out group-hover:scale-125 dark:opacity-10 dark:mix-blend-screen" />

          {}
          <div className="bg-muted/50 relative z-10 h-[180px] w-full shrink-0 overflow-hidden rounded-[24px] md:h-[210px]">
            <img
              src={course.image}
              alt={course.title}
              className={cn_3(
                "h-full w-full object-cover transition-transform duration-500",
                isHovered && "scale-105",
              )}
              loading="lazy"
            />
            {}
            <div className="absolute inset-0 bg-black/5 transition-colors duration-300 group-hover:bg-transparent" />
          </div>

          {}
          <div className="relative z-10 flex flex-1 flex-col px-2 pb-2 pt-3 md:px-3">
            <h3 className="text-foreground mb-1 line-clamp-2 min-h-[48px] text-lg font-bold leading-tight tracking-tight md:text-xl">
              {course.title}
            </h3>

            <div className="mb-1.5 flex items-center gap-1.5">
              <div className="flex items-center gap-0.5 text-amber-500">
                <Star className="h-[15px] w-[15px] fill-current" />
                <Star className="h-[15px] w-[15px] fill-current" />
                <Star className="h-[15px] w-[15px] fill-current" />
                <Star className="h-[15px] w-[15px] fill-current" />
                <Star className="h-[15px] w-[15px] fill-current" />
              </div>
              <span className="text-muted-foreground text-xs font-medium md:text-sm">
                ({course.rating})
              </span>
            </div>

            <p className="text-muted-foreground mb-4 line-clamp-2 text-xs md:text-sm">
              {course.hoverText}
            </p>

            {}
            <div className="relative z-10 mt-auto grid w-full grid-cols-2 gap-y-4">
              {}
              <div className="col-span-2 flex items-center gap-2">
                <span className="text-2xl font-extrabold tracking-tight text-emerald-700 dark:text-emerald-500">
                  {course.price}
                </span>
                <span className="text-muted-foreground text-sm font-semibold line-through">
                  {course.oldPrice}
                </span>
              </div>

              {}
              <div className="text-muted-foreground flex items-center gap-2 text-xs font-semibold md:text-sm">
                <div className="flex items-center justify-center rounded-lg bg-emerald-500/10 p-1.5 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-500">
                  <User className="h-[16px] w-[16px] md:h-[18px] md:w-[18px]" />
                </div>
                <span>{course.students}</span>
              </div>

              <div className="text-muted-foreground flex items-center justify-end gap-2 text-xs font-semibold md:text-sm">
                <div className="flex items-center justify-center rounded-lg bg-emerald-500/10 p-1.5 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-500">
                  <FileText className="h-[16px] w-[16px] md:h-[18px] md:w-[18px]" />
                </div>
                <span>{course.lessons}</span>
              </div>
            </div>
          </div>

          {}
          <div
            className={cn_3(
              "absolute inset-x-0 bottom-0 z-20 overflow-hidden rounded-b-[32px] transition-all duration-300 ease-in-out group-hover:rounded-[32px]",
              isHovered ? "h-full" : "h-0",
            )}
          >
            {}
            <div className="from-primary absolute inset-0 h-full w-full overflow-hidden border border-emerald-400/30 bg-gradient-to-br to-emerald-500 shadow-[0_12px_40px_rgba(16,185,129,0.35)] backdrop-blur-md">
              <span className="absolute -bottom-5 -right-5 h-[70px] w-[70px] rotate-45 rounded-xl bg-white/20"></span>
            </div>

            {}
            <div
              className={cn_3(
                "relative z-10 flex h-full w-full flex-col p-4 text-white transition-opacity duration-300 md:p-5",
                isHovered ? "opacity-100 delay-100" : "opacity-0",
              )}
            >
              <h3 className="mb-2 line-clamp-2 text-lg font-bold leading-tight drop-shadow-sm md:text-xl">
                {course.title}
              </h3>

              <div className="mb-3 flex items-center gap-1.5">
                <div className="flex gap-0.5 text-amber-300 drop-shadow-sm">
                  <Star className="h-[14px] w-[14px] fill-current" />
                  <Star className="h-[14px] w-[14px] fill-current" />
                  <Star className="h-[14px] w-[14px] fill-current" />
                  <Star className="h-[14px] w-[14px] fill-current" />
                  <Star className="h-[14px] w-[14px] fill-current" />
                </div>
                <span className="text-xs font-medium text-white/90 md:text-sm">
                  ({course.rating})
                </span>
              </div>

              <p className="mb-4 line-clamp-3 text-sm font-medium leading-snug text-white/95 drop-shadow-sm md:text-base">
                {course.hoverText}
              </p>

              <div className="mb-4 mt-auto flex items-center gap-3">
                <span className="text-xl font-bold tracking-tight text-amber-300 drop-shadow-sm">
                  {course.price}
                </span>
                <span className="text-xs font-medium text-white/80 line-through md:text-sm">
                  {course.oldPrice}
                </span>
              </div>

              <button className="min-h-[44px] w-full cursor-pointer rounded-[14px] border-none bg-white text-center text-sm font-bold text-gray-900 shadow-sm transition-transform hover:-translate-y-0.5 md:min-h-[48px] md:text-base">
                Explore Course
              </button>
            </div>
          </div>
        </article>
      );
    };

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

    const Stack_2 = forwardRef<StackRef, StackProps>(
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
          } else {
            return [
              {
                id: 1,
                content: (
                  <img
                    src="https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=500&auto=format"
                    alt="card-1"
                    className="pointer-events-none h-full w-full object-cover"
                  />
                ),
              },
              {
                id: 2,
                content: (
                  <img
                    src="https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=500&auto=format"
                    alt="card-2"
                    className="pointer-events-none h-full w-full object-cover"
                  />
                ),
              },
              {
                id: 3,
                content: (
                  <img
                    src="https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=500&auto=format"
                    alt="card-3"
                    className="pointer-events-none h-full w-full object-cover"
                  />
                ),
              },
              {
                id: 4,
                content: (
                  <img
                    src="https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=500&auto=format"
                    alt="card-4"
                    className="pointer-events-none h-full w-full object-cover"
                  />
                ),
              },
            ];
          }
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

        const sendToBack = useCallback(
          (id: number) => {
            setStack((prev) => {
              const newStack = [...prev];
              const index = newStack.findIndex((card) => card.id === id);
              if (index === -1) return prev;
              const [card] = newStack.splice(index, 1);
              newStack.unshift(card);
              if (onTopCardChange) {
                onTopCardChange(newStack[newStack.length - 1].id);
              }
              return newStack;
            });
          },
          [onTopCardChange],
        );

        const sendToFront = useCallback(() => {
          setStack((prev) => {
            const newStack = [...prev];
            const card = newStack.shift(); 
            if (card) {
              newStack.push(card); 
            }
            if (onTopCardChange) {
              onTopCardChange(newStack[newStack.length - 1].id);
            }
            return newStack;
          });
        }, [onTopCardChange]);

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
            style={{
              perspective: 600,
            }}
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
    Stack_2.displayName = "Stack";

    const Stack_3 = Stack_2;

    function useTouchHover_3<T extends HTMLElement>() {
      const [isHovered, setIsHovered] = useState(false);
      const ref = useRef<T>(null);

      const isTouch = useRef(false);

      useEffect(() => {
        const handleOutsideInteraction = (event: MouseEvent | TouchEvent) => {
          if (ref.current && !ref.current.contains(event.target as Node)) {
            setIsHovered(false);
          }
        };

        if (isHovered) {
          document.addEventListener("mousedown", handleOutsideInteraction);
          document.addEventListener("touchstart", handleOutsideInteraction);
        }

        return () => {
          document.removeEventListener("mousedown", handleOutsideInteraction);
          document.removeEventListener("touchstart", handleOutsideInteraction);
        };
      }, [isHovered]);

      const hoverProps = {
        onMouseEnter: () => {
          if (!isTouch.current) setIsHovered(true);
        },
        onMouseLeave: () => {
          if (!isTouch.current) setIsHovered(false);
        },
        onTouchStart: () => {
          isTouch.current = true;
          setIsHovered((prev) => !prev);
        },
      };

      return { isHovered, ref, hoverProps };
    }

    const GalleryCard = ({ item }: { item: (typeof galleryItems)[0] }) => {
      const { isHovered, ref, hoverProps } = useTouchHover_3<HTMLDivElement>();

      return (
        <div
          ref={ref}
          {...hoverProps}
          className={`relative cursor-pointer overflow-hidden rounded-3xl transition-all duration-500 ${item.className}`}
        >
          {}
          <div className="bg-muted absolute inset-0">
            <img
              src={item.image}
              alt={item.title}
              className={`h-full w-full object-cover transition-transform duration-700 ${isHovered ? "scale-105" : "scale-100"}`}
            />
          </div>

          {}
          <div
            className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-500 ${isHovered ? "opacity-100" : "opacity-0"}`}
          />

          {}
          <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-6">
            <div
              className={`transition-all duration-500 ease-out ${isHovered ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
            >
              <div className="flex items-center justify-between gap-2 sm:gap-4">
                <div className="min-w-0 flex-1">
                  <h3 className="mb-0.5 truncate text-sm font-bold leading-tight text-white sm:mb-1 sm:whitespace-normal sm:text-2xl">
                    {item.title}
                  </h3>
                  <p className="truncate text-[10px] font-medium text-white/90 sm:whitespace-normal sm:text-base">
                    {item.subtitle}
                  </p>
                </div>
                <div
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/30 backdrop-blur-md transition-transform duration-500 sm:h-10 sm:w-10 ${isHovered ? "rotate-0" : "rotate-45"}`}
                >
                  <ArrowUpRight className="h-3.5 w-3.5 text-white sm:h-5 sm:w-5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    };

    function useTouchHover_4<T extends HTMLElement>() {
      const [isHovered, setIsHovered] = useState(false);
      const ref = useRef<T>(null);

      const isTouch = useRef(false);

      useEffect(() => {
        const handleOutsideInteraction = (event: MouseEvent | TouchEvent) => {
          if (ref.current && !ref.current.contains(event.target as Node)) {
            setIsHovered(false);
          }
        };

        if (isHovered) {
          document.addEventListener("mousedown", handleOutsideInteraction);
          document.addEventListener("touchstart", handleOutsideInteraction);
        }

        return () => {
          document.removeEventListener("mousedown", handleOutsideInteraction);
          document.removeEventListener("touchstart", handleOutsideInteraction);
        };
      }, [isHovered]);

      const hoverProps = {
        onMouseEnter: () => {
          if (!isTouch.current) setIsHovered(true);
        },
        onMouseLeave: () => {
          if (!isTouch.current) setIsHovered(false);
        },
        onTouchStart: () => {
          isTouch.current = true;
          setIsHovered((prev) => !prev);
        },
      };

      return { isHovered, ref, hoverProps };
    }

    const PartnerCard = ({ partner }: { partner: (typeof row1)[0] }) => {
      const { isHovered, ref, hoverProps } = useTouchHover_4<HTMLDivElement>();

      return (
        <div
          ref={ref}
          {...hoverProps}
          className={`flex shrink-0 cursor-pointer items-center gap-3 px-2 transition-all duration-500 sm:gap-4 ${
            isHovered
              ? "text-primary scale-[1.10] opacity-100 grayscale-0"
              : "text-muted-foreground opacity-60 grayscale"
          }`}
        >
          <partner.icon className="h-7 w-7 sm:h-8 sm:w-8 lg:h-10 lg:w-10" />
          <span className="text-lg font-bold tracking-tight sm:text-xl lg:text-2xl">
            {partner.name}
          </span>
        </div>
      );
    };
    const [showVideo, setShowVideo] = useState(false);
    const [activeTab, setActiveTab] = useState("ALL");
    const filteredData = useMemo(() => {
            if (activeTab === "ALL") return HeroCourseData;
            return HeroCourseData.filter((item) => item.category === activeTab);
          }, [activeTab]);
    const [activeId, setActiveId] = useState<number>(MentorsData.length);
    const stackRef = useRef<StackRef>(null);
    const activeMentor =
            MentorsData.find((m) => m.id === activeId) ||
            MentorsData[MentorsData.length - 1];
    const [testimonialData] = useState(DUMMY_TESTIMONIALS);
    const [currentIndex, setCurrentIndex] = useState(0);
    const totalSlides = testimonialData.length;
    useEffect(() => {
            if (totalSlides === 0) return;

            const interval = setInterval(() => {
              setCurrentIndex((prev) => (prev + 1) % totalSlides);
            }, AUTO_SLIDE_DELAY);

            return () => clearInterval(interval);
          }, [totalSlides]);
    const handlePrev = () => {
            setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
          };
    const handleNext = () => {
            setCurrentIndex((prev) => (prev + 1) % totalSlides);
          };
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <section className="bg-background relative w-full overflow-hidden pb-0 pt-1 md:pt-2 lg:pt-4">
                    {}
                    <div className="bg-primary/20 pointer-events-none absolute -left-[10%] -top-[10%] z-0 h-[40%] w-[40%] rounded-full blur-[120px]"></div>
                    <div className="pointer-events-none absolute -right-[10%] top-[20%] z-0 h-[45%] w-[35%] rounded-full bg-emerald-500/10 blur-[120px]"></div>

                    {}
                    <div className="via-primary/5 pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-transparent to-transparent"></div>
                    <div className="from-background pointer-events-none absolute inset-x-0 top-0 z-10 h-32 bg-gradient-to-b to-transparent"></div>

                    <div className="relative z-10 mx-auto flex min-h-[auto] w-full max-w-[1380px] flex-col items-center justify-between gap-4 px-4 pb-0 text-left md:px-7 lg:min-h-[calc(100vh-100px)] lg:flex-row lg:gap-8">
                      <div className="relative z-20 flex w-full max-w-full flex-col items-start pt-4 lg:max-w-[610px] lg:pt-0">
                        <div className="from-primary text-primary-foreground mb-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r to-emerald-500 px-3 py-1.5 text-xs font-semibold transition-all duration-300 hover:brightness-110 sm:mb-6 sm:px-4 sm:py-2 sm:text-sm lg:mb-8">
                          <Sparkles className="h-3.5 w-3.5 animate-pulse text-yellow-300 sm:h-4 sm:w-4" />
                          Trusted by 50,000+ Students Worldwide
                        </div>

                        <div className="relative mb-0 hidden h-[0px] w-full justify-start lg:flex lg:w-auto">
                          <span className="relative left-auto top-auto mr-2.5 inline-flex animate-pulse text-[34px] leading-none text-emerald-500/80 lg:absolute lg:-left-[20px] lg:-top-[15px] lg:mr-0 lg:text-[40px]">
                            ✦
                          </span>
                          <span className="relative left-auto top-auto inline-flex text-[24px] leading-none text-emerald-400/50 lg:absolute lg:left-[550px] lg:top-[60px] lg:text-[28px]">
                            ✦
                          </span>
                        </div>

                        <h1 className="text-foreground m-0 font-serif text-[34px] font-normal leading-none tracking-[-1px] sm:text-[40px] md:text-[54px] lg:text-[62px] lg:leading-[0.95] lg:tracking-[-2px] xl:text-[72px] 2xl:text-[82px]">
                          Get{" "}
                          <span className="via-primary bg-gradient-to-r from-emerald-500 to-emerald-700 bg-clip-text font-semibold text-transparent drop-shadow-sm">
                            2500+
                          </span>
                          <br />
                          Best Online Courses
                          <br />
                          From{" "}
                          <span className="underline decoration-emerald-200 decoration-[4px] underline-offset-8">
                            II Internships
                          </span>
                        </h1>

                        <p className="text-muted-foreground m-[16px_0_24px] max-w-[560px] text-[14px] font-medium leading-[1.6] sm:text-[15px] lg:m-[24px_0_32px] lg:text-[18px] lg:leading-[1.55] xl:text-[20px]">
                          Best online education platforms offer flexible learning, quality
                          courses, and expert instructors.
                        </p>

                        <div className="mt-2 flex flex-row items-center justify-start gap-4 sm:mt-4 sm:gap-6 lg:mt-6 lg:gap-8">
                          <Button
                            asChild
                            className="from-primary hover:from-primary/90 text-primary-foreground group h-11 rounded-md border-0 bg-gradient-to-r to-emerald-500 pl-5 pr-1.5 text-[15px] font-medium shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:to-emerald-500/90 hover:shadow-[0_8px_20px_rgba(16,185,129,0.3)] sm:h-12 sm:pl-6 sm:pr-2 lg:h-[50px] lg:pl-8 lg:pr-2 lg:text-[17px]"
                          >
                            <Link_2 href="/" className="flex items-center gap-3 lg:gap-4">
                              <span>Find Courses</span>
                              <span className="bg-background text-primary group-hover:bg-foreground group-hover:text-background flex h-8 w-8 items-center justify-center rounded shadow-sm transition-colors duration-300 lg:h-9 lg:w-9">
                                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 lg:h-[18px] lg:w-[18px]" />
                              </span>
                            </Link_2>
                          </Button>

                          <div className="border-border pl-0 sm:border-l sm:pl-6 lg:pl-8">
                            <p className="text-foreground m-[0_0_4px] text-[13px] font-medium leading-[1.3] sm:text-[14px] md:m-[0_0_6px] lg:text-[16px]">
                              250+ Instructors
                            </p>

                            <div className="flex items-center justify-start">
                              {HeroSectionInstructors.map((item, index) => (
                                <img
                                  key={index}
                                  src={item}
                                  alt={`Instructor ${index + 1}`}
                                  className="border-background relative z-10 -ml-[8px] h-[30px] w-[30px] cursor-pointer rounded-full border-[2px] object-cover shadow-sm transition-transform duration-300 first:ml-0 hover:z-30 hover:scale-110 sm:-ml-[10px] sm:h-[34px] sm:w-[34px] lg:h-[42px] lg:w-[42px] lg:border-[3px]"
                                />
                              ))}

                              <div className="border-background bg-primary text-primary-foreground hover:bg-primary/90 relative z-20 -ml-[8px] inline-flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-full border-[2px] text-[18px] font-medium shadow-sm transition-all duration-300 hover:scale-110 sm:-ml-[10px] sm:h-[34px] sm:w-[34px] lg:h-[42px] lg:w-[42px] lg:border-[3px] lg:text-[24px]">
                                +
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="relative mt-10 flex w-full max-w-full items-end justify-center sm:mt-12 md:mt-16 lg:mt-0 lg:max-w-[520px] lg:self-end xl:max-w-[620px]">
                        {}
                        <div className="text-primary/10 absolute right-[0%] top-[0%] z-0 h-[140px] w-[140px] bg-[radial-gradient(currentColor_2px,transparent_2px)] [background-size:16px_16px] lg:-top-[5%] lg:h-[180px] lg:w-[180px]"></div>

                        {}
                        <svg
                          className="pointer-events-none absolute left-[50%] top-[50%] z-0 aspect-square w-[120%] max-w-[340px] -translate-x-1/2 -translate-y-1/2 overflow-visible opacity-20 sm:max-w-[380px] md:max-w-[440px] md:opacity-[0.25] lg:max-w-[500px] xl:max-w-[580px]"
                          viewBox="0 0 800 800"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle
                            cx="400"
                            cy="400"
                            r="210"
                            className="stroke-primary"
                            strokeWidth="1.5"
                          />
                          <circle
                            cx="400"
                            cy="400"
                            r="270"
                            className="stroke-primary"
                            strokeWidth="1.5"
                          />
                          <circle
                            cx="400"
                            cy="400"
                            r="330"
                            className="stroke-primary"
                            strokeWidth="1.5"
                          />
                          <circle
                            cx="400"
                            cy="400"
                            r="390"
                            className="stroke-primary"
                            strokeWidth="1.5"
                          />
                        </svg>
                        <div className="from-primary shadow-primary/30 hover:shadow-primary/40 absolute bottom-[20px] left-[50%] z-0 h-[160px] w-[110px] -translate-x-[50%] rotate-[10deg] rounded-[22px] bg-gradient-to-br to-emerald-500 shadow-2xl transition-all duration-500 hover:rotate-[14deg] hover:scale-105 sm:bottom-[30px] sm:h-[190px] sm:w-[130px] md:bottom-[40px] md:h-[240px] md:w-[180px] lg:bottom-[40px] lg:left-[90px] lg:h-[340px] lg:w-[240px] lg:translate-x-0 lg:rotate-[12deg] xl:bottom-[50px] xl:left-[120px] xl:h-[380px] xl:w-[280px]"></div>

                        {}
                        <div className="absolute left-[5%] top-[10%] z-10 flex sm:top-[15%] lg:hidden">
                          <span className="inline-flex animate-pulse text-[28px] leading-none text-emerald-500 sm:text-[32px]">
                            ✦
                          </span>
                          <span className="ml-1 mt-4 inline-flex text-[20px] leading-none text-emerald-400/50 sm:text-[24px]">
                            ✦
                          </span>
                        </div>

                        <img
                          src="/images/Main-image.webp"
                          alt="Students"
                          className="relative z-10 block max-h-[60vh] w-full max-w-[260px] object-contain object-bottom sm:max-w-[300px] md:max-w-[400px] lg:max-h-[75vh] lg:max-w-[480px] xl:max-w-[560px]"
                        />

                        {}
                        <div className="bg-background/70 border-border/50 hover:bg-background/90 absolute bottom-[15%] right-[-10px] z-30 flex items-center gap-2 rounded-xl border p-2.5 shadow-xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:bottom-[20%] sm:right-[-20px] sm:gap-3 sm:rounded-2xl sm:p-3 lg:right-[-30px] lg:p-4">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 sm:h-10 sm:w-10 lg:h-12 lg:w-12">
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6"
                            >
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                            </svg>
                          </div>
                          <div>
                            <p className="text-foreground mb-1 text-sm font-bold leading-none sm:text-base lg:text-lg">
                              4.9/5
                            </p>
                            <p className="text-muted-foreground text-[10px] font-medium leading-none sm:text-xs lg:text-sm">
                              Top Rated
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
      <section className="group relative z-20 -mt-4 w-full origin-center -rotate-2 scale-[1.05] overflow-hidden border-y border-amber-500/30 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 shadow-inner lg:-mt-6">
                    {}
                    <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(#d97706_1px,transparent_1px)] opacity-[0.15] mix-blend-color-burn [background-size:16px_16px]"></div>

                    {}
                    <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-20 w-12 bg-gradient-to-r from-yellow-400 via-yellow-400/80 to-transparent sm:w-24 md:w-32"></div>
                    <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-20 w-12 bg-gradient-to-l from-yellow-500 via-yellow-500/80 to-transparent sm:w-24 md:w-32"></div>

                    <div className="animate-marquee relative z-10 flex w-max items-center hover:[animation-play-state:paused]">
                      {[0, 1].map((group) => (
                        <div
                          key={group}
                          className="flex shrink-0 items-center"
                          aria-hidden={group === 1 ? "true" : undefined}
                        >
                          {HeroNewsItems.map((item, index) => (
                            <div
                              key={`${group}-${index}`}
                              className="flex shrink-0 cursor-default items-center gap-3 px-3.5 py-3 transition-transform duration-300 hover:z-30 hover:scale-105 sm:gap-4 sm:px-[18px] sm:py-3.5 md:gap-[18px] md:px-[24px] lg:gap-[20px] lg:px-[28px] lg:py-[16px] xl:px-[34px]"
                            >
                              <span className="inline-flex shrink-0 items-center justify-center drop-shadow-sm">
                                <Star_2
                                  className="h-5 w-5 animate-[spin_10s_linear_infinite] fill-amber-900/20 text-amber-900 sm:h-[26px] sm:w-[26px] md:h-[30px] md:w-[30px] xl:h-[34px] xl:w-[34px]"
                                  strokeWidth={2}
                                />
                              </span>
                              <span className="whitespace-nowrap font-serif text-base font-semibold leading-none tracking-tight text-amber-950 drop-shadow-sm sm:text-lg md:text-[22px] lg:text-[26px] xl:text-[30px]">
                                {item}
                              </span>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </section>
      <section className="to-primary relative -mt-4 w-full overflow-hidden bg-gradient-to-br from-emerald-950 via-emerald-800 py-8 sm:py-12 md:-mt-6 md:py-16">
                    {}
                    <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(theme(colors.white/0.05)_1px,transparent_1px)] [background-size:24px_24px]"></div>

                    <div className="relative z-10 mx-auto grid w-full max-w-[1380px] grid-cols-1 gap-8 px-4 sm:px-6 md:gap-9 lg:grid-cols-[0.85fr_1.15fr] lg:gap-11 lg:px-8 xl:grid-cols-[0.8fr_1.2fr]">
                      {}
                      <div className="flex flex-col items-center lg:items-start">
                        <div
                          className="group relative h-[205px] w-full max-w-[270px] overflow-hidden rounded-[28px] shadow-2xl sm:h-[225px] sm:max-w-[300px] md:h-[245px] md:max-w-[380px] lg:max-w-[310px]"
                          style={{
                            clipPath: "polygon(0 0, 100% 0, 100% 78%, 76% 100%, 0 78%)",
                          }}
                        >
                          <div className="absolute inset-0 z-10 bg-emerald-500/10 mix-blend-overlay transition-colors duration-500 group-hover:bg-transparent"></div>
                          <img
                            src="https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=1200&q=80"
                            alt="Students learning together"
                            className="block h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        </div>

                        <div className="mt-6 flex flex-col items-center gap-4 text-center sm:mt-5 sm:flex-row sm:text-left md:gap-[18px] lg:mt-[22px]">
                          <div className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-yellow-400 shadow-lg shadow-yellow-500/20 sm:h-20 sm:w-20 lg:h-[88px] lg:w-[88px]">
                            {}
                            <div className="absolute inset-0 animate-[spin_14s_linear_infinite]">
                              <svg
                                viewBox="0 0 100 100"
                                className="h-full w-full overflow-visible opacity-90"
                              >
                                <path
                                  id="circlePath"
                                  d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
                                  fill="transparent"
                                />
                                <text className="fill-yellow-950 text-[11.5px] font-bold uppercase tracking-[3.5px]">
                                  <textPath href="#circlePath" startOffset="0%">
                                    Play Video • Play Video •
                                  </textPath>
                                </text>
                              </svg>
                            </div>
                            <button className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.5)] transition-all hover:scale-110 hover:bg-emerald-500 lg:h-[42px] lg:w-[42px]">
                              <Play_2 className="ml-0.5 h-4 w-4 fill-white lg:h-5 lg:w-5" />
                            </button>
                          </div>

                          <div>
                            <h3 className="m-0 max-w-[250px] text-[18px] font-medium leading-[1.3] text-white drop-shadow-md sm:max-w-sm sm:text-[20px] lg:max-w-md lg:text-[22px]">
                              Learn With{" "}
                              <span className="font-semibold text-yellow-400 drop-shadow-sm">
                                200+
                              </span>{" "}
                              World Class Institutions And Educators
                            </h3>
                          </div>
                        </div>
                      </div>

                      {}
                      <div className="mt-6 w-full lg:mt-0">
                        <div className="flex flex-col items-start justify-between gap-5 md:gap-6 lg:flex-row lg:gap-8">
                          <h2 className="m-0 w-full max-w-xl font-serif text-3xl font-bold leading-tight tracking-tight text-white drop-shadow-md sm:text-4xl md:text-5xl">
                            Learning Focused on Your Goals
                          </h2>

                          <ul className="m-0 flex w-full list-none flex-col gap-3.5 p-0 md:min-w-[260px] lg:min-w-[300px] lg:pt-2.5">
                            {HeroGoalPoints.map((point, index) => (
                              <li
                                key={index}
                                className="flex items-start gap-2.5 text-[15px] font-medium leading-[1.5] text-emerald-50/90 lg:text-[16px]"
                              >
                                <Star_2 className="mt-1 h-[15px] w-[15px] shrink-0 fill-yellow-400 text-yellow-400 drop-shadow-sm" />
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-[28px] lg:grid-cols-3 lg:gap-[18px]">
                          {HeroGoalCards.map((card, index) => (
                            <div
                              key={index}
                              className="group relative overflow-hidden rounded-[18px] bg-[#d5e8df] shadow-[0_14px_30px_rgba(0,0,0,0.08)] transition-transform duration-300 hover:-translate-y-1"
                            >
                              <div className="relative z-10 h-[140px] w-full p-2 lg:h-[130px] xl:h-[140px]">
                                <img
                                  src={card.image}
                                  alt={card.title}
                                  className="block h-full w-full rounded-[16px] object-cover"
                                />
                              </div>

                              <div className="relative z-10 p-[14px_16px_18px] lg:p-[14px_20px_20px]">
                                <h3 className="m-0 mb-2 text-[17px] font-bold leading-[1.3] text-slate-900 lg:text-[18px]">
                                  {card.title}
                                </h3>
                                <p className="m-0 text-[13px] font-medium leading-[1.6] text-slate-600 lg:text-[14px]">
                                  {card.description}
                                </p>
                              </div>

                              <div className="absolute -bottom-[18px] -right-[18px] z-0 h-[88px] w-[88px] rotate-[28deg] rounded-[18px] bg-[#f2ede7]/90 transition-transform duration-500 group-hover:scale-110"></div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {}
                    <div
                      className="bg-background absolute bottom-0 left-0 right-0 z-0 h-[60px] translate-y-1 md:h-[72px] lg:h-[88px]"
                      style={{ clipPath: "polygon(0 100%, 66% 12%, 100% 100%)" }}
                    ></div>
                  </section>
      <section className="bg-background w-full overflow-hidden py-8 sm:py-12 md:py-16">
                    <div className="container mx-auto max-w-[1500px] px-4 md:px-6">
                      <h2 className="text-foreground mb-[36px] text-center font-serif text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:mb-[60px] md:text-5xl">
                        Courses & Categories
                      </h2>

                      <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 lg:gap-6 xl:grid-cols-6">
                        {CourseCategoryData.map((item) => (
                          <CategoryCard key={item.id} item={item} />
                        ))}
                      </div>
                    </div>
                  </section>
      <section className="bg-background w-full overflow-hidden py-8 sm:py-12 md:py-16">
                    <div className="container mx-auto max-w-[1400px] px-4 md:px-6">
                      {}
                      <div className="mb-8 flex flex-row items-center justify-between gap-3 sm:gap-6 md:mb-10">
                        <h2 className="text-foreground font-serif text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">
                          Explore Top Courses
                        </h2>
                        <button className="from-primary hover:from-primary/90 text-primary-foreground group flex h-9 shrink-0 cursor-pointer items-center justify-between rounded-md border-0 bg-gradient-to-r to-emerald-500 pl-3 pr-1 text-[12px] font-medium shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:to-emerald-500/90 hover:shadow-[0_8px_20px_rgba(16,185,129,0.3)] sm:h-11 sm:pl-5 sm:pr-1.5 sm:text-[14px] md:h-12 md:pl-6 md:pr-2 md:text-[15px] lg:h-[50px] lg:pl-8 lg:pr-2 lg:text-[17px]">
                          <span className="mr-2 sm:mr-3 lg:mr-4">View All</span>
                          <span className="bg-background text-primary group-hover:bg-foreground group-hover:text-background flex h-7 w-7 items-center justify-center rounded shadow-sm transition-colors duration-300 sm:h-8 sm:w-8 md:h-8 md:w-8 lg:h-9 lg:w-9">
                            <ArrowRight_2 className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 sm:h-4 sm:w-4 lg:h-[18px] lg:w-[18px]" />
                          </span>
                        </button>
                      </div>

                      {}
                      <div className="mb-10 flex flex-wrap items-center justify-center gap-2 md:gap-4">
                        {HeroCourseTabs.map((tab) => (
                          <TabButton
                            key={tab}
                            tab={tab}
                            activeTab={activeTab}
                            onClick={() => setActiveTab(tab)}
                          />
                        ))}
                      </div>

                      {}
                      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4">
                        {filteredData.map((course) => (
                          <CourseCard key={course.id} course={course} />
                        ))}
                      </div>

                      {}
                      <div className="relative mt-10 flex items-center justify-center px-4 md:mt-12 lg:mt-16">
                        <div className="bg-border/60 absolute left-0 right-0 h-px" />
                        <div className="bg-background border-border/50 text-card-foreground relative z-10 max-w-[90%] rounded-2xl border px-4 py-2.5 text-center text-[11px] font-medium sm:text-xs md:max-w-none md:rounded-full md:px-6 md:py-3 md:text-sm lg:px-8 lg:py-3.5 lg:text-base">
                          Learn with{" "}
                          <span className="font-bold text-emerald-700 dark:text-emerald-500">
                            200+
                          </span>{" "}
                          world class institutions and educators
                        </div>
                      </div>
                    </div>
                  </section>
      <section className="bg-background w-full overflow-hidden py-8 font-serif sm:py-12 md:py-16">
                    <div className="container mx-auto max-w-[1200px] px-4 md:px-6">
                      {}

                      <h2 className="text-foreground mb-[36px] text-center font-serif text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:mb-[60px] md:text-5xl">
                        Meet our Highly Skilled Mentors
                      </h2>

                      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-24">
                        {}
                        <div className="relative mx-auto h-[250px] w-full max-w-[250px] px-0 sm:h-[340px] sm:max-w-[340px] lg:h-[420px] lg:max-w-[420px] xl:h-[460px]">
                          <Stack_3
                            ref={stackRef}
                            cards={cards}
                            onTopCardChange={(id) => setActiveId(id)}
                            randomRotation={true}
                            sendToBackOnClick={true}
                            sensitivity={100}
                          />
                        </div>

                        {}
                        <div className="flex flex-col items-start justify-center px-4 text-left sm:px-10 lg:px-0">
                          <div className="flex h-auto min-h-[220px] w-full flex-col justify-center sm:min-h-[250px] lg:min-h-[280px]">
                            <AnimatePresence mode="wait">
                              <motion.div
                                key={activeId}
                                variants={containerVariants}
                                initial="hidden"
                                animate="show"
                                exit="exit"
                                className="flex flex-col"
                              >
                                <motion.h3
                                  variants={itemVariants}
                                  className="text-foreground mb-2 text-[28px] font-bold leading-[1.1] tracking-tight sm:text-[36px] lg:text-[48px]"
                                >
                                  {activeMentor.name}
                                </motion.h3>
                                <motion.p
                                  variants={itemVariants}
                                  className="text-primary mb-6 text-[16px] font-medium sm:text-[18px] lg:mb-10 lg:text-[20px]"
                                >
                                  {activeMentor.role}
                                </motion.p>

                                <motion.p
                                  variants={itemVariants}
                                  className="text-muted-foreground text-[16px] leading-[1.6] sm:text-[18px] md:leading-[1.8] lg:text-[22px]"
                                >
                                  {activeMentor.quote}
                                </motion.p>
                              </motion.div>
                            </AnimatePresence>
                          </div>

                          {}
                          <div className="mt-6 flex items-center justify-start gap-4 lg:mt-10">
                            <button
                              onClick={() => stackRef.current?.prev()}
                              className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-none bg-emerald-600 text-white shadow-md transition-transform hover:scale-105 hover:bg-emerald-700 active:scale-95 sm:h-14 sm:w-14"
                              aria-label="Previous"
                            >
                              <ArrowLeft className="h-6 w-6 stroke-[2.5] sm:h-7 sm:w-7" />
                            </button>
                            <button
                              onClick={() => stackRef.current?.next()}
                              className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-none bg-emerald-600 text-white shadow-md transition-transform hover:scale-105 hover:bg-emerald-700 active:scale-95 sm:h-14 sm:w-14"
                              aria-label="Next"
                            >
                              <ArrowRight_2 className="h-6 w-6 stroke-[2.5] sm:h-7 sm:w-7" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
      <section className="bg-background w-full overflow-hidden py-8 sm:py-12 md:py-16">
                    <div className="container mx-auto grid min-h-[560px] max-w-[1320px] grid-cols-1 items-center gap-8 px-4 lg:grid-cols-[1fr_0.94fr] lg:gap-14 lg:px-8">
                      {}
                      <div className="relative flex flex-col justify-center lg:min-h-[520px] lg:pl-[210px]">
                        {}
                        <div className="pointer-events-none absolute inset-0 hidden lg:block">
                          {floatingFaces.map((item) => (
                            <div
                              key={item.id}
                              className={`bg-muted absolute overflow-hidden rounded-full shadow-sm ${item.className}`}
                            >
                              <img
                                src={item.image}
                                alt="student"
                                className="h-full w-full object-cover opacity-80 mix-blend-multiply grayscale"
                              />
                            </div>
                          ))}
                        </div>

                        <h2 className="text-foreground relative z-10 m-0 max-w-[560px] font-serif text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">
                          <span className="block lg:inline">What Our </span>
                          <span className="text-primary block lg:inline">Students </span>
                          <span className="block lg:inline">Have to Say</span>
                        </h2>

                        <p className="text-muted-foreground relative z-10 mt-6 max-w-[500px] text-base leading-relaxed sm:text-lg">
                          Our students consistently praise the transformative learning
                          experience we provide. Here’s what they say about our courses
                        </p>
                      </div>

                      {}
                      <div className="relative flex flex-col items-center pt-2">
                        {}
                        <div className="bg-secondary absolute bottom-11 left-1/2 z-0 h-[215px] w-[76%] -translate-x-1/2 rounded-[28px] opacity-80 lg:bottom-14 lg:h-[270px] lg:w-[72%]"></div>
                        <div className="bg-muted border-border/50 absolute bottom-7 left-1/2 z-0 h-[235px] w-[86%] -translate-x-1/2 rounded-[28px] border opacity-95 lg:bottom-9 lg:h-[290px] lg:w-[82%]"></div>

                        {}
                        <div className="bg-background border-border relative z-10 min-h-[320px] w-full max-w-full overflow-hidden rounded-[22px] border shadow-md lg:min-h-[378px] lg:max-w-[640px] lg:rounded-[28px]">
                          <div className="h-full w-full overflow-hidden">
                            <div
                              className="flex h-full transition-transform duration-700 ease-in-out"
                              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                            >
                              {testimonialData.map((item) => (
                                <div
                                  key={item.id}
                                  className="bg-background flex h-full min-w-full flex-col justify-between p-6 sm:p-8 lg:p-10"
                                >
                                  <div className="flex h-full flex-col">
                                    <div className="flex flex-wrap items-center gap-3">
                                      <div className="flex gap-1 text-emerald-600">
                                        {[...Array(item.stars)].map((_, i) => (
                                          <Star key={i} className="h-4 w-4 fill-current" />
                                        ))}
                                      </div>
                                      <span className="text-muted-foreground font-sans text-[0.88rem] font-medium lg:text-[0.98rem]">
                                        Highly Experienced Mentors
                                      </span>
                                    </div>

                                    <p className="text-foreground mb-6 mt-5 max-w-[100%] flex-grow font-sans text-[0.96rem] leading-[1.6] lg:mb-8 lg:mt-6 lg:max-w-[88%] lg:text-[1.08rem]">
                                      &quot;{item.text}&quot;
                                    </p>

                                    <div className="mt-auto flex items-end justify-between gap-4">
                                      <div className="flex items-center gap-3 lg:gap-4">
                                        <img
                                          src={item.image}
                                          alt={item.name}
                                          className="h-[54px] w-[54px] rounded-full object-cover shadow-sm lg:h-[72px] lg:w-[72px]"
                                        />
                                        <div className="flex flex-col">
                                          <h3 className="text-foreground m-0 font-sans text-[1rem] font-semibold leading-tight lg:text-[1.1rem]">
                                            {item.name}
                                          </h3>
                                          <p className="text-muted-foreground m-0 mt-1 font-sans text-[0.9rem] leading-tight lg:text-[0.98rem]">
                                            {item.role}
                                          </p>
                                        </div>
                                      </div>

                                      <div className="text-primary/10 pointer-events-none translate-y-2 select-none font-serif text-[4rem] font-bold leading-[0.72] lg:text-[7rem]">
                                        ””
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {}
                        <div className="z-10 mt-6 flex w-full max-w-[640px] items-center justify-between px-2 sm:px-0">
                          <button
                            onClick={handlePrev}
                            className="flex h-10 w-10 items-center justify-center rounded-full border-none bg-emerald-600 text-white shadow-md transition-transform hover:scale-105 hover:bg-emerald-700 active:scale-95 lg:h-12 lg:w-12"
                          >
                            <ArrowLeft className="h-5 w-5 lg:h-6 lg:w-6" />
                          </button>

                          <div className="flex flex-col items-center gap-2">
                            <div className="text-muted-foreground font-sans text-[0.9rem] font-medium lg:text-[1rem]">
                              {totalSlides === 0
                                ? "0 / 0"
                                : `${currentIndex + 1} / ${totalSlides}`}
                            </div>

                            <div className="bg-border/50 h-2 w-[145px] overflow-hidden rounded-full sm:w-[170px] lg:w-[216px]">
                              <div
                                className="h-full rounded-full bg-emerald-600 transition-all duration-500 ease-in-out"
                                style={{
                                  width:
                                    totalSlides === 0
                                      ? "0%"
                                      : `${((currentIndex + 1) / totalSlides) * 100}%`,
                                }}
                              ></div>
                            </div>
                          </div>

                          <button
                            onClick={handleNext}
                            className="flex h-10 w-10 items-center justify-center rounded-full border-none bg-emerald-600 text-white shadow-md transition-transform hover:scale-105 hover:bg-emerald-700 active:scale-95 lg:h-12 lg:w-12"
                          >
                            <ArrowRight_2 className="h-5 w-5 lg:h-6 lg:w-6" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </section>
      <>
                    <section className="bg-background relative overflow-hidden py-8 sm:py-12 md:py-16">
                      {}
                      <div className="pointer-events-none absolute left-[-100px] top-[-80px] z-0 h-[280px] w-[280px] rounded-full bg-[radial-gradient(circle,rgba(120,105,255,0.08),transparent_70%)]"></div>
                      <div className="pointer-events-none absolute bottom-[-100px] right-[-80px] z-0 h-[260px] w-[260px] rounded-full bg-[radial-gradient(circle,rgba(42,196,224,0.08),transparent_70%)]"></div>

                      <div className="container relative z-10 mx-auto max-w-[1280px] px-4 md:px-6">
                        {}
                        <div className="relative z-20 mb-4 w-full text-left xl:hidden">
                          <div className="bg-primary/10 text-primary mb-4 inline-flex items-center justify-center rounded-full px-5 py-2.5 text-[0.92rem] font-bold sm:text-[1rem]">
                            Free Workshop
                          </div>
                          <h2 className="text-foreground m-0 font-serif text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">
                            Join Our Free Workshops
                          </h2>
                        </div>

                        <div className="grid grid-cols-1 items-center gap-6 sm:gap-10 lg:gap-16 xl:grid-cols-[1.02fr_1fr]">
                          {}
                          <div className="relative order-1 mt-2 w-full xl:mt-0">
                            <div className="relative mx-auto min-h-[260px] w-full max-w-[560px] sm:min-h-[320px] md:min-h-[470px]">
                              {}
                              <div className="bg-muted absolute left-1/2 top-1/2 h-[255px] w-[290px] -translate-x-1/2 -translate-y-1/2 animate-[float_5s_ease-in-out_infinite] rounded-[47%_53%_49%_51%/52%_45%_55%_48%] sm:h-[390px] sm:w-[455px]"></div>

                              <div className="border-primary/20 absolute left-[54%] top-[49%] h-[260px] w-[300px] -translate-x-1/2 -translate-y-1/2 -rotate-12 rounded-[47%_53%_49%_51%/52%_45%_55%_48%] border-2 sm:h-[395px] sm:w-[465px]"></div>

                              <div className="absolute left-4 top-14 h-14 w-14 bg-[radial-gradient(theme(colors.primary/0.4)_1.6px,transparent_1.6px)] bg-[size:11px_11px] opacity-80 sm:left-[82px] sm:top-[96px] sm:h-[82px] sm:w-[82px] sm:bg-[size:14px_14px]"></div>

                              {}
                              <div className="bg-background border-primary absolute right-4 top-0 z-30 rotate-6 animate-[badgeFloat_4s_ease-in-out_infinite] rounded-xl border-[3px] px-4 py-2 shadow-lg sm:right-20 sm:top-2 sm:px-5 sm:py-3">
                                <span className="bg-primary/80 absolute -top-3 left-4 h-[3px] w-5 rounded-full"></span>
                                <span className="bg-primary/80 absolute -top-2 left-12 h-[3px] w-3 rounded-full"></span>
                                <span className="text-primary block text-[0.9rem] font-extrabold uppercase tracking-wider sm:text-[1.15rem]">
                                  Live Class
                                </span>
                              </div>

                              {}
                              <div className="absolute left-1/2 top-1/2 z-20 w-[245px] -translate-x-1/2 -translate-y-1/2 sm:w-[420px]">
                                <img
                                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80"
                                  alt="Students watching workshop"
                                  className="block w-full animate-[imageFloat_5s_ease-in-out_infinite] rounded-[34%_34%_32%_32%/26%_26%_22%_22%] object-cover shadow-2xl"
                                />

                                {}
                                <button
                                  className="bg-background absolute left-1/2 top-[52%] z-30 flex h-[72px] w-[72px] -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border-none text-red-500 shadow-xl transition-transform duration-300 hover:scale-110 hover:shadow-2xl sm:h-[94px] sm:w-[94px]"
                                  onClick={() => setShowVideo(true)}
                                  aria-label="Play workshop video"
                                >
                                  <Play className="ml-1.5 h-8 w-8 fill-current sm:h-10 sm:w-10" />
                                </button>
                              </div>
                            </div>
                          </div>

                          {}
                          <div className="order-2 mx-auto w-full max-w-[900px] text-left xl:mx-0">
                            {}
                            <div className="hidden xl:block">
                              <div className="bg-primary/10 text-primary mb-6 inline-flex items-center justify-center rounded-full px-5 py-2.5 text-[1rem] font-bold">
                                Free Workshop
                              </div>
                              <h2 className="text-foreground m-0 mb-6 font-serif text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">
                                Join Our Free Workshops
                              </h2>
                            </div>

                            <p className="text-muted-foreground m-0 mx-auto mb-8 max-w-full text-base leading-relaxed sm:text-lg xl:mx-0 xl:max-w-[700px]">
                              Edhen an unknown printer took a galley of type and scrambled it
                              to make a type specimen bookas survived not only five centuries.
                              Edhen an unknown printer took a galley of type and scrambled.
                            </p>

                            <div className="mb-8 grid grid-cols-1 gap-6 text-left sm:grid-cols-2 sm:gap-8">
                              {}
                              <div className="flex items-start gap-4">
                                <div className="from-primary flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-r to-emerald-500 text-xl text-white shadow-lg sm:h-16 sm:w-16 sm:rounded-2xl sm:text-2xl">
                                  <Users_2 className="h-6 w-6 sm:h-7 sm:w-7" />
                                </div>
                                <div>
                                  <h4 className="text-foreground m-0 mb-0 text-[1.1rem] font-bold leading-[1.35] sm:text-[1.35rem]">
                                    Smooth Virtual Live Classes
                                  </h4>
                                  <p className="text-muted-foreground m-0 -mt-0.5 text-[0.95rem] leading-[1.65] sm:mt-0 sm:text-[1.05rem]">
                                    Edhen an unknown printer Rtook galley of type scrambled.
                                  </p>
                                </div>
                              </div>

                              {}
                              <div className="flex items-start gap-4">
                                <div className="from-primary flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-r to-emerald-500 text-xl text-white shadow-lg sm:h-16 sm:w-16 sm:rounded-2xl sm:text-2xl">
                                  <GraduationCap_2 className="h-6 w-6 sm:h-7 sm:w-7" />
                                </div>
                                <div>
                                  <h4 className="text-foreground m-0 mb-0 text-[1.1rem] font-bold leading-[1.35] sm:text-[1.35rem]">
                                    99% Graduation Complete
                                  </h4>
                                  <p className="text-muted-foreground m-0 -mt-0.5 text-[0.95rem] leading-[1.65] sm:mt-0 sm:text-[1.05rem]">
                                    Edhen an unknown printer Rtook galley of type scrambled.
                                  </p>
                                </div>
                              </div>
                            </div>

                            <button className="from-primary hover:from-primary/90 text-primary-foreground group relative mt-2 flex h-12 w-full items-center justify-center rounded-md border-0 bg-gradient-to-r to-emerald-500 px-12 text-[15px] font-medium shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:to-emerald-500/90 hover:shadow-[0_8px_20px_rgba(16,185,129,0.3)] sm:inline-flex sm:h-12 sm:w-auto sm:px-14 lg:h-[50px] lg:px-16 lg:text-[17px]">
                              <span>Quick Join Now</span>
                              <span className="bg-background text-primary group-hover:bg-foreground group-hover:text-background absolute right-1.5 flex h-9 w-9 shrink-0 items-center justify-center rounded shadow-sm transition-colors duration-300 sm:right-2 sm:h-8 sm:w-8 lg:right-2 lg:h-9 lg:w-9">
                                <ArrowRight_2 className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 lg:h-[18px] lg:w-[18px]" />
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </section>

                    {}
                    {showVideo && (
                      <div
                        className="bg-background/80 fixed inset-0 z-[999] flex items-center justify-center p-4 backdrop-blur-sm"
                        onClick={() => setShowVideo(false)}
                      >
                        <div
                          className="animate-in zoom-in-95 relative w-full max-w-[900px] scale-100 overflow-hidden rounded-2xl bg-black shadow-2xl duration-200"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            className="absolute right-2 top-2 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-none bg-white/10 text-2xl text-white transition-colors hover:bg-white/20 sm:right-4 sm:top-4"
                            onClick={() => setShowVideo(false)}
                          >
                            &times;
                          </button>

                          <div className="relative w-full pt-[56.25%]">
                            <iframe
                              src="https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=1"
                              title="Workshop Video"
                              allow="autoplay; encrypted-media"
                              allowFullScreen
                              className="absolute inset-0 h-full w-full border-0"
                            ></iframe>
                          </div>
                        </div>
                      </div>
                    )}

                    {}
                    <style
                      dangerouslySetInnerHTML={{
                        __html: `
        @keyframes float {
          0%, 100% { transform: translate(-50%, -50%) translateY(0); }
          50% { transform: translate(-50%, -50%) translateY(-10px); }
        }
        @keyframes imageFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes badgeFloat {
          0%, 100% { transform: rotate(6deg) translateY(0); }
          50% { transform: rotate(6deg) translateY(-7px); }
        }
      `,
                      }}
                    />
                  </>
      <>
                    <section className="bg-background relative overflow-hidden py-8 sm:py-12 md:py-16">
                      <div className="container mx-auto max-w-[1320px] px-4 md:px-6">
                        <div className="grid grid-cols-1 items-center gap-8 sm:gap-12 lg:gap-[70px] xl:grid-cols-[1fr_1.03fr]">
                          {}
                          <div className="order-1 mx-auto w-full max-w-full text-left xl:mx-0 xl:max-w-[620px]">
                            <div className="relative mb-4 inline-flex items-center justify-start">
                              <span className="text-primary relative z-10 text-[0.96rem] font-bold tracking-[0.02em]">
                                Why Choose Us
                              </span>
                              {}
                              <span className="absolute left-full top-1/2 ml-3 hidden h-[4px] w-[72px] -translate-y-1/2 rounded-full bg-yellow-400 xl:block"></span>
                            </div>

                            <h2 className="text-foreground m-0 mb-4 font-serif text-3xl font-bold leading-tight tracking-tight sm:mb-7 sm:text-4xl md:text-5xl">
                              Why Students Choose Us for Their Future
                            </h2>

                            <p className="text-muted-foreground m-0 mx-auto mb-6 max-w-full text-base leading-relaxed sm:mb-[34px] sm:text-lg xl:mx-0 xl:max-w-[610px]">
                              Edhen an unknown printer took a galley of type and scrambled it
                              to make a type specimen bookas survived not only five centuries.
                              but workplace better right now. Seventy percent of workers think
                              that.
                            </p>

                            <div className="mx-auto mb-6 flex max-w-full flex-col gap-1 text-left sm:mb-[38px] sm:gap-1.5 xl:mx-0 xl:max-w-fit">
                              {points.map((item, index) => (
                                <div
                                  className="flex items-start gap-2.5 sm:items-center sm:gap-3"
                                  key={index}
                                >
                                  <span className="text-primary mt-0.5 inline-flex shrink-0 items-center justify-center text-[1.2rem] sm:mt-0 sm:text-[1.4rem]">
                                    <CheckCircle2 className="fill-primary/20 text-primary h-5 w-5 sm:h-6 sm:w-6" />
                                  </span>
                                  <span className="text-foreground text-[1rem] font-semibold leading-[1.5] sm:text-[1.13rem]">
                                    {item}
                                  </span>
                                </div>
                              ))}
                            </div>

                            {}
                            <button className="from-primary hover:from-primary/90 text-primary-foreground group relative mt-2 flex h-12 w-full items-center justify-center rounded-md border-0 bg-gradient-to-r to-emerald-500 px-12 text-[15px] font-medium shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:to-emerald-500/90 hover:shadow-[0_8px_20px_rgba(16,185,129,0.3)] sm:inline-flex sm:h-12 sm:w-auto sm:px-14 lg:h-[50px] lg:px-16 lg:text-[17px]">
                              <span>More about us</span>
                              <span className="bg-background text-primary group-hover:bg-foreground group-hover:text-background absolute right-1.5 flex h-9 w-9 shrink-0 items-center justify-center rounded shadow-sm transition-colors duration-300 sm:right-2 sm:h-8 sm:w-8 lg:right-2 lg:h-9 lg:w-9">
                                <ArrowRight_2 className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 lg:h-[18px] lg:w-[18px]" />
                              </span>
                            </button>
                          </div>

                          {}
                          <div className="min-h-auto relative order-2 mx-auto mt-4 w-full max-w-[760px] xl:mx-0 xl:mt-0 xl:min-h-[640px] xl:max-w-none">
                            {}
                            <div className="bg-primary absolute -top-5 right-2 z-0 h-[88px] w-[88px] animate-[floatShape_5s_ease-in-out_infinite] rounded-2xl sm:-top-5 sm:right-2 sm:h-[110px] sm:w-[110px] sm:rounded-3xl xl:right-[110px] xl:top-0 xl:h-[170px] xl:w-[170px]"></div>

                            <div className="absolute -left-2 top-[180px] z-0 h-[88px] w-[88px] animate-[floatShape_5s_ease-in-out_infinite_0.6s] rounded-2xl bg-yellow-400 sm:-left-2 sm:top-[180px] sm:h-[110px] sm:w-[110px] sm:rounded-3xl xl:left-[20px] xl:top-[220px] xl:h-[160px] xl:w-[165px]"></div>

                            {}
                            <div className="relative grid h-auto w-full grid-cols-1 gap-5 xl:block xl:h-[640px]">
                              {}
                              <div className="bg-background relative z-10 h-[210px] w-full overflow-hidden rounded-2xl shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl sm:h-[240px] xl:absolute xl:left-[60px] xl:top-0 xl:h-[262px] xl:w-[300px] xl:rounded-3xl xl:shadow-[0_24px_40px_rgba(23,35,84,0.1)]">
                                <img
                                  src="https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=900&q=80"
                                  alt="Teacher helping students"
                                  className="block h-full w-full object-cover"
                                />
                              </div>

                              {}
                              <div className="bg-background relative z-10 h-[210px] w-full overflow-hidden rounded-2xl shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl sm:h-[240px] xl:absolute xl:right-[25px] xl:top-[168px] xl:h-[368px] xl:w-[325px] xl:rounded-3xl xl:shadow-[0_24px_40px_rgba(23,35,84,0.1)]">
                                <img
                                  src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=900&q=80"
                                  alt="Teacher speaking online"
                                  className="block h-full w-full object-cover"
                                />
                              </div>

                              {}
                              <div className="bg-background relative z-10 h-[210px] w-full overflow-hidden rounded-2xl shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl sm:h-[240px] xl:absolute xl:bottom-0 xl:left-[60px] xl:h-[302px] xl:w-[300px] xl:rounded-3xl xl:shadow-[0_24px_40px_rgba(23,35,84,0.1)]">
                                <img
                                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80"
                                  alt="Students learning together"
                                  className="block h-full w-full object-cover"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>

                    {}
                    <style
                      dangerouslySetInnerHTML={{
                        __html: `
        @keyframes floatShape {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `,
                      }}
                    />
                  </>
      <section className="bg-background relative overflow-hidden py-8 sm:py-12 md:py-16">
                    <div className="container mx-auto mb-6 max-w-[1320px] px-4 text-center sm:mb-8 md:px-6">
                      <div className="relative mb-4 inline-flex items-center justify-center">
                        <span className="text-primary relative z-10 text-[0.96rem] font-bold tracking-[0.02em]">
                          Our Partners
                        </span>
                      </div>
                      <h2 className="text-foreground m-0 font-serif text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">
                        Trusted by Industry Leaders
                      </h2>
                    </div>

                    <div className="relative">
                      <div className="relative z-10 flex flex-col gap-4 py-4 sm:gap-6">
                        {}
                        <div className="group flex overflow-hidden">
                          <div className="animate-marquee flex w-max shrink-0 py-2">
                            {}
                            <div className="flex shrink-0 items-center gap-4 px-2 sm:gap-6 sm:px-3">
                              {[...row1, ...row1, ...row1].map((partner, i) => (
                                <PartnerCard key={i} partner={partner} />
                              ))}
                            </div>
                            {}
                            <div
                              className="flex shrink-0 items-center gap-4 px-2 sm:gap-6 sm:px-3"
                              aria-hidden="true"
                            >
                              {[...row1, ...row1, ...row1].map((partner, i) => (
                                <PartnerCard key={i} partner={partner} />
                              ))}
                            </div>
                          </div>
                        </div>

                        {}
                        <div className="group flex overflow-hidden">
                          <div
                            className="animate-marquee flex w-max shrink-0 py-2"
                            style={{ animationDirection: "reverse" }}
                          >
                            {}
                            <div className="flex shrink-0 items-center gap-4 px-2 sm:gap-6 sm:px-3">
                              {[...row2, ...row2, ...row2].map((partner, i) => (
                                <PartnerCard key={i} partner={partner} />
                              ))}
                            </div>
                            {}
                            <div
                              className="flex shrink-0 items-center gap-4 px-2 sm:gap-6 sm:px-3"
                              aria-hidden="true"
                            >
                              {[...row2, ...row2, ...row2].map((partner, i) => (
                                <PartnerCard key={i} partner={partner} />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {}
                      <div className="bg-linear-to-r from-background pointer-events-none absolute inset-y-0 left-0 z-20 w-[15%] to-transparent lg:w-[25%]" />
                      <div className="bg-linear-to-l from-background pointer-events-none absolute inset-y-0 right-0 z-20 w-[15%] to-transparent lg:w-[25%]" />
                    </div>
                  </section>
      <section className="bg-background relative overflow-hidden py-8 sm:py-12 md:py-16">
                    <div className="container mx-auto max-w-[1320px] px-4 md:px-6">
                      {}
                      <div className="mb-10 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end">
                        <div className="max-w-2xl">
                          <div className="relative mb-4 inline-flex items-center justify-start">
                            <span className="text-primary relative z-10 text-[0.96rem] font-bold uppercase tracking-[0.02em]">
                              Our Moments
                            </span>
                            <span className="absolute left-full top-1/2 ml-3 hidden h-[4px] w-[72px] -translate-y-1/2 rounded-full bg-yellow-400 sm:block"></span>
                          </div>
                          <h2 className="text-foreground m-0 font-serif text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">
                            Our Gallery
                          </h2>
                        </div>
                        <p className="text-muted-foreground m-0 max-w-md text-base leading-relaxed sm:text-lg">
                          A glimpse into the vibrant campus life, dedicated study sessions,
                          and memorable events that shape our students&apos; journey.
                        </p>
                      </div>

                      {}
                      <div className="grid auto-rows-[160px] grid-cols-2 gap-3 sm:gap-6 md:auto-rows-[280px] md:grid-cols-4">
                        {galleryItems.map((item) => (
                          <GalleryCard key={item.id} item={item} />
                        ))}
                      </div>
                    </div>
                  </section>
    </div>
  );
}
