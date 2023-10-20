"use client"
import Image from "next/image";
import HamburgerMenu from "./components/HamburgerMenu";
import useSWR from 'swr'

type Post = {
  id: number
  description: string
  media: string
  timestamp: string
}

const fetcher = () => fetch("/api/posts").then(res => res.json() as any as Post[])

const usePosts = () => {
  const { data, error, isLoading } = useSWR('/api/posts', fetcher)
  
  return {posts: data, error, isLoading} 
}
export default function Home() {
  const {posts, error, isLoading} = usePosts()
  console.log({posts, error, isLoading})
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full items-center justify-between font-mono text-sm lg:flex">
          <HamburgerMenu />
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
      <section
        id="Posts"
        className="text-sm h-full min-h-[calc(100vh-3rem)] pt-12"
      >
        <h1 className="mx-auto text-3xl w-fit pb-10">{"Posts"}</h1>

        {posts?.map((post)=>{
          return(
            <div key={post.id}>
              <p>
                {post.description}
              </p>
              <p>
                {post.media}
              </p>
              <p>
                {post.timestamp}
              </p>
            </div>
          )
        })}
      </section>
    </main>
  );
}
