"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Award,
  Search,
  MapPin,
  Clock,
  Sparkles,
  X,
  Users,
  Briefcase,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
} from "lucide-react";
import { axiosInstance } from "@/x/acfb3dca";

export interface TopInstructor {
  id: string;
  instructorId: string;
  slNo: number;
  name: string;
  fromWhere: string;
  mentorshipMode: string[];
  totalExperience: string;
  mentorshipAreas: string;
  organization?: string;
  designation?: string;
  photoUrl?: string;
  isApproved?: boolean;
}

interface TopInstructorsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TopInstructorsModal({ isOpen, onClose }: TopInstructorsModalProps) {
  const [instructors, setInstructors] = useState<TopInstructor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const itemsPerPage = 8;

  useEffect(() => {
    if (!isOpen) return;

    let mounted = true;
    setLoading(true);

    axiosInstance
      .get("/instructor/top")
      .then((res) => {
        if (mounted && res.data?.success) {
          setInstructors(res.data.data || []);
        }
      })
      .catch((err) => {
        console.error("Failed to load instructors", err);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [isOpen]);

  useEffect(() => {
    setPage(1);
  }, [search]);

  const filtered = useMemo(() => {
    if (!search.trim()) return instructors;
    const q = search.toLowerCase();
    return instructors.filter(
      (inst) =>
        inst.name.toLowerCase().includes(q) ||
        inst.fromWhere.toLowerCase().includes(q) ||
        inst.mentorshipAreas.toLowerCase().includes(q) ||
        inst.totalExperience.toLowerCase().includes(q) ||
        inst.mentorshipMode.some((m) => m.toLowerCase().includes(q)),
    );
  }, [instructors, search]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
  const paginated = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return filtered.slice(start, start + itemsPerPage);
  }, [filtered, page]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in-0 duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative z-10 flex flex-col w-full max-w-5xl max-h-[90vh] bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="relative px-6 py-5 border-b border-slate-100 dark:border-zinc-800 bg-gradient-to-r from-emerald-50/80 via-white to-slate-50/50 dark:from-emerald-950/20 dark:via-zinc-900 dark:to-zinc-900">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center size-11 rounded-xl bg-emerald-600 text-white shadow-md shadow-emerald-600/20">
                <Award className="size-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-zinc-100 tracking-tight">
                    List of Our Top Instructors
                  </h2>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                    <Sparkles className="size-3 text-emerald-600 dark:text-emerald-400" />
                    Verified Mentors
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
                  Distinguished domain leaders &amp; certified mentors registered on our portal
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 transition-colors cursor-pointer"
              title="Close"
            >
              <X className="size-5" />
            </button>
          </div>

          {/* Search bar & Stats */}
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by instructor name, district, state, or mentorship area..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-900 dark:text-zinc-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all shadow-2xs"
              />
            </div>
            <div className="text-xs font-semibold text-slate-500 dark:text-zinc-400 shrink-0 self-end sm:self-center">
              Total Instructors:{" "}
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                {filtered.length}
              </span>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16 text-center space-y-3">
              <div className="size-9 rounded-full border-3 border-emerald-600 border-t-transparent animate-spin" />
              <p className="text-xs font-semibold text-slate-500 dark:text-zinc-400">
                Fetching registered instructors...
              </p>
            </div>
          ) : paginated.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center space-y-3">
              <div className="size-14 rounded-2xl bg-slate-100 dark:bg-zinc-800 flex items-center justify-center text-slate-400">
                <Users className="size-7" />
              </div>
              <h3 className="text-sm font-bold text-slate-800 dark:text-zinc-200">
                No Instructors Found
              </h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400 max-w-sm">
                {search
                  ? "No registered instructors matched your search criteria. Try a different query."
                  : "No registered instructors currently available."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-zinc-800 shadow-2xs">
              <table className="w-full border-collapse text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-800/60 font-semibold text-slate-600 dark:text-zinc-300 uppercase tracking-wider text-[11px]">
                    <th className="py-3 px-3.5 w-14 text-center">Sl. No.</th>
                    <th className="py-3 px-4">Name</th>
                    <th className="py-3 px-4">From Where</th>
                    <th className="py-3 px-4">Mentorship Mode</th>
                    <th className="py-3 px-4">Total Experience</th>
                    <th className="py-3 px-4">Mentorship Areas</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-zinc-800/80">
                  {paginated.map((inst, idx) => {
                    const rowNumber = (page - 1) * itemsPerPage + idx + 1;
                    return (
                      <tr
                        key={inst.id}
                        className="hover:bg-slate-50/80 dark:hover:bg-zinc-800/40 transition-colors"
                      >
                        {/* Sl. No. */}
                        <td className="py-3.5 px-3.5 text-center font-mono font-bold text-slate-400 dark:text-zinc-500 text-xs">
                          {rowNumber}
                        </td>

                        {/* Name */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            {inst.photoUrl ? (
                              <img
                                src={inst.photoUrl}
                                alt={inst.name}
                                className="size-9 rounded-full object-cover border border-slate-200 dark:border-zinc-700 shrink-0 shadow-2xs"
                              />
                            ) : (
                              <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold text-xs uppercase shadow-2xs">
                                {inst.name.slice(0, 2)}
                              </div>
                            )}
                            <div className="flex flex-col min-w-0">
                              <span className="font-bold text-slate-900 dark:text-zinc-100 truncate text-xs flex items-center gap-1.5">
                                {inst.name}
                                {inst.isApproved && (
                                  <span title="Verified Instructor" className="inline-flex shrink-0">
                                    <CheckCircle2
                                      className="size-3.5 text-emerald-600 dark:text-emerald-400"
                                    />
                                  </span>
                                )}
                              </span>
                              {(inst.designation || inst.organization) && (
                                <span className="text-[10px] text-slate-500 dark:text-zinc-400 truncate">
                                  {[inst.designation, inst.organization]
                                    .filter(Boolean)
                                    .join(" • ")}
                                </span>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* From Where */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-1.5 text-slate-700 dark:text-zinc-300 font-medium">
                            <MapPin className="size-3.5 text-rose-500 shrink-0" />
                            <span className="truncate max-w-[200px]" title={inst.fromWhere}>
                              {inst.fromWhere}
                            </span>
                          </div>
                        </td>

                        {/* Mentorship Mode */}
                        <td className="py-3.5 px-4">
                          <div className="flex flex-wrap gap-1">
                            {inst.mentorshipMode.map((mode, mIdx) => (
                              <span
                                key={mIdx}
                                className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 border border-blue-200/50 dark:border-blue-900/40"
                              >
                                {mode}
                              </span>
                            ))}
                          </div>
                        </td>

                        {/* Total Experience */}
                        <td className="py-3.5 px-4">
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-amber-50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300 border border-amber-200/60 dark:border-amber-900/50">
                            <Clock className="size-3 text-amber-600 dark:text-amber-400 shrink-0" />
                            <span>{inst.totalExperience}</span>
                          </div>
                        </td>

                        {/* Mentorship Areas */}
                        <td className="py-3.5 px-4 max-w-[220px]">
                          <span
                            className="text-slate-600 dark:text-zinc-300 line-clamp-2 text-xs leading-snug"
                            title={inst.mentorshipAreas}
                          >
                            {inst.mentorshipAreas}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer & Pagination */}
        {filtered.length > itemsPerPage && (
          <div className="px-6 py-3.5 border-t border-slate-100 dark:border-zinc-800 flex items-center justify-between bg-slate-50/50 dark:bg-zinc-900/50">
            <span className="text-xs text-slate-500 dark:text-zinc-400">
              Showing {(page - 1) * itemsPerPage + 1} to{" "}
              {Math.min(page * itemsPerPage, filtered.length)} of {filtered.length}{" "}
              instructors
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs font-semibold text-slate-700 dark:text-zinc-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
              >
                <ChevronLeft className="size-3.5" />
                Previous
              </button>
              <span className="text-xs font-bold text-slate-700 dark:text-zinc-300 px-2">
                {page} / {totalPages}
              </span>
              <button
                type="button"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs font-semibold text-slate-700 dark:text-zinc-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
              >
                Next
                <ChevronRight className="size-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
