/**
 * API Types for Random Number Generation
 */

export type ModelOption =
  | "anthropic/claude-sonnet-4.5"       // Claude Sonnet 4.5
  | "google/gemini-3-flash-preview"     // Gemini 3 Flash Preview
  | "openai/gpt-4o-mini"                // GPT-4o Mini
  | "sao10k/l3-lunaris-8b";             // Lunaris 8B

export interface GenerateRequest {
  count: 1 | 5 | 30;
  model?: ModelOption;  // Optional, defaults to Gemini
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
