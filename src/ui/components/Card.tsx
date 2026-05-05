import React from "react";
import { Box } from "native-base";
import {
  StyleProp,
  ViewProps,
  ViewStyle,
} from "react-native";

import { radius, shadows, spacing, useNamiColors } from "../theme";

type CardProps = ViewProps & {
  elevated?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function Card({ elevated = true, style, ...props }: CardProps) {
  const theme = useNamiColors();
  return (
    <Box
      {...props}
      style={[
        {
          borderWidth: 1,
          borderRadius: radius.xxl,
          padding: spacing[4],
        },
        { backgroundColor: theme.surfaceElevated, borderColor: theme.border },
        elevated && shadows.md,
        style,
      ]}
    />
  );
}
