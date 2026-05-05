import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

import { HomeFloatingLogButton } from "@/src/features/home/components/HomeFloatingLogButton";
import { HomeHeader } from "@/src/features/home/components/HomeHeader";
import { RecentActivityList } from "@/src/features/home/components/RecentActivityList";
import { TodaySummary } from "@/src/features/home/components/TodaySummary";
import { homeDailyHubMock } from "@/src/features/home/data/home.mock";
import { AppScreen } from "@/src/ui/components";
import { animations, spacing } from "@/src/ui/theme";

export function HomeScreen() {
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

  return (
    <AppScreen
      scrollable
      contentStyle={{
        paddingHorizontal: spacing[4],
        paddingTop: spacing[4],
        paddingBottom: 210,
        gap: spacing[5],
      }}
    >
      <Animated.View
        style={{
          opacity: fadeIn,
          transform: [{ translateY }],
          gap: spacing[5],
        }}
      >
        <HomeHeader baby={homeDailyHubMock.baby} />
        <TodaySummary
          dateLabel={homeDailyHubMock.dateLabel}
          items={homeDailyHubMock.summaryItems}
        />
        <RecentActivityList items={homeDailyHubMock.activities} />
      </Animated.View>

      <View pointerEvents="box-none" style={StyleSheet.absoluteFillObject}>
        <HomeFloatingLogButton />
      </View>
    </AppScreen>
  );
}
