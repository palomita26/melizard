import * as Dialog from '@radix-ui/react-dialog'
import { Cross2Icon } from '@radix-ui/react-icons'
import { Post } from "../hooks/usePosts";
import { usePosts } from "../hooks/usePosts"
import toast from "react-hot-toast"
import MelizardPost from "./MelizardPost";


type Props = { 
    post: Post
}
export default function DeleteDialog({post}: Props) {
    const {mutate} = usePosts()
    const handleDelete = async (postId: number) => {
        console.log("click ", postId)
        const response = await fetch("/api/posts", {
            method:"DELETE", 
            body: JSON.stringify({postId})
          })
          mutate()
      toast.success("Your Melizard has been deleted.")
     }
    return ( <Dialog.Root>
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
              
               <MelizardPost className="text-white" post={post} showEdit={false}/>
          
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
    )
}