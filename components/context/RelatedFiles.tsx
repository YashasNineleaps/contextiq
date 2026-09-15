"use client";

import { useState } from "react";
import { CodeFile } from "@/types";
import { FileCode, ExternalLink, MessageSquare, Clock } from "lucide-react";
import { FileViewerModal } from "./FileViewerModal";

interface RelatedFilesProps {
  files: CodeFile[];
  onAskAI: (question: string) => void;
}

export function RelatedFiles({ files, onAskAI }: RelatedFilesProps) {
  const [selectedFile, setSelectedFile] = useState<CodeFile | null>(null);

  const getLanguageColor = (layer: CodeFile["layer"]) => {
    switch (layer) {
      case "Frontend":
        return "text-purple-400 bg-purple-500/10 border-purple-500/20";
      case "Backend":
        return "text-blue-400 bg-blue-500/10 border-blue-500/20";
      case "Database":
        return "text-cyan-400 bg-cyan-500/10 border-cyan-500/20";
      default:
        return "text-slate-400 bg-slate-500/10 border-slate-500/20";
    }
  };

  const handleAskAboutFile = (file: CodeFile) => {
    onAskAI(`Why is file ${file.name} relevant to this task, and what changes are needed?`);
  };

  return (
    <>
      <div className="bg-[#0D1527] border border-[#1A284A] rounded-xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Related Files & Schemas
            </h3>
            <p className="text-xs text-slate-400">
              Files identified through commit correlations, PR diffs, and stack traces
            </p>
          </div>
          <span className="text-[10px] font-mono text-indigo-300 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
            {files.length} Files Mapped
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
          {files.map((file) => (
            <div
              key={file.path}
              className="p-3.5 rounded-xl bg-[#10182E] border border-[#1B2745] hover:border-[#273B6B] transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span
                    className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded border ${getLanguageColor(
                      file.layer
                    )}`}
                  >
                    {file.layer}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-500" />
                    {file.changedAt}
                  </span>
                </div>

                <div className="flex items-center gap-2 font-mono text-xs font-semibold text-white group-hover:text-indigo-300 transition-colors">
                  <FileCode className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />
                  <span className="truncate">{file.path}</span>
                </div>

                <p className="text-[11px] text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                  {file.relevance}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#18233C] flex items-center justify-between gap-2">
                <button
                  onClick={() => setSelectedFile(file)}
                  className="flex items-center gap-1 text-xs text-slate-300 hover:text-white px-2.5 py-1 rounded bg-[#15203B] hover:bg-[#1A284A] border border-[#223359] transition-colors"
                >
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                  <span>Open</span>
                </button>

                <button
                  onClick={() => handleAskAboutFile(file)}
                  className="flex items-center gap-1 text-xs text-indigo-300 hover:text-indigo-200 px-2.5 py-1 rounded bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 transition-colors font-medium"
                >
                  <MessageSquare className="w-3 h-3 text-indigo-400" />
                  <span>Ask AI</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <FileViewerModal
        file={selectedFile}
        onClose={() => setSelectedFile(null)}
        onAskAI={handleAskAboutFile}
      />
    </>
  );
}

