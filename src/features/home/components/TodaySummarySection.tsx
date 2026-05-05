import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";
import { Box, HStack, VStack } from "native-base";

import type { TodaySummaryItem } from "@/src/features/home/types/home.types";
import { Card, SectionHeader, AppText } from "@/src/ui/components";
import { radius, spacing, useNamiColors } from "@/src/ui/theme";

type TodaySummarySectionProps = {
  items: TodaySummaryItem[];
};

export function TodaySummarySection({ items }: TodaySummarySectionProps) {
  const theme = useNamiColors();

  return (
    <VStack space={spacing[3]}>
      <SectionHeader title="Today" />
      {items.map((item) => (
        <Card
          key={item.id}
          style={{
            padding: spacing[3],
            borderRadius: radius.xl,
          }}
        >
          <HStack alignItems="center" space={spacing[3]}>
            <Box
              style={{
                width: 38,
                height: 38,
                borderRadius: radius.lg,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: theme.activity[item.type],
              }}
            >
              <MaterialCommunityIcons
                name={item.icon as keyof typeof MaterialCommunityIcons.glyphMap}
                size={20}
                color={theme.textPrimary}
              />
            </Box>
            <VStack flex={1} space={0.5}>
              <AppText variant="label" color="textSecondary">
                {item.label}
              </AppText>
              <AppText variant="title">{item.value}</AppText>
              <AppText variant="caption" color="textSecondary">
                {item.helper}
              </AppText>
            </VStack>
          </HStack>
        </Card>
      ))}
    </VStack>
  );
}
