import * as Haptics from "expo-haptics";
import { VStack } from "native-base";
import React, { useEffect, useMemo, useState } from "react";

import { BottleAmountInput } from "@/src/features/quick-log/components/BottleAmountInput";
import { DurationPresets } from "@/src/features/quick-log/components/DurationPresets";
import { MethodSelector } from "@/src/features/quick-log/components/MethodSelector";
import { SideSelector } from "@/src/features/quick-log/components/SideSelector";
import { TimerControl } from "@/src/features/quick-log/components/TimerControl";
import type { BreastSide, FeedMethod } from "@/src/features/quick-log/types/quickLog.types";
import {
  elapsedSecondsToRoundedMinutes,
  formatElapsedLabel,
  getElapsedSeconds,
} from "@/src/features/quick-log/utils/timer.utils";
import { AppButton, AppText } from "@/src/ui/components";

type FeedSavePayload = {
  method: FeedMethod;
  side?: BreastSide;
  durationMinutes?: number;
  amountMl?: number;
  startedAt?: Date;
  endedAt?: Date;
};

type FeedLogFormProps = {
  onSave: (payload: FeedSavePayload) => void;
  onRunningTimerChange: (running: boolean) => void;
};

export function FeedLogForm({ onSave, onRunningTimerChange }: FeedLogFormProps) {
  const [method, setMethod] = useState<FeedMethod>("breastfeed");
  const [side, setSide] = useState<BreastSide>();
  const [durationMinutes, setDurationMinutes] = useState<number>();
  const [amountText, setAmountText] = useState("");
  const [startedAt, setStartedAt] = useState<Date>();
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const isTimerRunning = Boolean(startedAt);

  useEffect(() => {
    onRunningTimerChange(isTimerRunning);
  }, [isTimerRunning, onRunningTimerChange]);

  useEffect(() => {
    if (!startedAt) return;

    const interval = setInterval(() => {
      setElapsedSeconds(getElapsedSeconds(startedAt));
    }, 1000);

    return () => clearInterval(interval);
  }, [startedAt]);

  const amountMl = Number(amountText);
  const isBreastValid = Boolean(side && durationMinutes && durationMinutes > 0);
  const isBottleValid = Number.isFinite(amountMl) && amountMl > 0;
  const canSave = method === "breastfeed" ? isBreastValid : isBottleValid;

  const elapsedLabel = useMemo(() => formatElapsedLabel(elapsedSeconds), [elapsedSeconds]);

  const handleMethodChange = (nextMethod: FeedMethod) => {
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setMethod(nextMethod);
    if (nextMethod === "bottle") {
      setSide(undefined);
      setDurationMinutes(undefined);
      setStartedAt(undefined);
      setElapsedSeconds(0);
      onRunningTimerChange(false);
    } else {
      setAmountText("");
    }
  };

  const handleStartTimer = () => {
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const now = new Date();
    setStartedAt(now);
    setElapsedSeconds(0);
    setDurationMinutes(undefined);
  };

  const handleStopTimer = () => {
    if (!startedAt) return;
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const seconds = getElapsedSeconds(startedAt);
    const mins = elapsedSecondsToRoundedMinutes(seconds);
    setDurationMinutes(mins);
    setStartedAt(undefined);
    onRunningTimerChange(false);
  };

  const handleSave = () => {
    if (!canSave) return;

    void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    onSave({
      method,
      side,
      durationMinutes: method === "breastfeed" ? durationMinutes : undefined,
      amountMl: method === "bottle" ? amountMl : undefined,
      startedAt: method === "breastfeed" ? startedAt : undefined,
      endedAt: method === "breastfeed" ? new Date() : undefined,
    });

    setMethod("breastfeed");
    setSide(undefined);
    setDurationMinutes(undefined);
    setAmountText("");
    setStartedAt(undefined);
    setElapsedSeconds(0);
    onRunningTimerChange(false);
  };

  return (
    <VStack className="gap-3">
      <MethodSelector value={method} onChange={handleMethodChange} />

      {method === "breastfeed" ? (
        <VStack className="gap-3">
          <SideSelector value={side} onChange={setSide} />
          <DurationPresets value={durationMinutes} onSelect={setDurationMinutes} />
          <TimerControl
            elapsedLabel={elapsedLabel}
            isRunning={isTimerRunning}
            onStart={handleStartTimer}
            onStop={handleStopTimer}
          />
          {!isBreastValid ? (
            <AppText variant="caption" color="textSecondary">
              Select side and duration (or stop timer) to save.
            </AppText>
          ) : null}
        </VStack>
      ) : (
        <BottleAmountInput value={amountText} onChange={setAmountText} />
      )}

      <AppButton label="Save Feed" variant="hero3d" disabled={!canSave} onPress={handleSave} />
    </VStack>
  );
}
