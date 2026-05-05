import type Realm from "realm";

import { ReminderSettings, REMINDER_SETTINGS_ID } from "../realm/reminderSettingsModel";
import {
  feedingNotificationBody,
  getFeedAnchorFromActivityLog,
  getLatestFeedLog,
  getLatestWakeTime,
  sleepNotificationBody,
} from "../utils/reminderRules";
import {
  cancelScheduledFeedingReminder,
  cancelScheduledSleepReminder,
  ensureNotificationPermissionForReminders,
  scheduleFeedingReminder,
  scheduleSleepReminder,
} from "./localNotifications";

export function getOrCreateReminderSettings(realm: Realm): ReminderSettings {
  const existing = realm.objectForPrimaryKey<ReminderSettings>(
    ReminderSettings.schema.name,
    REMINDER_SETTINGS_ID
  );
  if (existing) return existing;

  realm.write(() => {
    realm.create(ReminderSettings.schema.name, {
      id: REMINDER_SETTINGS_ID,
      feedingEnabled: false,
      feedingIntervalMinutes: 150,
      sleepEnabled: false,
      sleepIntervalMinutes: 180,
      updatedAt: new Date(),
    });
  });
  const created = realm.objectForPrimaryKey<ReminderSettings>(
    ReminderSettings.schema.name,
    REMINDER_SETTINGS_ID
  );
  if (!created) {
    throw new Error("ReminderSettings missing after create");
  }
  return created;
}

function prefsFromRow(row: ReminderSettings) {
  return {
    feedingEnabled: row.feedingEnabled,
    feedingIntervalMinutes: row.feedingIntervalMinutes,
    sleepEnabled: row.sleepEnabled,
    sleepIntervalMinutes: row.sleepIntervalMinutes,
  };
}

async function rescheduleFeedingIfEnabled(realm: Realm): Promise<void> {
  const row = getOrCreateReminderSettings(realm);
  await cancelScheduledFeedingReminder();
  if (!row.feedingEnabled) return;

  const latest = getLatestFeedLog(realm);
  if (!latest) return;

  const anchor = getFeedAnchorFromActivityLog(latest);
  const fireAt = new Date(anchor.getTime() + row.feedingIntervalMinutes * 60_000);
  if (fireAt.getTime() <= Date.now()) {
    await scheduleFeedingReminder({
      fireAt: new Date(Date.now() + 60_000),
      body: feedingNotificationBody(),
    });
    return;
  }
  await scheduleFeedingReminder({ fireAt, body: feedingNotificationBody() });
}

async function rescheduleSleepIfEnabled(realm: Realm): Promise<void> {
  const row = getOrCreateReminderSettings(realm);
  await cancelScheduledSleepReminder();
  if (!row.sleepEnabled) return;

  const wake = getLatestWakeTime(realm);
  if (!wake) return;

  const fireAt = new Date(wake.getTime() + row.sleepIntervalMinutes * 60_000);
  if (fireAt.getTime() <= Date.now()) {
    await scheduleSleepReminder({
      fireAt: new Date(Date.now() + 60_000),
      body: sleepNotificationBody(),
    });
    return;
  }
  await scheduleSleepReminder({ fireAt, body: sleepNotificationBody() });
}

/** After any feed log is persisted — cancel prior feeding nudge and schedule the next. */
export async function onFeedLogSaved(realm: Realm): Promise<void> {
  const row = getOrCreateReminderSettings(realm);
  if (!row.feedingEnabled) return;
  const ok = await ensureNotificationPermissionForReminders();
  if (!ok) return;
  await rescheduleFeedingIfEnabled(realm);
}

/** After sleep ends or a completed sleep log is saved — reschedule nap nudge from last wake. */
export async function onSleepWakeLogged(realm: Realm): Promise<void> {
  const row = getOrCreateReminderSettings(realm);
  if (!row.sleepEnabled) return;
  const ok = await ensureNotificationPermissionForReminders();
  if (!ok) return;
  await rescheduleSleepIfEnabled(realm);
}

/** When baby starts sleeping, cancel the “hasn’t slept” nudge until they wake. */
export async function onSleepSessionStarted(realm: Realm): Promise<void> {
  const row = getOrCreateReminderSettings(realm);
  if (!row.sleepEnabled) return;
  await cancelScheduledSleepReminder();
}

/** Re-run both schedules from persisted logs (e.g. after interval toggle or settings screen). */
export async function syncAllReminderSchedules(realm: Realm): Promise<void> {
  const row = getOrCreateReminderSettings(realm);
  if (!row.feedingEnabled && !row.sleepEnabled) {
    await cancelScheduledFeedingReminder();
    await cancelScheduledSleepReminder();
    return;
  }
  const ok = await ensureNotificationPermissionForReminders();
  if (!ok) return;
  if (row.feedingEnabled) {
    await rescheduleFeedingIfEnabled(realm);
  } else {
    await cancelScheduledFeedingReminder();
  }
  if (row.sleepEnabled) {
    await rescheduleSleepIfEnabled(realm);
  } else {
    await cancelScheduledSleepReminder();
  }
}

export function readReminderPrefsSnapshot(realm: Realm) {
  const row = getOrCreateReminderSettings(realm);
  return prefsFromRow(row);
}
