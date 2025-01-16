import type { LanyardResponse } from '../types'
import {
  formatStart, formatUsername,
  resolveActivity, resolveAvatar, resolveColor,
} from './../utils'
import { useRuntimeConfig } from '#app'

export function useLanyardHelper() {
  const { apiURL } = useRuntimeConfig().public.lanyard

  /**
   * Get Lanyard Data
   * @param {string} [userID] Discord User ID
   * @returns Lanyard Data
   */
  async function getData(userID?: string) {
    const response = await fetch(`https://${apiURL}/v1/users/${userID}`)
    const body = await response.json() as LanyardResponse
    if (body.success) {
      return body.data
    }
    else {
      throw new Error(body.error.message)
    }
  }

  return {
    getData,
    resolveActivity,
    resolveAvatar,
    resolveColor,
    formatStart,
    formatUsername,
  }
}
