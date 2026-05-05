import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";
import { Box, Pressable } from "native-base";

import { AppText } from "@/src/ui/components";
import { radius, useNamiColors } from "@/src/ui/theme";

type PhotoPickerButtonProps = {
  onPress: () => void;
};

export function PhotoPickerButton({ onPress }: PhotoPickerButtonProps) {
  const theme = useNamiColors();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Add photo"
      onPress={onPress}
    >
      {({ isPressed }) => (
        <Box
          className="flex-row items-center justify-center gap-2 px-4 py-4"
          style={{
            borderRadius: radius.xxl,
            borderWidth: 1,
            borderColor: theme.border,
            borderStyle: "dashed",
            backgroundColor: theme.surfaceElevated,
            opacity: isPressed ? 0.88 : 1,
            minHeight: 52,
          }}
        >
          <MaterialCommunityIcons name="camera-plus-outline" size={22} color={theme.textSecondary} />
          <AppText variant="button" color="textSecondary">
            Add Photo
          </AppText>
        </Box>
      )}
    </Pressable>
  );
}
