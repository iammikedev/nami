import { HStack } from "native-base";
import React from "react";

import type { BreastSide } from "@/src/features/quick-log/types/quickLog.types";
import { AppText, Chip } from "@/src/ui/components";

type SideSelectorProps = {
  value?: BreastSide;
  onChange: (side: BreastSide) => void;
};

export function SideSelector({ value, onChange }: SideSelectorProps) {
  return (
    <>
      <AppText variant="label" color="textSecondary">
        Side
      </AppText>
      <HStack className="gap-2">
        <Chip label="Left" selected={value === "left"} onPress={() => onChange("left")} />
        <Chip label="Right" selected={value === "right"} onPress={() => onChange("right")} />
      </HStack>
    </>
  );
}
