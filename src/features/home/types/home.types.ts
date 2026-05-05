import { ActivityType } from "@/src/ui/theme";

export type HomeActivityType = "feed" | "sleep" | "diaper" | "milestone";
export type SummaryType = "feed" | "sleep" | "diaper";

export type HomeBabyProfile = {
  id: string;
  name: string;
  birthdate: Date;
  ageLabel?: string;
};

export type TodaySummary = {
  feedCount: number;
  sleepDurationMinutes: number;
  diaperCount: number;
};

export type TodaySummaryItem = {
  id: SummaryType;
  type: ActivityType;
  label: string;
  value: string;
  helper: "Total" | "Changes" | "Today";
  icon: string;
};

export type RecentActivityItem = {
  id: string;
  type: ActivityType;
  title: string;
  detail?: string;
  timestamp?: string;
  subtitle?: string;
  createdAt?: Date;
  relativeTime?: string;
};

export type HomeDailyHubData = {
  baby: HomeBabyProfile;
  dateLabel: string;
  summaryItems: TodaySummaryItem[];
  activities: RecentActivityItem[];
};
