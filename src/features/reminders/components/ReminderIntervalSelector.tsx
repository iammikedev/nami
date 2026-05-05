import { HStack, Pressable } from "native-base";
import React from "react";

import { AppText } from "@/src/ui/components";
import { useNamiColors } from "@/src/ui/theme";

import type { IntervalOption } from "../types/reminder.types";

type ReminderIntervalSelectorProps = {
  options: IntervalOption[];
  valueMinutes: number;
  onChange: (minutes: number) => void;
  disabled?: boolean;
};

export function ReminderIntervalSelector({
  options,
  valueMinutes,
  onChange,
  disabled,
}: ReminderIntervalSelectorProps) {
  const theme = useNamiColors();

  return (
    <HStack className="mt-3 flex-wrap gap-2">
      {options.map((opt) => {
        const selected = opt.minutes === valueMinutes;
        return (
          <Pressable
            key={opt.minutes}
            accessibilityRole="button"
            accessibilityState={{ selected, disabled: Boolean(disabled) }}
            accessibilityLabel={`${opt.label}${selected ? ", selected" : ""}`}
            disabled={disabled}
            onPress={() => onChange(opt.minutes)}
            className="min-h-[48px] min-w-[96px] flex-1 rounded-2xl border px-3 py-3"
            style={{
              borderColor: selected ? theme.primary : theme.border,
              backgroundColor: selected ? `${theme.primary}33` : theme.surfaceElevated,
              opacity: disabled ? 0.45 : 1,
            }}
          >
            <AppText
              variant="bodySmall"
              color={selected ? "textPrimary" : "textSecondary"}
              style={{ fontWeight: selected ? "700" : "500", textAlign: "center" }}
            >
              {opt.label}
            </AppText>
          </Pressable>
        );
      })}
    </HStack>
  );
}
