import React from "react";
import { StyleSheet, View } from "react-native";

import { AppText } from "@/src/ui/components";
import { radius, shadows, spacing, useAppColors } from "@/src/ui/theme";

type OnboardingProgressPillProps = {
  step: number;
  totalSteps: number;
};

export function OnboardingProgressPill({
  step,
  totalSteps,
}: OnboardingProgressPillProps) {
  const theme = useAppColors();

  return (
    <View
      style={[
        styles.pill,
        shadows.sm,
        { backgroundColor: theme.surfaceElevated, borderColor: theme.border },
      ]}
    >
      <AppText variant="label">{`${step} / ${totalSteps}`}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    borderWidth: 1,
    borderRadius: radius.pill,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
    alignSelf: "flex-end",
  },
});
