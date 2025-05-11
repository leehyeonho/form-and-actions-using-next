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