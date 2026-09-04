"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React_2, { useCallback } from "react";

import { TAlertFilter } from "@/x/c8b27999";
import { camelCaseToWords, cn } from "@/x/a85a9c0c";

import { Checkbox } from "@/x/2d1b7b33";

interface IFilterPanelProps {
  filters?: TFilters;
  right?: boolean;
  single?: string[];
  lowercase?: string[];
}

export type TFilters = {
  [key: string]: TAlertFilter[];
};

export type TRangeFilters = TRangeFilter[];

export type TRangeFilter = {
  [key: string]: { start: number; end: number };
};

export const FilterPanel: React_2.FunctionComponent<IFilterPanelProps> = ({
  filters,
  right = false,
  single = [],
  lowercase = [],
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const updateSearchParams = useCallback(
    (header: string, value: string, checked: boolean) => {
      const params = new URLSearchParams(searchParams?.toString());

      if (single.includes(header)) {
        if (checked) {
          params.set(header, value);
        } else {
          params.delete(header);
        }
      } else {
        const existingValues = params.get(header)?.split(",") ?? [];
        const updatedValues = checked
          ? [...existingValues, value]
          : existingValues.filter((v) => v !== value);

        if (updatedValues.length > 0) {
          params.set(header, updatedValues.join(","));
        } else {
          params.delete(header);
        }
      }

      replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams, pathname, replace, single],
  );

  return (
    <div
      className={cn(
        "customScroll h-full overflow-y-auto overflow-x-hidden pt-4",
        right ? "w-64 border-l" : "w-64 border-r",
      )}
    >
      {Object.entries(filters ?? {})
        .filter(([_, filters]) => filters.length !== 0)
        .map(([key, filters]) => {
          const selectedValues = searchParams?.get(key)?.split(",") || [];

          return (
            <div key={key} className="pl-8 pr-4 pt-4">
              <div className="text-muted-foreground mb-4 text-sm">
                {camelCaseToWords(
                  key.replace("filters", "").replace("count", ""),
                )}
              </div>
              {filters?.map((item) => (
                <div
                  key={item.value}
                  className="mb-4 flex items-center gap-2 pr-2"
                >
                  <Checkbox
                    checked={selectedValues.includes(item.value)}
                    onCheckedChange={(checked) =>
                      updateSearchParams(key, item.value, checked === true)
                    }
                  />
                  <p
                    className={cn(
                      "flex flex-row gap-1 text-nowrap text-[0.8rem]",
                      !lowercase.includes(key) && "capitalize",
                    )}
                  >
                    <span
                      className={item.icon ? "text-[0.75rem]" : "text-[0.8rem]"}
                    >
                      {item.label}
                    </span>{" "}
                    <span className="text-muted-foreground text-lg">
                      ({item.count})
                    </span>
                  </p>
                </div>
              ))}
            </div>
          );
        })}
    </div>
  );
};
