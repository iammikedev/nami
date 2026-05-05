import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";
import { ComponentProps, StyleSheet, View } from "react-native";

import { colors, iconSizes, spacing, useAppColors } from "@/src/ui/theme";
import { AppText } from "./AppText";
import { Card } from "./Card";

type ActivityType = keyof typeof colors.light.activity;
type IconName = ComponentProps<typeof MaterialCommunityIcons>["name"];

const activityIcons: Record<ActivityType, IconName> = {
  feed: "baby-bottle-outline",
  sleep: "sleep",
  diaper: "baby-face-outline",
  milestone: "star-outline",
};

type ActivityCardProps = {
  type: ActivityType;
  title: string;
  detail?: string;
  timestamp?: string;
};

export function ActivityCard({ type, title, detail, timestamp }: ActivityCardProps) {
  const theme = useAppColors();
  const tint = theme.activity[type];

  return (
    <Card>
      <View style={styles.row}>
        <View style={[styles.iconWrap, { backgroundColor: tint }]}>
          <MaterialCommunityIcons
            name={activityIcons[type]}
            size={iconSizes.md}
            color={theme.textPrimary}
          />
        </View>
        <View style={styles.content}>
          <AppText variant="bodyEmphasis">{title}</AppText>
          {detail ? <AppText variant="bodySmall" color={theme.textSecondary}>{detail}</AppText> : null}
        </View>
        {timestamp ? <AppText variant="caption" color={theme.textSecondary}>{timestamp}</AppText> : null}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[3],
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
    gap: spacing[1],
  },
});
