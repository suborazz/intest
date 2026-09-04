"use client";

import { usePathname } from "next/navigation";
import React_2, { useEffect, useLayoutEffect, useState } from "react";

import { cn } from "@/x/a85a9c0c";

import { SidebarFilters, SidebarFiltersProvider } from "@/x/d50b23c8";
import { SidebarInset, SidebarProvider } from "@/x/959524ce";

import { AppSidebar } from "@/x/ff39d6c6";
import { SettingsSidebar } from "@/x/f4067809";

export enum ESlotName {
  APP_SIDEBAR = "app-sidebar",
  BREADCRUMB = "breadcrumb",
  NAV_TABS = "nav-tabs",
  SUB_NAV_TABS = "sub-nav-tabs",
  LEFT_SIDEBAR = "left-sidebar",
  LEFT_FILTER = "left-filter",
  RIGHT_FILTER = "right-filter",
  DETAIL_SIDEBAR = "detail-sidebar",
  PAGE_HEADER = "page-header",
}

interface LayoutContextProps {
  isFilterOpen: boolean;
  isDetailsSidebarOpen: boolean;
  isLeftSidebarOpen: boolean;
  noPadding: boolean;

  setIsFilterOpen: React_2.Dispatch<React_2.SetStateAction<boolean>>;
  setIsDetailsSidebarOpen: React_2.Dispatch<React_2.SetStateAction<boolean>>;
  setIsLeftSidebarOpen: React_2.Dispatch<React_2.SetStateAction<boolean>>;
          requestNoPadding: () => () => void;

  slots: Record<ESlotName, React_2.ReactNode>;
  setSlot: (name: ESlotName, content: React_2.ReactNode) => void;
}

export const LayoutContext = React_2.createContext<LayoutContextProps | null>(null);

const DEFAULT_TEST_SLOTS: Record<ESlotName, React_2.ReactNode> = {
  [ESlotName.APP_SIDEBAR]: null,
  [ESlotName.BREADCRUMB]: null,
  [ESlotName.NAV_TABS]: null,
  [ESlotName.SUB_NAV_TABS]: null,
  [ESlotName.LEFT_FILTER]: null,
  [ESlotName.RIGHT_FILTER]: null,
  [ESlotName.DETAIL_SIDEBAR]: null,
  [ESlotName.PAGE_HEADER]: null,
  [ESlotName.LEFT_SIDEBAR]: null,
};

const DEFAULT_TEST_CONTEXT: LayoutContextProps = {
  isFilterOpen: false,
  isDetailsSidebarOpen: false,
  isLeftSidebarOpen: false,
  noPadding: false,
  setIsFilterOpen: () => {},
  setIsDetailsSidebarOpen: () => {},
  setIsLeftSidebarOpen: () => {},
  requestNoPadding: () => () => {},
  slots: DEFAULT_TEST_SLOTS,
  setSlot: () => {},
};

export const useLayoutContext = () => {
  const context = React_2.useContext(LayoutContext);
  if (!context) {
        if (process.env.NODE_ENV === "test") {
      return DEFAULT_TEST_CONTEXT;
    }
    throw new Error(
      "useLayoutContext must be used within a LayoutContextProvider",
    );
  }
  return context;
};

export const LayoutContextProvider = ({
  children,
}: {
  children: React_2.ReactNode;
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isDetailsSidebarOpen, setIsDetailsSidebarOpen] = useState(false);
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);
    const [noPaddingCount, setNoPaddingCount] = useState(0);
  const noPadding = noPaddingCount > 0;
  const requestNoPadding = React_2.useCallback(() => {
    setNoPaddingCount((c) => c + 1);
    return () => setNoPaddingCount((c) => Math.max(0, c - 1));
  }, []);

  const [slots, setSlots] = useState<Record<ESlotName, React_2.ReactNode>>({
    [ESlotName.APP_SIDEBAR]: null,
    [ESlotName.BREADCRUMB]: null,
    [ESlotName.NAV_TABS]: null,
    [ESlotName.SUB_NAV_TABS]: null,
    [ESlotName.LEFT_FILTER]: null,
    [ESlotName.RIGHT_FILTER]: null,
    [ESlotName.DETAIL_SIDEBAR]: null,
    [ESlotName.PAGE_HEADER]: null,
    [ESlotName.LEFT_SIDEBAR]: null,
  });

  const setSlot = React_2.useCallback(
    (name: ESlotName, content: React_2.ReactNode) => {
      setSlots((prev) => ({ ...prev, [name]: content }));
    },
    [],
  );

  return (
    <LayoutContext.Provider
      value={{
        isFilterOpen,
        isDetailsSidebarOpen,
        isLeftSidebarOpen,
        noPadding,

        setIsFilterOpen,
        setIsDetailsSidebarOpen,
        setIsLeftSidebarOpen,
        requestNoPadding,
        slots,
        setSlot,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

type BreadcrumbLabelsListener = () => void;

let breadcrumbLabelsStore: Record<string, string> = {};
const breadcrumbLabelsListeners = new Set<BreadcrumbLabelsListener>();

function writeBreadcrumbLabel(segment: string, label: string | undefined) {
  if (!label) {
    if (!(segment in breadcrumbLabelsStore)) return;
    const next = { ...breadcrumbLabelsStore };
    delete next[segment];
    breadcrumbLabelsStore = next;
  } else {
    if (breadcrumbLabelsStore[segment] === label) return;
    breadcrumbLabelsStore = { ...breadcrumbLabelsStore, [segment]: label };
  }
  breadcrumbLabelsListeners.forEach((listener) => listener());
}

function subscribeBreadcrumbLabels(listener: BreadcrumbLabelsListener) {
  breadcrumbLabelsListeners.add(listener);
  return () => {
    breadcrumbLabelsListeners.delete(listener);
  };
}

const getBreadcrumbLabelsSnapshot = () => breadcrumbLabelsStore;
const getBreadcrumbLabelsServerSnapshot = () => breadcrumbLabelsStore;

export const useBreadcrumbLabels = () =>
  React_2.useSyncExternalStore(
    subscribeBreadcrumbLabels,
    getBreadcrumbLabelsSnapshot,
    getBreadcrumbLabelsServerSnapshot,
  );

export const useBreadcrumbLabel = (
  segment: string | undefined,
  label: string | undefined,
) => {
  useEffect(() => {
    if (!segment) return;
    writeBreadcrumbLabel(segment, label);
    return () => writeBreadcrumbLabel(segment, undefined);
  }, [segment, label]);
};

interface ILayoutMainProps {
  children: React_2.ReactNode;
  breadcrumb?: React_2.ReactNode;
  navTabs?: React_2.ReactNode;
  subNavTabs?: React_2.ReactNode;
  leftFilter?: React_2.ReactNode;
  rightFilter?: React_2.ReactNode;
  detailSidebar?: React_2.ReactNode;
  leftSidebar?: React_2.ReactNode;
  pageHeader?: React_2.ReactNode;
}

export const LayoutMain = ({
  children,
  breadcrumb,
  navTabs,
  subNavTabs,
  leftFilter,
  rightFilter,
  detailSidebar,
  leftSidebar,
  pageHeader,
}: ILayoutMainProps) => {
  const { slots, isFilterOpen, setIsFilterOpen, noPadding } =
    useLayoutContext();

  const pathname = usePathname();

  const isSettingsPage = pathname.startsWith("/settings");

  const activeAppSidebar =
    slots[ESlotName.APP_SIDEBAR] || isSettingsPage ? (
      <SettingsSidebar />
    ) : (
      <AppSidebar />
    );
  const activeBreadcrumb = slots[ESlotName.BREADCRUMB] || breadcrumb;
  const activeNavTabs = slots[ESlotName.NAV_TABS] || navTabs;
  const activeSubNavTabs = slots[ESlotName.SUB_NAV_TABS] || subNavTabs;
  const activeLeftFilter = slots[ESlotName.LEFT_FILTER] || leftFilter;
  const activeRightFilter = slots[ESlotName.RIGHT_FILTER] || rightFilter;
  const activeDetailSidebar = slots[ESlotName.DETAIL_SIDEBAR] || detailSidebar;
  const activeLeftSidebar = slots[ESlotName.LEFT_SIDEBAR] || leftSidebar;
  const activePageHeader = slots[ESlotName.PAGE_HEADER] || pageHeader;

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "16rem",
          "--sidebar-width-icon": "4rem",
        } as React_2.CSSProperties
      }
    >
      {activeAppSidebar}

      <SidebarInset className="max-h-[100dvh] min-w-0 overflow-hidden">
        <SidebarFiltersProvider open={isFilterOpen} setOpen={setIsFilterOpen}>
          <section className="flex h-full min-w-0 flex-1 flex-col transition-all duration-300 ease-in-out">
            {activeBreadcrumb}
            {activeNavTabs}
            {activeSubNavTabs}
            <div className="flex min-h-0 flex-1 flex-row">
              {activeLeftSidebar}

              <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
                {activePageHeader}
                <div className="flex min-h-0 flex-1 flex-row">
                  {activeLeftFilter}

                  {}
                  <div
                    className={cn(
                      "animate-in fade-in flex h-full min-w-0 flex-1 flex-col space-y-6 overflow-y-auto outline-none duration-300",
                      !noPadding && "pb-10 pl-3 pr-6 pt-0",
                      !noPadding && !activeLeftFilter && "pl-6",
                    )}
                  >
                    {children}
                  </div>

                  {activeRightFilter}
                </div>
              </div>
            </div>
          </section>
        </SidebarFiltersProvider>
      </SidebarInset>

      {activeDetailSidebar}
    </SidebarProvider>
  );
};

const useSlot = (name: ESlotName, content: React_2.ReactNode) => {
  const { setSlot } = useLayoutContext();
    useLayoutEffect(() => {
    setSlot(name, content);
    return () => setSlot(name, null);
  }, [name, content, setSlot]);
};

export const BreadcrumbLayout = ({
  children,
}: {
  children: React_2.ReactNode;
}) => {
  const { slots } = useLayoutContext();
  const hasNavTabs = !!slots[ESlotName.NAV_TABS];

  const content = React_2.useMemo(
    () => (
      <div
        className={cn(
          "border-border bg-background/95 supports-[backdrop-filter]:bg-background/60 z-40 flex w-full flex-col backdrop-blur print:hidden",
          hasNavTabs ? "border-none" : "border-b",
        )}
      >
        {children}
      </div>
    ),
    [children, hasNavTabs],
  );

  useSlot(ESlotName.BREADCRUMB, content);
    if (process.env.NODE_ENV === "test") return content;
  return null;
};

export const NavTabsLayout = ({ children }: { children: React_2.ReactNode }) => {
  const content = React_2.useMemo(
    () => (
      <div className="flex w-full flex-col border-b print:hidden">
        {children}
      </div>
    ),
    [children],
  );
  useSlot(ESlotName.NAV_TABS, content);
  if (process.env.NODE_ENV === "test") return content;
  return null;
};

export const SubNavTabsLayout = ({
  children,
}: {
  children: React_2.ReactNode;
}) => {
  const content = React_2.useMemo(() => children, [children]);
  useSlot(ESlotName.SUB_NAV_TABS, content);
  if (process.env.NODE_ENV === "test") return content;
  return null;
};

export const AppSidebarLayout = ({
  children,
}: {
  children: React_2.ReactNode;
}) => {
  const content = React_2.useMemo(
    () => (
      <div
        className={cn(
          "bg-background relative hidden flex-col border-r transition-all duration-300 ease-in-out md:flex",
                            )}
      >
        {children}
      </div>
    ),
    [children],
  );
  useSlot(ESlotName.APP_SIDEBAR, content);
  if (process.env.NODE_ENV === "test") return content;
  return null;
};

export const DetailLayout = ({
  children,
  width = "w-80",
  className,
}: {
  children: React_2.ReactNode;
  width?: string;
  className?: string;
}) => {
  const { isDetailsSidebarOpen, setIsDetailsSidebarOpen } = useLayoutContext();

  useEffect(() => {
    setIsDetailsSidebarOpen(true);
    return () => setIsDetailsSidebarOpen(false);
  }, [setIsDetailsSidebarOpen]);

  const content = React_2.useMemo(
    () => (
      <div
        className={cn(
          "bg-background relative h-screen shrink-0 flex-col overflow-hidden border-l transition-all duration-300 ease-in-out md:flex",
          isDetailsSidebarOpen ? width : "w-0 border-l-0",
          className,
        )}
      >
        <div
          className={cn(
            "h-full overflow-y-auto",
                        width.startsWith("w-[")
              ? "min-w-[var(--sidebar-width-custom)]"
              : width,
          )}
          style={
            width.startsWith("w-[")
              ? ({
                  "--sidebar-width-custom":
                    width.match(/\[(.*?)\]/)?.[1] || "320px",
                } as React_2.CSSProperties)
              : undefined
          }
        >
          {children}
        </div>
      </div>
    ),
    [children, isDetailsSidebarOpen, width, className],
  );

  useSlot(ESlotName.DETAIL_SIDEBAR, content);
  if (process.env.NODE_ENV === "test") return content;
  return null;
};

export const LeftSidebarLayout = ({
  children,
}: {
  children: React_2.ReactNode;
}) => {
  const { isLeftSidebarOpen, setIsLeftSidebarOpen } = useLayoutContext();

  useEffect(() => {
    setIsLeftSidebarOpen(true);
    return () => setIsLeftSidebarOpen(false);
  }, [setIsLeftSidebarOpen]);

  const content = React_2.useMemo(
    () => (
      <div
        className={cn(
          "bg-background relative hidden h-screen shrink-0 flex-col overflow-hidden border-r transition-all duration-300 ease-in-out md:flex",
          isLeftSidebarOpen ? "w-80" : "w-0",
        )}
      >
        <div className="h-full w-80 overflow-y-auto">{children}</div>
      </div>
    ),
    [children, isLeftSidebarOpen],
  );

  useSlot(ESlotName.LEFT_SIDEBAR, content);
  if (process.env.NODE_ENV === "test") return content;
  return null;
};

export const FilterLayout = ({
  children,
  right = false,
}: {
  children: React_2.ReactNode;
  right?: boolean;
}) => {
  const { isFilterOpen } = useLayoutContext();

  const content = React_2.useMemo(
    () => (
      <div
        className={cn(
          "relative flex h-full flex-col overflow-hidden pt-2 transition-all duration-300 ease-in-out",
          isFilterOpen && right ? "pr-2" : "pl-3",
          !isFilterOpen
            ? "pointer-events-none w-0 opacity-0"
            : "w-64 opacity-100",
        )}
      >
        <div className="h-full w-64 overflow-hidden">
          <SidebarFilters>{children}</SidebarFilters>
        </div>
      </div>
    ),
    [children, isFilterOpen, right],
  );

  useSlot(right ? ESlotName.RIGHT_FILTER : ESlotName.LEFT_FILTER, content);
  if (process.env.NODE_ENV === "test") return content;
  return null;
};

export const PageHeaderLayout = ({
  children,
}: {
  children: React_2.ReactNode;
}) => {
  const content = React_2.useMemo(
    () => (
      <div className="bg-background flex w-full min-w-0 flex-col border-b px-6 print:hidden">
        {children}
      </div>
    ),
    [children],
  );
  useSlot(ESlotName.PAGE_HEADER, content);
  if (process.env.NODE_ENV === "test") return content;
  return null;
};

export const FullWidthLayout = () => {
  const { requestNoPadding } = useLayoutContext();

  useLayoutEffect(() => {
                const release = requestNoPadding();
    return release;
  }, [requestNoPadding]);

  return null;
};
