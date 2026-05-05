import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";
import { Pressable } from "native-base";
import { StyleProp, ViewStyle } from "react-native";

import { layout, radius, shadows, useNamiColors } from "../theme";

type FloatingActionButtonProps = { onPress?: () => void; style?: StyleProp<ViewStyle> };

export function FloatingActionButton({ onPress, style }: FloatingActionButtonProps) {
  const theme = useNamiColors();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Add new entry"
      onPress={onPress}
      style={({ isPressed }) => [
        {
          width: layout.touchMin + 8,
          height: layout.touchMin + 8,
          borderRadius: radius.xxl,
          alignItems: "center",
          justifyContent: "center",
        },
        shadows.lg,
        { backgroundColor: theme.primary, opacity: isPressed ? 0.85 : 1 },
        style,
      ]}
    >
      <MaterialCommunityIcons name="plus" size={24} color={theme.textPrimary} />
    </Pressable>
  );
}
