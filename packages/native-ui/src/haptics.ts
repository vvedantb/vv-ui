import { Platform } from "react-native";
import * as Haptics from "expo-haptics";

export function selectionHaptic() {
  if (Platform.OS === "web") {
    return;
  }
  void Haptics.selectionAsync();
}
