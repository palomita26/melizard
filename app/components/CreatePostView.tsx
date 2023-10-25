"use client"
import { useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { usePosts } from "../hooks/usePosts";
import toast from "react-hot-toast";

type Inputs = {
  media: string 
  description: string
}

export default function CreatePostView() {
  const {mutate} = usePosts()
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (isLoading) {
      return
    }
    try {
      setIsLoading(true)
      const response = await fetch("/api/posts", {
        method:"POST", 
        body: JSON.stringify(data)
      })
      mutate()
      toast.success("Your Melizard is posted!")
      reset()
    } catch (e) {
      console.error(e)
      toast.error("No Melizard posted, sorry :'(")
    } finally {
      setIsLoading(false)
    }
  }
 return(
    <section
        id="create"
        className="text-sm h-full py-12"
      >
        <h1 className="mx-auto text-3xl w-fit pb-10">{"Create Post"}</h1>
      
      {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 text-black">
      {/* register your input into the hook by invoking the "register" function */}
      <input className="rounded-sm p-2" placeholder="media" {...register("media")} />

      {/* include validation with required or other standard HTML validation rules */}
      <input className="rounded-sm p-2" placeholder="description" {...register("description", { required: true })} />
      {/* errors will return when field validation fails  */}
      {errors.description && <span className="text-white">This field is required</span>}

      <button className="p-1 rounded-sm text-white bg-gray-600" >{isLoading ? "Loading . . ." : "Submit"}</button>
    </form>
        
      </section>
 )

}