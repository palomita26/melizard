import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    callbacks: {
      session: async ({ session, user }) => {
        if (session?.user) {
          session.user.id = user.id;
        }
        return session;
      },
    },
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_ID as string,
        clientSecret: process.env.GOOGLE_SECRET as string,
        authorization: {
          params: {
            prompt: "consent",
            access_type: "offline",
            response_type: "code"
          }
        }
      })
    ],
    secret: process.env.NEXTAUTH_SECRET
  }

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }