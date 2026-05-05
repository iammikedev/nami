import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";
import { Box, Pressable, VStack } from "native-base";

import { ActivityType, radius, shadows, spacing, useNamiColors } from "../theme";
import { AppText } from "./AppText";

const iconMap: Record<ActivityType, keyof typeof MaterialCommunityIcons.glyphMap> = {
  feed: "baby-bottle-outline",
  sleep: "power-sleep",
  diaper: "baby-face-outline",
  milestone: "star-outline",
};

type LogTypeButtonProps = { type: ActivityType; label: string; onPress?: () => void };

export function LogTypeButton({ type, label, onPress }: LogTypeButtonProps) {
  const theme = useNamiColors();
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        { alignItems: "center", minWidth: 74, gap: spacing[2], opacity: pressed ? 0.85 : 1 },
      ]}
    >
      <Box
        style={[
          {
            width: 64,
            height: 64,
            borderRadius: radius.lg,
            alignItems: "center",
            justifyContent: "center",
          },
          shadows.sm,
          { backgroundColor: theme.activity[type] },
        ]}
      >
        <MaterialCommunityIcons name={iconMap[type]} size={20} color={theme.textPrimary} />
      </Box>
      <VStack>
        <AppText variant="label">{label}</AppText>
      </VStack>
    </Pressable>
  );
}
