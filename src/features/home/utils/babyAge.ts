export function getBabyAgeLabel(birthdate: Date, now = new Date()): string {
  const dayMs = 24 * 60 * 60 * 1000;
  const diffMs = Math.max(0, now.getTime() - birthdate.getTime());
  const totalDays = Math.floor(diffMs / dayMs);

  const monthDiff =
    (now.getFullYear() - birthdate.getFullYear()) * 12 +
    (now.getMonth() - birthdate.getMonth()) -
    (now.getDate() < birthdate.getDate() ? 1 : 0);
  const months = Math.max(0, monthDiff);

  if (months < 1) {
    if (totalDays < 14) {
      return `${totalDays} day${totalDays === 1 ? "" : "s"}`;
    }
    const weeks = Math.max(1, Math.floor(totalDays / 7));
    return `${weeks} week${weeks === 1 ? "" : "s"}`;
  }

  if (months < 24) {
    return `${months} month${months === 1 ? "" : "s"}`;
  }

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (remainingMonths === 0) {
    return `${years} year${years === 1 ? "" : "s"}`;
  }

  return `${years}y ${remainingMonths}m`;
}
