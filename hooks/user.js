import useSWR from "swr";
import fetcher from "@/lib/fetch";

export function useCurrentUser() {
  const { data, mutate } = useSWR("/api/user", fetcher);
  const user = data?.user;
  return [user, { mutate }];
}

export function useCurrentPost() {
  const { data, mutate } = useSWR("/api/posts", fetcher);
  const post = data?.post;
  return [post, { mutate }];
}

export function useUser(id) {
  const { data } = useSWR(`/api/users/${id}`, fetcher, {
    revalidateOnFocus: false,
  });
  return data?.user;
}

export function usePost(id) {
  const { data } = useSWR(`/api/comments/${id}`, fetcher, {
    revalidateOnFocus: false,
  });
  return data?.post;
}

