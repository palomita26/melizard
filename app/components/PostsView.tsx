"use client"
import Image from "next/image";
import { usePosts } from "../hooks/usePosts"
import toast from "react-hot-toast"
import * as Dialog from '@radix-ui/react-dialog'
import { Cross2Icon } from '@radix-ui/react-icons';

export default function PostsView() {
    const {posts, error, isLoading, mutate} = usePosts()

     const handleDelete = async (postId: number) => {
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
        className="text-sm h-full w-full pt-12 flex flex-col items-center"
      >
        <h1 className="mx-auto text-3xl w-fit pb-10">{"Posts"}</h1>

        {posts?.map((post)=>{
          return(
            <div className="bg-gray-600 mb-10 py-3 rounded-md w-full max-w-md" key={post.id}>
             <div className="flex justify-end cursor-pointer"> 

             <Dialog.Root>
                 <Dialog.Trigger asChild>
                     <button className="hover:bg-gray-400 rounded-full p-1 mr-2">
                        <Cross2Icon/>
                     </button>
                 </Dialog.Trigger>
                 <Dialog.Portal>
                    <Dialog.Overlay className="bg-black/50 fixed inset-0" />
                    <Dialog.Content className="!bg-white fixed text-black w-[450px] top-1/2 right-1/2 -translate-y-1/2 translate-x-1/2 p-5 rounded-md">
                        <div className="flex items-center justify-between">
                        <Dialog.Title className="text-xl">Delete Melizard</Dialog.Title>
                        <Dialog.Close asChild>
                            <button className="hover:bg-gray-400 rounded-full p-1">
                                <Cross2Icon width={18} height={18}/>
                            </button>
                        </Dialog.Close>
                        </div>
                        <Dialog.Description className="mt-12 text-center">
                        Are you sure you want to delete this Melizard?
                        </Dialog.Description>
                       
                        <div className="bg-gray-600 mb-10 py-6 w-fit mx-auto mt-6 text-white rounded-md" key={post.id}>
                           
                            <p className="ml-3 text-lg">
                                {post.description}
                            </p>
                            
                            <Image
                                className="my-2 w-full"
                                src={post.media}
                                alt={post.description}
                                width={180}
                                height={37}
                                priority
                                unoptimized
                                />
                            <p className="ml-3">
                                {post.timestamp}
                            </p>
                        </div>
                        <div className="flex space-x-10 justify-center">
                            <Dialog.Close>
                            <button className="rounded bg-gray-200 px-4 py-2 text-sm font-medium hover:bg-gray-300">
                                cancel
                            </button>
                            </Dialog.Close>

                            <button className="rounded bg-orange-500 px-4 py-2 text-sm font-medium hover:bg-orange-600" onClick={()=>handleDelete(post.id)}>
                                delete
                            </button>

                        </div>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
           
             </div>
              <p className="ml-3 text-lg">
                {post.description}
              </p>
              
              <Image
                className="my-2 w-full"
                src={post.media}
                alt={post.description}
                width={180}
                height={37}
                priority
                unoptimized
                />
              <p className="ml-3">
                {post.timestamp}
              </p>
            </div>
          )
        })}
      </section>
 )

}