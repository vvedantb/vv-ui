import { View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { useEffect } from "react";
import { cn } from "./cn";

export function Skeleton({ className }: { className?: string }) {
  const opacity = useSharedValue(0.4);

  useEffect(() => {
    opacity.value = withRepeat(withTiming(1, { duration: 800 }), -1, true);
  }, [opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={animatedStyle}
      className={cn("bg-neutral-200 dark:bg-neutral-700 rounded-lg", className)}
    />
  );
}

export function CardSkeleton() {
  return (
    <View className="rounded-lg bg-surface p-5 gap-3">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-16 w-full" />
    </View>
  );
}
