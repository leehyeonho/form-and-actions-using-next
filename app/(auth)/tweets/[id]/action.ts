"use server";

import db from "@/lib/db";

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