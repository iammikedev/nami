import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";

import { colors, radius, shadows, spacing, textVariants, useNamiColors } from "./theme";
import {
  ActivityCard,
  AppButton,
  AppText,
  Badge,
  Card,
  Chip,
  FloatingActionButton,
  InputField,
  LogTypeButton,
  SectionHeader,
  SummaryCard,
  TimelineItem,
} from "./components";

const typeEntries = Object.keys(textVariants) as (keyof typeof textVariants)[];

export default function DesignSystemPreviewScreen() {
  const theme = useNamiColors();
  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <SectionHeader title="Nami Design System" subtitle="Calm, warm, premium baby tracking UI." />
        <View style={styles.rowWrap}>
          <LogTypeButton type="feed" label="Feed" />
          <LogTypeButton type="sleep" label="Sleep" />
          <LogTypeButton type="diaper" label="Diaper" />
          <LogTypeButton type="milestone" label="Milestone" />
        </View>
        <AppButton label="Continue" />
        <AppButton label="Get Started" variant="secondary" />
        <AppButton label="Skip" variant="tertiary" />
        <InputField placeholder="Baby name" />
        <InputField placeholder="Birthdate" icon="calendar-month-outline" />
        <SummaryCard label="Feed" value="5 times" helper="Today" />
        <ActivityCard type="feed" title="Fed (Left)" timestamp="10 min ago - 2 min ago" />
        <Card><TimelineItem time="8:10 PM" title="First Smile" detail="2 months old - May 12, 2024" /></Card>
        <View style={styles.rowWrap}><Chip label="Left" selected /><Badge label="New" /></View>
        <SectionHeader title="Onboarding Screens" />
        <Card>
          <AppText variant="title">Screen 1</AppText>
          <AppText color="textSecondary">Track your baby's routine effortlessly</AppText>
          <View style={styles.rowWrap}>
            <LogTypeButton type="feed" label="Feed" />
            <LogTypeButton type="sleep" label="Sleep" />
            <LogTypeButton type="milestone" label="Milestone" />
          </View>
          <AppButton label="Continue" />
        </Card>
        <Card>
          <AppText variant="title">Screen 2</AppText>
          <View style={[styles.illustration, { backgroundColor: theme.surface }]}>
            <View style={[styles.dot, { backgroundColor: theme.activity.feed }]} />
            <View style={[styles.dot, { backgroundColor: theme.activity.sleep }]} />
            <View style={[styles.dot, { backgroundColor: theme.activity.milestone }]} />
          </View>
          <AppText variant="h3">Build a timeline of your baby's growth</AppText>
          <AppText color="textSecondary">Capture little moments, daily routines, and milestones that matter.</AppText>
          <AppButton label="Get Started" />
        </Card>
        <Card>
          <AppText variant="title">Screen 3</AppText>
          <InputField placeholder="Baby name" />
          <InputField placeholder="Birthdate" icon="calendar-month-outline" />
          <AppButton label="Start Tracking" />
        </Card>
        {typeEntries.slice(0, 4).map((variant) => <AppText key={variant} variant={variant}>{variant}</AppText>)}
        <View style={styles.rowWrap}>
          <View style={[styles.token, shadows.sm, { borderRadius: radius.sm, backgroundColor: colors.light.surfaceElevated }]} />
          <View style={[styles.token, shadows.md, { borderRadius: radius.lg, backgroundColor: colors.light.surfaceElevated }]} />
          <View style={[styles.token, shadows.lg, { borderRadius: radius.xxl, backgroundColor: colors.light.surfaceElevated }]} />
        </View>
      </ScrollView>
      <FloatingActionButton style={styles.fab} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  content: { padding: spacing[4], gap: spacing[4], paddingBottom: spacing[16] },
  rowWrap: { flexDirection: "row", gap: spacing[2], flexWrap: "wrap", alignItems: "center" },
  token: { width: 72, height: 48, borderWidth: 1, borderColor: colors.light.border },
  fab: { position: "absolute", right: spacing[4], bottom: spacing[6] },
  illustration: { minHeight: 120, borderRadius: radius.xl, alignItems: "center", justifyContent: "center", flexDirection: "row", gap: spacing[3] },
  dot: { width: 32, height: 32, borderRadius: 16, opacity: 0.85 },
});
