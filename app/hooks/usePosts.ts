import useSWR from 'swr'
type Post = {
    id: number
    description: string
    media: string
    timestamp: string
  }
const fetcher = () => fetch("/api/posts").then(res => res.json() as any as Post[])

export const usePosts = () => {
  const { data, error, isLoading, mutate } = useSWR('/api/posts', fetcher)
  
  return {posts: data, error, isLoading, mutate} 
}