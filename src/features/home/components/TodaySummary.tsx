import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import * as Haptics from "expo-haptics";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

import type { SummaryType, TodaySummaryItem } from "@/src/features/home/types/home.types";
import { AppText } from "@/src/ui/components";
import { radius, shadows, spacing, useNamiColors } from "@/src/ui/theme";
import { SummaryCard } from "./SummaryCard";

type TodaySummaryProps = {
  dateLabel: string;
  items: TodaySummaryItem[];
  onCardPress?: (type: SummaryType) => void;
};

export function TodaySummary({ dateLabel, items, onCardPress }: TodaySummaryProps) {
  const theme = useNamiColors();

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <AppText variant="h3">Today Summary</AppText>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Select date"
          style={({ pressed }) => [
            styles.datePill,
            {
              backgroundColor: theme.surfaceElevated,
              borderColor: theme.border,
              opacity: pressed ? 0.92 : 1,
            },
          ]}
        >
          <MaterialCommunityIcons
            name="calendar-blank-outline"
            size={14}
            color={theme.textSecondary}
          />
          <AppText variant="bodySmall" color="textSecondary">
            {dateLabel}
          </AppText>
          <MaterialCommunityIcons
            name="chevron-down"
            size={16}
            color={theme.textSecondary}
          />
        </Pressable>
      </View>

      <View style={styles.cardsRow}>
        {items.map((item) => (
          <SummaryCard
            key={item.id}
            item={item}
            onPress={
              onCardPress
                ? () => {
                    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    onCardPress(item.id);
                  }
                : undefined
            }
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { gap: spacing[3] },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  datePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderWidth: 1,
    borderRadius: radius.pill,
    paddingHorizontal: spacing[3],
    paddingVertical: 9,
    ...shadows.sm,
  },
  cardsRow: {
    flexDirection: "row",
    gap: spacing[2],
  },
});
