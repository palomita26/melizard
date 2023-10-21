import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const posts = await prisma.posts.findMany();

  return NextResponse.json(posts);
}

type PostRequestBody = { media: string, description: string }
export async function POST(req: NextRequest) {
  const { media, description } = await req.json() as PostRequestBody
  const post = await prisma.posts.create({data: {media, description}});
  return NextResponse.json(post);
}