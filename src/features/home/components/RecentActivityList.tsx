import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

import type { RecentActivityItem as RecentActivityItemType } from "@/src/features/home/types/home.types";
import { AppText } from "@/src/ui/components";
import { spacing, useNamiColors } from "@/src/ui/theme";
import { RecentActivityItem } from "./RecentActivityItem";

type RecentActivityListProps = {
  items: RecentActivityItemType[];
  onPressViewAll?: () => void;
};

export function RecentActivityList({
  items,
  onPressViewAll,
}: RecentActivityListProps) {
  const theme = useNamiColors();

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <AppText variant="h3">Recent Activity</AppText>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="View all activities"
          onPress={onPressViewAll}
          style={({ pressed }) => [{ opacity: pressed ? 0.85 : 1 }]}
        >
          <View style={styles.viewAll}>
            <AppText color="textSecondary">View all</AppText>
            <MaterialCommunityIcons
              name="chevron-right"
              size={16}
              color={theme.textSecondary}
            />
          </View>
        </Pressable>
      </View>

      <View style={styles.list}>
        {items.map((item) => (
          <RecentActivityItem key={item.id} item={item} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { gap: spacing[3] },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  viewAll: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  list: { gap: spacing[2] },
});
