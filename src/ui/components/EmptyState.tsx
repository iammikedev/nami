import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";
import { StyleSheet, View } from "react-native";

import { iconSizes, radius, spacing, useAppColors } from "@/src/ui/theme";
import { AppButton } from "./AppButton";
import { AppText } from "./AppText";

type EmptyStateProps = {
  title: string;
  message: string;
  actionLabel?: string;
  onActionPress?: () => void;
};

export function EmptyState({
  title,
  message,
  actionLabel,
  onActionPress,
}: EmptyStateProps) {
  const theme = useAppColors();

  return (
    <View style={[styles.base, { borderColor: theme.border, backgroundColor: theme.muted }]}>
      <View style={[styles.iconWrap, { backgroundColor: theme.surfaceElevated }]}>
        <MaterialCommunityIcons
          name="baby-face-outline"
          size={iconSizes.lg}
          color={theme.textSecondary}
        />
      </View>
      <AppText variant="titleSmall" align="center">
        {title}
      </AppText>
      <AppText variant="bodySmall" color={theme.textSecondary} align="center">
        {message}
      </AppText>
      {actionLabel ? (
        <AppButton label={actionLabel} onPress={onActionPress} variant="secondary" />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderWidth: 1,
    borderRadius: radius.xl,
    padding: spacing[6],
    gap: spacing[3],
    alignItems: "center",
  },
  iconWrap: {
    width: 52,
    height: 52,
    borderRadius: radius.pill,
    alignItems: "center",
    justifyContent: "center",
  },
});
