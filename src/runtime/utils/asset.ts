import type { Activity, AssetType, Emoji } from '../types'

const CDN_TWEMOJI = 'https://cdn.jsdelivr.net/gh/twitter/twemoji/assets/72x72'
const CDN_ASSET = 'https://cdn.discordapp.com/app-assets'
const CDN_EMOJI = 'https://cdn.discordapp.com/emojis'
const CDN_MEDIA = 'https://media.discordapp.net'
const APP_ICON = 'https://dcdn.dstn.to/app-icons'
const SPOTIFY = 'https://i.scdn.co/image'

const TwemojiExceptions: Record<string, string> = {
  '\u2764\uFE0F': '2764', // (❤️)
} as const

/**
 * Resolves activity asset to URL
 *
 * @param {(Activity | undefined)} activity Activity object
 * @param {AssetType} type Type of asset
 */
export function resolveActivity(activity: Activity | undefined, type: AssetType) {
  if (!activity) {
    return
  }
  if (activity.type == 4 && activity.emoji) {
    return resolveEmoji(activity.emoji)
  }

  const smallImage = activity.assets?.small_image
  const largeImage = activity.assets?.large_image ?? (activity.id.startsWith('spotify:') ? activity.id : undefined)

  const asset = type == 'small' ? smallImage : largeImage
  return resolveAsset(activity.application_id, asset)
}

export function resolveAsset(applicationId?: string, asset?: string) {
  if (!applicationId && !asset) {
    return
  }

  if (applicationId && !asset) {
    return `${APP_ICON}/${applicationId}.webp?size=512`
  }

  if (!asset) {
    return
  }

  const split = asset.split(':')
  if (split.length > 1) {
    const prefix = split[0]
    const id = split[1]
    if (prefix == 'spotify') {
      if (id == '1') {
        return
      }
      // Spotify asset
      return `${SPOTIFY}/${id}`
    }
    else if (prefix == 'mp') {
      // External asset
      return `${CDN_MEDIA}/${id}`
    }
    else {
      return
    }
  }
  // Application asset
  return `${CDN_ASSET}/${applicationId}/${asset}.webp?size=512`
}

function resolveEmoji(emoji: Emoji) {
  if (!emoji.id) {
    return getTwemojiUrl(getEncodedTwemoji(emoji.name))
  }
  return `${CDN_EMOJI}/${emoji.id}.${emoji.animated ? 'gif' : 'png'}?size=64`
}

function getEncodedTwemoji(emoji: string) {
  return TwemojiExceptions[emoji] ?? [...emoji].map(point => point.codePointAt(0)!.toString(16)).join('-')
}

function getTwemojiUrl(emoji: string) {
  return `${CDN_TWEMOJI}/${emoji}.png` as const
}
