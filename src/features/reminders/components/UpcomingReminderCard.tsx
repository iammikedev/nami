import { Box, VStack } from "native-base";
import React, { useMemo } from "react";

import { AppText } from "@/src/ui/components";
import { radius, shadows, spacing, useNamiColors } from "@/src/ui/theme";

import type { UpcomingReminderLine } from "../types/reminder.types";

type UpcomingReminderCardProps = {
  lines: UpcomingReminderLine[];
  /** When false, show the gentle “off” copy instead of examples. */
  anyEnabled: boolean;
  /** Bump when parent refreshes logs so previews stay fresh without a Realm listener. */
  refreshKey?: number;
};

export function UpcomingReminderCard({ lines, anyEnabled, refreshKey }: UpcomingReminderCardProps) {
  const theme = useNamiColors();

  const body = useMemo(() => {
    void refreshKey;
    if (!anyEnabled) {
      return (
        <AppText variant="bodySmall" color="textSecondary">
          Smart reminders are turned off.
        </AppText>
      );
    }
    if (lines.length === 0) {
      return (
        <AppText variant="bodySmall" color="textSecondary">
          Turn on a reminder above to see what is coming next.
        </AppText>
      );
    }
    return (
      <VStack space={2}>
        {lines.map((line) => (
          <AppText key={line.id} variant="body">
            {line.text}
          </AppText>
        ))}
      </VStack>
    );
  }, [anyEnabled, lines, refreshKey]);

  return (
    <Box
      className="border"
      style={[
        {
          borderRadius: radius.xxl,
          borderColor: theme.border,
          backgroundColor: `${theme.surface}CC`,
          padding: spacing[4],
        },
        shadows.sm,
      ]}
    >
      <VStack space={2}>
        <AppText variant="caption" color="textSecondary" style={{ letterSpacing: 0.4 }}>
          Upcoming
        </AppText>
        {body}
      </VStack>
    </Box>
  );
}
