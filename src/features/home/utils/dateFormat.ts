export function getRelativeTimeLabel(date: Date, now = new Date()): string {
  const diffMs = now.getTime() - date.getTime();
  const safeDiffMs = Math.max(0, diffMs);
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;

  if (safeDiffMs < minute) {
    return "just now";
  }

  if (safeDiffMs < hour) {
    const mins = Math.floor(safeDiffMs / minute);
    return `${mins} min ago`;
  }

  if (safeDiffMs < day) {
    const hours = Math.floor(safeDiffMs / hour);
    return `${hours}h ago`;
  }

  if (safeDiffMs < day * 2) {
    return "yesterday";
  }

  const days = Math.floor(safeDiffMs / day);
  return `${days}d ago`;
}

export function getStartAndEndOfToday(now = new Date()) {
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const end = new Date(start);
  end.setDate(end.getDate() + 1);
  return { start, end };
}
