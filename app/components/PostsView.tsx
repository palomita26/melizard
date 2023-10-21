"use client"
import Image from "next/image";
import { usePosts } from "../hooks/usePosts";

export default function PostsView() {
    const {posts, error, isLoading} = usePosts()
 return(
    <section
        id="posts"
        className="text-sm h-full min-h-[calc(100vh-3rem)] pt-12"
      >
        <h1 className="mx-auto text-3xl w-fit pb-10">{"Posts"}</h1>

        {posts?.map((post)=>{
          return(
            <div key={post.id}>
              <p>
                {post.description}
              </p>
              
              <Image
                src={post.media}
                alt="Next.js Logo"
                width={180}
                height={37}
                priority
                unoptimized
                />
              <p>
                {post.timestamp}
              </p>
            </div>
          )
        })}
      </section>
 )

}