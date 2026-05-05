import { Platform, TextStyle } from "react-native";

// TODO(fonts): Install Nunito + Montserrat font files in assets/fonts and load them
// in app root via expo-font `useFonts` before first render.
// Suggested family names after load:
// - Nunito-Regular, Nunito-Medium, Nunito-SemiBold, Nunito-Bold, Nunito-ExtraBold
// - Montserrat-SemiBold, Montserrat-Bold
const fontFamily = Platform.select({
  ios: {
    nunitoRegular: "ui-rounded",
    nunitoMedium: "ui-rounded",
    nunitoSemiBold: "ui-rounded",
    nunitoBold: "ui-rounded",
    nunitoExtraBold: "ui-rounded",
    montserratSemiBold: "ui-rounded",
    montserratBold: "ui-rounded",
  },
  android: {
    nunitoRegular: "sans-serif",
    nunitoMedium: "sans-serif-medium",
    nunitoSemiBold: "sans-serif-medium",
    nunitoBold: "sans-serif-medium",
    nunitoExtraBold: "sans-serif-medium",
    montserratSemiBold: "sans-serif-medium",
    montserratBold: "sans-serif-medium",
  },
  default: {
    nunitoRegular: "System",
    nunitoMedium: "System",
    nunitoSemiBold: "System",
    nunitoBold: "System",
    nunitoExtraBold: "System",
    montserratSemiBold: "System",
    montserratBold: "System",
  },
});

const typeStyle = (
  fontFamilyValue: string | undefined,
  fontSize: number,
  lineHeight: number,
  fontWeight: TextStyle["fontWeight"],
  letterSpacing: number
) =>
  ({
    fontFamily: fontFamilyValue,
    fontSize,
    lineHeight,
    fontWeight,
    letterSpacing,
  }) as const;

export const typography = {
  fontFamily,
  variants: {
    display: typeStyle(fontFamily?.nunitoExtraBold, 32, 40, "800", -0.3),
    h1: typeStyle(fontFamily?.nunitoBold, 28, 36, "700", -0.2),
    h2: typeStyle(fontFamily?.nunitoBold, 24, 32, "700", -0.1),
    h3: typeStyle(fontFamily?.nunitoBold, 20, 28, "700", -0.05),
    title: typeStyle(fontFamily?.nunitoSemiBold, 18, 26, "600", 0),
    body: typeStyle(fontFamily?.nunitoRegular, 16, 24, "400", 0.1),
    bodySmall: typeStyle(fontFamily?.nunitoRegular, 14, 20, "400", 0.1),
    caption: typeStyle(fontFamily?.nunitoMedium, 12, 16, "500", 0.2),
    button: typeStyle(fontFamily?.nunitoSemiBold, 16, 22, "600", 0.1),
    label: typeStyle(fontFamily?.nunitoMedium, 13, 18, "500", 0.2),
    brand: typeStyle(fontFamily?.montserratSemiBold, 22, 30, "600", 0),
  },
} as const;

export const textVariants = {
  display: typography.variants.display,
  h1: typography.variants.h1,
  h2: typography.variants.h2,
  h3: typography.variants.h3,
  title: typography.variants.title,
  body: typography.variants.body,
  bodySmall: typography.variants.bodySmall,
  caption: typography.variants.caption,
  button: typography.variants.button,
  label: typography.variants.label,
  brand: typography.variants.brand,
  // Backward-compatible aliases for previously used variants.
  bodyEmphasis: typography.variants.button,
  titleSmall: typography.variants.h3,
  heading: typography.variants.h1,
} as const;

export type TextVariant = keyof typeof textVariants;
