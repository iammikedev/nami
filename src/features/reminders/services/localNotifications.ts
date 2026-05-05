/**
 * Local notification bridge for smart reminders.
 *
 * TODO: Install and wire `expo-notifications` for real scheduling on device:
 * - Use deterministic identifiers (e.g. `nami-feeding-reminder`, `nami-sleep-reminder`)
 *   with `cancelScheduledNotificationAsync` / `scheduleNotificationAsync`.
 * - Respect OS quiet hours where applicable.
 */

export const NOTIFICATION_IDS = {
  feeding: "nami-feeding-reminder",
  sleep: "nami-sleep-reminder",
} as const;

/** @returns whether calling code may treat reminders as allowed to schedule. */
export async function ensureNotificationPermissionForReminders(): Promise<boolean> {
  // TODO(expo-notifications): call getPermissionsAsync / requestPermissionsAsync here.
  return true;
}

export async function cancelScheduledFeedingReminder(): Promise<void> {
  // TODO(expo-notifications): Notifications.cancelScheduledNotificationAsync(NOTIFICATION_IDS.feeding)
}

export async function cancelScheduledSleepReminder(): Promise<void> {
  // TODO(expo-notifications): Notifications.cancelScheduledNotificationAsync(NOTIFICATION_IDS.sleep)
}

export async function scheduleFeedingReminder(params: {
  fireAt: Date;
  body: string;
}): Promise<void> {
  void params;
  // TODO(expo-notifications): schedule one-off at params.fireAt with params.body
}

export async function scheduleSleepReminder(params: {
  fireAt: Date;
  body: string;
}): Promise<void> {
  void params;
  // TODO(expo-notifications): schedule one-off at params.fireAt with params.body
}
