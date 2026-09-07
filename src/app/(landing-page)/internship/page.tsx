"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Briefcase,
  CheckCircle2,
  Clock,
  Filter,
  GraduationCap,
  IndianRupee,
  Search,
  Zap,
  LayoutGrid,
  List,
  MapPin,
  Share2,
  ChevronRight,
  Sparkles,
  Building,
  Laptop,
  Activity,
  ArrowRight,
  BookOpen,
  Award,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { axiosInstance } from "@/x/acfb3dca";

interface InternshipPublic {
  id: string;
  title: string;
  description: string;
  companyName: string;
  location: string;
  type: "PAID" | "STIPEND" | "FREE";
  price: number | null;
  stipendAmount: number | null;
  duration: string;
  isActive: boolean;
  startDate: string | null;
  category: "RUNNING" | "ON_CAMPUS" | "VIRTUAL";
  department?: string | null;
  modules?: string[] | string | null;
  tools?: string[] | string | null;
  skills?: string[] | string | null;
  projectFocus?: string | null;
  credits?: number | string | null;
  contact?: string | null;
  mode?: string | null;
  mentor?: { id: string; name: string; email: string } | null;
  instructor?: { id: string; name: string; email: string } | null;
}

interface ListInternshipsResponse {
  success: boolean;
  data: InternshipPublic[];
}

function formatInternshipCode(code?: string | null, companyName?: string | null): string {
  if (!code) return "IN2026XX10001";
  const trimmed = code.trim();
  if (/^IN\d{4}[A-Z]{2}\d{5}$/i.test(trimmed)) {
    return trimmed.toUpperCase();
  }
  const sourceText = companyName && companyName.trim() ? companyName : trimmed;
  const words = sourceText
    .trim()
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .split(/\s+/)
    .filter(Boolean);

  let initials = "HT";
  if (words.length === 1 && words[0]!.length >= 2) {
    initials = words[0]!.slice(0, 2).toUpperCase();
  } else if (words.length >= 2) {
    initials = (words[0]![0]! + words[1]![0]!).toUpperCase();
  }

  let hash = 0;
  for (let i = 0; i < trimmed.length; i++) {
    hash = (hash * 31 + trimmed.charCodeAt(i)) % 2147483647;
  }
  const numericSuffix = (Math.abs(hash) % 90000) + 10000;
  return `IN2026${initials}${numericSuffix}`;
}

export default function AllInternshipsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [selectedType, setSelectedType] = useState<string>("ALL");
  const [selectedDuration, setSelectedDuration] = useState<string>("ALL");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const { data: res, isLoading } = useQuery<ListInternshipsResponse>({
    queryKey: ["all-public-internships"],
    queryFn: async () => {
      const response = await axiosInstance.get("/internships");
      return response.data;
    },
  });

  const internshipsList = useMemo(() => {
    const raw = res?.data || [];
    return raw.map((item) => {
      let feeLabel = "Free of Cost";
      if (item.type === "PAID") feeLabel = item.price ? `₹${item.price.toLocaleString()}` : "By Paying Fees";
      else if (item.type === "STIPEND") feeLabel = item.stipendAmount ? `₹${item.stipendAmount}/mo Stipend` : "Stipend";

      let modeLabel = "On-Campus";
      if (item.category === "VIRTUAL" || item.mode === "ONLINE") modeLabel = "Virtual / Remote";
      else if (item.mode === "HYBRID") modeLabel = "Hybrid";

      const formatDate = (dateStr: string | null | undefined) => {
        if (!dateStr) return "Rolling Admissions";
        try {
          return new Date(dateStr).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          });
        } catch {
          return String(dateStr);
        }
      };

      const parsedSkills: string[] = Array.isArray(item.skills)
        ? item.skills
        : typeof item.skills === "string"
        ? [item.skills]
        : [];

      return {
        ...item,
        code: formatInternshipCode(item.id, item.companyName),
        feeLabel,
        modeLabel,
        formattedStartDate: formatDate(item.startDate),
        skillsList: parsedSkills,
      };
    });
  }, [res]);

  const filteredInternships = useMemo(() => {
    return internshipsList.filter((item) => {
      // Category filter
      if (selectedCategory !== "ALL") {
        if (selectedCategory === "RUNNING" && item.category !== "RUNNING") return false;
        if (selectedCategory === "ON_CAMPUS" && item.category !== "ON_CAMPUS") return false;
        if (selectedCategory === "VIRTUAL" && item.category !== "VIRTUAL") return false;
      }

      // Type filter
      if (selectedType !== "ALL" && item.type !== selectedType) {
        return false;
      }

      // Duration filter
      if (selectedDuration !== "ALL") {
        const dur = (item.duration || "").toLowerCase();
        if (selectedDuration === "short" && !dur.includes("1") && !dur.includes("2") && !dur.includes("4 week") && !dur.includes("6 week") && !dur.includes("8 week")) return false;
        if (selectedDuration === "medium" && !dur.includes("3") && !dur.includes("4") && !dur.includes("12 week") && !dur.includes("16 week")) return false;
        if (selectedDuration === "long" && !dur.includes("6") && !dur.includes("24 week")) return false;
      }

      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = item.title?.toLowerCase().includes(q);
        const matchesCompany = item.companyName?.toLowerCase().includes(q);
        const matchesDept = item.department?.toLowerCase().includes(q);
        const matchesLocation = item.location?.toLowerCase().includes(q);
        const matchesCode = item.code?.toLowerCase().includes(q);
        const matchesSkills = item.skillsList.some((s) => s.toLowerCase().includes(q));

        if (!matchesTitle && !matchesCompany && !matchesDept && !matchesLocation && !matchesCode && !matchesSkills) {
          return false;
        }
      }

      return true;
    });
  }, [internshipsList, selectedCategory, selectedType, selectedDuration, searchQuery]);

  const handleShare = (internship: (typeof internshipsList)[0]) => {
    const shareUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/internship/${internship.id}`;
    const shareText = `Explore "${internship.title}" with ${internship.companyName || "International Institute of Internship"}.\nApply here: ${shareUrl}`;

    if (navigator.share) {
      navigator.share({
        title: internship.title,
        text: shareText,
        url: shareUrl,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${shareText}`);
      toast.success("Internship link copied to clipboard!");
    }
  };

  const categoryCounts = useMemo(() => {
    return {
      ALL: internshipsList.length,
      RUNNING: internshipsList.filter((i) => i.category === "RUNNING").length,
      ON_CAMPUS: internshipsList.filter((i) => i.category === "ON_CAMPUS").length,
      VIRTUAL: internshipsList.filter((i) => i.category === "VIRTUAL").length,
    };
  }, [internshipsList]);

  return (
    <main className="bg-background relative flex min-h-screen flex-col overflow-hidden">
      {/* Hero Banner */}
      <section className="relative isolate flex min-h-[380px] items-center overflow-hidden bg-gradient-to-br from-[#063323] via-[#0b4d36] to-[#04261a] pb-16 pt-12 md:pb-20 md:pt-16">
        <div className="pointer-events-none absolute inset-0 -z-[4] bg-[radial-gradient(theme(colors.white/0.05)_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="pointer-events-none absolute right-[-10%] top-[-20%] -z-[3] h-[480px] w-[480px] rounded-full bg-emerald-400 opacity-20 mix-blend-multiply blur-[140px] filter" />
        <div className="pointer-events-none absolute left-[-10%] bottom-[-10%] -z-[3] h-[350px] w-[350px] rounded-full bg-yellow-400 opacity-15 mix-blend-multiply blur-[120px] filter" />

        <div className="relative z-10 mx-auto mt-2 w-[min(1340px,calc(100%-48px))]">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-200 backdrop-blur-md">
              <Zap className="h-3.5 w-3.5 text-yellow-300" />
              Verified & Industry Aligned
            </div>

            <h1 className="text-white font-[family-name:var(--font-playfair-display,'Playfair_Display',serif)] text-[clamp(2.2rem,4.5vw,3.6rem)] font-bold leading-[1.15] tracking-tight">
              All Internship Programs
            </h1>

            <p className="mt-4 text-emerald-100/90 text-[1rem] leading-[1.6] sm:text-[1.1rem]">
              Accelerate your technical mastery with UGC-aligned virtual, on-campus, and running internships backed by industry mentors and recognized certifications.
            </p>

            {/* Quick Search Bar */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-2xl mx-auto">
              <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by domain, role, company, skills, or Internship ID..."
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/95 dark:bg-zinc-900/95 text-foreground placeholder:text-muted-foreground text-sm shadow-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                />
              </div>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="shrink-0 px-4 py-3 text-xs font-semibold text-white bg-white/20 hover:bg-white/30 rounded-xl transition-all"
                >
                  Clear Search
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Curved Swoosh Bottom */}
        <div className="pointer-events-none absolute bottom-[-4px] left-0 z-20 w-full overflow-hidden" aria-hidden="true">
          <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="h-[60px] w-full md:h-[90px]">
            <path d="M0,40 C320,100 420,0 740,40 C1060,80 1280,20 1440,50 L1440,100 L0,100 Z" className="fill-background" />
          </svg>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="relative z-10 mx-auto w-full max-w-[1340px] px-4 py-8 sm:px-6 md:py-12 lg:px-8">
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-5">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: "ALL", label: "All Internships", icon: Briefcase, count: categoryCounts.ALL },
              { id: "RUNNING", label: "Running Programs", icon: Activity, count: categoryCounts.RUNNING },
              { id: "ON_CAMPUS", label: "On-Campus", icon: MapPin, count: categoryCounts.ON_CAMPUS },
              { id: "VIRTUAL", label: "Virtual / Remote", icon: Laptop, count: categoryCounts.VIRTUAL },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-emerald-700 text-white shadow-md shadow-emerald-700/20"
                      : "bg-zinc-100 hover:bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? "text-yellow-300" : "text-muted-foreground"}`} />
                  <span>{tab.label}</span>
                  <span
                    className={`ml-1 text-[11px] px-2 py-0.5 rounded-full font-bold ${
                      isActive ? "bg-white/20 text-white" : "bg-zinc-200/80 dark:bg-zinc-700 text-muted-foreground"
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/40 p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`flex h-8 w-8 items-center justify-center rounded-md transition-all duration-200 ${
                viewMode === "grid"
                  ? "text-primary shadow-xs bg-background font-bold"
                  : "text-muted-foreground hover:bg-muted"
              }`}
              title="Grid View"
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`flex h-8 w-8 items-center justify-center rounded-md transition-all duration-200 ${
                viewMode === "list"
                  ? "text-primary shadow-xs bg-background font-bold"
                  : "text-muted-foreground hover:bg-muted"
              }`}
              title="List View"
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Filters and Catalog Grid */}
        <div className="mt-8 flex flex-col items-start gap-8 lg:flex-row">
          {/* Sidebar Filter Panel */}
          <aside className="w-full shrink-0 lg:w-[280px]">
            <div className="rounded-2xl border border-border/70 bg-card p-5 shadow-xs sticky top-24 space-y-6">
              <div className="flex items-center justify-between border-b border-border/50 pb-3">
                <div className="flex items-center gap-2 text-foreground font-bold text-sm">
                  <Filter className="h-4 w-4 text-emerald-600" />
                  Filter Options
                </div>
                {(selectedType !== "ALL" || selectedDuration !== "ALL" || searchQuery) && (
                  <button
                    onClick={() => {
                      setSelectedType("ALL");
                      setSelectedDuration("ALL");
                      setSearchQuery("");
                    }}
                    className="text-xs text-emerald-600 hover:text-emerald-700 font-semibold underline"
                  >
                    Reset All
                  </button>
                )}
              </div>

              {/* Fee / Stipend Type */}
              <div className="space-y-3">
                <h4 className="text-foreground flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  <IndianRupee className="h-3.5 w-3.5 text-amber-500" />
                  Stipend / Fee Structure
                </h4>
                <div className="space-y-2">
                  {[
                    { id: "ALL", label: "All Structures" },
                    { id: "FREE", label: "Free of Cost" },
                    { id: "STIPEND", label: "Stipend Backed" },
                    { id: "PAID", label: "By Paying Fees" },
                  ].map((t) => (
                    <label
                      key={t.id}
                      onClick={() => setSelectedType(t.id)}
                      className="group flex cursor-pointer items-center justify-between text-xs sm:text-sm py-1 font-medium"
                    >
                      <span className={`${selectedType === t.id ? "text-emerald-700 dark:text-emerald-400 font-bold" : "text-muted-foreground group-hover:text-foreground"}`}>
                        {t.label}
                      </span>
                      <input
                        type="radio"
                        name="internship_type"
                        checked={selectedType === t.id}
                        onChange={() => setSelectedType(t.id)}
                        className="text-emerald-600 focus:ring-emerald-500 accent-emerald-600 h-4 w-4"
                      />
                    </label>
                  ))}
                </div>
              </div>

              <div className="h-px bg-border/50" />

              {/* Duration Filter */}
              <div className="space-y-3">
                <h4 className="text-foreground flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  <Clock className="h-3.5 w-3.5 text-blue-500" />
                  Duration
                </h4>
                <div className="space-y-2">
                  {[
                    { id: "ALL", label: "All Durations" },
                    { id: "short", label: "1 - 2 Months (4-8 Weeks)" },
                    { id: "medium", label: "3 - 4 Months (12-16 Weeks)" },
                    { id: "long", label: "6 Months (24 Weeks)" },
                  ].map((d) => (
                    <label
                      key={d.id}
                      onClick={() => setSelectedDuration(d.id)}
                      className="group flex cursor-pointer items-center justify-between text-xs sm:text-sm py-1 font-medium"
                    >
                      <span className={`${selectedDuration === d.id ? "text-emerald-700 dark:text-emerald-400 font-bold" : "text-muted-foreground group-hover:text-foreground"}`}>
                        {d.label}
                      </span>
                      <input
                        type="radio"
                        name="internship_duration"
                        checked={selectedDuration === d.id}
                        onChange={() => setSelectedDuration(d.id)}
                        className="text-emerald-600 focus:ring-emerald-500 accent-emerald-600 h-4 w-4"
                      />
                    </label>
                  ))}
                </div>
              </div>

              <div className="h-px bg-border/50" />

              {/* Direct Links to Specialized Tracks */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Specialized Tracks
                </h4>
                <div className="flex flex-col gap-1.5">
                  <Link
                    href="/internship/running-internship"
                    className="flex items-center justify-between p-2 rounded-lg bg-muted/40 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 text-xs font-medium text-foreground hover:text-emerald-700 transition-colors"
                  >
                    <span>Running Internships</span>
                    <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                  </Link>
                  <Link
                    href="/internship/on-campus"
                    className="flex items-center justify-between p-2 rounded-lg bg-muted/40 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 text-xs font-medium text-foreground hover:text-emerald-700 transition-colors"
                  >
                    <span>On-Campus Internships</span>
                    <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                  </Link>
                  <Link
                    href="/internship/virtual-internship"
                    className="flex items-center justify-between p-2 rounded-lg bg-muted/40 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 text-xs font-medium text-foreground hover:text-emerald-700 transition-colors"
                  >
                    <span>Virtual Internships</span>
                    <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                  </Link>
                </div>
              </div>
            </div>
          </aside>

          {/* Cards Catalog */}
          <div className="min-w-0 flex-1">
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                  Available Opportunities ({filteredInternships.length})
                </h2>
                <p className="text-muted-foreground text-xs sm:text-sm mt-0.5">
                  Showing all verified UGC-aligned internships matching your preferences.
                </p>
              </div>
            </div>

            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="size-10 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent" />
                <p className="mt-4 text-sm font-medium text-muted-foreground">Loading available internships...</p>
              </div>
            ) : filteredInternships.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border/80 p-12 text-center">
                <Briefcase className="mx-auto h-12 w-12 text-muted-foreground/50" />
                <h3 className="mt-4 text-base font-bold text-foreground">No internships found</h3>
                <p className="mt-1 text-sm text-muted-foreground max-w-md mx-auto">
                  We couldn't find any internships matching your current search criteria. Try adjusting your filters or search keywords.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory("ALL");
                    setSelectedType("ALL");
                    setSelectedDuration("ALL");
                    setSearchQuery("");
                  }}
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-4 py-2 text-xs font-semibold text-white shadow hover:bg-emerald-800 transition-all"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 gap-5"
                    : "flex flex-col gap-4"
                }
              >
                {filteredInternships.map((internship) => (
                  <div
                    key={internship.id}
                    className="group relative flex flex-col justify-between rounded-2xl border border-border/70 bg-card p-5 sm:p-6 shadow-xs hover:shadow-xl hover:border-emerald-500/40 transition-all duration-300"
                  >
                    <div>
                      {/* Top Row: Code Badge + Category Tag */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="inline-flex items-center rounded-md border border-emerald-200/80 bg-emerald-50 px-2.5 py-0.5 font-mono text-[11px] font-bold text-emerald-800 dark:border-emerald-800/50 dark:bg-emerald-950/40 dark:text-emerald-300">
                          {internship.code}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-wide uppercase ${
                              internship.category === "VIRTUAL"
                                ? "bg-purple-100 text-purple-800 dark:bg-purple-950/50 dark:text-purple-300"
                                : internship.category === "ON_CAMPUS"
                                ? "bg-blue-100 text-blue-800 dark:bg-blue-950/50 dark:text-blue-300"
                                : "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300"
                            }`}
                          >
                            {internship.category === "VIRTUAL"
                              ? "Virtual"
                              : internship.category === "ON_CAMPUS"
                              ? "On-Campus"
                              : "Running"}
                          </span>
                          <span className="rounded-full bg-amber-100 text-amber-900 dark:bg-amber-950/50 dark:text-amber-300 px-2.5 py-0.5 text-[10px] font-bold">
                            {internship.feeLabel}
                          </span>
                        </div>
                      </div>

                      {/* Title & Organization */}
                      <h3 className="text-base sm:text-lg font-bold text-foreground group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
                        {internship.title}
                      </h3>

                      <p className="mt-1 text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
                        <Building className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                        <span>{internship.companyName || "International Institute of Internship"}</span>
                      </p>

                      <p className="mt-2.5 text-xs text-muted-foreground/90 line-clamp-2 leading-relaxed">
                        {internship.description}
                      </p>

                      {/* Key Attributes */}
                      <div className="mt-4 grid grid-cols-2 gap-2 text-[11px] font-medium text-muted-foreground bg-muted/30 rounded-xl p-3">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                          <span className="truncate">{internship.location || "Remote / Pan-India"}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5 text-blue-600 shrink-0" />
                          <span className="truncate">{internship.duration || "8 Weeks"}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <GraduationCap className="h-3.5 w-3.5 text-purple-600 shrink-0" />
                          <span className="truncate">{internship.department || "Engineering & Tech"}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Award className="h-3.5 w-3.5 text-amber-600 shrink-0" />
                          <span className="truncate">{internship.credits ? `${internship.credits} Credits` : "4 UGC Credits"}</span>
                        </div>
                      </div>

                      {/* Skills Tags */}
                      {internship.skillsList && internship.skillsList.length > 0 && (
                        <div className="mt-3.5 flex flex-wrap gap-1.5">
                          {internship.skillsList.slice(0, 3).map((skill, idx) => (
                            <span
                              key={idx}
                              className="rounded-md bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 text-[10px] font-semibold text-zinc-700 dark:text-zinc-300"
                            >
                              {skill}
                            </span>
                          ))}
                          {internship.skillsList.length > 3 && (
                            <span className="rounded-md bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 text-[10px] font-bold text-muted-foreground">
                              +{internship.skillsList.length - 3}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Bottom CTA Actions */}
                    <div className="mt-5 flex items-center justify-between gap-3 border-t border-border/50 pt-4">
                      <Link
                        href={`/internship/${internship.id}`}
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition-all group/btn"
                      >
                        <span>View Details & Apply</span>
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5" />
                      </Link>
                      <button
                        onClick={() => handleShare(internship)}
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border bg-background hover:bg-muted text-muted-foreground hover:text-foreground transition-all"
                        title="Share Internship"
                      >
                        <Share2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
