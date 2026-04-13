import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const articleId = searchParams.get("articleId");

    const quizzes = await prisma.quiz.findMany({
      where: articleId ? { articleId: parseInt(articleId) } : undefined,
      include: { article: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ quizzes }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch quizzes" },
      { status: 500 },
    );
  }
}
