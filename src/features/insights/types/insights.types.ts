import type { LogType } from "@/src/features/quick-log/types/quickLog.types";

export type TodayInsights = {
  sleepMinutes: number;
  feedCount: number;
  diaperCount: number;
  hasDataToday: boolean;
};

/** Normalized log row for insight aggregation (Realm + in-memory quick logs). */
export type InsightActivityLog = {
  id: string;
  logType: LogType;
  createdAt: Date;
  durationMinutes?: number;
};
