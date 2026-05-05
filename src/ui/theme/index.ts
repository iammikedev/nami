import { colors } from "./colors";

export * from "./animations";
export * from "./colors";
export * from "./radius";
export * from "./shadows";
export * from "./spacing";
export * from "./typography";

export const layout = { touchMin: 48 } as const;
export const useNamiColors = () => colors.light;
export const useAppColors = useNamiColors;
