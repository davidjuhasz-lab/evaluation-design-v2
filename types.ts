
export type ViewState = 'dashboard' | 'threads' | 'metrics' | 'agents' | 'documents' | 'evaluation' | 'settings';
export type ManualModule = 'none' | 'assistant' | 'edu' | 'docu';
export type AutoState = 'list' | 'agent-modal' | 'type-modal' | 'editor' | 'simulating' | 'simulation-review' | 'running' | 'results';
export type EvalLandingView = 'history' | 'manual-run' | 'auto-results' | 'auto-editor';

export type TestSubType = 
  | 'assistant-single' | 'assistant-multi' 
  | 'docu-pipeline' | 'docu-bulk';

export type RunType = 'manual' | 'auto';
export type RunStatus = 'completed' | 'running' | 'failed';

export interface Agent {
  id: string;
  name: string;
  type: 'assistant' | 'docu' ;
}

// Terminal debug data tied to a specific run
export interface TerminalData {
  traceId: string;
  orchestrationSteps: OrchestrationStep[];
  metrics: SessionMetrics;
  retrievalContext: RetrievalChunk[];
}

export interface OrchestrationStep {
  id: string;
  agent: string;
  agentColor: string;
  timestamp: string;
  action: string;
  details: string;
}

export interface SessionMetrics {
  totalCost: string;
  latency: string;
  tokens: number;
  steps: number;
}

export interface RetrievalChunk {
  fileName: string;
  chunkId: string;
  preview: string;
}

// LLM Review types
export interface ReviewMetric {
  name: string;
  score: number;
  maxScore: number;
  description: string;
  status: 'pass' | 'warning' | 'fail';
}

export interface LLMReview {
  title: string;
  summary: string;
  metrics: ReviewMetric[];
  strengths: string[];
  improvements: string[];
  retrievedChunksUsed: number;
  totalChunks: number;
}

// Syllabus version for edu runs
export interface SyllabusVersion {
  id: string;
  name: string;
  createdAt: string;
  modules: { id: string; title: string; topics: string; time: string }[];
  markdown: string;
  review?: LLMReview;
}

// Manual run - a single manual testing session
export interface ManualRun {
  id: string;
  type: 'manual';
  module: ManualModule;
  moduleName: string;
  createdAt: string;
  duration: string;
  status: RunStatus;
  messages: ChatMessage[];
  terminalData: TerminalData;
  syllabusVersions?: SyllabusVersion[]; // For edu runs
}

export interface ChatMessage {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

// Auto run - an automated evaluation run
export interface AutoRun {
  id: string;
  type: 'auto';
  testSetName: string;
  agentId: string;
  agentName: string;
  subType: TestSubType;
  createdAt: string;
  duration: string;
  status: RunStatus;
  passRate: number;
  testCaseCount: number;
  agentSettings: AgentSettings;
  metrics: EvalMetric[];
  results: AutoRunResult[];
}

export interface AgentSettings {
  model: string;
  temperature: number;
  maxTokens: number;
  systemPrompt: string;
  tools: string[];
}

export interface EvalMetric {
  name: string;
  value: number;
  threshold: number;
  passed: boolean;
}

export interface AutoRunResult {
  id: number;
  title: string;
  status: 'pass' | 'fail';
  fileType?: string;
  fileSize?: string;
  metrics: { name: string; value: number }[];
  extractedData?: Record<string, string | null>;
}

export type RunHistoryEntry = ManualRun | AutoRun;

export const AGENTS: Agent[] = [
  { id: 'assistant', name: 'Assistant', type: 'assistant' },
  { id: 'doc-pipeline', name: 'Document Pipeline', type: 'docu' },
];