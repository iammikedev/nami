import { Image } from "expo-image";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";
import { Box, HStack, Pressable, VStack } from "native-base";

import { AppText } from "@/src/ui/components";
import { radius, shadows, spacing, useNamiColors } from "@/src/ui/theme";

import type { Milestone } from "../types/milestone.types";

type MilestoneCardProps = {
  milestone: Milestone;
  isLast: boolean;
  onPress?: () => void;
};

function formatSavedDate(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

export function MilestoneCard({ milestone, isLast, onPress }: MilestoneCardProps) {
  const theme = useNamiColors();
  const notePreview =
    milestone.note && milestone.note.length > 72
      ? `${milestone.note.slice(0, 72)}…`
      : milestone.note;

  return (
    <HStack className="items-stretch gap-3">
      <VStack className="items-center pt-1">
        <Box
          className="h-3 w-3 rounded-full"
          style={{ backgroundColor: theme.activity.milestone }}
        />
        {!isLast ? (
          <Box
            className="mt-1 w-0.5 flex-1 min-h-[24px]"
            style={{ backgroundColor: theme.border }}
          />
        ) : null}
      </VStack>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Edit ${milestone.title}`}
        onPress={onPress}
        className="mb-3 flex-1"
        disabled={!onPress}
      >
        {({ isPressed }) => (
          <Box
            className="flex-1 px-4 py-4"
            style={[
              {
                borderRadius: radius.xxl,
                backgroundColor: theme.surfaceElevated,
                borderWidth: 1,
                borderColor: theme.border,
                opacity: onPress ? (isPressed ? 0.92 : 1) : 1,
              },
              shadows.sm,
            ]}
          >
            <HStack className="items-start justify-between gap-3">
              <VStack className="flex-1" style={{ gap: spacing[1] }}>
                <AppText variant="title">{milestone.title}</AppText>
                <HStack className="items-center gap-1">
                  <MaterialCommunityIcons name="calendar-blank-outline" size={14} color={theme.textSecondary} />
                  <AppText variant="caption" color="textSecondary">
                    {formatSavedDate(milestone.createdAt)}
                  </AppText>
                </HStack>
                {notePreview ? (
                  <AppText variant="bodySmall" color="textSecondary" numberOfLines={2}>
                    {notePreview}
                  </AppText>
                ) : null}
              </VStack>
              {milestone.photoUri ? (
                <Image
                  source={{ uri: milestone.photoUri }}
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: radius.lg,
                    borderWidth: 1,
                    borderColor: theme.border,
                  }}
                  contentFit="cover"
                  accessibilityLabel="Milestone photo"
                />
              ) : null}
            </HStack>
          </Box>
        )}
      </Pressable>
    </HStack>
  );
}
