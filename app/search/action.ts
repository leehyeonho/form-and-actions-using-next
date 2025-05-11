"use server";

import db from "@/lib/db";
import { Tweet } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const searchSchema = z.object({
  keyword: z.string().min(1, { message: "검색 내용을 입력하세요." })
})

interface SearchActionResult {
  tweets?: Tweet[];
  error?: string;
  keyword?: string;
}

export async function SearchTweetAction(_:any, formData: FormData): Promise<SearchActionResult> {
  const data = {
    keyword: formData.get("keyword")
  };
  const result = searchSchema.safeParse(data);

  if (!result.success) {
    return {
      error: result.error.flatten().fieldErrors.keyword?.[0] || "유효하지 않은 입력입니다.",
      keyword: typeof data.keyword === 'string' ? data.keyword : undefined,
    };
  }
  
  const keyword = result.data.keyword;

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

  return { tweets, keyword };
}