export const colorTokens = {
  sage: "#A8D5BA",
  cream: "#FFF6E9",
  beige: "#F1E3D3",
  textPrimary: "#2F3A34",
  textSecondary: "#6F7D73",
  border: "#E8DCCF",
  white: "#FFFFFF",
  black: "#1D231F",
  overlay: "rgba(47, 58, 52, 0.2)",
} as const;

export const activityColors = {
  feed: "#FFC6A8",
  sleep: "#CDB4DB",
  diaper: "#BDE0FE",
  milestone: "#FFD166",
} as const;

export const colors = {
  light: {
    background: colorTokens.cream,
    surface: colorTokens.beige,
    surfaceElevated: colorTokens.white,
    primary: colorTokens.sage,
    textPrimary: colorTokens.textPrimary,
    textSecondary: colorTokens.textSecondary,
    border: colorTokens.border,
    muted: "#F8EFE2",
    overlay: colorTokens.overlay,
    success: "#5B9D7A",
    warning: "#E2B45C",
    danger: "#E07B7B",
    activity: activityColors,
  },
  dark: {
    background: "#1D231F",
    surface: "#2A332D",
    surfaceElevated: "#333D36",
    primary: "#8CC5A7",
    textPrimary: "#F4F1EA",
    textSecondary: "#C2CCC4",
    border: "#3C4A41",
    muted: "#273029",
    overlay: "rgba(0, 0, 0, 0.35)",
    success: "#7CC49C",
    warning: "#F2CB7A",
    danger: "#F09C9C",
    activity: {
      feed: "#E9AD8A",
      sleep: "#B89BC9",
      diaper: "#9EC7E8",
      milestone: "#EABF53",
    },
  },
} as const;

export type AppThemeMode = keyof typeof colors;
export type AppColors = typeof colors.light;

export const tailwindColorTokens = {
  nami: {
    sage: colorTokens.sage,
    cream: colorTokens.cream,
    beige: colorTokens.beige,
    text: colorTokens.textPrimary,
    textSecondary: colorTokens.textSecondary,
    border: colorTokens.border,
    feed: activityColors.feed,
    sleep: activityColors.sleep,
    diaper: activityColors.diaper,
    milestone: activityColors.milestone,
  },
} as const;
