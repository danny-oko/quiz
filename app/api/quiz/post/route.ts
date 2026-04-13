import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { question, options, answer, articleId } = body;

    if (!question || !options || !answer || !articleId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    if (!Array.isArray(options) || options.length < 2) {
      return NextResponse.json(
        { error: "Options must be an array with at least 2 items" },
        { status: 400 },
      );
    }

    if (!options.includes(answer)) {
      return NextResponse.json(
        { error: "Answer must be one of the options" },
        { status: 400 },
      );
    }

    // Verify article exists
    const article = await prisma.article.findUnique({
      where: { id: articleId },
    });
    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    const quiz = await prisma.quiz.create({
      data: { question, options, answer, articleId },
    });

    return NextResponse.json({ quiz }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create quiz" },
      { status: 500 },
    );
  }
}
