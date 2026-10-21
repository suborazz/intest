"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Settings,
  ChevronRight,
  Home,
  Shield,
  Loader2,
} from "lucide-react";
import {
  SettingsNav,
  type SettingsTabId,
} from "./components/SettingsNav";
import { SecurityTab } from "./components/SecurityTab";
import { AccountOverviewTab } from "./components/AccountOverviewTab";
import { NotificationsTab } from "./components/NotificationsTab";
import { PrivacyDataTab } from "./components/PrivacyDataTab";
import { PreferencesTab } from "./components/PreferencesTab";

function RecruitSettingsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const tabParam = searchParams.get("tab") as SettingsTabId | null;
  const initialTab: SettingsTabId =
    tabParam && ["security", "overview", "notifications", "privacy", "preferences"].includes(tabParam)
      ? tabParam
      : "security";

  const [activeTab, setActiveTab] = useState<SettingsTabId>(initialTab);

  useEffect(() => {
    if (tabParam && tabParam !== activeTab) {
      if (["security", "overview", "notifications", "privacy", "preferences"].includes(tabParam)) {
        setActiveTab(tabParam);
      }
    }
  }, [tabParam, activeTab]);

  const handleTabChange = (tabId: SettingsTabId) => {
    setActiveTab(tabId);
    router.replace(`/recruit/settings?tab=${tabId}`, { scroll: false });
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      {/* Top Header & Breadcrumbs */}
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
          <Link
            href="/recruit/dashboard"
            className="flex items-center gap-1 hover:text-foreground transition-colors"
          >
            <Home className="size-3.5" />
            <span>Home</span>
          </Link>
          <ChevronRight className="size-3 text-muted-foreground/60" />
          <Link
            href="/recruit/dashboard"
            className="hover:text-foreground transition-colors"
          >
            Recruit Portal
          </Link>
          <ChevronRight className="size-3 text-muted-foreground/60" />
          <span className="text-foreground font-semibold">Settings</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-2.5">
              <span>Settings</span>
              <span className="rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold px-2.5 py-0.5">
                Candidate Hub
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Manage your credentials, candidate profile status, notifications, and privacy & data controls.
            </p>
          </div>
        </div>
      </div>

      {/* Main Responsive Layout */}
      <div className="flex flex-col lg:flex-row items-start gap-6 pt-2">
        {/* Navigation Rail (Mobile Pill List & Desktop Vertical Rail) */}
        <aside className="w-full lg:w-72 lg:shrink-0 lg:sticky lg:top-4 z-10">
          <SettingsNav activeTab={activeTab} onSelectTab={handleTabChange} />
        </aside>

        {/* Dynamic Tab Content Area */}
        <main className="flex-1 min-w-0 w-full animate-in fade-in-50 duration-200">
          {activeTab === "security" && <SecurityTab />}
          {activeTab === "overview" && <AccountOverviewTab />}
          {activeTab === "notifications" && <NotificationsTab />}
          {activeTab === "privacy" && <PrivacyDataTab />}
          {activeTab === "preferences" && <PreferencesTab />}
        </main>
      </div>
    </div>
  );
}

export default function RecruitSettingsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="size-8 animate-spin text-emerald-600" />
        </div>
      }
    >
      <RecruitSettingsContent />
    </Suspense>
  );
}
