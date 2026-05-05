import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";
import { HStack, VStack, Box } from "native-base";

import { ActivityType, radius, spacing, useNamiColors } from "../theme";
import { AppText } from "./AppText";
import { Card } from "./Card";

type ActivityCardProps = {
  type: ActivityType;
  title: string;
  detail?: string;
  timestamp: string;
};

export function ActivityCard({
  type,
  title,
  detail,
  timestamp,
}: ActivityCardProps) {
  const theme = useNamiColors();
  return (
    <Card style={{ padding: spacing[3] }}>
      <HStack alignItems="center" space={spacing[3]}>
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
          name="star-four-points-outline"
          size={18}
          color={theme.textPrimary}
        />
        </Box>
        <VStack flex={1} space={0.5}>
          <AppText variant="title">{title}</AppText>
          {detail ? (
            <AppText variant="caption" color="textSecondary">
              {detail}
            </AppText>
          ) : null}
          <AppText variant="caption" color="textSecondary">
            {timestamp}
          </AppText>
        </VStack>
        <MaterialCommunityIcons
          name="chevron-right"
          size={18}
          color={theme.textSecondary}
        />
      </HStack>
    </Card>
  );
}
