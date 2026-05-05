import React from "react";
import { StyleSheet, View } from "react-native";

import { spacing, useAppColors } from "@/src/ui/theme";
import { AppText } from "./AppText";

type TimelineItemProps = {
  time: string;
  title: string;
  detail?: string;
};

export function TimelineItem({ time, title, detail }: TimelineItemProps) {
  const theme = useAppColors();

  return (
    <View style={styles.row}>
      <View style={styles.left}>
        <AppText variant="caption" color={theme.textSecondary}>
          {time}
        </AppText>
      </View>
      <View style={styles.center}>
        <View style={[styles.dot, { backgroundColor: theme.primary }]} />
        <View style={[styles.line, { backgroundColor: theme.border }]} />
      </View>
      <View style={styles.right}>
        <AppText variant="bodyEmphasis">{title}</AppText>
        {detail ? (
          <AppText variant="bodySmall" color={theme.textSecondary}>
            {detail}
          </AppText>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing[3],
  },
  left: {
    width: 56,
    paddingTop: 2,
  },
  center: {
    alignItems: "center",
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 999,
    marginTop: 4,
  },
  line: {
    width: 2,
    flex: 1,
    minHeight: 34,
    marginTop: 4,
    borderRadius: 999,
  },
  right: {
    flex: 1,
    gap: spacing[1],
  },
});
