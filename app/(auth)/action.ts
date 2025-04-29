"use server";

import db from "@/lib/db";

export async function getTweetsAction(page: number, size: number) {
    const totalCount = await db.tweet.count();

    const tweets = await db.tweet.findMany({
      skip: (page - 1) * size,
      take: size,
      include: {
        user: {
          select: {
            username: true
          }
        }
      }
    });

    return { tweets, totalCount };
}