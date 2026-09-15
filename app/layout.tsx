import type { Metadata } from "next";
import "./globals.css";
import { AppShell } from "@/components/layout/AppShell";

export const metadata: Metadata = {
  title: "ContextIQ — AI Context Switcher for Engineers",
  description: "Get the context. Start building. Your AI engineering context layer connecting Jira, GitHub, Slack, and code.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-[#080B11] text-slate-100 min-h-screen">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}

