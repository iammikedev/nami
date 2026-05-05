import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React, { ComponentProps } from "react";
import { Pressable, StyleProp, StyleSheet, ViewStyle } from "react-native";

import {
  animations,
  iconSizes,
  layout,
  radius,
  shadows,
  useAppColors,
  zIndex,
} from "@/src/ui/theme";

type IconName = ComponentProps<typeof MaterialCommunityIcons>["name"];

type FloatingActionButtonProps = {
  icon?: IconName;
  onPress?: () => void;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
};

export function FloatingActionButton({
  icon = "plus",
  onPress,
  accessibilityLabel = "Create new log",
  style,
}: FloatingActionButtonProps) {
  const theme = useAppColors();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        shadows.md,
        {
          backgroundColor: theme.primary,
          opacity: pressed ? animations.opacity.pressIn : animations.opacity.pressOut,
          transform: [{ scale: pressed ? animations.scale.pressIn : animations.scale.pressOut }],
        },
        style,
      ]}
    >
      <MaterialCommunityIcons name={icon} size={iconSizes.lg} color={theme.textPrimary} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    width: layout.fabSize,
    height: layout.fabSize,
    borderRadius: radius.pill,
    alignItems: "center",
    justifyContent: "center",
    zIndex: zIndex.floating,
  },
});
