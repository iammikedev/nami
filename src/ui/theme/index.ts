import { useColorScheme } from "@/hooks/use-color-scheme";
import { colors } from "./colors";

export * from "./animations";
export * from "./colors";
export * from "./icons";
export * from "./layout";
export * from "./radius";
export * from "./shadows";
export * from "./spacing";
export * from "./typography";
export * from "./zIndex";

export const useAppColors = () => {
  const scheme = useColorScheme();
  return colors[scheme === "dark" ? "dark" : "light"];
};
