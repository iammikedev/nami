import React from "react";
import { StyleSheet, View } from "react-native";

import {
  ActivityCard,
  AppButton,
  AppScreen,
  AppText,
  Card,
  Chip,
  EmptyState,
  FloatingActionButton,
  LogTypeButton,
  SectionHeader,
  SummaryCard,
  TimelineItem,
  colors,
  radius,
  spacing,
  textVariants,
  useAppColors,
} from "@/src/ui";

const colorEntries = [
  { label: "Primary Sage", value: colors.light.primary },
  { label: "Warm Cream", value: colors.light.background },
  { label: "Muted Beige", value: colors.light.surface },
  { label: "Text Primary", value: colors.light.textPrimary },
  { label: "Text Secondary", value: colors.light.textSecondary },
  { label: "Border", value: colors.light.border },
  { label: "Feed", value: colors.light.activity.feed },
  { label: "Sleep", value: colors.light.activity.sleep },
  { label: "Diaper", value: colors.light.activity.diaper },
  { label: "Milestone", value: colors.light.activity.milestone },
] as const;

const typeEntries: (keyof typeof textVariants)[] = [
  "display",
  "h1",
  "h2",
  "h3",
  "title",
  "body",
  "bodySmall",
  "caption",
  "button",
  "label",
];

export default function DesignSystemPreviewScreen() {
  const theme = useAppColors();

  return (
    <AppScreen scrollable contentStyle={styles.content}>
      <SectionHeader title="Nami Design System" />

      <View style={styles.section}>
        <AppText variant="h3">Color Palette</AppText>
        <View style={styles.grid}>
          {colorEntries.map((entry) => (
            <Card key={entry.label} style={styles.colorCard}>
              <View style={[styles.swatch, { backgroundColor: entry.value }]} />
              <AppText variant="bodySmall">{entry.label}</AppText>
              <AppText variant="caption" color={theme.textSecondary}>
                {entry.value}
              </AppText>
            </Card>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <AppText variant="h3">Typography</AppText>
        <Card>
          {typeEntries.map((variant) => (
            <AppText key={variant} variant={variant}>
              {variant} - Gentle care, captured simply.
            </AppText>
          ))}
        </Card>
      </View>

      <View style={styles.section}>
        <AppText variant="h3">Buttons</AppText>
        <View style={styles.row}>
          <AppButton label="Primary action" onPress={() => null} />
          <AppButton label="Secondary" variant="secondary" onPress={() => null} />
        </View>
      </View>

      <View style={styles.section}>
        <AppText variant="h3">Activity Log Buttons</AppText>
        <View style={styles.row}>
          <LogTypeButton type="feed" label="Feed" />
          <LogTypeButton type="sleep" label="Sleep" />
        </View>
        <View style={styles.row}>
          <LogTypeButton type="diaper" label="Diaper" />
          <LogTypeButton type="milestone" label="Milestone" />
        </View>
      </View>

      <View style={styles.section}>
        <AppText variant="h3">Summary Cards</AppText>
        <View style={styles.row}>
          <SummaryCard label="Feeds today" value="6" helper="Last at 8:10 PM" />
          <SummaryCard label="Sleep total" value="9h 20m" helper="On track" />
        </View>
      </View>

      <View style={styles.section}>
        <AppText variant="h3">Activity Cards</AppText>
        <ActivityCard type="feed" title="Bottle feed" detail="120ml formula" timestamp="8:10 PM" />
        <ActivityCard type="sleep" title="Nap started" detail="Bedroom bassinet" timestamp="1:00 PM" />
      </View>

      <View style={styles.section}>
        <AppText variant="h3">Chips</AppText>
        <View style={styles.rowStart}>
          <Chip label="Today" selected />
          <Chip label="Week" />
          <Chip label="Month" />
        </View>
      </View>

      <View style={styles.section}>
        <AppText variant="h3">Timeline</AppText>
        <Card>
          <TimelineItem time="8:10 PM" title="Bottle feed" detail="120ml formula" />
          <TimelineItem time="7:05 PM" title="Diaper change" detail="Wet" />
        </Card>
      </View>

      <View style={styles.section}>
        <AppText variant="h3">Empty State</AppText>
        <EmptyState
          title="No logs yet"
          message="Start with one quick entry. You can always edit details later."
          actionLabel="Add first log"
          onActionPress={() => null}
        />
      </View>

      <FloatingActionButton style={styles.fabDemo} />
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: spacing[5],
    paddingBottom: spacing[16],
  },
  section: {
    gap: spacing[3],
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing[3],
  },
  colorCard: {
    width: "47%",
    minWidth: 150,
  },
  swatch: {
    height: 36,
    borderRadius: radius.md,
    marginBottom: spacing[2],
  },
  row: {
    flexDirection: "row",
    gap: spacing[3],
    alignItems: "center",
  },
  rowStart: {
    flexDirection: "row",
    gap: spacing[2],
    alignItems: "center",
    flexWrap: "wrap",
  },
  fabDemo: {
    position: "absolute",
    right: spacing[4],
    bottom: spacing[8],
  },
});
