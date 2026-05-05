import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";
import { IconButton as NBIconButton, Icon } from "native-base";

import { layout, radius, shadows, spacing, useNamiColors } from "../theme";

type IconButtonProps = {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  onPress?: () => void;
  accessibilityLabel: string;
};

export function IconButton({
  icon,
  onPress,
  accessibilityLabel,
}: IconButtonProps) {
  const theme = useNamiColors();
  return (
    <NBIconButton
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
      icon={<Icon as={MaterialCommunityIcons} name={icon} size={5} color={theme.textPrimary} />}
      style={[
        {
          width: layout.touchMin,
          height: layout.touchMin,
          borderRadius: radius.xl,
          borderWidth: 1,
          alignItems: "center",
          justifyContent: "center",
          padding: spacing[2],
        },
        shadows.sm,
        {
          backgroundColor: theme.surfaceElevated,
          borderColor: theme.border,
        },
      ]}
      _pressed={{ opacity: 0.8 }}
    />
  );
}
