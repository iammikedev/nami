import React from "react";
import { View } from "react-native";

import { AppScreen, AppText } from "@/src/ui/components";
import { spacing } from "@/src/ui/theme";

export default function HistoryTabRoute() {
  return (
    <AppScreen>
      <View style={{ gap: spacing[2] }}>
        <AppText variant="h2">History</AppText>
        <AppText color="textSecondary">
          Timeline and day-to-day logs will appear here next.
        </AppText>
      </View>
    </AppScreen>
  );
}
