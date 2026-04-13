import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, content, sumarry, userId } = body;

    if (!title || !content || !sumarry || !userId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const article = await prisma.article.create({
      data: { title, content, sumarry, userId },
    });

    return NextResponse.json({ article }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create article" },
      { status: 500 },
    );
  }
}
