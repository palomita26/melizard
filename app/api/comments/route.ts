import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

const prisma = new PrismaClient();

type PostRequestBody = { postId: number; text: string };
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response("", { status: 401 });
  }

  const { postId, text } = (await req.json()) as PostRequestBody;
  console.log({ postId, text });
  const comment = await prisma.comment.create({
    data: { postId, userId: session.user.id, text },
  });
  return NextResponse.json(comment);
}
