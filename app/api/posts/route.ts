import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const posts = await prisma.posts.findMany();

  return NextResponse.json(posts);
}
