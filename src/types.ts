type If<T extends boolean, A, B = null> = T extends true ? A : T extends false ? B : A | B;
// WebSocket Types
interface OP0 {
  op: 0
}
interface IS<T extends boolean> extends OP0 {
  t: "INIT_STATE"
  d: If<T, Record<string, LanyardData>, LanyardData>
}
interface PU extends OP0 {
  t: "PRESENCE_UPDATE"
  d: LanyardData
}
interface OP1 {
  op: 1
  d: { "heartbeat_interval": number }
}
interface OP2<T extends boolean> {
  op: 2
  d: If<T, { "subscribe_to_ids": string[] }, { "subscribe_to_id": string }>
}
interface OP3 {
  op: 3
}
export type LanyardMessage<T extends boolean = false> = PU | IS<T> | OP1 | OP2<T> | OP3

// HTTP Types
export interface LanyardResponse {
  success: boolean;
  data: LanyardData;
  error?: LanyardError;
}
export interface LanyardError {
  message: string;
  code: string;
}
// Shared Types
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
  display_name: string | null
  discriminator: string
  bot: boolean
  avatar_decoration: string | null
  avatar: string | null
}
