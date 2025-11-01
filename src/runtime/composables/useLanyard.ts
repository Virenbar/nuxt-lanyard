import { onUnmounted, type Ref } from 'vue'
import {
  LanyardOpcode,
  type InitState,
  type LanyardConfig,
  type LanyardConfigAll,
  type LanyardConfigMany,
  type LanyardConfigOne,
  type LanyardConfigREST,
  type LanyardConfigWS,
  type LanyardData,
  type LanyardEvent,
  type LanyardHeartbeat,
  type LanyardHello,
  type LanyardInitialize,
  type LanyardInitializeData,
  type LanyardMessage,
} from '../types'
import { useRuntimeConfig, useState } from '#app'
import { useLanyardHelper } from '#imports'

export function useLanyard(config: LanyardConfigMany | LanyardConfigAll): Ref<Record<string, LanyardData>> | null
export function useLanyard(config: LanyardConfigREST | LanyardConfigOne): Ref<LanyardData> | null
export function useLanyard(config: LanyardConfig) {
  if (import.meta.server) return null
  if ('id' in config) {
    const data = useState<LanyardData>()
    if (config.method == 'rest') {
      const { stop } = useREST(config, data)
      onUnmounted(stop)
    }
    if (config.method == 'ws') {
      const { stop } = useWS(config, data)
      onUnmounted(stop)
    }
    return data
  }
  else {
    const data = useState<Record<string, LanyardData>>()
    const { stop } = useWS(config, data)
    onUnmounted(stop)
    return data
  }
}

function useREST(config: LanyardConfigREST, data: Ref<LanyardData>) {
  const { getData } = useLanyardHelper()
  const updateData = async () => {
    data.value = await getData(config.id)
  }
  updateData()
  const timer = setInterval(updateData, config.pollInterval ?? 5000)
  const stop = () => clearInterval(timer)

  return { data, stop }
}

function useWS<T extends InitState>(config: LanyardConfigWS, data: Ref<T>) {
  const supportsWebSocket = 'WebSocket' in window || 'MozWebSocket' in window
  if (!supportsWebSocket) {
    throw new Error('Browser doesn\'t support WebSocket connections.')
  }

  const { apiURL } = useRuntimeConfig().public.lanyard

  const single = 'id' in config
  // Initialization data
  let d: LanyardInitializeData
  if ('all' in config) {
    d = { subscribe_to_all: config.all }
  }
  else if ('ids' in config) {
    d = { subscribe_to_ids: config.ids }
  }
  else if ('id' in config) {
    d = { subscribe_to_id: config.id }
  }
  else {
    throw new Error('Invalid lanyard config')
  }
  // Messages for websocket
  const heartbeat: LanyardHeartbeat = {
    op: LanyardOpcode.HEARTBEAT,
  }
  const init: LanyardInitialize = {
    op: LanyardOpcode.INITIALIZE,
    d: d,
  }

  let interval = 30e3
  let WS: WebSocket | null
  let timer: NodeJS.Timeout | null

  const send = <T>(message: T) => WS?.send(JSON.stringify(message))
  const connect = () => {
    WS = new WebSocket(`wss://${apiURL}/socket`)

    WS.onmessage = (event) => {
      const L = <LanyardMessage<unknown>>JSON.parse(event.data)

      if (L.op == LanyardOpcode.EVENT) {
        const event = <LanyardMessage<T>>L
        if (event.t == 'INIT_STATE') {
          data.value = event.d
        }
        else {
          const update = <LanyardEvent<'PRESENCE_UPDATE'>>event
          if (single) {
            data.value = <T>{ ...update.d }
          }
          else {
            // const { user_id, ...state } = update.d;
            const user_id = update.d.discord_user.id;
            (<Record<string, LanyardData>>data.value)[user_id] = update.d
          }
        }
      }
      else if (L.op == LanyardOpcode.HELLO) {
        const hello = <LanyardHello>L
        // Setup timer after server response
        interval = hello.d.heartbeat_interval
        timer ??= setInterval(() => {
          send(heartbeat)
        }, interval)
        // And send init data
        send(init)
      }
    }

    WS.onclose = () => {
      // If tab gets inactive socket will be closed by server
      // Reconnect if timer exists
      if (!timer) {
        return
      }
      clearInterval(timer)
      timer = null
      if (import.meta.dev) console.info('Lanyard: WS closed by server, reconnecting...')
      connect()
    }
    if (import.meta.dev) console.info('Lanyard: WS connected')
  }

  const stop = () => {
    if (timer) {
      clearInterval(timer)
      timer = null
    }
    WS?.close()
    if (import.meta.dev) console.info('Lanyard: WS closed by client')
  }

  connect()

  return { stop }
}
