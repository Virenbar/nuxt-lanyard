import {
  formatStart, formatUsername,
  resolveActivity, resolveAvatar, resolveColor,
} from './utils'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      lanyard: {
        resolveActivity,
        resolveAvatar,
        resolveColor,
        formatStart,
        formatUsername,
      },
    },
  }
})
