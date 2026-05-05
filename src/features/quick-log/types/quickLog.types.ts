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
