import React, { PropsWithChildren, ReactNode } from "react";
import { Box, ScrollView } from "native-base";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleProp,
  ViewStyle,
} from "react-native";

import { spacing, useNamiColors } from "../theme";

type AppScreenProps = PropsWithChildren<{
  scrollable?: boolean;
  keyboardAvoiding?: boolean;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  /** Siblings rendered outside the scroll/body, still inside SafeAreaView (FAB, toasts, etc.). */
  screenOverlay?: ReactNode;
}>;

export function AppScreen({
  children,
  scrollable = false,
  keyboardAvoiding = false,
  style,
  contentStyle,
  screenOverlay,
}: AppScreenProps) {
  const theme = useNamiColors();

  const paddedContentStyle = [
    {
      paddingHorizontal: spacing[5],
      paddingTop: spacing[4],
      paddingBottom: spacing[4],
    },
    contentStyle,
  ];

  const body = scrollable ? (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={paddedContentStyle}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  ) : (
    <Box style={[{ flex: 1 }, paddedContentStyle]}>{children}</Box>
  );

  const wrapped = keyboardAvoiding ? (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      {body}
    </KeyboardAvoidingView>
  ) : (
    body
  );

  return (
    <SafeAreaView style={[{ flex: 1, backgroundColor: theme.background }, style]}>
      {wrapped}
      {screenOverlay}
    </SafeAreaView>
  );
}
