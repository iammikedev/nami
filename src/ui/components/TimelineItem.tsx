import React from "react";
import { HStack, VStack } from "native-base";

import { spacing, useNamiColors } from "../theme";
import { AppText } from "./AppText";

type TimelineItemProps = { time: string; title: string; detail?: string };

export function TimelineItem({ time, title, detail }: TimelineItemProps) {
  const theme = useNamiColors();
  return (
    <HStack
      space={spacing[3]}
      py={spacing[3]}
      borderBottomWidth={1}
      borderBottomColor={theme.border}
    >
      <AppText variant="caption" color="textSecondary">{time}</AppText>
      <VStack flex={1} space={0.5}>
        <AppText variant="title">{title}</AppText>
        {detail ? <AppText variant="caption" color="textSecondary">{detail}</AppText> : null}
      </VStack>
    </HStack>
  );
}
