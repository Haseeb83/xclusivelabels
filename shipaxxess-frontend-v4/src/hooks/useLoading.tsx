import { useState } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@client/lib/utils";
import { Button } from "@client/components/ui/button";

export const useLoading = ({
  label,
  click,
  variant,
  icon,
  className,
  type,
  form,
  disabled,
}: {
  label?: string;
  click?: () => void;
  variant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
  icon?: React.JSX.Element;
  className?: string;
  type?: "submit" | "button";
  form?: string;
  disabled?: boolean;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return {
    isLoading,
    setIsLoading,
    button: (
      <Button
        form={form}
        type={type === "button" ? "button" : "submit"}
        variant={variant}
        disabled={isLoading ? isLoading : disabled}
        className={cn("gap-1", className)}
        onClick={click}
      >
        {isLoading ? <Loader2 size={18} className="animate-spin" /> : icon}
        {label}
      </Button>
    ),
  };
};
