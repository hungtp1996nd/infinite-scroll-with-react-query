import { useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

const fetcher = async (page: number) => {
  const res = await axios.get<ResponseCharacters>(
    `https://rickandmortyapi.com/api/character/?page=${page}`
  );
  return res.data;
};

export const useCharacters = () => {
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
    queryKey: ["getCharacters"],
    queryFn: ({ pageParam = 1 }) => fetcher(pageParam),
    initialPageParam: 1,
    getNextPageParam: (
      _lastPage: ResponseCharacters,
      pages: ResponseCharacters[]
    ) => {
      const totalPage = Math.floor(_lastPage?.info?.count / 10);
      if (pages.length < totalPage + 1) {
        return pages.length + 1;
      } else return undefined;
    },
  });

  const characters = useMemo(
    () =>
      data?.pages?.reduce(
        (prev: ResponseCharacters, page: ResponseCharacters) => {
          return {
            info: page.info,
            results: [...prev.results, ...page.results],
          };
        }
      ),
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
    characters,
    data,
  };
};
