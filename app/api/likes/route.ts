import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

const prisma = new PrismaClient();

type PostRequestBody = { postId: number };
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response("", { status: 401 });
  }

  const { postId } = (await req.json()) as PostRequestBody;

  const like = await prisma.like.create({
    data: { postId, userId: session.user.id },
  });
  return NextResponse.json(like);
}

type DeleteRequestBody = { postId: number };
export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response("", { status: 401 });
  }
  const { postId } = (await req.json()) as DeleteRequestBody;
  const like = await prisma.like.delete({
    where: { userId_postId: { postId, userId: session.user.id } },
  });

  return NextResponse.json(like);
}
