import {
  EngineeringTask,
  PullRequest,
  SlackMessage,
  CodeFile,
  Commit,
  EngineeringDecision,
  DocEntry,
  ReconstructedContext,
  IntegrationStatus,
} from "@/types";

export const MOCK_TASKS: EngineeringTask[] = [
  {
    id: "VOL-142",
    slug: "fix-volunteer-registration-bug",
    title: "Fix volunteer registration bug",
    domain: "Backend",
    priority: "High",
    status: "In Progress",
    reporter: "Priya Sharma",
    assignee: "Yashas",
    assigneeAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    updatedAt: "22 min ago",
    description: "Volunteers intermittently receive error 500 or validation drops when submitting registration forms with optional emergency contact and dietary preference fields left blank.",
    signalsCount: 12,
    sourcesCount: 5,
  },
  {
    id: "VOL-143",
    slug: "add-event-certificate-generation",
    title: "Add event certificate generation",
    domain: "Frontend",
    priority: "Medium",
    status: "To Do",
    reporter: "Rahul Verma",
    assignee: "Elena Rostova",
    assigneeAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    updatedAt: "1 hour ago",
    description: "Automate PDF certificate generation for volunteers who complete >= 10 service hours using serverless canvas rasterization.",
    signalsCount: 7,
    sourcesCount: 3,
  },
  {
    id: "VOL-144",
    slug: "investigate-prisma-connection-issue",
    title: "Investigate Prisma connection issue",
    domain: "Infrastructure",
    priority: "High",
    status: "In Progress",
    reporter: "Marcus Brody",
    assignee: "Yashas",
    assigneeAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    updatedAt: "3 hours ago",
    description: "Production database connection pool exhaustion occurring during Friday peak volunteer check-ins at 18:00 UTC.",
    signalsCount: 9,
    sourcesCount: 4,
  },
  {
    id: "VOL-145",
    slug: "stripe-webhook-signature-validation",
    title: "Stripe webhook signature validation failing",
    domain: "Payments",
    priority: "Critical",
    status: "In Progress",
    reporter: "Sarah Lin",
    assignee: "Rahul Verma",
    assigneeAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    updatedAt: "5 hours ago",
    description: "Donation reconciliation fails when raw body buffer is altered by Express bodyParser JSON middleware before Stripe HMAC signature check.",
    signalsCount: 11,
    sourcesCount: 4,
  },
  {
    id: "VOL-146",
    slug: "implement-background-check-webhook",
    title: "Implement volunteer background check status webhook",
    domain: "Security",
    priority: "Medium",
    status: "To Do",
    reporter: "Elena Rostova",
    assignee: "Priya Sharma",
    assigneeAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
    updatedAt: "Yesterday",
    description: "Integrate Checkr API webhooks to update VolunteerProfile.verificationStatus automatically upon clear or flagged records.",
    signalsCount: 6,
    sourcesCount: 3,
  },
  {
    id: "VOL-147",
    slug: "shift-cancellation-notification",
    title: "Add shift cancellation notification via SendGrid",
    domain: "Backend",
    priority: "Medium",
    status: "In Review",
    reporter: "Priya Sharma",
    assignee: "Marcus Brody",
    assigneeAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
    updatedAt: "Yesterday",
    description: "When an event coordinator cancels a volunteer shift with < 24h notice, trigger urgent SMS and SendGrid dynamic email alerts.",
    signalsCount: 8,
    sourcesCount: 4,
  },
  {
    id: "VOL-148",
    slug: "optimize-volunteer-search-query",
    title: "Optimize volunteer search query indexing on PostgreSQL",
    domain: "Database",
    priority: "Low",
    status: "To Do",
    reporter: "Marcus Brody",
    assignee: "Yashas",
    assigneeAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    updatedAt: "2 days ago",
    description: "Full-text search on volunteer skills table takes 1.4s on 85k records; needs GIN trgm index on name and skills tags.",
    signalsCount: 5,
    sourcesCount: 2,
  },
  {
    id: "VOL-149",
    slug: "migrate-auth-session-tokens",
    title: "Migrate auth session tokens from JWT cookies to Redis",
    domain: "Security",
    priority: "High",
    status: "In Progress",
    reporter: "Rahul Verma",
    assignee: "Elena Rostova",
    assigneeAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    updatedAt: "3 days ago",
    description: "Eliminate unrevokable JWT tokens in favor of Redis-backed opaque session IDs for immediate coordinator de-provisioning.",
    signalsCount: 14,
    sourcesCount: 5,
  },
];

export const MOCK_PRS: PullRequest[] = [
  {
    id: "PR #142",
    number: 142,
    title: "Add backend registration validation",
    status: "merged",
    author: "Rahul Verma",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    date: "Aug 26, 2026",
    filesChanged: 3,
    aiRelevance: 94,
    relevanceExplanation: "Directly touched registration.service.ts and added Zod schema checks for nullable values. Result was only partial improvement.",
    url: "https://github.com/volunteerhub/volunteer-platform/pull/142",
    diffSummary: "+58 -12 in backend validation middleware",
  },
  {
    id: "PR #151",
    number: 151,
    title: "Refactor registration form UI",
    status: "merged",
    author: "Elena Rostova",
    authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    date: "Aug 27, 2026",
    filesChanged: 4,
    aiRelevance: 89,
    relevanceExplanation: "Refactored React Hook Form fields in RegistrationForm.tsx; accidentally retained empty string conversions into null objects.",
    url: "https://github.com/volunteerhub/volunteer-platform/pull/151",
    diffSummary: "+142 -98 in RegistrationForm component and styling",
  },
  {
    id: "PR #157",
    number: 157,
    title: "Fix event registration payload normalization",
    status: "open",
    author: "Yashas",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    date: "Today",
    filesChanged: 2,
    aiRelevance: 98,
    relevanceExplanation: "WIP PR proposing payload sanitize and payload normalization before dispatching HTTP POST /api/registrations.",
    url: "https://github.com/volunteerhub/volunteer-platform/pull/157",
    diffSummary: "+24 -6 in RegistrationForm.tsx submission handler",
  },
  {
    id: "PR #138",
    number: 138,
    title: "Add Prisma connection pooling timeout handler",
    status: "merged",
    author: "Marcus Brody",
    authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
    date: "Sep 1, 2026",
    filesChanged: 2,
    aiRelevance: 42,
    relevanceExplanation: "Infrastructure patch adjusting PgBouncer max clients.",
    url: "https://github.com/volunteerhub/volunteer-platform/pull/138",
    diffSummary: "+15 -4 in prisma client instantiation",
  },
  {
    id: "PR #135",
    number: 135,
    title: "Update volunteer role permissions in auth middleware",
    status: "merged",
    author: "Priya Sharma",
    authorAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
    date: "Aug 22, 2026",
    filesChanged: 5,
    aiRelevance: 67,
    relevanceExplanation: "Touched auth guards on registrations routes.",
    url: "https://github.com/volunteerhub/volunteer-platform/pull/135",
    diffSummary: "+45 -18 in auth.middleware.ts",
  },
  {
    id: "PR #129",
    number: 129,
    title: "Support guest volunteer checkouts without prior accounts",
    status: "merged",
    author: "Rahul Verma",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    date: "Aug 15, 2026",
    filesChanged: 7,
    aiRelevance: 78,
    relevanceExplanation: "Introduced nullable user_id foreign keys which exacerbated registration null payload errors.",
    url: "https://github.com/volunteerhub/volunteer-platform/pull/129",
    diffSummary: "+210 -45 across registration controllers",
  },
  {
    id: "PR #122",
    number: 122,
    title: "Add SendGrid dynamic email templates for confirmations",
    status: "merged",
    author: "Elena Rostova",
    authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    date: "Aug 10, 2026",
    filesChanged: 3,
    aiRelevance: 31,
    relevanceExplanation: "Email dispatch invoked after successful registration transaction.",
    url: "https://github.com/volunteerhub/volunteer-platform/pull/122",
    diffSummary: "+80 -10 in notifications.service.ts",
  },
  {
    id: "PR #119",
    number: 119,
    title: "Add database constraints for event capacity limits",
    status: "merged",
    author: "Marcus Brody",
    authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
    date: "Aug 04, 2026",
    filesChanged: 2,
    aiRelevance: 54,
    relevanceExplanation: "Enforces max attendees check inside registrations transaction.",
    url: "https://github.com/volunteerhub/volunteer-platform/pull/119",
    diffSummary: "+34 -8 in migrations and schema.prisma",
  },
  {
    id: "PR #114",
    number: 114,
    title: "Implement volunteer badge QR code scanner on mobile web",
    status: "merged",
    author: "Elena Rostova",
    authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    date: "Jul 28, 2026",
    filesChanged: 6,
    aiRelevance: 20,
    relevanceExplanation: "Mobile frontend feature unrelated to registration bug.",
    url: "https://github.com/volunteerhub/volunteer-platform/pull/114",
    diffSummary: "+120 -35 in mobile scanner views",
  },
  {
    id: "PR #108",
    number: 108,
    title: "Initial migration to Next.js 15 App Router",
    status: "merged",
    author: "Rahul Verma",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    date: "Jul 15, 2026",
    filesChanged: 34,
    aiRelevance: 35,
    relevanceExplanation: "Core framework upgrade.",
    url: "https://github.com/volunteerhub/volunteer-platform/pull/108",
    diffSummary: "+940 -820 architectural migration",
  },
];

export const MOCK_SLACK_MESSAGES: SlackMessage[] = [
  {
    id: "slack-1",
    channel: "#backend",
    author: "Rahul Verma",
    authorRole: "Senior Backend Engineer",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    timestamp: "Aug 25, 2:14 PM",
    content: "Registration API is still receiving null values from the UI for dietaryPreferences and emergencyContact phone fields. Sentry is pinging 500s because Prisma rejects null where strings are expected.",
    isKeyInsight: true,
    decisionExtracted: "Backend schema currently enforces non-null strings on nested registration contact records.",
  },
  {
    id: "slack-2",
    channel: "#backend",
    author: "Priya Sharma",
    authorRole: "Tech Lead",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
    timestamp: "Aug 25, 2:18 PM",
    content: "Backend validation in PR #142 catches it, but we should probably fix the source. If the frontend submits empty strings as explicit nulls, our DTO validation throws a 400 Bad Request instead of cleanly treating it as an empty optional.",
    isKeyInsight: true,
    decisionExtracted: "Keep defensive backend validation, but sanitize incoming payload to convert null/undefined to empty strings.",
  },
  {
    id: "slack-3",
    channel: "#backend",
    author: "Yashas",
    authorRole: "Staff Full-Stack Engineer",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    timestamp: "Aug 26, 9:30 AM",
    content: "I'll check the registration form payload in RegistrationForm.tsx. React Hook Form is doing an Object.assign on dirty fields, which serializes untouched optional inputs as null when resetting the form.",
    isKeyInsight: true,
    decisionExtracted: "Root cause isolated to RegistrationForm.tsx serialization logic before HTTP dispatch.",
  },
  {
    id: "slack-4",
    channel: "#frontend",
    author: "Elena Rostova",
    authorRole: "Senior Frontend Engineer",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    timestamp: "Aug 27, 4:45 PM",
    content: "I merged PR #151 to clean up the form layout, but I noticed the volunteer payload helper still doesn't strip null values before sending to /api/registrations. We need a payload normalizer step.",
    isKeyInsight: true,
  },
  {
    id: "slack-5",
    channel: "#incidents",
    author: "Marcus Brody",
    authorRole: "DevOps / Reliability Lead",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
    timestamp: "Aug 28, 11:15 AM",
    content: "Sentry alert resolved count dropped by 65% after PR #142, but 35% of registrations for 'City Food Drive' still failed this morning. High priority for Yashas to close the loop on the frontend.",
    isKeyInsight: true,
  },
  {
    id: "slack-6",
    channel: "#backend",
    author: "Rahul Verma",
    authorRole: "Senior Backend Engineer",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    timestamp: "Aug 28, 1:20 PM",
    content: "Also don't remove the backend Zod validation when you fix the UI. We need dual-layer validation for third-party mobile clients using the direct REST endpoint.",
    isKeyInsight: true,
    decisionExtracted: "Dual-layer validation policy: Always maintain server-side schema guards even with frontend sanitation.",
  },
  {
    id: "slack-7",
    channel: "#backend",
    author: "Priya Sharma",
    authorRole: "Tech Lead",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
    timestamp: "Yesterday, 3:10 PM",
    content: "Make sure we add automated Jest/Playwright tests covering null payloads, missing event IDs, and duplicate submissions. We don't have regression tests for empty optional fields.",
    isKeyInsight: true,
  },
  {
    id: "slack-8",
    channel: "#dev-general",
    author: "Sarah Lin",
    authorRole: "Product Manager",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80",
    timestamp: "Yesterday, 5:00 PM",
    content: "We have 400 volunteers signing up for the weekend Marathon Clean-up starting tomorrow morning. Let's make sure VOL-142 is patched and verified in staging by today 6 PM.",
    isKeyInsight: false,
  },
  {
    id: "slack-9",
    channel: "#infrastructure",
    author: "Marcus Brody",
    authorRole: "DevOps / Reliability Lead",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
    timestamp: "Sep 2, 10:00 AM",
    content: "Prisma connection pool metrics show pgBouncer client limit reached 98% during Friday registrations batching. Check VOL-144 if you see DB timeout errors.",
    isKeyInsight: false,
  },
  {
    id: "slack-10",
    channel: "#frontend",
    author: "Elena Rostova",
    authorRole: "Senior Frontend Engineer",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    timestamp: "Sep 3, 2:30 PM",
    content: "Tailwind 3.4 update is merged on main. Make sure to rebase your feature branches.",
    isKeyInsight: false,
  },
  {
    id: "slack-11",
    channel: "#backend",
    author: "Rahul Verma",
    authorRole: "Senior Backend Engineer",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    timestamp: "Sep 4, 11:40 AM",
    content: "Redis session store config is up in staging for review under VOL-149.",
    isKeyInsight: false,
  },
  {
    id: "slack-12",
    channel: "#incidents",
    author: "Priya Sharma",
    authorRole: "Tech Lead",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
    timestamp: "Sep 5, 9:15 AM",
    content: "Incident retro for last week's registration drops has been documented in Confluence.",
    isKeyInsight: false,
  },
  {
    id: "slack-13",
    channel: "#backend",
    author: "Yashas",
    authorRole: "Staff Full-Stack Engineer",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    timestamp: "Today, 10:00 AM",
    content: "Opening PR #157 for volunteer registration payload normalization. Will test against staging API.",
    isKeyInsight: true,
  },
  {
    id: "slack-14",
    channel: "#frontend",
    author: "Elena Rostova",
    authorRole: "Senior Frontend Engineer",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    timestamp: "Today, 10:30 AM",
    content: "Awesome, I can QA the RegistrationForm component as soon as you have preview deployment ready.",
    isKeyInsight: false,
  },
  {
    id: "slack-15",
    channel: "#backend",
    author: "Priya Sharma",
    authorRole: "Tech Lead",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
    timestamp: "Today, 10:45 AM",
    content: "Looks great. Keep tests strict on empty strings vs omitted vs null fields.",
    isKeyInsight: true,
  },
];

export const MOCK_FILES: CodeFile[] = [
  {
    path: "src/components/RegistrationForm.tsx",
    name: "RegistrationForm.tsx",
    language: "tsx",
    layer: "Frontend",
    changedAt: "Changed 2 days ago",
    changesCount: 42,
    summary: "Renders the volunteer signup multi-step form. Serializes form values using react-hook-form.",
    relevance: "Primary source of payload bug. Submits explicit null for optional fields (dietaryPreferences, emergencyContact).",
    codeSnippet: `// src/components/RegistrationForm.tsx
export function RegistrationForm({ eventId }: { eventId: string }) {
  const { register, handleSubmit } = useForm<RegistrationPayload>({
    defaultValues: {
      eventId,
      volunteerName: "",
      email: "",
      dietaryPreferences: null, // <-- ROOT CAUSE: should default to undefined or sanitized string
      emergencyContact: null,   // <-- ROOT CAUSE: sends null to backend
    }
  });

  const onSubmit = async (data: RegistrationPayload) => {
    // Current flawed submission:
    // Raw data sends: { dietaryPreferences: null, emergencyContact: null }
    // FIX: Normalize payload before dispatch
    const normalized = normalizeRegistrationPayload(data);
    await api.post("/api/registrations", normalized);
  };
}`,
  },
  {
    path: "src/services/registration.service.ts",
    name: "registration.service.ts",
    language: "typescript",
    layer: "Backend",
    changedAt: "Changed 1 day ago",
    changesCount: 28,
    summary: "Business logic for validating capacity, creating volunteer records, and triggering email confirmation.",
    relevance: "Contains server-side validation schema added in PR #142. Currently throws 400 when dietaryPreferences is null.",
    codeSnippet: `// src/services/registration.service.ts
import { z } from "zod";

export const RegistrationSchema = z.object({
  eventId: z.string().uuid(),
  volunteerName: z.string().min(2),
  email: z.string().email(),
  // PR #142 added this strict string validation:
  dietaryPreferences: z.string().nullable().transform(val => val ?? "").optional(),
  emergencyPhone: z.string().nullable().transform(val => val ?? "").optional(),
});

export async function createRegistration(input: z.infer<typeof RegistrationSchema>) {
  return await prisma.registration.create({
    data: {
      eventId: input.eventId,
      name: input.volunteerName,
      email: input.email,
      dietaryPreferences: input.dietaryPreferences ?? "",
      emergencyPhone: input.emergencyPhone ?? "",
    }
  });
}`,
  },
  {
    path: "src/controllers/registrations.controller.ts",
    name: "registrations.controller.ts",
    language: "typescript",
    layer: "Backend",
    changedAt: "Changed 1 day ago",
    changesCount: 15,
    summary: "HTTP handler for POST /api/registrations. Parses request body and handles status codes.",
    relevance: "Catches validation errors and returns 400 Bad Request with field validation array.",
    codeSnippet: `// src/controllers/registrations.controller.ts
export async function handleRegistration(req: Request, res: Response) {
  try {
    const validated = RegistrationSchema.parse(req.body);
    const result = await createRegistration(validated);
    return res.status(201).json({ success: true, registrationId: result.id });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Validation failed", details: error.errors });
    }
    return res.status(500).json({ error: "Internal server error" });
  }
}`,
  },
  {
    path: "src/routes/registrations.routes.ts",
    name: "registrations.routes.ts",
    language: "typescript",
    layer: "Backend",
    changedAt: "Changed 3 days ago",
    changesCount: 8,
    summary: "Express router configuring endpoint rate limiting and authentication middleware for registrations.",
    relevance: "Configures public route access for unauthenticated volunteer registrations.",
    codeSnippet: `// src/routes/registrations.routes.ts
import { Router } from "express";
import { rateLimiter } from "../middleware/rate-limiter";
import { handleRegistration } from "../controllers/registrations.controller";

export const registrationsRouter = Router();
registrationsRouter.post("/", rateLimiter({ max: 30, windowMs: 60000 }), handleRegistration);`,
  },
  {
    path: "src/lib/validation/payload-normalizer.ts",
    name: "payload-normalizer.ts",
    language: "typescript",
    layer: "Frontend",
    changedAt: "Changed today",
    changesCount: 19,
    summary: "Utility for stripping nulls and normalizing empty form values into clean API payloads.",
    relevance: "The proposed new utility file that prevents frontend null payload discrepancies.",
    codeSnippet: `// src/lib/validation/payload-normalizer.ts
export function normalizeRegistrationPayload<T extends Record<string, any>>(payload: T): T {
  const sanitized: Record<string, any> = {};
  for (const [key, value] of Object.entries(payload)) {
    if (value === null || value === undefined) {
      sanitized[key] = "";
    } else if (typeof value === "string") {
      sanitized[key] = value.trim();
    } else {
      sanitized[key] = value;
    }
  }
  return sanitized as T;
}`,
  },
  {
    path: "prisma/schema.prisma",
    name: "schema.prisma",
    language: "prisma",
    layer: "Database",
    changedAt: "Changed 4 days ago",
    changesCount: 12,
    summary: "Prisma schema defining Volunteer, Event, and Registration relational models.",
    relevance: "Defines database column types: dietaryPreferences String @default('')",
    codeSnippet: `model Registration {
  id                 String   @id @default(uuid())
  eventId            String
  event              Event    @relation(fields: [eventId], references: [id])
  name               String
  email              String
  dietaryPreferences String   @default("")
  emergencyPhone     String   @default("")
  createdAt          DateTime @default(now())

  @@index([eventId, email])
}`,
  },
  {
    path: "src/middleware/auth.middleware.ts",
    name: "auth.middleware.ts",
    language: "typescript",
    layer: "Backend",
    changedAt: "Changed 1 week ago",
    changesCount: 14,
    summary: "Session verification and role-based authorization guards.",
    relevance: "Allows guest registrations when Authorization header is absent.",
    codeSnippet: `// src/middleware/auth.middleware.ts
export function optionalAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return next();
  // verify JWT or session
  next();
}`,
  },
  {
    path: "src/services/notifications.service.ts",
    name: "notifications.service.ts",
    language: "typescript",
    layer: "Backend",
    changedAt: "Changed 2 weeks ago",
    changesCount: 22,
    summary: "SendGrid email dynamic template dispatcher.",
    relevance: "Fires confirmation emails when registration succeeds.",
    codeSnippet: `// src/services/notifications.service.ts
export async function sendRegistrationConfirmation(email: string, eventDetails: any) {
  return await sendgrid.send({
    to: email,
    from: "events@volunteerhub.org",
    templateId: "d-1839201923",
    dynamicTemplateData: eventDetails,
  });
}`,
  },
  {
    path: "src/types/registration.ts",
    name: "registration.ts",
    language: "typescript",
    layer: "Frontend",
    changedAt: "Changed 2 days ago",
    changesCount: 6,
    summary: "TypeScript interfaces for registration request & response contracts.",
    relevance: "RegistrationPayload interface type annotations.",
    codeSnippet: `export interface RegistrationPayload {
  eventId: string;
  volunteerName: string;
  email: string;
  dietaryPreferences?: string | null;
  emergencyContact?: string | null;
}`,
  },
  {
    path: "tests/e2e/registration.spec.ts",
    name: "registration.spec.ts",
    language: "typescript",
    layer: "Frontend",
    changedAt: "Changed 3 days ago",
    changesCount: 31,
    summary: "Playwright automated test suite for registration workflow.",
    relevance: "Needs regression test cases for empty/null optional inputs.",
    codeSnippet: `test("submits volunteer registration with empty optional fields", async ({ page }) => {
  await page.goto("/events/city-food-drive");
  await page.fill('input[name="volunteerName"]', "Jane Doe");
  await page.fill('input[name="email"]', "jane@example.com");
  // Leaves dietaryPreferences and emergencyContact blank
  await page.click('button[type="submit"]');
  await expect(page.locator(".success-toast")).toBeVisible();
});`,
  },
];

export const MOCK_COMMITS: Commit[] = [
  {
    hash: "abc1234",
    shortHash: "abc1234",
    message: "feat(backend): add strict Zod validation schema for registration DTO",
    author: "Rahul Verma",
    date: "Aug 26, 2026",
    files: ["src/services/registration.service.ts", "src/controllers/registrations.controller.ts"],
  },
  {
    hash: "def5678",
    shortHash: "def5678",
    message: "refactor(ui): update registration form layout and field styling",
    author: "Elena Rostova",
    date: "Aug 27, 2026",
    files: ["src/components/RegistrationForm.tsx"],
  },
  {
    hash: "f890123",
    shortHash: "f890123",
    message: "fix(backend): allow nullable transform on optional fields in service",
    author: "Rahul Verma",
    date: "Aug 28, 2026",
    files: ["src/services/registration.service.ts"],
  },
  {
    hash: "c456789",
    shortHash: "c456789",
    message: "wip(ui): add payload normalizer helper for registration form",
    author: "Yashas",
    date: "Today",
    files: ["src/lib/validation/payload-normalizer.ts", "src/components/RegistrationForm.tsx"],
  },
  {
    hash: "e321654",
    shortHash: "e321654",
    message: "test(e2e): add test case for empty optional inputs",
    author: "Yashas",
    date: "Today",
    files: ["tests/e2e/registration.spec.ts"],
  },
  {
    hash: "b789012",
    shortHash: "b789012",
    message: "chore(prisma): add default empty string to dietaryPreferences column",
    author: "Marcus Brody",
    date: "Aug 22, 2026",
    files: ["prisma/schema.prisma"],
  },
  {
    hash: "a987654",
    shortHash: "a987654",
    message: "perf(db): add compound index on [eventId, email] for registration lookups",
    author: "Marcus Brody",
    date: "Aug 18, 2026",
    files: ["prisma/schema.prisma"],
  },
  {
    hash: "d123789",
    shortHash: "d123789",
    message: "fix(routes): rate limit registrations to 30 requests per minute",
    author: "Rahul Verma",
    date: "Aug 12, 2026",
    files: ["src/routes/registrations.routes.ts"],
  },
];

export const MOCK_DECISIONS: EngineeringDecision[] = [
  {
    id: "DEC-1",
    title: "Keep backend validation even after frontend fix",
    reason: "Defensive API design: Third-party webhooks and mobile clients interact directly with the REST API, so server-side schema guards are non-negotiable.",
    date: "Aug 26, 2026",
    status: "Accepted",
    source: "RFC-42 / #backend",
  },
  {
    id: "DEC-2",
    title: "Normalize registration payload before submission",
    reason: "Frontend currently sends nullable fields. Normalizing strings on the client guarantees deterministic payloads across all browser implementations.",
    date: "Today",
    status: "Active",
    source: "PR #157 / #backend",
  },
  {
    id: "DEC-3",
    title: "Add regression tests for missing registration data",
    reason: "Prevent future regressions when form fields are expanded for corporate volunteer sponsor groups.",
    date: "Today",
    status: "Accepted",
    source: "Sprint Retro 18",
  },
  {
    id: "DEC-4",
    title: "Use PostgreSQL default empty strings instead of nullable SQL columns",
    reason: "Avoids three-state boolean/text logic in database queries and simplifies Prisma entity mapping.",
    date: "Aug 22, 2026",
    status: "Accepted",
    source: "DB Migration Review",
  },
  {
    id: "DEC-5",
    title: "Use Zod .transform() pipeline for inbound DTO sanitization",
    reason: "Transforms incoming nulls to fallback empty values safely before reaching business domain services.",
    date: "Aug 28, 2026",
    status: "Accepted",
    source: "Architecture WG",
  },
  {
    id: "DEC-6",
    title: "Enforce Playwright E2E tests before staging auto-promotion",
    reason: "Catches frontend/backend serialization mismatches before production releases.",
    date: "Sep 1, 2026",
    status: "Accepted",
    source: "CI/CD Policy",
  },
];

export const MOCK_DOCS: DocEntry[] = [
  {
    id: "DOC-1",
    title: "Volunteer Registration API Specification",
    system: "Confluence",
    lastUpdated: "Aug 26, 2026",
    excerpt: "Details the POST /api/registrations endpoint contract, accepted JSON schemas, rate limits, and expected HTTP response codes.",
    url: "https://confluence.volunteerhub.internal/wiki/registration-api-spec",
  },
  {
    id: "DOC-2",
    title: "Frontend Form Serialization Guidelines",
    system: "RFC",
    lastUpdated: "Aug 20, 2026",
    excerpt: "Best practices for React Hook Form integration: explicitly sanitize dirty state values and avoid sending null to REST endpoints.",
    url: "https://confluence.volunteerhub.internal/rfc/rfc-19-form-serialization",
  },
  {
    id: "DOC-3",
    title: "Incident Post-Mortem: Incident 84 (Registration Drop)",
    system: "Notion",
    lastUpdated: "Aug 28, 2026",
    excerpt: "Analysis of 120 failed volunteer signups caused by Prisma runtime exceptions when receiving null values for dietary preferences.",
    url: "https://notion.so/volunteerhub/incident-84-post-mortem",
  },
  {
    id: "DOC-4",
    title: "Database Schema & Prisma Migrations Runbook",
    system: "README",
    lastUpdated: "Sep 2, 2026",
    excerpt: "Guide to deploying database schema changes with zero downtime using pgBouncer connection pooling.",
    url: "https://github.com/volunteerhub/volunteer-platform/blob/main/docs/database-runbook.md",
  },
  {
    id: "DOC-5",
    title: "Notification Dispatch Service Architecture",
    system: "Confluence",
    lastUpdated: "Aug 12, 2026",
    excerpt: "Overview of SendGrid webhook callbacks, retry queues with exponential backoff, and idempotent event delivery.",
    url: "https://confluence.volunteerhub.internal/wiki/notifications-architecture",
  },
];

export const MOCK_INTEGRATIONS: IntegrationStatus[] = [
  {
    id: "github",
    name: "GitHub",
    category: "Source Control",
    iconName: "Github",
    status: "Connected",
    description: "Tracking pull requests, code commits, branch diffs, and repository metadata.",
    lastSync: "3 min ago",
    signalsCount: 5,
  },
  {
    id: "slack",
    name: "Slack",
    category: "Communication",
    iconName: "MessageSquare",
    status: "Connected",
    description: "Syncing engineering channels (#backend, #frontend, #incidents) and decision threads.",
    lastSync: "Just now",
    signalsCount: 7,
  },
  {
    id: "jira",
    name: "Jira",
    category: "Issue Tracking",
    iconName: "Trello",
    status: "Connected",
    description: "Syncing active sprint backlog, bug tickets, and velocity trackers.",
    lastSync: "12 min ago",
    signalsCount: 4,
  },
  {
    id: "confluence",
    name: "Confluence",
    category: "Knowledge Base",
    iconName: "BookOpen",
    status: "Connected",
    description: "Indexing architectural RFCs, API specifications, and incident post-mortems.",
    lastSync: "1 hour ago",
    signalsCount: 2,
  },
  {
    id: "linear",
    name: "Linear",
    category: "Issue Tracking",
    iconName: "CheckSquare",
    status: "Available",
    description: "Fast issue tracking for modern product development teams.",
    signalsCount: 0,
  },
  {
    id: "figma",
    name: "Figma",
    category: "Design",
    iconName: "Figma",
    status: "Available",
    description: "Component design tokens, UI specifications, and user flow wireframes.",
    signalsCount: 0,
  },
];

// Reconstructed context specifically for VOL-142 (The primary demo scenario)
export const VOL_142_CONTEXT: ReconstructedContext = {
  taskId: "VOL-142",
  taskTitle: "Fix volunteer registration bug",
  confidenceScore: 92,
  signalsFound: 12,
  sourcesAnalyzed: 5,
  lastActivity: "22 min ago",
  heroSummary:
    "The registration flow currently accepts null values from the frontend, causing validation failures in the backend. A previous backend-only validation fix reduced the issue but did not resolve the root cause because the frontend payload is still inconsistent. The likely fix is to normalize the registration payload before submission and keep the backend validation as a second layer.",
  crossSourceInsight:
    "Three different sources point to the same issue: previous work focused on backend validation (PR #142) and cosmetic UI form updates (PR #151), while the true root cause remains in the frontend payload serialization in RegistrationForm.tsx.",
  whatChanged: [
    {
      type: "modified",
      text: "Registration form validation was modified in PR #151",
      source: "GitHub / PR #151",
    },
    {
      type: "added",
      text: "Backend Zod schema validation added in registration.service.ts",
      source: "GitHub / PR #142",
    },
    {
      type: "added",
      text: "3 new test cases added to registration.spec.ts for payload checks",
      source: "GitHub / Commits",
    },
    {
      type: "alert",
      text: "Previous fix did not resolve null payload issue for optional fields (dietaryPreferences & emergencyPhone)",
      source: "Slack / #incidents",
    },
  ],
  timeline: [
    {
      id: "t1",
      date: "Aug 25",
      type: "jira",
      title: "Bug reported: VOL-142",
      description: "Users receive error 500 while registering for events when optional fields are skipped.",
      author: "Priya Sharma",
      link: "VOL-142",
    },
    {
      id: "t2",
      date: "Aug 25",
      type: "slack",
      title: "Slack discussion in #backend",
      description: "Frontend payload contains null registration fields; Prisma schema rejects null strings.",
      author: "Rahul Verma",
      link: "#backend",
    },
    {
      id: "t3",
      date: "Aug 26",
      type: "pr",
      title: "PR #142: Backend validation added",
      description: "Rahul merged Zod null validation checks in registration.service.ts.",
      result: "Partial improvement (65% drop in errors, but 35% still failing)",
      author: "Rahul Verma",
      link: "PR #142",
    },
    {
      id: "t4",
      date: "Aug 27",
      type: "pr",
      title: "PR #151: Registration UI refactored",
      description: "Elena updated form styling and React Hook Form bindings.",
      result: "Issue still reproducible because empty string inputs converted back to null on reset",
      author: "Elena Rostova",
      link: "PR #151",
    },
    {
      id: "t5",
      date: "Today",
      type: "decision",
      title: "New recommendation: Normalize payload before API request",
      description: "Normalize payload before submission, preserve defensive backend validation, add regression tests.",
      result: "High confidence fix (92%)",
      author: "ContextIQ Engine",
    },
  ],
  files: [
    MOCK_FILES[0], // RegistrationForm.tsx
    MOCK_FILES[1], // registration.service.ts
    MOCK_FILES[2], // registrations.controller.ts
    MOCK_FILES[3], // registrations.routes.ts
    MOCK_FILES[4], // payload-normalizer.ts
  ],
  pullRequests: [
    MOCK_PRS[0], // PR #142
    MOCK_PRS[1], // PR #151
    MOCK_PRS[2], // PR #157
  ],
  slackMessages: [
    MOCK_SLACK_MESSAGES[0],
    MOCK_SLACK_MESSAGES[1],
    MOCK_SLACK_MESSAGES[2],
    MOCK_SLACK_MESSAGES[3],
    MOCK_SLACK_MESSAGES[4],
  ],
  decisions: [
    MOCK_DECISIONS[0], // Keep backend validation
    MOCK_DECISIONS[1], // Normalize payload before submission
    MOCK_DECISIONS[2], // Add regression tests
  ],
  previousAttempts: [
    {
      attemptNumber: 1,
      approach: "Backend validation only",
      layer: "Backend / Zod schema",
      prNumber: "PR #142",
      result: "Partial improvement",
      details: "Added Zod schema validation in registration.service.ts to reject bad requests.",
      whyItFailed: "Only converted Sentry 500 errors into client 400 Bad Request errors. Users were still unable to complete registrations because the frontend kept transmitting null payloads.",
    },
    {
      attemptNumber: 2,
      approach: "Frontend form layout refactor",
      layer: "Frontend / React Hook Form",
      prNumber: "PR #151",
      result: "Incomplete",
      details: "Refactored form fields, improved error toasts, and cleaned up component markup.",
      whyItFailed: "Did not sanitize the outgoing payload before fetch dispatch. Default form state re-injected null for optional emergency contacts upon form re-render.",
    },
    {
      attemptNumber: 3,
      approach: "Database default value patch",
      layer: "Database / Prisma Schema",
      prNumber: "Commit b789012",
      result: "Issue still reproducible",
      details: "Set SQL default '' on dietaryPreferences column in PostgreSQL.",
      whyItFailed: "Prisma runtime enforces schema constraints before sending the INSERT query. Since null was explicitly passed in the data object, Prisma bypassed SQL defaults.",
    },
  ],
  aiInterpretation:
    "The team has addressed symptoms in multiple layers (backend 400 guards, form layout, database defaults), but the underlying payload inconsistency in the client submission lifecycle has not yet been resolved. Do not start by changing backend validation — start with RegistrationForm.tsx.",
  recommendedNextSteps: [
    "Inspect RegistrationForm.tsx to locate where form reset injecting null values",
    "Normalize outgoing payload via normalizeRegistrationPayload() before HTTP dispatch",
    "Add frontend payload validation rules to ensure optional fields default to empty strings",
    "Keep server-side validation in registration.service.ts as a defensive second layer",
    "Add regression tests in tests/e2e/registration.spec.ts for missing/empty optional inputs",
  ],
  contextSources: {
    jiraCount: 4,
    githubCount: 5,
    slackCount: 7,
    confluenceCount: 2,
    codebaseCount: 9,
  },
  implementationPlan: {
    taskId: "VOL-142",
    filesToModify: [
      {
        path: "src/components/RegistrationForm.tsx",
        action: "Modify",
        description: "Add normalizeRegistrationPayload() step inside onSubmit before calling POST /api/registrations.",
      },
      {
        path: "src/lib/validation/payload-normalizer.ts",
        action: "Create",
        description: "Implement reusable function to strip null/undefined values and trim string fields.",
      },
      {
        path: "src/services/registration.service.ts",
        action: "Review",
        description: "Verify Zod schema gracefully transforms optional empty strings without throwing 400.",
      },
      {
        path: "tests/e2e/registration.spec.ts",
        action: "Modify",
        description: "Add explicit regression test case verifying registrations succeed with blank optional fields.",
      },
    ],
    apiImpact: "Low",
    databaseImpact: "None",
    risk: "Medium",
    estimatedEffort: "1–2 hours",
    testsRequired: 5,
    edgeCases: [
      "Null fields submitted from legacy cached frontend bundles",
      "Missing event ID or invalid UUID format",
      "Duplicate registration for same email and event",
      "Special characters in emergency contact telephone",
      "Expired or past event registrations",
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Create Payload Normalizer Utility",
        description: "Create src/lib/validation/payload-normalizer.ts with strict unit tests verifying null-to-empty string coercion.",
      },
      {
        stepNumber: 2,
        title: "Update RegistrationForm.tsx Submission Handler",
        description: "Import normalizeRegistrationPayload and sanitize formData in onSubmit() prior to api.post call.",
      },
      {
        stepNumber: 3,
        title: "Validate Backend Zod Transform Pipeline",
        description: "Ensure registration.service.ts schema transforms nullable inputs seamlessly without rejecting requests.",
      },
      {
        stepNumber: 4,
        title: "Implement Regression Tests",
        description: "Add 5 automated Playwright/Jest tests covering blank dietaryPreferences and missing emergency contact.",
      },
      {
        stepNumber: 5,
        title: "Staging Smoke Test & Verification",
        description: "Execute end-to-end registration on staging environment and monitor Sentry error stream for 0 exceptions.",
      },
    ],
  },
};

