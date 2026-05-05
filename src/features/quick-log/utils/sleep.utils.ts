import type Realm from "realm";

import { ActivityLog } from "@/src/features/home/store/homeModels";

export type SleepActivityMetadata = {
  sleepStatus: "active" | "completed";
  startedAt?: string;
  endedAt?: string;
};

export function parseSleepMetadata(raw?: string): SleepActivityMetadata | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as SleepActivityMetadata;
    if (parsed.sleepStatus !== "active" && parsed.sleepStatus !== "completed") return null;
    return parsed;
  } catch {
    return null;
  }
}

export function findActiveSleepLogInRealm(realm: Realm): ActivityLog | null {
  const sleepLogs = realm.objects<ActivityLog>(ActivityLog.schema.name).filtered("type == 'sleep'");
  const actives = sleepLogs.filter((log) => {
    const meta = parseSleepMetadata(log.metadata);
    return meta?.sleepStatus === "active";
  });
  if (actives.length === 0) return null;
  return [...actives].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())[0] ?? null;
}

/** Compact label for subtitles, e.g. seed data "1h 10m". */
export function formatSleepDurationShort(minutes: number): string {
  const total = Math.max(0, Math.round(minutes));
  const h = Math.floor(total / 60);
  const m = total % 60;
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}
