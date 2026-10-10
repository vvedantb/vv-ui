import { View } from "react-native";

export function SettingsStack({ children }: { children: React.ReactNode }) {
  return <View className="flex-col gap-8 px-4 pt-2 pb-8">{children}</View>;
}
