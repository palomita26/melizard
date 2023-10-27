import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client"
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const posts = await prisma.posts.findMany({include: {user: true}, orderBy: {timestamp: "desc"} });

  return NextResponse.json(posts);
}

type PostRequestBody = { media: string, description: string }

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return new Response("", { status: 401 })
  }


  console.log(session)
  const { media, description } = await req.json() as PostRequestBody
  const post = await prisma.posts.create({data: {media, description, userId: session.user.id}});
  return NextResponse.json(post);
}

type DeleteRequestBody = { postId: number }
export async function DELETE (req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return new Response("", { status: 401 })
  }
  const { postId } = await req.json() as DeleteRequestBody
  const post = await prisma.posts.findUnique ({where: {id: postId}})
  if (session.user.id !== post?.userId) {
    return new Response("", { status: 401 })
  }

  await prisma.posts.delete({where: {id: postId}})
    
  return NextResponse.json(post);
}

type PutRequestBody = { media: string, description: string, postId: number}
export async function PUT (req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return new Response("", { status: 401 })
  }
  const { media, description, postId } = await req.json() as PutRequestBody
  const post = await prisma.posts.findUnique ({where: {id: postId}})
  if (session.user.id !== post?.userId) {
    return new Response("", { status: 401 })
  }
  const newPost = await prisma.posts.update({where: {id: postId}, data:{media, description}})
  return NextResponse.json(newPost);
}