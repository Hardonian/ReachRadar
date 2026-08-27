export type CopilotRole = "user" | "assistant" | "system";

export interface CopilotCitation {
  type: "cohort" | "shift" | "channel" | "weather" | "methodology";
  id: string;
  title: string;
  url?: string;
  confidenceScore?: number;
}

export interface CopilotMessage {
  id: string;
  role: CopilotRole;
  content: string;
  citations?: CopilotCitation[];
  suggestedFollowUps?: string[];
  timestamp: string;
}

export interface CopilotSession {
  sessionId: string;
  organizationId: string;
  channelId?: string;
  messages: CopilotMessage[];
  createdAt: string;
  updatedAt: string;
}

export interface CopilotQueryRequest {
  query: string;
  channelId?: string;
  cohortId?: string;
  history?: Array<{ role: CopilotRole; content: string }>;
}

export interface CopilotQueryResponse {
  reply: string;
  citations: CopilotCitation[];
  suggestedFollowUps: string[];
  injectedContextSummary: string;
  executionTimeMs: number;
}
