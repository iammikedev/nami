import React from "react";
import { Box, HStack, VStack } from "native-base";

import { radius, spacing, useNamiColors } from "../theme";
import { AppButton } from "./AppButton";
import { AppText } from "./AppText";
import { Card } from "./Card";

type EmptyStateProps = {
  title: string;
  message: string;
  actionLabel?: string;
  onActionPress?: () => void;
};

export function EmptyState({
  title,
  message,
  actionLabel,
  onActionPress,
}: EmptyStateProps) {
  const theme = useNamiColors();

  return (
    <Card style={{ alignItems: "center", gap: spacing[3] }}>
      <HStack
        style={{
          width: 72,
          height: 72,
          borderRadius: radius.xxl,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: theme.surface,
          gap: spacing[2],
        }}
      >
        <Box style={{ width: 18, height: 18, borderRadius: radius.pill, backgroundColor: theme.activity.feed }} />
        <Box style={{ width: 18, height: 18, borderRadius: radius.pill, backgroundColor: theme.activity.sleep }} />
      </HStack>
      <AppText variant="h3">{title}</AppText>
      <AppText color="textSecondary">{message}</AppText>
      {actionLabel ? (
        <VStack alignSelf="stretch" mt={spacing[1]}>
          <AppButton label={actionLabel} onPress={onActionPress} />
        </VStack>
      ) : null}
    </Card>
  );
}
