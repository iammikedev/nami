import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

import { FloatingActionButton } from "@/src/ui/components";
import { spacing, useNamiColors } from "@/src/ui/theme";

export function HomeFloatingLogButton() {
  const theme = useNamiColors();
  const router = useRouter();

  return (
    <FloatingActionButton
      label="Log"
      iconName="plus"
      onPress={() => router.push("/quick-log")}
      textColor={theme.surfaceElevated}
      iconColor={theme.surfaceElevated}
      borderColor={theme.surfaceElevated}
      style={styles.fab}
    />
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    right: spacing[4],
    bottom: spacing[6],
    borderWidth: 2,
    paddingHorizontal: spacing[5],
  },
});
