import * as Haptics from "expo-haptics";
import { useRealm } from "@realm/react";
import { Box, VStack } from "native-base";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Alert,
  LayoutAnimation,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  UIManager,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { FeedLogForm } from "@/src/features/quick-log/components/FeedLogForm";
import { LogTypeGrid } from "@/src/features/quick-log/components/LogTypeGrid";
import { SleepLogForm } from "@/src/features/quick-log/components/SleepLogForm";
import { useQuickLogStore } from "@/src/features/quick-log/store/quickLogStore";
import type { LogType } from "@/src/features/quick-log/types/quickLog.types";
import { AppButton, AppText, IconButton } from "@/src/ui/components";
import { radius, shadows, spacing, useNamiColors } from "@/src/ui/theme";

type QuickLogSheetProps = {
  isOpen: boolean;
  onClose: () => void;
  /** Called after a log is persisted; use for refresh + toast. */
  onLogComplete?: (message: string) => void;
  /** When set, opening the sheet skips the type grid and shows this flow. */
  initialLogType?: LogType;
};

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export function QuickLogSheet({
  isOpen,
  onClose,
  onLogComplete,
  initialLogType,
}: QuickLogSheetProps) {
  const theme = useNamiColors();
  const insets = useSafeAreaInsets();
  const realm = useRealm();
  const saveFeedLog = useQuickLogStore((state) => state.saveFeedLog);
  const [selectedType, setSelectedType] = useState<LogType>();
  const [hasRunningTimer, setHasRunningTimer] = useState(false);
  const wasOpenRef = useRef(false);

  useEffect(() => {
    const wasOpen = wasOpenRef.current;
    wasOpenRef.current = isOpen;
    if (!isOpen) {
      setSelectedType(undefined);
      setHasRunningTimer(false);
      return;
    }
    if (!wasOpen) {
      setSelectedType(initialLogType);
    }
  }, [isOpen, initialLogType]);

  const title = useMemo(() => {
    if (selectedType === "feed") return "Quick Feed";
    if (selectedType === "sleep") return "Sleep";
    return "Quick Log";
  }, [selectedType]);

  const subtitle = useMemo(() => {
    if (!selectedType) return "What would you like to log?";
    if (selectedType === "feed") return "Fast path: Left + 10 min + Save";
    if (selectedType === "sleep") return "Track naps and bedtime in seconds.";
    return "This flow is coming soon.";
  }, [selectedType]);

  const resetAndClose = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setSelectedType(undefined);
    setHasRunningTimer(false);
    onClose();
  };

  const handleRequestClose = () => {
    if (!hasRunningTimer) {
      resetAndClose();
      return;
    }

    Alert.alert("Stop timer?", "A feed timer is running. Close and discard timer?", [
      { text: "Keep logging", style: "cancel" },
      {
        text: "Discard",
        style: "destructive",
        onPress: () => resetAndClose(),
      },
    ]);
  };

  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="slide"
      statusBarTranslucent
      onRequestClose={handleRequestClose}
    >
      <View style={styles.root}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Dismiss quick log"
          style={[StyleSheet.absoluteFillObject, styles.backdrop]}
          onPress={handleRequestClose}
        />
        <View
          style={[
            styles.sheet,
            {
              backgroundColor: theme.background,
              borderColor: theme.border,
              paddingBottom: Math.max(insets.bottom, spacing[4]),
              maxHeight: "82%",
            },
            shadows.lg,
          ]}
        >
          <View style={styles.closeRow}>
            <IconButton
              icon="close"
              accessibilityLabel="Close quick log"
              onPress={handleRequestClose}
            />
          </View>
          <View style={styles.headerBlock}>
            <VStack className="gap-1">
              <AppText variant="h3">{title}</AppText>
              <AppText color="textSecondary">{subtitle}</AppText>
              {selectedType ? (
                <AppButton
                  label="Change type"
                  variant="tertiary"
                  iconRight="swap-horizontal"
                  onPress={() => {
                    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                    setSelectedType(undefined);
                  }}
                />
              ) : null}
            </VStack>
          </View>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {!selectedType ? (
              <LogTypeGrid
                onSelect={(type) => {
                  void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                  setSelectedType(type);
                }}
              />
            ) : selectedType === "feed" ? (
              <FeedLogForm
                onRunningTimerChange={setHasRunningTimer}
                onSave={(payload) => {
                  saveFeedLog(payload, realm);
                  onLogComplete?.("Feed saved.");
                  resetAndClose();
                }}
              />
            ) : selectedType === "sleep" ? (
              <SleepLogForm
                realm={realm}
                onComplete={(message) => {
                  onLogComplete?.(message);
                  resetAndClose();
                }}
              />
            ) : (
              <Box className="rounded-2xl border border-[#E8DCCF] bg-white px-4 py-5">
                <AppText color="textSecondary">This activity flow is coming soon.</AppText>
              </Box>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "flex-end",
  },
  backdrop: {
    backgroundColor: "rgba(47, 58, 52, 0.35)",
  },
  sheet: {
    width: "100%",
    borderTopLeftRadius: radius.xxl,
    borderTopRightRadius: radius.xxl,
    borderWidth: 1,
    borderBottomWidth: 0,
    paddingHorizontal: spacing[4],
    paddingTop: spacing[2],
  },
  closeRow: {
    alignItems: "flex-end",
    marginBottom: spacing[1],
  },
  headerBlock: {
    marginBottom: spacing[3],
  },
  scrollContent: {
    paddingBottom: spacing[4],
  },
});
