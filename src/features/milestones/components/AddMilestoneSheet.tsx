import * as Haptics from "expo-haptics";
import { Image } from "expo-image";
import { useRealm } from "@realm/react";
import { VStack } from "native-base";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AppText, IconButton, InputField } from "@/src/ui/components";
import { animations, radius, shadows, spacing, useNamiColors } from "@/src/ui/theme";

import { useMilestoneStore } from "../store/milestoneStore";
import type { Milestone, MilestoneType } from "../types/milestone.types";
import { promptMilestonePhoto } from "../utils/pickMilestonePhoto";
import { MILESTONE_OPTIONS, resolveMilestoneTitle } from "../utils/milestoneOptions";

import { MilestoneOptionCard } from "./MilestoneOptionCard";
import { PhotoPickerButton } from "./PhotoPickerButton";

type AddMilestoneSheetProps = {
  isOpen: boolean;
  editingMilestone?: Milestone | null;
  onClose: () => void;
  onSaved: (message: string) => void;
};

export function AddMilestoneSheet({
  isOpen,
  editingMilestone = null,
  onClose,
  onSaved,
}: AddMilestoneSheetProps) {
  const theme = useNamiColors();
  const insets = useSafeAreaInsets();
  const realm = useRealm();
  const addMilestone = useMilestoneStore((s) => s.addMilestone);
  const updateMilestone = useMilestoneStore((s) => s.updateMilestone);
  const deleteMilestone = useMilestoneStore((s) => s.deleteMilestone);

  const [selectedType, setSelectedType] = useState<MilestoneType | undefined>();
  const [customName, setCustomName] = useState("");
  const [note, setNote] = useState("");
  const [photoUri, setPhotoUri] = useState<string | undefined>();

  useEffect(() => {
    if (!isOpen) {
      setSelectedType(undefined);
      setCustomName("");
      setNote("");
      setPhotoUri(undefined);
      return;
    }
    if (editingMilestone) {
      setSelectedType(editingMilestone.type);
      setCustomName(editingMilestone.type === "custom" ? editingMilestone.title : "");
      setNote(editingMilestone.note ?? "");
      setPhotoUri(editingMilestone.photoUri);
    } else {
      setSelectedType(undefined);
      setCustomName("");
      setNote("");
      setPhotoUri(undefined);
    }
  }, [isOpen, editingMilestone]);

  const isValid = useMemo(() => {
    if (!selectedType) return false;
    if (selectedType === "custom") return customName.trim().length > 0;
    return true;
  }, [selectedType, customName]);

  const handlePhotoPress = useCallback(() => {
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    promptMilestonePhoto((uri) => setPhotoUri(uri));
  }, []);

  const handleSave = useCallback(() => {
    if (!selectedType || !isValid) return;
    void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    const title = resolveMilestoneTitle(selectedType, customName);
    const payload = {
      type: selectedType,
      title,
      note: note.trim() || undefined,
      photoUri,
    };
    if (editingMilestone) {
      updateMilestone(realm, editingMilestone.id, payload);
      onSaved("Milestone updated");
    } else {
      addMilestone(realm, payload);
      onSaved("Milestone saved");
    }
    onClose();
  }, [
    addMilestone,
    customName,
    editingMilestone,
    isValid,
    note,
    onClose,
    onSaved,
    photoUri,
    realm,
    selectedType,
    updateMilestone,
  ]);

  const handleDelete = useCallback(() => {
    if (!editingMilestone) return;
    Alert.alert("Delete milestone?", "This cannot be undone.", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          deleteMilestone(realm, editingMilestone.id);
          onSaved("Milestone deleted");
          onClose();
        },
      },
    ]);
  }, [deleteMilestone, editingMilestone, onClose, onSaved, realm]);

  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="slide"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        style={styles.keyboardRoot}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.root}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Dismiss milestone form"
            style={[StyleSheet.absoluteFillObject, styles.backdrop]}
            onPress={onClose}
          />
          <View
            style={[
              styles.sheet,
              {
                backgroundColor: theme.background,
                borderColor: theme.border,
                paddingBottom: Math.max(insets.bottom, spacing[4]),
                maxHeight: "92%",
              },
              shadows.lg,
            ]}
          >
            <View style={styles.closeRow}>
              <IconButton icon="close" accessibilityLabel="Close milestone form" onPress={onClose} />
            </View>
            <ScrollView
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollContent}
            >
              <VStack className="gap-4">
                <VStack className="gap-1">
                  <AppText variant="h3">{editingMilestone ? "Edit Milestone" : "Add Milestone"}</AppText>
                  <AppText variant="bodySmall" color="textSecondary">
                    {editingMilestone ? "Update the details below." : "Choose a moment to remember."}
                  </AppText>
                </VStack>

                <VStack className="gap-3">
                  {MILESTONE_OPTIONS.map((option) => (
                    <MilestoneOptionCard
                      key={option.type}
                      option={option}
                      selected={selectedType === option.type}
                      onPress={() => {
                        void Haptics.selectionAsync();
                        setSelectedType(option.type);
                      }}
                    />
                  ))}
                </VStack>

                {selectedType === "custom" ? (
                  <InputField
                    placeholder="Enter milestone name"
                    value={customName}
                    onChangeText={setCustomName}
                    accessibilityLabel="Custom milestone name"
                  />
                ) : null}

                <VStack className="gap-2">
                  <AppText variant="label" color="textSecondary">
                    Note
                  </AppText>
                  <InputField
                    multiline
                    numberOfLines={4}
                    placeholder="Add a note (optional)"
                    value={note}
                    onChangeText={setNote}
                    accessibilityLabel="Optional milestone note"
                  />
                </VStack>

                <VStack className="gap-2">
                  <PhotoPickerButton onPress={handlePhotoPress} />
                  {photoUri ? (
                    <Image
                      source={{ uri: photoUri }}
                      style={{
                        width: "100%",
                        height: 160,
                        borderRadius: radius.lg,
                        borderWidth: 1,
                        borderColor: theme.border,
                      }}
                      contentFit="cover"
                      accessibilityLabel="Selected milestone photo preview"
                    />
                  ) : null}
                </VStack>

                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Save milestone"
                  accessibilityState={{ disabled: !isValid }}
                  disabled={!isValid}
                  onPress={handleSave}
                  style={({ pressed }) => [
                    styles.saveButton,
                    {
                      backgroundColor: theme.primary,
                      opacity: !isValid ? 0.45 : pressed ? animations.opacity.pressIn : 1,
                      transform: [
                        {
                          scale: pressed && isValid ? animations.scale.pressIn : animations.scale.pressOut,
                        },
                      ],
                    },
                  ]}
                >
                  <AppText variant="button" color="textPrimary">
                    Save
                  </AppText>
                </Pressable>

                {editingMilestone ? (
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="Delete milestone"
                    onPress={handleDelete}
                    style={({ pressed }) => [
                      styles.deleteButton,
                      { opacity: pressed ? 0.75 : 1 },
                    ]}
                  >
                    <AppText variant="button" color="danger">
                      Delete milestone
                    </AppText>
                  </Pressable>
                ) : null}
              </VStack>
            </ScrollView>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  keyboardRoot: {
    flex: 1,
  },
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
  scrollContent: {
    paddingBottom: spacing[2],
  },
  saveButton: {
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 52,
    borderRadius: radius.pill,
    marginBottom: spacing[1],
  },
  deleteButton: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 48,
    paddingVertical: spacing[2],
  },
});
