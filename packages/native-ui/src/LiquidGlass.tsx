import type { ReactNode } from "react";

export {
  FloatingSurface as LiquidGlass,
  GlassSheetBackground,
} from "./FloatingSurface";

export function GlassBlurProvider({ children }: { children: ReactNode }) {
  return children;
}

export function GlassBlurTarget({ children }: { children: ReactNode }) {
  return children;
}
