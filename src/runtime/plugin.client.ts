import { defineNuxtPlugin, useRuntimeConfig } from "#app";
import { Activity, Assets, LanyardResponse } from "./types";

export default defineNuxtPlugin(() => {
  const options = useRuntimeConfig().public.lanyard;
  const apiURL = options.apiURL;

  /**
   * Get Lanyard Data
   * @param {string} [userID] Discord User ID
   * @returns Lanyard Data
   */
  async function getData(userID?: string) {
    const response = await fetch(`https://${apiURL}/v1/users/${userID}`);
    const body = await response.json() as LanyardResponse;
    if (body.success) {
      return body.data;
    } else {
      throw new Error(body.error.message);
    }
  }

  /**
   * Format start timestamp to string
   * @param {Activity} [activity]
   * @returns
   */
  function formatStart(activity?: Activity) {
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
   * Resolve image string to URL
   * @param {string} app
   * @param {string} [image]
   * @returns Image URL
   */
  function resolveImage(app: string, image?: string) {
    if (!image) { return; }
    if (image.startsWith("mp:")) {
      return image?.replace("mp:", "https://media.discordapp.net/");
    } else {
      return `https://cdn.discordapp.com/app-assets/${app}/${image}.png`;
    }
  }

  /**
   * Resolve images strings with URL
   * @param {Activity} [activity]
   * @returns Formatted assets 
   */
  function resolveAssets(activity?: Activity) {
    if (!activity || !activity.application_id || !activity.assets) { return; }
    const app = activity.application_id;
    return {
      large_image: resolveImage(app, activity.assets.large_image),
      large_text: activity.assets.large_text,
      small_image: resolveImage(app, activity.assets.small_image),
      small_text: activity.assets.small_text
    } as Assets;
  }

  return {
    provide: {
      lanyard: {
        apiURL,
        getData,
        formatStart,
        resolveImage,
        resolveAssets
      }
    }
  };
});
