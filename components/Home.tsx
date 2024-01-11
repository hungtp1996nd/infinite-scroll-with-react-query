"use client";

import { useCallback, useRef } from "react";
import { usePosts } from "@/hooks/usePosts";
import LoadMoreCard from "./LoadMoreCard";
import { useCharacters } from "@/hooks/useCharacters";
import InfiniteScrollCard from "./InfiniteScrollCard";

export default function HomePage() {
  const { posts, hasNextPage, fetchNextPage } = usePosts(10);
  const {
    characters,
    isLoading,
    hasNextPage: hasNextInfinite,
    fetchNextPage: fetchNextInfinite,
  } = useCharacters();

  // IntersectionObserver to handle Infinite Scroll
  const observer = useRef<IntersectionObserver>();

  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextInfinite) {
          fetchNextInfinite();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasNextInfinite, fetchNextInfinite]
  );

  return (
    <div className="flex w-full">
      <div className="flex-1">
        <h1>Using load more button</h1>
        <div className="grid grid-rows-1 gap-8">
          {posts?.map((post: Post) => (
            <LoadMoreCard key={post.id} {...post} />
          ))}
        </div>
        {hasNextPage && (
          <button
            className="bg-rose-500 text-white rounded-md p-3 mt-8"
            onClick={() => fetchNextPage()}
          >
            Load more
          </button>
        )}
      </div>
      <div className="flex-1">
        <h1>Using infinite scroll</h1>
        <div className="grid grid-rows-1 gap-2">
          {characters?.results?.map((character: ResultsCharacter, index) => (
            <div
              key={character.id}
              ref={
                characters?.results.length === index + 1 ? lastElementRef : null
              }
            >
              <InfiniteScrollCard {...character} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
