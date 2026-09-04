"use client";

import { ChevronDown, Home, LucideIcon, Menu, Activity, ArrowRight, Briefcase, Building, Globe, GraduationCap, Image as ImageIcon, Landmark, Laptop, LucideIcon as LucideIcon_2, Mail, MapPin, Newspaper, Phone, Presentation, Target, Users, Video } from "lucide-react";
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
  viewport = true,
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
        "group-data-[viewport=false]/navigation-menu:bg-popover group-data-[viewport=false]/navigation-menu:text-popover-foreground group-data-[viewport=false]/navigation-menu:ring-foreground/10 data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 data-[motion^=from-]:animate-in data-[motion^=from-]:fade-in data-[motion^=to-]:animate-out data-[motion^=to-]:fade-out **:data-[slot=navigation-menu-link]:focus:ring-0 **:data-[slot=navigation-menu-link]:focus:outline-none group-data-[viewport=false]/navigation-menu:data-open:animate-in group-data-[viewport=false]/navigation-menu:data-open:fade-in-0 group-data-[viewport=false]/navigation-menu:data-open:zoom-in-95 group-data-[viewport=false]/navigation-menu:data-closed:animate-out group-data-[viewport=false]/navigation-menu:data-closed:fade-out-0 group-data-[viewport=false]/navigation-menu:data-closed:zoom-out-95 left-0 top-0 w-full p-1.5 ease-[cubic-bezier(0.22,1,0.36,1)] group-data-[viewport=false]/navigation-menu:top-full group-data-[viewport=false]/navigation-menu:mt-1.5 group-data-[viewport=false]/navigation-menu:overflow-hidden group-data-[viewport=false]/navigation-menu:rounded-xl group-data-[viewport=false]/navigation-menu:shadow-md group-data-[viewport=false]/navigation-menu:ring-1 group-data-[viewport=false]/navigation-menu:duration-300 md:absolute md:w-auto",
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
          {
            title: "What is Immersion",
            href: "/about/immersion",
            description: "Explore our comprehensive immersion programs.",
            icon: Globe,
          },
        ],
      },
      { title: "Notice", href: "/notice" },
      {
        title: "Internship Program",
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
        ],
      },
      { title: "Immersion", href: "/immersion" },
      {
        title: "Our Partners",
        isSubmenu: true,
        submenuFeatured: {
          title: "Our Partners",
          description:
            "Collaborating with top educational institutes and industry leaders to provide the best opportunities.",
          href: "/partners",
          image:
            "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80",
        },
        submenuItems: [
          {
            title: "Educational Institutes",
            href: "/partners/educational-institutes",
            description: "Collaborating with top academic institutions.",
            icon: GraduationCap,
          },
          {
            title: "Job Placement Companies",
            href: "/partners/job-placement",
            description: "Connecting you with leading hiring partners.",
            icon: Building,
          },
          {
            title: "Training & Technical Support",
            href: "/partners/training-support",
            description: "Enhancing skills through expert technical support.",
            icon: Presentation,
          },
        ],
      },
      {
        title: "Media",
        isSubmenu: true,
        submenuFeatured: {
          title: "Media Room",
          description: "Explore our latest videos, photos, and media coverage.",
          href: "/media",
          image:
            "https://images.unsplash.com/photo-1492612235820-43dfb22144d7?auto=format&fit=crop&w=600&q=80",
        },
        submenuItems: [
          {
            title: "Video",
            href: "/media/video",
            description: "Watch highlights and educational video content.",
            icon: Video,
          },
          {
            title: "Photo",
            href: "/media/photo",
            description: "Browse through our vibrant campus and event galleries.",
            icon: ImageIcon,
          },
          {
            title: "Online Media",
            href: "/media/online",
            description: "Read our features across various online platforms.",
            icon: Globe,
          },
          {
            title: "News Paper",
            href: "/media/newspaper",
            description:
              "Stay updated with our latest press releases and articles.",
            icon: Newspaper,
          },
        ],
      },
      { title: "Success Story", href: "/success-story" },
      { title: "Recruitment", href: "/recruitment" },
      { title: "Contact Us", href: "/contact" },
      { title: "Donate", href: "/donate" },
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


export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    function cn(...inputs: ClassValue[]) {
      return twMerge(clsx(inputs));
    }

    const ListItem = React.forwardRef<React.ElementRef<"a">, ListItemProps>(
      ({ className, title, children, icon: Icon, ...props }, ref) => {
        return (
          <li>
            <NavigationMenuLink asChild>
              <a
                ref={ref}
                className={cn(
                  "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground group flex select-none items-center gap-4 rounded-md p-3 leading-none no-underline outline-none transition-colors",
                  className,
                )}
                {...props}
              >
                {Icon && (
                  <div className="bg-muted/50 group-hover:bg-primary/10 flex h-10 w-10 shrink-0 items-center justify-center rounded-md transition-colors">
                    <Icon className="text-primary h-5 w-5 transition-transform group-hover:scale-110" />
                  </div>
                )}
                <div className="flex flex-col gap-1">
                  <div
                    className={cn(
                      "text-foreground group-hover:text-primary text-sm leading-tight transition-colors",
                      children ? "font-bold" : "font-semibold",
                    )}
                  >
                    {title}
                  </div>
                  {children && (
                    <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                      {children}
                    </p>
                  )}
                </div>
              </a>
            </NavigationMenuLink>
          </li>
        );
      },
    );
    ListItem.displayName = "ListItem";
    const [open, setOpen] = React.useState(false);
    const [expandedMenu, setExpandedMenu] = React.useState<string | null>(null);
    const pathname = usePathname();
    const handleLinkClick = () => setOpen(false);
    const [isScrolled, setIsScrolled] = React.useState(false);
    React.useEffect(() => {
            const handleScroll = () => {
              setIsScrolled(window.scrollY > 20);
            };
            window.addEventListener("scroll", handleScroll);
            return () => window.removeEventListener("scroll", handleScroll);
          }, []);



      return (
    <>
      <div className="pointer-events-none sticky top-0 z-50 flex w-full justify-center">
                        <header
                          className={`bg-background pointer-events-auto relative transition-all duration-300 ease-in-out ${
                            isScrolled
                              ? "border-border mx-auto mt-2 w-[95%] max-w-[100%] rounded-full border py-0 shadow-lg md:w-fit xl:max-w-max"
                              : "mx-0 mt-0 w-full max-w-full rounded-none border-b-0 py-0 shadow-none"
                          }`}
                        >
                          <div
                            className={`mx-auto flex w-full items-center justify-between gap-1 transition-all duration-300 lg:gap-3 ${isScrolled ? "h-14 px-3 lg:px-5" : "h-16 max-w-screen-2xl px-4 md:px-8"}`}
                          >
                            <div className="z-10 flex shrink-0 items-center gap-2 md:gap-4">
                              <Link
                                href="/"
                                className="-ml-2 flex items-center space-x-2 lg:-ml-6"
                              >
                                <Image
                                  src="/logo.png"
                                  alt="Logo"
                                  width={280}
                                  height={100}
                                  className={`w-auto origin-left object-contain transition-all duration-300 ${isScrolled ? "h-9 scale-[1.25] md:h-[2.8rem]" : "h-12 scale-[1.4] md:h-[3.5rem]"}`}
                                />
                              </Link>
                            </div>

                            <div className="hidden flex-1 items-center justify-center lg:flex">
                              <NavigationMenu className="relative z-[100] pb-2">
                                                  <NavigationMenuList>
                                                    {navData.map((item) => {
                                                      if (item.isSubmenu && item.submenuItems) {
                                                        return (
                                                          <NavigationMenuItem key={item.title}>
                                                            <NavigationMenuTrigger className="hover:text-primary focus:text-primary bg-transparent px-1.5 text-[12px] lg:px-2 lg:text-[13.5px]">
                                                              {item.title}
                                                            </NavigationMenuTrigger>
                                                            <NavigationMenuContent>
                                                              <ul
                                                                className={cn(
                                                                  "grid gap-3 p-4",
                                                                  item.submenuFeatured
                                                                    ? "md:w-[500px] lg:w-[600px] lg:grid-cols-[.75fr_1fr]"
                                                                    : "flex w-[250px] flex-col",
                                                                )}
                                                              >
                                                                {item.submenuFeatured && (
                                                                  <li className="group relative row-span-3 overflow-hidden rounded-md">
                                                                    <NavigationMenuLink asChild>
                                                                      <a
                                                                        className="relative z-10 flex h-full w-full select-none flex-col items-center justify-center p-6 text-center no-underline outline-none transition-all focus:shadow-md"
                                                                        href={item.submenuFeatured.href}
                                                                      >
                                                                        {}
                                                                        <div className="bg-muted absolute inset-0 z-[-1]">
                                                                          <img
                                                                            src={item.submenuFeatured.image}
                                                                            alt={item.submenuFeatured.title}
                                                                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                                          />
                                                                          <div className="absolute inset-0 bg-black/60 transition-colors group-hover:bg-black/50" />
                                                                        </div>

                                                                        <div className="mb-3 text-2xl font-bold text-white">
                                                                          {item.submenuFeatured.title}
                                                                        </div>
                                                                        <p className="max-w-[220px] text-sm leading-relaxed text-white/90">
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
                                                        <NavigationMenuItem key={item.title}>
                                                          <NavigationMenuLink asChild>
                                                            <Link
                                                              href={item.href!}
                                                              className={cn(
                                                                navigationMenuTriggerStyle(),
                                                                "px-1.5 text-[12px] lg:px-2 lg:text-[13.5px]",
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

                            <div className="z-10 flex items-center gap-3">
                              <Button
                                asChild
                                className={`hidden rounded-full px-6 font-semibold shadow-md transition-transform hover:scale-105 active:scale-95 sm:inline-flex ${isScrolled ? "h-9" : "h-11"}`}
                              >
                                <Link href="/login">Login</Link>
                              </Button>
                              <div className="flex items-center lg:hidden">
                                <Sheet open={open} onOpenChange={setOpen}>
                                                      <SheetTrigger asChild>
                                                        <Button
                                                          variant="ghost"
                                                          size="icon"
                                                          className="text-primary hover:bg-primary/10 bg-primary/5 shrink-0 rounded-md"
                                                        >
                                                          <Menu className="h-6 w-6" />
                                                          <span className="sr-only">Toggle navigation menu</span>
                                                        </Button>
                                                      </SheetTrigger>
                                                      <SheetContent
                                                        side="right"
                                                        className="bg-background flex w-[85vw] flex-col border-l-0 p-0 shadow-2xl sm:w-[380px]"
                                                      >
                                                        <SheetHeader className="border-primary/10 bg-background flex shrink-0 flex-row items-center justify-between border-b px-5 py-2 text-left">
                                                          <SheetTitle className="m-0 flex items-center">
                                                            <Image
                                                              src="/logo.png"
                                                              alt="Logo"
                                                              width={280}
                                                              height={100}
                                                              className="h-14 w-auto origin-left scale-125 object-contain"
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
                                                                      className={`group flex w-full items-center justify-between rounded-lg px-4 py-2.5 text-left text-[15px] font-semibold outline-none transition-all ${isSubmenuActive ? "bg-primary/10 text-primary" : "text-foreground hover:bg-primary/5 hover:text-primary"}`}
                                                                    >
                                                                      {item.title}
                                                                      <div
                                                                        className={`flex h-6 w-6 items-center justify-center rounded-full transition-colors duration-300 ${isExpanded ? "bg-primary text-white" : "bg-primary/10 text-primary group-hover:bg-primary/20"}`}
                                                                      >
                                                                        <ChevronDown
                                                                          className={`h-3.5 w-3.5 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                                                                        />
                                                                      </div>
                                                                    </button>

                                                                    <div
                                                                      className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? "max-h-[500px] pb-2 pt-1 opacity-100" : "max-h-0 opacity-0"}`}
                                                                    >
                                                                      <div className="mt-1 flex flex-col space-y-1 px-2">
                                                                        {item.submenuItems.map((subItem) => {
                                                                          const isActive = pathname === subItem.href;
                                                                          return (
                                                                            <Link
                                                                              key={subItem.title}
                                                                              href={subItem.href}
                                                                              className={`group flex items-start gap-3 rounded-lg px-3 py-2 transition-all ${isActive ? "bg-primary/10" : "hover:bg-primary/5"}`}
                                                                              onClick={handleLinkClick}
                                                                            >
                                                                              {subItem.icon && (
                                                                                <div
                                                                                  className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md transition-all duration-300 ${isActive ? "bg-primary text-white" : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white"}`}
                                                                                >
                                                                                  <subItem.icon className="h-4 w-4 transition-colors" />
                                                                                </div>
                                                                              )}
                                                                              <div
                                                                                className={`flex flex-col justify-center ${!subItem.icon ? "py-1" : ""}`}
                                                                              >
                                                                                <span
                                                                                  className={`transition-colors ${isActive ? "text-primary" : "text-foreground group-hover:text-primary"} ${subItem.description ? "text-[13.5px] font-semibold" : "text-[14.5px] font-medium"}`}
                                                                                >
                                                                                  {subItem.title}
                                                                                </span>
                                                                                {subItem.description && (
                                                                                  <span className="text-muted-foreground mt-0.5 line-clamp-1 text-[11px]">
                                                                                    {subItem.description}
                                                                                  </span>
                                                                                )}
                                                                              </div>
                                                                            </Link>
                                                                          );
                                                                        })}
                                                                      </div>
                                                                    </div>
                                                                  </div>
                                                                );
                                                              }

                                                              const isActive = pathname === item.href;

                                                              return (
                                                                <Link
                                                                  key={item.title}
                                                                  href={item.href!}
                                                                  className={`flex items-center justify-between rounded-lg px-4 py-2.5 text-[15px] font-semibold outline-none transition-all ${isActive ? "bg-primary/10 text-primary" : "text-foreground hover:bg-primary/5 hover:text-primary"}`}
                                                                  onClick={handleLinkClick}
                                                                >
                                                                  {item.title}
                                                                </Link>
                                                              );
                                                            })}
                                                          </div>
                                                        </div>

                                                        <div className="border-primary/10 bg-background mt-auto shrink-0 border-t px-5 py-3">
                                                          <Button
                                                            asChild
                                                            className="bg-primary hover:bg-primary/90 text-primary-foreground h-11 w-full rounded-lg text-base font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
                                                          >
                                                            <Link href="/login" onClick={handleLinkClick}>
                                                              Login
                                                            </Link>
                                                          </Button>
                                                        </div>
                                                      </SheetContent>
                                                    </Sheet>
                              </div>
                            </div>
                          </div>
                        </header>
                      </div>
      <main className="flex flex-1 flex-col">{children}</main>
      <footer className="to-primary relative w-full overflow-hidden rounded-t-[30px] bg-gradient-to-br from-emerald-950 via-emerald-800 pb-6 pt-10 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] lg:rounded-t-[50px]">
                        {}
                        <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(theme(colors.white/0.05)_1px,transparent_1px)] [background-size:24px_24px]"></div>

                        <div className="relative z-10 mx-auto w-full max-w-[1380px] px-4 sm:px-6 lg:px-8">
                          {}
                          <div className="relative z-10 grid grid-cols-2 gap-8 border-b border-white/10 pb-8 lg:grid-cols-[1.4fr_0.9fr_1.3fr] lg:gap-8">
                            {}
                            <div className="col-span-2 flex flex-col lg:col-span-1">
                              <div className="mb-6">
                                <div className="inline-flex items-center justify-center rounded-[16px] border border-white/20 bg-white shadow-lg">
                                  <img
                                    src="/logo.png"
                                    alt="Company Logo"
                                    className="h-[45px] w-auto object-contain sm:h-[55px] lg:h-[65px]"
                                  />
                                </div>
                              </div>
                              <p className="m-0 max-w-sm text-[14px] leading-[1.6] text-[#edf7f1] opacity-90">
                                We empower learners worldwide with top-tier education, practical
                                skills, and interactive live classes to achieve your career goals.
                              </p>
                              <div className="mt-6 border-t border-white/10 pt-4">
                                <span className="text-[11px] font-bold uppercase tracking-wider text-yellow-400">
                                  Powered by
                                </span>
                                <h5 className="m-0 mt-0.5 text-[14px] font-bold text-[#f8fbf7]">
                                  DPKHRC Trust
                                </h5>
                                <p className="m-0 mt-1 text-[12px] leading-snug text-[#edf7f1] opacity-80">
                                  An ISO 21001:2018 Certified Research Institution
                                </p>
                                <ul className="m-0 mt-2 list-none space-y-1 p-0 text-[11px] leading-relaxed text-[#edf7f1] opacity-70">
                                  <li>
                                    • Registered Under Indian Trust Act, 1882, Government of India
                                  </li>
                                  <li>• Registered Under Niti Aayog, Government of India</li>
                                  <li>
                                    • Registered Under 12A & 80G Under Income Tax Department,
                                    Ministry of Finance, Government of India
                                  </li>
                                </ul>
                              </div>
                            </div>

                            {}
                            <div className="col-span-1 flex flex-col">
                              <h3 className="m-0 mb-4 text-[18px] font-bold leading-snug text-[#f8fbf7]">
                                Quick Links
                              </h3>
                              <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
                                {[
                                  { label: "Home", href: "#" },
                                  { label: "About", href: "#" },
                                  { label: "Gallery", href: "#" },
                                  { label: "Success Story", href: "#" },
                                  { label: "FAQs", href: "/faqs" },
                                ].map((item) => (
                                  <li key={item.label}>
                                    <a
                                      href={item.href}
                                      className="text-[14px] font-medium text-[#edf7f1] opacity-90 transition-colors hover:text-yellow-400 hover:opacity-100"
                                    >
                                      {item.label}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {}
                            <div className="col-span-2 flex flex-col lg:col-span-1">
                              <h3 className="m-0 mb-4 text-[18px] font-bold leading-snug text-[#f8fbf7]">
                                Get In Touch
                              </h3>

                              <div className="mb-6 mt-1 flex flex-col gap-4">
                                {[
                                  "BCC Greens, Deva Road, Lucknow, UP, India",
                                  "Thekma, Azamgarh, UP, India",
                                  "Jaihind Tendua, Aurangabad, Bihar",
                                ].map((address) => (
                                  <div key={address} className="flex items-center gap-3">
                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] border border-white/20 bg-white/10 shadow-sm backdrop-blur-md">
                                      <MapPin className="h-4 w-4 text-white" strokeWidth={2.5} />
                                    </div>
                                    <span className="text-[14px] font-medium leading-snug text-[#edf7f1] opacity-90">
                                      {address}
                                    </span>
                                  </div>
                                ))}
                                <div className="flex items-center gap-3">
                                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] border border-white/20 bg-white/10 shadow-sm backdrop-blur-md">
                                    <Mail className="h-4 w-4 text-white" strokeWidth={2.5} />
                                  </div>
                                  <a
                                    href="mailto:i3.office2025@gmail.com"
                                    className="text-[14px] font-medium text-[#edf7f1] opacity-90 transition-colors hover:text-emerald-300 hover:opacity-100"
                                  >
                                    i3.office2025@gmail.com
                                  </a>
                                </div>
                                <div className="flex items-center gap-3">
                                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] border border-white/20 bg-white/10 shadow-sm backdrop-blur-md">
                                    <Phone className="h-4 w-4 text-white" strokeWidth={2.5} />
                                  </div>
                                  <a
                                    href="tel:+919472351693"
                                    className="text-[14px] font-medium text-[#edf7f1] opacity-90 transition-colors hover:text-emerald-300 hover:opacity-100"
                                  >
                                    +91 9472351693
                                  </a>
                                </div>
                              </div>

                              {}
                              <h4 className="m-0 mb-3 text-[15px] font-bold text-[#f8fbf7]">
                                Sign Up for Updates
                              </h4>
                              <form className="flex w-full items-center gap-2 rounded-[16px] bg-[#e5ddd5] p-1.5 pl-3 transition-all focus-within:ring-4 focus-within:ring-emerald-500/30 md:rounded-[20px] md:p-2 md:pl-4">
                                <input
                                  type="email"
                                  placeholder="Your email here"
                                  required
                                  className="min-h-[36px] min-w-0 flex-1 border-none bg-transparent px-1 text-[13px] font-medium text-[#27352f] outline-none placeholder:text-[#27352f]/70 md:text-[14px]"
                                />
                                <button
                                  type="submit"
                                  className="from-primary hover:from-primary/90 text-primary-foreground group flex min-h-[36px] shrink-0 items-center justify-center gap-1.5 rounded-[12px] border-0 bg-gradient-to-r to-emerald-500 px-2 font-bold shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:to-emerald-500/90 hover:shadow-[0_8px_20px_rgba(16,185,129,0.3)] sm:gap-2 sm:px-2.5"
                                >
                                  <span className="whitespace-nowrap pl-1 text-[12px] sm:text-[13px]">
                                    Submit
                                  </span>
                                  <span className="bg-background text-primary group-hover:bg-foreground group-hover:text-background flex h-6 w-6 shrink-0 items-center justify-center rounded-[8px] shadow-sm transition-colors duration-300 sm:h-7 sm:w-7">
                                    <ArrowRight
                                      className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 sm:h-4 sm:w-4"
                                      strokeWidth={2.5}
                                    />
                                  </span>
                                </button>
                              </form>
                            </div>
                          </div>

                          {}
                          <div className="flex flex-col items-center justify-between gap-4 pt-5 text-center md:flex-row md:text-left">
                            <p className="m-0 text-[13px] font-medium text-[#edf7f1] opacity-80">
                              ©️2026 International Institute of Internship™️ All Rights Reserved.
                            </p>
                            <div className="flex items-center gap-6">
                              <Link_2
                                href="/privacy-policy"
                                className="text-[13px] font-medium text-[#edf7f1] opacity-80 transition-colors hover:text-yellow-400 hover:opacity-100"
                              >
                                Privacy Policy
                              </Link_2>
                              <Link_2
                                href="/internship-policy"
                                className="text-[13px] font-medium text-[#edf7f1] opacity-80 transition-colors hover:text-yellow-400 hover:opacity-100"
                              >
                                Internship Policy
                              </Link_2>
                              <Link_2
                                href="/terms-and-condition"
                                className="text-[13px] font-medium text-[#edf7f1] opacity-80 transition-colors hover:text-yellow-400 hover:opacity-100"
                              >
                                Terms & Conditions
                              </Link_2>
                              <Link_2
                                href="/refund-policy"
                                className="text-[13px] font-medium text-[#edf7f1] opacity-80 transition-colors hover:text-yellow-400 hover:opacity-100"
                              >
                                Refund Policy
                              </Link_2>
                              <Link_2
                                href="/other-policy"
                                className="text-[13px] font-medium text-[#edf7f1] opacity-80 transition-colors hover:text-yellow-400 hover:opacity-100"
                              >
                                Other Policies
                              </Link_2>
                            </div>
                          </div>
                        </div>
                      </footer>
    </>
  );
}
