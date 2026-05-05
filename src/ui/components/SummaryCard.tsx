import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Box, HStack, VStack } from "native-base";
import React from "react";

import { ActivityType, radius, spacing, useNamiColors } from "../theme";
import { AppText } from "./AppText";
import { Card } from "./Card";

type SummaryCardProps = {
  label: string;
  value: string;
  helper: string;
  type?: ActivityType;
};

export function SummaryCard({
  label,
  value,
  helper,
  type = "feed",
}: SummaryCardProps) {
  const theme = useNamiColors();
  return (
    <Card
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: spacing[3],
        padding: spacing[3],
      }}
    >
      <Box
        style={{
          width: 36,
          height: 36,
          borderRadius: radius.lg,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: theme.activity[type],
        }}
      >
        <MaterialCommunityIcons
          name="baby-bottle-outline"
          size={18}
          color={theme.textPrimary}
        />
      </Box>
      <VStack flex={1} space={0.5}>
        <AppText variant="label" color="textSecondary">
          {label}
        </AppText>
        <AppText variant="title">{value}</AppText>
        <AppText variant="caption" color="textSecondary">
          {helper}
        </AppText>
      </VStack>
      <HStack>
        <MaterialCommunityIcons
          name="chevron-right"
          size={18}
          color={theme.textSecondary}
        />
      </HStack>
    </Card>
  );
}
