"use client";

import { use, useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { reconstructContext } from "@/lib/ai/context-engine";
import { ReconstructedContext } from "@/types";
import { VOL_142_CONTEXT } from "@/lib/mock-data/volunteer-hub";

import { ContextHeader } from "@/components/context/ContextHeader";
import { HeroSummary } from "@/components/context/HeroSummary";
import { CrossSourceInsight } from "@/components/context/CrossSourceInsight";
import { EngineeringTimeline } from "@/components/context/EngineeringTimeline";
import { WhatChanged } from "@/components/context/WhatChanged";
import { RelatedFiles } from "@/components/context/RelatedFiles";
import { RelatedPRs } from "@/components/context/RelatedPRs";
import { SlackContext } from "@/components/context/SlackContext";
import { EngineeringDecisions } from "@/components/context/EngineeringDecisions";
import { PreviousAttempts } from "@/components/context/PreviousAttempts";
import { RecommendedNextStep } from "@/components/context/RecommendedNextStep";
import { ContextSourcesPanel } from "@/components/context/ContextSourcesPanel";
import { ReconstructionLoader } from "@/components/context/ReconstructionLoader";
import { AskContextIQDrawer } from "@/components/assistant/AskContextIQDrawer";
import { MessageSquare, Sparkles, Loader2 } from "lucide-react";

function ContextView({ taskId }: { taskId: string }) {
  const searchParams = useSearchParams();

  const [context, setContext] = useState<ReconstructedContext>(VOL_142_CONTEXT);
  const [isReconstructing, setIsReconstructing] = useState(false);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [assistantQuestion, setAssistantQuestion] = useState<string | undefined>();

  // Trigger reconstruction loader if query has ?reconstruct=true or on initial load
  useEffect(() => {
    const shouldReconstruct = searchParams?.get("reconstruct") === "true";
    if (shouldReconstruct) {
      setIsReconstructing(true);
    }

    async function load() {
      const data = await reconstructContext(taskId);
      setContext(data);
    }
    load();
  }, [taskId, searchParams]);

  const handleManualReconstruct = () => {
    setIsReconstructing(true);
  };

  const handleLoaderComplete = () => {
    setIsReconstructing(false);
  };

  const handleOpenAssistant = (initialQuestion?: string) => {
    setAssistantQuestion(initialQuestion);
    setIsAssistantOpen(true);
  };

  return (
    <div className="relative min-h-screen pb-20">
      {/* Intelligent Loading Pipeline Simulation */}
      {isReconstructing && (
        <ReconstructionLoader onComplete={handleLoaderComplete} />
      )}

      {/* Main Context Workspace */}
      <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8">
        {/* Header with Title, Badges, and Action Buttons */}
        <ContextHeader
          context={context}
          onReconstruct={handleManualReconstruct}
          onOpenAssistant={handleOpenAssistant}
        />

        {/* Hero AI Summary: "Here's what you need to know" */}
        <HeroSummary context={context} />

        {/* AI-Generated Insight: Cross-Source Reasoning Differentiator */}
        <CrossSourceInsight insight={context.crossSourceInsight} />

        {/* What Changed Since You Last Looked? */}
        <WhatChanged items={context.whatChanged} />

        {/* Crucial Section: "What has already been tried?" */}
        <PreviousAttempts
          attempts={context.previousAttempts}
          aiInterpretation={context.aiInterpretation}
        />

        {/* Recommended Next Step & Implementation Plan CTA */}
        <RecommendedNextStep
          steps={context.recommendedNextSteps}
          plan={context.implementationPlan}
        />

        {/* Engineering Timeline */}
        <EngineeringTimeline timeline={context.timeline} />

        {/* 2-Column Split: Related Files & Related PRs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RelatedFiles
            files={context.files}
            onAskAI={(question) => handleOpenAssistant(question)}
          />
          <RelatedPRs prs={context.pullRequests} />
        </div>

        {/* 2-Column Split: Slack Context & Engineering Decisions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SlackContext messages={context.slackMessages} />
          <EngineeringDecisions decisions={context.decisions} />
        </div>

        {/* Connected Context Sources Panel */}
        <ContextSourcesPanel sources={context.contextSources} />
      </div>

      {/* Floating "Ask ContextIQ" Button */}
      <button
        onClick={() => handleOpenAssistant()}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-xs shadow-2xl shadow-indigo-600/40 border border-indigo-400/40 transition-all hover:scale-105 active:scale-95"
      >
        <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
        <span>Ask ContextIQ</span>
        <span className="w-2 h-2 rounded-full bg-emerald-400" />
      </button>

      {/* Slide-out AI Assistant Drawer */}
      <AskContextIQDrawer
        isOpen={isAssistantOpen}
        onClose={() => setIsAssistantOpen(false)}
        context={context}
        initialQuestion={assistantQuestion}
      />
    </div>
  );
}

export default function ContextPage({
  params,
}: {
  params: Promise<{ taskId: string }>;
}) {
  const resolvedParams = use(params);
  const taskId = resolvedParams.taskId || "VOL-142";

  return (
    <Suspense
      fallback={
        <div className="p-12 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin text-indigo-400" />
          <span>Loading context workspace...</span>
        </div>
      }
    >
      <ContextView taskId={taskId} />
    </Suspense>
  );
}

