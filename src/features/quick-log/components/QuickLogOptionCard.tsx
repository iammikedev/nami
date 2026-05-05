import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";
import { Box, HStack, Pressable } from "native-base";

import { AppText, Card } from "@/src/ui/components";
import { radius, spacing, useNamiColors } from "@/src/ui/theme";

type QuickLogOptionCardProps = {
  title: string;
  subtitle: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  colorKey: "feed" | "sleep" | "diaper" | "milestone";
  onPress?: () => void;
};

export function QuickLogOptionCard({
  title,
  subtitle,
  icon,
  colorKey,
  onPress,
}: QuickLogOptionCardProps) {
  const theme = useNamiColors();

  return (
    <Pressable onPress={onPress}>
      {({ isPressed }) => (
        <Card
          style={{
            padding: spacing[3],
            borderRadius: radius.xl,
            opacity: isPressed ? 0.9 : 1,
            transform: [{ scale: isPressed ? 0.98 : 1 }],
          }}
        >
          <HStack alignItems="center" space={spacing[3]}>
            <Box
              style={{
                width: 40,
                height: 40,
                borderRadius: radius.lg,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: theme.activity[colorKey],
              }}
            >
              <MaterialCommunityIcons name={icon} size={20} color={theme.textPrimary} />
            </Box>
            <Box flex={1}>
              <AppText variant="title">{title}</AppText>
              <AppText variant="caption" color="textSecondary">
                {subtitle}
              </AppText>
            </Box>
            <MaterialCommunityIcons
              name="chevron-right"
              size={18}
              color={theme.textSecondary}
            />
          </HStack>
        </Card>
      )}
    </Pressable>
  );
}
