"use client";

import React, { useState, useEffect } from "react";
import {
  Bell,
  Mail,
  Smartphone,
  CheckCircle2,
  Briefcase,
  Calendar,
  Volume2,
  ShieldCheck,
  Save,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/x/3458df31";
import { cn } from "@/x/a85a9c0c";

interface NotificationSettingItem {
  id: string;
  title: string;
  description: string;
  category: "application" | "jobs" | "channels";
  email: boolean;
  sms: boolean;
}

const DEFAULT_SETTINGS: NotificationSettingItem[] = [
  {
    id: "application_status",
    title: "Application Status Updates",
    description: "Receive instant notifications when your job application is reviewed, shortlisted, or decided.",
    category: "application",
    email: true,
    sms: true,
  },
  {
    id: "interview_schedule",
    title: "Interview & Assessment Invitations",
    description: "Crucial date & venue alerts for technical screenings and personal interviews.",
    category: "application",
    email: true,
    sms: true,
  },
  {
    id: "job_openings",
    title: "Matching Job Openings Alert",
    description: "Weekly digests and notifications whenever positions matching your category are published.",
    category: "jobs",
    email: true,
    sms: false,
  },
  {
    id: "institutional_notices",
    title: "Official Announcements & Notices",
    description: "Important circulars from the International Institute of Internship™ administration.",
    category: "jobs",
    email: true,
    sms: false,
  },
];

const STORAGE_KEY = "recruit_notification_preferences";

export function NotificationsTab() {
  const [settings, setSettings] = useState<NotificationSettingItem[]>(DEFAULT_SETTINGS);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          setSettings(JSON.parse(stored));
        }
      } catch (e) {
        console.error("Failed to parse stored notifications:", e);
      }
    }
  }, []);

  const toggleChannel = (id: string, channel: "email" | "sms") => {
    setSettings((prev) => {
      const next = prev.map((item) =>
        item.id === id ? { ...item, [channel]: !item[channel] } : item
      );
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      }
      return next;
    });
    setIsSaved(true);
    toast.success("Notification preferences updated");
  };

  const handleSaveAll = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    }
    toast.success("All communication preferences saved successfully!");
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border/80 rounded-2xl p-5 sm:p-7 shadow-xs">
        <div className="flex items-start gap-4 border-b border-border/70 pb-5">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300">
            <Bell className="size-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-foreground">
              Communication & Alert Preferences
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
              Customize how and when you receive recruitment updates, interview calls, and notifications.
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-6">
          {/* Section: Application Lifecycle Alerts */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
              <Calendar className="size-3.5 text-emerald-600" />
              Application & Interview Alerts
            </h3>
            <div className="space-y-3">
              {settings
                .filter((s) => s.category === "application")
                .map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-xl border border-border/60 bg-muted/20 p-4"
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-foreground">
                        {item.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {item.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                      {/* Email Toggle */}
                      <button
                        type="button"
                        onClick={() => toggleChannel(item.id, "email")}
                        className={cn(
                          "flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all",
                          item.email
                            ? "border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300"
                            : "border-border text-muted-foreground hover:bg-muted"
                        )}
                        aria-pressed={item.email}
                      >
                        <Mail className="size-3.5" />
                        <span>Email</span>
                        {item.email && <CheckCircle2 className="size-3 text-emerald-600" />}
                      </button>

                      {/* SMS Toggle */}
                      <button
                        type="button"
                        onClick={() => toggleChannel(item.id, "sms")}
                        className={cn(
                          "flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all",
                          item.sms
                            ? "border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300"
                            : "border-border text-muted-foreground hover:bg-muted"
                        )}
                        aria-pressed={item.sms}
                      >
                        <Smartphone className="size-3.5" />
                        <span>SMS</span>
                        {item.sms && <CheckCircle2 className="size-3 text-emerald-600" />}
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Section: Job Opportunities & Notices */}
          <div className="pt-2 border-t border-border/60">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
              <Briefcase className="size-3.5 text-emerald-600" />
              Job Market & Portal Bulletins
            </h3>
            <div className="space-y-3">
              {settings
                .filter((s) => s.category === "jobs")
                .map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-xl border border-border/60 bg-muted/20 p-4"
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-foreground">
                        {item.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {item.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                      <button
                        type="button"
                        onClick={() => toggleChannel(item.id, "email")}
                        className={cn(
                          "flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all",
                          item.email
                            ? "border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300"
                            : "border-border text-muted-foreground hover:bg-muted"
                        )}
                        aria-pressed={item.email}
                      >
                        <Mail className="size-3.5" />
                        <span>Email</span>
                        {item.email && <CheckCircle2 className="size-3 text-emerald-600" />}
                      </button>

                      <button
                        type="button"
                        onClick={() => toggleChannel(item.id, "sms")}
                        className={cn(
                          "flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all",
                          item.sms
                            ? "border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300"
                            : "border-border text-muted-foreground hover:bg-muted"
                        )}
                        aria-pressed={item.sms}
                      >
                        <Smartphone className="size-3.5" />
                        <span>SMS</span>
                        {item.sms && <CheckCircle2 className="size-3 text-emerald-600" />}
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="pt-3 border-t border-border/60 flex items-center justify-between">
            <p className="text-xs text-muted-foreground">
              Critical system alerts and security notices cannot be opted out of.
            </p>
            <Button
              type="button"
              onClick={handleSaveAll}
              size="sm"
              className="bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs h-9 px-4 gap-1.5"
            >
              <Save className="size-3.5" />
              Save Preferences
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
