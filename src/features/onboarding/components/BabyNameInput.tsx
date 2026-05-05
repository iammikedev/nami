import React from "react";
import { View } from "react-native";

import { AppText, InputField } from "@/src/ui/components";

type BabyNameInputProps = {
  value: string;
  onChangeText: (text: string) => void;
  onBlur?: () => void;
  error?: string;
};

export function BabyNameInput({
  value,
  onChangeText,
  onBlur,
  error,
}: BabyNameInputProps) {
  return (
    <View className="gap-2">
      <AppText variant="label" nativeID="baby-name-label">
        Baby Name
      </AppText>
      <InputField
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        error={!!error}
        accessibilityLabel="Baby Name"
        accessibilityLabelledBy="baby-name-label"
        placeholder="e.g. Nami"
        autoCapitalize="words"
        returnKeyType="next"
      />
      {error ? (
        <AppText variant="caption" color="danger">
          {error}
        </AppText>
      ) : null}
    </View>
  );
}
