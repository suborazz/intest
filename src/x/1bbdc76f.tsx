"use client";

import React_2 from "react";

import { SidebarFiltersProvider } from "@/x/d50b23c8";
import {
  ESlotName,
  useLayoutContext,
} from "@/x/72be5b4f";

export const DashboardContent = ({
  children,
}: {
  children: React_2.ReactNode;
}) => {
  const { slots, isFilterOpen, setIsFilterOpen } = useLayoutContext();

  const pageHeader = slots[ESlotName.PAGE_HEADER];
  const leftFilter = slots[ESlotName.LEFT_FILTER];

  return (
    <SidebarFiltersProvider open={isFilterOpen} setOpen={setIsFilterOpen}>
      <div className="relative flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        {pageHeader}
        <div className="flex min-h-0 min-w-0 flex-1 flex-row">
          {leftFilter}
          <div className="custom-scroll min-h-0 min-w-0 flex-1 overflow-y-auto overflow-x-hidden px-2 py-1 md:px-4 md:py-1">
            {children}
          </div>
        </div>
      </div>
    </SidebarFiltersProvider>
  );
};
