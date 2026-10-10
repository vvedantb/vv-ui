import { useEffect, useState } from "react";
import { AccessibilityInfo, Platform } from "react-native";

export function useReduceTransparency() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (
      Platform.OS !== "ios" ||
      typeof AccessibilityInfo.isReduceTransparencyEnabled !== "function"
    ) {
      return;
    }

    void AccessibilityInfo.isReduceTransparencyEnabled().then(setEnabled);
    const subscription = AccessibilityInfo.addEventListener(
      "reduceTransparencyChanged",
      setEnabled,
    );
    return () => subscription.remove();
  }, []);

  return enabled;
}
