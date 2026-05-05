import React from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from "react-native";

import {
  animations,
  layout,
  radius,
  shadows,
  spacing,
  useAppColors,
} from "@/src/ui/theme";
import { AppText } from "./AppText";

type AppButtonVariant = "primary" | "secondary" | "ghost";

type AppButtonProps = {
  label: string;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: AppButtonVariant;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
};

export function AppButton({
  label,
  onPress,
  disabled,
  loading,
  variant = "primary",
  accessibilityLabel,
  style,
}: AppButtonProps) {
  const theme = useAppColors();
  const isDisabled = Boolean(disabled || loading);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      onPress={onPress}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        shadows.sm,
        variantStyles[variant](theme),
        {
          opacity: isDisabled ? 0.5 : pressed ? animations.opacity.pressIn : 1,
          transform: [{ scale: pressed ? animations.scale.pressIn : animations.scale.pressOut }],
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={variant === "primary" ? theme.textPrimary : theme.textSecondary} />
      ) : (
        <AppText
          variant="bodyEmphasis"
          color={variant === "ghost" ? theme.textPrimary : theme.textPrimary}
          align="center"
        >
          {label}
        </AppText>
      )}
    </Pressable>
  );
}

const variantStyles = {
  primary: (theme: ReturnType<typeof useAppColors>) => ({
    backgroundColor: theme.primary,
    borderColor: theme.primary,
  }),
  secondary: (theme: ReturnType<typeof useAppColors>) => ({
    backgroundColor: theme.surfaceElevated,
    borderColor: theme.border,
  }),
  ghost: (theme: ReturnType<typeof useAppColors>) => ({
    backgroundColor: "transparent",
    borderColor: theme.border,
  }),
};

const styles = StyleSheet.create({
  base: {
    minHeight: layout.touchMin,
    borderRadius: radius.pill,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing[5],
    paddingVertical: spacing[3],
  },
});
