import { defineNuxtPlugin, useRuntimeConfig } from "#app";
import { LanyardResponse } from "./types";
import {
  formatStart, formatUsername,
  resolveActivity, resolveAvatar
} from "./utils";

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

  return {
    provide: {
      lanyard: {
        apiURL,
        getData,
        resolveActivity,
        resolveAvatar,
        formatStart,
        formatUsername
      }
    }
  };
});
