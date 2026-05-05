import React from "react";
import { View } from "react-native";

import { AppScreen, AppText } from "@/src/ui/components";
import { spacing } from "@/src/ui/theme";

export default function InsightsTabRoute() {
  return (
    <AppScreen>
      <View style={{ gap: spacing[2] }}>
        <AppText variant="h2">Insights</AppText>
        <AppText color="textSecondary">
          Sleep, feed, and diaper trends are coming soon.
        </AppText>
      </View>
    </AppScreen>
  );
}
