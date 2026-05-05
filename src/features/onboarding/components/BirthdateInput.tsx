import React from "react";
import { StyleSheet, View } from "react-native";

import { AppText, InputField } from "@/src/ui/components";
import { radius, spacing, useAppColors } from "@/src/ui/theme";

type BirthdateInputProps = {
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
};

export function BirthdateInput({ value, onChangeText, error }: BirthdateInputProps) {
  const theme = useAppColors();

  return (
    <View style={styles.container}>
      <AppText variant="label">Birthdate</AppText>
      <InputField
        value={value}
        onChangeText={onChangeText}
        accessibilityLabel="Birthdate"
        placeholder="YYYY-MM-DD"
        icon="calendar-month-outline"
        autoCapitalize="none"
        keyboardType="numbers-and-punctuation"
        style={[
          styles.input,
          {
            color: theme.textPrimary,
          },
        ]}
      />
      {error ? (
        <AppText variant="caption" color="danger">
          {error}
        </AppText>
      ) : (
        <AppText variant="caption" color="textSecondary">
          Use format YYYY-MM-DD
        </AppText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing[2],
  },
  input: {
    borderRadius: radius.lg,
  },
});
