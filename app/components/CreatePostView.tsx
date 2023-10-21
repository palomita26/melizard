"use client"
import { useForm, SubmitHandler } from "react-hook-form"

type Inputs = {
  media: string 
  description: string
}

export default function CreatePostView() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)
 return(
    <section
        id="posts"
        className="text-sm h-full min-h-[calc(100vh-3rem)] pt-12"
      >
        <h1 className="mx-auto text-3xl w-fit pb-10">{"Create Post"}</h1>
      
      {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 text-black">
      {/* register your input into the hook by invoking the "register" function */}
      <input placeholder="media" {...register("media")} />

      {/* include validation with required or other standard HTML validation rules */}
      <input placeholder="description" {...register("description", { required: true })} />
      {/* errors will return when field validation fails  */}
      {errors.description && <span className="text-white">This field is required</span>}

      <button className="text-white bg-gray-600" >Submit</button>
    </form>
        
      </section>
 )

}