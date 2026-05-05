import { useRealm } from "@realm/react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { VStack } from "native-base";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AddMilestoneSheet } from "@/src/features/milestones/components/AddMilestoneSheet";
import { MilestoneEmptyState } from "@/src/features/milestones/components/MilestoneEmptyState";
import { MilestoneList } from "@/src/features/milestones/components/MilestoneList";
import { useMilestoneStore } from "@/src/features/milestones/store/milestoneStore";
import type { Milestone } from "@/src/features/milestones/types/milestone.types";
import { AppButton, AppScreen, AppText } from "@/src/ui/components";
import { radius, shadows, spacing, useNamiColors } from "@/src/ui/theme";

export function MilestonesScreen() {
  const theme = useNamiColors();
  const insets = useSafeAreaInsets();
  const realm = useRealm();
  const milestones = useMilestoneStore((s) => s.milestones);
  const hydrate = useMilestoneStore((s) => s.hydrate);

  const [sheetOpen, setSheetOpen] = useState(false);
  const [editing, setEditing] = useState<Milestone | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastOpacity = useRef(new Animated.Value(0)).current;
  const toastHideRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    hydrate(realm);
  }, [hydrate, realm]);

  const showToast = useCallback(
    (message: string) => {
      if (toastHideRef.current) {
        clearTimeout(toastHideRef.current);
        toastHideRef.current = null;
      }
      setToastMessage(message);
      toastOpacity.setValue(0);
      Animated.timing(toastOpacity, {
        toValue: 1,
        duration: 180,
        useNativeDriver: true,
      }).start();
      toastHideRef.current = setTimeout(() => {
        Animated.timing(toastOpacity, {
          toValue: 0,
          duration: 220,
          useNativeDriver: true,
        }).start(({ finished }) => {
          if (finished) setToastMessage(null);
        });
        toastHideRef.current = null;
      }, 1400);
    },
    [toastOpacity],
  );

  useEffect(
    () => () => {
      if (toastHideRef.current) clearTimeout(toastHideRef.current);
    },
    [],
  );

  return (
    <AppScreen
      scrollable
      contentStyle={{
        paddingBottom: 120,
        gap: spacing[4],
      }}
      screenOverlay={
        <>
          <AddMilestoneSheet
            isOpen={sheetOpen}
            editingMilestone={editing}
            onClose={() => {
              setSheetOpen(false);
              setEditing(null);
            }}
            onSaved={(message) => showToast(message)}
          />
          {toastMessage ? (
            <Animated.View
              pointerEvents="none"
              accessibilityLiveRegion="polite"
              accessibilityLabel={toastMessage}
              style={[
                StyleSheet.absoluteFillObject,
                {
                  alignItems: "center",
                  paddingTop: insets.top + spacing[2],
                },
                { opacity: toastOpacity },
              ]}
            >
              <View
                style={[
                  {
                    paddingHorizontal: spacing[4],
                    paddingVertical: spacing[2],
                    borderRadius: radius.pill,
                    backgroundColor: theme.surfaceElevated,
                    borderWidth: 1,
                    borderColor: theme.border,
                  },
                  shadows.md,
                ]}
              >
                <AppText variant="bodySmall" color="success">
                  {toastMessage}
                </AppText>
              </View>
            </Animated.View>
          ) : null}
        </>
      }
    >
      <VStack className="gap-1 px-0">
        <AppText variant="h1">Milestones</AppText>
        <AppText variant="body" color="textSecondary">
          Capture the moments that matter most.
        </AppText>
      </VStack>

      {milestones.length === 0 ? (
        <MilestoneEmptyState
          onAddPress={() => {
            setEditing(null);
            setSheetOpen(true);
          }}
        />
      ) : (
        <VStack className="gap-4">
          <AppButton
            label="+ Add Milestone"
            onPress={() => {
              setEditing(null);
              setSheetOpen(true);
            }}
            style={{ alignSelf: "stretch" }}
            className="self-stretch"
          />
          <MilestoneList
            milestones={milestones}
            onEdit={(m) => {
              setEditing(m);
              setSheetOpen(true);
            }}
          />
        </VStack>
      )}
    </AppScreen>
  );
}
