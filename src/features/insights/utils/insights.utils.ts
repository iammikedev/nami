import Realm from "realm";

import { ActivityLog } from "@/src/features/home/store/homeModels";
import { getStartAndEndOfToday } from "@/src/features/home/utils/dateFormat";
import type { DiaperLog, FeedLog, SleepLog } from "@/src/features/quick-log/types/quickLog.types";
import { formatSleepDurationShort } from "@/src/features/quick-log/utils/sleep.utils";

import type { InsightActivityLog, TodayInsights } from "../types/insights.types";

export function isToday(date: Date, now = new Date()): boolean {
  const { start, end } = getStartAndEndOfToday(now);
  const t = date.getTime();
  return t >= start.getTime() && t < end.getTime();
}

/** Formats total minutes as a readable duration, e.g. `6h 20m`. */
export function formatSleepMinutes(minutes: number): string {
  return formatSleepDurationShort(Math.max(0, Math.round(minutes)));
}

export function formatFeedCount(count: number): string {
  return `${count} time${count === 1 ? "" : "s"}`;
}

export function formatDiaperCount(count: number): string {
  return `${count} change${count === 1 ? "" : "s"}`;
}

export function getTodayInsights(logs: InsightActivityLog[]): TodayInsights {
  const todayLogs = logs.filter((l) => isToday(l.createdAt));
  let sleepMinutes = 0;
  let feedCount = 0;
  let diaperCount = 0;
  for (const log of todayLogs) {
    if (log.logType === "sleep") {
      sleepMinutes += log.durationMinutes ?? 0;
    } else if (log.logType === "feed") {
      feedCount += 1;
    } else if (log.logType === "diaper") {
      diaperCount += 1;
    }
  }
  const hasDataToday = sleepMinutes > 0 || feedCount > 0 || diaperCount > 0;
  return { sleepMinutes, feedCount, diaperCount, hasDataToday };
}

function realmLogToInsight(log: ActivityLog): InsightActivityLog {
  return {
    id: log.id,
    logType: log.type,
    createdAt: log.createdAt,
    durationMinutes: log.durationMinutes,
  };
}

function memoryFeedToInsight(log: FeedLog): InsightActivityLog {
  return {
    id: log.id,
    logType: "feed",
    createdAt: log.createdAt,
    durationMinutes: log.durationMinutes,
  };
}

function memorySleepToInsight(log: SleepLog): InsightActivityLog {
  return {
    id: log.id,
    logType: "sleep",
    createdAt: new Date(log.createdAt),
    durationMinutes: log.durationMinutes,
  };
}

function memoryDiaperToInsight(log: DiaperLog): InsightActivityLog {
  return {
    id: log.id,
    logType: "diaper",
    createdAt: new Date(log.createdAt),
    durationMinutes: undefined,
  };
}

export type QuickLogMemorySnapshot = {
  inMemoryFeedLogs: FeedLog[];
  inMemorySleepLogs: SleepLog[];
  inMemoryDiaperLogs: DiaperLog[];
};

/**
 * Loads today's activity logs from Realm and merges in-memory quick logs
 * (when logging without a Realm instance). De-duplicates by id.
 */
export function collectTodayInsightLogs(
  realm: Realm,
  memory: QuickLogMemorySnapshot,
): InsightActivityLog[] {
  const { start, end } = getStartAndEndOfToday();
  const realmItems = realm
    .objects<ActivityLog>(ActivityLog.schema.name)
    .filtered("createdAt >= $0 && createdAt < $1", start, end);

  const fromRealm: InsightActivityLog[] = [...realmItems].map(realmLogToInsight);

  const fromMemory: InsightActivityLog[] = [
    ...memory.inMemoryFeedLogs.map(memoryFeedToInsight),
    ...memory.inMemorySleepLogs.map(memorySleepToInsight),
    ...memory.inMemoryDiaperLogs.map(memoryDiaperToInsight),
  ].filter((l) => l.createdAt >= start && l.createdAt < end);

  const seen = new Set(fromRealm.map((l) => l.id));
  return [...fromRealm, ...fromMemory.filter((l) => !seen.has(l.id))];
}

/** Example logs for tests or temporary UI preview when data is not wired yet. */
export function createMockInsightLogsForToday(reference = new Date()): InsightActivityLog[] {
  return [
    {
      id: "mock-insight-sleep",
      logType: "sleep",
      createdAt: reference,
      durationMinutes: 380,
    },
    {
      id: "mock-insight-feed-1",
      logType: "feed",
      createdAt: reference,
    },
    {
      id: "mock-insight-feed-2",
      logType: "feed",
      createdAt: reference,
    },
    {
      id: "mock-insight-feed-3",
      logType: "feed",
      createdAt: reference,
    },
    {
      id: "mock-insight-feed-4",
      logType: "feed",
      createdAt: reference,
    },
    {
      id: "mock-insight-feed-5",
      logType: "feed",
      createdAt: reference,
    },
    {
      id: "mock-insight-diaper-1",
      logType: "diaper",
      createdAt: reference,
    },
    {
      id: "mock-insight-diaper-2",
      logType: "diaper",
      createdAt: reference,
    },
    {
      id: "mock-insight-diaper-3",
      logType: "diaper",
      createdAt: reference,
    },
    {
      id: "mock-insight-diaper-4",
      logType: "diaper",
      createdAt: reference,
    },
  ];
}
