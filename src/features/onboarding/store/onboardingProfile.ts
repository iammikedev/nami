import Realm from "realm";

export class OnboardingProfile extends Realm.Object<OnboardingProfile> {
  _id!: string;
  babyName?: string;
  babyBirthdate?: Date;
  onboardingCompleted!: boolean;
  updatedAt!: Date;

  static schema: Realm.ObjectSchema = {
    name: "OnboardingProfile",
    primaryKey: "_id",
    properties: {
      _id: "string",
      babyName: "string?",
      babyBirthdate: "date?",
      onboardingCompleted: { type: "bool", default: false },
      updatedAt: "date",
    },
  };
}

export const ONBOARDING_PROFILE_ID = "singleton";
