import Image from "next/image";
import HamburgerMenu from "./components/HamburgerMenu";
import CreatePostView from "./components/CreatePostView";
import PostsView from "./components/PostsView";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between sm:p-24">
      <div className="w-full items-center justify-between font-mono text-sm flex p-5 sm:p-0">
        <HamburgerMenu />
        <button className="p-2 rounded-md bg-gray-600 hover:bg-gray-500">
          {session ? (
            <Link href="/api/auth/signout"> Google Sign-out </Link>
          ) : (
            <Link href="/api/auth/signin"> Google Sign-in </Link>
          )}
        </button>
      </div>

      <div className="place-items-center p-16">
        <Image
          src="/melizard.jpeg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>
      <CreatePostView />
      <PostsView />
    </main>
  );
}
