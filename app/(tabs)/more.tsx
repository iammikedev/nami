import React from "react";
import { View } from "react-native";

import { AppScreen, AppText } from "@/src/ui/components";
import { spacing } from "@/src/ui/theme";

export default function MoreTabRoute() {
  return (
    <AppScreen>
      <View style={{ gap: spacing[2] }}>
        <AppText variant="h2">More</AppText>
        <AppText color="textSecondary">
          Profile, settings, and account actions will live here.
        </AppText>
      </View>
    </AppScreen>
  );
}
