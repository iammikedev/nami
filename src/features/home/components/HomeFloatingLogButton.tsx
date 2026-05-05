import React from "react";
import { StyleSheet } from "react-native";

import { FloatingActionButton } from "@/src/ui/components";
import { spacing, useNamiColors } from "@/src/ui/theme";

type HomeFloatingLogButtonProps = {
  onPress?: () => void;
};

export function HomeFloatingLogButton({ onPress }: HomeFloatingLogButtonProps) {
  const theme = useNamiColors();

  return (
    <FloatingActionButton
      label="Log"
      iconName="plus"
      onPress={onPress}
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
