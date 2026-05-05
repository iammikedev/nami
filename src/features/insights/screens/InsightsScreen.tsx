import { useRealm } from "@realm/react";
import { useFocusEffect } from "@react-navigation/native";
import { Box, HStack, VStack } from "native-base";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Animated } from "react-native";

import { InsightCard } from "@/src/features/insights/components/InsightCard";
import { InsightsEmptyState } from "@/src/features/insights/components/InsightsEmptyState";
import {
  collectTodayInsightLogs,
  formatDiaperCount,
  formatFeedCount,
  formatSleepMinutes,
  getTodayInsights,
} from "@/src/features/insights/utils/insights.utils";
import { QuickLogSheet } from "@/src/features/quick-log";
import { useQuickLogStore } from "@/src/features/quick-log/store/quickLogStore";
import { AppScreen, AppText } from "@/src/ui/components";
import { animations, spacing, useNamiColors } from "@/src/ui/theme";

export function InsightsScreen() {
  const theme = useNamiColors();
  const realm = useRealm();
  const inMemoryFeedLogs = useQuickLogStore((s) => s.inMemoryFeedLogs);
  const inMemorySleepLogs = useQuickLogStore((s) => s.inMemorySleepLogs);
  const inMemoryDiaperLogs = useQuickLogStore((s) => s.inMemoryDiaperLogs);

  const [refreshKey, setRefreshKey] = useState(0);
  const [quickLogOpen, setQuickLogOpen] = useState(false);

  const fadeIn = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(10)).current;

  useFocusEffect(
    useCallback(() => {
      setRefreshKey((k) => k + 1);
    }, []),
  );

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeIn, {
        toValue: 1,
        duration: animations.duration.slow,
        easing: animations.easing.easeOut,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: animations.duration.slow,
        easing: animations.easing.easeOut,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeIn, translateY]);

  const logs = useMemo(() => {
    void refreshKey;
    return collectTodayInsightLogs(realm, {
      inMemoryFeedLogs,
      inMemorySleepLogs,
      inMemoryDiaperLogs,
    });
  }, [realm, inMemoryFeedLogs, inMemorySleepLogs, inMemoryDiaperLogs, refreshKey]);

  const insights = useMemo(() => getTodayInsights(logs), [logs]);

  const openQuickLog = () => setQuickLogOpen(true);
  const closeQuickLog = () => setQuickLogOpen(false);

  return (
    <AppScreen
      scrollable
      contentStyle={{
        flexGrow: 1,
        paddingHorizontal: spacing[4],
        paddingTop: spacing[4],
        paddingBottom: 120,
        gap: spacing[4],
      }}
      screenOverlay={
        <QuickLogSheet
          isOpen={quickLogOpen}
          onClose={closeQuickLog}
          onLogComplete={() => {
            setRefreshKey((k) => k + 1);
          }}
        />
      }
    >
      <Animated.View
        style={{
          opacity: fadeIn,
          transform: [{ translateY }],
          flexGrow: insights.hasDataToday ? 0 : 1,
          gap: spacing[4],
        }}
      >
        <HStack className="items-start justify-between" space={3}>
          <VStack className="min-w-0 flex-1" style={{ gap: spacing[1] }}>
            <AppText variant="h2" color="textPrimary">
              Insights
            </AppText>
            <AppText variant="bodySmall" color="textSecondary">
              A quick look at today&apos;s routine
            </AppText>
          </VStack>
          <Box
            className="rounded-full px-4 py-2"
            style={{
              backgroundColor: theme.surfaceElevated,
              borderWidth: 1,
              borderColor: theme.border,
            }}
          >
            <AppText variant="caption" color="textSecondary">
              Today
            </AppText>
          </Box>
        </HStack>

        {insights.hasDataToday ? (
          <VStack style={{ gap: spacing[4] }}>
            <InsightCard
              title="Sleep"
              value={formatSleepMinutes(insights.sleepMinutes)}
              subtitle="Total sleep today"
              icon="weather-night"
              backgroundColor={theme.onboarding.cardSleep}
              iconBackgroundColor={theme.surfaceElevated}
              iconColor={theme.textPrimary}
            />
            <InsightCard
              title="Feeding"
              value={formatFeedCount(insights.feedCount)}
              subtitle="Feeds logged today"
              icon="baby-bottle-outline"
              backgroundColor={theme.onboarding.cardFeed}
              iconBackgroundColor={theme.surfaceElevated}
              iconColor={theme.textPrimary}
            />
            <InsightCard
              title="Diaper"
              value={formatDiaperCount(insights.diaperCount)}
              subtitle="Diaper changes today"
              icon="baby-face-outline"
              backgroundColor={theme.onboarding.cardMilestone}
              iconBackgroundColor={theme.surfaceElevated}
              iconColor={theme.textPrimary}
            />
          </VStack>
        ) : (
          <InsightsEmptyState onLogPress={openQuickLog} />
        )}
      </Animated.View>
    </AppScreen>
  );
}
