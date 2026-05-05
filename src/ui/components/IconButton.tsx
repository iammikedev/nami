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
} from "@/src/ui/theme";

type IconName = ComponentProps<typeof MaterialCommunityIcons>["name"];

type IconButtonProps = {
  icon: IconName;
  onPress?: () => void;
  accessibilityLabel: string;
  size?: keyof typeof iconSizes;
  style?: StyleProp<ViewStyle>;
};

export function IconButton({
  icon,
  onPress,
  accessibilityLabel,
  size = "md",
  style,
}: IconButtonProps) {
  const theme = useAppColors();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        shadows.sm,
        {
          backgroundColor: theme.surfaceElevated,
          borderColor: theme.border,
          opacity: pressed ? animations.opacity.pressIn : animations.opacity.pressOut,
          transform: [{ scale: pressed ? animations.scale.pressIn : animations.scale.pressOut }],
        },
        style,
      ]}
    >
      <MaterialCommunityIcons
        name={icon}
        size={iconSizes[size]}
        color={theme.textPrimary}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    width: layout.touchMin + 4,
    height: layout.touchMin + 4,
    borderRadius: radius.pill,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
