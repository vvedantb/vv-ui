import { Platform, View, type ViewProps } from "react-native";
import Animated, { type AnimatedProps } from "react-native-reanimated";

type NativeOnlyAnimatedViewProps = ViewProps & {
  entering?: AnimatedProps<ViewProps>["entering"];
  exiting?: AnimatedProps<ViewProps>["exiting"];
  layout?: AnimatedProps<ViewProps>["layout"];
};

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
