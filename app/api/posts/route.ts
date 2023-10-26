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

type DeleteRequestBody = { postId: number }
export async function DELETE (req: NextRequest) {
  const { postId } = await req.json() as DeleteRequestBody
  const post = await prisma.posts.delete({where: {id: postId}})
  return NextResponse.json(post);
}

type PutRequestBody = { media: string, description: string, postId: number}
export async function PUT (req: NextRequest) {
  const { media, description, postId } = await req.json() as PutRequestBody
  const post = await prisma.posts.update({where: {id: postId}, data:{media, description}})
  return NextResponse.json(post);
}