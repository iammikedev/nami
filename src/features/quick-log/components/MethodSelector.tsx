import { HStack } from "native-base";
import React from "react";

import type { FeedMethod } from "@/src/features/quick-log/types/quickLog.types";
import { AppText, Chip } from "@/src/ui/components";

type MethodSelectorProps = {
  value: FeedMethod;
  onChange: (method: FeedMethod) => void;
};

export function MethodSelector({ value, onChange }: MethodSelectorProps) {
  return (
    <>
      <AppText variant="label" color="textSecondary">
        Method
      </AppText>
      <HStack className="gap-2">
        <Chip label="Breastfeed" selected={value === "breastfeed"} onPress={() => onChange("breastfeed")} />
        <Chip label="Bottle" selected={value === "bottle"} onPress={() => onChange("bottle")} />
      </HStack>
    </>
  );
}
