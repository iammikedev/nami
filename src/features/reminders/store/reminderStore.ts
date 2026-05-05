import { create } from "zustand";
import type { Realm as RealmType } from "realm";
import { Alert } from "react-native";
import {
  cancelScheduledFeedingReminder,
  cancelScheduledSleepReminder,
  ensureNotificationPermissionForReminders,
} from "../services/localNotifications";
import {
  getOrCreateReminderSettings,
  readReminderPrefsSnapshot,
  syncAllReminderSchedules,
} from "../services/reminderSync";
import type { ReminderPrefsSnapshot } from "../types/reminder.types";

type ReminderStore = ReminderPrefsSnapshot & {
  hydrated: boolean;
  hydrate: (realm: RealmType) => void;
  setFeedingEnabled: (realm: RealmType, enabled: boolean) => Promise<void>;
  setSleepEnabled: (realm: RealmType, enabled: boolean) => Promise<void>;
  setFeedingIntervalMinutes: (realm: RealmType, minutes: number) => Promise<void>;
  setSleepIntervalMinutes: (realm: RealmType, minutes: number) => Promise<void>;
};

function applySnapshot(realm: RealmType, set: (partial: Partial<ReminderStore>) => void) {
  set({ ...readReminderPrefsSnapshot(realm) });
}

export const useReminderStore = create<ReminderStore>((set, get) => ({
  feedingEnabled: false,
  feedingIntervalMinutes: 150,
  sleepEnabled: false,
  sleepIntervalMinutes: 180,
  hydrated: false,

  hydrate: (realm) => {
    getOrCreateReminderSettings(realm);
    applySnapshot(realm, set);
    set({ hydrated: true });
  },

  setFeedingEnabled: async (realm, enabled) => {
    if (enabled) {
      const ok = await ensureNotificationPermissionForReminders();
      if (!ok) {
        Alert.alert(
          "Notifications",
          "We couldn’t turn on notifications. You can enable them later in Settings."
        );
        return;
      }
    }

    const row = getOrCreateReminderSettings(realm);
    realm.write(() => {
      row.feedingEnabled = enabled;
      row.updatedAt = new Date();
    });
    applySnapshot(realm, set);

    if (!enabled) {
      await cancelScheduledFeedingReminder();
    }
    await syncAllReminderSchedules(realm);
  },

  setSleepEnabled: async (realm, enabled) => {
    if (enabled) {
      const ok = await ensureNotificationPermissionForReminders();
      if (!ok) {
        Alert.alert(
          "Notifications",
          "We couldn’t turn on notifications. You can enable them later in Settings."
        );
        return;
      }
    }

    const row = getOrCreateReminderSettings(realm);
    realm.write(() => {
      row.sleepEnabled = enabled;
      row.updatedAt = new Date();
    });
    applySnapshot(realm, set);

    if (!enabled) {
      await cancelScheduledSleepReminder();
    }
    await syncAllReminderSchedules(realm);
  },

  setFeedingIntervalMinutes: async (realm, minutes) => {
    const row = getOrCreateReminderSettings(realm);
    realm.write(() => {
      row.feedingIntervalMinutes = minutes;
      row.updatedAt = new Date();
    });
    applySnapshot(realm, set);
    if (get().feedingEnabled) {
      await syncAllReminderSchedules(realm);
    }
  },

  setSleepIntervalMinutes: async (realm, minutes) => {
    const row = getOrCreateReminderSettings(realm);
    realm.write(() => {
      row.sleepIntervalMinutes = minutes;
      row.updatedAt = new Date();
    });
    applySnapshot(realm, set);
    if (get().sleepEnabled) {
      await syncAllReminderSchedules(realm);
    }
  },
}));
