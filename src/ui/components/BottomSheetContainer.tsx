import React, { PropsWithChildren } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

import { radius, shadows, spacing, useAppColors, zIndex } from "@/src/ui/theme";

type BottomSheetContainerProps = PropsWithChildren<{
  style?: StyleProp<ViewStyle>;
}>;

export function BottomSheetContainer({ children, style }: BottomSheetContainerProps) {
  const theme = useAppColors();

  return (
    <View
      style={[
        styles.sheet,
        shadows.lg,
        {
          backgroundColor: theme.surfaceElevated,
          borderColor: theme.border,
        },
        style,
      ]}
    >
      <View style={[styles.handle, { backgroundColor: theme.border }]} />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  sheet: {
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    borderWidth: 1,
    padding: spacing[4],
    gap: spacing[3],
    zIndex: zIndex.sheet,
  },
  handle: {
    width: 44,
    height: 5,
    borderRadius: 999,
    alignSelf: "center",
  },
});
