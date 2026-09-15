import { NextResponse } from "next/server";
import { answerContextQuestion } from "@/lib/ai/context-engine";
import { VOL_142_CONTEXT } from "@/lib/mock-data/volunteer-hub";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { question, context = VOL_142_CONTEXT } = body;

    if (!question) {
      return NextResponse.json(
        { error: "Question parameter is required" },
        { status: 400 }
      );
    }

    const answer = await answerContextQuestion(question, context);
    return NextResponse.json({ answer });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Failed to process chat question" },
      { status: 500 }
    );
  }
}

