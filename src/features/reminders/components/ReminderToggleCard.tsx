import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Box, HStack, VStack } from "native-base";
import React, { ReactNode } from "react";
import { Switch } from "react-native";

import { AppText } from "@/src/ui/components";
import { radius, shadows, spacing, useNamiColors } from "@/src/ui/theme";

type ReminderToggleCardProps = {
  title: string;
  description: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  iconBackground: string;
  enabled: boolean;
  onEnabledChange: (next: boolean) => void;
  children?: ReactNode;
};

export function ReminderToggleCard({
  title,
  description,
  icon,
  iconBackground,
  enabled,
  onEnabledChange,
  children,
}: ReminderToggleCardProps) {
  const theme = useNamiColors();

  return (
    <Box
      className="border"
      style={[
        {
          borderRadius: radius.xxl,
          borderColor: theme.border,
          backgroundColor: theme.surfaceElevated,
          padding: spacing[4],
        },
        shadows.md,
      ]}
    >
      <HStack className="items-start justify-between" space={3}>
        <HStack className="flex-1 items-start" space={3}>
          <Box
            className="h-12 w-12 items-center justify-center rounded-2xl"
            style={{ backgroundColor: iconBackground }}
          >
            <MaterialCommunityIcons name={icon} size={26} color={theme.textPrimary} />
          </Box>
          <VStack className="flex-1" space={1}>
            <AppText variant="title">{title}</AppText>
            <AppText variant="bodySmall" color="textSecondary">
              {description}
            </AppText>
          </VStack>
        </HStack>
        <Switch
          accessibilityLabel={`${title} reminders`}
          value={enabled}
          onValueChange={onEnabledChange}
          trackColor={{ false: theme.border, true: theme.primary }}
          thumbColor={theme.surfaceElevated}
          ios_backgroundColor={theme.border}
          style={{ transform: [{ scaleX: 1.05 }, { scaleY: 1.05 }] }}
        />
      </HStack>
      {children ? <Box className="mt-1">{children}</Box> : null}
    </Box>
  );
}
