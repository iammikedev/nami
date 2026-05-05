import type { HomeDailyHubData } from "@/src/features/home/types/home.types";

export const homeDailyHubMock: HomeDailyHubData = {
  baby: {
    id: "baby-nami",
    name: "Nami",
    birthdate: new Date("2026-02-12T09:00:00.000Z"),
    ageLabel: "3 months",
  },
  dateLabel: "Today, May 12",
  summaryItems: [
    {
      id: "feed",
      type: "feed",
      label: "Feed",
      value: "5 times",
      helper: "Total",
      icon: "baby-bottle-outline",
    },
    {
      id: "sleep",
      type: "sleep",
      label: "Sleep",
      value: "6h 20m",
      helper: "Total",
      icon: "weather-night",
    },
    {
      id: "diaper",
      type: "diaper",
      label: "Diaper",
      value: "4",
      helper: "Changes",
      icon: "baby-face-outline",
    },
  ],
  activities: [
    {
      id: "activity-1",
      type: "feed",
      title: "Fed (Left)",
      detail: "10 mins",
      timestamp: "2 min ago",
    },
    {
      id: "activity-2",
      type: "sleep",
      title: "Slept",
      detail: "1h 10m",
      timestamp: "1 hour ago",
    },
    {
      id: "activity-3",
      type: "diaper",
      title: "Diaper changed",
      detail: "Wet",
      timestamp: "30 min ago",
    },
    {
      id: "activity-4",
      type: "feed",
      title: "Fed (Right)",
      detail: "8 mins",
      timestamp: "2 hours ago",
    },
    {
      id: "activity-5",
      type: "sleep",
      title: "Slept",
      detail: "45 mins",
      timestamp: "3 hours ago",
    },
  ],
};
