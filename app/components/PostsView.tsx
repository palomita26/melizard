"use client"
import Image from "next/image";
import { usePosts } from "../hooks/usePosts"
import toast from "react-hot-toast";

export default function PostsView() {
    const {posts, error, isLoading, mutate} = usePosts()

     const handleClick = async (postId: number) => {
        console.log("click ", postId)
        const response = await fetch("/api/posts", {
            method:"DELETE", 
            body: JSON.stringify({postId})
          })
          mutate()
      toast.success("Your Melizard has been deleted.")
     }

 return(
    <section
        id="posts"
        className="text-sm h-full min-h-[calc(100vh-3rem)] pt-12"
      >
        <h1 className="mx-auto text-3xl w-fit pb-10">{"Posts"}</h1>

        {posts?.map((post)=>{
          return(
            <div className="bg-gray-600 mb-10 py-6 px-4" key={post.id}>
             <div className="flex justify-end cursor-pointer" onClick={() => handleClick(post.id)}> 
                <div>
                    delete
                </div>
             </div>
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