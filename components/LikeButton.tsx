"use client";

import { dislikeTweet, likeTweet } from "@/service/likeService";
import { useOptimistic } from "react";

export default function LikeButton({
  isLiked,
  likeCount,
  tweetId,
}: {
  isLiked: boolean;
  likeCount: number;
  tweetId: number;
}) {
  const [state, reducer] = useOptimistic({ likeCount, isLiked }, (previousState) => ({
    likeCount: previousState.isLiked ? previousState.likeCount - 1 : previousState.likeCount + 1,
    isLiked: !previousState.isLiked,
  }));
  const handleLikeButton = () => {
    reducer(null);
    if (isLiked) {
      dislikeTweet(tweetId);
    } else {
      likeTweet(tweetId);
    }
  };
  return (
    <form action={handleLikeButton}>
      <button className="flex items-center space-x-1 hover:text-twitter group mx-5">
        <svg data-slot="icon" fill={state.isLiked ? "#f00" : "none"} width="25" height="25" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path strokeLinecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"></path>
        </svg>
        <span>{state.likeCount}</span>
      </button>
    </form>
  );
}