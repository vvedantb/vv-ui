import type { ComponentType, ReactNode } from "react";
import { View, Text } from "react-native";
import { IconInbox, type IconProps } from "@tabler/icons-react-native";
import { NEUTRAL_500 } from "./colors";
import { cn } from "./cn";
import { useLargerText } from "./theme";

export function EmptyState({
  title,
  description,
  icon: Icon = IconInbox,
  action,
  compact = false,
  testID,
}: {
  title: string;
  description?: string;
  icon?: ComponentType<IconProps>;
  action?: ReactNode;
  compact?: boolean;
  testID?: string;
}) {
  const largerText = useLargerText();
  return (
    <View
      testID={testID}
      className={`items-center px-4 ${compact ? "py-6" : "py-16"}`}
    >
      <Icon size={largerText ? 44 : 40} color={NEUTRAL_500} />
      <Text
        className={cn(
          "mt-4 text-center font-instrument-sans-semibold text-foreground",
          largerText ? "text-xl" : "text-lg",
        )}
      >
        {title}
      </Text>
      {description ? (
        <Text
          className={cn(
            "mt-2 max-w-sm text-center font-instrument-sans text-muted-foreground",
            largerText ? "text-lg" : "text-base",
          )}
        >
          {description}
        </Text>
      ) : null}
      {action ? <View className="mt-6">{action}</View> : null}
    </View>
  );
}
