import type { ComponentType, ReactNode } from "react";
import type { IconProps } from "@tabler/icons-react-native";
import { View } from "react-native";
import {
  Card as PrimitiveCard,
  CardContent,
  CardHeader,
  CardTitle,
} from "./primitives/card";
import { FloatingSurface } from "./FloatingSurface";
import { cn } from "./cn";
import { useAccentColor, useLargerText } from "./theme";

export function Card({
  children,
  title,
  action,
  leftIcon: Icon,
  testID,
}: {
  children: ReactNode;
  title?: string;
  action?: ReactNode;
  leftIcon?: ComponentType<IconProps>;
  testID?: string;
}) {
  const largerText = useLargerText();
  const accentColor = useAccentColor();
  const hasHeader = Boolean(title || action);
  return (
    <FloatingSurface>
      <PrimitiveCard
        testID={testID}
        className="gap-4 rounded-none border-0 bg-transparent py-4"
      >
        {hasHeader && (
          <CardHeader className="px-4 py-0">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-2">
                {Icon && (
                  <Icon size={largerText ? 28 : 24} color={accentColor} />
                )}
                {title ? (
                  <CardTitle
                    className={cn(
                      "font-instrument-sans-bold text-foreground",
                      largerText ? "text-2xl" : "text-xl",
                    )}
                  >
                    {title}
                  </CardTitle>
                ) : null}
              </View>
              {action}
            </View>
          </CardHeader>
        )}
        <CardContent className={cn(hasHeader && "pt-0", "px-4")}>
          {children}
        </CardContent>
      </PrimitiveCard>
    </FloatingSurface>
  );
}
