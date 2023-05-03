import { useNuxtApp, useState } from "#app";
import { Ref, onUnmounted } from "vue";
import {
  InitState,
  LanyardConfig,
  LanyardConfigAll,
  LanyardConfigMany,
  LanyardConfigOne,
  LanyardConfigREST,
  LanyardConfigWS,
  LanyardData,
  LanyardEvent,
  LanyardHeartbeat,
  LanyardHello,
  LanyardInitialize,
  LanyardInitializeData,
  LanyardMessage,
  LanyardOpcode
} from "../../types";

let apiURL: string;

export function useLanyard(config: LanyardConfigMany | LanyardConfigAll): Ref<Record<string, LanyardData>>
export function useLanyard(config: LanyardConfigREST | LanyardConfigOne): Ref<LanyardData>
export function useLanyard(config: LanyardConfig) {
  if (typeof window === "undefined") { return; }

  apiURL = useNuxtApp().$lanyard.apiURL;

  if (config.method == "rest") {
    const data = useState<LanyardData>();
    const { stop } = useREST(config, data);
    onUnmounted(stop);
    return data;
  }
  if (config.method == "ws") {
    if ("id" in config) {
      const data = useState<LanyardData>();
      const { stop } = useWS(config, data);
      onUnmounted(stop);
      return data;
    } else {
      const data = useState<Record<string, LanyardData>>();
      const { stop } = useWS(config, data);
      onUnmounted(stop);
      return data;
    }
  }
}

function useREST(config: LanyardConfigREST, data: Ref<LanyardData>) {
  const { getData } = useNuxtApp().$lanyard;
  const updateData = async () => {
    data.value = await getData(config.id);
  };
  updateData();
  const timer = setInterval(updateData, config.pollInterval ?? 5000);
  const stop = () => clearInterval(timer);

  return { data, stop };
}

function useWS<T extends InitState>(config: LanyardConfigWS, data: Ref<T>) {
  const supportsWebSocket = "WebSocket" in window || "MozWebSocket" in window;
  if (!supportsWebSocket) { throw new Error("Browser doesn't support WebSocket connections."); }

  // Messages for websocket
  const heartbeat: LanyardHeartbeat = { op: 3 };
  let d: LanyardInitializeData;
  if ("all" in config) { d = { subscribe_to_all: config.all }; }
  else if ("ids" in config) { d = { subscribe_to_ids: config.ids }; }
  else if ("id" in config) { d = { subscribe_to_id: config.id }; }
  else { throw new Error("Invalid lanyard config"); }
  const init: LanyardInitialize = {
    op: LanyardOpcode.INITIALIZE,
    d: d
  };
  let interval = 30e3;
  const single = "id" in config;
  const WS = new WebSocket(`wss://${apiURL}/socket`);
  const send = <T>(message: T) => WS.send(JSON.stringify(message));

  // const first = (event: MessageEvent) => {
  //   const L = <LanyardHello>JSON.parse(event.data);
  //   interval = L.d.heartbeat_interval ?? interval;
  //   send(init);
  // };

  WS.onmessage = (event) => {
    const L = <LanyardMessage<any>>JSON.parse(event.data);

    if (L.op == LanyardOpcode.EVENT) {
      const event = <LanyardMessage<T>>L;
      if (event.t == "INIT_STATE") {
        data.value = event.d;
      } else {
        const update = <LanyardEvent<"PRESENCE_UPDATE">>event;
        if (single) {
          data.value = <T>{ ...update.d };
        } else {
          //const { user_id, ...state } = update.d;
          const user_id = update.d.discord_user.id;
          (<Record<string, LanyardData>>data.value)[user_id] = update.d;
        }
      }
    } else if (L.op == LanyardOpcode.HELLO) {
      const hello = <LanyardHello>L;
      interval = hello.d.heartbeat_interval;
      send(init);
    }
  };

  const timer = setInterval(() => { send(heartbeat); }, interval);

  const stop = () => {
    clearInterval(timer);
    WS.close();
  };

  return { stop };
}
