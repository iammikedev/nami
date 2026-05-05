import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { VStack } from "native-base";
import React from "react";

import { AppButton, AppText } from "@/src/ui/components";
import { spacing, useNamiColors } from "@/src/ui/theme";

type InsightsEmptyStateProps = {
  onLogPress: () => void;
};

export function InsightsEmptyState({ onLogPress }: InsightsEmptyStateProps) {
  const theme = useNamiColors();

  return (
    <VStack
      className="flex-1 items-center justify-center px-4 py-12"
      style={{ gap: spacing[3] }}
    >
      <MaterialCommunityIcons name="chart-timeline-variant" size={48} color={theme.textSecondary} />
      <VStack className="items-center" style={{ gap: spacing[2] }}>
        <AppText variant="h3" color="textPrimary" className="text-center">
          No data yet today
        </AppText>
        <AppText variant="body" color="textSecondary" className="max-w-[320px] text-center">
          Start logging to see today&apos;s insights.
        </AppText>
      </VStack>
      <AppButton label="+ Log" variant="primary" onPress={onLogPress} iconRight="plus" />
    </VStack>
  );
}
