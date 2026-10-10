import * as React from "react";
import { Switch as PrimitiveSwitch } from "./primitives/switch";
import { cn } from "./cn";

type SwitchProps = Omit<
  React.ComponentPropsWithoutRef<typeof PrimitiveSwitch>,
  "checked" | "onCheckedChange"
> & {
  value?: boolean;
  checked?: boolean;
  onValueChange?: (value: boolean) => void;
  onCheckedChange?: (value: boolean) => void;
};

const Switch = React.forwardRef<
  React.ElementRef<typeof PrimitiveSwitch>,
  SwitchProps
>(({ value, checked, onValueChange, onCheckedChange, ...props }, ref) => {
  const resolvedValue = checked ?? value ?? false;

  const handleCheckedChange = (nextValue: boolean) => {
    onCheckedChange?.(nextValue);
    onValueChange?.(nextValue);
  };

  return (
    <PrimitiveSwitch
      ref={ref}
      checked={resolvedValue}
      onCheckedChange={handleCheckedChange}
      hitSlop={12}
      className="h-8 w-14"
      thumbClassName={cn(
        "h-7 w-7",
        resolvedValue ? "translate-x-6" : "translate-x-0",
      )}
      {...props}
    />
  );
});

Switch.displayName = "Switch";

export { Switch };
export type { SwitchProps };
