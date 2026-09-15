"use client";

import { useState, useEffect, useRef } from "react";
import {
  X,
  Sparkles,
  Send,
  Bot,
  User,
  Loader2,
  HelpCircle,
  MessageSquare,
  Shield,
  Layers,
} from "lucide-react";
import { ReconstructedContext, ChatMessage } from "@/types";
import { answerContextQuestion } from "@/lib/ai/context-engine";

interface AskContextIQDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  context: ReconstructedContext;
  initialQuestion?: string;
}

export function AskContextIQDrawer({
  isOpen,
  onClose,
  context,
  initialQuestion,
}: AskContextIQDrawerProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "m-welcome",
      role: "assistant",
      content: `Hello Yashas. I have synthesized **${context.signalsFound} signals** across Jira, GitHub, Slack, and the codebase for **${context.taskId}**. What would you like to know before you start building?`,
      timestamp: "Just now",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    "Why is this bug happening?",
    "What has already been tried?",
    "Which files should I modify?",
    "Who worked on this previously?",
    "What could break if I change this?",
    "Show me the relevant Slack discussion.",
    "Summarize this task in 30 seconds.",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    if (initialQuestion && isOpen) {
      handleSend(initialQuestion);
    }
  }, [initialQuestion, isOpen]);

  const handleSend = async (questionText: string) => {
    const text = questionText.trim();
    if (!text || isLoading) return;

    const userMessage: ChatMessage = {
      id: `u-${Date.now()}`,
      role: "user",
      content: text,
      timestamp: "Just now",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Calls our context-engine abstraction (OpenAI or deterministic fallback)
      const answer = await answerContextQuestion(text, context);

      const assistantMessage: ChatMessage = {
        id: `a-${Date.now()}`,
        role: "assistant",
        content: answer,
        timestamp: "Just now",
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: "assistant",
          content:
            "I encountered a momentary issue processing that question. However, based on the reconstructed context, remember to check RegistrationForm.tsx and avoid touching the backend validation first.",
          timestamp: "Just now",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[480px] bg-[#0A0E1A] border-l border-[#1B2745] shadow-2xl flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-[#1A2645] bg-[#0E1528] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
            <Sparkles className="w-4 h-4 text-amber-300" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-white font-mono">
                Ask ContextIQ
              </span>
              <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Grounded AI
              </span>
            </div>
            <p className="text-[11px] text-slate-400 truncate max-w-[260px]">
              Task: {context.taskId} • {context.taskTitle}
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Suggested Prompt Chips */}
      <div className="p-3 border-b border-[#16213B] bg-[#0B101E] overflow-x-auto">
        <div className="text-[10px] uppercase font-bold text-slate-400 font-mono mb-2 flex items-center gap-1">
          <HelpCircle className="w-3 h-3 text-indigo-400" />
          <span>Engineering Questions</span>
        </div>
        <div className="flex gap-1.5 flex-nowrap pb-1">
          {suggestedQuestions.map((q) => (
            <button
              key={q}
              onClick={() => handleSend(q)}
              disabled={isLoading}
              className="text-[11px] px-2.5 py-1 rounded-full bg-[#131D33] hover:bg-indigo-600/20 hover:border-indigo-500/40 border border-[#1E2E52] text-slate-300 hover:text-indigo-200 transition-colors flex-shrink-0"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Message Stream */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => {
          const isUser = msg.role === "user";

          return (
            <div
              key={msg.id}
              className={`flex gap-3 text-xs leading-relaxed ${isUser ? "justify-end" : "justify-start"
                }`}
            >
              {!isUser && (
                <div className="w-7 h-7 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 flex-shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`p-3.5 rounded-xl max-w-[85%] ${isUser
                    ? "bg-indigo-600 text-white font-medium"
                    : "bg-[#111A2E] border border-[#1E2D4E] text-slate-200 whitespace-pre-wrap font-sans"
                  }`}
              >
                {msg.content}
                <div
                  className={`text-[9px] font-mono mt-1 ${isUser ? "text-indigo-200" : "text-slate-500"
                    }`}
                >
                  {msg.timestamp}
                </div>
              </div>

              {isUser && (
                <div className="w-7 h-7 rounded-full bg-indigo-500 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0 mt-0.5">
                  Y
                </div>
              )}
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-center gap-2 text-xs text-indigo-300 bg-[#111A2E] p-3 rounded-xl border border-indigo-500/20 max-w-[75%]">
            <Loader2 className="w-4 h-4 animate-spin text-indigo-400" />
            <span>Consulting engineering context...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-3 border-t border-[#1A2645] bg-[#0E1528]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(inputValue);
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask about PRs, Slack threads, files, risks..."
            disabled={isLoading}
            className="flex-1 bg-[#121B30] border border-[#1E2E52] focus:border-indigo-500 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none transition-colors"
          />
          <button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className="p-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white transition-colors flex-shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
        <p className="text-[10px] text-slate-500 text-center mt-2 font-mono">
          ContextIQ answers strictly using Volunteer Hub workspace signals.
        </p>
      </div>
    </div>
  );
}

