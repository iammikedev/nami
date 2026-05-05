import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import * as Haptics from "expo-haptics";
import type Realm from "realm";
import { Box, HStack, Pressable, ScrollView, VStack } from "native-base";
import React, { useCallback, useState } from "react";
import { useWindowDimensions } from "react-native";

import { useQuickLogStore } from "@/src/features/quick-log/store/quickLogStore";
import type { DiaperLog, DiaperType } from "@/src/features/quick-log/types/quickLog.types";
import { AppButton, AppText } from "@/src/ui/components";
import { shadows, useNamiColors } from "@/src/ui/theme";

type DiaperOption = {
  value: DiaperType;
  label: string;
  hint: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
};

const DIAPER_OPTIONS: DiaperOption[] = [
  {
    value: "wet",
    label: "Wet",
    hint: "Urine only",
    icon: "water",
  },
  {
    value: "dirty",
    label: "Dirty",
    hint: "Soiled",
    icon: "emoticon-poop",
  },
  {
    value: "both",
    label: "Both",
    hint: "Wet and dirty",
    icon: "layers-triple-outline",
  },
];

export type DiaperLogFormProps = {
  realm?: Realm;
  onSave: (log: DiaperLog) => void;
  onBack?: () => void;
};

export function DiaperLogForm({ realm, onSave, onBack }: DiaperLogFormProps) {
  const theme = useNamiColors();
  const { height } = useWindowDimensions();
  const saveDiaperLog = useQuickLogStore((s) => s.saveDiaperLog);
  const [selected, setSelected] = useState<DiaperType | undefined>();

  const selectOption = useCallback((value: DiaperType) => {
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelected(value);
  }, []);

  const handleSave = () => {
    if (!selected) return;
    void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    const log = saveDiaperLog(selected, realm);
    onSave(log);
  };

  const optionsMaxHeight = Math.min(height * 0.46, 360);

  return (
    <VStack className="gap-4">
      {onBack ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Back to log types"
          onPress={onBack}
        >
          <AppText variant="caption" color="textSecondary">
            Back
          </AppText>
        </Pressable>
      ) : null}

      <VStack
        accessibilityRole="radiogroup"
        accessibilityLabel="Diaper type"
        className="rounded-3xl border border-nami-border/70 bg-nami-cream/90 p-3"
        style={shadows.sm}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          style={{ maxHeight: optionsMaxHeight }}
        >
          <VStack className="gap-3">
            {DIAPER_OPTIONS.map((opt) => {
              const isSelected = selected === opt.value;
              return (
                <Pressable
                  key={opt.value}
                  accessibilityRole="radio"
                  accessibilityState={{ selected: isSelected }}
                  accessibilityLabel={`${opt.label}. ${opt.hint}`}
                  onPress={() => selectOption(opt.value)}
                >
                  {({ isPressed }) => (
                    <HStack
                      className="min-h-[88px] items-center gap-4 rounded-2xl border-2 px-5 py-4"
                      style={{
                        borderColor: isSelected ? theme.activity.diaper : theme.border,
                        backgroundColor: isSelected
                          ? `${theme.activity.diaper}66`
                          : theme.surfaceElevated,
                        transform: [{ scale: isPressed ? 0.98 : 1 }],
                        opacity: isPressed ? 0.94 : 1,
                        shadowColor: "#2F3A34",
                        shadowOpacity: isSelected ? 0.12 : isPressed ? 0.06 : 0.08,
                        shadowRadius: isSelected ? 12 : 8,
                        shadowOffset: { width: 0, height: 4 },
                        elevation: isSelected ? 5 : 3,
                      }}
                    >
                      <Box
                        className="h-14 w-14 items-center justify-center rounded-full"
                        style={{
                          backgroundColor: isSelected
                            ? `${theme.activity.diaper}99`
                            : `${theme.activity.diaper}40`,
                        }}
                      >
                        <MaterialCommunityIcons
                          name={opt.icon}
                          size={28}
                          color={theme.textPrimary}
                        />
                      </Box>
                      <VStack className="flex-1 gap-0.5">
                        <AppText variant="title">{opt.label}</AppText>
                        <AppText variant="caption" color="textSecondary">
                          {opt.hint}
                        </AppText>
                      </VStack>
                      {isSelected ? (
                        <MaterialCommunityIcons
                          name="check-circle"
                          size={26}
                          color={theme.textPrimary}
                        />
                      ) : null}
                    </HStack>
                  )}
                </Pressable>
              );
            })}
          </VStack>
        </ScrollView>
      </VStack>

      <AppButton label="Save" variant="hero3d" disabled={!selected} onPress={handleSave} />
    </VStack>
  );
}
