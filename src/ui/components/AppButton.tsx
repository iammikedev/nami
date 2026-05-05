import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Box, HStack, Spinner } from "native-base";
import React from "react";
import { Pressable, StyleProp, ViewStyle } from "react-native";

import { animations, useNamiColors } from "../theme";
import { AppText } from "./AppText";

type Variant = "primary" | "secondary" | "tertiary" | "ghost" | "hero3d";
type AppButtonProps = {
  label: string;
  variant?: Variant;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  iconRight?: keyof typeof MaterialCommunityIcons.glyphMap;
  iconSize?: number;
  className?: string;
  style?: StyleProp<ViewStyle>;
};

export function AppButton({
  label,
  variant = "primary",
  onPress,
  disabled,
  loading,
  iconRight = "arrow-right",
  iconSize = 16,
  className,
  style,
}: AppButtonProps) {
  const theme = useNamiColors();
  const tertiary = variant === "tertiary" || variant === "ghost";
  const isHero3d = variant === "hero3d";
  const baseButtonColor = tertiary
    ? "transparent"
    : variant === "secondary"
      ? theme.surfaceElevated
      : theme.primary;

  return (
    <Pressable
      className={className}
      accessibilityRole="button"
      disabled={disabled || loading}
      onPress={onPress}
      style={({ pressed }) => [
        {
          opacity: disabled ? 0.45 : pressed ? animations.opacity.pressIn : 1,
          transform: [
            {
              scale: pressed
                ? animations.scale.pressIn
                : animations.scale.pressOut,
            },
          ],
        },
      ]}
    >
      {isHero3d ? (
        <Box
          className="relative min-h-[64px] w-full items-center justify-center rounded-full border border-b-2 border-[rgba(0,0,0,0.14)] px-[22px] py-[10px]"
          style={[{ backgroundColor: baseButtonColor || "#6FA886" }, style]}
        >
          <Box
            className="absolute left-0 right-0 top-0 h-px rounded-full"
            style={{ backgroundColor: "rgba(255,255,255,0.3)", height: 0.6 }}
          />
          <AppText
            variant="h2"
            className="text-center"
            style={{ color: theme.surfaceElevated }}
          >
            {label}
          </AppText>
          {loading ? (
            <Box
              className="absolute right-0 h-11 w-11 items-center justify-center rounded-full"
              style={{ backgroundColor: theme.surfaceElevated }}
            >
              <Spinner color={theme.textPrimary} size="sm" />
            </Box>
          ) : (
            <Box
              className="absolute right-0 h-11 w-11 items-center justify-center rounded-full mr-4 shadow-lg"
              shadow={1}
              style={{ backgroundColor: theme.surfaceElevated }}
            >
              <MaterialCommunityIcons
                name={iconRight}
                size={24}
                color={theme.textPrimary}
              />
            </Box>
          )}
        </Box>
      ) : (
        <Box>
          <HStack alignItems="center" space={2} className="px-4 py-3">
            <AppText
              variant="button"
              color={tertiary ? "textSecondary" : "textPrimary"}
            >
              {label}
            </AppText>
            {loading ? (
              <Spinner color={theme.textPrimary} size="sm" />
            ) : !tertiary ? (
              <MaterialCommunityIcons
                name={iconRight}
                size={iconSize}
                color={theme.textPrimary}
              />
            ) : null}
          </HStack>
        </Box>
      )}
    </Pressable>
  );
}
