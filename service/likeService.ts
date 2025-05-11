"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { revalidateTag, unstable_cache } from "next/cache";

export async function getCachedLikeStatus(tweetId: number) {
    const session = await getSession();
    const cachedLikeStatus = unstable_cache(getLikeStatus, ["tweet-like-status"], {
        tags: [`like-status-${tweetId}`],
    });
    return cachedLikeStatus(tweetId, session.id!);
}

export const getLikeStatus = async (tweetId: number, userId: number) => {
    const like = await db.like.findUnique({
      where: {
        id: {
          userId,
          tweetId,
        },
      },
    });
    const likeCount = await db.like.count({
      where: {
        tweetId,
      },
    });
    return {
      isLiked: Boolean(like),
      likeCount,
    };
  };

export const likeTweet = async (tweetId: number) => {
  const session = await getSession();
  try {
    await db.like.create({
      data: {
        userId: session.id!,
        tweetId,
      },
    });
    revalidateTag(`like-status-${tweetId}`);
  } catch (error) {
    console.error(error);
  }
};
export const dislikeTweet = async (tweetId: number) => {
  const session = await getSession();
  try {
    await db.like.delete({
      where: {
        id: { userId: session.id!, tweetId },
      },
    });
    revalidateTag(`like-status-${tweetId}`);
  } catch (error) {
    console.error(error);
  }
};