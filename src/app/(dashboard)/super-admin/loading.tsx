import React from "react";

export default function SuperAdminLoading() {
  return (
    <div className="flex flex-col gap-6 p-4 md:p-6 w-full animate-in fade-in-50 duration-300">
      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-2">
          <div className="h-8 w-56 bg-muted/60 animate-pulse rounded-lg" />
          <div className="h-4 w-80 bg-muted/40 animate-pulse rounded-md" />
        </div>
        <div className="h-10 w-36 bg-muted/60 animate-pulse rounded-lg shrink-0" />
      </div>

      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-24 rounded-xl border border-border/40 bg-card/60 p-4 shadow-sm space-y-3"
          >
            <div className="h-4 w-24 bg-muted/50 animate-pulse rounded" />
            <div className="h-8 w-16 bg-muted/70 animate-pulse rounded-md" />
          </div>
        ))}
      </div>

      {/* Main Table / Content Skeleton */}
      <div className="rounded-xl border border-border/40 bg-card/60 p-4 shadow-sm space-y-4">
        <div className="flex items-center justify-between gap-4 pb-2 border-b border-border/30">
          <div className="h-9 w-64 bg-muted/50 animate-pulse rounded-lg" />
          <div className="h-9 w-24 bg-muted/50 animate-pulse rounded-lg" />
        </div>
        
        {/* Table Rows Skeleton */}
        <div className="space-y-3 pt-2">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="flex items-center justify-between gap-4 h-12 px-4 rounded-lg bg-muted/20 animate-pulse"
            >
              <div className="h-4 w-1/4 bg-muted/60 rounded" />
              <div className="h-4 w-1/5 bg-muted/40 rounded hidden sm:block" />
              <div className="h-4 w-1/6 bg-muted/50 rounded hidden md:block" />
              <div className="h-6 w-16 bg-muted/70 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
