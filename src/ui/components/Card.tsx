import React, { PropsWithChildren } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

import { radius, shadows, spacing, useAppColors } from "@/src/ui/theme";

type CardProps = PropsWithChildren<{
  style?: StyleProp<ViewStyle>;
  elevated?: boolean;
}>;

export function Card({ children, style, elevated = false }: CardProps) {
  const theme = useAppColors();

  return (
    <View
      style={[
        styles.base,
        {
          backgroundColor: theme.surfaceElevated,
          borderColor: theme.border,
        },
        elevated ? shadows.md : shadows.sm,
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderWidth: 1,
    borderRadius: radius.lg,
    padding: spacing[4],
    gap: spacing[2],
  },
});
