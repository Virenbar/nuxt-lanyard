export * from "./lanyard";
export * from "./rest";
export * from "./websocket";

export interface LanyardConfigREST {
  method: "rest"
  id: string
  pollInterval?: number
}

export interface LanyardConfigOne {
  method: "ws"
  id: string
}

export interface LanyardConfigMany {
  method: "ws"
  ids: string[]
}

export interface LanyardConfigAll {
  method: "ws"
  all: true
}

export type LanyardConfigWS = LanyardConfigOne | LanyardConfigMany | LanyardConfigAll;

export type LanyardConfig = LanyardConfigREST | LanyardConfigWS;
