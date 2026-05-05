import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { AppText, Card } from "@/src/ui/components";
import {
  animations,
  radius,
  shadows,
  spacing,
  useAppColors,
} from "@/src/ui/theme";

type OnboardingOptionCardProps = {
  title: string;
  subtitle: string;
  tintColor: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  selected?: boolean;
  onPress?: () => void;
};

export function OnboardingOptionCard({
  title,
  subtitle,
  tintColor,
  icon,
  selected = false,
  onPress,
}: OnboardingOptionCardProps) {
  const theme = useAppColors();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityHint={subtitle}
      onPress={onPress}
      style={({ pressed }) => [
        styles.wrapper,
        {
          transform: [
            {
              scale: pressed
                ? animations.scale.pressIn
                : animations.scale.pressOut,
            },
          ],
          opacity: pressed
            ? animations.opacity.pressIn
            : animations.opacity.pressOut,
        },
      ]}
    >
      <Card
        style={[
          styles.card,
          shadows.sm,
          { backgroundColor: tintColor },
          selected && styles.selected,
        ]}
      >
        <View
          style={[
            styles.iconWrap,
            {
              backgroundColor: theme.surfaceElevated,
              borderColor: theme.border,
            },
          ]}
        >
          <MaterialCommunityIcons
            name={icon}
            size={24}
            color={theme.textPrimary}
          />
        </View>
        <View style={styles.textWrap}>
          <AppText variant="title">{title}</AppText>
          <AppText variant="bodySmall" color="textSecondary">
            {subtitle}
          </AppText>
        </View>
        <View
          style={[
            styles.arrowWrap,
            {
              backgroundColor: theme.surfaceElevated,
              borderColor: theme.border,
            },
          ]}
        >
          <MaterialCommunityIcons
            name="chevron-right"
            size={20}
            color={theme.textSecondary}
          />
        </View>
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
  },
  card: {
    minHeight: 112,
    borderRadius: radius.xxl,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing[3],
    borderWidth: 0,
  },
  selected: {
    transform: [{ scale: 1.01 }],
  },
  iconWrap: {
    width: 58,
    height: 58,
    borderRadius: radius.pill,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textWrap: {
    flex: 1,
    gap: spacing[1],
  },
  arrowWrap: {
    width: 36,
    height: 36,
    borderRadius: radius.pill,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
