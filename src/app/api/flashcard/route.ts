import { db } from "@/server/db";
import { flashcardSchema } from "@/server/db/schema";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

export interface FlashCardType {
  question: string;
  answer: string;
  category: string;
  difficulty: "easy" | "medium" | "hard";
  id?: number;
  createdAt?: Date;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as FlashCardType;

    if (!body) {
      return NextResponse.json(
        { error: "No content found in request body." },
        { status: 400 }
      );
    }

    if (!body.answer || !body.question || !body.difficulty) {
      return NextResponse.json(
        {
          error: "Complete content not found in request body.",
        },
        { status: 400 }
      );
    }

    const { question, answer, category, difficulty } = body;

    const response = await db
      .insert(flashcardSchema)
      .values({
        question: question,
        answer: answer,
        category: category,
        difficulty: difficulty,
      })
      .returning();

    return NextResponse.json(response);
  } catch (error: any) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message });
    } else {
      return NextResponse.json({ error: "An unknown error occurred" });
    }
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const offset = Number(searchParams.get("offset"));
    const response = await db
      .select()
      .from(flashcardSchema)
      .limit(10)
      .offset(offset);
    console.log(response);
    return NextResponse.json({ data: response });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message });
    } else {
      return NextResponse.json({ error: "An unknown error occurred" });
    }
  }
}
