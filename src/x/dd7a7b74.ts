import * as LucideIcons from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { sidebarData } from "@/x/ad01f202";
import type { UserRole } from "@/x/c0183428";
import type { NavCollapsible, NavItem } from "@/x/80a83887";

export interface BreadcrumbMeta {
  label: string;
  IconComponent: LucideIcon;
}

export function getLucideIcon(iconName?: string): LucideIcon {
  if (iconName && iconName in LucideIcons) {
    const IconComp = (LucideIcons as unknown as Record<string, LucideIcon>)[iconName];
    if (IconComp) return IconComp;
  }
  return LucideIcons.Folder;
}

export function formatSegment(segment: string): string {
  return segment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function findItemInList(
  items: (NavItem | NavCollapsible)[],
  segment: string,
  href: string,
): { title: string; icon?: string } | null {
  for (const item of items) {
    if ("url" in item && typeof item.url === "string") {
      if (item.url === href || item.url.endsWith(`/${segment}`)) {
        return { title: item.title, icon: item.icon };
      }
    }
    if ("items" in item && Array.isArray(item.items)) {
      for (const subItem of item.items) {
        if (subItem.url === href || subItem.url.endsWith(`/${segment}`)) {
          return { title: subItem.title, icon: subItem.icon || item.icon };
        }
      }
    }
  }
  return null;
}

export function getBreadcrumbMeta(
  segment: string,
  href: string,
  userRole?: UserRole | null,
): BreadcrumbMeta {
  const cleanSegment = segment.toLowerCase().trim();

    if (cleanSegment === "home" || href === "/") {
    return {
      label: "Home",
      IconComponent: LucideIcons.HouseIcon,
    };
  }

    if (userRole && sidebarData.navGroups[userRole]) {
    const groups = sidebarData.navGroups[userRole];
    for (const group of groups) {
      const match = findItemInList(group.items, segment, href);
      if (match) {
        return {
          label: match.title,
          IconComponent: getLucideIcon(match.icon),
        };
      }
    }
  }

    for (const roleKey of Object.keys(sidebarData.navGroups) as UserRole[]) {
    const groups = sidebarData.navGroups[roleKey];
    if (!groups) continue;
    for (const group of groups) {
      const match = findItemInList(group.items, segment, href);
      if (match) {
        return {
          label: match.title,
          IconComponent: getLucideIcon(match.icon),
        };
      }
    }
  }

    return {
    label: formatSegment(segment),
    IconComponent: LucideIcons.Folder,
  };
}
