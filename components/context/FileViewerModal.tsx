"use client";

import { CodeFile } from "@/types";
import { X, FileCode, Copy, Check } from "lucide-react";
import { useState } from "react";

interface FileViewerModalProps {
  file: CodeFile | null;
  onClose: () => void;
  onAskAI: (file: CodeFile) => void;
}

export function FileViewerModal({
  file,
  onClose,
  onAskAI,
}: FileViewerModalProps) {
  const [copied, setCopied] = useState(false);

  if (!file) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(file.codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#080B11]/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0D1527] border border-[#1E2E52] rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl shadow-indigo-950/40 flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-4 border-b border-[#1B2745] flex items-center justify-between bg-[#111A2E]">
          <div className="flex items-center gap-2.5">
            <FileCode className="w-4 h-4 text-indigo-400" />
            <div>
              <div className="text-xs font-mono font-bold text-white">
                {file.path}
              </div>
              <div className="text-[10px] text-slate-400">
                {file.layer} • {file.changedAt}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 text-[11px] text-slate-300 hover:text-white px-2.5 py-1 rounded bg-[#16233F] border border-[#233762] transition-colors"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? "Copied" : "Copy"}</span>
            </button>
            <button
              onClick={() => {
                onClose();
                onAskAI(file);
              }}
              className="text-[11px] font-semibold text-white px-3 py-1 rounded bg-indigo-600 hover:bg-indigo-500 transition-colors"
            >
              Ask AI About This File
            </button>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* File Relevance Summary */}
        <div className="p-3 bg-indigo-950/20 border-b border-[#1B2745] text-xs text-indigo-200">
          <span className="font-semibold text-indigo-300">Relevance Context: </span>
          {file.relevance}
        </div>

        {/* Code Snippet */}
        <div className="flex-1 overflow-auto p-4 bg-[#090D18] font-mono text-xs text-slate-200 leading-relaxed">
          <pre className="overflow-x-auto whitespace-pre">
            <code>{file.codeSnippet}</code>
          </pre>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-[#1B2745] bg-[#0E162B] text-[11px] text-slate-400 flex items-center justify-between">
          <span>Language: {file.language.toUpperCase()}</span>
          <span>Volunteer Hub Codebase Snapshot</span>
        </div>
      </div>
    </div>
  );
}

