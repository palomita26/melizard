"use client"
import { useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { usePosts } from "../hooks/usePosts";
import toast from "react-hot-toast";
import ImageCrop from "./ImageCrop";

type Inputs = {
  media: File[] 
  description: string
}

export default function CreatePostView() {
  const {mutate} = usePosts()
  const [isLoading, setIsLoading] = useState(false);
  const [showImageCrop, setShowImageCrop] = useState(true)
  const [croppedImage, setCroppedImage] = useState<File>()

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<Inputs>()

  const inputs = watch()
  

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (isLoading) {
      return
    }
    try {
      setIsLoading(true)
      const formData = new FormData()
      formData.set('media', croppedImage as File)
      formData.set('description', data.description)
      const response = await fetch("/api/posts", {
        method:"POST", 
        body: formData
      })
      
      if (response.ok) {
        mutate()
        toast.success("Your Melizard is posted!")
        reset()
      } else if (response.status === 401) {
        throw new Error("You must be signed in to create a post")
      } else {
        throw new Error("No Melizard posted, sorry :'(")
      }

    } catch (e: any) {
      console.error(e)
      toast.error(e.message ?? "Oops something went wrong")
    } finally {
      setIsLoading(false)
    }
  }
 return(
    <section
        id="create"
        className="text-sm h-full py-12 w-full max-w-sm px-3 sm:px-0"
      >
        <h1 className="mx-auto text-3xl w-fit pb-10">{"Create Post"}</h1>

    <ImageCrop visible={showImageCrop} onCrop={(image: File) => setCroppedImage(image)} onClose={()=>setShowImageCrop(false)} image={inputs.media?.length ? URL.createObjectURL(inputs.media[0]) : ("")}/> 
      
      {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 text-black">
      {/* register your input into the hook by invoking the "register" function */}
      <label htmlFor="file-upload" className="custom-file-upload text-white cursor-pointer bg-gray-400 hove:bg-gray-300 text-center py-1 px-3 rounded-full w-fit mx-auto mt-3">
    Choose File
      </label>
      <input id="file-upload" type="file" className="hidden" placeholder="media" {...register("media", { required: true, onChange: () => setShowImageCrop(true) })} />
      {errors.media && <span className="text-white">This field is required</span>}

        {inputs.media?.length ? (<div className="text-black w-full bg-white p-1.5 rounded-sm">
          {inputs.media[0].name}
        </div>) : null}

      {/* include validation with required or other standard HTML validation rules */}
      <input className="rounded-sm p-2" placeholder="description" {...register("description", { required: true })} />
      {/* errors will return when field validation fails  */}
      {errors.description && <span className="text-white">This field is required</span>}

      <button className="p-1 rounded-sm text-white bg-gray-600 hover:bg-gray-500" >{isLoading ? "Loading . . ." : "Submit"}</button>
    </form>
        
      </section>
 )

}