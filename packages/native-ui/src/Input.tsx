import * as React from "react";
import { Input as PrimitiveInput } from "./primitives/input";
import { cn } from "./cn";
import { useLargerText } from "./theme";

type InputProps = React.ComponentPropsWithoutRef<typeof PrimitiveInput> & {
  className?: string;
};

const Input = React.forwardRef<
  React.ElementRef<typeof PrimitiveInput>,
  InputProps
>(({ className, placeholderTextColor, ...props }, ref) => {
  const largerText = useLargerText();
  return (
    <PrimitiveInput
      ref={ref}
      placeholderTextColor={placeholderTextColor ?? "#737373"}
      className={cn(
        "min-h-14 rounded-full border border-white/40 bg-secondary px-4 py-3 text-lg font-instrument-sans-medium text-foreground dark:border-white/10",
        largerText && "min-h-16 py-4 text-xl",
        className,
      )}
      {...props}
    />
  );
});

Input.displayName = "Input";

export { Input };
export type { InputProps };
