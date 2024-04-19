import type { DiscordStatus } from '../types'

export function resolveColor(status?: DiscordStatus | null) {
  switch (status) {
    case 'online': return '#23a55a'
    case 'idle': return '#f0b232'
    case 'dnd': return '#f23f43'
    default: return '#80848e'
  }
}
