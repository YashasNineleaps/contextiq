import { NextResponse } from "next/server";
import { reconstructContext } from "@/lib/ai/context-engine";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const taskId = searchParams.get("taskId") || "VOL-142";

  try {
    const context = await reconstructContext(taskId);
    return NextResponse.json(context);
  } catch (error) {
    console.error("Reconstruct API error:", error);
    return NextResponse.json(
      { error: "Failed to reconstruct context" },
      { status: 500 }
    );
  }
}

