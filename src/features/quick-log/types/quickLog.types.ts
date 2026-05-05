export type LogType = "feed" | "sleep" | "diaper" | "milestone";

export type FeedMethod = "breastfeed" | "bottle";
export type BreastSide = "left" | "right";

export type FeedLog = {
  id: string;
  logType: "feed";
  method: FeedMethod;
  side?: BreastSide;
  durationMinutes?: number;
  amountMl?: number;
  startedAt?: Date;
  endedAt?: Date;
  createdAt: Date;
};

export type SleepLog = {
  id: string;
  type: "sleep";
  status: "active" | "completed";
  startedAt?: string;
  endedAt?: string;
  durationMinutes?: number;
  createdAt: string;
};

export type DiaperType = "wet" | "dirty" | "both";

export type DiaperLog = {
  id: string;
  type: "diaper";
  diaperType: DiaperType;
  createdAt: string;
};
