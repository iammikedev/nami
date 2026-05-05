import { Easing } from "react-native";

export const animations = {
  duration: {
    fast: 150,
    normal: 250,
    slow: 350,
  },
  easing: {
    easeOut: Easing.out(Easing.cubic),
    easeInOut: Easing.inOut(Easing.cubic),
  },
  scale: {
    pressIn: 0.97,
    pressOut: 1,
  },
  opacity: {
    pressIn: 0.9,
    pressOut: 1,
  },
} as const;
