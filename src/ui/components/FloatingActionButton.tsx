import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Pressable } from "native-base";
import React from "react";
import { StyleProp, ViewStyle } from "react-native";

import { layout, radius, shadows, useNamiColors } from "../theme";
import { AppText } from "./AppText";

type FloatingActionButtonProps = {
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  label?: string;
  iconName?: keyof typeof MaterialCommunityIcons.glyphMap;
  iconColor?: string;
  textColor?: string;
  borderColor?: string;
};

export function FloatingActionButton({
  onPress,
  style,
  label,
  iconName = "plus",
  iconColor,
  textColor,
  borderColor,
}: FloatingActionButtonProps) {
  const theme = useNamiColors();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Add new entry"
      onPress={onPress}
      style={({ pressed }) => [
        {
          minWidth: layout.touchMin + 8,
          height: layout.touchMin + 8,
          borderRadius: radius.xxl,
          paddingHorizontal: label ? 16 : 0,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          gap: 6,
          transform: [{ scale: pressed ? 0.97 : 1 }],
        },
        shadows.lg,
        {
          backgroundColor: theme.primary,
          borderColor: borderColor ?? "transparent",
          borderWidth: borderColor ? 1 : 0,
          opacity: pressed ? 0.85 : 1,
        },
        style,
      ]}
    >
      <MaterialCommunityIcons
        name={iconName}
        size={20}
        color={iconColor ?? theme.textPrimary}
      />
      {label ? (
        <AppText variant="button" color={textColor ?? "textPrimary"}>
          {label}
        </AppText>
      ) : null}
    </Pressable>
  );
}
