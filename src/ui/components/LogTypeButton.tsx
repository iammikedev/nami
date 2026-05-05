import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React, { ComponentProps } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import {
  animations,
  colors,
  iconSizes,
  layout,
  radius,
  spacing,
  useAppColors,
} from "@/src/ui/theme";
import { AppText } from "./AppText";

type ActivityType = keyof typeof colors.light.activity;
type IconName = ComponentProps<typeof MaterialCommunityIcons>["name"];

const activityIcons: Record<ActivityType, IconName> = {
  feed: "baby-bottle-outline",
  sleep: "sleep",
  diaper: "baby-face-outline",
  milestone: "star-outline",
};

type LogTypeButtonProps = {
  type: ActivityType;
  label: string;
  onPress?: () => void;
};

export function LogTypeButton({ type, label, onPress }: LogTypeButtonProps) {
  const theme = useAppColors();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Log ${label}`}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        {
          backgroundColor: theme.surfaceElevated,
          borderColor: theme.border,
          opacity: pressed ? animations.opacity.pressIn : animations.opacity.pressOut,
          transform: [{ scale: pressed ? animations.scale.pressIn : animations.scale.pressOut }],
        },
      ]}
    >
      <View style={[styles.iconWrap, { backgroundColor: theme.activity[type] }]}>
        <MaterialCommunityIcons
          name={activityIcons[type]}
          size={iconSizes.md}
          color={theme.textPrimary}
        />
      </View>
      <AppText variant="bodyEmphasis">{label}</AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: layout.touchMin + 10,
    borderRadius: radius.lg,
    borderWidth: 1,
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    alignItems: "center",
    gap: spacing[2],
    flex: 1,
  },
  iconWrap: {
    width: 38,
    height: 38,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
  },
});
