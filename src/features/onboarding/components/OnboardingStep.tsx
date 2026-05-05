import React, { PropsWithChildren, useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

import { AppButton, AppText } from "@/src/ui/components";
import { layout, radius, spacing, useAppColors } from "@/src/ui/theme";

type OnboardingStepProps = PropsWithChildren<{
  step: number;
  totalSteps: number;
  title: string;
  description?: string;
  ctaLabel: string;
  onPressCta: () => void;
  ctaDisabled?: boolean;
  ctaLoading?: boolean;
}>;

export function OnboardingStep({
  step,
  totalSteps,
  title,
  description,
  ctaLabel,
  onPressCta,
  ctaDisabled,
  ctaLoading,
  children,
}: OnboardingStepProps) {
  const theme = useAppColors();
  const fade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    fade.setValue(0);
    Animated.timing(fade, {
      toValue: 1,
      duration: 260,
      useNativeDriver: true,
    }).start();
  }, [fade, step]);

  return (
    <Animated.View style={[styles.container, { opacity: fade }]}>
      <View style={styles.header}>
        <AppText variant="label" color="textSecondary">
          {step}/{totalSteps}
        </AppText>
        <View style={styles.progressRow}>
          {Array.from({ length: totalSteps }).map((_, idx) => (
            <View
              key={idx}
              style={[
                styles.progressDot,
                {
                  backgroundColor:
                    idx + 1 <= step ? theme.primary : theme.border,
                },
              ]}
            />
          ))}
        </View>
      </View>

      <View style={styles.content}>
        <AppText variant="h2">{title}</AppText>
        {description ? (
          <AppText color="textSecondary">{description}</AppText>
        ) : null}
        {children}
      </View>

      <AppButton
        label={ctaLabel}
        onPress={onPressCta}
        disabled={ctaDisabled}
        loading={ctaLoading}
        style={styles.cta}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingBottom: spacing[4],
  },
  header: {
    gap: spacing[3],
    marginTop: spacing[2],
  },
  progressRow: {
    flexDirection: "row",
    gap: spacing[2],
  },
  progressDot: {
    flex: 1,
    height: 6,
    borderRadius: radius.pill,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    gap: spacing[4],
  },
  cta: {
    minHeight: layout.touchMin,
  },
});
