/**
 * API Types for Random Number Generation
 */

export interface GenerateRequest {
  count: 1 | 5 | 30;
}

export type SSEMessageType = "number" | "done" | "error";

export interface SSENumberMessage {
  type: "number";
  value: number;
  progress: number;
  total: number;
}

export interface SSEDoneMessage {
  type: "done";
}

export interface SSEErrorMessage {
  type: "error";
  error: string;
}

export type SSEMessage = SSENumberMessage | SSEDoneMessage | SSEErrorMessage;
