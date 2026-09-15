"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { TopNav } from "./TopNav";
import { PresentationBanner } from "./PresentationBanner";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [isPresentationMode, setIsPresentationMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("contextiq_presentation_mode");
    if (saved === "true") {
      setIsPresentationMode(true);
    }
  }, []);

  const handleTogglePresentation = () => {
    const nextState = !isPresentationMode;
    setIsPresentationMode(nextState);
    localStorage.setItem("contextiq_presentation_mode", String(nextState));
  };

  return (
    <div className="min-h-screen bg-[#080B11] text-slate-100 flex flex-row">
      {/* Left Sidebar */}
      <Sidebar isPresentationMode={isPresentationMode} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {isPresentationMode && (
          <PresentationBanner onExit={handleTogglePresentation} />
        )}
        <TopNav
          isPresentationMode={isPresentationMode}
          onTogglePresentationMode={handleTogglePresentation}
        />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

