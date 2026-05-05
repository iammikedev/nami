import React from "react";
import { StyleSheet, View } from "react-native";

import { spacing, useAppColors } from "@/src/ui/theme";
import { AppText } from "./AppText";
import { Card } from "./Card";

type SummaryCardProps = {
  label: string;
  value: string;
  helper?: string;
};

export function SummaryCard({ label, value, helper }: SummaryCardProps) {
  const theme = useAppColors();

  return (
    <Card elevated>
      <View style={styles.wrap}>
        <AppText variant="caption" color={theme.textSecondary}>
          {label}
        </AppText>
        <AppText variant="titleSmall">{value}</AppText>
        {helper ? (
          <AppText variant="bodySmall" color={theme.textSecondary}>
            {helper}
          </AppText>
        ) : null}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: spacing[1],
  },
});
