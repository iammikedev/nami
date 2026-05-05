import React from "react";
import { Badge as NBBadge } from "native-base";

import { radius, spacing, useNamiColors } from "../theme";
import { AppText } from "./AppText";

type BadgeProps = { label: string; tone?: "info" | "success" | "warning" | "error" };

export function Badge({ label, tone = "info" }: BadgeProps) {
  const theme = useNamiColors();
  return (
    <NBBadge
      borderRadius={radius.pill}
      px={spacing[2]}
      py={0.5}
      minH={5.5}
      justifyContent="center"
      bg={theme.semantic[tone]}
      borderWidth={0}
      alignSelf="flex-start"
    >
      <AppText variant="caption">{label}</AppText>
    </NBBadge>
  );
}
