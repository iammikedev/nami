import { useRouter } from "expo-router";
import React from "react";
import { Alert, View } from "react-native";

import { QuickLogOptionCard } from "@/src/features/quick-log/components/QuickLogOptionCard";
import { AppScreen, AppText } from "@/src/ui/components";
import { spacing } from "@/src/ui/theme";

const quickLogOptions = [
  {
    title: "Feed",
    subtitle: "Bottle, left, right, duration",
    icon: "baby-bottle-outline",
    colorKey: "feed",
  },
  {
    title: "Sleep",
    subtitle: "Nap or overnight sleep",
    icon: "weather-night",
    colorKey: "sleep",
  },
  {
    title: "Diaper",
    subtitle: "Wet, dirty, or mixed",
    icon: "baby-face-outline",
    colorKey: "diaper",
  },
  {
    title: "Milestone",
    subtitle: "First smile, rolling, and more",
    icon: "star-four-points-outline",
    colorKey: "milestone",
  },
] as const;

export function QuickLogScreen() {
  const router = useRouter();

  return (
    <AppScreen scrollable>
      <View style={{ gap: spacing[4], paddingBottom: spacing[8] }}>
        <View style={{ gap: spacing[1] }}>
          <AppText variant="h2">Quick Log</AppText>
          <AppText color="textSecondary">
            Pick what you want to log. Full log forms can be connected next.
          </AppText>
        </View>

        <View style={{ gap: spacing[3] }}>
          {quickLogOptions.map((option) => (
            <QuickLogOptionCard
              key={option.title}
              title={option.title}
              subtitle={option.subtitle}
              icon={option.icon}
              colorKey={option.colorKey}
              onPress={() => {
                Alert.alert("Coming soon", `${option.title} logging will be connected next.`);
              }}
            />
          ))}
        </View>

        <View>
          <AppText
            variant="caption"
            color="textSecondary"
            onPress={() => router.back()}
          >
            Back
          </AppText>
        </View>
      </View>
    </AppScreen>
  );
}
