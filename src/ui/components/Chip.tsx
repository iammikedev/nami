import React from "react";
import { Pressable } from "native-base";

import { radius, spacing, useNamiColors } from "../theme";
import { AppText } from "./AppText";

type ChipProps = { label: string; selected?: boolean; onPress?: () => void };

export function Chip({ label, selected, onPress }: ChipProps) {
  const theme = useNamiColors();
  return (
    <Pressable
      onPress={onPress}
      style={[
        {
          borderWidth: 1,
          borderRadius: radius.pill,
          paddingHorizontal: spacing[3],
          paddingVertical: spacing[1],
          minHeight: 32,
          justifyContent: "center",
        },
        {
          backgroundColor: selected ? theme.primary : theme.surfaceElevated,
          borderColor: selected ? theme.primary : theme.border,
        },
      ]}
    >
      <AppText variant="label" color={selected ? "textPrimary" : "textSecondary"}>{label}</AppText>
    </Pressable>
  );
}
