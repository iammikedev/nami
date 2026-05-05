import React from "react";
import { StyleProp, StyleSheet, Text, TextProps, TextStyle } from "react-native";

import { AppColors, TextVariant, textVariants, useAppColors } from "@/src/ui/theme";

export type AppTextProps = TextProps & {
  variant?: TextVariant;
  color?: keyof AppColors;
  align?: TextStyle["textAlign"];
};

export function AppText({
  variant = "body",
  color,
  style,
  align,
  ...rest
}: AppTextProps) {
  const theme = useAppColors();

  return (
    <Text
      style={[
        styles.base,
        textVariants[variant],
        { color: color ? theme[color] : theme.textPrimary, textAlign: align },
        style as StyleProp<TextStyle>,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  base: {
    includeFontPadding: false,
  },
});
