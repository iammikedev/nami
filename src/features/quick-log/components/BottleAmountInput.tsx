import { HStack } from "native-base";
import React from "react";

import { AppText, Chip, InputField } from "@/src/ui/components";

const PRESET_AMOUNT_ML = [60, 90, 120] as const;

type BottleAmountInputProps = {
  value: string;
  onChange: (value: string) => void;
};

export function BottleAmountInput({ value, onChange }: BottleAmountInputProps) {
  return (
    <>
      <AppText variant="label" color="textSecondary">
        Amount (mL)
      </AppText>
      <InputField
        value={value}
        onChangeText={onChange}
        keyboardType="number-pad"
        placeholder="Enter amount in mL"
        icon="cup-water"
      />
      <HStack className="flex-wrap gap-2">
        {PRESET_AMOUNT_ML.map((ml) => (
          <Chip key={ml} label={`${ml} mL`} selected={Number(value) === ml} onPress={() => onChange(String(ml))} />
        ))}
      </HStack>
    </>
  );
}
