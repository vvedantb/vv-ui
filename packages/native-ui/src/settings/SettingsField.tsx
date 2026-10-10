import { View, Text } from "react-native";

export function SettingsField({
  label,
  description,
  children,
}: {
  label: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <View>
      {typeof label === "string" ? (
        <Text className="mb-2 text-base font-instrument-sans-semibold text-foreground">
          {label}
        </Text>
      ) : (
        label
      )}
      {children}
      {description != null ? (
        typeof description === "string" ? (
          <Text className="mt-1.5 text-sm font-instrument-sans text-muted-foreground">
            {description}
          </Text>
        ) : (
          description
        )
      ) : null}
    </View>
  );
}
