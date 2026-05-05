import { Image } from "expo-image";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import type { HomeBabyProfile } from "@/src/features/home/types/home.types";
import { AppText } from "@/src/ui/components";
import { layout, shadows, spacing, useNamiColors } from "@/src/ui/theme";

type HomeHeaderProps = {
  baby: HomeBabyProfile;
};

export function HomeHeader({ baby }: HomeHeaderProps) {
  const theme = useNamiColors();

  return (
    <View style={styles.root}>
      <View style={styles.left}>
        <View style={[styles.avatarWrap, { borderColor: theme.border }]}>
          <Image
            source={require("@/assets/png/baby.png")}
            contentFit="cover"
            style={styles.avatar}
          />
        </View>
        <View style={styles.copy}>
          <AppText variant="h2">{`${baby.name} • ${baby.ageLabel}`}</AppText>
          <AppText color="textSecondary">Here&apos;s today&apos;s little moments.</AppText>
        </View>
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Notifications"
        style={({ pressed }) => [
          styles.bellButton,
          {
            borderColor: theme.border,
            backgroundColor: theme.surfaceElevated,
            opacity: pressed ? 0.9 : 1,
          },
        ]}
      >
        <MaterialCommunityIcons
          name="bell-outline"
          size={20}
          color={theme.textPrimary}
        />
        <View
          style={[styles.unreadDot, { backgroundColor: theme.semantic.error }]}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[3],
    flex: 1,
    paddingRight: spacing[2],
  },
  avatarWrap: {
    width: 62,
    height: 62,
    borderRadius: 31,
    borderWidth: 1,
    overflow: "hidden",
    ...shadows.sm,
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
  copy: {
    gap: 2,
    flexShrink: 1,
  },
  bellButton: {
    width: layout.touchMin,
    height: layout.touchMin,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    ...shadows.sm,
  },
  unreadDot: {
    position: "absolute",
    top: 11,
    right: 11,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});
