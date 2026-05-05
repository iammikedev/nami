import { useFocusEffect } from "@react-navigation/native";
import { useRealm } from "@realm/react";
import { useRouter } from "expo-router";
import { VStack } from "native-base";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View } from "react-native";

import { ReminderIntervalSelector } from "@/src/features/reminders/components/ReminderIntervalSelector";
import { ReminderToggleCard } from "@/src/features/reminders/components/ReminderToggleCard";
import { UpcomingReminderCard } from "@/src/features/reminders/components/UpcomingReminderCard";
import { useReminderStore } from "@/src/features/reminders/store/reminderStore";
import {
  FEEDING_INTERVAL_OPTIONS,
  SLEEP_INTERVAL_OPTIONS,
  buildUpcomingReminderLines,
} from "@/src/features/reminders/utils/reminderRules";
import { AppScreen, AppText, IconButton } from "@/src/ui/components";
import { spacing, useNamiColors } from "@/src/ui/theme";

export function ReminderSettingsScreen() {
  const theme = useNamiColors();
  const realm = useRealm();
  const router = useRouter();
  const [previewTick, setPreviewTick] = useState(0);

  const feedingEnabled = useReminderStore((s) => s.feedingEnabled);
  const sleepEnabled = useReminderStore((s) => s.sleepEnabled);
  const feedingIntervalMinutes = useReminderStore((s) => s.feedingIntervalMinutes);
  const sleepIntervalMinutes = useReminderStore((s) => s.sleepIntervalMinutes);
  const hydrate = useReminderStore((s) => s.hydrate);
  const setFeedingEnabled = useReminderStore((s) => s.setFeedingEnabled);
  const setSleepEnabled = useReminderStore((s) => s.setSleepEnabled);
  const setFeedingIntervalMinutes = useReminderStore((s) => s.setFeedingIntervalMinutes);
  const setSleepIntervalMinutes = useReminderStore((s) => s.setSleepIntervalMinutes);

  useEffect(() => {
    hydrate(realm);
  }, [hydrate, realm]);

  useFocusEffect(
    useCallback(() => {
      setPreviewTick((t) => t + 1);
    }, [])
  );

  const prefs = useMemo(
    () => ({
      feedingEnabled,
      feedingIntervalMinutes,
      sleepEnabled,
      sleepIntervalMinutes,
    }),
    [feedingEnabled, feedingIntervalMinutes, sleepEnabled, sleepIntervalMinutes]
  );

  const upcomingLines = useMemo(() => {
    void previewTick;
    return buildUpcomingReminderLines(prefs, realm);
  }, [prefs, previewTick, realm]);

  const anyEnabled = feedingEnabled || sleepEnabled;

  return (
    <AppScreen scrollable contentStyle={{ paddingBottom: spacing[10], gap: spacing[5] }}>
      <View className="flex-row items-center" style={{ gap: spacing[2] }}>
        <IconButton
          icon="arrow-left"
          accessibilityLabel="Back"
          onPress={() => router.back()}
        />
      </View>

      <VStack style={{ gap: spacing[1] }}>
        <AppText variant="h2">Smart Reminders</AppText>
        <AppText variant="body" color="textSecondary">
          Gentle nudges for feeding and sleep.
        </AppText>
      </VStack>

      <VStack style={{ gap: spacing[4] }}>
        <ReminderToggleCard
          title="Feeding reminders"
          description="Get a gentle reminder when it may be time for the next feed."
          icon="baby-bottle-outline"
          iconBackground={theme.onboarding.cardFeed}
          enabled={feedingEnabled}
          onEnabledChange={(next) => {
            void setFeedingEnabled(realm, next);
          }}
        >
          <ReminderIntervalSelector
            options={FEEDING_INTERVAL_OPTIONS}
            valueMinutes={feedingIntervalMinutes}
            disabled={!feedingEnabled}
            onChange={(m) => {
              void setFeedingIntervalMinutes(realm, m);
            }}
          />
        </ReminderToggleCard>

        <ReminderToggleCard
          title="Sleep reminders"
          description="Get a gentle reminder if baby hasn't slept in a while."
          icon="weather-night"
          iconBackground={theme.onboarding.cardSleep}
          enabled={sleepEnabled}
          onEnabledChange={(next) => {
            void setSleepEnabled(realm, next);
          }}
        >
          <ReminderIntervalSelector
            options={SLEEP_INTERVAL_OPTIONS}
            valueMinutes={sleepIntervalMinutes}
            disabled={!sleepEnabled}
            onChange={(m) => {
              void setSleepIntervalMinutes(realm, m);
            }}
          />
        </ReminderToggleCard>

        <UpcomingReminderCard lines={upcomingLines} anyEnabled={anyEnabled} refreshKey={previewTick} />
      </VStack>
    </AppScreen>
  );
}
