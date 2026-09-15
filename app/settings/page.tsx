"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Settings,
  Sparkles,
  Key,
  Database,
  RotateCcw,
  Check,
  ShieldAlert,
  Save,
} from "lucide-react";

export default function SettingsPage() {
  const router = useRouter();
  const [apiKey, setApiKey] = useState("");
  const [model, setModel] = useState("deterministic-mock");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const storedKey = localStorage.getItem("contextiq_openai_key") || "";
    const storedModel = localStorage.getItem("contextiq_model") || "deterministic-mock";
    setApiKey(storedKey);
    setModel(storedModel);
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("contextiq_openai_key", apiKey.trim());
    localStorage.setItem("contextiq_model", model);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleResetDemo = () => {
    localStorage.removeItem("contextiq_presentation_mode");
    router.push("/context/VOL-142?reconstruct=true");
  };

  return (
    <div className="p-4 sm:p-8 max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          System & AI Engine Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Configure AI model inference, local persistence, and presentation preferences.
        </p>
      </div>

      {/* AI Model Provider Configuration */}
      <form onSubmit={handleSave} className="bg-[#0D1527] border border-[#1A284A] rounded-2xl p-6 space-y-6">
        <div className="flex items-center gap-2.5 pb-4 border-b border-[#182442]">
          <Key className="w-5 h-5 text-indigo-400" />
          <div>
            <h3 className="text-base font-bold text-white">AI Engine Configuration</h3>
            <p className="text-xs text-slate-400">
              ContextIQ works out-of-the-box with deterministic mock AI. You can optionally supply an OpenAI API key.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 font-mono">
              Inference Mode
            </label>
            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full bg-[#111A2E] border border-[#1E2E52] focus:border-indigo-500 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none"
            >
              <option value="deterministic-mock">
                Deterministic Mock AI (Zero API key required, 100% demo reliable)
              </option>
              <option value="gpt-4o-mini">OpenAI gpt-4o-mini (Requires API Key)</option>
              <option value="gpt-4o">OpenAI gpt-4o (Requires API Key)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 font-mono">
              OpenAI API Key (Optional)
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-proj-..."
              className="w-full bg-[#111A2E] border border-[#1E2E52] focus:border-indigo-500 rounded-lg px-3 py-2 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none font-mono"
            />
            <p className="text-[11px] text-slate-400 mt-1.5">
              Stored in your local browser storage. If empty or invalid, the prototype automatically falls back to deterministic context generation.
            </p>
          </div>
        </div>

        <div className="pt-2 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Active Engine: {model === "deterministic-mock" ? "Deterministic Offline Fallback" : "OpenAI Cloud"}</span>
          </div>

          <button
            type="submit"
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30 transition-all"
          >
            {saved ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Save className="w-3.5 h-3.5" />}
            <span>{saved ? "Settings Saved" : "Save Preferences"}</span>
          </button>
        </div>
      </form>

      {/* Demo State & Scenario Reset */}
      <div className="bg-[#0D1527] border border-[#1A284A] rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-2.5 pb-4 border-b border-[#182442]">
          <RotateCcw className="w-5 h-5 text-amber-400" />
          <div>
            <h3 className="text-base font-bold text-white">Demo & Presentation Controls</h3>
            <p className="text-xs text-slate-400">
              Instantly reset state or restart the Volunteer Registration Bug presentation walkthrough.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
          <div>
            <h4 className="text-xs font-bold text-white">Reset Demo Scenario</h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Clears local session overrides and launches task VOL-142 with fresh reconstruction.
            </p>
          </div>

          <button
            onClick={handleResetDemo}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold bg-[#15213D] hover:bg-indigo-600 text-indigo-200 hover:text-white border border-[#233560] hover:border-indigo-500 transition-all self-start sm:self-auto"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Launch VOL-142 Demo</span>
          </button>
        </div>
      </div>
    </div>
  );
}

