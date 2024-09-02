import { cn } from "@client/lib/utils";
import { Loader2 } from "lucide-react";

const Loading = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "h-full w-full py-28 flex items-center justify-center",
        className
      )}
    >
      <Loader2 className="animate-spin" />
    </div>
  );
};

export default Loading;
