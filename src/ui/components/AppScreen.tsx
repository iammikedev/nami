import React, { PropsWithChildren } from "react";
import { ScrollView, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { layout, spacing, useAppColors } from "@/src/ui/theme";

type AppScreenProps = PropsWithChildren<{
  scrollable?: boolean;
  contentStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
}>;

export function AppScreen({
  children,
  scrollable = false,
  contentStyle,
  style,
}: AppScreenProps) {
  const theme = useAppColors();

  if (scrollable) {
    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }, style]}>
        <ScrollView
          contentContainerStyle={[
            styles.content,
            { paddingBottom: spacing[12] },
            contentStyle,
          ]}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }, style]}>
      <View style={[styles.content, contentStyle]}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    width: "100%",
    maxWidth: layout.maxContentWidth,
    paddingHorizontal: layout.screenHorizontalPadding,
    alignSelf: "center",
    paddingTop: spacing[4],
    gap: layout.sectionGap,
  },
});
