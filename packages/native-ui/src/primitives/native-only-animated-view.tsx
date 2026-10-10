import { Platform, View, type ViewProps } from "react-native";
import Animated, { type AnimatedProps } from "react-native-reanimated";

type NativeOnlyAnimatedViewProps = AnimatedProps<ViewProps>;

function NativeOnlyAnimatedView({
  children,
  entering,
  exiting,
  layout,
  ...props
}: NativeOnlyAnimatedViewProps) {
  if (Platform.OS === "web") {
    return <View {...props}>{children}</View>;
  }

  return (
    <Animated.View
      entering={entering}
      exiting={exiting}
      layout={layout}
      {...props}
    >
      {children}
    </Animated.View>
  );
}

export { NativeOnlyAnimatedView };
