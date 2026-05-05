import { HStack } from "native-base";
import React from "react";

import { AppButton, AppText, Card } from "@/src/ui/components";

type TimerControlProps = {
  elapsedLabel: string;
  isRunning: boolean;
  onStart: () => void;
  onStop: () => void;
};

export function TimerControl({ elapsedLabel, isRunning, onStart, onStop }: TimerControlProps) {
  return (
    <Card style={{ padding: 12 }}>
      <HStack alignItems="center" justifyContent="space-between" className="gap-2">
        <AppText variant="title">Timer: {elapsedLabel}</AppText>
        <AppButton label={isRunning ? "Stop" : "Start"} variant="secondary" onPress={isRunning ? onStop : onStart} />
      </HStack>
    </Card>
  );
}
