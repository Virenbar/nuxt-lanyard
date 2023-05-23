import { Activity } from "../types";

/**
 * Format start timestamp to string
 * @param {Activity} [activity]
 * @returns
 */
export function formatStart(activity?: Activity) {
  if (!activity || !activity.timestamps) { return; }
  const start = activity.timestamps.start;
  const seconds = (Date.now() - start) / 1000;

  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.round(seconds % 60);
  const time = [
    h,
    m > 9 ? m : (h ? "0" + m : m || "0"),
    s > 9 ? s : "0" + s
  ].filter(Boolean).join(":");
  return time;
}
