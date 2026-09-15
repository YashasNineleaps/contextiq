import {
  ReconstructedContext,
  ImplementationPlan,
  EngineeringTask,
} from "@/types";
import {
  MOCK_TASKS,
  VOL_142_CONTEXT,
  MOCK_FILES,
  MOCK_PRS,
  MOCK_SLACK_MESSAGES,
  MOCK_DECISIONS,
} from "@/lib/mock-data/volunteer-hub";

/**
 * Reconstructs engineering context for any task.
 * Returns deterministic high-fidelity context for VOL-142, and generated context for other tasks.
 */
export async function reconstructContext(taskId: string): Promise<ReconstructedContext> {
  // If OpenAI API key is present, we could enhance or stream, but we ensure deterministic baseline
  if (taskId === "VOL-142" || taskId.toLowerCase().includes("volunteer-registration")) {
    return { ...VOL_142_CONTEXT };
  }

  const task = MOCK_TASKS.find((t) => t.id === taskId || t.slug === taskId) || MOCK_TASKS[0];

  return generateFallbackContext(task);
}

/**
 * Answers questions grounded in the task's reconstructed engineering context.
 * Uses OpenAI if OPENAI_API_KEY is defined in process.env, otherwise uses intelligent deterministic reasoning.
 */
export async function answerContextQuestion(
  question: string,
  context: ReconstructedContext
): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;

  if (apiKey) {
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          temperature: 0.2,
          messages: [
            {
              role: "system",
              content: `You are ContextIQ, an expert enterprise AI engineering context layer. 
Your job is to answer questions strictly grounded in the provided engineering context for task "${context.taskTitle}" (${context.taskId}).
Never hallucinate outside the known PRs, Slack messages, commits, and files.
Be crisp, technical, actionable, and focus on cross-source reasoning.

Current Context:
Task: ${context.taskId} - ${context.taskTitle}
Summary: ${context.heroSummary}
AI Insight: ${context.crossSourceInsight}
Files: ${context.files.map((f) => f.path).join(", ")}
PRs: ${context.pullRequests.map((p) => `${p.id}: ${p.title} (${p.status})`).join("; ")}
Slack Insights: ${context.slackMessages.filter((s) => s.isKeyInsight).map((s) => `${s.author}: "${s.content}"`).join("; ")}
Decisions: ${context.decisions.map((d) => d.title).join("; ")}
Previous Attempts: ${context.previousAttempts.map((a) => `${a.approach} -> ${a.result}`).join("; ")}
Next Steps: ${context.recommendedNextSteps.join("; ")}`,
            },
            {
              role: "user",
              content: question,
            },
          ],
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const content = data.choices?.[0]?.message?.content;
        if (content) return content;
      }
    } catch (err) {
      console.warn("OpenAI API call failed, falling back to deterministic engine:", err);
    }
  }

  // Deterministic engineering context responses
  return getDeterministicAnswer(question, context);
}

/**
 * Intelligent deterministic answer generator covering the key demo scenarios
 */
function getDeterministicAnswer(question: string, context: ReconstructedContext): string {
  const q = question.toLowerCase();

  if (q.includes("why is this bug happening") || q.includes("why is this happening") || q.includes("root cause")) {
    return `The root cause is in \`src/components/RegistrationForm.tsx\`. When users submit the registration form without filling optional fields (such as dietaryPreferences and emergencyContact), React Hook Form serializes those unentered fields as explicit \`null\` values instead of empty strings. 
    
While PR #142 added server-side Zod validation in \`src/services/registration.service.ts\`, it simply rejected the \`null\` payload with a 400 Bad Request error. The frontend continues to send the malformed payload, so registrations still fail.`;
  }

  if (q.includes("what has already been tried") || q.includes("previous attempts") || q.includes("tried")) {
    return `Three approaches have already been tried:
1. **Backend Validation Only (PR #142)**: Rahul added Zod validation to reject nulls. *Result*: Converted 500 crashes to 400 Bad Requests, but didn't solve the underlying failure for volunteers.
2. **Frontend Form Layout Refactor (PR #151)**: Elena cleaned up the form UI and React Hook Form bindings. *Result*: Incomplete, because form reset still restored \`null\` for optional fields.
3. **Database Default Value Patch (Commit b789012)**: Marcus configured SQL default \`''\` on PostgreSQL. *Result*: Prisma enforces runtime types before SQL execution, bypassing the database default.

**Key Takeaway**: Do not touch backend validation first. Fix the frontend payload serialization!`;
  }

  if (q.includes("which files") || q.includes("what files") || q.includes("files should i modify") || q.includes("where do i start")) {
    return `You should modify these files in order:
1. \`src/components/RegistrationForm.tsx\` (Priority 1): Add payload normalization before dispatching the POST request.
2. \`src/lib/validation/payload-normalizer.ts\` (Priority 1): Create a reusable helper to strip null/undefined values into empty strings.
3. \`src/services/registration.service.ts\` (Priority 2): Verify that Zod's \`.nullable().transform()\` cleanly accepts transformed strings.
4. \`tests/e2e/registration.spec.ts\` (Priority 3): Add regression test cases for empty optional inputs.`;
  }

  if (q.includes("who worked on this") || q.includes("who has context") || q.includes("author")) {
    return `Three engineers have relevant context:
- **Rahul Verma** (Senior Backend Engineer): Author of PR #142 (backend validation) and active in #backend Slack discussions.
- **Elena Rostova** (Senior Frontend Engineer): Author of PR #151 (RegistrationForm UI refactor).
- **Marcus Brody** (DevOps / Reliability Lead): Analyzed Sentry error drops and investigated the PostgreSQL database defaults.
- **Priya Sharma** (Tech Lead): Outlined the dual-layer validation policy in #backend.`;
  }

  if (q.includes("what could break") || q.includes("risk") || q.includes("break")) {
    return `Primary risks identified:
- **API Contract Drift**: If you change the backend schema to be too lenient, third-party mobile clients might submit unexpected types. Maintain defensive validation.
- **Form State Flashing**: Modifying React Hook Form defaults without proper memoization can trigger unnecessary re-renders in RegistrationForm.tsx.
- **High-Volume Event Tonight**: 400 volunteers are scheduled to register for tomorrow's Marathon Clean-up; untested changes risk blocking signups during peak traffic.`;
  }

  if (q.includes("slack") || q.includes("discussion") || q.includes("team say")) {
    return `In **#backend**, Rahul highlighted: *"Registration API is still receiving null values from the UI for dietaryPreferences and emergencyContact."*
    
Priya replied: *"Backend validation in PR #142 catches it, but we should probably fix the source."*
    
And Yashas noted: *"I'll check the registration form payload in RegistrationForm.tsx. React Hook Form is doing an Object.assign on dirty fields."*
    
The team agreed on a dual-layer policy: keep backend validation defensive, but sanitize the client payload before submission.`;
  }

  if (q.includes("summarize") || q.includes("30 second") || q.includes("tldr")) {
    return `**30-Second Briefing**:
- **Issue**: Volunteer registrations intermittently fail with 400/500 errors when optional fields are empty.
- **Root Cause**: Frontend submits \`null\` instead of empty strings for unentered inputs.
- **Past Work**: PR #142 strengthened backend validation; PR #151 styled the form; neither sanitized the outbound payload.
- **Fix**: Normalize the payload in \`RegistrationForm.tsx\` before POST dispatch and keep backend validation as a safety net.`;
  }

  if (q.includes("why is this file relevant") || q.includes("registrationform.tsx")) {
    return `\`RegistrationForm.tsx\` is relevant because it is the exact component that captures user inputs and submits the payload to \`/api/registrations\`. Currently, unentered optional fields are serialized as explicit \`null\`s, which violates the backend's non-null expectations. Sanitizing data here resolves the root problem.`;
  }

  if (q.includes("registration.service.ts")) {
    return `\`src/services/registration.service.ts\` houses the backend business logic and Zod schema. PR #142 added strict validation here, which started throwing 400 errors when frontend sends nulls. It needs to remain defensive without crashing legitimate submissions.`;
  }

  // Default context-aware answer
  return `Based on task **${context.taskId}**: ${context.heroSummary}

The recommended action is to inspect \`${context.files[0]?.name || "the primary component"}\`, sanitize optional fields before HTTP submission, and maintain server-side validation. Feel free to ask about previous PRs, Slack threads, or the implementation plan!`;
}

/**
 * Generates dynamic fallback context for other tasks in the system
 */
function generateFallbackContext(task: EngineeringTask): ReconstructedContext {
  return {
    taskId: task.id,
    taskTitle: task.title,
    confidenceScore: 88,
    signalsFound: task.signalsCount,
    sourcesAnalyzed: task.sourcesCount,
    lastActivity: task.updatedAt,
    heroSummary: `${task.description} Related changes involve the ${task.domain.toLowerCase()} architecture. Previous discussions on Slack recommend addressing the core interface before deploying patches.`,
    crossSourceInsight: `Cross-source analysis indicates that previous patches addressed peripheral symptoms while the underlying configuration in ${task.domain} needs systematic stabilization.`,
    whatChanged: [
      {
        type: "modified",
        text: `Configuration touched in recent sprint for ${task.domain}`,
        source: "GitHub / Commits",
      },
      {
        type: "added",
        text: `Error logging telemetry added to trace ${task.slug}`,
        source: "Slack / #incidents",
      },
      {
        type: "alert",
        text: `High latency or intermittent failures reported by automated monitors`,
        source: "Confluence / Runbook",
      },
    ],
    timeline: [
      {
        id: "t1",
        date: "2 days ago",
        type: "jira",
        title: `Task logged: ${task.id}`,
        description: task.description,
        author: task.reporter,
      },
      {
        id: "t2",
        date: "Yesterday",
        type: "slack",
        title: `Discussion in #${task.domain.toLowerCase()}`,
        description: `Team evaluated potential mitigations and identified dependency impact.`,
        author: task.assignee,
      },
      {
        id: "t3",
        date: "Today",
        type: "decision",
        title: "Recommended architectural path",
        description: `Execute focused fix and verify integration tests.`,
        author: "ContextIQ Engine",
      },
    ],
    files: MOCK_FILES.slice(2, 6),
    pullRequests: MOCK_PRS.slice(3, 6),
    slackMessages: MOCK_SLACK_MESSAGES.slice(4, 9),
    decisions: MOCK_DECISIONS.slice(2, 5),
    previousAttempts: [
      {
        attemptNumber: 1,
        approach: "Direct configuration tweak",
        layer: task.domain,
        result: "Incomplete",
        details: "Adjusted parameters in local dev environment without end-to-end regression validation.",
        whyItFailed: "Did not replicate high load behavior observed in production cluster.",
      },
    ],
    aiInterpretation: `Investigation reveals that earlier efforts did not account for cross-service payload serialization. Stabilization requires updating service contracts.`,
    recommendedNextSteps: [
      `Review current service contracts in ${task.domain}`,
      `Verify error logs and recent commit diffs`,
      `Implement targeted fix with unit test coverage`,
      `Deploy to staging and verify telemetry`,
    ],
    contextSources: {
      jiraCount: 3,
      githubCount: 4,
      slackCount: 5,
      confluenceCount: 1,
      codebaseCount: 6,
    },
    implementationPlan: {
      taskId: task.id,
      filesToModify: [
        {
          path: `src/services/${task.slug}.service.ts`,
          action: "Modify",
          description: "Update core handling logic and parameter sanitation.",
        },
      ],
      apiImpact: "Low",
      databaseImpact: "None",
      risk: "Medium",
      estimatedEffort: "2–3 hours",
      testsRequired: 4,
      edgeCases: ["Network timeout", "Concurrency race condition", "Invalid payload"],
      steps: [
        {
          stepNumber: 1,
          title: "Audit existing implementation",
          description: "Inspect recent git blame and related pull requests.",
        },
        {
          stepNumber: 2,
          title: "Apply fix",
          description: "Implement defensive boundaries and validate against edge cases.",
        },
      ],
    },
  };
}

