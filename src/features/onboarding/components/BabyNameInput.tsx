import React from "react";
import { StyleSheet, View } from "react-native";

import { AppText, InputField } from "@/src/ui/components";
import { radius, spacing, useAppColors } from "@/src/ui/theme";

type BabyNameInputProps = {
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
};

export function BabyNameInput({ value, onChangeText, error }: BabyNameInputProps) {
  const theme = useAppColors();

  return (
    <View style={styles.container}>
      <AppText variant="label">Baby Name</AppText>
      <InputField
        value={value}
        onChangeText={onChangeText}
        accessibilityLabel="Baby Name"
        placeholder="Enter baby name"
        autoCapitalize="words"
        returnKeyType="next"
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
      ) : null}
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
