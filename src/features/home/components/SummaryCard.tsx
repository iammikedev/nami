import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Box, Pressable, VStack } from "native-base";
import React from "react";

import type { TodaySummaryItem } from "@/src/features/home/types/home.types";
import { AppText } from "@/src/ui/components";
import type { ActivityType } from "@/src/ui/theme";
import { shadows, useNamiColors } from "@/src/ui/theme";

const activityCardBgClass: Record<ActivityType, string> = {
  feed: "bg-nami-feed",
  sleep: "bg-nami-sleep",
  diaper: "bg-nami-diaper",
  milestone: "bg-nami-milestone",
};

type HomeSummaryCardProps = {
  item: TodaySummaryItem;
  onPress?: () => void;
};

export function SummaryCard({ item, onPress }: HomeSummaryCardProps) {
  const theme = useNamiColors();

  return (
    <Pressable onPress={onPress} className="flex-1">
      {({ isPressed }) => (
        <VStack
          alignItems="center"
          justifyContent="center"
          className={`min-h-[174px] w-full flex-1 gap-0.5 rounded-[20px] border border-[rgba(47,58,52,0.05)] px-2 py-3 ${activityCardBgClass[item.type]}`}
          style={[{ opacity: isPressed ? 0.94 : 1 }, shadows.sm]}
        >
          <Box className="mb-1 h-[72px] w-[72px] items-center justify-center rounded-full bg-white/[0.52]">
            <MaterialCommunityIcons
              name={item.icon as keyof typeof MaterialCommunityIcons.glyphMap}
              size={30}
              color={theme.textPrimary}
            />
          </Box>
          <AppText variant="title">{item.label}</AppText>
          <AppText variant="h2" className="leading-[34px]">
            {item.value}
          </AppText>
          <AppText variant="bodySmall" color="textSecondary">
            {item.helper}
          </AppText>
        </VStack>
      )}
    </Pressable>
  );
}
