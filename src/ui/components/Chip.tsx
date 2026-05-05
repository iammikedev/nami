import React from "react";
import { Pressable, StyleProp, StyleSheet, ViewStyle } from "react-native";

import { animations, layout, radius, spacing, useAppColors } from "@/src/ui/theme";
import { AppText } from "./AppText";

type ChipProps = {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export function Chip({ label, selected, onPress, style }: ChipProps) {
  const theme = useAppColors();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        {
          minHeight: layout.touchMin,
          backgroundColor: selected ? theme.primary : theme.surfaceElevated,
          borderColor: selected ? theme.primary : theme.border,
          opacity: pressed ? animations.opacity.pressIn : animations.opacity.pressOut,
        },
        style,
      ]}
    >
      <AppText variant="bodySmall">{label}</AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderWidth: 1,
    borderRadius: radius.pill,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[2],
  },
});
