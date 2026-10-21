"use client";

import * as React from "react";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";

function OnCampusVirtualRedirectContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const type = searchParams.get("type");
    let target = "/super-admin/internships/running-internship/new";

    if (type === "on-campus") {
      target += "?category=ON_CAMPUS";
    } else if (type === "virtual-internship" || type === "virtual") {
      target += "?category=VIRTUAL";
    } else if (searchParams.get("category")) {
      target += `?category=${searchParams.get("category")}`;
    } else {
      target += "?category=ON_CAMPUS";
    }

    router.replace(target);
  }, [router, searchParams]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3">
      <Loader2 className="size-8 animate-spin text-teal-600" />
      <p className="text-sm font-medium text-slate-500">
        Redirecting to Unified Internship Form...
      </p>
    </div>
  );
}

export default function OnCampusVirtualNewPage() {
  return (
    <React.Suspense
      fallback={
        <div className="flex min-h-[60vh] items-center justify-center">
          <Loader2 className="size-8 animate-spin text-teal-600" />
        </div>
      }
    >
      <OnCampusVirtualRedirectContent />
    </React.Suspense>
  );
}
