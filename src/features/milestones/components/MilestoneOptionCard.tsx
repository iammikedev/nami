import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";
import { Box, Pressable } from "native-base";

import { AppText } from "@/src/ui/components";
import { animations, radius, shadows, useNamiColors } from "@/src/ui/theme";

import type { MilestonePickerOption } from "../utils/milestoneOptions";

type MilestoneOptionCardProps = {
  option: MilestonePickerOption;
  selected: boolean;
  onPress: () => void;
};

export function MilestoneOptionCard({ option, selected, onPress }: MilestoneOptionCardProps) {
  const theme = useNamiColors();
  const accent = theme.activity.milestone;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={option.label}
      accessibilityState={{ selected }}
      onPress={onPress}
    >
      {({ isPressed }) => (
        <Box
          className="flex-row items-center gap-3 px-4 py-4"
          style={[
            {
              borderRadius: radius.xxl,
              backgroundColor: theme.surfaceElevated,
              borderWidth: selected ? 2 : 1,
              borderColor: selected ? accent : theme.border,
              minHeight: 56,
              opacity: isPressed ? animations.opacity.pressIn : 1,
              transform: [{ scale: isPressed ? animations.scale.pressIn : animations.scale.pressOut }],
            },
            !selected && shadows.sm,
          ]}
        >
          <Box
            className="h-11 w-11 items-center justify-center"
            style={{
              borderRadius: radius.lg,
              backgroundColor: selected ? accent : theme.surface,
            }}
          >
            <MaterialCommunityIcons
              name={option.icon}
              size={22}
              color={theme.textPrimary}
            />
          </Box>
          <Box flex={1}>
            <AppText variant="title">{option.label}</AppText>
          </Box>
          {selected ? (
            <MaterialCommunityIcons name="check-circle" size={22} color={theme.textPrimary} />
          ) : null}
        </Box>
      )}
    </Pressable>
  );
}
