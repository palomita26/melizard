import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon, Pencil2Icon } from "@radix-ui/react-icons";
import { Post } from "../hooks/usePosts";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { usePosts } from "../hooks/usePosts";
import toast from "react-hot-toast";
import MelizardPost from "./MelizardPost";

type Props = {
  post: Post;
};

export default function EditPostsDialog({ post }: Props) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="hover:bg-gray-400 rounded-full p-1 mr-2">
          <Pencil2Icon />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/50 fixed inset-0" />
        <Dialog.Content className="!bg-white fixed text-black w-full max-w-sm max-h-[80vh] overflow-y-auto top-1/2 right-1/2 -translate-y-1/2 translate-x-1/2 p-5 rounded-md">
          <div className="flex items-center justify-between">
            <Dialog.Title className="text-xl">Update Melizard</Dialog.Title>
            <Dialog.Close asChild>
              <button className="hover:bg-gray-400 rounded-full p-1">
                <Cross2Icon width={18} height={18} />
              </button>
            </Dialog.Close>
          </div>

          <MelizardPost className="text-white" post={post} showEdit={false} />

          <UpdateForm
            media={post.media}
            description={post.description}
            postId={post.id}
          />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

type Inputs = {
  media: string;
  description: string;
};
const UpdateForm = ({
  media,
  description,
  postId,
}: {
  media: string;
  description: string;
  postId: number;
}) => {
  const { mutate } = usePosts();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({ defaultValues: { media, description } });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (isLoading) {
      return;
    }
    try {
      setIsLoading(true);
      const response = await fetch("/api/posts", {
        method: "PUT",
        body: JSON.stringify({
          media: data.media,
          description: data.description,
          postId,
        }),
      });
      mutate();
      toast.success("Your Melizard is Updated!");
    } catch (e) {
      console.error(e);
      toast.error("No Melizard Updated, sorry :'(");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-3 text-black"
    >
      <input
        className="rounded-sm p-2"
        placeholder="media"
        {...register("media")}
      />
      <input
        className="rounded-sm p-2"
        placeholder="description"
        {...register("description", { required: true })}
      />
      {errors.description && (
        <span className="text-white">This field is required</span>
      )}
      <button className="p-1 rounded-sm text-white bg-gray-600">
        {isLoading ? "Loading . . ." : "Update"}
      </button>
    </form>
  );
};
