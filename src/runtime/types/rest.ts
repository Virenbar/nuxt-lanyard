import { LanyardData } from ".";

export interface LanyardError {
  message: string
  code: string
}

export interface LanyardDataResponse {
  success: true
  data: LanyardData
}

export interface LanyardErrorResponse {
  success: false
  error: LanyardError
}

export type LanyardResponse = LanyardDataResponse | LanyardErrorResponse;
