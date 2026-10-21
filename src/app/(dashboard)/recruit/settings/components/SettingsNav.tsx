"use client";

import React from "react";
import {
  User,
  Lock,
  Bell,
  FileText,
  Sliders,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/x/a85a9c0c";

export type SettingsTabId =
  | "security"
  | "overview"
  | "notifications"
  | "privacy"
  | "preferences";

export interface SettingsTabItem {
  id: SettingsTabId;
  label: string;
  shortLabel: string;
  description: string;
  icon: React.ElementType;
  badge?: string;
}

export const SETTINGS_TABS: SettingsTabItem[] = [
  {
    id: "security",
    label: "Security & Password",
    shortLabel: "Security",
    description: "Manage password, active sessions & credentials",
    icon: Lock,
  },
  {
    id: "overview",
    label: "Account Overview",
    shortLabel: "Overview",
    description: "Candidate ID, basic info & profile status",
    icon: User,
  },
  {
    id: "notifications",
    label: "Notification Settings",
    shortLabel: "Notifications",
    description: "Job alerts, emails & SMS notifications",
    icon: Bell,
  },
  {
    id: "privacy",
    label: "Privacy & Data",
    shortLabel: "Privacy & Data",
    description: "Download application form & visibility controls",
    icon: FileText,
    badge: "PDF",
  },
  {
    id: "preferences",
    label: "Display & Preferences",
    shortLabel: "Preferences",
    description: "Theme mode & portal customizations",
    icon: Sliders,
  },
];

interface SettingsNavProps {
  activeTab: SettingsTabId;
  onSelectTab: (tabId: SettingsTabId) => void;
  className?: string;
}

export function SettingsNav({
  activeTab,
  onSelectTab,
  className,
}: SettingsNavProps) {
  return (
    <>
      {/* Mobile Horizontal Pill Scroll */}
      <div className={cn("block lg:hidden w-full overflow-hidden", className)}>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none snap-x touch-pan-x">
          {SETTINGS_TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onSelectTab(tab.id)}
                className={cn(
                  "flex shrink-0 items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-medium transition-all snap-start",
                  isActive
                    ? "bg-emerald-700 text-white shadow-sm font-semibold"
                    : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className={cn("size-3.5 shrink-0", isActive ? "text-white" : "text-muted-foreground")} />
                <span>{tab.shortLabel}</span>
                {tab.badge && (
                  <span
                    className={cn(
                      "rounded-full px-1.5 py-0.2 text-[10px] font-semibold",
                      isActive
                        ? "bg-emerald-800 text-white"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Desktop Vertical Navigation Rail */}
      <nav
        aria-label="Settings sections"
        className={cn(
          "hidden lg:flex flex-col gap-1.5 bg-card border border-border/80 rounded-2xl p-2.5 shadow-xs",
          className
        )}
      >
        <div className="px-3 pt-2 pb-1.5">
          <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            Settings Menu
          </p>
        </div>

        {SETTINGS_TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onSelectTab(tab.id)}
              className={cn(
                "group relative flex w-full items-start gap-3 rounded-xl p-3 text-left transition-all duration-150",
                isActive
                  ? "bg-emerald-50/90 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-100 shadow-xs border border-emerald-200/80 dark:border-emerald-800/50"
                  : "hover:bg-muted/60 text-foreground"
              )}
            >
              <div
                className={cn(
                  "mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg transition-colors",
                  isActive
                    ? "bg-emerald-600 text-white"
                    : "bg-muted text-muted-foreground group-hover:bg-muted/80 group-hover:text-foreground"
                )}
              >
                <Icon className="size-4" />
              </div>

              <div className="flex-1 min-w-0 pr-1">
                <div className="flex items-center gap-1.5">
                  <span className={cn("text-xs font-semibold truncate", isActive ? "text-emerald-900 dark:text-emerald-200" : "text-foreground")}>
                    {tab.label}
                  </span>
                  {tab.badge && (
                    <span className="rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300 px-1.5 py-0.2 text-[9px] font-bold">
                      {tab.badge}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-muted-foreground line-clamp-1 mt-0.5">
                  {tab.description}
                </p>
              </div>

              <ChevronRight
                className={cn(
                  "size-4 shrink-0 self-center transition-transform",
                  isActive
                    ? "text-emerald-600 dark:text-emerald-400 translate-x-0.5"
                    : "text-muted-foreground/40 group-hover:text-muted-foreground group-hover:translate-x-0.5"
                )}
              />
            </button>
          );
        })}

        <div className="mt-3 border-t border-border/60 pt-3 px-3 pb-1">
          <div className="flex items-center gap-2 text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">
            <ShieldCheck className="size-3.5" />
            <span>Encrypted & Verified</span>
          </div>
          <p className="text-[10px] text-muted-foreground mt-0.5">
            Recruitment Portal Security v2.4
          </p>
        </div>
      </nav>
    </>
  );
}
