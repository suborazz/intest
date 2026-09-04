"use client";

import { usePathname } from "next/navigation";
import React_2 from "react";

import { useAuth } from "@/x/8789d6dc";

import { useBreadcrumbLabels } from "@/x/72be5b4f";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/x/38fffd5d";

import { getBreadcrumbMeta } from "@/x/dd7a7b74";

export function BreadcrumbNav() {
  const pathname = usePathname();
  const breadcrumbLabels = useBreadcrumbLabels();
  const { role } = useAuth();

    const segments = pathname.split("/").filter(Boolean);

  const homeMeta = getBreadcrumbMeta("home", "/", role);
  const HomeIcon = homeMeta.IconComponent;

  if (segments.length === 0) {
    return (
      <Breadcrumb>
        <BreadcrumbList className="flex items-center gap-1.5 text-xs">
          <BreadcrumbItem>
            <BreadcrumbPage className="text-primary flex items-center gap-1.5 font-bold">
              <span className="bg-primary/10 text-primary flex size-5 items-center justify-center rounded-md">
                <HomeIcon className="size-3" aria-hidden="true" />
              </span>
              <span>{homeMeta.label}</span>
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  }

  return (
    <Breadcrumb>
      <BreadcrumbList className="flex items-center gap-1.5 text-xs">
        <BreadcrumbItem>
          <BreadcrumbLink
            href="/"
            className="text-primary/80 hover:text-primary group flex items-center gap-1.5 font-medium transition-colors"
          >
            <span className="bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground flex size-5 items-center justify-center rounded-md transition-colors">
              <HomeIcon className="size-3" aria-hidden="true" />
            </span>
            <span>{homeMeta.label}</span>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {segments.map((segment, index) => {
          const isLast = index === segments.length - 1;
          const href = "/" + segments.slice(0, index + 1).join("/");

          const meta = getBreadcrumbMeta(segment, href, role);
          const label = breadcrumbLabels[segment] ?? meta.label;
          const IconComponent = meta.IconComponent;

          return (
            <React_2.Fragment key={href}>
              <BreadcrumbSeparator className="text-primary/40" />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage className="text-primary flex items-center gap-1.5 font-bold">
                    <span className="bg-primary/10 text-primary flex size-5 items-center justify-center rounded-md">
                      <IconComponent className="size-3" aria-hidden="true" />
                    </span>
                    <span>{label}</span>
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink
                    href={href}
                    className="text-primary/80 hover:text-primary group flex items-center gap-1.5 font-medium transition-colors"
                  >
                    <span className="bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground flex size-5 items-center justify-center rounded-md transition-colors">
                      <IconComponent className="size-3" aria-hidden="true" />
                    </span>
                    <span>{label}</span>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React_2.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
