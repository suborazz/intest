"use client";

import { TruncatedText } from "@/x/bc5fefe2";
import { TRangeFilter } from "@/x/8ad558f9";
import { Checkbox } from "@/x/2d1b7b33";
import { Input } from "@/x/09497c69";
import { RadioGroup, RadioGroupItem } from "@/x/ab4c4bba";
import { motion } from "framer-motion";
import {
  ArrowRightIcon,
  CheckIcon,
  ChevronsUpDownIcon,
  CircleXIcon,
  FilterIcon,
  FilterXIcon,
  PlusCircle,
  XIcon,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React_2, { useEffect, useMemo } from "react";

import { TAlertFilter } from "@/x/c8b27999";
import { cn } from "@/x/a85a9c0c";

import { Badge } from "@/x/51d0133b";
import { Button } from "@/x/3458df31";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/x/74fdabb9";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/x/c1416971";

import { useSidebarStore } from "@/x/13333c09";

interface ISidebarFiltersContextProps {
  open: boolean;
  setOpen: React_2.Dispatch<React_2.SetStateAction<boolean>>;
  selectedFilters: {
    header: string;
    filter_name: string;
    filters: TAlertFilter[];
  }[];
  setSelectedFilter: (
    header: string,
    filter_name: string,
    filters: TAlertFilter[],
  ) => void;
}

export const SidebarFiltersContext =
  React_2.createContext<ISidebarFiltersContextProps | null>(null);

const DEFAULT_TEST_FILTERS_CONTEXT: ISidebarFiltersContextProps = {
  open: false,
  setOpen: (() => {}) as React_2.Dispatch<React_2.SetStateAction<boolean>>,
  selectedFilters: [],
  setSelectedFilter: () => {},
};

export const useSidebarFilters = () => {
  const context = React_2.useContext(SidebarFiltersContext);
  if (!context) {
    if (process.env.NODE_ENV === "test") {
      return DEFAULT_TEST_FILTERS_CONTEXT;
    }
    throw new Error(
      "useSidebarFilters must be used within a SidebarFiltersProvider",
    );
  }
  return context;
};

export const SidebarFiltersProvider: React_2.FC<{
  children: React_2.ReactNode[] | React_2.ReactNode;
  open?: boolean;
  setOpen?: React_2.Dispatch<React_2.SetStateAction<boolean>>;
}> = ({ children, open: paramOpen, setOpen: paramSetOpen }) => {
  const [open, setOpen] = React_2.useState(false);
  const [selectedFilters, setSelectedFilters] = React_2.useState<
    {
      header: string;
      filter_name: string;
      filters: TAlertFilter[];
    }[]
  >([]);

  function setSelectedFilter(
    header: string,
    filter_name: string,
    filters: TAlertFilter[],
  ) {
    setSelectedFilters((prev) => {
      const existingIndex = prev.findIndex((item) => item.header === header);

            if (filters.length === 0) {
        if (existingIndex !== -1) {
          const updated = [...prev];
          updated.splice(existingIndex, 1);
          return updated;
        }
        return prev;
      }

            if (existingIndex !== -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          header,
          filter_name,
          filters,
        };
        return updated;
      }

            return [
        ...prev,
        {
          header,
          filter_name,
          filters,
        },
      ];
    });
  }

  return (
    <SidebarFiltersContext.Provider
      value={{
        open: paramOpen === undefined ? open : paramOpen,
        setOpen: paramSetOpen === undefined ? setOpen : paramSetOpen,
        selectedFilters,
        setSelectedFilter,
      }}
    >
      {children}
    </SidebarFiltersContext.Provider>
  );
};

export const SidebarFiltersTrigger: React_2.FC<{ asChild?: boolean }> = () => {
  const { open, setOpen } = useSidebarFilters();

  return (
    <Button
      variant="outline"
      size="sm"
      className="flex justify-between gap-2"
      onClick={() => setOpen(!open)}
    >
      {open ? (
        <FilterXIcon className="h-3.5 w-3.5" />
      ) : (
        <FilterIcon className="h-3.5 w-3.5" />
      )}
      {open ? "Hide Filters" : "Show Filters"}
    </Button>
  );
};

export const SidebarFilters: React_2.FC<
  { children: React_2.ReactNode } & React_2.HTMLAttributes<HTMLDivElement>
> = ({ children, className }) => {
  return (
    <div className={cn("flex h-full flex-row", className)}>{children}</div>
  );
};

export const SidebarFiltersHeader: React_2.FC<
  {
    children: React_2.ReactNode;
    bordered?: boolean;
    title?: string;
    left?: boolean;
    width?: string;
  } & React_2.HTMLAttributes<HTMLDivElement>
> = ({
  children,
  className = "mr-0 px-3",
  bordered = false,
  left = true,
  width = "w-full",
}) => {
  const { open } = useSidebarFilters();

  return (
    <div
      className={cn(
        "h-full overflow-hidden py-0 transition-all duration-300 will-change-auto [transition-timing-function:cubic-bezier(0.31,0.1,0.08,0.96)]",
        open ? width : "w-0 opacity-0",
        !open && "mr-0",
      )}
    >
      <div
        className={cn(
          "customScroll mr-4 flex h-full shrink-0 flex-col gap-2 overflow-y-auto rounded-lg pb-4 pr-2 pt-1",
          bordered && "border-border border-r",
          left ? "pl-1" : "pl-3",
          className,
        )}
      >
        {}
        {children}
      </div>
    </div>
  );
};

export const SidebarFiltersContent: React_2.FC<
  {
    children: React_2.ReactNode;
    left?: boolean;
    rightSidebarOpen?: boolean;
  } & React_2.HTMLAttributes<HTMLDivElement>
> = ({ children, className, left = true, rightSidebarOpen = false }) => {
  const { open } = useSidebarFilters();
  const { isOpen } = useSidebarStore();
  const baseWidthClass = cn(
    "data-[isopen=true]:data-[open=true]:w-[calc(100vw-35rem)]",
    "data-[isopen=true]:data-[open=false]:w-[calc(100vw-18rem)]",
    "data-[isopen=false]:data-[open=true]:w-[calc(100vw-22rem)]",
    "data-[isopen=false]:data-[open=false]:w-[calc(100vw-6rem)]",
  );

  const rightSidebarAdjustment = rightSidebarOpen
    ? "[&[data-isopen=true][data-open=true]]:w-[calc(100vw-39rem)] \
       [&[data-isopen=true][data-open=false]]:w-[calc(100vw-22rem)] \
       [&[data-isopen=false][data-open=true]]:w-[calc(100vw-26rem)] \
       [&[data-isopen=false][data-open=false]]:w-[calc(100vw-10rem)]"
    : "";
  return (
    <motion.div
      layout
      transition={{ duration: 0.3, ease: "easeInOut" }}
      data-open={open ? "true" : "false"}
      data-isopen={isOpen ? "true" : "false"}
      className={cn(
        "relative flex flex-col transition-all duration-300 ease-in-out",
        baseWidthClass,
        rightSidebarAdjustment,
        className,
      )}
    >
      <SidebarSelectedFilters />
      <div
        className={cn(
          "bg-popover flex h-full flex-col gap-2 overflow-hidden rounded-md pb-4 pl-0 pr-4" +
            (left ? "pr-4" : ""),
        )}
      >
        {children}
      </div>
    </motion.div>
  );
};

export const SidebarSelectedFilters: React_2.FC<Record<string, never>> = () => {
  const { selectedFilters } = useSidebarFilters();

  return (
    <div className="pr-4 pt-2">
      <div
        className={cn(
          "flex flex-row flex-wrap gap-1 rounded-md",
          selectedFilters && selectedFilters.length === 0
            ? ""
            : "border-border mb-4 border py-2",
        )}
      >
        {selectedFilters
          .filter(
            (item) =>
              !(item.header.includes("_end") || item.header.includes("_start")),
          )
          .map((item, index) => (
            <SidebarSelectedFilterGroup
              key={item.header}
              filter_name={item.filter_name}
              header={item.header}
              selectedFilters={item.filters}
              isLast={index === selectedFilters.length - 1}
            />
          ))}

        {selectedFilters
          .filter((item) => item.header.includes("_start"))
          .map((startItem, index, array) => {
            const baseHeader = startItem.header.replace("_start", "");
            const endItem = selectedFilters.find(
              (item) => item.header === `${baseHeader}_end`,
            );

            const combinedHeader = `${startItem.header},${endItem?.header ?? ""}`;
            const startLabel = startItem.filters[0]?.label ?? "";
            const endLabel = endItem?.filters[0]?.label ?? "";

            return (
              <SidebarSelectedFilterGroup
                key={combinedHeader}
                filter_name={startItem.filter_name}
                header={combinedHeader}
                selectedFilters={[
                  {
                    ...startItem.filters[0],
                    label: `${startLabel} - ${endLabel}`,
                  },
                ]}
                isLast={index === array.length - 1}
                range
              />
            );
          })}
      </div>
    </div>
  );
};

export const SidebarSelectedFilterGroup: React_2.FC<{
  header: string;
  filter_name: string;
  selectedFilters: TAlertFilter[];
  isLast: boolean;
  range?: boolean;
}> = ({ header, filter_name, selectedFilters, isLast }) => {
  return (
    <div className="flex w-fit flex-row flex-wrap items-center gap-2 px-3">
      <p className="text-nowrap pr-1 text-[0.8rem] font-medium capitalize">
        {filter_name.replaceAll("_filters", "").replaceAll("_", " ")} :
      </p>
      {selectedFilters.map((selectedFilter) => (
        <SidebarSelectedFilterItem
          key={selectedFilter.value}
          header={header}
          selectedFilter={selectedFilter}
        />
      ))}
      {isLast && <SidebarClearAllSelectedFilters />}
    </div>
  );
};

export const SidebarClearAllSelectedFilters: React_2.FC<
  Record<string, never>
> = () => {
  const searchParams = useSearchParams();

  const router = useRouter();
  const pathname = usePathname();

  const clearAllFilters = () => {
    const params = new URLSearchParams(searchParams?.toString());
    const preservedParams = ["page", "size", "start_time", "end_time"];

    for (const key of Array.from(params.keys())) {
      if (!preservedParams.includes(key)) {
        params.delete(key);
      }
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <Button
      variant={"ghost"}
      size={"sm"}
      className="text-primary hover:bg-primary-foreground hover:text-primary text-[0.75rem] font-medium"
      onClick={clearAllFilters}
    >
      <CircleXIcon />
      Clear All Filters
    </Button>
  );
};

export const SidebarSelectedFilterItem: React_2.FC<{
  header: string;
  selectedFilter: TAlertFilter;
}> = ({ header, selectedFilter }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const capitalize = false;

  const removeSelectFilter = React_2.useCallback(() => {
    const params = new URLSearchParams(searchParams?.toString());

        if (header.includes("_start") || header.includes("_end")) {
      header.split(",").forEach((h) => {
        params.delete(h);
      });
      router.replace(`?${params.toString()}`);
      return;
    }

    const currentValue =
      params.get(header.split(",")[0]) ?? params.get(header.split(",")[1]);
    if (!currentValue) return;

    const values = currentValue.split(","); 
    const updatedValues = values.filter((v) => v !== selectedFilter.value); 

    header.split(",").forEach((h) => {
      if (updatedValues.length === 0) {
        params.delete(h); 
      } else {
        params.set(h, updatedValues.join(","));
        params.set("page", "1");
      }
    });

    router.replace(`?${params.toString()}`);
  }, [searchParams, router, header, selectedFilter.value]);

  return (
    <Badge
      variant="outline"
      className="border-muted flex h-7 w-fit items-center gap-1 rounded-md border-dashed px-1 pl-4"
    >
      <div className="-ml-1">
        <TruncatedText
          className={cn("text-xs", capitalize && "capitalize")}
          label={
            capitalize
              ? selectedFilter.label
                  .toLowerCase()
                  .replaceAll("_", " ")
                  .replaceAll("_filters", "")
              : selectedFilter.label
          }
          width={200}
          icon={<div className="shrink-0">{selectedFilter.icon}</div>}
        />
      </div>

      <Button
        className="ml-1 size-[18px] px-0 py-0"
        variant="ghost"
        onClick={removeSelectFilter}
      >
        <XIcon className="!size-3.5" />
      </Button>
    </Badge>
  );
};

export enum EFilterType {
  TAG = "tag",
  SELECT = "select",
  MULTISELECT = "multiselect",
  RADIO = "radio",
  CHECKBOX = "checkbox",
  RANGE = "range",
}

export const SidebarPopoverFilter: React_2.FC<{
  header: string;
  filter_name: string;
  filters: TAlertFilter[];
  large?: boolean;
  single?: boolean;
  lowercase?: boolean;
  variant: EFilterType.TAG | EFilterType.SELECT | EFilterType.MULTISELECT;
}> = ({
  header,
  filter_name,
  filters,
  large = false,
  single = false,
  variant = EFilterType.TAG,
  lowercase = false,
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const { selectedFilters, setSelectedFilter } = useSidebarFilters();

  const updateSearchParams = React_2.useCallback(
    (value: string, checked: boolean) => {
      const params = new URLSearchParams(searchParams?.toString());

      let updatedValues: string[] = [];

      if (single || variant === EFilterType.SELECT) {
        updatedValues = [value];
      } else {
        const existingValues = params.get(header)?.split(",") ?? [];
        updatedValues = checked
          ? [...existingValues, value]
          : existingValues.filter((v) => v !== value);
      }

      if (updatedValues.length > 0) {
        params.set(header, updatedValues.join(","));
        params.set("page", "1");
      } else {
        params.delete(header);
      }

      replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams, pathname, replace, single, header, variant],
  );

  const removeSearchParams = React_2.useCallback(() => {
    const params = new URLSearchParams(searchParams?.toString());

    params.delete(header);

    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [searchParams, pathname, replace, header]);

  useEffect(() => {
    const selectedValues = searchParams?.get(header)?.split(",") || [];

    const selected = filters
      .filter((filter) => selectedValues.includes(filter.value))
      .map(
        (filter) =>
          ({
            label: filter.label,
            value: filter.value,
            icon: filter.icon,
          }) as TAlertFilter,
      );

    setSelectedFilter(header, filter_name, selected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, header, filters]);

  const selectedFilter = selectedFilters.find((item) => item.header === header);

  return (
    <Popover>
      {variant !== EFilterType.TAG && (
        <div className="mb-1 flex items-center justify-between">
          <FilterHeading>{filter_name}</FilterHeading>
          {selectedFilter && selectedFilter.filters.length > 0 && (
            <ClearFilter onClick={removeSearchParams} />
          )}
        </div>
      )}

      <PopoverTrigger asChild>
        {variant === EFilterType.TAG ? (
          <Button
            variant="outline"
            size="sm"
            className="flex h-9 justify-start gap-2 border-dashed px-2 text-[0.8rem]"
          >
            <PlusCircle className="text-muted-foreground mr-1 h-3 w-3" />
            <p className={cn("font-medium", !lowercase && "capitalize")}>
              {filter_name}
            </p>
            {selectedFilter?.filters && selectedFilter.filters.length > 0 && (
              <Badge
                variant="secondary"
                className="rounded-sm px-1 text-[0.7rem]"
              >
                {selectedFilter.filters.length} selected
              </Badge>
            )}
          </Button>
        ) : (
          <Button
            variant="outline"
            size="sm"
            className="text-muted-foreground flex h-9 w-full flex-shrink-0 justify-between px-3 text-[0.8rem] font-normal"
          >
            {selectedFilter ? (
              variant === EFilterType.SELECT ? (
                <div className="flex flex-row items-center">
                  {selectedFilter.filters[0].icon && (
                    <div className="ml-1 shrink-0">
                      {selectedFilter.filters[0].icon}
                    </div>
                  )}
                  <TruncatedText
                    className={cn(
                      "text-foreground text-[0.8rem]",
                      selectedFilter.filters[0].icon && "ml-2",
                      !lowercase && "capitalize",
                    )}
                    width={selectedFilter.filters[0].icon == null ? 180 : 130}
                    label={selectedFilter.filters[0].label}
                  />
                </div>
              ) : (
                <>{selectedFilter.filters.length} selected</>
              )
            ) : (
              <>
                Select{" "}
                {filter_name
                  .replaceAll("_", " ")
                  .replace("filters", "")
                  .toLowerCase()}
              </>
            )}

            <ChevronsUpDownIcon className="h-4 w-4" />
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent
        className={cn("p-0", large ? "" : "w-[220px] flex-shrink-0")}
        align="start"
      >
        <Command>
          <CommandInput
            className="h-10 text-[0.75rem]"
            placeholder={`Search ${filter_name.replaceAll("_", " ").replace("filters", "")}`}
          />
          <CommandList>
            <CommandEmpty>No filters found.</CommandEmpty>
            <CommandGroup>
              {filters.map((filter) => {
                const isSelected = (selectedFilter?.filters ?? [])
                  .map((item) => item.value)
                  .includes(filter.value);
                return (
                  <CommandItem
                    key={filter.value}
                    onSelect={() => {
                      updateSearchParams(filter.value, !isSelected);
                      if (variant === EFilterType.SELECT && isSelected) {
                        removeSearchParams();
                      }
                    }}
                  >
                    {isSelected ? (
                      <CheckIcon className="mr-2 h-4 w-4 shrink-0" />
                    ) : (
                      <CheckIcon className="mr-2 h-4 w-4 shrink-0 text-transparent" />
                    )}
                    {filter.icon && (
                      <div className="ml-1 shrink-0">{filter.icon}</div>
                    )}
                    <TruncatedText
                      className={cn(
                        "text-foreground text-[0.8rem]",
                        filter.icon && "ml-2",
                        !lowercase && "capitalize",
                      )}
                      width={large ? 200 : filter.icon == null ? 180 : 130}
                      label={filter.label}
                    />

                    <span className="text-muted-foreground ml-auto text-xs">
                      {filter.count}
                    </span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export const SidebarRadioFilter: React_2.FC<{
  header: string;
  filters: TAlertFilter[];
  single?: boolean;
  filter_name: string;
}> = ({ header, filters, filter_name }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const { selectedFilters, setSelectedFilter } = useSidebarFilters();

  const updateSearchParams = React_2.useCallback(
    (value: string, checked: boolean) => {
      const params = new URLSearchParams(searchParams?.toString());

      if (checked) {
        params.set(header, value);
        params.set("page", "1");
      } else {
        params.delete(header);
      }

      replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams, pathname, replace, header],
  );

  const removeSearchParams = React_2.useCallback(() => {
    const params = new URLSearchParams(searchParams?.toString());

    params.delete(header);

    replace(`${pathname}?${params.toString()}`);
  }, [searchParams, pathname, replace, header]);

  useEffect(() => {
    const selectedValues = searchParams?.get(header)?.split(",") || [];

    setSelectedFilter(
      header,
      filter_name,
      filters
        .filter((filter) => selectedValues.includes(filter.value))
        .map(
          (filter) =>
            ({
              label: filter.label,
              value: filter.value,
              icon: filter.icon,
            }) as TAlertFilter,
        ),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, header, filters]);

  const selectedFilter = selectedFilters.find((item) => item.header === header);

  return (
    <div className="space-y-1 rounded-md border border-dashed px-2 py-2">
      <div className="mb-2 flex items-center justify-between">
        <FilterHeading>{filter_name}</FilterHeading>
        {selectedFilter && selectedFilters.filter.length > 0 && (
          <ClearFilter onClick={removeSearchParams} />
        )}
      </div>
      <RadioGroup
        value={selectedFilter?.filters?.[0]?.value}
        onValueChange={(value) => updateSearchParams(value, true)}
        className="gap-1"
      >
        {filters.map((filter) => {
          const isSelected = (selectedFilter?.filters ?? [])
            .map((item) => item.value)
            .includes(filter.value);
          return (
            <label
              key={filter.value}
              htmlFor={filter.value}
              className={cn(
                "hover:bg-accent flex cursor-pointer items-center justify-between rounded-md py-1 pl-1 pr-2 transition-colors",
              )}
            >
              <div className="flex items-center gap-2 pl-[3px]">
                <RadioGroupItem
                  className="border-foreground text-foreground scale-90"
                  value={filter.value}
                  id={filter.value}
                  checked={isSelected}
                  onClick={() => {
                    updateSearchParams(filter.value, !isSelected);
                  }}
                />
                <TruncatedText
                  width={190}
                  label={filter.label}
                  className={"text-[0.8rem] capitalize"}
                  icon={filter.icon}
                />
              </div>
              <span className="text-muted-foreground text-xs">
                {filter.count}
              </span>
            </label>
          );
        })}
      </RadioGroup>
    </div>
  );
};

export const SidebarRangeFilter = ({
  header,
  filter_name,
  rangeFilter,
}: {
  header: string;
  filter_name: string;
  rangeFilter?: TRangeFilter;
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const debounceTimer = React_2.useRef<NodeJS.Timeout | null>(null);

  const { setSelectedFilter } = useSidebarFilters();

  const DEFAULT_MIN = useMemo(() => {
    return Math.floor(Object.values(rangeFilter || {})?.[0]?.start || 0);
  }, [rangeFilter]);

  const DEFAULT_MAX = useMemo(() => {
    return Math.ceil(Object.values(rangeFilter || {})?.[0]?.end || 100);
  }, [rangeFilter]);

  const getInitialValues = (): [number, number] => {
    return [
      Number(searchParams?.get(header + "_start")) || DEFAULT_MIN,
      Number(searchParams?.get(header + "_end")) || DEFAULT_MAX,
    ];
  };

  const [inputValues, setInputValues] =
    React_2.useState<[number, number]>(getInitialValues());
  const [tempValues, setTempValues] = React_2.useState<[string, string]>([
    inputValues[0].toString(),
    inputValues[1].toString(),
  ]);

  const hasActiveFilters =
    (searchParams?.get(`${header}_start`) &&
      searchParams?.get(`${header}_start`) !== DEFAULT_MIN.toString()) ||
    (searchParams?.get(`${header}_end`) &&
      searchParams?.get(`${header}_end`) !== DEFAULT_MAX.toString());

  const updateTempValue = (index: 0 | 1, value: string) => {
    const newTempValues = [...tempValues] as [string, string];
    newTempValues[index] = value;
    setTempValues(newTempValues);
  };

  const applyValues = () => {
    const parsedMin = parseInt(tempValues[0], 10);
    const parsedMax = parseInt(tempValues[1], 10);

        if (
      isNaN(parsedMin) ||
      isNaN(parsedMax) ||
      parsedMin < DEFAULT_MIN ||
      parsedMax > DEFAULT_MAX ||
      parsedMin > parsedMax
    ) {
            setTempValues([inputValues[0].toString(), inputValues[1].toString()]);
      return;
    }

    setInputValues([parsedMin, parsedMax]);

    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      updateSearchParams(parsedMin, parsedMax);
    }, 200);
  };

  const updateSearchParams = (minVal: number, maxVal: number) => {
    const params = new URLSearchParams(searchParams?.toString());
    params.set(`${header}_start`, minVal.toString());
    params.set(`${header}_end`, maxVal.toString());
    params.set("page", "1");

    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  React_2.useEffect(() => {
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, []);

  React_2.useEffect(() => {
    setInputValues(getInitialValues());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, DEFAULT_MIN, DEFAULT_MAX]);

  React_2.useEffect(() => {
    if (inputValues[0] !== DEFAULT_MIN || inputValues[1] !== DEFAULT_MAX) {
      setSelectedFilter(`${header}_start`, filter_name, [
        {
          label: `${inputValues[0]} % `,
          value: inputValues[0].toString(),
          count: null,
        },
      ]);
      setSelectedFilter(`${header}_end`, filter_name, [
        {
          label: `${inputValues[1]} % `,
          value: inputValues[1].toString(),
          count: null,
        },
      ]);
    }

    setTempValues([inputValues[0].toString(), inputValues[1].toString()]);

    if (inputValues[0] === DEFAULT_MIN && inputValues[1] === DEFAULT_MAX) {
      removeRangeSearchParams();
      setSelectedFilter(`${header}_start`, filter_name, []);
      setSelectedFilter(`${header}_end`, filter_name, []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, header, rangeFilter, inputValues]);

  const removeRangeSearchParams = React_2.useCallback(() => {
    const params = new URLSearchParams(searchParams?.toString());
    params.delete(`${header}_start`);
    params.delete(`${header}_end`);
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [searchParams, pathname, replace, header]);

  const clearRangeFilter = () => {
    setInputValues([DEFAULT_MIN, DEFAULT_MAX]);
    setTempValues([DEFAULT_MIN.toString(), DEFAULT_MAX.toString()]);
    removeRangeSearchParams();
  };

  return (
    <div>
      <div className="mb-1 flex items-center justify-between">
        <FilterHeading>{filter_name}</FilterHeading>
        {hasActiveFilters && <ClearFilter onClick={clearRangeFilter} />}
      </div>

      <div className="flex items-center justify-between rounded-md border">
        <Input
          type="number"
          value={tempValues[0]}
          min={DEFAULT_MIN}
          max={DEFAULT_MAX}
          className="h-8 border-none"
          step={1}
          onChange={(e) => updateTempValue(0, e.target.value)}
          onBlur={() => applyValues()}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              applyValues();
            }
          }}
          aria-label="Minimum value"
        />
        <label className="text-muted-foreground mx-1 flex items-center justify-center">
          {" "}
          %{" "}
        </label>
        <div className="text-muted-foreground mx-1 flex items-center justify-center">
          <ArrowRightIcon className="size-3.5" />
        </div>
        <Input
          type="number"
          value={tempValues[1]}
          min={DEFAULT_MIN}
          max={DEFAULT_MAX}
          step={1}
          className="h-8 border-none"
          onChange={(e) => updateTempValue(1, e.target.value)}
          onBlur={() => applyValues()}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              applyValues();
            }
          }}
          aria-label="Maximum value"
        />
        <label className="text-muted-foreground ml-1 mr-3 flex items-center justify-center">
          {" "}
          %{" "}
        </label>
      </div>
    </div>
  );
};

export const SidebarCheckBoxFilter: React_2.FC<{
  header: string;
  filters: TAlertFilter[];
  filter_name: string;
}> = ({ header, filters, filter_name }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const { selectedFilters, setSelectedFilter } = useSidebarFilters();

  useEffect(() => {
    const selectedValues = searchParams?.get(header)?.split(",") || [];

    setSelectedFilter(
      header,
      filter_name,
      filters
        .filter((filter) => selectedValues.includes(filter.value))
        .map(
          (filter) =>
            ({
              label: filter.label,
              value: filter.value,
              icon: filter.icon,
            }) as TAlertFilter,
        ),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, header, filters]);

  const updateSearchParams = React_2.useCallback(
    (value: string, checked: boolean) => {
      const params = new URLSearchParams(searchParams?.toString());

      const existingValues = params.get(header)?.split(",") ?? [];
      const updatedValues = checked
        ? [...existingValues, value]
        : existingValues.filter((v) => v !== value);

      if (updatedValues.length > 0) {
        params.set(header, updatedValues.join(","));
        params.set("page", "1");
      } else {
        params.delete(header);
      }

      replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams, pathname, replace, header],
  );

  const removeSearchParams = React_2.useCallback(() => {
    const params = new URLSearchParams(searchParams?.toString());

    params.delete(header);

    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [searchParams, pathname, replace, header]);

  const selectedFilter = selectedFilters.find((item) => item.header === header);

  return (
    <div className="space-y-1 rounded-md border border-dashed px-2 py-2">
      <div className="mb-2 flex items-center justify-between">
        <FilterHeading>{filter_name}</FilterHeading>
        {selectedFilter && selectedFilter.filters.length > 0 && (
          <ClearFilter onClick={removeSearchParams} />
        )}
      </div>
      {filters.map((filter) => {
        const isSelected = (selectedFilter?.filters ?? [])
          .map((item) => item.value)
          .includes(filter.value);
        return (
          <div
            key={filter.value}
            onClick={() => updateSearchParams(filter.value, !isSelected)}
            className={cn(
              "hover:bg-accent flex cursor-pointer items-center justify-between rounded-md py-1 pl-1 pr-2 transition-colors",
            )}
          >
            <div className="flex items-center gap-2">
              <Checkbox
                                className="scale-75"
                checked={isSelected}
                onCheckedChange={(checked) =>
                  updateSearchParams(filter.value, checked === true)
                }
              />

              <TruncatedText
                width={190}
                label={filter.label}
                className={"text-[0.8rem] capitalize"}
                icon={filter.icon}
              />
            </div>
            <span className="text-muted-foreground text-xs">
              {filter.count}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export interface DropdownFilterProps {
  header: string;
  filters: TAlertFilter[];
  single?: boolean;
  large?: boolean;
  filter_name: string;
  variant?: EFilterType;
  rangeFilter?: TRangeFilter;
}

export const DropdownFilter: React_2.FC<DropdownFilterProps> = ({
  header,
  filters,
  single = false,
  large = false,
  filter_name,
  variant = EFilterType.TAG,
  rangeFilter,
}) => {
  const renderFilters = () => {
    switch (variant) {
      case EFilterType.CHECKBOX:
        return (
          <CheckBoxFilter
            header={header}
            filters={filters}
            filter_name={filter_name}
          />
        );
      case EFilterType.RADIO:
        return (
          <RadioFilter
            header={header}
            filters={filters}
            filter_name={filter_name}
          />
        );

      case EFilterType.RANGE:
        return (
          <RangeFilter_2
            header={header}
            filter_name={filter_name}
            rangeFilter={rangeFilter}
          />
        );

            default:
        return (
          <PopoverFilters
            header={header}
            filters={filters}
            filter_name={filter_name}
            variant={variant}
            large={large}
            single={single}
          />
        );
    }
  };

  return <div className="my-1">{renderFilters()}</div>;
};

function FilterHeading({ children }: { children: string }) {
  return (
    <label className="pl-1 pt-1 text-[0.8rem] capitalize">
      {children.replace("_filters", "").split("_").join(" ")}
    </label>
  );
}

const RangeFilter_2 = ({
  header,
  filter_name,
  rangeFilter,
}: {
  header: string;
  filter_name: string;
  rangeFilter?: TRangeFilter;
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const DEFAULT_MIN =
    Math.floor(Object.values(rangeFilter || {})?.[0]?.start) || 0;
  const DEFAULT_MAX =
    Math.ceil(Object.values(rangeFilter || {})?.[0]?.end) || 100;

  const getInitialValues = (): [string, string] => {
    return [
      searchParams?.get(header + "_start")?.toString() ??
        DEFAULT_MIN.toString(),
      searchParams?.get(header + "_end")?.toString() ?? DEFAULT_MAX.toString(),
    ];
  };

  const [inputValues, setInputValues] =
    React_2.useState<[string, string]>(getInitialValues());

  const hasActiveFilters =
    !!searchParams?.get(`${header}_start`) ||
    !!searchParams?.get(`${header}_end`);

  const updateInputValue = (index: 0 | 1, value: string) => {
    const newInputValues = [...inputValues] as [string, string];
    newInputValues[index] = value;
    setInputValues(newInputValues);
  };

  const handleBlur = (index: 0 | 1) => {
    const newValue = Number(inputValues[index]);
    const paramKey = index === 0 ? `${header}_start` : `${header}_end`;

    if (!isNaN(newValue) && newValue > DEFAULT_MIN && newValue < DEFAULT_MAX) {
      const otherValue = Number(inputValues[index === 0 ? 1 : 0]);
      if (
        (index === 0 && newValue > otherValue) ||
        (index === 1 && newValue < otherValue)
      ) {
        setInputValues(getInitialValues());
        return;
      }

      const params = new URLSearchParams(searchParams?.toString());
      params.set(paramKey, newValue.toString());
      params.set("page", "1");

      replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  };

  const removeRangeSearchParams = React_2.useCallback(() => {
    const params = new URLSearchParams(searchParams?.toString());

    params.delete(header + "_start");
    params.delete(header + "_end");

    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [searchParams, pathname, replace, header]);

  const clearRangeFilter = () => {
    setInputValues([DEFAULT_MIN.toString(), DEFAULT_MAX.toString()]);
    removeRangeSearchParams();
  };

  useEffect(() => {
    if (
      inputValues[0] === DEFAULT_MIN.toString() &&
      inputValues[1] === DEFAULT_MAX.toString()
    ) {
      removeRangeSearchParams();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValues]);

  return (
    <div>
      <div className="mb-1 flex items-center justify-between">
        <FilterHeading>{filter_name}</FilterHeading>
        {hasActiveFilters && <ClearFilter onClick={clearRangeFilter} />}
      </div>

      <div className="flex items-center justify-between rounded-md border">
        <Input
          type="number"
          value={inputValues[0]}
          min={Math.floor(DEFAULT_MIN)}
          max={Math.ceil(DEFAULT_MAX)}
          className="h-8 border-none"
          step={1}
          onChange={(e) => updateInputValue(0, e.target.value)}
          onBlur={() => handleBlur(0)}
          aria-label="Minimum value"
        />
        <label className="text-muted-foreground mx-1 flex items-center justify-center">
          {" "}
          %{" "}
        </label>
        <div className="text-muted-foreground mx-1 flex items-center justify-center">
          <ArrowRightIcon className="size-3.5" />
        </div>
        <Input
          type="number"
          value={inputValues[1]}
          min={Math.floor(DEFAULT_MIN)}
          max={Math.ceil(DEFAULT_MAX)}
          step={1}
          className="h-8 border-none"
          onChange={(e) => updateInputValue(1, e.target.value)}
          onBlur={() => handleBlur(1)}
          aria-label="Maximum value"
        />
        <label className="text-muted-foreground ml-1 mr-3 flex items-center justify-center">
          {" "}
          %{" "}
        </label>
      </div>
    </div>
  );
};

const CheckBoxFilter = ({
  header,
  filters,
  single,
  filter_name,
}: {
  header: string;
  filters: TAlertFilter[];
  single?: boolean;
  large?: boolean;
  filter_name: string;
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const selectedValues = searchParams?.get(header)?.split(",") || [];

  const updateSearchParams = React_2.useCallback(
    (value: string, checked: boolean) => {
      const params = new URLSearchParams(searchParams?.toString());

      const existingValues = params.get(header)?.split(",") ?? [];
      const updatedValues = checked
        ? [...existingValues, value]
        : existingValues.filter((v) => v !== value);

      if (updatedValues.length > 0) {
        params.set(header, updatedValues.join(","));
        params.set("page", "1");
      } else {
        params.delete(header);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchParams, pathname, replace, single, header],
  );

  const removeSearchParams = React_2.useCallback(() => {
    const params = new URLSearchParams(searchParams?.toString());

    params.delete(header);

    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [searchParams, pathname, replace, header]);

  return (
    <div className="space-y-1">
      <div className="mb-1 flex items-center justify-between">
        <FilterHeading>{filter_name}</FilterHeading>
        {selectedValues.length > 0 && (
          <ClearFilter onClick={removeSearchParams} />
        )}
      </div>
      {filters.map((filter) => {
        const isSelected = selectedValues.includes(filter.value);
        return (
          <div
            key={filter.value}
            onClick={() => updateSearchParams(filter.value, !isSelected)}
            className={cn(
              "hover:bg-accent flex cursor-pointer items-center justify-between rounded-md px-2 py-1 transition-colors",
              isSelected && "bg-muted",
            )}
          >
            <div className="flex items-center gap-2">
              <Checkbox
                className="scale-75"
                checked={isSelected}
                onCheckedChange={(checked) =>
                  updateSearchParams(filter.value, checked === true)
                }
              />

              <TruncatedText
                width={190}
                label={filter.label}
                className={"text-sm capitalize"}
                icon={filter.icon}
              />
            </div>
            <span className="text-muted-foreground text-xs">
              {filter.count}
            </span>
          </div>
        );
      })}
    </div>
  );
};

const RadioFilter = ({
  header,
  filters,
  single,
  filter_name,
}: {
  header: string;
  filters: TAlertFilter[];
  single?: boolean;
  filter_name: string;
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const updateSearchParams = React_2.useCallback(
    (value: string, checked: boolean) => {
      const params = new URLSearchParams(searchParams?.toString());

      if (checked) {
        params.set(header, value);
        params.set("page", "1");
      } else {
        params.delete(header);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchParams, pathname, replace, single, header],
  );

  const removeSearchParams = React_2.useCallback(() => {
    const params = new URLSearchParams(searchParams?.toString());

    params.delete(header);

    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [searchParams, pathname, replace, header]);

  const selectedValues = searchParams?.get(header)?.split(",") || [];

  return (
    <div className="space-y-1">
      <div className="mb-1 flex items-center justify-between">
        <FilterHeading>{filter_name}</FilterHeading>
        {selectedValues.length > 0 && (
          <ClearFilter onClick={removeSearchParams} />
        )}
      </div>
      <RadioGroup
        value={selectedValues[0] || ""}
        onValueChange={(value) => updateSearchParams(value, true)}
        className="space-y-1"
      >
        {filters.map((filter) => {
          const isSelected = selectedValues.includes(filter.value);
          return (
            <label
              key={filter.value}
              htmlFor={filter.value}
              className={cn(
                "hover:bg-accent flex cursor-pointer items-center justify-between rounded-md px-2 py-1 transition-colors",
                isSelected && "bg-muted",
              )}
            >
              <div className="flex items-center gap-2">
                <RadioGroupItem
                  value={filter.value}
                  id={filter.value}
                  checked={isSelected}
                />
                <TruncatedText
                  width={190}
                  label={filter.label}
                  className="text-sm capitalize"
                />
              </div>
              <span className="text-muted-foreground text-xs">
                {filter.count}
              </span>
            </label>
          );
        })}
      </RadioGroup>
    </div>
  );
};

export const PopoverFilters = ({
  header,
  filters,
  single,
  filter_name,
  variant,
  large,
}: {
  header: string;
  filters: TAlertFilter[];
  single?: boolean;
  filter_name: string;
  large?: boolean;
  variant: EFilterType.TAG | EFilterType.SELECT | EFilterType.MULTISELECT;
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const updateSearchParams = React_2.useCallback(
    (value: string, checked: boolean) => {
      const params = new URLSearchParams(searchParams?.toString());

      let updatedValues: string[] = [];

      if (single || variant === EFilterType.SELECT) {
        updatedValues = [value];
      } else {
        const existingValues = params.get(header)?.split(",") ?? [];
        updatedValues = checked
          ? [...existingValues, value]
          : existingValues.filter((v) => v !== value);
      }

      if (updatedValues.length > 0) {
        params.set(header, updatedValues.join(","));
        params.set("page", "1");
      } else {
        params.delete(header);
      }

      replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams, pathname, replace, single, header, variant],
  );

  const removeSearchParams = React_2.useCallback(() => {
    const params = new URLSearchParams(searchParams?.toString());

    params.delete(header);

    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [searchParams, pathname, replace, header]);

  const selectedValues = searchParams?.get(header)?.split(",") || [];

  return (
    <Popover>
      {variant !== EFilterType.TAG && (
        <div className="mb-1 flex items-center justify-between">
          <FilterHeading>{filter_name}</FilterHeading>
          {selectedValues.length > 0 && (
            <ClearFilter onClick={removeSearchParams} />
          )}
        </div>
      )}

      <PopoverTrigger asChild>
        {variant === EFilterType.TAG ? (
          <Button
            variant="outline"
            size="sm"
            className="flex h-9 justify-start gap-2 border-dashed px-2 text-[0.8rem]"
          >
            <PlusCircle className="text-muted-foreground !size-3.5" />
            <p className="font-medium capitalize">{filter_name}</p>
            {selectedValues.length > 0 && (
              <Badge
                variant="secondary"
                className="rounded-sm px-1 text-[0.7rem]"
              >
                {selectedValues.length} selected
              </Badge>
            )}
          </Button>
        ) : (
          <Button
            variant="outline"
            size="sm"
            className="text-muted-foreground flex h-9 w-full justify-between px-3 text-[0.8rem] font-normal"
          >
            {selectedValues.length > 0 ? (
              <>{selectedValues.length} selected</>
            ) : (
              <>
                Select{" "}
                {filter_name
                  .replaceAll("_", " ")
                  .replace("filters", "")
                  .toLowerCase()}
              </>
            )}

            <ChevronsUpDownIcon className="h-4 w-4" />
          </Button>
        )}
      </PopoverTrigger>
      {selectedValues.length > 0 && variant !== EFilterType.TAG && (
        <div className="flex flex-wrap gap-1 py-1">
          {filters
            .filter((filter) => selectedValues.includes(filter.value))
            .map((filter) => (
              <Badge
                key={filter.value}
                variant={"outline"}
                className="flex w-fit cursor-pointer items-center gap-1"
              >
                <div className="-ml-2">
                  <TruncatedText
                    className="-m-1 cursor-pointer text-xs"
                    label={filter.label}
                    width={120}
                    icon={<div className="scale-75">{filter.icon}</div>}
                  />
                </div>

                <XIcon
                  className="h-3 w-3"
                  onClick={() => updateSearchParams(filter.value, false)}
                />
              </Badge>
            ))}
        </div>
      )}

      <PopoverContent
        className={cn("p-0", large ? "" : "w-[200px] flex-shrink-0")}
        align="start"
      >
        <Command>
          <CommandInput
            placeholder={`Search ${filter_name.replaceAll("_", " ").replace("filters", "")}`}
          />
          <CommandList>
            <CommandEmpty>No filters found.</CommandEmpty>
            <CommandGroup>
              {filters.map((filter) => {
                const isSelected = selectedValues.includes(filter.value);
                return (
                  <CommandItem
                    key={filter.value}
                    onSelect={() =>
                      updateSearchParams(filter.value, !isSelected)
                    }
                  >
                    {isSelected ? (
                      <CheckIcon className="mr-2 h-4 w-4 shrink-0" />
                    ) : (
                      <CheckIcon className="mr-2 h-4 w-4 shrink-0 text-transparent" />
                    )}
                    {filter.icon && (
                      <div className="ml-1 shrink-0">{filter.icon}</div>
                    )}
                    <TruncatedText
                      className={cn(
                        "text-foreground",
                        filter.icon ? "ml-2" : "capitalize",
                      )}
                      width={180}
                      label={filter.label.replaceAll("_", " ")}
                    />

                    <span className="text-muted-foreground ml-auto text-xs">
                      {filter.count}
                    </span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
        <Command>
          {selectedValues.length > 0 && (
            <>
              <CommandSeparator />
              <CommandGroup>
                <CommandItem
                  onSelect={removeSearchParams}
                  className="justify-center text-center"
                >
                  Clear filters
                </CommandItem>
              </CommandGroup>
            </>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  );
};

const ClearFilter = ({ onClick }: { onClick: () => void }) => {
  return (
    <Badge
      variant="secondary"
      className="cursor-pointer rounded-sm px-1 text-[0.7rem] font-normal"
      onClick={onClick}
    >
      Clear filter
    </Badge>
  );
};
