import { useRealm } from "@realm/react";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { HomeHeader } from "@/src/features/home/components/HomeHeader";
import { RecentActivityList } from "@/src/features/home/components/RecentActivityList";
import { TodaySummary } from "@/src/features/home/components/TodaySummary";
import { homeDailyHubMock } from "@/src/features/home/data/home.mock";
import type { SummaryType } from "@/src/features/home/types/home.types";
import { useHomeStore } from "@/src/features/home/store/homeStore";
import { buildTodaySummaryItems } from "@/src/features/home/utils/summary";
import { QuickLogSheet } from "@/src/features/quick-log";
import type { LogType } from "@/src/features/quick-log/types/quickLog.types";
import { AppScreen, AppText } from "@/src/ui/components";
import { animations, radius, shadows, spacing, useNamiColors } from "@/src/ui/theme";

export function HomeScreen() {
  const theme = useNamiColors();
  const insets = useSafeAreaInsets();
  const realm = useRealm();
  const [isQuickLogOpen, setQuickLogOpen] = useState(false);
  const [quickLogInitialType, setQuickLogInitialType] = useState<LogType | undefined>();
  const [flashMessage, setFlashMessage] = useState<string | null>(null);
  const flashOpacity = useRef(new Animated.Value(0)).current;
  const flashHideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Select each slice separately — object selectors return a new `{}` every snapshot and break
  // useSyncExternalStore (Zustand v5), causing "Maximum update depth exceeded".
  const babyProfile = useHomeStore((state) => state.babyProfile);
  const todaySummary = useHomeStore((state) => state.todaySummary);
  const recentActivities = useHomeStore((state) => state.recentActivities);
  const refreshHomeData = useHomeStore((state) => state.refreshHomeData);

  const fadeIn = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(10)).current;

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

  useEffect(() => {
    refreshHomeData(realm);
  }, [realm, refreshHomeData]);

  const showFlashMessage = useCallback(
    (message: string) => {
      if (flashHideTimeoutRef.current) {
        clearTimeout(flashHideTimeoutRef.current);
        flashHideTimeoutRef.current = null;
      }
      setFlashMessage(message);
      flashOpacity.setValue(0);
      Animated.timing(flashOpacity, {
        toValue: 1,
        duration: 180,
        useNativeDriver: true,
      }).start();
      flashHideTimeoutRef.current = setTimeout(() => {
        Animated.timing(flashOpacity, {
          toValue: 0,
          duration: 220,
          useNativeDriver: true,
        }).start(({ finished }) => {
          if (finished) setFlashMessage(null);
        });
        flashHideTimeoutRef.current = null;
      }, 1400);
    },
    [flashOpacity],
  );

  useEffect(
    () => () => {
      if (flashHideTimeoutRef.current) clearTimeout(flashHideTimeoutRef.current);
    },
    [],
  );

  const summaryItems = useMemo(() => buildTodaySummaryItems(todaySummary), [todaySummary]);
  const dateLabel = useMemo(() => new Date().toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  }), []);

  const openQuickLogForSummary = (summaryType: SummaryType) => {
    setQuickLogInitialType(summaryType);
    setQuickLogOpen(true);
  };

  const closeQuickLog = () => {
    setQuickLogOpen(false);
    setQuickLogInitialType(undefined);
  };

  return (
    <AppScreen
      scrollable
      contentStyle={{
        paddingHorizontal: spacing[4],
        paddingTop: spacing[4],
        paddingBottom: 120,
        gap: spacing[5],
      }}
      screenOverlay={
        <>
          <QuickLogSheet
            isOpen={isQuickLogOpen}
            initialLogType={quickLogInitialType}
            onClose={closeQuickLog}
            onLogComplete={(message) => {
              refreshHomeData(realm);
              showFlashMessage(message);
            }}
          />

          {flashMessage ? (
            <Animated.View
              pointerEvents="none"
              accessibilityLiveRegion="polite"
              accessibilityLabel={flashMessage}
              style={[
                StyleSheet.absoluteFillObject,
                {
                  alignItems: "center",
                  paddingTop: insets.top + spacing[2],
                },
                { opacity: flashOpacity },
              ]}
            >
              <View
                style={[
                  {
                    paddingHorizontal: spacing[4],
                    paddingVertical: spacing[2],
                    borderRadius: radius.pill,
                    backgroundColor: theme.surfaceElevated,
                    borderWidth: 1,
                    borderColor: theme.border,
                  },
                  shadows.md,
                ]}
              >
                <AppText variant="bodySmall" color="success">
                  {flashMessage}
                </AppText>
              </View>
            </Animated.View>
          ) : null}
        </>
      }
    >
      <Animated.View
        style={{
          opacity: fadeIn,
          transform: [{ translateY }],
          gap: spacing[5],
        }}
      >
        <HomeHeader baby={babyProfile ?? homeDailyHubMock.baby} />
        <TodaySummary dateLabel={dateLabel} items={summaryItems} onCardPress={openQuickLogForSummary} />
        <RecentActivityList items={recentActivities} />
      </Animated.View>
    </AppScreen>
  );
}
