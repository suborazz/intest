"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Search,
  Users,
  TrendingUp,
  Award,
  BookOpen,
  Briefcase,
  FileText,
  Laptop,
  ShieldCheck,
  MapPin,
  Phone,
  Globe,
  Mail,
  UserPlus
} from "lucide-react";

interface RegistrationFlyerModalProps {
  initialRole?: string;
  onSelectRole?: (role: "INSTRUCTOR" | "STUDENT") => void;
}

export function RegistrationFlyerModal({
  initialRole,
  onSelectRole,
}: RegistrationFlyerModalProps) {
  const [isOpen, setIsOpen] = useState(true);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-150"
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsOpen(false);
      }}
    >
      {/* Compact Poster Card */}
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto animate-in zoom-in-95 duration-150 p-4 sm:p-5 text-slate-900">
        
        {/* Close Button at Top Right */}
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="absolute top-3 right-3 z-20 flex items-center justify-center h-7 w-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
          aria-label="Close"
          title="Close and continue to form"
        >
          <X className="h-4 w-4" />
        </button>

        {/* 1. Header */}
        <div className="flex items-center justify-between gap-3 pb-2.5 border-b border-slate-100 pr-8">
          <div className="flex items-center gap-2.5">
            <div className="relative h-10 w-10 shrink-0">
              <img
                src="/header-logo.png"
                alt="i3 Logo"
                className="h-full w-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/logo.png";
                }}
              />
            </div>
            <div>
              <h2 className="text-xs sm:text-sm font-black tracking-tight text-[#0F2942] uppercase leading-tight font-[family-name:var(--font-playfair-display,'Playfair_Display',serif)]">
                INTERNATIONAL INSTITUTE OF INTERNSHIP™ (i3)
              </h2>
              <p className="text-[10px] font-medium text-slate-500">
                A Unit of DPKHRC Trust
              </p>
            </div>
          </div>

          <div className="hidden sm:block text-right">
            <span className="inline-block bg-[#0F2942] text-white text-[9px] font-bold px-2 py-0.5 rounded">
              LEARN • PRACTICE • GROW
            </span>
          </div>
        </div>

        {/* 2. Hero: Headline + 100% Free Badge + Visual */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center py-2.5">
          <div className="sm:col-span-7 space-y-1.5">
            <div className="flex items-center gap-2.5">
              <div>
                <p className="text-xs font-bold text-[#0F2942] uppercase tracking-wide leading-none">
                  Create Your
                </p>
                <h1 className="text-xl sm:text-2xl font-black text-[#16a34a] leading-tight">
                  FREE ACCOUNT
                </h1>
                <p className="text-xs font-black text-[#0F2942] leading-none">
                  Today!
                </p>
              </div>

              {/* 100% Free Badge */}
              <div className="shrink-0 flex flex-col items-center justify-center h-13 w-13 rounded-full bg-gradient-to-br from-emerald-600 to-teal-800 text-white p-1 text-center shadow-md border border-emerald-300">
                <span className="text-[7.5px] font-black text-emerald-200 leading-tight">100%</span>
                <span className="text-[10px] font-black leading-tight">FREE</span>
                <span className="text-[6.5px] font-bold text-emerald-100 leading-none">SIGN-UP</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-600 leading-snug">
              Join thousands of students for <strong className="text-[#0F2942]">skill development</strong>,{" "}
              <strong className="text-[#0F2942]">practical experience</strong> and{" "}
              <strong className="text-[#e11d48]">career success</strong>.
            </p>
          </div>

          <div className="sm:col-span-5">
            <div className="relative aspect-[16/10] w-full rounded-lg overflow-hidden shadow-xs border border-slate-100 bg-slate-100">
              <img
                src="/images/hero-running-internship.jpg"
                alt="Students studying"
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
        </div>

        {/* 3. Blue Ribbon Banner */}
        <div className="bg-[#0F2942] text-white py-1.5 px-3 rounded-lg text-center my-1.5 shadow-xs">
          <p className="text-[10.5px] sm:text-[11.5px] font-bold tracking-wide">
            Get Access to Amazing <span className="text-yellow-400 font-extrabold">INTERNSHIP &amp; TRAINING</span> Opportunities
          </p>
        </div>

        {/* 4. WHAT YOU GET (5 Compact Icons) */}
        <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-200/70 my-2">
          <div className="text-[9px] font-bold uppercase tracking-wider text-[#0F2942] mb-1.5">
            WHAT YOU GET
          </div>
          <div className="flex flex-wrap items-stretch justify-center gap-1.5 text-center">
            {/* 1 */}
            <div className="flex-1 min-w-[95px] max-w-[125px] bg-white p-2 rounded-lg border border-slate-100 shadow-2xs flex flex-col items-center justify-center">
              <Briefcase className="h-4 w-4 text-[#0A5C36] mb-1" />
              <span className="text-[9.5px] font-bold text-slate-800 leading-tight">Internship Opportunities</span>
            </div>
            {/* 2 */}
            <div className="flex-1 min-w-[95px] max-w-[125px] bg-white p-2 rounded-lg border border-slate-100 shadow-2xs flex flex-col items-center justify-center">
              <BookOpen className="h-4 w-4 text-amber-600 mb-1" />
              <span className="text-[9.5px] font-bold text-slate-800 leading-tight">Skill Training</span>
            </div>
            {/* 3 */}
            <div className="flex-1 min-w-[95px] max-w-[125px] bg-white p-2 rounded-lg border border-slate-100 shadow-2xs flex flex-col items-center justify-center">
              <Laptop className="h-4 w-4 text-blue-600 mb-1" />
              <span className="text-[9.5px] font-bold text-slate-800 leading-tight">Live Experience</span>
            </div>
            {/* 4 */}
            <div className="flex-1 min-w-[95px] max-w-[125px] bg-white p-2 rounded-lg border border-slate-100 shadow-2xs flex flex-col items-center justify-center">
              <TrendingUp className="h-4 w-4 text-purple-600 mb-1" />
              <span className="text-[9.5px] font-bold text-slate-800 leading-tight">Career Growth</span>
            </div>
            {/* 5 */}
            <div className="flex-1 min-w-[95px] max-w-[125px] bg-white p-2 rounded-lg border border-slate-100 shadow-2xs flex flex-col items-center justify-center">
              <Users className="h-4 w-4 text-teal-700 mb-1" />
              <span className="text-[9.5px] font-bold text-slate-800 leading-tight">Mentor Connect</span>
            </div>
          </div>
        </div>

        {/* 5. HOW IT WORKS (4 Simple Steps) */}
        <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-200/70 my-2">
          <div className="text-[9px] font-bold uppercase tracking-wider text-[#0F2942] mb-1.5">
            HOW IT WORKS
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
            <div className="bg-white p-1.5 rounded-md border border-slate-100 flex items-center gap-1.5">
              <span className="h-5 w-5 rounded-full bg-blue-600 text-white text-[9px] font-bold flex items-center justify-center shrink-0">1</span>
              <div>
                <p className="text-[9px] font-bold text-slate-800 leading-tight">Sign Up</p>
                <p className="text-[8px] text-slate-500 leading-none">Free account</p>
              </div>
            </div>

            <div className="bg-white p-1.5 rounded-md border border-slate-100 flex items-center gap-1.5">
              <span className="h-5 w-5 rounded-full bg-emerald-600 text-white text-[9px] font-bold flex items-center justify-center shrink-0">2</span>
              <div>
                <p className="text-[9px] font-bold text-slate-800 leading-tight">Profile</p>
                <p className="text-[8px] text-slate-500 leading-none">Add skills</p>
              </div>
            </div>

            <div className="bg-white p-1.5 rounded-md border border-slate-100 flex items-center gap-1.5">
              <span className="h-5 w-5 rounded-full bg-amber-500 text-white text-[9px] font-bold flex items-center justify-center shrink-0">3</span>
              <div>
                <p className="text-[9px] font-bold text-slate-800 leading-tight">Explore</p>
                <p className="text-[8px] text-slate-500 leading-none">Find programs</p>
              </div>
            </div>

            <div className="bg-white p-1.5 rounded-md border border-slate-100 flex items-center gap-1.5">
              <span className="h-5 w-5 rounded-full bg-purple-600 text-white text-[9px] font-bold flex items-center justify-center shrink-0">4</span>
              <div>
                <p className="text-[9px] font-bold text-slate-800 leading-tight">Learn</p>
                <p className="text-[8px] text-slate-500 leading-none">Gain experience</p>
              </div>
            </div>
          </div>
        </div>

        {/* 6. Footer Ribbon & Security Note */}
        <div className="bg-[#0F2942] text-white rounded-lg p-2 flex items-center justify-between text-xs mt-1.5">
          <p className="text-[10px] font-bold">
            DON&apos;T WAIT, <span className="text-yellow-400 font-extrabold">CREATE OPPORTUNITIES!</span>
          </p>
          <span className="text-[9px] text-slate-200">
            www.iiinternship.in/sign-up
          </span>
        </div>

        <div className="flex items-center justify-between text-[9px] text-slate-500 pt-2">
          <span className="flex items-center gap-1">
            <ShieldCheck className="h-3 w-3 text-emerald-600" />
            Trusted Platform • 100% Genuine Opportunities
          </span>
          <span className="hidden sm:inline">
            📍 Lucknow • 📞 +91 9472351693
          </span>
        </div>

      </div>
    </div>
  );
}
