import DateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import { Pressable } from "native-base";
import React, { useCallback, useMemo, useState } from "react";
import {
  Modal,
  Platform,
  Pressable as RNPressable,
  useWindowDimensions,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AppText, InputField } from "@/src/ui/components";
import { spacing, useAppColors } from "@/src/ui/theme";

type BirthdateInputProps = {
  value: Date | null;
  onChange: (date: Date) => void;
  onOpen?: () => void;
  error?: string;
};

const PLACEHOLDER = "Select birthdate";

function clampToToday(d: Date, max: Date) {
  return d.getTime() > max.getTime() ? max : d;
}

export function BirthdateInput({
  value,
  onChange,
  onOpen,
  error,
}: BirthdateInputProps) {
  const theme = useAppColors();
  const { width: windowWidth } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const [iosOpen, setIosOpen] = useState(false);
  const [iosDraft, setIosDraft] = useState<Date>(() => value ?? new Date());

  const maximumDate = useMemo(() => {
    const now = new Date();
    now.setHours(23, 59, 59, 999);
    return now;
  }, []);

  const labelText = useMemo(() => {
    if (!value) {
      return PLACEHOLDER;
    }
    return value.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }, [value]);

  const openAndroid = useCallback(() => {
    onOpen?.();
    const current = clampToToday(value ?? new Date(), maximumDate);
    DateTimePickerAndroid.open({
      value: current,
      mode: "date",
      maximumDate,
      onChange: (event, date) => {
        if (event.type !== "set" || !date) {
          return;
        }
        onChange(clampToToday(date, maximumDate));
      },
    });
  }, [maximumDate, onChange, onOpen, value]);

  const openIos = useCallback(() => {
    onOpen?.();
    setIosDraft(clampToToday(value ?? new Date(), maximumDate));
    setIosOpen(true);
  }, [maximumDate, onOpen, value]);

  const handlePress = Platform.OS === "android" ? openAndroid : openIos;

  const labelColor = value ? theme.textPrimary : theme.textSecondary;

  return (
    <View style={{ gap: spacing[2] }}>
      <AppText variant="label" nativeID="birthdate-label">
        Birthdate
      </AppText>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Birthdate"
        accessibilityHint="Opens date picker"
        accessibilityState={{ expanded: iosOpen }}
        accessibilityLabelledBy="birthdate-label"
        onPress={handlePress}
      >
        <View pointerEvents="none">
          <InputField
            value={labelText}
            placeholder={PLACEHOLDER}
            editable={false}
            showSoftInputOnFocus={false}
            caretHidden
            icon="calendar-month-outline"
            error={!!error}
            style={{ color: labelColor }}
          />
        </View>
      </Pressable>
      {error ? (
        <AppText variant="caption" color="danger">
          {error}
        </AppText>
      ) : null}

      {Platform.OS === "ios" ? (
        <Modal
          visible={iosOpen}
          animationType="fade"
          transparent
          statusBarTranslucent
          onRequestClose={() => setIosOpen(false)}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              backgroundColor: "rgba(0, 0, 0, 0.3)",
            }}
          >
            <RNPressable
              style={{ flex: 1 }}
              onPress={() => setIosOpen(false)}
              accessibilityLabel="Dismiss date picker"
            />
            <View
              style={{
                borderTopLeftRadius: 24,
                borderTopRightRadius: 24,
                backgroundColor: theme.surfaceElevated,
                paddingHorizontal: spacing[4],
                paddingTop: spacing[3],
                paddingBottom: Math.max(insets.bottom, 16) + 12,
              }}
            >
              <View
                style={{
                  marginBottom: spacing[2],
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <AppText
                  variant="body"
                  style={{ fontWeight: "700", color: theme.textPrimary }}
                >
                  Birthdate
                </AppText>
                <Pressable
                  onPress={() => {
                    onChange(clampToToday(iosDraft, maximumDate));
                    setIosOpen(false);
                  }}
                  accessibilityRole="button"
                  accessibilityLabel="Done"
                >
                  <AppText variant="button" color={theme.primary}>
                    Done
                  </AppText>
                </Pressable>
              </View>
              <DateTimePicker
                value={iosDraft}
                mode="date"
                display="spinner"
                themeVariant="light"
                maximumDate={maximumDate}
                style={{ width: windowWidth, height: 216, alignSelf: "center" }}
                onChange={(_, date) => {
                  if (date) {
                    setIosDraft(clampToToday(date, maximumDate));
                  }
                }}
              />
            </View>
          </View>
        </Modal>
      ) : null}
    </View>
  );
}
