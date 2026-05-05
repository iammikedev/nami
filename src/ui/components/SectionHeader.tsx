import React from "react";
import { VStack } from "native-base";

import { spacing } from "../theme";
import { AppText } from "./AppText";

type SectionHeaderProps = { title: string; subtitle?: string };

export function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <VStack space={spacing[1]}>
      <AppText variant="h2">{title}</AppText>
      {subtitle ? <AppText variant="bodySmall" color="textSecondary">{subtitle}</AppText> : null}
    </VStack>
  );
}
