import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Box, HStack, VStack } from "native-base";
import React from "react";
import type { StyleProp, ViewStyle } from "react-native";

import { AppText } from "@/src/ui/components";
import { shadows, useNamiColors } from "@/src/ui/theme";

type InsightCardProps = {
  title: string;
  value: string;
  subtitle: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  /** Pastel card background (use theme tokens from caller). */
  backgroundColor: string;
  /** Icon circle fill — usually a slightly stronger tint. */
  iconBackgroundColor: string;
  iconColor: string;
  style?: StyleProp<ViewStyle>;
};

export function InsightCard({
  title,
  value,
  subtitle,
  icon,
  backgroundColor,
  iconBackgroundColor,
  iconColor,
  style,
}: InsightCardProps) {
  const theme = useNamiColors();

  return (
    <Box
      className="rounded-3xl p-5"
      style={[
        shadows.md,
        {
          backgroundColor,
          borderWidth: 1,
          borderColor: theme.border,
        },
        style,
      ]}
    >
      <HStack className="items-start justify-between" space={3}>
        <VStack className="min-w-0 flex-1" space={2}>
          <AppText variant="title" color="textPrimary">
            {title}
          </AppText>
          <AppText variant="display" color="textPrimary" numberOfLines={2}>
            {value}
          </AppText>
          <AppText variant="bodySmall" color="textSecondary">
            {subtitle}
          </AppText>
        </VStack>
        <Box
          className="h-14 w-14 shrink-0 items-center justify-center rounded-2xl"
          style={{ backgroundColor: iconBackgroundColor }}
        >
          <MaterialCommunityIcons name={icon} size={28} color={iconColor} />
        </Box>
      </HStack>
    </Box>
  );
}
