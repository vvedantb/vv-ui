import { Platform, StyleSheet, View, type ViewProps } from "react-native";
import { BlurView } from "expo-blur";
import { useColorScheme } from "nativewind";
import { cn } from "./cn";
import {
  floatingFill,
  floatingHairline,
  floatingShadow,
  floatingSolidFill,
  FLOATING_RADIUS,
} from "./floating";
import { useReduceTransparency } from "./useReduceTransparency";

type FloatingSurfaceProps = ViewProps & {
  className?: string;
  radius?: number;
  blur?: boolean;
  elevated?: boolean;
};

export function FloatingSurface({
  className,
  style,
  children,
  radius = FLOATING_RADIUS,
  blur = true,
  elevated = true,
  ...props
}: FloatingSurfaceProps) {
  const { colorScheme } = useColorScheme();
  const reduceTransparency = useReduceTransparency();
  const isDark = colorScheme === "dark";
  const opaqueFill = isDark ? floatingSolidFill.dark : floatingSolidFill.light;
  const translucentFill = isDark ? floatingFill.dark : floatingFill.light;
  const border = isDark ? floatingHairline.dark : floatingHairline.light;
  const useBlur = blur && !reduceTransparency && Platform.OS === "ios";
  const fill =
    Platform.OS === "android" || reduceTransparency || !blur
      ? opaqueFill
      : translucentFill;

  return (
    <View
      className={cn(className)}
      {...props}
      style={[
        { borderRadius: radius },
        elevated ? floatingShadow : null,
        style,
        { backgroundColor: fill },
      ]}
    >
      <View
        style={[
          styles.clip,
          {
            borderRadius: radius,
            borderWidth: StyleSheet.hairlineWidth,
            borderColor: border,
            backgroundColor: useBlur ? "transparent" : fill,
          },
          Platform.OS === "ios" ? styles.continuous : null,
          style != null ? styles.fill : null,
        ]}
      >
        {useBlur ? (
          <BlurView
            pointerEvents="none"
            tint={isDark ? "systemMaterialDark" : "systemMaterialLight"}
            intensity={70}
            style={StyleSheet.absoluteFill}
          />
        ) : null}
        {Platform.OS === "web" && blur && !reduceTransparency ? (
          <View
            pointerEvents="none"
            className="absolute inset-0 backdrop-blur-xl"
            style={{ backgroundColor: translucentFill }}
          />
        ) : null}
        {children}
      </View>
    </View>
  );
}

export function GlassSheetBackground({
  style,
  pointerEvents,
}: {
  style?: ViewProps["style"];
  pointerEvents?: ViewProps["pointerEvents"];
}) {
  return (
    <FloatingSurface
      style={style}
      pointerEvents={pointerEvents}
      radius={20}
      className="rounded-t-[20px]"
    />
  );
}

const styles = StyleSheet.create({
  clip: {
    overflow: "hidden",
  },
  fill: {
    flex: 1,
  },
  continuous: {
    borderCurve: "continuous",
  },
});
