import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";
import { Box, VStack } from "native-base";

import { AppButton, AppText, Card } from "@/src/ui/components";
import { radius, shadows, spacing, useNamiColors } from "@/src/ui/theme";

type MilestoneEmptyStateProps = {
  onAddPress: () => void;
};

export function MilestoneEmptyState({ onAddPress }: MilestoneEmptyStateProps) {
  const theme = useNamiColors();

  return (
    <Card
      className="items-center px-5 py-6"
      style={{
        alignItems: "center",
        gap: spacing[3],
        borderRadius: radius.xxl,
      }}
    >
      <Box
        className="items-center justify-center"
        style={{
          width: 88,
          height: 88,
          borderRadius: radius.xxl,
          backgroundColor: theme.surface,
          ...shadows.sm,
        }}
      >
        <MaterialCommunityIcons name="star-four-points-outline" size={40} color={theme.activity.milestone} />
      </Box>
      <VStack className="items-center" style={{ gap: spacing[1] }}>
        <AppText variant="h3">No milestones yet</AppText>
        <AppText color="textSecondary" className="text-center px-2">
          Save your baby&apos;s first special moments here.
        </AppText>
      </VStack>
      <Box className="w-full mt-1">
        <AppButton label="Add Milestone" onPress={onAddPress} />
      </Box>
    </Card>
  );
}
