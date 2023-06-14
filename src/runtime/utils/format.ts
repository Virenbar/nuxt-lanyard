import { Activity, DiscordUser } from "../types";

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

/**
 * Format username to string
 * @param {DiscordUser} [user]
 * @returns
 */
export function formatUsername(user?: DiscordUser) {
  if (!user) { return; }
  return user.discriminator == "0" ? user.username : `${user.username}#${user.discriminator}`;
}
