import { cn } from "@/lib/utils";
import { DollarSign } from "lucide-react";

interface AdPlaceholderProps {
  className?: string;
  text?: string;
}

export function AdPlaceholder({ className, text = "Ad Placement" }: AdPlaceholderProps) {
  return (
    <div
      className={cn(
        "flex w-full items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/50",
        "h-48",
        className
      )}
    >
      <div className="text-center text-muted-foreground">
        <DollarSign className="mx-auto h-8 w-8" />
        <p className="mt-2 text-sm font-medium">{text}</p>
      </div>
    </div>
  );
}
