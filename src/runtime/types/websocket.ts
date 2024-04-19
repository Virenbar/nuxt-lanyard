/*
Types source: https://github.com/nebulatgs/sk-lanyard/blob/main/src/wsTypes.ts
*/
import type { LanyardData } from '.'

export enum LanyardOpcode {
  EVENT = 0,
  HELLO = 1,
  INITIALIZE = 2,
  HEARTBEAT = 3,
}

export interface LanyardInitializeOne {
  subscribe_to_id: string
  subscribe_to_ids?: never
  subscribe_to_all?: never
}
export interface LanyardInitializeMany {
  subscribe_to_id?: never
  subscribe_to_ids: string[]
  subscribe_to_all?: never
}
export interface LanyardInitializeAll {
  subscribe_to_id?: never
  subscribe_to_ids?: never
  subscribe_to_all: boolean
}

export type LanyardInitializeData = | LanyardInitializeOne | LanyardInitializeMany | LanyardInitializeAll
export type LanyardEventType = 'INIT_STATE' | 'PRESENCE_UPDATE'
export type InitState = LanyardData | Record<string, LanyardData>
// Documentation says there is `user_id`, but it does't exists
export type PresenceUpdate = LanyardData /* | (LanyardData & { user_id: string }) */
export type LanyardEvents = { INIT_STATE: InitState, PRESENCE_UPDATE: PresenceUpdate }

export interface LanyardMessage<T> {
  op: LanyardOpcode
  seq?: number
  t?: LanyardEventType
  d: T
}

export interface LanyardEvent<T extends LanyardEventType> extends LanyardMessage<LanyardEvents[T]> {
  op: LanyardOpcode.EVENT
  seq: number
  t: LanyardEventType
}

export interface LanyardHello extends LanyardMessage<{ heartbeat_interval: number }> {
  op: LanyardOpcode.HELLO
  seq?: never
  t?: never
}

export interface LanyardInitialize extends LanyardMessage<LanyardInitializeData> {
  op: LanyardOpcode.INITIALIZE
  seq?: never
  t?: never
}

export interface LanyardHeartbeat extends Omit<LanyardMessage<never>, 'd'> {
  op: LanyardOpcode.HEARTBEAT
  seq?: never
  t?: never
}
