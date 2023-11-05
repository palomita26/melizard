import Image from "next/image";
import EditPostsDialog from "./EditPostsDialog";
import DeleteDialog from "./DeleteDialog";
import { formatDistance, subDays } from "date-fns";
import { Post } from "../hooks/usePosts";
import LizardIcon from "./Icons/LizardIcon";
import toast from "react-hot-toast";

type Props = {
  post: Post;
  showEdit: boolean;
  className?: string;
  userId?: string;
  reload?: () => void;
};
export default function MelizardPost({
  post,
  showEdit,
  className = "",
  userId,
  reload,
}: Props) {
  console.log(post);
  const isLiked = post.likes.some((like) => like.userId === userId);
  const handleClick = async () => {
    console.log("like", post.id);
    try {
      const response = await fetch("/api/likes", {
        method: "POST",
        body: JSON.stringify({
          postId: post.id,
        }),
      });
      console.log(response);
      if (response.ok) {
        reload && reload();
        toast.success("You like this Melizard!");
      } else {
        throw new Error(response.statusText);
      }
    } catch (e) {
      console.error(e);
      toast.error("Liking this Melizard failed, sorry :'(");
    }
  };

  return (
    <div
      className={`bg-gray-600 mb-10 py-3 rounded-md w-full max-w-md ${className}`}
      key={post.id}
    >
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

        {showEdit && (
          <div>
            <EditPostsDialog post={post} />

            <DeleteDialog post={post} />
          </div>
        )}
      </div>
      <p className="ml-3 text-lg">{post.description}</p>

      <Image
        className="my-2 w-full"
        src={post.media}
        alt={post.description}
        width={180}
        height={37}
        priority
        unoptimized
      />
      <div className="mx-3 flex justify-between">
        <p>
          {formatDistance(subDays(new Date(post.timestamp), 0), new Date(), {
            addSuffix: true,
          })}
        </p>
        <LizardIcon
          className={`hover:text-green-400 cursor-pointer ${
            isLiked ? "text-green-400" : ""
          }`}
          onClick={handleClick}
        />
      </div>
    </div>
  );
}
