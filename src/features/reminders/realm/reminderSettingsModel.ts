import Realm from "realm";

export const REMINDER_SETTINGS_ID = "default-reminder-settings";

/** Persisted smart-reminder preferences (singleton row). */
export class ReminderSettings extends Realm.Object<ReminderSettings> {
  id!: string;
  feedingEnabled!: boolean;
  feedingIntervalMinutes!: number;
  sleepEnabled!: boolean;
  sleepIntervalMinutes!: number;
  updatedAt!: Date;

  static schema: Realm.ObjectSchema = {
    name: "ReminderSettings",
    primaryKey: "id",
    properties: {
      id: "string",
      feedingEnabled: { type: "bool", default: false },
      feedingIntervalMinutes: { type: "int", default: 150 },
      sleepEnabled: { type: "bool", default: false },
      sleepIntervalMinutes: { type: "int", default: 180 },
      updatedAt: "date",
    },
  };
}
