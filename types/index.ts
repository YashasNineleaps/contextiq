export type TaskDomain = "Backend" | "Frontend" | "Infrastructure" | "Payments" | "Security" | "Database";
export type TaskPriority = "Critical" | "High" | "Medium" | "Low";
export type TaskStatus = "In Progress" | "To Do" | "In Review" | "Blocked" | "Done";

export interface EngineeringTask {
  id: string; // e.g. "VOL-142"
  slug: string;
  title: string;
  domain: TaskDomain;
  priority: TaskPriority;
  status: TaskStatus;
  reporter: string;
  assignee: string;
  assigneeAvatar: string;
  updatedAt: string;
  description: string;
  signalsCount: number;
  sourcesCount: number;
}

export interface PullRequest {
  id: string; // e.g. "PR #142"
  number: number;
  title: string;
  status: "merged" | "open" | "draft" | "closed";
  author: string;
  authorAvatar: string;
  date: string;
  filesChanged: number;
  aiRelevance: number; // e.g. 94%
  relevanceExplanation: string;
  url: string;
  diffSummary: string;
}

export interface SlackMessage {
  id: string;
  channel: string;
  author: string;
  authorRole: string;
  avatar: string;
  timestamp: string;
  content: string;
  isKeyInsight: boolean;
  decisionExtracted?: string;
}

export interface CodeFile {
  path: string;
  name: string;
  language: "typescript" | "tsx" | "javascript" | "prisma" | "json" | "markdown" | "sql";
  layer: "Frontend" | "Backend" | "Database" | "Config" | "API";
  changedAt: string;
  changesCount: number;
  summary: string;
  codeSnippet: string;
  relevance: string;
}

export interface Commit {
  hash: string;
  shortHash: string;
  message: string;
  author: string;
  date: string;
  files: string[];
}

export interface EngineeringDecision {
  id: string;
  title: string;
  reason: string;
  date: string;
  status: "Accepted" | "Active" | "Superseded";
  source: string;
}

export interface DocEntry {
  id: string;
  title: string;
  system: "Confluence" | "Notion" | "README" | "RFC";
  lastUpdated: string;
  excerpt: string;
  url: string;
}

export interface TimelineItem {
  id: string;
  date: string;
  type: "jira" | "pr" | "slack" | "commit" | "doc" | "deployment" | "decision";
  title: string;
  description: string;
  result?: string;
  author?: string;
  link?: string;
}

export interface PreviousAttempt {
  attemptNumber: number;
  approach: string;
  layer: string;
  prNumber?: string;
  result: "Partial improvement" | "Incomplete" | "Issue still reproducible" | "Failed";
  details: string;
  whyItFailed: string;
}

export interface WhatChangedItem {
  type: "added" | "removed" | "modified" | "alert";
  text: string;
  source: string;
}

export interface ContextSourcesCount {
  jiraCount: number;
  githubCount: number;
  slackCount: number;
  confluenceCount: number;
  codebaseCount: number;
}

export interface ImplementationPlan {
  taskId: string;
  filesToModify: {
    path: string;
    action: "Modify" | "Create" | "Refactor" | "Review";
    description: string;
  }[];
  apiImpact: "Low" | "Medium" | "High" | "Breaking";
  databaseImpact: "None" | "Schema Migration" | "Index Only";
  risk: "Low" | "Medium" | "High";
  estimatedEffort: string;
  testsRequired: number;
  edgeCases: string[];
  steps: {
    stepNumber: number;
    title: string;
    description: string;
  }[];
}

export interface ReconstructedContext {
  taskId: string;
  taskTitle: string;
  confidenceScore: number;
  signalsFound: number;
  sourcesAnalyzed: number;
  lastActivity: string;
  heroSummary: string;
  crossSourceInsight: string;
  whatChanged: WhatChangedItem[];
  timeline: TimelineItem[];
  files: CodeFile[];
  pullRequests: PullRequest[];
  slackMessages: SlackMessage[];
  decisions: EngineeringDecision[];
  previousAttempts: PreviousAttempt[];
  aiInterpretation: string;
  recommendedNextSteps: string[];
  contextSources: ContextSourcesCount;
  implementationPlan: ImplementationPlan;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  sources?: string[];
}

export interface IntegrationStatus {
  id: string;
  name: string;
  category: "Source Control" | "Communication" | "Issue Tracking" | "Knowledge Base" | "Design";
  iconName: string;
  status: "Connected" | "Available";
  description: string;
  lastSync?: string;
  signalsCount: number;
}

