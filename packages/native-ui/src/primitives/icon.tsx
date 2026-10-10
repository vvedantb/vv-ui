import * as React from "react";
import type { LucideIcon, LucideProps } from "lucide-react-native";

type IconProps = LucideProps & {
  as: LucideIcon;
  className?: string;
};

function Icon({ as: Component, className: _className, ...props }: IconProps) {
  return <Component {...props} />;
}

export { Icon };
export type { IconProps };
