import React from "react";
import { StyleSheet, View } from "react-native";

import { radius, spacing, useAppColors } from "@/src/ui/theme";

type OnboardingPaginationDotsProps = {
  activeIndex: number;
  total: number;
};

export function OnboardingPaginationDots({
  activeIndex,
  total,
}: OnboardingPaginationDotsProps) {
  const theme = useAppColors();

  return (
    <View style={styles.row} accessibilityLabel={`Step ${activeIndex + 1} of ${total}`}>
      {Array.from({ length: total }).map((_, idx) => (
        <View
          key={idx}
          style={[
            styles.dot,
            { backgroundColor: idx === activeIndex ? theme.primary : theme.border },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "center",
    gap: spacing[2],
  },
  dot: {
    width: spacing[2],
    height: spacing[2],
    borderRadius: radius.pill,
  },
});
