"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const tweetSchema = z.object({
  tweet: z.string().min(1, { message: "트윗 내용을 입력하세요." })
})

export async function uploadTweet(_: any, formData: FormData) {
  const tweet = formData.get("tweet");
  const result = tweetSchema.safeParse({ tweet });

  if (!result.success) {
    return result.error.flatten();
  }

  const session = await getSession();
  if (session.id) {
    await db.tweet.create({
      data: {
        tweet: result.data.tweet,
        user: {
          connect: {
            id: session.id
          }
        },
      }
    })
  }
  
  redirect("/");
}

export async function getTweetsAction(page: number, size: number) {
  const totalCount = await db.tweet.count();

  const tweets = await db.tweet.findMany({
    skip: (page - 1) * size,
    take: size,
    include: {
      user: {
        select: {
          username: true,
          email: true
        }
      },
      _count: {
        select: {
          likes: true,
          Response: true
        },
      },
    },
    orderBy: {
      created_at: 'desc',
    }
  });

  revalidatePath("/search");

  return { tweets, totalCount };
}

export async function getTweetsByKeyword(keyword: string) {
  const tweets = await db.tweet.findMany({
    where: {
      tweet: {
        contains: keyword
      }
    },
    include: {
      user: {
        select: {
          username: true,
          email: true
        }
      }
    }
  });

  return tweets;
}