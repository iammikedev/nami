import type Realm from "realm";

import { ActivityLog } from "@/src/features/home/store/homeModels";
import {
  findActiveSleepLogInRealm,
  parseSleepMetadata,
} from "@/src/features/quick-log/utils/sleep.utils";

import type { IntervalOption, ReminderPrefsSnapshot, UpcomingReminderLine } from "../types/reminder.types";

export const FEEDING_INTERVAL_OPTIONS: IntervalOption[] = [
  { label: "2 hours", minutes: 120 },
  { label: "2.5 hours", minutes: 150 },
  { label: "3 hours", minutes: 180 },
];

export const SLEEP_INTERVAL_OPTIONS: IntervalOption[] = [
  { label: "2 hours", minutes: 120 },
  { label: "3 hours", minutes: 180 },
  { label: "4 hours", minutes: 240 },
];

const FEEDING_MESSAGES = {
  notification: "It may be time for the next feed.",
} as const;

const SLEEP_MESSAGES = {
  notification: "Baby hasn't slept in a while. Maybe it's time for a nap?",
} as const;

export function feedingNotificationBody(): string {
  return FEEDING_MESSAGES.notification;
}

export function sleepNotificationBody(): string {
  return SLEEP_MESSAGES.notification;
}

type FeedMetadata = {
  startedAt?: string;
  endedAt?: string;
};

function parseFeedMetadata(raw?: string): FeedMetadata | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as FeedMetadata;
  } catch {
    return null;
  }
}

/** Best-effort anchor for “when the feed happened” for scheduling the next nudge. */
export function getFeedAnchorFromActivityLog(log: ActivityLog): Date {
  const meta = parseFeedMetadata(log.metadata);
  if (meta?.endedAt) return new Date(meta.endedAt);
  if (meta?.startedAt) return new Date(meta.startedAt);
  return log.createdAt;
}

export function getLatestFeedLog(realm: Realm): ActivityLog | null {
  const feeds = realm.objects<ActivityLog>(ActivityLog.schema.name).filtered("type == 'feed'");
  if (feeds.length === 0) return null;
  const sorted = feeds.sorted("createdAt", true);
  return sorted[0] ?? null;
}

export function getLatestWakeTime(realm: Realm): Date | null {
  const sleeps = realm.objects<ActivityLog>(ActivityLog.schema.name).filtered("type == 'sleep'");
  let best: Date | null = null;
  for (let i = 0; i < sleeps.length; i++) {
    const log = sleeps[i];
    const meta = parseSleepMetadata(log.metadata);
    if (meta?.sleepStatus === "completed" && meta.endedAt) {
      const ended = new Date(meta.endedAt);
      if (!best || ended.getTime() > best.getTime()) {
        best = ended;
      }
    }
  }
  return best;
}

function formatTimeShort(d: Date): string {
  return d.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
}

function formatDurationUntil(target: Date, now: Date): string {
  const ms = target.getTime() - now.getTime();
  if (ms <= 0) return "soon";
  const totalMinutes = Math.ceil(ms / 60_000);
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  if (h <= 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

export function buildUpcomingReminderLines(
  prefs: ReminderPrefsSnapshot,
  realm: Realm,
  now = new Date()
): UpcomingReminderLine[] {
  const lines: UpcomingReminderLine[] = [];

  if (!prefs.feedingEnabled && !prefs.sleepEnabled) {
    return lines;
  }

  if (prefs.feedingEnabled) {
    const latest = getLatestFeedLog(realm);
    if (latest) {
      const anchor = getFeedAnchorFromActivityLog(latest);
      const next = new Date(anchor.getTime() + prefs.feedingIntervalMinutes * 60_000);
      lines.push({
        id: "feed",
        text: `Next feed around ${formatTimeShort(next)}`,
      });
    } else {
      lines.push({
        id: "feed-pending",
        text: "Log a feed to see your next gentle nudge.",
      });
    }
  }

  if (prefs.sleepEnabled) {
    const active = findActiveSleepLogInRealm(realm);
    if (active) {
      lines.push({
        id: "sleep-active",
        text: "Rest time is in progress.",
      });
    } else {
      const wake = getLatestWakeTime(realm);
      if (wake) {
        const target = new Date(wake.getTime() + prefs.sleepIntervalMinutes * 60_000);
        const ms = target.getTime() - now.getTime();
        const line =
          ms <= 0
            ? "A gentle nap nudge may be helpful soon."
            : `Nap reminder in ${formatDurationUntil(target, now)}`;
        lines.push({
          id: "sleep",
          text: line,
        });
      } else {
        lines.push({
          id: "sleep-pending",
          text: "Log sleep to personalize nap nudges.",
        });
      }
    }
  }

  return lines;
}
