import { useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

const fetcher = async (page: number, limit: number) => {
  const res = await axios.get<Post[]>(
    `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`
  );
  return res.data;
};

export const usePosts = (limit: number) => {
  const {
    data,
    error,
    fetchNextPage,
    status,
    hasNextPage,
    isFetching,
    isLoading,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["getPosts", limit],
    queryFn: ({ pageParam = 1 }) => fetcher(pageParam, limit),
    initialPageParam: 1,
    getNextPageParam: (_lastPage: Post[], pages: Post[][]) => {
      const totalCount = 100;
      const totalPage = Math.floor(totalCount / limit);
      if (pages.length < totalPage + 1) {
        return pages.length + 1;
      } else return undefined;
    },
  });

  const posts = useMemo(
    () =>
      data?.pages?.reduce((prev: Post[], page: Post[]) => {
        return [...prev, ...page];
      }),
    [data]
  );

  return {
    error,
    fetchNextPage,
    status,
    hasNextPage,
    isFetching,
    isLoading,
    refetch,
    posts,
    data,
  };
};
