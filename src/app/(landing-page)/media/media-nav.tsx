"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Camera, Newspaper, Video, Globe } from "lucide-react";

export function MediaNav() {
  const pathname = usePathname();

  const tabs = [
    {
      name: "Photo Gallery",
      href: "/media/photo",
      icon: Camera,
      count: "Gallery",
    },
    {
      name: "Newspaper Coverage",
      href: "/media/newspaper",
      icon: Newspaper,
      count: "Official",
    },
    {
      name: "Video Gallery",
      href: "/media/video",
      icon: Video,
      count: "Watch",
    },
    {
      name: "Online Media & Press",
      href: "/media/online",
      icon: Globe,
      count: "Digital",
    },
  ];

  return (
    <div className="mx-auto w-full max-w-[1300px] px-4 pt-6 pb-2">
      <nav className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none sm:justify-start">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href || (tab.href === "/media/photo" && pathname === "/media");
          const Icon = tab.icon;

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`group flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold transition-all duration-200 border ${
                isActive
                  ? "bg-[#0A5C36] text-white border-[#0A5C36] shadow-sm shadow-emerald-950/20"
                  : "bg-white text-slate-600 border-gray-200 hover:border-emerald-300 hover:text-[#0A5C36] hover:bg-emerald-50/50 shadow-2xs"
              }`}
            >
              <Icon className={`h-4 w-4 ${isActive ? "text-yellow-300" : "text-slate-400 group-hover:text-[#0A5C36]"}`} />
              <span>{tab.name}</span>
              <span
                className={`ml-1 rounded-full px-2 py-0.5 text-[10px] font-extrabold uppercase ${
                  isActive
                    ? "bg-white/20 text-white"
                    : "bg-slate-100 text-slate-500 group-hover:bg-emerald-100 group-hover:text-[#0A5C36]"
                }`}
              >
                {tab.count}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
