import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const resolvedParams = await params;
    const id = resolvedParams.id;

    const article = await prisma.article.findUnique({
      where: { id: Number(id) },
      include: {
        quizzes: true,
      },
    });

    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    return NextResponse.json(article);
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { error_message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
