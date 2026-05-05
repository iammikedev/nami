import { HStack, VStack } from "native-base";
import React from "react";

import { LogTypeButton } from "@/src/features/quick-log/components/LogTypeButton";
import type { LogType } from "@/src/features/quick-log/types/quickLog.types";

type LogTypeGridProps = {
  onSelect: (type: LogType) => void;
};

export function LogTypeGrid({ onSelect }: LogTypeGridProps) {
  return (
    <VStack className="gap-3">
      <HStack className="justify-between">
        <LogTypeButton type="feed" onPress={onSelect} />
        <LogTypeButton type="sleep" onPress={onSelect} />
      </HStack>
      <HStack className="justify-between">
        <LogTypeButton type="diaper" onPress={onSelect} />
        <LogTypeButton type="milestone" onPress={onSelect} />
      </HStack>
    </VStack>
  );
}
