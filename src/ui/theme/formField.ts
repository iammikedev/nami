import { radius } from "./radius";
import { spacing } from "./spacing";

/**
 * Shared layout for form controls (text fields, birthdate row, etc.).
 * Balanced height: comfortable to tap, not oversized.
 */
export const formFieldMetrics = {
  minHeight: 52,
  paddingHorizontal: spacing[4],
  borderRadius: radius.lg,
  borderWidth: 1,
  fontSize: 16,
  lineHeight: 22,
} as const;
