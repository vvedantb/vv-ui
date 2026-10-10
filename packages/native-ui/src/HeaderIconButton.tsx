import { TouchableOpacity } from "react-native";
import { useLargerText } from "./theme";

export function HeaderIconButton({
  onPress,
  label,
  testID,
  children,
}: {
  onPress: () => void;
  label: string;
  testID?: string;
  children: React.ReactNode;
}) {
  const largerText = useLargerText();
  return (
    <TouchableOpacity
      testID={testID}
      className={`${largerText ? "h-14 w-14" : "h-12 w-12"} items-center justify-center rounded-full border border-white/40 bg-surface dark:border-white/10`}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      hitSlop={8}
      activeOpacity={0.7}
    >
      {children}
    </TouchableOpacity>
  );
}
