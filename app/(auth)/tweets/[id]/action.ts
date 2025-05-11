"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { revalidateTag } from "next/cache";
import { z } from "zod";

const responseSchema = z.object({
  tweetId: z.number({
    required_error: "해당 트윗 정보가 없습니다."
  }),
  response: z.string().min(1, { message: "답글 내용을 입력하세요." })
})

export async function getTweet(id: number) {
    return await db.tweet.findUnique({
        where: {
            id,
        },
        include: {
            user: {
                select: {
                    username: true,
                    email: true
                }
            }
        }
    })
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

export async function uploadResponse(_:any, formData: FormData) {
  const response = formData.get("response");
  const tweetId = formData.get("tweetId");
  const result = responseSchema.safeParse({ tweetId: Number(tweetId), response });

  if (!result.success) {
    return result.error.flatten();
  }
  
  const session = await getSession();
  if (session.id) {
    await db.response.create({
      data: {
        response: result.data.response,
        user: {
          connect: {
            id: session.id
          }
        },
        tweet: {
          connect: {
            id: result.data.tweetId
          }
        }
      }
    })
  }

  revalidateTag(`tweet-responses-${tweetId}`);
}

export async function getResponses(tweetId: number) {
    return await db.response.findMany({
      where: {
        tweetId,
      },
      include: {
        user: {
          select: {
            username: true
          }
        }
      }
    });
}