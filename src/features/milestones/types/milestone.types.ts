export type MilestoneType =
  | "first_smile"
  | "first_roll"
  | "first_crawl"
  | "first_steps"
  | "custom";

export type Milestone = {
  id: string;
  type: MilestoneType;
  title: string;
  note?: string;
  photoUri?: string;
  createdAt: string;
};
