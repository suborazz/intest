"use client";

import React, { useState } from "react";
import { useTheme } from "next-themes";
import {
  Sun,
  Moon,
  Laptop,
  CheckCircle2,
  Sliders,
  Sparkles,
  Languages,
  Clock,
  Save,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/x/3458df31";
import { cn } from "@/x/a85a9c0c";

export function PreferencesTab() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [density, setDensity] = useState<"comfortable" | "compact">("comfortable");

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleDensityChange = (d: "comfortable" | "compact") => {
    setDensity(d);
    toast.success(`Display density updated to ${d}`);
  };

  const themeOptions = [
    {
      id: "light",
      label: "Light Mode",
      description: "Clean, high-contrast light interface",
      icon: Sun,
    },
    {
      id: "dark",
      label: "Dark Mode",
      description: "Sleek low-light theme with reduced glare",
      icon: Moon,
    },
    {
      id: "system",
      label: "System Default",
      description: "Automatically synchronizes with your device",
      icon: Laptop,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border/80 rounded-2xl p-5 sm:p-7 shadow-xs">
        <div className="flex items-start gap-4 border-b border-border/70 pb-5">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300">
            <Sliders className="size-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-foreground">
              Portal Appearance & Preferences
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
              Customize the visual aesthetic and localization settings of your candidate portal.
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-6">
          {/* Theme Mode Selector */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
              Theme Mode
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {themeOptions.map((opt) => {
                const Icon = opt.icon;
                const isSelected = mounted ? theme === opt.id : opt.id === "system";
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      setTheme(opt.id);
                      toast.success(`Switched to ${opt.label}`);
                    }}
                    className={cn(
                      "relative flex flex-col items-start rounded-xl border p-4 text-left transition-all",
                      isSelected
                        ? "border-emerald-600 bg-emerald-50/60 dark:bg-emerald-950/30 text-emerald-950 dark:text-emerald-100 ring-2 ring-emerald-500/30"
                        : "border-border/80 bg-muted/20 hover:bg-muted/40 text-foreground"
                    )}
                  >
                    <div className="flex w-full items-center justify-between">
                      <div
                        className={cn(
                          "flex size-9 items-center justify-center rounded-lg",
                          isSelected
                            ? "bg-emerald-600 text-white"
                            : "bg-muted text-muted-foreground"
                        )}
                      >
                        <Icon className="size-4" />
                      </div>
                      {isSelected && (
                        <CheckCircle2 className="size-4 text-emerald-600" />
                      )}
                    </div>
                    <p className="text-xs font-bold mt-3 text-foreground">
                      {opt.label}
                    </p>
                    <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-2">
                      {opt.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Density Preference */}
          <div className="pt-4 border-t border-border/60">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
              Layout Density
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleDensityChange("comfortable")}
                className={cn(
                  "flex items-center justify-between rounded-xl border p-3.5 text-left transition-all",
                  density === "comfortable"
                    ? "border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-950 dark:text-emerald-100"
                    : "border-border/80 bg-muted/20 hover:bg-muted/40 text-foreground"
                )}
              >
                <div>
                  <p className="text-xs font-bold text-foreground">
                    Comfortable (Default)
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    Spacious cards, relaxed padding, optimal for touch screens.
                  </p>
                </div>
                {density === "comfortable" && (
                  <CheckCircle2 className="size-4 text-emerald-600 shrink-0 ml-2" />
                )}
              </button>

              <button
                type="button"
                onClick={() => handleDensityChange("compact")}
                className={cn(
                  "flex items-center justify-between rounded-xl border p-3.5 text-left transition-all",
                  density === "compact"
                    ? "border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-950 dark:text-emerald-100"
                    : "border-border/80 bg-muted/20 hover:bg-muted/40 text-foreground"
                )}
              >
                <div>
                  <p className="text-xs font-bold text-foreground">
                    Compact View
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    Reduced margins and paddings, displaying maximum data on screen.
                  </p>
                </div>
                {density === "compact" && (
                  <CheckCircle2 className="size-4 text-emerald-600 shrink-0 ml-2" />
                )}
              </button>
            </div>
          </div>

          {/* Localization & Region Information */}
          <div className="pt-4 border-t border-border/60">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
              <Clock className="size-3.5 text-emerald-600" />
              Regional & Date Format
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-xl border border-border/60 bg-muted/10 p-4 text-xs">
              <div>
                <span className="font-semibold text-muted-foreground block text-[11px]">
                  Timezone Standard
                </span>
                <span className="font-bold text-foreground">
                  Indian Standard Time (IST, UTC+05:30)
                </span>
              </div>
              <div>
                <span className="font-semibold text-muted-foreground block text-[11px]">
                  Date Presentation
                </span>
                <span className="font-bold text-foreground">
                  DD/MM/YYYY (e.g. 16 Oct 2026)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
