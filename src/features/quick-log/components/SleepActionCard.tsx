import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Box, Pressable, VStack } from "native-base";
import React from "react";

import { AppText } from "@/src/ui/components";
import { useNamiColors } from "@/src/ui/theme";

type SleepActionCardProps = {
  label: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  onPress: () => void;
  accessibilityLabel?: string;
};

export function SleepActionCard({ label, icon, onPress, accessibilityLabel }: SleepActionCardProps) {
  const theme = useNamiColors();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      onPress={onPress}
      className="w-[48.5%]"
    >
      {({ isPressed }) => (
        <VStack
          className="min-h-[120px] rounded-3xl border border-nami-border/80 px-4 py-4"
          style={{
            backgroundColor: theme.onboarding.cardSleep,
            transform: [{ scale: isPressed ? 0.97 : 1 }],
            opacity: isPressed ? 0.94 : 1,
            shadowColor: "#2F3A34",
            shadowOpacity: isPressed ? 0.06 : 0.1,
            shadowRadius: 10,
            shadowOffset: { width: 0, height: 4 },
            elevation: 4,
          }}
        >
          <Box className="h-14 w-14 items-center justify-center self-center rounded-full bg-white/55">
            <MaterialCommunityIcons name={icon} size={30} color={theme.textPrimary} />
          </Box>
          <AppText variant="title" className="mt-3 text-center">
            {label}
          </AppText>
        </VStack>
      )}
    </Pressable>
  );
}
