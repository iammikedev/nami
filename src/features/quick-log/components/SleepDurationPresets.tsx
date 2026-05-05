import { HStack } from "native-base";
import React from "react";

import { AppText, Chip } from "@/src/ui/components";

const PRESETS = [
  { minutes: 30, label: "Slept 30m" },
  { minutes: 60, label: "Slept 1h" },
  { minutes: 90, label: "Slept 1h 30m" },
  { minutes: 120, label: "Slept 2h" },
] as const;

type SleepDurationPresetsProps = {
  value?: number;
  onSelect: (minutes: number) => void;
};

export function SleepDurationPresets({ value, onSelect }: SleepDurationPresetsProps) {
  return (
    <>
      <AppText variant="label" color="textSecondary" className="mb-2">
        Quick add
      </AppText>
      <HStack className="flex-wrap gap-2">
        {PRESETS.map((p) => (
          <Chip
            key={p.minutes}
            label={p.label}
            selected={value === p.minutes}
            onPress={() => onSelect(p.minutes)}
          />
        ))}
      </HStack>
    </>
  );
}
