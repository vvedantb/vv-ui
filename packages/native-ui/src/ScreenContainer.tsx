import { ScrollView, View, type ViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLargerText } from "./theme";
import { tabBarReserve } from "./floating";

interface ScreenContainerProps extends ViewProps {
  children: React.ReactNode;
  reserveTabBar?: boolean;
  footer?: React.ReactNode;
}

export function ScreenContainer({
  children,
  reserveTabBar = false,
  footer,
  ...props
}: ScreenContainerProps) {
  const insets = useSafeAreaInsets();
  const largerText = useLargerText();
  const bottomPad = reserveTabBar
    ? tabBarReserve(largerText, insets.bottom)
    : 40;

  return (
    <View className="flex-1 bg-transparent" {...props}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1"
        contentContainerStyle={{ paddingBottom: bottomPad }}
      >
        <View className="flex-col gap-4 p-4">{children}</View>
        {footer ? <View className="pt-4">{footer}</View> : null}
      </ScrollView>
    </View>
  );
}
