import { defineNuxtPlugin } from "#app";
import {
  formatStart, formatUsername,
  resolveActivity, resolveAvatar, resolveColor
} from "./utils";

export default defineNuxtPlugin(() => {
  return {
    provide: {
      lanyard: {
        resolveActivity,
        resolveAvatar,
        resolveColor,
        formatStart,
        formatUsername
      }
    }
  };
});
