import type { TextStyle } from "react-native";

export const fontFamily = {
  primary: "Nunito",
  brand: "Montserrat",
} as const;

export const fontWeight = {
  extraBold: "800",
  bold: "700",
  semiBold: "600",
  medium: "500",
  regular: "400",
} as const;

export const typography = {
  display: { fontSize: 32, lineHeight: 40, fontWeight: fontWeight.extraBold, fontFamily: fontFamily.primary },
  h1: { fontSize: 28, lineHeight: 36, fontWeight: fontWeight.extraBold, fontFamily: fontFamily.primary },
  h2: { fontSize: 24, lineHeight: 32, fontWeight: fontWeight.bold, fontFamily: fontFamily.primary },
  h3: { fontSize: 20, lineHeight: 28, fontWeight: fontWeight.bold, fontFamily: fontFamily.primary },
  title: { fontSize: 18, lineHeight: 26, fontWeight: fontWeight.semiBold, fontFamily: fontFamily.primary },
  body: { fontSize: 16, lineHeight: 24, fontWeight: fontWeight.regular, fontFamily: fontFamily.primary },
  bodySmall: { fontSize: 14, lineHeight: 20, fontWeight: fontWeight.regular, fontFamily: fontFamily.primary },
  caption: { fontSize: 12, lineHeight: 16, fontWeight: fontWeight.medium, fontFamily: fontFamily.primary },
  button: { fontSize: 16, lineHeight: 22, fontWeight: fontWeight.semiBold, fontFamily: fontFamily.primary },
  label: { fontSize: 13, lineHeight: 18, fontWeight: fontWeight.medium, fontFamily: fontFamily.primary },
} as const satisfies Record<string, TextStyle>;

export type TextVariant = keyof typeof typography;
export const textVariants = typography;
