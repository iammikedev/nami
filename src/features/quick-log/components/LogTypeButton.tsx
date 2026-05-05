import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Box, Pressable, VStack } from "native-base";
import React from "react";

import type { LogType } from "@/src/features/quick-log/types/quickLog.types";
import { AppText, Card } from "@/src/ui/components";
import { radius, shadows, spacing, useNamiColors } from "@/src/ui/theme";

const iconByType: Record<LogType, keyof typeof MaterialCommunityIcons.glyphMap> = {
  feed: "baby-bottle-outline",
  sleep: "weather-night",
  diaper: "baby-face-outline",
  milestone: "star-four-points",
};

const labelByType: Record<LogType, string> = {
  feed: "Feed",
  sleep: "Sleep",
  diaper: "Diaper",
  milestone: "Milestone",
};

type LogTypeButtonProps = {
  type: LogType;
  onPress?: (type: LogType) => void;
};

export function LogTypeButton({ type, onPress }: LogTypeButtonProps) {
  const theme = useNamiColors();

  return (
    <Pressable onPress={() => onPress?.(type)} className="w-[48.5%]">
      {({ isPressed }) => (
        <Card
          style={[
            {
              minHeight: 122,
              backgroundColor: theme.activity[type],
              borderRadius: radius.xl,
              borderColor: "rgba(47,58,52,0.07)",
              paddingVertical: spacing[4],
              paddingHorizontal: spacing[3],
              transform: [{ scale: isPressed ? 0.97 : 1 }],
              opacity: isPressed ? 0.94 : 1,
            },
            shadows.sm,
          ]}
        >
          <VStack alignItems="center" justifyContent="center" className="flex-1 gap-2">
            <Box className="h-[52px] w-[52px] items-center justify-center rounded-full bg-white/50">
              <MaterialCommunityIcons name={iconByType[type]} size={26} color={theme.textPrimary} />
            </Box>
            <AppText variant="title">{labelByType[type]}</AppText>
          </VStack>
        </Card>
      )}
    </Pressable>
  );
}
