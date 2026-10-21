"use client";

import * as React from "react";
import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function OnCampusVirtualEditPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  useEffect(() => {
    if (id) {
      router.replace(`/super-admin/internships/running-internship/edit/${id}`);
    }
  }, [router, id]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3">
      <Loader2 className="size-8 animate-spin text-teal-600" />
      <p className="text-sm font-medium text-slate-500">
        Redirecting to Unified Internship Editor...
      </p>
    </div>
  );
}
