import type {
    TodaySummary,
    TodaySummaryItem,
} from "@/src/features/home/types/home.types";

export function formatDurationMinutes(totalMinutes: number): string {
  if (totalMinutes <= 0) {
    return "0h 0m";
  }
  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;
  return `${hours}h ${mins}m`;
}

export function buildTodaySummaryItems(
  summary: TodaySummary,
): TodaySummaryItem[] {
  return [
    {
      id: "feed",
      type: "feed",
      label: "Feed",
      value: `${summary.feedCount} times`,
      helper: "Today",
      icon: "baby-bottle-outline",
    },
    {
      id: "sleep",
      type: "sleep",
      label: "Sleep",
      value: formatDurationMinutes(summary.sleepDurationMinutes),
      helper: "Today",
      icon: "weather-night",
    },
    {
      id: "diaper",
      type: "diaper",
      label: "Diaper",
      value: `${summary.diaperCount}`,
      helper: "Today",
      icon: "baby-face-outline",
    },
  ];
}
