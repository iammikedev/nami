import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRealm } from "@realm/react";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Box } from "native-base";
import React, { useMemo, useState } from "react";
import { Pressable, View } from "react-native";

import { OnboardingProgressPill } from "@/src/features/onboarding/components";
import { useOnboardingStore } from "@/src/features/onboarding/store/onboardingStore";
import { OnboardingOption } from "@/src/features/onboarding/types/onboarding.types";
import { AppButton, AppScreen, AppText } from "@/src/ui/components";
import { animations, useAppColors } from "@/src/ui/theme";

export function OnboardingScreen() {
  const realm = useRealm();
  const router = useRouter();
  const { completeOnboarding } = useOnboardingStore();
  const theme = useAppColors();
  const [selectedId, setSelectedId] =
    useState<OnboardingOption["id"]>("feeding");

  const options = useMemo<OnboardingOption[]>(
    () => [
      {
        id: "feeding",
        label: "Track feeding",
        subtitle: "Log breastfeeding or bottle feeding easily.",
        tintColor: theme.onboarding.cardFeed,
        icon: "baby-bottle-outline",
      },
      {
        id: "sleep",
        label: "Track sleep",
        subtitle: "Understand your baby's sleep patterns.",
        tintColor: theme.onboarding.cardSleep,
        icon: "weather-night",
      },
      {
        id: "milestones",
        label: "Capture milestones",
        subtitle: "Celebrate and remember every milestone.",
        tintColor: theme.onboarding.cardMilestone,
        icon: "star-outline",
      },
    ],
    [
      theme.onboarding.cardFeed,
      theme.onboarding.cardMilestone,
      theme.onboarding.cardSleep,
    ],
  );

  const handleGetStarted = () => {
    completeOnboarding(realm, {});
    router.replace("/(tabs)");
  };

  const renderOptionCard = (option: OnboardingOption) => (
    <Pressable
      key={option.id}
      className="w-full"
      accessibilityRole="button"
      accessibilityLabel={option.label}
      accessibilityHint={option.subtitle}
      onPress={() => setSelectedId(option.id)}
      style={({ pressed }) => ({
        transform: [
          {
            scale: pressed
              ? animations.scale.pressIn
              : animations.scale.pressOut,
          },
        ],
        opacity: pressed ? animations.opacity.pressIn : 1,
      })}
    >
      <Box
        className="relative min-h-[112px] w-full flex-row items-center gap-3 overflow-hidden rounded-3xl border border-b-2 border-[rgba(0,0,0,0.14)] px-4 py-3"
        style={[
          { backgroundColor: option.tintColor },
          selectedId === option.id && { transform: [{ scale: 1.01 }] },
        ]}
      >
        <Box
          className="absolute left-0 right-0 top-0 rounded-full"
          style={{ backgroundColor: "rgba(255,255,255,0.3)", height: 0.6 }}
        />
        <Box
          className="h-[58px] w-[58px] items-center justify-center rounded-full"
          shadow={1}
          style={{ backgroundColor: theme.surfaceElevated }}
        >
          <MaterialCommunityIcons
            name={option.icon}
            size={27}
            color={theme.textPrimary}
          />
        </Box>
        <Box className="flex-1 gap-1">
          <AppText variant="title">{option.label}</AppText>
          <AppText variant="bodySmall" color="textSecondary">
            {option.subtitle}
          </AppText>
        </Box>
        <Box
          className="h-[34px] w-[34px] items-center justify-center rounded-full"
          shadow={1}
          style={{ backgroundColor: theme.surfaceElevated }}
        >
          <MaterialCommunityIcons
            name="chevron-right"
            size={18}
            color={theme.textSecondary}
          />
        </Box>
      </Box>
    </Pressable>
  );

  return (
    <AppScreen contentStyle={{ flex: 1 }}>
      <View className="flex-1 gap-4">
        <View className="flex-row items-start justify-between">
          <View />
          <OnboardingProgressPill step={1} totalSteps={1} />
        </View>

        <View className=" justify-center gap-2">
          <View className="relative min-h-[110px] justify-end">
            <View className="z-[2] max-w-[56%] gap-1">
              <AppText variant="h1" color={theme.primary}>
                nami
              </AppText>
              <AppText color="textSecondary">
                Gentle care, captured simply.
              </AppText>
            </View>
            <View
              className="absolute -right-3 -top-10 z-0 h-[300px] w-[250px] items-center justify-end"
              pointerEvents="none"
            >
              <Image
                source={require("@/assets/png/baby.png")}
                contentFit="contain"
                style={{ width: "100%", height: "100%" }}
                accessibilityLabel="Sleeping baby on cloud"
              />
            </View>
          </View>
        </View>
        <AppText variant="h1" className="mt-4 max-w-[92%]">
          Track your baby&apos;s routine effortlessly
        </AppText>
        <View className="-mt-1 flex-row items-center gap-2">
          <View
            className="h-px w-[155px]"
            style={{ backgroundColor: theme.border }}
          />
          <MaterialCommunityIcons
            name="heart"
            size={16}
            color={theme.activity.feed}
          />
        </View>
        <View className="gap-3">{options.map(renderOptionCard)}</View>

        <View className="mt-auto gap-3 pt-3">
          <AppButton
            label="Get Started"
            onPress={handleGetStarted}
            variant="hero3d"
            className="w-full"
          />
        </View>
      </View>
    </AppScreen>
  );
}
