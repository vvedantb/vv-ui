import { StyleSheet, View, type ViewProps } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useColorScheme } from "nativewind";
import { cn } from "./cn";

const LIGHT = ["#f6f6f7", "#fde8f0", "#f4f5f7"] as const;
const DARK = ["#1c1c1e", "#2a1820", "#1a1a1c"] as const;

export function AmbientBackground({
  children,
  className,
  ...props
}: ViewProps & { className?: string }) {
  const { colorScheme } = useColorScheme();
  const colors = colorScheme === "dark" ? DARK : LIGHT;

  return (
    <View className={cn("flex-1", className)} {...props}>
      <LinearGradient
        pointerEvents="none"
        colors={[...colors]}
        start={{ x: 0.05, y: 0 }}
        end={{ x: 0.95, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      {children}
    </View>
  );
}
