import { defineNuxtPlugin, useRuntimeConfig, useState } from "#app";
import { LanyardData, LanyardMessage, LanyardResponse } from "../types";

let interval = 30_000;

export default defineNuxtPlugin(() => {
  const options = useRuntimeConfig().public.lanyard;
  const apiURL = options.apiURL;
  const userID = options.userID;

  const data = useState<LanyardData | null>("lanyard");

  if (options.socket) {
    const supportsWebSocket = "WebSocket" in window || "MozWebSocket" in window;

    if (!supportsWebSocket) { throw new Error("Browser doesn't support WebSocket connections."); }
    if (!options.userID) { throw new Error("Missing `userID` option."); }

    // Messages for websocket
    const subscribe: LanyardMessage = { op: 2, d: { subscribe_to_id: userID } };
    const heartbeat: LanyardMessage = { op: 3 };

    let WS: WebSocket;
    let HB: NodeJS.Timer;
    const connectWS = () => {
      if (HB) { clearInterval(HB); }

      WS = new WebSocket(`wss://${apiURL}/socket`);
      WS.onmessage = (event) => {
        const L = <LanyardMessage>JSON.parse(event.data);

        if (L.op == 0) {
          data.value = L.d;
        } else if (L.op == 1) {
          interval = L.d.heartbeat_interval;
          WS.send(JSON.stringify(subscribe));
        }
      };
      WS.onclose = connectWS;

      HB = setInterval(() => { WS.send(JSON.stringify(heartbeat)); }, interval);
    };

    connectWS();
  }

  /**
   * Get Lanyard Data
   * @param {string} [userID] Discord User ID
   * @returns Lanyard Data
   */
  async function getData(userID?: string) {
    const ID = userID ?? options.userID;
    const response = await fetch(`https://${options.apiURL}/v1/users/${ID}`);
    const body = await response.json() as LanyardResponse;
    return body.data;
  }

  return {
    provide: {
      lanyard: {
        data,
        getData
      }
    }
  };
});
