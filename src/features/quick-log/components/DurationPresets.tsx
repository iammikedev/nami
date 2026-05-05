import { HStack } from "native-base";
import React from "react";

import { AppText, Chip } from "@/src/ui/components";

const PRESET_MINUTES = [5, 10, 15, 20] as const;

type DurationPresetsProps = {
  value?: number;
  onSelect: (minutes: number) => void;
};

export function DurationPresets({ value, onSelect }: DurationPresetsProps) {
  return (
    <>
      <AppText variant="label" color="textSecondary">
        Quick duration
      </AppText>
      <HStack className="flex-wrap gap-2">
        {PRESET_MINUTES.map((minutes) => (
          <Chip
            key={minutes}
            label={`${minutes} min`}
            selected={value === minutes}
            onPress={() => onSelect(minutes)}
          />
        ))}
      </HStack>
    </>
  );
}
