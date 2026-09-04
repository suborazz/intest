import { cookies } from "next/headers";
import Image from "next/image";
import React from "react";
import { AuthProvider, AuthContext } from "@/x/8789d6dc";
import { AuthDataHook } from "@/x/0da0a87b";

export default async function RecruitLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const userRole = cookieStore.get("user_role")?.value;

  return (
    <AuthProvider initialRole={userRole}>
      <div className="bg-background text-foreground flex min-h-screen w-full flex-col font-sans md:flex-row print:block print:min-h-0 print:bg-white print:p-0">
        {}
        <div className="relative flex h-[280px] w-full shrink-0 flex-col justify-between overflow-hidden bg-zinc-950 p-6 md:h-auto md:w-1/2 md:p-12 print:hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/auth-bg.png"
              alt="Recruiter Registration Background"
              fill
              priority
              className="duration-10000 object-cover opacity-90 transition-transform hover:scale-105"
            />
            <div className="from-primary/30 to-background/20 absolute inset-0 bg-gradient-to-tr via-transparent mix-blend-overlay" />
            <div className="absolute inset-0 bg-black/15" />
          </div>

          {}
          <div className="relative z-10 flex items-center gap-2">
            <div className="flex items-center justify-center rounded-lg bg-white px-4 py-3 shadow-md">
              <Image
                src="/logo.png"
                alt="iiInternship Logo"
                width={180}
                height={48}
                className="h-12 w-auto object-contain"
                priority
              />
            </div>
          </div>

          {}
          <div className="relative z-10 hidden rounded-2xl border border-white/15 bg-white/10 p-6 text-white shadow-2xl backdrop-blur-xl transition-all hover:border-white/25 md:block">
            <p className="text-sm font-medium leading-relaxed text-white/90">
              Complete your Recruiter registration details to setup your company
              profile, contact details, and platform access.
            </p>
            <div className="mt-4 border-t border-white/10 pt-4">
              <p className="text-xs font-semibold text-white">
                Recruiter Portal
              </p>
              <p className="text-[10px] text-white/50">Verification & Setup</p>
            </div>
          </div>
        </div>

        {}
        <div className="relative z-10 -mt-6 flex w-full min-w-0 flex-col overflow-y-auto overflow-x-hidden rounded-t-[30px] bg-zinc-50 shadow-2xl transition-colors duration-500 md:mt-0 md:max-h-screen md:w-1/2 md:rounded-none dark:bg-zinc-950 print:-mt-0 print:max-h-none print:w-full print:bg-white print:shadow-none print:dark:bg-white">
          {}
          <div className="bg-primary/5 dark:bg-primary/10 pointer-events-none absolute right-[-10%] top-[-20%] h-[50%] w-[50%] rounded-full blur-[130px]" />

          <div className="z-10 flex w-full flex-1 flex-col justify-center px-4 pb-6 pt-12 sm:p-6 md:p-10 print:p-0">
            {children}
          </div>
        </div>
      </div>
    </AuthProvider>
  );
}
