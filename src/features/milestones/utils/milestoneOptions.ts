import type MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import type { MilestoneType } from "../types/milestone.types";

export type MilestonePickerOption = {
  type: MilestoneType;
  label: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
};

export const MILESTONE_OPTIONS: MilestonePickerOption[] = [
  { type: "first_smile", label: "First Smile", icon: "baby-face-outline" },
  { type: "first_roll", label: "First Roll", icon: "sync" },
  { type: "first_crawl", label: "First Crawl", icon: "run" },
  { type: "first_steps", label: "First Steps", icon: "shoe-print" },
  { type: "custom", label: "Custom", icon: "pencil-outline" },
];

export function labelForMilestoneType(type: MilestoneType): string {
  return MILESTONE_OPTIONS.find((o) => o.type === type)?.label ?? type;
}

export function resolveMilestoneTitle(type: MilestoneType, customName: string): string {
  if (type === "custom") {
    return customName.trim();
  }
  return labelForMilestoneType(type);
}
