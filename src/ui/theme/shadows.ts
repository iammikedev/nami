import { Platform, ViewStyle } from "react-native";

const iosShadow = (opacity: number, radius: number, y: number): ViewStyle => ({
  shadowColor: "#2F3A34",
  shadowOpacity: opacity,
  shadowRadius: radius,
  shadowOffset: { width: 0, height: y },
});

const androidShadow = (elevation: number): ViewStyle => ({
  elevation,
  shadowColor: "#2F3A34",
});

export const shadows = {
  none: {} as ViewStyle,
  sm:
    Platform.OS === "ios"
      ? iosShadow(0.07, 6, 2)
      : androidShadow(2),
  md:
    Platform.OS === "ios"
      ? iosShadow(0.1, 10, 4)
      : androidShadow(4),
  lg:
    Platform.OS === "ios"
      ? iosShadow(0.14, 16, 8)
      : androidShadow(8),
} as const;
