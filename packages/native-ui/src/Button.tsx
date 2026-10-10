import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { PINK_600 } from "./colors";
import { ActivityIndicator, View } from "react-native";
import { Button as PrimitiveButton } from "./primitives/button";
import { Text as PrimitiveText } from "./primitives/text";
import { cn } from "./cn";
import { floatingShadow } from "./floating";
import { useLargerText } from "./theme";

interface ButtonProps extends Omit<
  React.ComponentPropsWithoutRef<typeof PrimitiveButton>,
  "variant" | "size" | "children" | "onPress"
> {
  onPress?: () => void;
  variant?: "primary" | "secondary" | "outline";
  icon?: keyof typeof MaterialIcons.glyphMap;
  leftIcon?: React.ReactNode;
  loading?: boolean;
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
  children: React.ReactNode;
  shadowType?: "flat" | "shadow";
  className?: string;
}

const HEIGHT = {
  regular: { small: "h-12 px-5", medium: "h-14 px-6", large: "h-16 px-6" },
  larger: { small: "h-14 px-5", medium: "h-16 px-6", large: "h-[72px] px-6" },
};

const TEXT = {
  regular: { small: "text-sm", medium: "text-lg", large: "text-xl" },
  larger: { small: "text-base", medium: "text-xl", large: "text-2xl" },
};

export type { ButtonProps };

export function Button({
  onPress,
  variant = "primary",
  icon,
  leftIcon,
  loading,
  size = "medium",
  fullWidth = true,
  children,
  shadowType = "shadow",
  className,
  ...props
}: ButtonProps) {
  const scale = useLargerText() ? "larger" : "regular";
  const isTinted = variant === "outline" || variant === "secondary";
  const contentColor = isTinted ? PINK_600 : "#fff";
  const elevate = shadowType === "shadow" && variant === "primary";

  const variantClassName =
    variant === "outline"
      ? "border-0 bg-pink-50 dark:bg-pink-900/20"
      : variant === "secondary"
        ? "bg-neutral-100 dark:bg-neutral-800"
        : "";

  return (
    <PrimitiveButton
      onPress={onPress}
      variant={variant === "primary" ? "default" : "secondary"}
      hitSlop={size === "small" ? 8 : undefined}
      className={cn(
        "relative rounded-full border border-white/40 dark:border-white/10",
        HEIGHT[scale][size],
        fullWidth && "w-full",
        variantClassName,
        className,
      )}
      {...props}
      disabled={loading || props.disabled}
      style={elevate ? floatingShadow : props.style}
    >
      <View className="flex-row items-center justify-center gap-2">
        {loading ? (
          <ActivityIndicator size="small" color={contentColor} />
        ) : (
          <>
            {leftIcon ??
              (icon ? (
                <MaterialIcons
                  name={icon}
                  size={scale === "larger" ? 26 : 22}
                  color={contentColor}
                />
              ) : null)}
            {typeof children === "string" || typeof children === "number" ? (
              <PrimitiveText
                className={cn(
                  TEXT[scale][size],
                  "font-instrument-sans-semibold",
                  isTinted ? "text-pink-700 dark:text-pink-300" : "text-white",
                )}
              >
                {children}
              </PrimitiveText>
            ) : (
              children
            )}
          </>
        )}
      </View>
    </PrimitiveButton>
  );
}
