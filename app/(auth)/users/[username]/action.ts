"use server";

import db from "@/lib/db";

export async function getProfile(username: string) {
    return await db.user.findUnique({
        where: {
            username,
        },
        include: {
            tweets: {
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
            }
        }
    })
}