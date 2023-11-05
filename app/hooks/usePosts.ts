import useSWR from "swr";

import { User, posts } from "@prisma/client";

export interface Post extends posts {
  user: User;
}
const fetcher = () =>
  fetch("/api/posts").then((res) => res.json() as any as Post[]);

export const usePosts = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/posts", fetcher);

  return { posts: data, error, isLoading, mutate };
};
