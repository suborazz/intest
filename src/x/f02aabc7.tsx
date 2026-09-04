import { CopyCheckIcon, CopyIcon } from "lucide-react";
import * as React from "react";
import { toast } from "sonner";

import { cn } from "@/x/a85a9c0c";

interface ICopyButtonProps {
  value: string | number;
  label?: string;
  large?: boolean;
}

const CopyButton: React.FunctionComponent<ICopyButtonProps> = ({
  value,
  label,
  large = false,
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigator.clipboard.writeText(value.toString());

    setCopied(true);
    toast.success(
      label ? `${label} copied to the clipboard.` : "Copied to the clipboard.",
    );

    setTimeout(() => setCopied(false), 2000); 
  };

  return (
    <button
      onClick={handleClick}
      type="button"
      className={cn(
        "flex items-center gap-1 transition-transform duration-300 hover:scale-105",
        large ? "border-border rounded-lg border px-3 py-1.5 text-sm" : "p-2",
      )}
    >
      <span className="sr-only">Copy</span>
      {copied ? (
        <>
          <CopyCheckIcon className="!size-3.5 text-green-600" />
        </>
      ) : (
        <CopyIcon className="!size-3.5" />
      )}

      {large && <span className="ml-2">{copied ? "Copied" : "Copy"}</span>}
    </button>
  );
};

const CopyCell: React.FunctionComponent<ICopyButtonProps> = ({
  value,
  label,
  large,
}) => {
  return (
    <div className="text-muted-foreground flex items-center gap-2 font-medium">
      <p
        className={cn(
          "overflow-hidden truncate text-ellipsis",
          !large ? "max-w-20" : "max-w-40",
        )}
      >
        {value}
      </p>
      <CopyButton value={value} label={label} large={large} />
    </div>
  );
};

export { CopyButton, CopyCell };
