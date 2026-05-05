import { useRealm } from "@realm/react";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Box } from "native-base";
import React, { useCallback, useMemo, useState } from "react";
import { View, useWindowDimensions } from "react-native";

import {
  BabyNameInput,
  BirthdateInput,
  OnboardingPaginationDots,
  OnboardingProgressPill,
} from "@/src/features/onboarding/components";
import { useOnboardingStore } from "@/src/features/onboarding/store/onboardingStore";
import { AppButton, AppScreen, AppText } from "@/src/ui/components";

function startOfLocalDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function isFutureDateOnly(d: Date) {
  const today = startOfLocalDay(new Date());
  const chosen = startOfLocalDay(d);
  return chosen.getTime() > today.getTime();
}

export function BabySetupScreen() {
  const realm = useRealm();
  const router = useRouter();
  const { completeOnboarding } = useOnboardingStore();
  const { width } = useWindowDimensions();

  const [babyName, setBabyName] = useState("");
  const [babyBirthdate, setBabyBirthdate] = useState<Date | null>(null);
  const [nameBlurred, setNameBlurred] = useState(false);
  const [birthTouched, setBirthTouched] = useState(false);

  const heroWidth = Math.min(width * 0.42, 168);

  const nameError = useMemo(() => {
    if (!nameBlurred) {
      return undefined;
    }
    if (babyName.trim().length === 0) {
      return "Baby name is required";
    }
    return undefined;
  }, [babyName, nameBlurred]);

  const birthError = useMemo(() => {
    if (!birthTouched) {
      return undefined;
    }
    if (!babyBirthdate) {
      return "Birthdate is required";
    }
    if (isFutureDateOnly(babyBirthdate)) {
      return "Birthdate cannot be in the future";
    }
    return undefined;
  }, [babyBirthdate, birthTouched]);

  const formValid =
    babyName.trim().length > 0 &&
    babyBirthdate !== null &&
    !isFutureDateOnly(babyBirthdate);

  const handleStart = useCallback(() => {
    if (!babyBirthdate || !formValid) {
      return;
    }
    completeOnboarding(realm, {
      babyName: babyName.trim(),
      babyBirthdate,
    });
    router.replace("/(tabs)");
  }, [babyBirthdate, babyName, completeOnboarding, formValid, realm, router]);

  return (
    <AppScreen scrollable keyboardAvoiding contentStyle={{ flexGrow: 1 }}>
      <View className="flex-1 gap-4">
        <View className="flex-row items-start justify-between">
          <View />
          <OnboardingProgressPill step={3} totalSteps={3} />
        </View>

        <Box className="items-center" accessibilityElementsHidden={false}>
          <Image
            source={require("@/assets/png/baby.png")}
            contentFit="contain"
            style={{ width: heroWidth, height: heroWidth * 1.05 }}
            accessibilityLabel="Nami baby mascot"
          />
        </Box>

        <View className="gap-2">
          <AppText variant="h1" accessibilityRole="header">
            Let&apos;s get to know your baby
          </AppText>
          <AppText color="textSecondary">
            This helps Nami personalize your baby&apos;s timeline and daily
            tracking.
          </AppText>
        </View>

        <View className="gap-4 pt-1">
          <BabyNameInput
            value={babyName}
            onChangeText={setBabyName}
            onBlur={() => setNameBlurred(true)}
            error={nameError}
          />
          <BirthdateInput
            value={babyBirthdate}
            onChange={(d) => {
              setBabyBirthdate(d);
              setBirthTouched(true);
            }}
            onOpen={() => setBirthTouched(true)}
            error={birthError}
          />
        </View>

        <View className="mt-auto gap-5 pt-4">
          <AppButton
            label="Start Tracking"
            onPress={handleStart}
            variant="hero3d"
            className="w-full"
            disabled={!formValid}
            accessibilityHint={
              formValid
                ? "Saves your baby profile and opens the home screen"
                : "Enter baby name and birthdate to continue"
            }
          />
          <OnboardingPaginationDots activeIndex={2} total={3} />
        </View>
      </View>
    </AppScreen>
  );
}
