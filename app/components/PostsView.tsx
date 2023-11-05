"use client";
import { usePosts } from "../hooks/usePosts";
import { useSession } from "next-auth/react";
import MelizardPost from "./MelizardPost";

export default function PostsView() {
  const { data: session } = useSession();
  const { posts } = usePosts();

  return (
    <section
      id="posts"
      className="text-sm h-full w-full pt-12 flex flex-col items-center"
    >
      <h1 className="mx-auto text-3xl w-fit pb-10">{"Posts"}</h1>

      {posts?.map((post) => {
        return (
          <MelizardPost
            key={post.id}
            post={post}
            showEdit={session?.user.id === post.userId}
          />
        );
      })}
    </section>
  );
}
