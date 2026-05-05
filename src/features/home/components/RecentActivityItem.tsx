import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";
import { Box, HStack, Pressable, VStack } from "native-base";

import type { RecentActivityItem as RecentActivityItemType } from "@/src/features/home/types/home.types";
import { AppText } from "@/src/ui/components";
import type { ActivityType } from "@/src/ui/theme";
import { shadows, useNamiColors } from "@/src/ui/theme";

const iconByType = {
  feed: "baby-bottle-outline",
  sleep: "weather-night",
  diaper: "baby-face-outline",
  milestone: "star-four-points-outline",
} as const;

const activityBadgeClass: Record<ActivityType, string> = {
  feed: "bg-nami-feed/40",
  sleep: "bg-nami-sleep/40",
  diaper: "bg-nami-diaper/40",
  milestone: "bg-nami-milestone/40",
};

const activityTitleClass: Record<ActivityType, string> = {
  feed: "text-[#7C4A2A]",
  sleep: "text-[#5C3B74]",
  diaper: "text-[#2E5C83]",
  milestone: "text-[#7B5A00]",
};

type RecentActivityItemProps = {
  item: RecentActivityItemType;
};

export function RecentActivityItem({ item }: RecentActivityItemProps) {
  const theme = useNamiColors();
  const detail = item.detail ?? item.subtitle ?? "--";
  const timestamp = item.timestamp ?? item.relativeTime ?? "--";

  return (
    <Pressable>
      {({ isPressed }) => (
        <HStack
          alignItems="center"
          className="min-h-[88px] w-full rounded-[18px] border border-[#EFE7DB] bg-white px-3.5 py-3"
          style={[shadows.sm, { opacity: isPressed ? 0.95 : 1 }]}
        >
          <Box
            className={`h-[52px] w-[52px] items-center justify-center rounded-full ${activityBadgeClass[item.type]}`}
          >
            <MaterialCommunityIcons
              name={iconByType[item.type]}
              size={26}
              color={theme.textPrimary}
            />
          </Box>

          <VStack className="ml-3 flex-1">
            <AppText variant="title" className={activityTitleClass[item.type]}>
              {item.title}
            </AppText>
            <HStack alignItems="center" className="mt-0.5 gap-2">
              <AppText color="textSecondary">{detail}</AppText>
              <Box
                className="h-[7px] w-[7px] rounded-full"
                style={{ backgroundColor: theme.activity[item.type] }}
              />
            </HStack>
          </VStack>

          <HStack alignItems="center" className="ml-2 gap-0.5">
            <AppText color="textSecondary" className="text-[16px] leading-[24px]">
              {timestamp}
            </AppText>
            <MaterialCommunityIcons
              name="chevron-right"
              size={19}
              color={theme.textSecondary}
            />
          </HStack>
        </HStack>
      )}
    </Pressable>
  );
}
