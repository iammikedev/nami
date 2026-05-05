export type OnboardingOption = {
  id: "feeding" | "sleep" | "milestones";
  label: string;
  subtitle: string;
  tintColor: string;
  icon: "baby-bottle-outline" | "weather-night" | "star-outline";
};

export type OnboardingStateSnapshot = {
  onboardingCompleted: boolean;
  babyName: string;
  babyBirthdate: Date | null;
};

export type CompleteOnboardingPayload = {
  babyName?: string;
  babyBirthdate?: Date | null;
};
