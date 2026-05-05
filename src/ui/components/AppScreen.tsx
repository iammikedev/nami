import React, { PropsWithChildren } from "react";
import { Box, ScrollView } from "native-base";
import {
  SafeAreaView,
  StyleProp,
  ViewStyle,
} from "react-native";

import { spacing, useNamiColors } from "../theme";

type AppScreenProps = PropsWithChildren<{
  scrollable?: boolean;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
}>;

export function AppScreen({
  children,
  scrollable = false,
  style,
  contentStyle,
}: AppScreenProps) {
  const theme = useNamiColors();

  return (
    <SafeAreaView style={[{ flex: 1, backgroundColor: theme.background }, style]}>
      {scrollable ? (
        <ScrollView
          contentContainerStyle={[
            {
              paddingHorizontal: spacing[5],
              paddingTop: spacing[4],
              paddingBottom: spacing[4],
            },
            contentStyle,
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      ) : (
        <Box
          style={[
            {
              flex: 1,
              paddingHorizontal: spacing[5],
              paddingTop: spacing[4],
              paddingBottom: spacing[4],
            },
            contentStyle,
          ]}
        >
          {children}
        </Box>
      )}
    </SafeAreaView>
  );
}
