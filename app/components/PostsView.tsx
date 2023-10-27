"use client"
import Image from "next/image";
import { usePosts } from "../hooks/usePosts"
import toast from "react-hot-toast"
import * as Dialog from '@radix-ui/react-dialog'
import { Cross2Icon,Pencil2Icon } from '@radix-ui/react-icons'
import { useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { stringify } from "querystring";
import { useSession } from "next-auth/react";



export default function PostsView() {
  const { data: session } = useSession()
  console.log({ session })
    const {posts, error, isLoading, mutate} = usePosts()
    console.log(posts)
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
             <div className="flex justify-between cursor-pointer mb-5"> 

               <div className="flex items-center gap-3 ml-2">
                <Image
                className="rounded-full"
                src={post.user.image ?? ""}
                alt={post.user.name ?? "username"}
                width={35}
                height={35}
                priority
                unoptimized
                />
                {post.user.name}
               </div>


              { session?.user.id === post.userId && <div>
            {/* Edit Dialog */}

            <Dialog.Root>
                 <Dialog.Trigger asChild>
                     <button className="hover:bg-gray-400 rounded-full p-1 mr-2">
                        <Pencil2Icon/>
                     </button>
                 </Dialog.Trigger>
                 <Dialog.Portal>
                    <Dialog.Overlay className="bg-black/50 fixed inset-0" />
                    <Dialog.Content className="!bg-white fixed text-black w-full max-w-sm max-h-[80vh] overflow-y-auto top-1/2 right-1/2 -translate-y-1/2 translate-x-1/2 p-5 rounded-md">
                       
                        <div className="flex items-center justify-between">
                        <Dialog.Title className="text-xl">Update Melizard</Dialog.Title>
                        <Dialog.Close asChild>
                            <button className="hover:bg-gray-400 rounded-full p-1">
                                <Cross2Icon width={18} height={18}/>
                            </button>
                        </Dialog.Close>
                        </div>
                        
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
                                {post.timestamp.toString()}
                            </p>
                        </div>
                        <UpdateForm
                        media = {post.media}
                        description = {post.description}
                        postId = {post.id} 
                        />
                        
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>





         {/* Delete Dialog */}

            <Dialog.Root>
                 <Dialog.Trigger asChild>
                     <button className="hover:bg-gray-400 rounded-full p-1 mr-2">
                        <Cross2Icon/>
                     </button>
                 </Dialog.Trigger>
                 <Dialog.Portal>
                    <Dialog.Overlay className="bg-black/50 fixed inset-0" />
                    <Dialog.Content className="!bg-white fixed text-black w-full max-w-sm max-h-[80vh] overflow-y-auto top-1/2 right-1/2 -translate-y-1/2 translate-x-1/2 p-5 rounded-md">
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
                                {post.timestamp.toString()}
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
            </div>}
           
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
                {post.timestamp.toString()}
              </p>
            </div>
          )
        })}
      </section>
 )

}

type Inputs = {
    media: string 
    description: string
  }
const UpdateForm = ({media, description, postId}: {media: string, description: string, postId: number}) =>{
    const {mutate} = usePosts()
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({defaultValues:{media, description}})

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (isLoading) {
      return
    }
    try {
      setIsLoading(true)
      const response = await fetch("/api/posts", {
        method:"PUT", 
        body: JSON.stringify({media: data.media, description: data.description, postId})
      })
      mutate()
      toast.success("Your Melizard is Updated!")
      
    } catch (e) {
      console.error(e)
      toast.error("No Melizard Updated, sorry :'(")
    } finally {
      setIsLoading(false)
    }
  }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 text-black">
            <input className="rounded-sm p-2" placeholder="media" {...register("media")} />
            <input className="rounded-sm p-2" placeholder="description" {...register("description", { required: true })} />
            {errors.description && <span className="text-white">This field is required</span>}
            <button className="p-1 rounded-sm text-white bg-gray-600" >{isLoading ? "Loading . . ." : "Update"}</button>
        </form>
    )
}