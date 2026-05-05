import React from "react";
import { Text, ITextProps } from "native-base";
import { StyleProp, TextStyle } from "react-native";

import { AppColors } from "../theme/colors";
import { textVariants, TextVariant, useNamiColors } from "../theme";

type AppTextProps = ITextProps & {
  variant?: TextVariant;
  color?: keyof Pick<AppColors, "textPrimary" | "textSecondary"> | "success" | "warning" | "error" | "danger" | "info" | string;
  style?: StyleProp<TextStyle>;
};

export function AppText({ variant = "body", color = "textPrimary", style, ...props }: AppTextProps) {
  const theme = useNamiColors();
  const resolvedColor: string = color.startsWith("#")
    ? color
    :
    color === "danger"
      ? theme.semantic.error
      : color in theme.semantic
        ? theme.semantic[color as keyof typeof theme.semantic]
        : (theme[color as keyof AppColors] as string);
  return <Text {...props} style={[textVariants[variant], { color: resolvedColor }, style]} />;
}
