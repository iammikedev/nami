import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";
import { StyleSheet, View } from "react-native";

import { AppText, Card } from "@/src/ui/components";
import { radius, shadows, spacing, useAppColors } from "@/src/ui/theme";

type OnboardingHeroProps = {
  compact?: boolean;
};

export function OnboardingHero({ compact = false }: OnboardingHeroProps) {
  const theme = useAppColors();

  return (
    <Card
      style={[
        styles.card,
        compact && styles.compactCard,
        { backgroundColor: theme.surface, borderColor: theme.border },
      ]}
    >
      <View style={styles.hanger}>
        <View style={[styles.star, { backgroundColor: theme.activity.milestone }]} />
        <View style={[styles.heart, { backgroundColor: theme.activity.feed }]} />
        <View style={[styles.cloud, { backgroundColor: theme.activity.sleep }]} />
      </View>
      <View
        style={[
          styles.babyBubble,
          shadows.sm,
          { backgroundColor: theme.surfaceElevated, borderColor: theme.border },
        ]}
      >
        <MaterialCommunityIcons name="baby-face-outline" size={compact ? 30 : 40} color={theme.textPrimary} />
      </View>
      {!compact ? (
        <AppText variant="caption" color="textSecondary">
          Gentle moments, beautifully captured.
        </AppText>
      ) : null}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.xxl,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 210,
    gap: spacing[3],
  },
  compactCard: {
    minHeight: 160,
  },
  hanger: {
    flexDirection: "row",
    gap: spacing[3],
  },
  star: {
    width: 20,
    height: 20,
    borderRadius: radius.pill,
  },
  heart: {
    width: 20,
    height: 20,
    borderRadius: radius.pill,
  },
  cloud: {
    width: 28,
    height: 18,
    borderRadius: radius.pill,
  },
  babyBubble: {
    width: 88,
    height: 88,
    borderRadius: radius.pill,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
