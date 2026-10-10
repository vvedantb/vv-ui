import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const SafeAreaContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="bg-transparent"
      style={{
        flex: 1,
        justifyContent: "space-between",
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      {children}
    </View>
  );
};
