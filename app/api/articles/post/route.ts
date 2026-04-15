import { auth } from "@clerk/nextjs/server";
import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
const MODEL = "gemini-3-flash-preview";

export async function POST(req: NextRequest) {
  // 1. Auth
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  console.log("User id:", userId);

  // 2. Validate body
  const { title, content } = await req.json();
  if (!title || !content) {
    return NextResponse.json(
      { message: "All fields are required!" },
      { status: 400 },
    );
  }
  console.log("title:", title, "content:", content);

  // 3. Generate summary + quiz in parallel
  try {
    const summaryPrompt = `Please provide a concise summary of the following article: ${content}`;
    const quizPrompt = `Generate 5 multiple choice questions based on this article: ${content} 
      Return ONLY a valid JSON array: 
      [ 
        { 
          "question": "Question text here", 
          "options": ["Option 1", "Option 2", "Option 3", "Option 4"], 
          "answer": "Option 1" 
        } 
      ] 
      The "answer" field MUST match the exact text of the correct option from the "options" array.`;

    const [summaryRes, quizRes] = await Promise.all([
      ai.models.generateContent({ model: MODEL, contents: summaryPrompt }),
      ai.models.generateContent({ model: MODEL, contents: quizPrompt }),
    ]);

    const summary = summaryRes.text?.trim() ?? "";
    const quizRaw = quizRes.text?.trim() ?? "";

    console.log("summary:", summary);
    console.log("quiz raw:", quizRaw);

    let quizzes: { question: string; options: string[]; answer: string }[] = [];
    try {
      const cleaned = quizRaw.replace(/```json|```/g, "").trim();
      quizzes = JSON.parse(cleaned);
    } catch (parseError) {
      console.error("Quiz JSON parse failed:", parseError);
    }

    const article = await prisma.article.create({
      data: {
        title,
        content,
        summary,
        userId,
        quizzes: {
          create: quizzes.map((q) => ({
            question: q.question,
            options: q.options,
            answer: q.answer,
          })),
        },
      },
      include: { quizzes: true },
    });

    console.log("Saved article id:", article.id);

    return NextResponse.json({
      id: article.id,
      summary: article.summary,
      quizzes: article.quizzes,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: `${error}` }, { status: 500 });
  }
}
