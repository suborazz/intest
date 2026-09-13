"use client";

import { ChevronDown, Download, Home, LucideIcon, Menu, Activity, ArrowRight, ArrowUpRight, Briefcase, Building, ExternalLink, Globe, GraduationCap, Image as ImageIcon, Landmark, Laptop, LogIn, LucideIcon as LucideIcon_2, Mail, MapPin, Newspaper, Phone, Presentation, ShieldCheck, Sparkles, Target, Users, Video } from "lucide-react";
import Link from "next/link";
import Link_2 from "next/link";
import * as React from "react";
import { forwardRef, useEffect, useState } from "react";
import { clsx, ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Dialog as SheetPrimitive } from "radix-ui";
import * as z_2 from "zod";
import { format } from "date-fns";
import { ChevronDownIcon, XIcon } from "lucide-react";
import { cva, VariantProps } from "class-variance-authority";
import { NavigationMenu as NavigationMenuPrimitive, Slot } from "radix-ui";
import { z } from "zod";
import { motion } from "framer-motion";
import { clsx as clsx_2 } from "clsx";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx_2(inputs));
}

function NavigationMenuViewport({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Viewport>) {
  return (
    <div
      className={cn(
        "absolute left-0 top-full isolate z-50 flex justify-center",
      )}
    >
      <NavigationMenuPrimitive.Viewport
        data-slot="navigation-menu-viewport"
        className={cn(
          "origin-top-center h-(--radix-navigation-menu-viewport-height) bg-popover text-popover-foreground ring-foreground/10 md:w-(--radix-navigation-menu-viewport-width) data-open:animate-in data-open:zoom-in-90 data-closed:animate-out data-closed:zoom-out-90 relative mt-1.5 w-full overflow-hidden rounded-xl shadow-md ring-1 duration-100",
          className,
        )}
        {...props}
      />
    </div>
  );
}

function NavigationMenu({
  className,
  children,
  viewport = false,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Root> & {
  viewport?: boolean;
}) {
  return (
    <NavigationMenuPrimitive.Root
      data-slot="navigation-menu"
      data-viewport={viewport}
      className={cn(
        "group/navigation-menu relative flex max-w-max flex-1 items-center justify-center",
        className,
      )}
      {...props}
    >
      {children}
      {viewport && <NavigationMenuViewport />}
    </NavigationMenuPrimitive.Root>
  );
}

function NavigationMenuContent({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Content>) {
  return (
    <NavigationMenuPrimitive.Content
      data-slot="navigation-menu-content"
      className={cn(
        "absolute top-full left-0 mt-2 z-50 rounded-2xl bg-white shadow-2xl border border-gray-100/90 duration-200 animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
        className,
      )}
      {...props}
    />
  );
}

function NavigationMenuItem({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Item>) {
  return (
    <NavigationMenuPrimitive.Item
      data-slot="navigation-menu-item"
      className={cn("relative", className)}
      {...props}
    />
  );
}

function NavigationMenuLink({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Link>) {
  return (
    <NavigationMenuPrimitive.Link
      data-slot="navigation-menu-link"
      className={cn(
        "hover:bg-muted focus:bg-muted focus-visible:ring-ring/30 in-data-[slot=navigation-menu-content]:rounded-md data-[active=true]:bg-muted/50 data-[active=true]:hover:bg-muted data-[active=true]:focus:bg-muted flex items-center gap-1.5 rounded-lg p-2 text-xs/relaxed outline-none transition-all focus-visible:outline-1 focus-visible:ring-2 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  );
}

function NavigationMenuList({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.List>) {
  return (
    <NavigationMenuPrimitive.List
      data-slot="navigation-menu-list"
      className={cn(
        "group flex flex-1 list-none items-center justify-center gap-0",
        className,
      )}
      {...props}
    />
  );
}

const navigationMenuTriggerStyle = cva(
  "group/navigation-menu-trigger inline-flex h-9 w-max items-center justify-center rounded-lg px-2.5 py-1.5 text-xs/relaxed font-medium transition-all outline-none hover:bg-muted focus:bg-muted focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-popup-open:bg-muted/50 data-popup-open:hover:bg-muted data-open:bg-muted/50 data-open:hover:bg-muted data-open:focus:bg-muted",
);

function NavigationMenuTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Trigger>) {
  return (
    <NavigationMenuPrimitive.Trigger
      data-slot="navigation-menu-trigger"
      className={cn(navigationMenuTriggerStyle(), "group", className)}
      {...props}
    >
      {children}{" "}
      <ChevronDownIcon
        className="group-data-popup-open/navigation-menu-trigger:rotate-180 group-data-open/navigation-menu-trigger:rotate-180 relative top-px ml-1 size-3 transition duration-300"
        aria-hidden="true"
      />
    </NavigationMenuPrimitive.Trigger>
  );
}

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

function SheetPortal({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Portal>) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />;
}

function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
  return (
    <SheetPrimitive.Overlay
      data-slot="sheet-overlay"
      className={cn(
        "supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0 fixed inset-0 z-50 bg-black/80 duration-100",
        className,
      )}
      {...props}
    />
  );
}

function SheetContent({
  className,
  children,
  side = "right",
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & {
  side?: "top" | "right" | "bottom" | "left";
  showCloseButton?: boolean;
}) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        data-slot="sheet-content"
        data-side={side}
        className={cn(
          "bg-popover text-popover-foreground data-open:animate-in data-open:fade-in-0 data-[side=bottom]:data-open:slide-in-from-bottom-10 data-[side=left]:data-open:slide-in-from-left-10 data-[side=right]:data-open:slide-in-from-right-10 data-[side=top]:data-open:slide-in-from-top-10 data-closed:animate-out data-closed:fade-out-0 data-[side=bottom]:data-closed:slide-out-to-bottom-10 data-[side=left]:data-closed:slide-out-to-left-10 data-[side=right]:data-closed:slide-out-to-right-10 data-[side=top]:data-closed:slide-out-to-top-10 fixed z-50 flex flex-col bg-clip-padding text-xs/relaxed shadow-lg transition duration-200 ease-in-out data-[side=bottom]:inset-x-0 data-[side=left]:inset-y-0 data-[side=right]:inset-y-0 data-[side=top]:inset-x-0 data-[side=bottom]:bottom-0 data-[side=left]:left-0 data-[side=right]:right-0 data-[side=top]:top-0 data-[side=bottom]:h-auto data-[side=left]:h-full data-[side=right]:h-full data-[side=top]:h-auto data-[side=left]:w-3/4 data-[side=right]:w-3/4 data-[side=bottom]:border-t data-[side=left]:border-r data-[side=right]:border-l data-[side=top]:border-b data-[side=left]:sm:max-w-sm data-[side=right]:sm:max-w-sm",
          className,
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <SheetPrimitive.Close data-slot="sheet-close" asChild>
            <Button
              variant="ghost"
              className="absolute right-4 top-4"
              size="icon-sm"
            >
              <XIcon />
              <span className="sr-only">Close</span>
            </Button>
          </SheetPrimitive.Close>
        )}
      </SheetPrimitive.Content>
    </SheetPortal>
  );
}

function SheetDescription({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Description>) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn("text-muted-foreground text-xs/relaxed", className)}
      {...props}
    />
  );
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn("flex flex-col gap-1.5 p-6", className)}
      {...props}
    />
  );
}

function SheetTitle({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn(
        "font-heading text-foreground text-sm font-medium",
        className,
      )}
      {...props}
    />
  );
}
interface NavSubItem {
  title: string;
  href: string;
  description?: string;
  icon?: LucideIcon_2;
}

interface NavItem {
  title: string;
  href?: string;
  isSubmenu?: boolean;
  submenuItems?: NavSubItem[];
  submenuFeatured?: {
    title: string;
    description: string;
    href: string;
    image: string;
  };
}

const navData: NavItem[] = [
  { title: "Home", href: "/" },
  {
    title: "About Us",
    isSubmenu: true,
    submenuFeatured: {
      title: "About Us",
      description:
        "Learn more about our history, mission, and the dedicated team driving our vision forward.",
      href: "/about",
      image:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
    },
    submenuItems: [
      {
        title: "Organization History",
        href: "/about/organization-history",
        description: "Discover the roots and milestones of our journey.",
        icon: Landmark,
      },
      {
        title: "Vision & Mission",
        href: "/about/vision-mission",
        description: "Learn about our goals and the future we aim to build.",
        icon: Target,
      },
      {
        title: "Team Members",
        href: "/about/team-members",
        description: "Meet the dedicated professionals driving our success.",
        icon: Users,
      },
      {
        title: "What is Internship",
        href: "/about/internship",
        description:
          "Understand the structure and benefits of our internships.",
        icon: Briefcase,
      },
    ],
  },
  {
    title: "Internships",
    isSubmenu: true,
    submenuFeatured: {
      title: "Internship Programs",
      description:
        "Accelerate your career with our exclusive virtual and on-campus internship opportunities.",
      href: "/internship",
      image:
        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=600&auto=format&fit=crop",
    },
    submenuItems: [
      {
        title: "All Internships",
        href: "/internship",
        description: "Browse all available domain internships.",
        icon: Briefcase,
      },
      {
        title: "Running Internships",
        href: "/internship/running-internship",
        description: "Explore our ongoing internship programs.",
        icon: Activity,
      },
      {
        title: "On Campus Internships",
        href: "/internship/on-campus",
        description: "Join our on-campus internship opportunities.",
        icon: MapPin,
      },
      {
        title: "Virtual Internships",
        href: "/internship/virtual-internship",
        description:
          "Participate in remote and virtual internships from anywhere.",
        icon: Laptop,
      },
      {
        title: "Immersion Programs",
        href: "/immersion",
        description:
          "Intensive experiential industrial training & learning cohorts.",
        icon: Sparkles,
      },
    ],
  },
  {
    title: "For Students",
    isSubmenu: true,
    submenuItems: [
      {
        title: "Student Registration",
        href: "/student/registration",
        description: "Register to explore and apply for verified internships.",
        icon: GraduationCap,
      },
      {
        title: "Student Login",
        href: "/login",
        description: "Login to your student portal and view applications.",
        icon: Users,
      },
    ],
  },
  {
    title: "For Instructors",
    isSubmenu: true,
    submenuItems: [
      {
        title: "Instructor Registration",
        href: "/instructor/registration",
        description: "Join our esteemed mentor network and train youth.",
        icon: Presentation,
      },
      {
        title: "Instructor Login",
        href: "/login",
        description: "Access instructor workspace and student cohorts.",
        icon: Users,
      },
    ],
  },
  {
    title: "Our Partners",
    isSubmenu: true,
    submenuItems: [
      {
        title: "Educational Institutes",
        href: "/partners/educational-institutes",
        description: "Collaborate with universities & colleges for internship integration.",
        icon: Building,
      },
      {
        title: "Job Placement",
        href: "/partners/job-placement",
        description: "Connect with hiring partners and industry recruiters.",
        icon: Briefcase,
      },
      {
        title: "Training & Support",
        href: "/partners/training-support",
        description: "Skill development and corporate technical training support.",
        icon: Presentation,
      },
    ],
  },
  {
    title: "Resources",
    isSubmenu: true,
    submenuItems: [
      {
        title: "Media Room",
        href: "/media",
        description: "Press releases, photos, videos and newspaper clips.",
        icon: ImageIcon,
      },
      {
        title: "Notice Board",
        href: "/notice",
        description: "Official notifications, announcements and circulars.",
        icon: Newspaper,
      },
      {
        title: "Success Stories",
        href: "/success-story",
        description: "Inspiring alumni journeys and placement achievements.",
        icon: Target,
      },
      {
        title: "FAQs",
        href: "/faqs",
        description: "Frequently asked questions and policy guidelines.",
        icon: Activity,
      },
      {
        title: "Donate",
        href: "/donate",
        description: "Support our non-profit educational mission.",
        icon: Globe,
      },
      {
        title: "Contact Us",
        href: "/contact",
        description: "Get in touch with our admissions & support team.",
        icon: Mail,
      },
    ],
  },
];

interface ListItemProps extends React.ComponentPropsWithoutRef<"a"> {
  title: string;
  icon?: LucideIcon;
}

function Sheet({ ...props }: React.ComponentProps<typeof SheetPrimitive.Root>) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />;
}

function SheetTrigger({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Trigger>) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

function VisitorCounter() {
  const [visitorCount, setVisitorCount] = useState<number>(14820);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);

    async function syncVisitorCount() {
      try {
        const hasVisited = sessionStorage.getItem("i3_visited_session_db");
        // If first visit in this session, increment (+1) in DB, else just fetch current count
        const method = hasVisited ? "GET" : "POST";
        const res = await fetch("/api/v1/visitors", {
          method,
          cache: "no-store",
        });

        if (res.ok) {
          const data = await res.json();
          if (data && typeof data.count === "number") {
            setVisitorCount(data.count);
            localStorage.setItem("i3_last_known_visitors", data.count.toString());
            if (!hasVisited) {
              sessionStorage.setItem("i3_visited_session_db", "true");
            }
            return;
          }
        }
      } catch (err) {
        console.error("Visitor counter sync error:", err);
      }

      // Safe local fallback if network/db is briefly unreachable
      try {
        const cached = localStorage.getItem("i3_last_known_visitors");
        if (cached) {
          const val = parseInt(cached, 10);
          if (!isNaN(val) && val >= 14820) {
            setVisitorCount(val);
          }
        }
      } catch {}
    }

    syncVisitorCount();
  }, []);

  return (
    <div
      title="Live Global Visitor Count (Database Synced)"
      className="inline-flex items-center justify-center rounded-lg bg-[#FF451A] px-3 py-1.5 shadow-md shadow-orange-950/30 transition-all hover:brightness-110 hover:scale-[1.02] select-none shrink-0"
    >
      <span className="text-[12.5px] sm:text-[13px] font-black tracking-wide text-white leading-none drop-shadow-xs">
        Visitors: {mounted ? visitorCount.toLocaleString("en-IN") : "14,820"}
      </span>
    </div>
  );
}

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
  }

  const ListItem = React.forwardRef<
    React.ElementRef<typeof Link>,
    ListItemProps & { href?: string }
  >(({ className, title, children, icon: Icon, href = "#", ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <Link
            ref={ref}
            href={href}
            className={cn(
              "hover:bg-emerald-50/80 hover:text-[#0A5C36] focus:bg-emerald-50/80 focus:text-[#0A5C36] group flex select-none items-start gap-2.5 rounded-xl p-2.5 leading-none no-underline outline-none transition-all",
              className,
            )}
            {...props}
          >
            {Icon && (
              <div className="bg-emerald-50/90 group-hover:bg-[#0A5C36] group-hover:text-white flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[#0A5C36] transition-colors mt-0.5">
                <Icon className="h-4 w-4 transition-transform group-hover:scale-105" />
              </div>
            )}
            <div className="flex flex-col gap-0.5">
              <div className="text-slate-900 group-hover:text-[#0A5C36] text-xs font-bold leading-tight transition-colors">
                {title}
              </div>
              {children && (
                <p className="text-slate-500 line-clamp-2 text-[11px] leading-snug font-normal">
                  {children}
                </p>
              )}
            </div>
          </Link>
        </NavigationMenuLink>
      </li>
    );
  });
  ListItem.displayName = "ListItem";
  const [open, setOpen] = React.useState(false);
  const [expandedMenu, setExpandedMenu] = React.useState<string | null>(null);
  const pathname = usePathname();
  const handleLinkClick = () => setOpen(false);

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-[#063B27] text-white text-[11px] sm:text-xs py-2 px-4 sm:px-6 lg:px-8 border-b border-emerald-950/40">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4">
          <div className="flex items-center gap-2 sm:gap-4 text-emerald-100 font-medium overflow-x-auto text-[11px] sm:text-xs no-scrollbar">
            <a href="mailto:i3.office2025@gmail.com" className="flex items-center gap-1.5 hover:text-white transition shrink-0">
              <Mail className="size-3.5 text-emerald-400 shrink-0" />
              <span>i3.office2025@gmail.com</span>
            </a>
            <span className="text-emerald-700 hidden sm:inline">|</span>
            <a href="tel:+919472351693" className="hidden sm:flex items-center gap-1.5 hover:text-white transition shrink-0">
              <Phone className="size-3.5 text-emerald-400 shrink-0" />
              <span>+91 9472351693</span>
            </a>
            <span className="text-emerald-700 hidden lg:inline">|</span>
            <span className="hidden lg:inline text-emerald-200 truncate">
              Empowering Youth Through Internship &amp; Skill Development
            </span>
          </div>
          <a
            href="https://www.dpkavishek.in/hrc-office.php"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-emerald-300 hover:text-white font-semibold text-[11px] sm:text-xs shrink-0 transition-colors group/trust"
          >
            <ShieldCheck className="size-3.5 text-emerald-400 group-hover/trust:scale-110 transition-transform" />
            <span className="underline-offset-2 group-hover/trust:underline">A Unit of DPKHRC TRUST</span>
          </a>
        </div>
      </div>

      {/* Main Navigation Header */}
      <header className="bg-white/95 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] transition-all duration-300">
        <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-3 sm:px-6 lg:px-8 gap-2 sm:gap-4">
          {/* Logo */}
          <div className="flex shrink-0 items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="International Institute of Internship Logo"
                width={420}
                height={105}
                className="h-12 sm:h-14 md:h-16 w-auto max-w-[280px] sm:max-w-[360px] md:max-w-[440px] object-contain object-left transition-all"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden xl:flex items-center justify-center flex-1 max-w-fit px-2">
            <NavigationMenu className="relative z-[100]">
              <NavigationMenuList className="gap-0.5 2xl:gap-1 flex-nowrap">
                {navData.map((item) => {
                  const isActive = pathname === item.href;
                  if (item.isSubmenu && item.submenuItems) {
                    const isSubActive = item.submenuItems.some(sub => pathname === sub.href);
                    return (
                      <NavigationMenuItem key={item.title} value={item.title} className="shrink-0">
                        <NavigationMenuTrigger className={cn(
                          "bg-transparent px-2 2xl:px-2.5 py-1.5 text-[12.5px] 2xl:text-[13px] font-semibold text-slate-700 hover:text-[#0A5C36] hover:bg-emerald-50/60 focus:bg-emerald-50/60 focus:text-[#0A5C36] transition-colors rounded-lg whitespace-nowrap",
                          isSubActive && "text-[#0A5C36] font-bold"
                        )}>
                          {item.title}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent className={cn(item.title === "Resources" && "right-0 left-auto")}>
                          <ul
                            className={cn(
                              "grid gap-2 p-3 bg-white rounded-xl shadow-xl border border-gray-100",
                              item.submenuFeatured
                                ? "md:w-[520px] lg:w-[580px] lg:grid-cols-[.8fr_1fr]"
                                : "flex w-[270px] flex-col",
                            )}
                          >
                            {item.submenuFeatured && (
                              <li className="group relative row-span-4 overflow-hidden rounded-lg">
                                <NavigationMenuLink asChild>
                                  <a
                                    className="relative z-10 flex h-full w-full select-none flex-col items-center justify-center p-5 text-center no-underline outline-none transition-all focus:shadow-md"
                                    href={item.submenuFeatured.href}
                                  >
                                    <div className="bg-muted absolute inset-0 z-[-1]">
                                      <img
                                        src={item.submenuFeatured.image}
                                        alt={item.submenuFeatured.title}
                                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                      />
                                      <div className="absolute inset-0 bg-emerald-950/70 transition-colors group-hover:bg-emerald-950/60" />
                                    </div>

                                    <div className="mb-2 text-xl font-bold text-white">
                                      {item.submenuFeatured.title}
                                    </div>
                                    <p className="max-w-[200px] text-xs leading-relaxed text-emerald-100">
                                      {item.submenuFeatured.description}
                                    </p>
                                  </a>
                                </NavigationMenuLink>
                              </li>
                            )}

                            {item.submenuItems.map((subItem) => (
                              <ListItem
                                key={subItem.title}
                                href={subItem.href}
                                title={subItem.title}
                                icon={subItem.icon}
                              >
                                {subItem.description}
                              </ListItem>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    );
                  }

                  return (
                    <NavigationMenuItem key={item.title} value={item.title} className="shrink-0">
                      <NavigationMenuLink asChild>
                        <Link
                          href={item.href!}
                          className={cn(
                            "px-2 2xl:px-2.5 py-1.5 text-[12.5px] 2xl:text-[13px] font-semibold text-slate-700 hover:text-[#0A5C36] hover:bg-emerald-50/60 transition-colors rounded-lg whitespace-nowrap inline-block",
                            isActive && "text-[#0A5C36] font-bold relative after:absolute after:bottom-[-2px] after:left-2 after:right-2 after:h-[2px] after:bg-[#0A5C36] after:rounded-full",
                          )}
                        >
                          {item.title}
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  );
                })}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right Action Buttons */}
          <div className="hidden xl:flex items-center gap-2 shrink-0">
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 shadow-2xs transition-all hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300 whitespace-nowrap"
            >
              <Users className="size-3.5 text-slate-500" />
              <span>Login</span>
            </Link>
            <Link
              href="/sign-up"
              className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#0A5C36] px-3.5 py-2 text-xs font-bold text-white shadow-2xs transition-all hover:bg-[#074026] hover:shadow-md hover:-translate-y-0.5 whitespace-nowrap"
            >
              <GraduationCap className="size-3.5 text-white" />
              <span>Register</span>
            </Link>
          </div>

          {/* Mobile / Tablet Drawer Trigger */}
          <div className="flex items-center gap-2 xl:hidden">
            <Link
              href="/login"
              className="hidden sm:inline-flex items-center justify-center rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50"
            >
              Login
            </Link>
            <Link
              href="/sign-up"
              className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#0A5C36] px-3.5 py-2 text-xs font-bold text-white hover:bg-[#074026] shadow-xs"
            >
              <GraduationCap className="size-3.5" />
              <span>Register</span>
            </Link>
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-700 hover:text-[#0A5C36] hover:bg-emerald-50 shrink-0 rounded-lg"
                >
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="bg-white flex w-[85vw] flex-col border-l-0 p-0 shadow-2xl sm:w-[380px]"
              >
                <SheetHeader className="border-gray-100 bg-white flex shrink-0 flex-row items-center justify-between border-b px-5 py-3 text-left">
                  <SheetTitle className="m-0 flex items-center">
                    <Image
                      src="/logo.png"
                      alt="Logo"
                      width={280}
                      height={70}
                      className="h-11 sm:h-12 w-auto max-w-[270px] object-contain object-left"
                    />
                  </SheetTitle>
                  <SheetDescription className="sr-only">
                    Navigation menu for mobile devices
                  </SheetDescription>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto px-4 py-2">
                  <div className="mt-1 flex flex-col space-y-1">
                    {navData.map((item) => {
                      if (item.isSubmenu && item.submenuItems) {
                        const isSubmenuActive = item.submenuItems.some(
                          (subItem) => pathname === subItem.href,
                        );
                        const isExpanded =
                          expandedMenu === item.title || isSubmenuActive;

                        return (
                          <div key={item.title} className="flex flex-col">
                            <button
                              onClick={() =>
                                setExpandedMenu(isExpanded ? null : item.title)
                              }
                              className={cn(
                                "group flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm font-semibold outline-none transition-all",
                                isSubmenuActive ? "bg-emerald-50 text-[#0A5C36]" : "text-gray-700 hover:bg-emerald-50/50 hover:text-[#0A5C36]"
                              )}
                            >
                              {item.title}
                              <ChevronDown
                                className={cn(
                                  "h-4 w-4 transition-transform duration-200 text-gray-400",
                                  isExpanded && "rotate-180 text-[#0A5C36]"
                                )}
                              />
                            </button>

                            {isExpanded && (
                              <div className="ml-3 my-1 flex flex-col space-y-1 border-l-2 border-emerald-100 pl-3">
                                {item.submenuItems.map((subItem) => (
                                  <Link
                                    key={subItem.title}
                                    href={subItem.href}
                                    onClick={handleLinkClick}
                                    className={cn(
                                      "rounded-md px-2 py-1.5 text-xs font-medium transition-colors",
                                      pathname === subItem.href
                                        ? "text-[#0A5C36] font-bold bg-emerald-50"
                                        : "text-gray-600 hover:text-[#0A5C36] hover:bg-gray-50"
                                    )}
                                  >
                                    {subItem.title}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      }

                      return (
                        <Link
                          key={item.title}
                          href={item.href!}
                          onClick={handleLinkClick}
                          className={cn(
                            "rounded-lg px-3 py-2 text-sm font-semibold transition-colors",
                            pathname === item.href
                              ? "bg-emerald-50 text-[#0A5C36] font-bold"
                              : "text-gray-700 hover:bg-emerald-50/50 hover:text-[#0A5C36]"
                          )}
                        >
                          {item.title}
                        </Link>
                      );
                    })}
                  </div>
                </div>

                <div className="border-gray-100 bg-gray-50/70 mt-auto shrink-0 border-t p-4 flex flex-col gap-2.5">
                  <Button
                    asChild
                    className="w-full bg-[#0A5C36] hover:bg-[#074026] text-white text-xs sm:text-sm font-bold shadow-xs flex items-center justify-center gap-2 py-2.5 rounded-xl transition-all"
                  >
                    <Link href="/student/registration" onClick={handleLinkClick}>
                      <GraduationCap className="size-4" />
                      <span>Student Registration</span>
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-emerald-600/30 bg-emerald-50/60 hover:bg-emerald-100/70 text-[#0A5C36] text-xs sm:text-sm font-bold flex items-center justify-center gap-2 py-2.5 rounded-xl transition-all shadow-2xs"
                  >
                    <Link href="/instructor/registration" onClick={handleLinkClick}>
                      <Presentation className="size-4 text-[#0A5C36]" />
                      <span>Instructor Registration</span>
                    </Link>
                  </Button>
                  <Button
                    asChild
                    className="w-full bg-[#063A1E] hover:bg-[#04261A] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 py-2.5 rounded-xl shadow-xs transition-all"
                  >
                    <Link href="/login" onClick={handleLinkClick}>
                      <LogIn className="size-4" />
                      <span>Login</span>
                    </Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      <main className="flex flex-1 flex-col">{children}</main>
      <footer className="to-primary relative w-full overflow-hidden rounded-t-[30px] bg-gradient-to-br from-emerald-950 via-emerald-900 to-[#04261a] pb-6 pt-12 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] lg:rounded-t-[50px]">
        {/* Ambient background glow & grid */}
        <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(theme(colors.white/0.05)_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="pointer-events-none absolute -right-20 -top-20 z-0 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />

        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
          {/* Desktop & Tablet 5-Column Grid (hidden on mobile) */}
          <div className="relative z-10 hidden sm:grid sm:grid-cols-2 lg:grid-cols-12 lg:gap-6 xl:gap-8 border-b border-white/10 pb-10">
            {/* Col 1: Brand & Powered by DPKHRC Trust (lg:col-span-4) */}
            <div className="flex flex-col sm:col-span-2 lg:col-span-4">
              <div className="mb-5">
                <Link href="/" className="inline-flex items-center justify-center rounded-[16px] border border-white/20 bg-white px-3 py-1.5 shadow-lg">
                  <img
                    src="/logo.png"
                    alt="International Institute of Internship Logo"
                    className="h-[48px] w-auto object-contain sm:h-[56px]"
                  />
                </Link>
              </div>
              <p className="m-0 max-w-sm text-[13px] leading-[1.6] text-emerald-100/90">
                Empowering youth across India and globally with 300+ UGC-aligned internship programs, 600+ skill enhancement training modules, and 100+ immersion learning cohorts.
              </p>

              <div className="mt-6 border-t border-white/10 pt-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-yellow-400">
                  Powered by
                </span>
                <h5 className="m-0 mt-0.5 text-[14px] font-bold text-white">
                  <a
                    href="https://www.dpkavishek.in/hrc-office.php"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-yellow-300 underline underline-offset-2 transition-colors inline-flex items-center gap-1"
                  >
                    <span>DPKHRC Trust</span>
                    <ShieldCheck className="size-3.5 text-emerald-400" />
                  </a>
                </h5>
                <p className="m-0 mt-1 text-[12px] leading-snug text-emerald-100/80">
                  An ISO 21001:2018 Certified Research Institution
                </p>
                <ul className="m-0 mt-2 list-none space-y-1 p-0 text-[11px] leading-relaxed text-emerald-100/70">
                  <li>• Registered Under Indian Trust Act, 1882, Govt. of India</li>
                  <li>• Registered Under Niti Aayog, Govt. of India</li>
                  <li>• 12A &amp; 80G Certified, Ministry of Finance, Govt. of India</li>
                </ul>
              </div>
            </div>

            {/* Col 2: About i3 (lg:col-span-2) */}
            <div className="flex flex-col lg:col-span-2">
              <h3 className="m-0 mb-4 text-[16px] font-bold leading-snug text-white">
                About i3
              </h3>
              <ul className="m-0 flex list-none flex-col gap-2.5 p-0 text-xs sm:text-[13px]">
                {[
                  { label: "Organization History", href: "/about/organization-history" },
                  { label: "Vision & Mission", href: "/about/vision-mission" },
                  { label: "Team Members", href: "/about/team-members" },
                  { label: "Immersion Programs", href: "/immersion" },
                  { label: "What is Internship", href: "/about/internship" },
                  { label: "Media Room", href: "/media" },
                  { label: "Notice Board", href: "/notice" },
                ].map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-emerald-100/85 transition-colors hover:text-yellow-400 font-medium"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Internships (lg:col-span-2) */}
            <div className="flex flex-col lg:col-span-2">
              <h3 className="m-0 mb-4 text-[16px] font-bold leading-snug text-white">
                Internships
              </h3>
              <ul className="m-0 flex list-none flex-col gap-2.5 p-0 text-xs sm:text-[13px]">
                {[
                  { label: "All Internships", href: "/internship" },
                  { label: "Running Internships", href: "/internship/running-internship" },
                  { label: "On-Campus Programs", href: "/internship/on-campus" },
                  { label: "Virtual Internships", href: "/internship/virtual-internship" },
                  { label: "Student Registration", href: "/student/registration" },
                  { label: "Instructor Registration", href: "/instructor/registration" },
                  { label: "Student Login", href: "/login" },
                ].map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-emerald-100/85 transition-colors hover:text-yellow-400 font-medium"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4: Our Other Services (lg:col-span-2) */}
            <div className="flex flex-col lg:col-span-2">
              <h3 className="m-0 mb-4 text-[16px] font-bold leading-snug text-white">
                Our Other Services
              </h3>
              <ul className="m-0 flex list-none flex-col gap-2.5 p-0 text-xs sm:text-[13px]">
                <li>
                  <a
                    href="https://dpkavishek.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-100/85 transition-colors hover:text-yellow-400 font-medium inline-flex items-center gap-1 group"
                  >
                    <span>DPK Humanity Research Centre</span>
                    <ArrowUpRight className="size-3 text-emerald-400 group-hover:text-yellow-400 transition-colors" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://dbmsonline.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-100/85 transition-colors hover:text-yellow-400 font-medium inline-flex items-center gap-1 group"
                  >
                    <span>DBMS Online™</span>
                    <ArrowUpRight className="size-3 text-emerald-400 group-hover:text-yellow-400 transition-colors" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://ouruniverse.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-100/85 transition-colors hover:text-yellow-400 font-medium inline-flex items-center gap-1 group"
                  >
                    <span>Unique Records of Universe™</span>
                    <ArrowUpRight className="size-3 text-emerald-400 group-hover:text-yellow-400 transition-colors" />
                  </a>
                </li>
                <li>
                  <Link
                    href="/partners/educational-institutes"
                    className="text-emerald-100/85 transition-colors hover:text-yellow-400 font-medium"
                  >
                    Educational Institutes
                  </Link>
                </li>
                <li>
                  <Link
                    href="/partners/job-placement"
                    className="text-emerald-100/85 transition-colors hover:text-yellow-400 font-medium"
                  >
                    Job Placement
                  </Link>
                </li>
                <li>
                  <Link
                    href="/success-story"
                    className="text-emerald-100/85 transition-colors hover:text-yellow-400 font-medium"
                  >
                    Success Stories
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faqs"
                    className="text-emerald-100/85 transition-colors hover:text-yellow-400 font-medium"
                  >
                    FAQs
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 5: Get In Touch (lg:col-span-2) */}
            <div className="flex flex-col sm:col-span-2 lg:col-span-2">
              <div className="mb-3.5 flex items-center">
                <VisitorCounter />
              </div>
              <h3 className="m-0 mb-4 text-[16px] font-bold leading-snug text-white">
                Get In Touch
              </h3>

              <div className="flex flex-col gap-2.5 text-xs text-emerald-100/90">
                <div className="flex items-start gap-2.5">
                  <MapPin className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="leading-snug">BCC Greens, Deva Road, Lucknow, UP</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <MapPin className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="leading-snug">Thekma, Azamgarh, UP, India</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <MapPin className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="leading-snug">Jaihind Tendua, Aurangabad, Bihar</span>
                </div>
                <div className="flex items-center gap-2.5 pt-1">
                  <Mail className="h-4 w-4 text-emerald-400 shrink-0" />
                  <a
                    href="mailto:i3.office2025@gmail.com"
                    className="hover:text-yellow-300 transition-colors truncate font-medium"
                  >
                    i3.office2025@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="h-4 w-4 text-emerald-400 shrink-0" />
                  <a
                    href="tel:+919472351693"
                    className="hover:text-yellow-300 transition-colors font-medium"
                  >
                    +91 9472351693
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Accordion & Compact Footer (< sm screens only) */}
          <div className="sm:hidden flex flex-col pb-6">
            {/* Mobile Brand & Trust */}
            <div className="flex flex-col items-start pb-4 border-b border-white/10">
              <Link href="/" className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white px-2.5 py-1 shadow-md mb-3">
                <img
                  src="/logo.png"
                  alt="International Institute of Internship Logo"
                  className="h-10 w-auto object-contain"
                />
              </Link>
              <p className="m-0 text-xs leading-relaxed text-emerald-100/90 font-medium">
                Empowering youth with 300+ UGC-aligned internships, 600+ skills, and 100+ immersion programs.
              </p>
              <div className="mt-3 flex items-center gap-2 text-[11px] text-emerald-200">
                <span className="font-bold text-yellow-400">Powered by</span>
                <a
                  href="https://www.dpkavishek.in/hrc-office.php"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline font-bold text-white inline-flex items-center gap-1"
                >
                  DPKHRC Trust <ShieldCheck className="size-3 text-emerald-400" />
                </a>
              </div>
            </div>

            {/* Mobile Accordions */}
            <div className="flex flex-col divide-y divide-white/10 border-b border-white/10 my-2">
              {/* Accordion Item: About i3 */}
              <details className="group py-2.5 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between text-xs font-bold text-white group-hover:text-yellow-300 transition-colors select-none">
                  <span>About i3</span>
                  <ChevronDown className="h-4 w-4 text-emerald-300 transition-transform duration-200 group-open:rotate-180 group-open:text-yellow-400" />
                </summary>
                <ul className="mt-2.5 mb-1 flex flex-col gap-2 pl-1 text-[11.5px]">
                  {[
                    { label: "Organization History", href: "/about/organization-history" },
                    { label: "Vision & Mission", href: "/about/vision-mission" },
                    { label: "Team Members", href: "/about/team-members" },
                    { label: "Immersion Programs", href: "/immersion" },
                    { label: "What is Internship", href: "/about/internship" },
                    { label: "Media Room", href: "/media" },
                    { label: "Notice Board", href: "/notice" },
                  ].map((item) => (
                    <li key={item.label}>
                      <Link href={item.href} className="text-emerald-100/80 hover:text-yellow-300 py-0.5 block">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>

              {/* Accordion Item: Internships */}
              <details className="group py-2.5 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between text-xs font-bold text-white group-hover:text-yellow-300 transition-colors select-none">
                  <span>Internships</span>
                  <ChevronDown className="h-4 w-4 text-emerald-300 transition-transform duration-200 group-open:rotate-180 group-open:text-yellow-400" />
                </summary>
                <ul className="mt-2.5 mb-1 flex flex-col gap-2 pl-1 text-[11.5px]">
                  {[
                    { label: "All Internships", href: "/internship" },
                    { label: "Running Internships", href: "/internship/running-internship" },
                    { label: "On-Campus Programs", href: "/internship/on-campus" },
                    { label: "Virtual Internships", href: "/internship/virtual-internship" },
                    { label: "Student Registration", href: "/student/registration" },
                    { label: "Instructor Registration", href: "/instructor/registration" },
                    { label: "Student Login", href: "/login" },
                  ].map((item) => (
                    <li key={item.label}>
                      <Link href={item.href} className="text-emerald-100/80 hover:text-yellow-300 py-0.5 block">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>

              {/* Accordion Item: Our Other Services */}
              <details className="group py-2.5 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between text-xs font-bold text-white group-hover:text-yellow-300 transition-colors select-none">
                  <span>Our Other Services</span>
                  <ChevronDown className="h-4 w-4 text-emerald-300 transition-transform duration-200 group-open:rotate-180 group-open:text-yellow-400" />
                </summary>
                <ul className="mt-2.5 mb-1 flex flex-col gap-2 pl-1 text-[11.5px]">
                  <li>
                    <a
                      href="https://dpkavishek.in/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-100/80 hover:text-yellow-300 py-0.5 inline-flex items-center gap-1"
                    >
                      <span>DPK Humanity Research Centre</span>
                      <ArrowUpRight className="size-3 text-emerald-400" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://dbmsonline.in/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-100/80 hover:text-yellow-300 py-0.5 inline-flex items-center gap-1"
                    >
                      <span>DBMS Online™</span>
                      <ArrowUpRight className="size-3 text-emerald-400" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://ouruniverse.in/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-100/80 hover:text-yellow-300 py-0.5 inline-flex items-center gap-1"
                    >
                      <span>Unique Records of Universe™</span>
                      <ArrowUpRight className="size-3 text-emerald-400" />
                    </a>
                  </li>
                  {[
                    { label: "Educational Institutes", href: "/partners/educational-institutes" },
                    { label: "Job Placement", href: "/partners/job-placement" },
                    { label: "Success Stories", href: "/success-story" },
                    { label: "FAQs", href: "/faqs" },
                  ].map((item) => (
                    <li key={item.label}>
                      <Link href={item.href} className="text-emerald-100/80 hover:text-yellow-300 py-0.5 block">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>
            </div>

            {/* Mobile Contact & Visitor Counter */}
            <div className="pt-3 flex flex-col gap-2.5 text-xs text-emerald-100/90">
              <div className="flex items-center justify-between gap-3">
                <VisitorCounter />
                <a
                  href="tel:+919472351693"
                  className="inline-flex items-center gap-1.5 text-[11px] font-bold text-white bg-white/10 px-2.5 py-1.5 rounded-lg border border-white/15"
                >
                  <Phone className="size-3 text-emerald-400" />
                  <span>+91 9472351693</span>
                </a>
              </div>
              <div className="flex items-center gap-2 text-[11.5px] pt-1">
                <Mail className="size-3.5 text-emerald-400 shrink-0" />
                <a href="mailto:i3.office2025@gmail.com" className="hover:text-yellow-300 truncate">
                  i3.office2025@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Legal Policies & Copyright */}
          <div className="flex flex-col items-center justify-between gap-4 pt-4 text-center md:flex-row md:text-left text-xs text-emerald-200/80">
            <p className="m-0 font-medium">
              © {new Date().getFullYear()} International Institute of Internship™ (i3). All Rights Reserved.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
              <Link
                href="/privacy-policy"
                className="transition-colors hover:text-yellow-400"
              >
                Privacy Policy
              </Link>
              <Link
                href="/internship-policy"
                className="transition-colors hover:text-yellow-400"
              >
                Internship Policy
              </Link>
              <Link
                href="/terms-and-condition"
                className="transition-colors hover:text-yellow-400"
              >
                Terms &amp; Conditions
              </Link>
              <Link
                href="/refund-policy"
                className="transition-colors hover:text-yellow-400"
              >
                Refund Policy
              </Link>
              <Link
                href="/other-policy"
                className="transition-colors hover:text-yellow-400"
              >
                Other Policies
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
