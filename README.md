# ContextIQ — AI Context Switcher for Engineers

> **"Get the context. Start building."**  
> *Your AI engineering context layer connecting Jira, GitHub, Slack, documentation, and code.*

---

## 🚀 Overview

**ContextIQ** is an enterprise developer tool designed to eliminate the daily cognitive tax of context switching. 

When an engineer picks up a task, reviews an incident, or onboards onto a feature, they typically spend 30–60 minutes hunting across:
- **Jira & Linear tickets** to understand the reported bug
- **GitHub PRs & git blame** to see who touched the code recently
- **Slack & Teams threads** to find architectural decisions that never made it to documentation
- **Post-mortems & Confluence RFCs** to avoid repeating past mistakes
- **Source code & schemas** to identify the affected files

**ContextIQ reconstructs the full engineering story in seconds.** Instead of giving you a generic chatbot or a list of search links, ContextIQ synthesizes cross-source signals to answer:

> **"What do I actually need to know before I start building?"**

---

## 🎯 The Core Demo Scenario: "Volunteer Hub"

The prototype is pre-seeded with a complete, interconnected engineering ecosystem called **Volunteer Hub** (a production platform for community volunteers, event check-ins, and certifications).

### Featured Task: `VOL-142` — "Fix volunteer registration bug"

1. **The Problem**: Volunteers intermittently encounter 500 crashes and 400 Bad Request drops when submitting registration forms.
2. **The Dispersed Clues**:
   - **GitHub PR #142**: Rahul added server-side Zod validation in `registration.service.ts` to reject null fields. *(Result: reduced crashes, but users still couldn't register)*.
   - **GitHub PR #151**: Elena refactored the UI in `RegistrationForm.tsx` using React Hook Form, but form reset converted blank optional fields into explicit `null` values.
   - **Slack #backend**: Rahul and Priya discussed that the frontend payload is still sending explicit `null`s, and Priya established the policy: *"Keep defensive server validation, but fix the source."*
   - **Commit b789012**: Marcus added default empty strings in PostgreSQL, but Prisma runtime schema checks reject `null` before the database default triggers.
3. **The AI Cross-Source Synthesis ("The Wow Moment")**:
   > *"Three different sources point to the same issue: previous work focused on backend validation (PR #142) and UI layout styling (PR #151), while the true root cause remains in the frontend payload serialization in `RegistrationForm.tsx`. **Do not start by changing backend validation. Start with RegistrationForm.tsx.**"*

---

## ✨ Key Features

| Feature | Description |
| :--- | :--- |
| **Multi-Stage Reconstruction Pipeline** | Live animated intelligence pipeline showing scanning, correlating, reading Slack, mapping files, and detecting previous attempts. |
| **Hero Engineering Brief** | High-contrast synthesized brief with Confidence Score (92%), Related Signals (12), and Last Activity tracker. |
| **AI Cross-Source Insight** | Differentiator badge proving that the AI is synthesizing disparate tools rather than merely aggregating search hits. |
| **"What has already been tried?"** | Surfaces past engineer attempts (Backend validation, Form refactor, DB defaults) with exact reasons why they failed, preventing dead ends. |
| **Actionable Next Steps & Plan Generator** | Step-by-step checklist plus a one-click modal generating files to modify, API/DB impact, risk level, estimated effort, and 5 edge cases to test. |
| **Interactive Engineering Timeline** | Chronological timeline with distinctive icons for Jira, GitHub PRs, Slack threads, Git commits, and Architectural Decisions. |
| **In-Context AI Assistant ("Ask ContextIQ")** | Floating & slide-out assistant pre-loaded with engineering prompts (*"Why is this bug happening?"*, *"What could break?"*, *"Show Slack discussion"*). |
| **Related Files & Code Preview** | Interactive file cards with language badges, instant code viewer, and contextual *"Ask AI"* triggers. |
| **Slack Decision Extraction** | Highlights key threads and displays *"AI extracted 3 relevant decisions"*. |
| **Global Multi-Signal Search** | Search across Tasks, PRs, Slack, Files, and Docs with faceted filtering (try searching `"registration null"`). |
| **Presentation Mode (Hackathon Mode)** | One-click button in the top bar that collapses sidebars and expands the context layer to full width for pitch presentations. |
| **Zero-Configuration Offline Mode** | Works immediately with deterministic mock AI or integrates with OpenAI via `OPENAI_API_KEY`. |

---

## 🛠️ Tech Stack

- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript 5+
- **Styling**: Tailwind CSS (Dark enterprise developer-tool palette)
- **Icons**: Lucide React
- **State & Persistence**: React Hooks + Browser `localStorage`
- **AI Abstraction**: `lib/ai/context-engine.ts` with dual-mode support (OpenAI `gpt-4o-mini` or Deterministic Mock AI fallback)
- **Database**: Zero external database required! Completely self-contained.

---

## 🏃 How to Run Locally

### Prerequisites
- Node.js 18+ (tested on Node v20 / v24)
- npm or pnpm or yarn

### 1. Clone & Install
```bash
git clone <repo-url>
cd "ai hackathon"
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build
```bash
npm run build
npm run start
```

---

## 🔑 Optional OpenAI Configuration

ContextIQ is 100% functional out-of-the-box without an API key using high-fidelity deterministic responses.

To connect real OpenAI LLM inference:
1. Create a `.env.local` file in the project root:
   ```env
   OPENAI_API_KEY=sk-proj-your-openai-key-here
   ```
2. Or configure it directly inside the app under **Settings** (`/settings`), where it will be saved securely to your browser's local storage.

---

## 🎬 3-Minute Hackathon Demo Script

1. **The Problem Hook (0:00 - 0:30)**:
   - Start on `/dashboard`. Point out the greeting: *"Good afternoon, Yashas"*.
   - Explain: *"Engineers waste up to an hour gathering context whenever they switch tasks. Here on our dashboard, we see 8 tasks across the Volunteer Hub platform."*
2. **The Reconstruction "Wow Moment" (0:30 - 1:15)**:
   - Click **"Load Demo Scenario"** in the top bar or click **[Reconstruct Context]** on `VOL-142`.
   - Watch the animated 6-stage AI intelligence pipeline correlate signals across Jira, GitHub, Slack, and code.
   - Reveal the header: *"12 signals found across 5 sources"*.
3. **Cross-Source AI Synthesis (1:15 - 2:00)**:
   - Show the **Hero Summary** and the **AI Cross-Source Insight**:
     > *"Notice that ContextIQ doesn't just link to PRs. It tells us: Previous engineers already tried backend validation in PR #142 and UI styling in PR #151. The real root cause is in `RegistrationForm.tsx`."*
   - Scroll through **"What has already been tried?"** to show the 3 failed approaches and the explicit AI interpretation.
4. **Actionable Implementation Plan (2:00 - 2:30)**:
   - Click **[Create Implementation Plan]**.
   - Show the generated engineering spec: Files to modify, API Impact (Low), Risk (Medium), 1–2 hours effort, and Edge Cases.
5. **Grounded AI Assistant & Search (2:30 - 3:00)**:
   - Click **[Ask ContextIQ]** or click prompt chip *"Why is this bug happening?"*. Show how the assistant answers within the exact codebase context.
   - Jump to `/search` to demonstrate global indexing of Slack, PRs, and files with the query `"registration null"`.
   - Toggle **"Presentation Mode"** in the top nav to show the focused pitch mode.

---

## 📂 Project Structure

```
ai hackathon/
├── app/
│   ├── layout.tsx                # Enterprise dark root layout & AppShell
│   ├── page.tsx                  # Root redirect to dashboard
│   ├── globals.css               # Developer dark theme tokens & scrollbar
│   ├── dashboard/
│   │   └── page.tsx              # Overview, greeting, stat cards, task feed
│   ├── context/
│   │   └── [taskId]/
│   │       └── page.tsx          # Main context reconstruction view
│   ├── search/
│   │   └── page.tsx              # Multi-signal global search with tabs
│   ├── integrations/
│   │   └── page.tsx              # Enterprise bridges (GitHub, Slack, Jira, etc.)
│   ├── settings/
│   │   └── page.tsx              # AI engine configuration & demo reset
│   └── api/
│       ├── reconstruct/route.ts  # Staged context API
│       └── chat/route.ts         # In-context grounded Q&A endpoint
├── components/
│   ├── layout/
│   │   ├── AppShell.tsx          # Responsive app shell with presentation mode
│   │   ├── Sidebar.tsx           # Enterprise sidebar with live tool indicators
│   │   ├── TopNav.tsx            # Project indicator, search bar, demo buttons
│   │   └── PresentationBanner.tsx # Live hackathon mode status banner
│   ├── dashboard/
│   │   ├── StatCard.tsx          # Metric cards
│   │   ├── TaskCard.tsx          # Task card with [Reconstruct Context]
│   │   ├── OnboardingBanner.tsx  # Welcome banner with quick demo link
│   │   └── RecentActivity.tsx    # Live engineering signals stream
│   ├── context/
│   │   ├── ContextHeader.tsx     # Title, tags, [Reconstruct], [Ask AI], [Share]
│   │   ├── ReconstructionLoader.tsx # Animated 6-stage intelligence pipeline
│   │   ├── HeroSummary.tsx       # "Here's what you need to know", confidence metrics
│   │   ├── CrossSourceInsight.tsx # Cross-source reasoning differentiator
│   │   ├── EngineeringTimeline.tsx # Vertical timeline with Jira/PR/Slack icons
│   │   ├── WhatChanged.tsx       # Diff-style (+ / -) delta highlights
│   │   ├── RelatedFiles.tsx      # Code files with [Open] and [Ask AI]
│   │   ├── FileViewerModal.tsx   # Code viewer modal
│   │   ├── RelatedPRs.tsx        # PR cards with status & AI relevance scores
│   │   ├── SlackContext.tsx      # Realistic chat threads & decision extraction
│   │   ├── EngineeringDecisions.tsx # Architectural decisions & rationales
│   │   ├── PreviousAttempts.tsx  # Approaches tried, results & AI interpretation
│   │   ├── RecommendedNextStep.tsx # Sequence checklist & plan CTA
│   │   ├── ImplementationPlanModal.tsx # Full scoped engineering spec modal
│   │   └── ContextSourcesPanel.tsx # Expandable source signal counts
│   └── assistant/
│       └── AskContextIQDrawer.tsx # In-context grounded engineering AI drawer
├── lib/
│   ├── ai/
│   │   └── context-engine.ts     # AI abstraction (OpenAI + mock fallback)
│   ├── mock-data/
│   │   └── volunteer-hub.ts      # Seeded dataset (8 tasks, 10 PRs, 15 Slack msgs)
│   └── utils.ts                  # Styling and formatting utilities
└── types/
    └── index.ts                  # Comprehensive TypeScript interfaces
```

---

## 🔮 Future Improvements

- **Real OAuth Webhooks**: Connect direct GitHub App, Slack Enterprise Grid, and Jira Software webhooks with granular permission scopes.
- **AST Code Call-Graph Tracing**: Parse TypeScript and Prisma ASTs to calculate call-graph impact radius automatically.
- **IDE Extensions**: VS Code and JetBrains sidebars to show ContextIQ briefs directly inside the editor before an engineer begins writing code.
- **Automated Pull Request Review Bot**: Compare new pull requests against past decisions and previous attempts automatically on GitHub.

---

## 📄 License

MIT License. Built for the AI Engineering Hackathon.

