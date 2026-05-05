import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { spacing, useAppColors } from "@/src/ui/theme";
import { AppText } from "./AppText";

type SectionHeaderProps = {
  title: string;
  actionLabel?: string;
  onActionPress?: () => void;
};

export function SectionHeader({
  title,
  actionLabel,
  onActionPress,
}: SectionHeaderProps) {
  const theme = useAppColors();

  return (
    <View style={styles.row}>
      <AppText variant="titleSmall">{title}</AppText>
      {actionLabel ? (
        <Pressable accessibilityRole="button" onPress={onActionPress}>
          <AppText variant="bodySmall" color={theme.textSecondary}>
            {actionLabel}
          </AppText>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing[3],
  },
});
