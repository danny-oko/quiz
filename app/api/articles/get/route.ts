import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const res = await prisma.article.findMany();
    return NextResponse.json({ articles: res });
  } catch (error) {
    return NextResponse.json({ error_message: `${error}` });
  }
}
