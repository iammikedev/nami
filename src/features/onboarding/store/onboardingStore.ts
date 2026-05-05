import { create } from "zustand";
import Realm from "realm";

import type {
  CompleteOnboardingPayload,
  OnboardingStateSnapshot,
} from "../types/onboarding.types";
import { ONBOARDING_PROFILE_ID, OnboardingProfile } from "./onboardingProfile";

type OnboardingStore = OnboardingStateSnapshot & {
  hydrated: boolean;
  hydrate: (realm: Realm) => void;
  completeOnboarding: (realm: Realm, payload: CompleteOnboardingPayload) => void;
  resetOnboardingForTesting: (realm: Realm) => void;
};

const getProfile = (realm: Realm) => {
  const profile = realm.objectForPrimaryKey<OnboardingProfile>(
    OnboardingProfile.schema.name,
    ONBOARDING_PROFILE_ID
  );
  if (profile) {
    return profile;
  }

  let createdProfile: OnboardingProfile;
  realm.write(() => {
    createdProfile = realm.create(OnboardingProfile.schema.name, {
      _id: ONBOARDING_PROFILE_ID,
      onboardingCompleted: false,
      updatedAt: new Date(),
    });
  });

  return createdProfile!;
};

export const useOnboardingStore = create<OnboardingStore>((set) => ({
  hydrated: false,
  onboardingCompleted: false,
  babyName: "",
  babyBirthdate: null,
  hydrate: (realm) => {
    const profile = getProfile(realm);
    set({
      hydrated: true,
      onboardingCompleted: profile.onboardingCompleted,
      babyName: profile.babyName ?? "",
      babyBirthdate: profile.babyBirthdate ?? null,
    });
  },
  completeOnboarding: (realm, payload) => {
    const babyName = (payload.babyName ?? "").trim();
    const babyBirthdate = payload.babyBirthdate ?? null;

    realm.write(() => {
      realm.create(
        OnboardingProfile.schema.name,
        {
          _id: ONBOARDING_PROFILE_ID,
          babyName: babyName.length > 0 ? babyName : undefined,
          babyBirthdate: babyBirthdate ?? undefined,
          onboardingCompleted: true,
          updatedAt: new Date(),
        },
        Realm.UpdateMode.Modified
      );
    });

    set({
      onboardingCompleted: true,
      babyName,
      babyBirthdate,
    });
  },
  resetOnboardingForTesting: (realm) => {
    realm.write(() => {
      realm.create(
        OnboardingProfile.schema.name,
        {
          _id: ONBOARDING_PROFILE_ID,
          babyName: "",
          babyBirthdate: null,
          onboardingCompleted: false,
          updatedAt: new Date(),
        },
        Realm.UpdateMode.Modified
      );
    });

    set({
      onboardingCompleted: false,
      babyName: "",
      babyBirthdate: null,
    });
  },
}));
