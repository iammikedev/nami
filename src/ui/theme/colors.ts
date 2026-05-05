export const colors = {
  light: {
    primary: "#A8D5BA",
    background: "#FFF6E9",
    surface: "#F1E3D3",
    surfaceElevated: "#FFFFFF",
    textPrimary: "#2F3A34",
    textSecondary: "#6F7D73",
    border: "#E8DCCF",
    activity: {
      feed: "#FFC6A8",
      sleep: "#CDB4DB",
      diaper: "#BDE0FE",
      milestone: "#FFD166",
    },
    semantic: {
      success: "#A8D5BA",
      warning: "#FFD166",
      error: "#FF8B8B",
      info: "#BDE0FE",
    },
    onboarding: {
      cardFeed: "#FFE3D2",
      cardSleep: "#E7DBF2",
      cardMilestone: "#DBEBF9",
    },
  },
} as const;

export type AppColors = typeof colors.light;
export type ColorKey = keyof AppColors;
export type ActivityType = keyof AppColors["activity"];
