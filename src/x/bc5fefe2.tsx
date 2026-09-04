"use client";

import { CopyButton } from "@/x/f02aabc7";
import { ArrowUpIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { JetBrains_Mono } from "next/font/google";
import Link from "next/link";
import React_2, { useEffect, useRef, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  oneDark,
  oneLight,
} from "react-syntax-highlighter/dist/cjs/styles/prism";

import { cn } from "@/x/a85a9c0c";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/x/d6dae9b4";

const jetBrainsMono_2 = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

interface ITruncatedTextProps extends React_2.HTMLAttributes<HTMLDivElement> {
  width?: number;
  icon?: React_2.ReactNode;
  label: string;
  link?: string;
  bottom?: boolean;
  mono?: boolean;
  isSql?: boolean;
}

export const TruncatedText: React_2.FunctionComponent<ITruncatedTextProps> = ({
  width,
  className,
  icon = null,
  label,
  link,
  bottom = false,
  mono = false,
  isSql = false,
}) => {
  const { resolvedTheme } = useTheme();
  const syntaxTheme = resolvedTheme === "dark" ? oneDark : oneLight;
  const normalizedLabel = isSql ? label.replace(/\s+/g, " ").trim() : label;
  const textRef = useRef<HTMLParagraphElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);

    const checkTruncation = () => {
    if (textRef.current) {
      const isTruncated =
        textRef.current.scrollWidth > textRef.current.clientWidth;
      setIsTruncated(isTruncated);
    }
  };

  useEffect(() => {
    checkTruncation();
  }, [label, width]);

  useEffect(() => {
    window.addEventListener("resize", checkTruncation);
    return () => window.removeEventListener("resize", checkTruncation);
  }, []);

  return (
    <div className="flex min-w-0 items-center gap-2">
      {icon}
      {isTruncated ? (
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex min-w-0 items-center gap-2">
                {link ? (
                  <Link
                    href={link}
                    className="group flex flex-row items-center gap-1"
                  >
                    <p
                      ref={textRef}
                      style={
                        width
                          ? {
                              maxWidth: `${width}px`,
                            }
                          : {}
                      }
                      className={cn(
                        className,
                        (mono || isSql) && jetBrainsMono_2.className,
                        "group-hover:text-primary truncate",
                      )}
                    >
                      {label}
                    </p>
                    <div className="rotate-45">
                      <ArrowUpIcon className="text-muted-foreground hover:text-primary group-hover:text-primary size-3.5 transition-colors duration-200 ease-in-out group-hover:animate-bounce" />
                    </div>
                  </Link>
                ) : (
                  <p
                    ref={textRef}
                    style={
                      width
                        ? {
                            maxWidth: `${width}px`,
                          }
                        : {}
                    }
                    className={cn(
                      className,
                      (mono || isSql) && jetBrainsMono_2.className,
                      "truncate",
                    )}
                  >
                    {label}
                  </p>
                )}
              </div>
            </TooltipTrigger>
            <TooltipContent
              className={cn(
                "relative z-[200] py-1.5",
                isSql ? "w-96 max-w-96 p-0" : "flex flex-row items-start",
              )}
              onClick={(e) => e.stopPropagation()}
              side={bottom ? "bottom" : "top"}
            >
              {isSql ? (
                <div className="relative w-full">
                  <div className="absolute right-1.5 top-1.5 z-10">
                    <CopyButton value={label} label="" />
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    <SyntaxHighlighter
                      language="sql"
                      style={syntaxTheme}
                      wrapLongLines
                      customStyle={{
                        margin: 0,
                        padding: "0.5rem 2.5rem 0.5rem 0.75rem",
                        background: "transparent",
                        fontSize: "0.75rem",
                        whiteSpace: "normal",
                        width: "100%",
                        fontFamily: "inherit",
                      }}
                      codeTagProps={{
                        style: { whiteSpace: "normal" },
                        className: cn(jetBrainsMono_2.className, "font-semibold"),
                      }}
                      PreTag="div"
                    >
                      {normalizedLabel}
                    </SyntaxHighlighter>
                  </div>
                </div>
              ) : (
                <>
                  <p className="max-h-40 w-fit max-w-60 overflow-y-auto text-wrap break-all">
                    {label}
                  </p>
                  <div className="mt-0.5 translate-x-4 pt-0.5">
                    <CopyButton value={label} label="" />
                  </div>
                </>
              )}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : link ? (
        <Link href={link!} className="group flex flex-row items-center gap-1">
          <p
            ref={textRef}
            style={
              width
                ? {
                    maxWidth: `${width}px`,
                  }
                : {}
            }
            className={cn(
              className,
              (mono || isSql) && jetBrainsMono_2.className,
              "group-hover:text-primary truncate",
            )}
          >
            {label}
          </p>
          <div className="rotate-45">
            <ArrowUpIcon className="text-muted-foreground hover:text-primary group-hover:text-primary size-3.5 transition-colors duration-200 ease-in-out group-hover:animate-bounce" />
          </div>
        </Link>
      ) : (
        <p
          ref={textRef}
          style={
            width
              ? {
                  maxWidth: `${width}px`,
                }
              : {}
          }
          className={cn(
            className,
            (mono || isSql) && jetBrainsMono_2.className,
            "truncate",
          )}
        >
          {label}
        </p>
      )}
    </div>
  );
};
