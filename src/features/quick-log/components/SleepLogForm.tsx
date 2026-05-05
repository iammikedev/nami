import * as Haptics from "expo-haptics";
import type Realm from "realm";
import { HStack, VStack } from "native-base";
import React, { useState } from "react";

import { SleepActionCard } from "@/src/features/quick-log/components/SleepActionCard";
import { SleepDurationPresets } from "@/src/features/quick-log/components/SleepDurationPresets";
import { useQuickLogStore } from "@/src/features/quick-log/store/quickLogStore";
import { AppButton, AppText } from "@/src/ui/components";
import { useNamiColors } from "@/src/ui/theme";

type SleepLogFormProps = {
  realm?: Realm;
  onComplete: (message: string) => void;
};

export function SleepLogForm({ realm, onComplete }: SleepLogFormProps) {
  const theme = useNamiColors();
  const startSleepSession = useQuickLogStore((s) => s.startSleepSession);
  const endSleepSession = useQuickLogStore((s) => s.endSleepSession);
  const saveCompletedSleepLog = useQuickLogStore((s) => s.saveCompletedSleepLog);

  const [selectedMinutes, setSelectedMinutes] = useState<number>();
  const [validationMessage, setValidationMessage] = useState<string>();

  const clearValidation = () => setValidationMessage(undefined);

  const handleStart = () => {
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    clearValidation();
    const r = startSleepSession(realm);
    if (!r.ok) {
      setValidationMessage(r.error);
      return;
    }
    onComplete("Sleep started");
  };

  const handleEnd = () => {
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    clearValidation();
    const r = endSleepSession(realm);
    if (!r.ok) {
      setValidationMessage(r.error);
      return;
    }
    onComplete("Sleep saved");
  };

  const handlePreset = (minutes: number) => {
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    clearValidation();
    setSelectedMinutes(minutes);
  };

  const handleSave = () => {
    if (selectedMinutes == null) return;
    void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    clearValidation();
    saveCompletedSleepLog(selectedMinutes, realm);
    setSelectedMinutes(undefined);
    onComplete("Sleep saved");
  };

  return (
    <VStack className="gap-4">
      <VStack
        className="rounded-3xl border px-4 py-4"
        style={{
          borderColor: `${theme.activity.sleep}44`,
          backgroundColor: theme.onboarding.cardSleep,
        }}
      >
        <HStack className="justify-between gap-3">
          <SleepActionCard
            label="Start Sleep"
            icon="weather-night"
            accessibilityLabel="Start sleep session"
            onPress={handleStart}
          />
          <SleepActionCard
            label="End Sleep"
            icon="check-circle"
            accessibilityLabel="End sleep session"
            onPress={handleEnd}
          />
        </HStack>
      </VStack>

      <VStack className="gap-2">
        <SleepDurationPresets value={selectedMinutes} onSelect={handlePreset} />
      </VStack>

      {validationMessage ? (
        <AppText variant="caption" style={{ color: theme.semantic.error }}>
          {validationMessage}
        </AppText>
      ) : null}

      <AppButton
        label="Save"
        variant="hero3d"
        disabled={selectedMinutes == null}
        onPress={handleSave}
      />
    </VStack>
  );
}
