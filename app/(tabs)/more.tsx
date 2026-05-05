import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import type { Href } from "expo-router";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, View } from "react-native";

import { AppScreen, AppText } from "@/src/ui/components";
import { radius, shadows, spacing, useNamiColors } from "@/src/ui/theme";

export default function MoreTabRoute() {
  const theme = useNamiColors();
  const router = useRouter();

  return (
    <AppScreen
      scrollable
      contentStyle={{ gap: spacing[5], paddingBottom: spacing[10] }}
    >
      <View style={{ gap: spacing[1] }}>
        <AppText variant="h2">More</AppText>
        <AppText color="textSecondary">
          Calm tools and preferences for your day with baby.
        </AppText>
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Smart Reminders"
        onPress={() => router.push("/reminder-settings" as Href)}
        style={({ pressed }) => [
          {
            borderRadius: radius.xxl,
            borderWidth: 1,
            borderColor: theme.border,
            backgroundColor: theme.surfaceElevated,
            paddingVertical: spacing[4],
            paddingHorizontal: spacing[4],
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            opacity: pressed ? 0.92 : 1,
          },
          shadows.md,
        ]}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: spacing[3],
            flex: 1,
          }}
        >
          <View
            style={{
              width: 48,
              height: 48,
              borderRadius: radius.xl,
              backgroundColor: theme.onboarding.cardFeed,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MaterialCommunityIcons
              name="bell-ring-outline"
              size={24}
              color={theme.textPrimary}
            />
          </View>
          <View style={{ flex: 1, gap: spacing[1] }}>
            <AppText variant="title">Smart Reminders</AppText>
            <AppText variant="bodySmall" color="textSecondary">
              Gentle feeding and sleep nudges
            </AppText>
          </View>
        </View>
      </Pressable>
    </AppScreen>
  );
}
