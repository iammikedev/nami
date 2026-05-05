import Realm from "realm";

export class BabyProfile extends Realm.Object<BabyProfile> {
  id!: string;
  name!: string;
  birthdate!: Date;
  createdAt!: Date;
  updatedAt!: Date;

  static schema: Realm.ObjectSchema = {
    name: "BabyProfile",
    primaryKey: "id",
    properties: {
      id: "string",
      name: "string",
      birthdate: "date",
      createdAt: "date",
      updatedAt: "date",
    },
  };
}

export class ActivityLog extends Realm.Object<ActivityLog> {
  id!: string;
  type!: "feed" | "sleep" | "diaper" | "milestone";
  title!: string;
  subtitle?: string;
  durationMinutes?: number;
  metadata?: string;
  createdAt!: Date;
  updatedAt!: Date;

  static schema: Realm.ObjectSchema = {
    name: "ActivityLog",
    primaryKey: "id",
    properties: {
      id: "string",
      type: "string",
      title: "string",
      subtitle: "string?",
      durationMinutes: "int?",
      metadata: "string?",
      createdAt: "date",
      updatedAt: "date",
    },
  };
}

export const BABY_PROFILE_SINGLETON_ID = "default-baby-profile";
