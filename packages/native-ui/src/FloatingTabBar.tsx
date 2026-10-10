import type { ComponentProps } from "react";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Tabs } from "expo-router";
import { selectionHaptic } from "./haptics";
import { FloatingSurface } from "./FloatingSurface";
import { useLargerText } from "./theme";
import {
  FLOATING_INSET,
  FLOATING_PILL_RADIUS,
  FLOATING_TAB_BAR_HEIGHT,
  FLOATING_TAB_BAR_HEIGHT_LARGE,
} from "./floating";

type TabBarProps = Parameters<
  NonNullable<ComponentProps<typeof Tabs>["tabBar"]>
>[0];

export function FloatingTabBar({
  state,
  descriptors,
  navigation,
}: TabBarProps) {
  const insets = useSafeAreaInsets();
  const largerText = useLargerText();
  const height = largerText
    ? FLOATING_TAB_BAR_HEIGHT_LARGE
    : FLOATING_TAB_BAR_HEIGHT;

  return (
    <View
      pointerEvents="box-none"
      style={{
        position: "absolute",
        left: FLOATING_INSET,
        right: FLOATING_INSET,
        bottom: FLOATING_INSET + Math.max(insets.bottom, 8),
      }}
    >
      <FloatingSurface radius={FLOATING_PILL_RADIUS}>
        <View
          className="flex-row items-center justify-around px-2"
          style={{ height }}
          accessibilityRole="tablist"
        >
          {state.routes.map((route, index) => {
            const focused = state.index === index;
            const options = descriptors[route.key]?.options;
            if (!options) {
              return null;
            }
            const label =
              typeof options.tabBarLabel === "string"
                ? options.tabBarLabel
                : typeof options.title === "string"
                  ? options.title
                  : route.name;
            const color = focused
              ? options.tabBarActiveTintColor
              : options.tabBarInactiveTintColor;
            const onPress = () => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });
              if (!focused && !event.defaultPrevented) {
                selectionHaptic();
                navigation.navigate(route.name, route.params);
              }
            };

            return (
              <Pressable
                key={route.key}
                testID={options.tabBarButtonTestID}
                accessibilityRole="tab"
                accessibilityState={{ selected: focused }}
                accessibilityLabel={options.tabBarAccessibilityLabel ?? label}
                onPress={onPress}
                className="min-h-12 min-w-12 flex-1 items-center justify-center gap-1"
                style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
              >
                {options.tabBarIcon
                  ? options.tabBarIcon({
                      focused,
                      color: color ?? "#737373",
                      size: largerText ? 28 : 24,
                    })
                  : null}
                <Text
                  numberOfLines={1}
                  className={`font-instrument-sans-semibold ${
                    largerText ? "text-base" : "text-sm"
                  }`}
                  style={{ color }}
                >
                  {label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </FloatingSurface>
    </View>
  );
}
