export type DiscordStatus = "online" | "idle" | "dnd" | "offline"

export interface LanyardData {
  active_on_discord_desktop: boolean
  active_on_discord_mobile: boolean
  active_on_discord_web: boolean
  activities: Activity[]
  discord_status: DiscordStatus
  discord_user: DiscordUser
  kv: Record<string, string>
  listening_to_spotify: boolean
  spotify: Spotify | null
}

export interface Spotify {
  track_id: string
  timestamps: Timestamps
  song: string
  artist: string
  album_art_url: string
  album: string
}

export interface Timestamps {
  start: number
  end?: number
}

export interface Activity {
  type: number
  state: string
  name: string
  id: string
  emoji?: Emoji
  created_at: number
  application_id?: string
  timestamps?: Timestamps
  session_id?: string
  details?: string
  buttons?: string[]
  assets?: Assets
}

export interface Assets {
  small_text?: string
  small_image?: string
  large_text: string
  large_image: string
}

export interface Emoji {
  name: string
  id?: string
  animated?: boolean
}

export interface DiscordUser {
  username: string
  public_flags: number
  id: string
  global_name: string | null
  discriminator: string
  bot: boolean
  avatar_decoration: string | null
  avatar: string | null
}
