export type ReminderPrefsSnapshot = {
  feedingEnabled: boolean;
  feedingIntervalMinutes: number;
  sleepEnabled: boolean;
  sleepIntervalMinutes: number;
};

export type IntervalOption = {
  label: string;
  minutes: number;
};

export type UpcomingReminderLine = {
  id: string;
  text: string;
};
