export function getElapsedSeconds(startedAt: Date, now = new Date()): number {
  return Math.max(0, Math.floor((now.getTime() - startedAt.getTime()) / 1000));
}

export function formatElapsedLabel(totalSeconds: number): string {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

export function elapsedSecondsToRoundedMinutes(totalSeconds: number): number {
  if (totalSeconds <= 0) return 0;
  return Math.max(1, Math.round(totalSeconds / 60));
}
