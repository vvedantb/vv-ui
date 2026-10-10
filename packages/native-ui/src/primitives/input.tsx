import * as React from "react";
import { Platform, TextInput } from "react-native";
import { cn } from "../cn";

type InputProps = React.ComponentPropsWithoutRef<typeof TextInput> & {
  className?: string;
};

const Input = React.forwardRef<React.ElementRef<typeof TextInput>, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <TextInput
        ref={ref}
        className={cn(
          "flex w-full flex-row items-center rounded-lg border-0 bg-secondary px-3 py-2 text-base text-foreground",
          props.editable === false &&
            cn(
              "opacity-50",
              Platform.select({
                web: "cursor-not-allowed pointer-events-none",
              }),
            ),
          Platform.select({
            web: "outline-none transition-[color,box-shadow] md:text-sm",
            native: "placeholder:text-muted-foreground/50",
          }),
          className,
        )}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";

export { Input };
